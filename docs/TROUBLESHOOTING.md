# Production Troubleshooting Guide

## Overview

Comprehensive troubleshooting guide for common production issues on advancingtechnology.dev.

## Table of Contents

1. [General Debugging](#general-debugging)
2. [Build & Deployment Issues](#build--deployment-issues)
3. [Runtime Errors](#runtime-errors)
4. [Database Issues](#database-issues)
5. [Stripe Integration Issues](#stripe-integration-issues)
6. [Performance Issues](#performance-issues)
7. [Security Issues](#security-issues)
8. [Monitoring & Alerts](#monitoring--alerts)

---

## General Debugging

### Access Logs

#### Vercel Function Logs
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# View recent logs
vercel logs

# View logs for specific deployment
vercel logs [deployment-url]

# Stream logs in real-time
vercel logs --follow
```

#### Supabase Logs
1. Go to Supabase Dashboard
2. Navigate to **Logs**
3. Filter by:
   - API logs (requests)
   - Database logs (queries)
   - Auth logs (authentication events)

#### Sentry Error Tracking
1. Go to Sentry.io dashboard
2. Select project: advancingtechnology-dev-prod
3. View recent errors
4. Filter by:
   - Environment: production
   - Time range
   - Error type
   - User impact

### Debug Mode

Enable verbose logging:

```typescript
// lib/logger.ts
const logger = {
  debug: (...args: any[]) => {
    if (process.env.DEBUG === 'true') {
      console.log('[DEBUG]', ...args);
    }
  },
  error: (...args: any[]) => {
    console.error('[ERROR]', ...args);
  },
  warn: (...args: any[]) => {
    console.warn('[WARN]', ...args);
  }
};

export default logger;
```

Add to Vercel environment variables:
```bash
DEBUG=true
```

---

## Build & Deployment Issues

### Issue: Build Failing with TypeScript Errors

**Symptoms**:
```
Type error: Property 'X' does not exist on type 'Y'
```

**Diagnosis**:
```bash
# Run type-check locally
cd /home/workbench/Development-env/repos/advancingtechnology.dev
pnpm type-check
```

**Solutions**:
1. Fix type errors in code
2. Update type definitions
3. Add proper type annotations
4. Use type assertions only when absolutely necessary

**Quick Fix** (not recommended):
```typescript
// next.config.ts
typescript: {
  ignoreBuildErrors: true, // Only for emergency
}
```

### Issue: Build Failing with ESLint Errors

**Symptoms**:
```
ESLint: 'variable' is assigned a value but never used
```

**Diagnosis**:
```bash
pnpm lint
```

**Solutions**:
1. Fix linting errors
2. Remove unused variables
3. Add proper JSDoc comments
4. Update ESLint rules if false positive

**Quick Fix** (not recommended):
```typescript
// next.config.ts
eslint: {
  ignoreDuringBuilds: true, // Only for emergency
}
```

### Issue: Build Succeeds but Deployment Fails

**Symptoms**: Build logs show success but deployment never completes

**Diagnosis**:
1. Check Vercel dashboard for deployment status
2. Look for timeout errors in logs
3. Check for memory limits exceeded

**Solutions**:
- Reduce bundle size
- Split large components
- Optimize images
- Check for infinite loops during build

### Issue: Missing Environment Variables

**Symptoms**:
```
Error: NEXT_PUBLIC_SUPABASE_URL is not defined
```

**Diagnosis**:
```bash
# List environment variables
vercel env ls

# Pull environment variables
vercel env pull .env.local
```

**Solutions**:
1. Add missing variables in Vercel dashboard
2. Ensure variables scoped to Production
3. Redeploy after adding variables
4. Verify variable names match code

### Issue: Node.js Version Mismatch

**Symptoms**:
```
Error: The engine "node" is incompatible with this module
```

**Solutions**:
1. Update `package.json`:
```json
{
  "engines": {
    "node": "20.x"
  }
}
```

2. Set Node.js version in Vercel dashboard:
   - Settings → General → Node.js Version: 20.x

---

## Runtime Errors

### Issue: 500 Internal Server Error

**Symptoms**: Page loads with 500 error

**Diagnosis**:
```bash
# Check function logs
vercel logs --follow

# Look for error stack trace
```

**Common Causes**:
1. Unhandled exception in API route
2. Database connection failed
3. Missing environment variable
4. Invalid data format

**Solutions**:
```typescript
// Add try-catch to API routes
export async function GET(req: NextRequest) {
  try {
    // Your code
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Issue: "Cannot read property 'X' of undefined"

**Symptoms**: Page crashes with undefined error

**Diagnosis**:
- Check Sentry for error details
- Look at component where error occurs
- Verify data is loading before rendering

**Solutions**:
```typescript
// Add null checks
if (!data) return <LoadingSpinner />;

// Use optional chaining
const value = data?.nested?.property;

// Provide defaults
const items = data ?? [];
```

### Issue: Hydration Mismatch

**Symptoms**:
```
Error: Text content does not match server-rendered HTML
```

**Diagnosis**:
- Check for client-side only code in server components
- Look for browser APIs used during SSR

**Solutions**:
```typescript
// Use useEffect for client-side only code
'use client';

import { useEffect, useState } from 'react';

export default function Component() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <div>{/* Client-side content */}</div>;
}
```

### Issue: Infinite Redirect Loop

**Symptoms**: Browser keeps redirecting, eventually fails

**Diagnosis**:
- Check middleware.ts logic
- Look for conflicting redirect rules

**Solutions**:
```typescript
// Add redirect protection
export async function middleware(req: NextRequest) {
  // Prevent infinite redirects
  if (req.nextUrl.pathname === '/auth' && req.nextUrl.searchParams.get('from') === '/auth') {
    return NextResponse.next();
  }

  // Your redirect logic
}
```

---

## Database Issues

### Issue: "Database connection failed"

**Symptoms**:
```
Error: connect ETIMEDOUT
```

**Diagnosis**:
```bash
# Test connection
psql $SUPABASE_DB_URL -c "SELECT 1"

# Check Supabase status
curl https://status.supabase.com/api/v2/status.json
```

**Solutions**:
1. Verify Supabase URL is correct
2. Check if database is paused (free tier)
3. Verify firewall not blocking connection
4. Check connection pool limits

### Issue: "Too many connections"

**Symptoms**:
```
Error: remaining connection slots are reserved
```

**Diagnosis**:
```sql
-- Check active connections
SELECT count(*) FROM pg_stat_activity;

-- Check max connections
SHOW max_connections;
```

**Solutions**:
1. Use connection pooling URL
2. Close connections properly
3. Reduce concurrent requests
4. Upgrade Supabase plan

```typescript
// Ensure connections close
const supabase = await createSupabaseServer();
try {
  // Your query
} finally {
  // Connection automatically managed by Supabase client
}
```

### Issue: "Row Level Security violation"

**Symptoms**:
```
Error: new row violates row-level security policy
```

**Diagnosis**:
```sql
-- Check RLS policies
SELECT schemaname, tablename, policyname, cmd
FROM pg_policies
WHERE tablename = 'your_table';

-- Test as specific user
SET ROLE authenticated;
SELECT * FROM your_table;
```

**Solutions**:
1. Verify user is authenticated
2. Check policy conditions
3. Ensure auth.uid() returns expected value
4. Use service role key for admin operations

### Issue: Slow Queries

**Symptoms**: Database queries taking >2 seconds

**Diagnosis**:
```sql
-- Enable timing
\timing

-- Explain query
EXPLAIN ANALYZE
SELECT * FROM plugins WHERE status = 'published';

-- Find slow queries
SELECT query, mean_exec_time, calls
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

**Solutions**:
1. Add missing indexes
2. Reduce JOIN complexity
3. Use pagination/limits
4. Cache frequent queries

```sql
-- Add index
CREATE INDEX idx_plugins_status_rating
ON plugins(status, rating DESC)
WHERE status = 'published';
```

---

## Stripe Integration Issues

### Issue: Webhook Not Received

**Symptoms**: Payment succeeds but database not updated

**Diagnosis**:
1. Stripe Dashboard → Webhooks → Your endpoint
2. Check delivery attempts
3. Look for failed deliveries
4. Review response codes

**Solutions**:
1. Verify webhook URL: `https://advancingtechnology.dev/api/webhooks/stripe`
2. Check webhook secret matches environment
3. Ensure endpoint returns 200 status
4. Verify no rate limiting blocking webhook

```typescript
// app/api/webhooks/stripe/route.ts
export async function POST(request: NextRequest) {
  try {
    // ... webhook handling
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    // Still return 200 to prevent retries for invalid events
    return NextResponse.json({ error: error.message }, { status: 200 });
  }
}
```

### Issue: "Invalid signature"

**Symptoms**:
```
Webhook signature verification failed
```

**Diagnosis**:
```bash
# Check webhook secret
vercel env pull .env.local
cat .env.local | grep STRIPE_WEBHOOK_SECRET
```

**Solutions**:
1. Verify webhook secret is correct
2. Ensure using raw request body (not parsed JSON)
3. Check for whitespace in environment variable
4. Regenerate webhook secret if necessary

```typescript
// Correct implementation
const body = await request.text(); // Raw body
const signature = request.headers.get('stripe-signature');

const event = stripe.webhooks.constructEvent(
  body,
  signature!,
  process.env.STRIPE_WEBHOOK_SECRET!
);
```

### Issue: Payment Succeeds but Purchase Record Missing

**Symptoms**: Stripe shows payment but no record in database

**Diagnosis**:
1. Check Stripe webhook delivery logs
2. Review function logs for errors
3. Check database for partial records

**Solutions**:
1. Ensure webhook handler creates purchase record
2. Add error logging
3. Implement idempotency
4. Use transaction for atomic operations

```typescript
// Idempotent webhook handling
const { data: existing } = await supabase
  .from('plugin_purchases')
  .select('id')
  .eq('stripe_session_id', session.id)
  .single();

if (existing) {
  // Already processed
  return NextResponse.json({ received: true });
}

// Create purchase record
```

### Issue: Test Mode Keys in Production

**Symptoms**: Payments not processing, "test mode" visible

**Diagnosis**:
```bash
# Check for test keys
vercel env ls | grep STRIPE

# Look for sk_test_ or pk_test_ prefixes
```

**Solutions**:
1. Update to production keys (sk_live_, pk_live_)
2. Redeploy application
3. Clear browser cache
4. Test with real card

---

## Performance Issues

### Issue: Slow Page Load (>3 seconds)

**Diagnosis**:
```bash
# Run Lighthouse audit
npx lighthouse https://advancingtechnology.dev --view

# Check Vercel Analytics
# Dashboard → Analytics → Web Vitals
```

**Common Causes**:
1. Large JavaScript bundles
2. Unoptimized images
3. Slow database queries
4. No caching

**Solutions**:

#### Optimize Images
```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/plugin-cover.jpg"
  alt="Plugin"
  width={800}
  height={600}
  priority={false} // Lazy load below fold
  quality={85} // Balance quality/size
/>
```

#### Code Splitting
```typescript
// Dynamic imports for large components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSkeleton />,
  ssr: false // Client-side only if needed
});
```

#### Database Query Optimization
```typescript
// Use select to fetch only needed fields
const { data } = await supabase
  .from('plugins')
  .select('id, name, price') // Not SELECT *
  .eq('status', 'published')
  .limit(20); // Always paginate
```

### Issue: High Time to First Byte (TTFB >600ms)

**Diagnosis**:
- Check Vercel Analytics → Speed Insights
- Look for slow server-side operations

**Solutions**:
1. Cache expensive operations
2. Move computation to build time
3. Use static generation where possible
4. Optimize database queries

```typescript
// Static generation
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  // Generate static pages at build time
}
```

### Issue: Large Bundle Size

**Diagnosis**:
```bash
# Analyze bundle
pnpm build

# Look for large chunks in output
# .next/static/chunks/
```

**Solutions**:
```bash
# Install bundle analyzer
npm install -D @next/bundle-analyzer

# Configure in next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

# Run analysis
ANALYZE=true pnpm build
```

Remove unused dependencies:
```bash
npm install -g depcheck
depcheck
```

---

## Security Issues

### Issue: CORS Errors

**Symptoms**:
```
Access to fetch has been blocked by CORS policy
```

**Solutions**:
```typescript
// Add CORS headers to API routes
export async function GET(req: NextRequest) {
  const response = NextResponse.json({ data: '...' });

  if (process.env.NODE_ENV === 'development') {
    response.headers.set('Access-Control-Allow-Origin', '*');
  } else {
    response.headers.set('Access-Control-Allow-Origin', 'https://advancingtechnology.dev');
  }

  return response;
}
```

### Issue: CSP Violations

**Symptoms**: Resources blocked by Content Security Policy

**Diagnosis**:
```bash
# Check browser console for CSP violations
# Look for: "Refused to load..."
```

**Solutions**:
1. Update CSP in `next.config.ts`
2. Add allowed sources
3. Use nonces for inline scripts
4. Review report-only mode logs

### Issue: Failed Authentication

**Symptoms**: Users can't login or session expires immediately

**Diagnosis**:
1. Check Supabase auth logs
2. Verify JWT token validity
3. Check cookie settings

**Solutions**:
```typescript
// Ensure cookies are configured properly
const supabase = createClientComponentClient({
  cookies: {
    get: (name) => getCookie(name),
    set: (name, value, options) => setCookie(name, value, {
      ...options,
      sameSite: 'lax',
      secure: true,
      httpOnly: true,
    }),
  },
});
```

---

## Monitoring & Alerts

### Issue: No Data in Vercel Analytics

**Symptoms**: Analytics dashboard shows no data

**Solutions**:
1. Verify Analytics component in root layout
2. Check ad blockers not blocking analytics
3. Wait 24 hours for data to appear
4. Verify NEXT_PUBLIC_SITE_URL is correct

### Issue: Sentry Not Receiving Errors

**Symptoms**: Known errors not appearing in Sentry

**Diagnosis**:
```bash
# Check Sentry DSN
echo $NEXT_PUBLIC_SENTRY_DSN

# Test Sentry integration
```

**Solutions**:
1. Verify Sentry DSN is correct
2. Check source maps uploading
3. Verify environment is set correctly
4. Test with manual error:

```typescript
import * as Sentry from '@sentry/nextjs';

// Test error
Sentry.captureException(new Error('Test error'));
```

### Issue: Alert Fatigue

**Symptoms**: Too many alerts, team ignores them

**Solutions**:
1. Increase thresholds for non-critical alerts
2. Group related alerts
3. Use alert priorities
4. Implement on-call rotation
5. Review and adjust alert rules weekly

---

## Emergency Procedures

### Complete Site Outage

1. **Immediate**:
   - Check status pages (Vercel, Supabase, Stripe)
   - Verify DNS is resolving
   - Check Vercel deployment status

2. **If Deployment Issue**:
   ```bash
   # Rollback to last working deployment
   vercel rollback
   ```

3. **If Service Outage**:
   - Check service status pages
   - Contact support
   - Enable maintenance mode if needed

4. **Communication**:
   - Notify team
   - Update status page
   - Inform customers if customer-facing

### Data Breach Suspected

1. **Immediate**:
   - Rotate all API keys and secrets
   - Review access logs
   - Contact Supabase and Stripe support

2. **Investigation**:
   - Review audit logs
   - Check for unauthorized access
   - Identify scope of breach

3. **Remediation**:
   - Patch vulnerability
   - Force password reset for affected users
   - Notify affected parties (legal requirement)

4. **Prevention**:
   - Conduct security audit
   - Implement additional monitoring
   - Review and update security policies

---

## Getting Help

### Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)

### Community Support
- [Vercel Discord](https://vercel.com/discord)
- [Next.js Discussions](https://github.com/vercel/next.js/discussions)
- [Supabase Discord](https://discord.supabase.com)
- [Stack Overflow](https://stackoverflow.com)

### Paid Support
- **Vercel**: support@vercel.com (Pro plan)
- **Supabase**: https://supabase.com/support (Pro plan)
- **Stripe**: https://support.stripe.com (24/7)

### Internal Escalation
1. Check documentation first
2. Search existing issues
3. Ask in team Slack
4. Create ticket if needed
5. Escalate to on-call if critical

---

**Last Updated**: November 6, 2025
**Maintained By**: AdvancingTechnology Development Team
