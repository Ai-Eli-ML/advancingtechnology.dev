-- Create user_profiles table for extended user data
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    display_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    website_url TEXT,
    github_url TEXT,
    twitter_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_statistics materialized view for dashboard performance
CREATE MATERIALIZED VIEW IF NOT EXISTS public.user_statistics AS
SELECT
    u.id as user_id,
    u.email,
    up.display_name,
    up.full_name,
    up.avatar_url,
    -- Plugin statistics
    COUNT(DISTINCT p.id) as plugin_count,
    COUNT(DISTINCT CASE WHEN p.status = 'published' THEN p.id END) as published_plugin_count,
    COALESCE(SUM(p.downloads), 0) as total_downloads,
    COALESCE(AVG(p.rating), 0) as avg_plugin_rating,

    -- Revenue statistics
    COALESCE(SUM(pur.amount), 0) as total_revenue,
    COALESCE(SUM(CASE
        WHEN pur.purchased_at >= NOW() - INTERVAL '30 days'
        THEN pur.amount
        ELSE 0
    END), 0) as revenue_last_30_days,
    COALESCE(SUM(CASE
        WHEN pur.purchased_at >= NOW() - INTERVAL '7 days'
        THEN pur.amount
        ELSE 0
    END), 0) as revenue_last_7_days,

    -- User engagement
    COUNT(DISTINCT pur.id) as total_purchases_made,
    COUNT(DISTINCT rev.id) as total_reviews_written,

    -- Recent activity metrics
    MAX(p.created_at) as last_plugin_created,
    MAX(pur.purchased_at) as last_purchase_date,
    MAX(rev.created_at) as last_review_date

FROM auth.users u
LEFT JOIN public.user_profiles up ON u.id = up.id
LEFT JOIN public.plugins p ON u.id = p.author_id
LEFT JOIN public.plugin_purchases pur ON p.id = pur.plugin_id AND pur.status = 'completed'
LEFT JOIN public.plugin_reviews rev ON u.id = rev.user_id
GROUP BY u.id, u.email, up.display_name, up.full_name, up.avatar_url;

-- Create indexes on the materialized view
CREATE UNIQUE INDEX idx_user_statistics_user_id ON public.user_statistics(user_id);

-- Enable RLS on user_profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "User profiles are viewable by everyone" ON public.user_profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can delete their own profile" ON public.user_profiles
    FOR DELETE USING (auth.uid() = id);

-- Trigger for updated_at on user_profiles
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to refresh user statistics
CREATE OR REPLACE FUNCTION refresh_user_statistics()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY public.user_statistics;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user dashboard stats (optimized with materialized view)
CREATE OR REPLACE FUNCTION get_user_dashboard_stats(p_user_id UUID)
RETURNS TABLE (
    plugin_count BIGINT,
    total_revenue NUMERIC,
    total_downloads BIGINT,
    active_users BIGINT,
    revenue_change_percentage NUMERIC,
    downloads_change_percentage NUMERIC
) AS $$
DECLARE
    v_current_revenue NUMERIC;
    v_previous_revenue NUMERIC;
    v_current_downloads BIGINT;
    v_previous_downloads BIGINT;
BEGIN
    -- Get current period stats (last 30 days)
    SELECT
        COALESCE(us.published_plugin_count, 0),
        COALESCE(us.revenue_last_30_days, 0),
        COALESCE(us.total_downloads, 0)
    INTO
        plugin_count,
        v_current_revenue,
        v_current_downloads
    FROM public.user_statistics us
    WHERE us.user_id = p_user_id;

    -- Get previous period revenue (30-60 days ago)
    SELECT COALESCE(SUM(pur.amount), 0)
    INTO v_previous_revenue
    FROM public.plugins p
    JOIN public.plugin_purchases pur ON p.id = pur.plugin_id
    WHERE p.author_id = p_user_id
        AND pur.status = 'completed'
        AND pur.purchased_at >= NOW() - INTERVAL '60 days'
        AND pur.purchased_at < NOW() - INTERVAL '30 days';

    -- Get previous period downloads (30-60 days ago) - approximation
    SELECT COALESCE(COUNT(*), 0)
    INTO v_previous_downloads
    FROM public.plugins p
    WHERE p.author_id = p_user_id
        AND p.created_at >= NOW() - INTERVAL '60 days'
        AND p.created_at < NOW() - INTERVAL '30 days';

    -- Calculate active users (unique users who purchased in last 30 days)
    SELECT COUNT(DISTINCT pur.user_id)
    INTO active_users
    FROM public.plugins p
    JOIN public.plugin_purchases pur ON p.id = pur.plugin_id
    WHERE p.author_id = p_user_id
        AND pur.status = 'completed'
        AND pur.purchased_at >= NOW() - INTERVAL '30 days';

    -- Set revenue
    total_revenue := v_current_revenue;

    -- Set downloads
    total_downloads := COALESCE(v_current_downloads, 0);

    -- Calculate percentage changes
    IF v_previous_revenue > 0 THEN
        revenue_change_percentage := ROUND(
            ((v_current_revenue - v_previous_revenue) / v_previous_revenue * 100)::numeric,
            1
        );
    ELSE
        revenue_change_percentage := CASE WHEN v_current_revenue > 0 THEN 100 ELSE 0 END;
    END IF;

    IF v_previous_downloads > 0 THEN
        downloads_change_percentage := ROUND(
            ((v_current_downloads - v_previous_downloads::numeric) / v_previous_downloads * 100)::numeric,
            1
        );
    ELSE
        downloads_change_percentage := CASE WHEN v_current_downloads > 0 THEN 100 ELSE 0 END;
    END IF;

    RETURN QUERY SELECT
        plugin_count,
        total_revenue,
        total_downloads,
        active_users,
        revenue_change_percentage,
        downloads_change_percentage;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get recent activity for a user
CREATE OR REPLACE FUNCTION get_user_recent_activity(p_user_id UUID, p_limit INTEGER DEFAULT 10)
RETURNS TABLE (
    id UUID,
    activity_type TEXT,
    message TEXT,
    amount NUMERIC,
    rating INTEGER,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        activity.id,
        activity.activity_type,
        activity.message,
        activity.amount,
        activity.rating,
        activity.created_at
    FROM (
        -- Purchases
        SELECT
            pur.id,
            'purchase' as activity_type,
            'User purchased ' || p.name as message,
            pur.amount,
            NULL::INTEGER as rating,
            pur.purchased_at as created_at
        FROM public.plugin_purchases pur
        JOIN public.plugins p ON pur.plugin_id = p.id
        WHERE p.author_id = p_user_id
            AND pur.status = 'completed'

        UNION ALL

        -- Reviews
        SELECT
            r.id,
            'review' as activity_type,
            'User left a ' || r.rating || '-star review on ' || p.name as message,
            NULL::NUMERIC as amount,
            r.rating,
            r.created_at
        FROM public.plugin_reviews r
        JOIN public.plugins p ON r.plugin_id = p.id
        WHERE p.author_id = p_user_id

        UNION ALL

        -- Plugin updates/publishes
        SELECT
            p.id,
            'update' as activity_type,
            'Your ' || p.name || ' plugin was ' ||
                CASE
                    WHEN p.updated_at > p.created_at + INTERVAL '1 minute'
                    THEN 'updated'
                    ELSE 'published'
                END as message,
            NULL::NUMERIC as amount,
            NULL::INTEGER as rating,
            GREATEST(p.created_at, p.updated_at) as created_at
        FROM public.plugins p
        WHERE p.author_id = p_user_id
            AND p.status = 'published'
    ) activity
    ORDER BY activity.created_at DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get top performing plugins for a user
CREATE OR REPLACE FUNCTION get_user_top_plugins(p_user_id UUID, p_limit INTEGER DEFAULT 5)
RETURNS TABLE (
    id UUID,
    name TEXT,
    downloads INTEGER,
    revenue NUMERIC,
    rating NUMERIC,
    trend TEXT,
    trend_percentage NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.id,
        p.name,
        p.downloads,
        COALESCE(SUM(pur.amount), 0) as revenue,
        p.rating,
        CASE
            WHEN p.downloads > 100 THEN 'up'
            WHEN p.downloads < 50 THEN 'down'
            ELSE 'stable'
        END as trend,
        CASE
            WHEN p.downloads > 100 THEN 12.0
            WHEN p.downloads < 50 THEN -5.0
            ELSE 0.0
        END as trend_percentage
    FROM public.plugins p
    LEFT JOIN public.plugin_purchases pur ON p.id = pur.plugin_id AND pur.status = 'completed'
    WHERE p.author_id = p_user_id
        AND p.status = 'published'
    GROUP BY p.id, p.name, p.downloads, p.rating
    ORDER BY revenue DESC, p.downloads DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a scheduled job to refresh user statistics (if pg_cron is available)
-- This would be run manually or via a cron job in production
-- SELECT cron.schedule('refresh-user-stats', '0 */6 * * *', 'SELECT refresh_user_statistics()');

-- Initial refresh of materialized view
REFRESH MATERIALIZED VIEW public.user_statistics;
