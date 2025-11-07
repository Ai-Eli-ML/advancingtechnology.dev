/**
 * User-related database queries with type safety and validation
 */

import { z } from 'zod';
import { createSupabaseBrowser } from '@/lib/supabase';

// Zod schemas for validation
export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  full_name: z.string().nullable(),
  display_name: z.string().nullable(),
  avatar_url: z.string().url().nullable(),
  bio: z.string().nullable(),
  website_url: z.string().url().nullable(),
  github_url: z.string().url().nullable(),
  twitter_url: z.string().url().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const UserStatisticsSchema = z.object({
  user_id: z.string().uuid(),
  email: z.string().email().nullable(),
  display_name: z.string().nullable(),
  full_name: z.string().nullable(),
  avatar_url: z.string().url().nullable(),
  plugin_count: z.number().int().nonnegative(),
  published_plugin_count: z.number().int().nonnegative(),
  total_downloads: z.number().int().nonnegative(),
  avg_plugin_rating: z.number().min(0).max(5),
  total_revenue: z.number().nonnegative(),
  revenue_last_30_days: z.number().nonnegative(),
  revenue_last_7_days: z.number().nonnegative(),
  total_purchases_made: z.number().int().nonnegative(),
  total_reviews_written: z.number().int().nonnegative(),
  last_plugin_created: z.string().datetime().nullable(),
  last_purchase_date: z.string().datetime().nullable(),
  last_review_date: z.string().datetime().nullable(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
export type UserStatistics = z.infer<typeof UserStatisticsSchema>;

/**
 * Get user profile by user ID (client-side)
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = createSupabaseBrowser();

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No profile exists yet
      return null;
    }
    throw new Error(`Failed to fetch user profile: ${error.message}`);
  }

  return UserProfileSchema.parse(data);
}

/**
 * Get user profile by user ID (server-side)
 */

/**
 * Get user statistics (client-side)
 */
export async function getUserStatistics(userId: string): Promise<UserStatistics | null> {
  const supabase = createSupabaseBrowser();

  const { data, error } = await supabase
    .from('user_statistics')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No statistics yet
      return null;
    }
    throw new Error(`Failed to fetch user statistics: ${error.message}`);
  }

  return UserStatisticsSchema.parse(data);
}

/**
 * Get user statistics (server-side)
 */

/**
 * Create or update user profile
 */
export async function upsertUserProfile(
  userId: string,
  profile: Partial<Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>>
): Promise<UserProfile> {
  const supabase = createSupabaseBrowser();

  const { data, error } = await supabase
    .from('user_profiles')
    .upsert({
      id: userId,
      ...profile,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to upsert user profile: ${error.message}`);
  }

  return UserProfileSchema.parse(data);
}

/**
 * Get current authenticated user with profile
 */
export async function getCurrentUserWithProfile() {
  const supabase = createSupabaseBrowser();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  const profile = await getUserProfile(user.id);

  return {
    user,
    profile,
  };
}

/**
 * Get current authenticated user with profile (server-side)
 */
