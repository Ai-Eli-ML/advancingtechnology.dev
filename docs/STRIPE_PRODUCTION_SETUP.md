# Stripe Production Configuration Guide

## Overview

This guide covers the complete setup of Stripe for production deployment on advancingtechnology.dev, including webhook configuration, security, and testing procedures.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Production Keys Setup](#production-keys-setup)
3. [Webhook Configuration](#webhook-configuration)
4. [Security Configuration](#security-configuration)
5. [Testing & Validation](#testing--validation)
6. [Monitoring & Alerts](#monitoring--alerts)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts
- Stripe account with verified business information
- Production-ready business details configured
- Bank account connected for payouts

### Required Access
- Admin access to Stripe Dashboard
- Admin access to Vercel project
- Access to advancingtechnology.dev domain DNS

---

## Production Keys Setup

### Step 1: Activate Production Mode

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Toggle from "Test mode" to "Live mode" (top right)
3. Complete business verification if not already done

### Step 2: Retrieve API Keys

1. Navigate to **Developers → API Keys**
2. Copy the following keys:
   - **Publishable key**: `pk_live_...`
   - **Secret key**: `sk_live_...`

⚠️ **Security Note**: The secret key can charge credit cards. Never expose it in client-side code or commit it to git.

### Step 3: Configure Environment Variables

Add to Vercel Dashboard → Settings → Environment Variables:

```bash
# Production Stripe Keys
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE
```

**Deployment Scope**: Production only

---

## Webhook Configuration

### Why Webhooks Are Critical

Webhooks ensure:
- Payment confirmations are processed reliably
- Purchase records are updated even if user closes browser
- Refunds and disputes are handled automatically
- System remains in sync with Stripe

### Step 1: Create Webhook Endpoint

1. Go to **Developers → Webhooks**
2. Click **Add endpoint**
3. Enter endpoint URL:
   ```
   https://advancingtechnology.dev/api/webhooks/stripe
   ```

### Step 2: Configure Webhook Events

Select the following events (these match the handler in `/src/app/api/webhooks/stripe/route.ts`):

#### Required Events (Critical)
- ✅ `checkout.session.completed` - Payment successful
- ✅ `checkout.session.expired` - Payment session expired
- ✅ `charge.refunded` - Payment refunded

#### Recommended Events (Optional but useful)
- ⚠️ `payment_intent.succeeded` - Payment confirmed
- ⚠️ `payment_intent.payment_failed` - Payment failed
- ⚠️ `charge.dispute.created` - Customer disputed charge
- ⚠️ `charge.dispute.closed` - Dispute resolved
- ⚠️ `customer.subscription.created` - If adding subscriptions later
- ⚠️ `customer.subscription.deleted` - If adding subscriptions later

### Step 3: Retrieve Webhook Secret

1. After creating the webhook, click on it
2. Click **Reveal** next to "Signing secret"
3. Copy the secret (format: `whsec_...`)

### Step 4: Add Webhook Secret to Environment

Add to Vercel Dashboard:

```bash
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

**Deployment Scope**: Production only

### Step 5: Verify Webhook Signature Implementation

The webhook handler at `/src/app/api/webhooks/stripe/route.ts` already includes signature verification:

```typescript
// Automatic signature verification
const stripe = getStripe();
event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
```

This ensures webhooks are authentic and from Stripe.

---

## Security Configuration

### 1. Webhook Signature Verification

✅ **Already Implemented**: The webhook handler verifies signatures using `stripe.webhooks.constructEvent()`

### 2. Environment Variable Security

```bash
# ✅ DO: Use Vercel environment variables
# Production keys stored in Vercel Dashboard

# ❌ DON'T: Hardcode or commit keys
# const stripeKey = "sk_live_..." // NEVER DO THIS
```

### 3. HTTPS Enforcement

✅ **Automatic**: Vercel enforces HTTPS for all production deployments

### 4. Rate Limiting

Consider adding rate limiting to checkout endpoint to prevent abuse:

```typescript
// Future enhancement: Add rate limiting
// See SECURITY_HARDENING.md for implementation
```

### 5. Webhook Endpoint Security

Current implementation:
- ✅ Signature verification required
- ✅ Raw body parsing for signature validation
- ✅ Error handling and logging
- ✅ Idempotent operations (safe to retry)

---

## Testing & Validation

### Pre-Production Testing

#### 1. Test Mode Validation

Before going live, test in Stripe test mode:

```bash
# Use test keys in development
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...
```

Test scenarios:
- ✅ Successful payment flow
- ✅ Expired session handling
- ✅ Webhook delivery and processing
- ✅ Database updates on payment completion

#### 2. Webhook Testing with Stripe CLI

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local development
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger test events
stripe trigger checkout.session.completed
stripe trigger checkout.session.expired
stripe trigger charge.refunded
```

#### 3. Production Smoke Test

After deploying to production:

1. Create a test plugin with $0.50 price
2. Complete a real purchase using test card: `4242 4242 4242 4242`
3. Verify webhook is received
4. Check database for completed purchase record
5. Refund the test payment
6. Verify refund webhook is processed

### Monitoring Webhook Delivery

#### Stripe Dashboard

1. Go to **Developers → Webhooks**
2. Click on your production webhook
3. View **Logs** tab to see delivery attempts

#### Key Metrics to Monitor
- ✅ Success rate (should be >99%)
- ⚠️ Failed deliveries (investigate immediately)
- ⏱️ Response time (should be <2 seconds)

#### Webhook Retry Behavior

Stripe automatically retries failed webhooks:
- First retry: Immediately
- Subsequent retries: Exponential backoff
- Maximum retries: 3 days

**Important**: Ensure webhook handler is idempotent (safe to process multiple times).

---

## Monitoring & Alerts

### 1. Stripe Dashboard Monitoring

Monitor daily:
- **Balance** → Check pending and available balance
- **Payments** → Review recent transactions
- **Disputes** → Address any chargebacks immediately
- **Events** → Monitor webhook delivery status

### 2. Application Monitoring

Log important events:

```typescript
// Already implemented in webhook handler
console.log(`Purchase completed for plugin ${pluginId} by user ${userId}`);
console.error('Webhook signature verification failed:', err);
```

### 3. Sentry Integration (Recommended)

Add Sentry to track errors:

```typescript
import * as Sentry from '@sentry/nextjs';

// In webhook handler
try {
  // Process webhook
} catch (error) {
  Sentry.captureException(error, {
    tags: { webhook: 'stripe' },
    extra: { eventType: event.type }
  });
}
```

### 4. Database Monitoring

Monitor `plugin_purchases` table for:
- Stuck "pending" purchases (>1 hour old)
- Failed purchase patterns
- Refund frequency

```sql
-- Check for old pending purchases
SELECT * FROM plugin_purchases
WHERE status = 'pending'
AND purchased_at < NOW() - INTERVAL '1 hour';
```

---

## Troubleshooting

### Issue: Webhook Not Receiving Events

**Symptoms**: Payments complete in Stripe but database not updated

**Diagnosis**:
1. Check Stripe Dashboard → Webhooks → Your endpoint → Logs
2. Look for failed delivery attempts
3. Check response codes and error messages

**Solutions**:
- Verify endpoint URL is correct
- Ensure webhook secret matches environment variable
- Check Vercel deployment logs
- Verify no firewall blocking Stripe IPs

### Issue: Signature Verification Failed

**Symptoms**: `Invalid signature` error in logs

**Diagnosis**:
```bash
# Check webhook secret
echo $STRIPE_WEBHOOK_SECRET

# Verify it matches Stripe Dashboard
```

**Solutions**:
- Ensure using raw request body (not parsed JSON)
- Verify webhook secret is correct
- Check for extra whitespace in environment variable
- Regenerate webhook secret if necessary

### Issue: Duplicate Purchase Records

**Symptoms**: Multiple purchase records for same transaction

**Diagnosis**:
- Check for webhook retry attempts
- Review application logs for errors

**Solutions**:
- Ensure handler is idempotent
- Use `stripe_session_id` for deduplication
- Add unique constraint: `UNIQUE(plugin_id, user_id)`

### Issue: Test Mode Keys in Production

**Symptoms**: Payments not processing, "test mode" indicators visible

**Diagnosis**:
```bash
# Check Vercel environment variables
vercel env ls

# Look for sk_test_ or pk_test_ prefixes
```

**Solutions**:
- Update environment variables with production keys
- Redeploy application
- Clear browser cache

### Emergency Procedures

#### Webhook Endpoint Down

If webhook endpoint is failing:

1. **Immediate**: Disable webhook in Stripe Dashboard
2. **Fix**: Deploy hotfix for webhook handler
3. **Verify**: Test webhook with Stripe CLI
4. **Re-enable**: Activate webhook in dashboard
5. **Replay**: Use Stripe Dashboard to replay missed events

#### Key Compromise

If secret key is exposed:

1. **Immediately**: Roll secret key in Stripe Dashboard
2. **Update**: New key in Vercel environment variables
3. **Redeploy**: Trigger new deployment
4. **Monitor**: Watch for unauthorized charges
5. **Contact**: Stripe support if suspicious activity

#### Mass Refund Required

For bulk refunds:

```bash
# Use Stripe CLI
stripe refunds create --charge=ch_XXX --reason=requested_by_customer

# Or use Stripe Dashboard bulk actions
```

---

## Production Checklist

Before going live:

### Configuration
- [ ] Production API keys configured in Vercel
- [ ] Webhook endpoint created and active
- [ ] Webhook secret configured
- [ ] All required events selected
- [ ] Test payment completed successfully

### Security
- [ ] No test keys in production environment
- [ ] Keys not committed to git repository
- [ ] Webhook signature verification working
- [ ] HTTPS enforced on all endpoints
- [ ] Error logging configured

### Business Setup
- [ ] Business information verified in Stripe
- [ ] Bank account connected for payouts
- [ ] Tax settings configured
- [ ] Receipt emails configured
- [ ] Refund policy documented

### Monitoring
- [ ] Webhook delivery monitoring enabled
- [ ] Error tracking configured (Sentry)
- [ ] Database alerts set up
- [ ] Dashboard access for team members
- [ ] Backup contact for emergencies

### Documentation
- [ ] Team trained on refund process
- [ ] Emergency procedures documented
- [ ] Support email configured
- [ ] Customer communication templates ready

---

## Additional Resources

- [Stripe API Documentation](https://stripe.com/docs/api)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Stripe Security Best Practices](https://stripe.com/docs/security/guide)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Next.js Stripe Integration](https://vercel.com/guides/getting-started-with-nextjs-stripe)

---

## Support Contacts

- **Stripe Support**: https://support.stripe.com/
- **Emergency Contact**: support@stripe.com
- **Status Page**: https://status.stripe.com/

---

**Last Updated**: November 6, 2025
**Maintained By**: AdvancingTechnology Development Team
