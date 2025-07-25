'use server';

import { createSupabaseServer } from '@/lib/supabase-server';

export interface PluginWithCategories {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string | null;
  price: number;
  cover_image_url: string | null;
  rating: number;
  review_count: number;
  downloads: number;
  active_users: number;
  verified: boolean;
  featured: boolean;
  is_new: boolean;
  created_at: string;
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

interface FetchPluginsOptions {
  search?: string;
  category?: string;
  viewMode?: 'all' | 'featured' | 'new' | 'popular';
  limit?: number;
  offset?: number;
}

export async function fetchPlugins(options: FetchPluginsOptions = {}) {
  const supabase = await createSupabaseServer();
  
  const {
    search = '',
    category = 'All',
    viewMode = 'all',
    limit = 50,
    offset = 0,
  } = options;

  // Start with base query
  let query = supabase
    .from('plugins')
    .select(`
      *,
      plugin_categories!inner(
        categories(
          id,
          name,
          slug
        )
      )
    `)
    .eq('status', 'published')
    .range(offset, offset + limit - 1);

  // Apply view mode filters
  switch (viewMode) {
    case 'featured':
      query = query.eq('featured', true);
      break;
    case 'new':
      query = query.order('created_at', { ascending: false });
      break;
    case 'popular':
      query = query.or('price.eq.0,rating.gte.4');
      break;
  }

  // Apply category filter
  if (category !== 'All') {
    query = query.eq('plugin_categories.categories.slug', category.toLowerCase());
  }

  // Apply search filter
  if (search) {
    query = query.or(`name.ilike.%${search}%,tagline.ilike.%${search}%`);
  }

  // Add default ordering
  if (viewMode !== 'new') {
    query = query.order('rating', { ascending: false })
      .order('downloads', { ascending: false });
  }

  const { data: plugins, error } = await query;

  if (error) {
    console.error('Error fetching plugins:', error);
    return [];
  }

  // Transform the data to match our interface
  // Transform the data to match our interface
  const transformedPlugins: PluginWithCategories[] = plugins.map((plugin: {
    plugin_categories?: Array<{ categories: { id: string; name: string; slug: string } }>;
    [key: string]: unknown;
  }) => ({
    ...plugin,
    categories: plugin.plugin_categories?.map((pc) => pc.categories).filter(Boolean) || [],
  }) as PluginWithCategories);

  return transformedPlugins;
}

export async function fetchCategories() {
  const supabase = await createSupabaseServer();
  
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return categories;
}

export async function fetchPluginBySlug(slug: string) {
  const supabase = await createSupabaseServer();
  
  const { data: plugin, error } = await supabase
    .from('plugins')
    .select(`
      *,
      plugin_categories(
        categories(
          id,
          name,
          slug
        )
      ),
      plugin_versions(
        id,
        version,
        changelog,
        created_at
      )
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('Error fetching plugin:', error);
    return null;
  }

  // Transform the data
  interface PluginVersion {
    id: string;
    version: string;
    changelog: string | null;
    created_at: string;
  }
  
  const transformedPlugin: PluginWithCategories & { versions?: PluginVersion[] } = {
    ...plugin,
    categories: plugin.plugin_categories?.map((pc: {
      categories: { id: string; name: string; slug: string };
    }) => pc.categories).filter(Boolean) || [],
    versions: plugin.plugin_versions || [],
  };

  return transformedPlugin;
}

export async function checkUserPurchase(pluginId: string) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const { data: purchase } = await supabase
    .from('plugin_purchases')
    .select('id')
    .eq('plugin_id', pluginId)
    .eq('user_id', user.id)
    .eq('status', 'completed')
    .single();

  return !!purchase;
}