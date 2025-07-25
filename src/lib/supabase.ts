import { createBrowserClient } from '@supabase/ssr'

// Browser client for client-side usage
export function createSupabaseBrowser() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // During build time, use placeholder values
  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      throw new Error('Missing Supabase environment variables')
    }
    // Return a dummy URL for build time
    return createBrowserClient(
      'https://placeholder.supabase.co',
      'placeholder-anon-key'
    )
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}