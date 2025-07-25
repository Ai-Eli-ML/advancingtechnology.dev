import { createBrowserClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

// Middleware client for edge runtime
export function createSupabaseMiddleware(req: NextRequest, res: NextResponse) {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            res.cookies.set(name, value)
          )
        },
      },
    }
  )
}