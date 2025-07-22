import { NextRequest, NextResponse } from 'next/server';

interface AuthRequest {
  email: string;
  password: string;
  name?: string;
  action: 'login' | 'signup';
}

// Mock user data
const mockUser = {
  id: 'usr_demo123',
  email: 'demo@advancingtechnology.dev',
  name: 'Demo User',
  role: 'developer',
  createdAt: new Date().toISOString()
};

export async function POST(request: NextRequest) {
  try {
    const body: AuthRequest = await request.json();
    
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (body.action === 'signup') {
      // Mock signup
      return NextResponse.json({
        user: {
          ...mockUser,
          email: body.email,
          name: body.name || 'New User'
        },
        token: `demo_token_${Date.now()}`,
        message: 'Account created successfully! This is a demo - no real account was created.'
      });
    }
    
    // Mock login
    if (body.email === 'demo@example.com' && body.password === 'demo123') {
      return NextResponse.json({
        user: mockUser,
        token: `demo_token_${Date.now()}`,
        message: 'Login successful! Use demo@example.com / demo123 for testing.'
      });
    }
    
    // Invalid credentials
    return NextResponse.json(
      { error: 'Invalid email or password. Try demo@example.com / demo123' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Mock session check
  return NextResponse.json({
    authenticated: false,
    message: 'This is a demo auth endpoint. Use POST to login/signup.'
  });
}