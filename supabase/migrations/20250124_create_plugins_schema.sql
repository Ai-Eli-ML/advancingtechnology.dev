-- Create plugins table
CREATE TABLE IF NOT EXISTS public.plugins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) DEFAULT 0 NOT NULL CHECK (price >= 0),
    cover_image_url TEXT,
    rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0 CHECK (review_count >= 0),
    downloads INTEGER DEFAULT 0 CHECK (downloads >= 0),
    active_users INTEGER DEFAULT 0 CHECK (active_users >= 0),
    verified BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'suspended'))
);

-- Create plugin_categories junction table
CREATE TABLE IF NOT EXISTS public.plugin_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    plugin_id UUID REFERENCES public.plugins(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(plugin_id, category_id)
);

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create plugin_versions table
CREATE TABLE IF NOT EXISTS public.plugin_versions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    plugin_id UUID REFERENCES public.plugins(id) ON DELETE CASCADE,
    version TEXT NOT NULL,
    changelog TEXT,
    download_url TEXT,
    min_app_version TEXT,
    max_app_version TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(plugin_id, version)
);

-- Create plugin_purchases table
CREATE TABLE IF NOT EXISTS public.plugin_purchases (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    plugin_id UUID REFERENCES public.plugins(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    stripe_payment_intent_id TEXT,
    stripe_session_id TEXT,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'usd',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    purchased_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(plugin_id, user_id)
);

-- Create plugin_reviews table
CREATE TABLE IF NOT EXISTS public.plugin_reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    plugin_id UUID REFERENCES public.plugins(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(plugin_id, user_id)
);

-- Create indexes
CREATE INDEX idx_plugins_slug ON public.plugins(slug);
CREATE INDEX idx_plugins_status ON public.plugins(status);
CREATE INDEX idx_plugins_featured ON public.plugins(featured);
CREATE INDEX idx_plugins_price ON public.plugins(price);
CREATE INDEX idx_plugins_rating ON public.plugins(rating);
CREATE INDEX idx_plugins_created_at ON public.plugins(created_at);
CREATE INDEX idx_plugin_categories_plugin_id ON public.plugin_categories(plugin_id);
CREATE INDEX idx_plugin_categories_category_id ON public.plugin_categories(category_id);
CREATE INDEX idx_plugin_purchases_user_id ON public.plugin_purchases(user_id);
CREATE INDEX idx_plugin_purchases_status ON public.plugin_purchases(status);
CREATE INDEX idx_plugin_reviews_plugin_id ON public.plugin_reviews(plugin_id);
CREATE INDEX idx_plugin_reviews_user_id ON public.plugin_reviews(user_id);

-- Enable RLS
ALTER TABLE public.plugins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plugin_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plugin_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plugin_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plugin_reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for plugins
CREATE POLICY "Plugins are viewable by everyone" ON public.plugins
    FOR SELECT USING (status = 'published');

CREATE POLICY "Users can insert their own plugins" ON public.plugins
    FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own plugins" ON public.plugins
    FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own plugins" ON public.plugins
    FOR DELETE USING (auth.uid() = author_id);

-- RLS Policies for categories (read-only for users)
CREATE POLICY "Categories are viewable by everyone" ON public.categories
    FOR SELECT USING (true);

-- RLS Policies for plugin_categories
CREATE POLICY "Plugin categories are viewable by everyone" ON public.plugin_categories
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM public.plugins 
        WHERE plugins.id = plugin_categories.plugin_id 
        AND plugins.status = 'published'
    ));

CREATE POLICY "Users can manage categories for their plugins" ON public.plugin_categories
    FOR ALL USING (EXISTS (
        SELECT 1 FROM public.plugins 
        WHERE plugins.id = plugin_categories.plugin_id 
        AND plugins.author_id = auth.uid()
    ));

-- RLS Policies for plugin_versions
CREATE POLICY "Plugin versions are viewable for published plugins" ON public.plugin_versions
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM public.plugins 
        WHERE plugins.id = plugin_versions.plugin_id 
        AND plugins.status = 'published'
    ));

CREATE POLICY "Users can manage versions for their plugins" ON public.plugin_versions
    FOR ALL USING (EXISTS (
        SELECT 1 FROM public.plugins 
        WHERE plugins.id = plugin_versions.plugin_id 
        AND plugins.author_id = auth.uid()
    ));

-- RLS Policies for plugin_purchases
CREATE POLICY "Users can view their own purchases" ON public.plugin_purchases
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own purchases" ON public.plugin_purchases
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Plugin authors can view purchases of their plugins" ON public.plugin_purchases
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM public.plugins 
        WHERE plugins.id = plugin_purchases.plugin_id 
        AND plugins.author_id = auth.uid()
    ));

-- RLS Policies for plugin_reviews
CREATE POLICY "Reviews are viewable by everyone" ON public.plugin_reviews
    FOR SELECT USING (true);

CREATE POLICY "Users can create one review per plugin" ON public.plugin_reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" ON public.plugin_reviews
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" ON public.plugin_reviews
    FOR DELETE USING (auth.uid() = user_id);

-- Function to update plugin rating after review changes
CREATE OR REPLACE FUNCTION update_plugin_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.plugins
    SET rating = (
        SELECT ROUND(AVG(rating)::numeric, 1)
        FROM public.plugin_reviews
        WHERE plugin_id = COALESCE(NEW.plugin_id, OLD.plugin_id)
    ),
    review_count = (
        SELECT COUNT(*)
        FROM public.plugin_reviews
        WHERE plugin_id = COALESCE(NEW.plugin_id, OLD.plugin_id)
    )
    WHERE id = COALESCE(NEW.plugin_id, OLD.plugin_id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update ratings
CREATE TRIGGER update_plugin_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.plugin_reviews
FOR EACH ROW
EXECUTE FUNCTION update_plugin_rating();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_plugins_updated_at BEFORE UPDATE ON public.plugins
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_plugin_reviews_updated_at BEFORE UPDATE ON public.plugin_reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment plugin downloads
CREATE OR REPLACE FUNCTION increment_plugin_downloads(plugin_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.plugins
    SET downloads = downloads + 1
    WHERE id = plugin_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert initial categories
INSERT INTO public.categories (name, slug, description) VALUES
    ('AI', 'ai', 'Artificial Intelligence and Machine Learning tools'),
    ('Development', 'development', 'Development tools and utilities'),
    ('Productivity', 'productivity', 'Productivity enhancement tools'),
    ('Enterprise', 'enterprise', 'Enterprise-grade solutions'),
    ('Media', 'media', 'Media processing and creation tools'),
    ('Analytics', 'analytics', 'Data analytics and visualization'),
    ('Integration', 'integration', 'Third-party integrations and connectors'),
    ('Security', 'security', 'Security and compliance tools'),
    ('Automation', 'automation', 'Workflow automation tools'),
    ('Communication', 'communication', 'Communication and collaboration tools'),
    ('NLP', 'nlp', 'Natural Language Processing tools'),
    ('Testing', 'testing', 'Testing and QA tools')
ON CONFLICT (slug) DO NOTHING;