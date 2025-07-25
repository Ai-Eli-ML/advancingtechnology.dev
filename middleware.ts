import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createSupabaseMiddleware } from '@/lib/supabase-middleware'

// Define protected routes
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/settings',
  '/admin',
]

// Define auth routes (accessible only when not authenticated)
const authRoutes = [
  '/auth',
]

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const pathname = req.nextUrl.pathname

  // Create Supabase client for middleware
  const supabase = createSupabaseMiddleware(req, res)
  
  try {
    // Get session
    const { data: { session } } = await supabase.auth.getSession()
    
    // Check if the route is protected
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))
    
    // Redirect to auth if accessing protected route without session
    if (isProtectedRoute && !session) {
      const redirectUrl = new URL('/auth', req.url)
      redirectUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(redirectUrl)
    }
    
    // Redirect to dashboard if accessing auth routes with active session
    if (isAuthRoute && session) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    
    // Continue with the request
    return res
  } catch (error) {
    console.error('Middleware error:', error)
    // In case of error, allow the request to continue
    return res
  }
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}