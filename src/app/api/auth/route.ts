import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase-server';

interface AuthRequest {
  email: string;
  password: string;
  name?: string;
  action: 'login' | 'signup';
}

export async function POST(request: NextRequest) {
  try {
    const body: AuthRequest = await request.json();
    
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    const supabase = await createSupabaseServer();
    
    if (body.action === 'signup') {
      const { data, error } = await supabase.auth.signUp({
        email: body.email,
        password: body.password,
        options: {
          data: {
            name: body.name || '',
          },
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
      });
      
      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }
      
      return NextResponse.json({
        user: data.user,
        message: 'Check your email to confirm your account',
      });
    }
    
    // Login
    const { data, error } = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      user: data.user,
      session: data.session,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const supabase = await createSupabaseServer();
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    return NextResponse.json({
      authenticated: false,
      error: error.message,
    }, { status: 401 });
  }
  
  return NextResponse.json({
    authenticated: !!session,
    user: session?.user || null,
  });
}