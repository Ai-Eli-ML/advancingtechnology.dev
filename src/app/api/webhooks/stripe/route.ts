import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { createSupabaseServer } from '@/lib/supabase-server';

// Initialize Stripe lazily
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(key, {
    apiVersion: '2025-10-29.clover',
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = (await headers()).get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature found' },
        { status: 400 }
      );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      const stripe = getStripe();
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseServer();

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.payment_status === 'paid') {
          const { pluginId, userId } = session.metadata || {};
          
          if (!pluginId || !userId) {
            console.error('Missing metadata in checkout session:', session.id);
            break;
          }

          // Update purchase status to completed
          const { error: updateError } = await supabase
            .from('plugin_purchases')
            .update({
              status: 'completed',
              stripe_payment_intent_id: session.payment_intent as string,
            })
            .eq('stripe_session_id', session.id);

          if (updateError) {
            console.error('Failed to update purchase:', updateError);
            break;
          }

          // Increment plugin downloads count
          await supabase.rpc('increment_plugin_downloads', {
            plugin_id: pluginId,
          });

          console.log(`Purchase completed for plugin ${pluginId} by user ${userId}`);
        }
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Update purchase status to failed
        await supabase
          .from('plugin_purchases')
          .update({ status: 'failed' })
          .eq('stripe_session_id', session.id);
        
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        
        // Update purchase status to refunded
        await supabase
          .from('plugin_purchases')
          .update({ status: 'refunded' })
          .eq('stripe_payment_intent_id', charge.payment_intent);
        
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// Stripe requires raw body for webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};