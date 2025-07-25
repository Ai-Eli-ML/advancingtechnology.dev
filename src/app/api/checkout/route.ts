import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase-server';
import { z } from 'zod';
import Stripe from 'stripe';

// Initialize Stripe lazily
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(key, {
    apiVersion: '2025-06-30.basil',
  });
}

// Validation schema
const checkoutSchema = z.object({
  pluginId: z.string().uuid(),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const supabase = await createSupabaseServer();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Validate request body
    const body = await request.json();
    const validationResult = checkoutSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { pluginId, successUrl, cancelUrl } = validationResult.data;

    // Fetch plugin details from Supabase
    const { data: plugin, error: pluginError } = await supabase
      .from('plugins')
      .select('*')
      .eq('id', pluginId)
      .eq('status', 'published')
      .single();

    if (pluginError || !plugin) {
      return NextResponse.json(
        { error: 'Plugin not found or not available' },
        { status: 404 }
      );
    }

    // Check if plugin is free
    if (plugin.price === 0) {
      return NextResponse.json(
        { error: 'This plugin is free and does not require purchase' },
        { status: 400 }
      );
    }

    // Check if user already owns the plugin
    const { data: existingPurchase } = await supabase
      .from('plugin_purchases')
      .select('id')
      .eq('plugin_id', pluginId)
      .eq('user_id', user.id)
      .eq('status', 'completed')
      .single();

    if (existingPurchase) {
      return NextResponse.json(
        { error: 'You already own this plugin' },
        { status: 400 }
      );
    }

    // Get Stripe instance
    const stripe = getStripe();
    
    // Create or retrieve Stripe customer
    let customerId: string;
    
    // Check if user has a Stripe customer ID stored
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();

    if (profile?.stripe_customer_id) {
      customerId = profile.stripe_customer_id;
    } else {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabaseUserId: user.id,
        },
      });
      customerId = customer.id;

      // Store customer ID for future use
      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id);
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: plugin.name,
              description: plugin.tagline,
              images: plugin.cover_image_url ? [plugin.cover_image_url] : undefined,
              metadata: {
                pluginId: plugin.id,
              },
            },
            unit_amount: Math.round(plugin.price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/marketplace/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/marketplace/${plugin.slug}`,
      metadata: {
        pluginId: plugin.id,
        userId: user.id,
      },
    });

    // Create pending purchase record
    const { error: purchaseError } = await supabase
      .from('plugin_purchases')
      .insert({
        plugin_id: plugin.id,
        user_id: user.id,
        stripe_session_id: session.id,
        amount: plugin.price,
        currency: 'usd',
        status: 'pending',
      });

    if (purchaseError) {
      console.error('Failed to create purchase record:', purchaseError);
      // Don't fail the request, as the webhook will handle this
    }

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

// Handle Stripe webhook events
export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id');
  
  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID required' },
      { status: 400 }
    );
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer'],
    });

    return NextResponse.json({
      sessionId: session.id,
      status: session.payment_status,
      customerEmail: session.customer_details?.email,
      amountTotal: session.amount_total,
      currency: session.currency,
    });
  } catch (error) {
    console.error('Error retrieving session:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    );
  }
}