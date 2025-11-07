# Production Deployment Guide

## Overview

Complete step-by-step guide for deploying advancingtechnology.dev to Vercel production environment.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Vercel Setup](#vercel-setup)
3. [Environment Configuration](#environment-configuration)
4. [Domain Configuration](#domain-configuration)
5. [Database Setup](#database-setup)
6. [Stripe Configuration](#stripe-configuration)
7. [Deployment Process](#deployment-process)
8. [Post-Deployment Verification](#post-deployment-verification)
9. [Rollback Procedures](#rollback-procedures)
10. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

### Code Quality
- [ ] All TypeScript errors resolved: `pnpm type-check`
- [ ] All ESLint warnings fixed: `pnpm lint`
- [ ] Production build succeeds: `pnpm build`
- [ ] All tests passing (if applicable)
- [ ] No console.logs in production code
- [ ] Source maps configured for debugging

### Security
- [ ] No secrets in git repository
- [ ] `.env.local` in `.gitignore`
- [ ] Security headers configured in `next.config.ts`
- [ ] RLS policies tested in Supabase
- [ ] Rate limiting implemented on sensitive endpoints

### Dependencies
- [ ] All dependencies up to date
- [ ] No known security vulnerabilities: `npm audit`
- [ ] Package-lock.json committed
- [ ] Development dependencies separated from production

### Documentation
- [ ] README.md updated
- [ ] API documentation complete
- [ ] Environment variables documented in `.env.example`
- [ ] Deployment procedures documented (this file)

---

## Vercel Setup

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub account (recommended)
3. Grant access to your repositories

### Step 2: Import Project

1. Click **Add New... → Project**
2. Select repository: `AdvancingTechnology/Business-Ecosystem`
3. Configure import settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `repos/advancingtechnology.dev`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next`
   - **Install Command**: `pnpm install`

4. Click **Deploy** (will fail without environment variables - expected)

### Step 3: Configure Project Settings

Navigate to **Project Settings**:

#### General
- **Project Name**: advancingtechnology-dev
- **Framework**: Next.js
- **Node.js Version**: 20.x

#### Git
- **Production Branch**: `main` or `master`
- **Preview Branches**: Enable for `develop` branch
- **Ignored Build Step**: Leave empty (build on every commit)

#### Build & Development
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`
- **Development Command**: `pnpm dev`

---

## Environment Configuration

### Step 1: Add Environment Variables

Navigate to **Settings → Environment Variables**

Add the following variables:

#### Required Variables (Production Only)

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://advancingtechnology.dev
NODE_ENV=production

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### Optional Variables

```bash
# Sentry (Error Tracking)
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
SENTRY_AUTH_TOKEN=...
SENTRY_ORG=your-organization
SENTRY_PROJECT=advancingtechnology-dev-prod

# Email (if using)
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@advancingtechnology.dev

# Feature Flags
NEXT_PUBLIC_ENABLE_PLUGIN_MARKETPLACE=true
NEXT_PUBLIC_MAINTENANCE_MODE=false
```

### Step 2: Environment Scopes

For each variable, select appropriate scope:
- **Production**: Live environment
- **Preview**: Pull request previews
- **Development**: Local development (usually use `.env.local` instead)

### Step 3: Verify Configuration

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Pull environment variables to local
vercel env pull .env.local

# Verify variables
cat .env.local
```

---

## Domain Configuration

### Step 1: Add Domain in Vercel

1. Navigate to **Settings → Domains**
2. Click **Add Domain**
3. Enter: `advancingtechnology.dev`
4. Click **Add**

### Step 2: Configure DNS

Vercel will provide DNS records. Add these to your domain registrar:

#### A Record
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

#### CNAME Record (www subdomain)
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Step 3: Enable HTTPS

Vercel automatically provisions SSL certificates via Let's Encrypt.

Wait for:
- [ ] DNS propagation (can take up to 48 hours, usually <1 hour)
- [ ] SSL certificate issued
- [ ] Domain shows "Active" in Vercel dashboard

### Step 4: Redirect www to apex (optional)

In Vercel dashboard:
1. Click on `www.advancingtechnology.dev`
2. Enable **Redirect to advancingtechnology.dev**

---

## Database Setup

### Step 1: Create Production Database

See detailed guide: [`docs/SUPABASE_PRODUCTION_SETUP.md`](./docs/SUPABASE_PRODUCTION_SETUP.md)

Quick steps:
1. Create new Supabase project (Production tier)
2. Run migrations from `supabase/migrations/`
3. Enable RLS on all tables
4. Test RLS policies
5. Create initial seed data (if needed)

### Step 2: Verify Connection

```typescript
// Test in production environment
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const { data, error } = await supabase.from('plugins').select('count');
console.log('Database connected:', !error);
```

---

## Stripe Configuration

### Step 1: Activate Production Mode

See detailed guide: [`docs/STRIPE_PRODUCTION_SETUP.md`](./docs/STRIPE_PRODUCTION_SETUP.md)

Quick steps:
1. Toggle to Live mode in Stripe Dashboard
2. Retrieve production API keys
3. Add keys to Vercel environment variables
4. Create webhook endpoint
5. Configure webhook events
6. Add webhook secret to environment

### Step 2: Webhook Endpoint

```
URL: https://advancingtechnology.dev/api/webhooks/stripe
Events: checkout.session.completed, checkout.session.expired, charge.refunded
```

---

## Deployment Process

### Option 1: Automatic Deployment (Recommended)

Every push to `main` branch automatically deploys:

```bash
git add .
git commit -m "feat: production deployment"
git push origin main
```

Vercel will:
1. Detect push
2. Install dependencies
3. Run build
4. Deploy to production
5. Notify via email/Slack

### Option 2: Manual Deployment via CLI

```bash
# Build and deploy to production
vercel --prod

# Deploy specific directory
vercel --prod --cwd repos/advancingtechnology.dev
```

### Option 3: Deploy via Vercel Dashboard

1. Navigate to **Deployments**
2. Click **Deploy** button
3. Select branch and commit
4. Click **Deploy**

### Deployment Status

Monitor deployment:
- **Dashboard**: Real-time build logs
- **CLI**: `vercel logs [deployment-url]`
- **Email**: Deployment notifications

---

## Post-Deployment Verification

### Step 1: Basic Health Check

```bash
# Check site is live
curl -I https://advancingtechnology.dev

# Verify security headers
curl -I https://advancingtechnology.dev | grep -i "strict-transport-security"

# Check API health endpoint
curl https://advancingtechnology.dev/api/health
```

### Step 2: Functionality Testing

#### Authentication Flow
1. Visit https://advancingtechnology.dev/auth
2. Sign up with test account
3. Verify email confirmation works
4. Login and access dashboard
5. Logout and verify session cleared

#### Plugin Marketplace
1. Browse plugins at /marketplace
2. View plugin details
3. Add plugin to cart
4. Complete checkout (use Stripe test card: `4242 4242 4242 4242`)
5. Verify webhook processed purchase
6. Check database for purchase record

#### Stripe Webhook
1. Go to Stripe Dashboard → Webhooks
2. Check delivery status for recent events
3. Verify all events showing "Success"
4. Check application logs for webhook processing

### Step 3: Performance Verification

```bash
# Run Lighthouse audit
npx lighthouse https://advancingtechnology.dev --view

# Check Core Web Vitals
# Visit: https://pagespeed.web.dev/
# Enter: https://advancingtechnology.dev
```

Target scores:
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

### Step 4: Monitoring Verification

#### Vercel Analytics
1. Navigate to **Analytics** tab
2. Verify data is being collected
3. Check Web Vitals scores

#### Sentry (if configured)
1. Go to Sentry dashboard
2. Verify no errors on initial load
3. Test error tracking by triggering test error
4. Confirm error appears in Sentry

### Step 5: Database Verification

```sql
-- Check tables exist
SELECT tablename FROM pg_tables WHERE schemaname = 'public';

-- Verify RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

-- Check for any data issues
SELECT COUNT(*) FROM plugins WHERE status = 'published';
```

---

## Rollback Procedures

### Immediate Rollback (Emergency)

If critical issue detected:

1. **Via Vercel Dashboard**:
   - Go to **Deployments**
   - Find last working deployment
   - Click **⋮** → **Promote to Production**
   - Confirm rollback

2. **Via CLI**:
   ```bash
   vercel rollback
   ```

### Planned Rollback

For controlled rollback:

```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel promote [deployment-url] --prod
```

### Database Rollback

If database migration failed:

```bash
# Restore from backup
psql $SUPABASE_DB_URL < backup_YYYYMMDD.sql

# Or use Supabase dashboard
# Settings → Database → Backups → Restore
```

### Rollback Checklist

After rollback:
- [ ] Verify site is functioning
- [ ] Check all critical features work
- [ ] Monitor error rates
- [ ] Notify team of rollback
- [ ] Document reason for rollback
- [ ] Create issue for fix
- [ ] Test fix before redeploying

---

## Troubleshooting

### Issue: Build Failing

**Symptoms**: Deployment fails during build step

**Common Causes**:
- TypeScript errors
- Missing dependencies
- Environment variables not set
- Build command incorrect

**Solutions**:
```bash
# Run build locally
pnpm build

# Check for errors
pnpm type-check
pnpm lint

# Verify dependencies
pnpm install

# Check build logs in Vercel dashboard
```

### Issue: Runtime Errors

**Symptoms**: Site deploys but crashes on load

**Diagnosis**:
1. Check Vercel logs: **Deployments → [deployment] → Function Logs**
2. Check Sentry for errors
3. Verify environment variables are set

**Solutions**:
- Verify all required env vars are present
- Check for missing API keys
- Review error stack trace in logs
- Test locally with production env vars

### Issue: Database Connection Failed

**Symptoms**: "Database connection error" in logs

**Diagnosis**:
```bash
# Test connection
psql $SUPABASE_DB_URL -c "SELECT 1"

# Check Supabase status
# https://status.supabase.com
```

**Solutions**:
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check `SUPABASE_SERVICE_ROLE_KEY` is set
- Ensure Supabase project is not paused
- Verify database is not at connection limit

### Issue: Stripe Webhook Not Received

**Symptoms**: Payments succeed but database not updated

**Diagnosis**:
1. Check Stripe Dashboard → Webhooks → Your endpoint
2. View webhook delivery logs
3. Check for failed deliveries

**Solutions**:
- Verify webhook URL is correct
- Ensure webhook secret matches environment variable
- Check API route is not rate limited
- Review function logs in Vercel

### Issue: 404 Errors on Routes

**Symptoms**: Some pages return 404

**Solutions**:
- Check `vercel.json` routing configuration
- Verify file names match route structure
- Ensure dynamic routes have correct folder structure
- Check middleware is not blocking routes

### Issue: Slow Performance

**Symptoms**: Page load times >3 seconds

**Diagnosis**:
```bash
# Run Lighthouse audit
npx lighthouse https://advancingtechnology.dev

# Check Vercel Analytics for slow queries
```

**Solutions**:
- Optimize images (use Next.js Image component)
- Enable caching headers
- Reduce JavaScript bundle size
- Optimize database queries
- Enable compression

### Issue: CORS Errors

**Symptoms**: API calls from frontend failing with CORS error

**Solutions**:
```typescript
// Add CORS headers to API routes
export async function GET(req: NextRequest) {
  const response = NextResponse.json({ data: '...' });

  response.headers.set('Access-Control-Allow-Origin', 'https://advancingtechnology.dev');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  return response;
}
```

---

## Deployment Best Practices

### 1. Deploy During Low Traffic

- Avoid peak hours (business hours)
- Best time: Late evening or weekends
- Monitor for 30 minutes after deployment

### 2. Use Preview Deployments

Before production:
- Create preview deployment
- Test all functionality
- Run security scan
- Get team approval

### 3. Gradual Rollout

For major changes:
- Deploy to 10% of traffic first (Vercel Edge Config)
- Monitor error rates
- Gradually increase to 100%

### 4. Database Migrations

For schema changes:
- Backup database first
- Test migrations in staging
- Use backward-compatible changes
- Run migrations before code deployment

### 5. Monitoring

After deployment:
- Monitor error rates (first 10 minutes)
- Check Web Vitals (first hour)
- Review logs (first 24 hours)
- Weekly performance review

---

## Continuous Deployment Workflow

### Recommended Git Workflow

```
main (production)
  ↑
develop (staging)
  ↑
feature/* (preview deployments)
```

### Branch Configuration

**Production Branch** (`main`):
- Auto-deploys to production
- Requires pull request approval
- Protected branch (no direct commits)

**Preview Branch** (`develop`):
- Auto-deploys to staging environment
- Used for QA testing
- Merge features here first

**Feature Branches** (`feature/*`):
- Creates preview deployment URL
- Use for development
- Merge to `develop` when ready

### Pull Request Workflow

1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes and commit
3. Push to GitHub: `git push origin feature/new-feature`
4. Create pull request to `develop`
5. Vercel creates preview deployment
6. Review changes at preview URL
7. Run tests and checks
8. Merge to `develop` after approval
9. Test in staging environment
10. Create PR from `develop` to `main`
11. Deploy to production

---

## Emergency Contacts

### Service Providers
- **Vercel Support**: support@vercel.com
- **Supabase Support**: https://supabase.com/support
- **Stripe Support**: https://support.stripe.com

### Status Pages
- **Vercel**: https://www.vercel-status.com/
- **Supabase**: https://status.supabase.com/
- **Stripe**: https://status.stripe.com/

### On-Call Rotation
- Primary: [Your Name]
- Secondary: [Backup Person]
- Escalation: [Manager/Lead]

---

## Post-Deployment Tasks

Within 24 hours:
- [ ] Monitor error rates
- [ ] Check Web Vitals scores
- [ ] Review user feedback
- [ ] Verify all features working
- [ ] Update team on deployment status

Within 1 week:
- [ ] Review analytics data
- [ ] Check performance metrics
- [ ] Analyze user behavior
- [ ] Identify any issues
- [ ] Plan next improvements

---

## Additional Resources

- [Vercel Deployment Docs](https://vercel.com/docs/deployments)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Environment Variables](https://vercel.com/docs/environment-variables)

---

**Last Updated**: November 6, 2025
**Maintained By**: AdvancingTechnology Development Team
