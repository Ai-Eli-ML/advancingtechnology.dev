import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createSupabaseMiddleware } from '@/lib/supabase-middleware'

// MAINTENANCE MODE - Set to 'true' to enable maintenance mode
const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === 'true'

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

  // MAINTENANCE MODE CHECK - Redirect all traffic to maintenance page
  if (MAINTENANCE_MODE) {
    // Allow access to maintenance page, static assets, and API routes
    const isMaintenancePage = pathname === '/maintenance'
    const isStaticAsset = pathname.startsWith('/_next') ||
                          pathname.startsWith('/favicon') ||
                          pathname.includes('.')
    const isApiRoute = pathname.startsWith('/api')

    if (!isMaintenancePage && !isStaticAsset && !isApiRoute) {
      return NextResponse.redirect(new URL('/maintenance', req.url))
    }

    // If on maintenance page, just return
    if (isMaintenancePage) {
      return res
    }
  }

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
