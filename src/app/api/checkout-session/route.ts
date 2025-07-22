import { NextRequest, NextResponse } from 'next/server';

interface CheckoutRequest {
  pluginId: string;
  priceId?: string;
  quantity?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json();
    
    if (!body.pluginId) {
      return NextResponse.json(
        { error: 'Plugin ID is required' },
        { status: 400 }
      );
    }
    
    // Simulate creating a checkout session
    const sessionId = `cs_test_${Math.random().toString(36).substring(2, 15)}`;
    
    // In a real implementation, this would:
    // 1. Validate the plugin exists
    // 2. Check user authentication
    // 3. Create a Stripe checkout session
    // 4. Return the session URL
    
    return NextResponse.json({
      sessionId,
      url: `/checkout/preview?session=${sessionId}`,
      status: 'pending',
      message: 'This is a demo checkout session. In production, this would redirect to Stripe.',
      plugin: {
        id: body.pluginId,
        quantity: body.quantity || 1
      }
    });
  } catch (error) {
    console.error('Checkout session error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get('session_id');
  
  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID is required' },
      { status: 400 }
    );
  }
  
  // Mock session data
  return NextResponse.json({
    sessionId,
    status: 'complete',
    customerEmail: 'demo@example.com',
    amountTotal: 2900, // $29.00 in cents
    currency: 'usd',
    paymentStatus: 'paid',
    message: 'This is a demo session. No actual payment was processed.'
  });
}