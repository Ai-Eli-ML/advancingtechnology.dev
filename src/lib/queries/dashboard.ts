/**
 * Dashboard-related database queries with type safety and validation
 */

import { z } from 'zod';
import { createSupabaseBrowser } from '@/lib/supabase';

// Zod schemas for validation
export const DashboardStatsSchema = z.object({
  plugin_count: z.number().int().nonnegative(),
  total_revenue: z.number().nonnegative(),
  total_downloads: z.number().int().nonnegative(),
  active_users: z.number().int().nonnegative(),
  revenue_change_percentage: z.number(),
  downloads_change_percentage: z.number(),
});

export const RecentActivitySchema = z.object({
  id: z.string().uuid(),
  activity_type: z.enum(['purchase', 'review', 'update']),
  message: z.string(),
  amount: z.number().nullable(),
  rating: z.number().int().min(1).max(5).nullable(),
  created_at: z.string().datetime(),
});

export const TopPluginSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  downloads: z.number().int().nonnegative(),
  revenue: z.number().nonnegative(),
  rating: z.number().min(0).max(5),
  trend: z.enum(['up', 'down', 'stable']),
  trend_percentage: z.number(),
});

export type DashboardStats = z.infer<typeof DashboardStatsSchema>;
export type RecentActivity = z.infer<typeof RecentActivitySchema>;
export type TopPlugin = z.infer<typeof TopPluginSchema>;

/**
 * Get dashboard statistics for a user (client-side)
 */
export async function getDashboardStats(userId: string): Promise<DashboardStats> {
  const supabase = createSupabaseBrowser();

  const { data, error } = await supabase.rpc('get_user_dashboard_stats', {
    p_user_id: userId,
  });

  if (error) {
    throw new Error(`Failed to fetch dashboard stats: ${error.message}`);
  }

  // RPC returns an array with single object
  const stats = Array.isArray(data) && data.length > 0 ? data[0] : data;

  if (!stats) {
    // Return default stats if user has no data yet
    return {
      plugin_count: 0,
      total_revenue: 0,
      total_downloads: 0,
      active_users: 0,
      revenue_change_percentage: 0,
      downloads_change_percentage: 0,
    };
  }

  return DashboardStatsSchema.parse(stats);
}

/**
 * Get dashboard statistics for a user (server-side)
 */

/**
 * Get recent activity for a user (client-side)
 */
export async function getRecentActivity(
  userId: string,
  limit: number = 10
): Promise<RecentActivity[]> {
  const supabase = createSupabaseBrowser();

  const { data, error } = await supabase.rpc('get_user_recent_activity', {
    p_user_id: userId,
    p_limit: limit,
  });

  if (error) {
    throw new Error(`Failed to fetch recent activity: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return [];
  }

  return z.array(RecentActivitySchema).parse(data);
}

/**
 * Get recent activity for a user (server-side)
 */

/**
 * Get top performing plugins for a user (client-side)
 */
export async function getTopPlugins(
  userId: string,
  limit: number = 5
): Promise<TopPlugin[]> {
  const supabase = createSupabaseBrowser();

  const { data, error } = await supabase.rpc('get_user_top_plugins', {
    p_user_id: userId,
    p_limit: limit,
  });

  if (error) {
    throw new Error(`Failed to fetch top plugins: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return [];
  }

  return z.array(TopPluginSchema).parse(data);
}

/**
 * Get top performing plugins for a user (server-side)
 */

/**
 * Get all dashboard data in a single call (optimized for performance)
 */
export async function getAllDashboardData(userId: string) {
  // Execute all queries in parallel for optimal performance
  const [stats, activity, topPlugins] = await Promise.all([
    getDashboardStats(userId),
    getRecentActivity(userId, 10),
    getTopPlugins(userId, 5),
  ]);

  return {
    stats,
    activity,
    topPlugins,
  };
}

/**
 * Get all dashboard data in a single call (server-side)
 */

/**
 * Format activity time to human-readable format
 */
export function formatActivityTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) {
    return 'just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  } else {
    return date.toLocaleDateString();
  }
}

/**
 * Format currency amount
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}
