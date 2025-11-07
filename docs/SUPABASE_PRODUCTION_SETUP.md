# Supabase Production Setup Guide

## Overview

Complete guide for configuring Supabase for production deployment of advancingtechnology.dev, including database setup, security policies, migrations, and monitoring.

## Table of Contents

1. [Project Setup](#project-setup)
2. [Database Configuration](#database-configuration)
3. [Running Migrations](#running-migrations)
4. [Row Level Security](#row-level-security)
5. [Backup Strategy](#backup-strategy)
6. [Performance Optimization](#performance-optimization)
7. [Monitoring & Alerts](#monitoring--alerts)
8. [Troubleshooting](#troubleshooting)

---

## Project Setup

### Step 1: Create Production Project

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Click **New Project**
3. Configure:
   - **Name**: advancingtechnology-dev-prod
   - **Database Password**: Strong password (save securely)
   - **Region**: Choose closest to target users (e.g., us-east-1)
   - **Plan**: Pro or Team (recommended for production)

### Step 2: Retrieve API Credentials

1. Navigate to **Settings → API**
2. Copy the following:

```bash
# Project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Anon/Public Key (safe for client-side)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Service Role Key (PRIVATE - server-side only)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Critical Security Warning**: The service role key bypasses Row Level Security. Never expose it in client-side code or commit to git.

### Step 3: Configure Environment Variables

Add to Vercel Dashboard → Settings → Environment Variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
```

**Deployment Scope**: Production only

### Step 4: Configure Authentication

1. Navigate to **Authentication → Providers**
2. Enable desired providers:
   - ✅ Email (enabled by default)
   - ⚠️ Google OAuth (optional, requires OAuth credentials)
   - ⚠️ GitHub OAuth (optional, requires OAuth app)

3. Configure **Email Templates** → Settings → Auth:
   - Customize confirmation email
   - Customize password reset email
   - Set sender name: "AdvancingTechnology"
   - Set sender email: noreply@advancingtechnology.dev

4. Configure **Site URL** and **Redirect URLs**:
   ```
   Site URL: https://advancingtechnology.dev
   Redirect URLs:
   - https://advancingtechnology.dev/auth/callback
   - https://advancingtechnology.dev/dashboard
   ```

---

## Database Configuration

### Step 1: Database Connection

Connection details available in **Settings → Database**:

```bash
# Direct Connection (for migrations)
SUPABASE_DB_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# Pooling Connection (for production apps)
DATABASE_URL=postgresql://postgres:[password]@[project-ref].pooler.supabase.com:6543/postgres
```

### Step 2: Install Supabase CLI

```bash
# Install CLI globally
npm install -g supabase

# Login to Supabase
supabase login

# Link local project to production
supabase link --project-ref your-project-ref
```

### Step 3: Database Extensions

Enable required extensions in **Database → Extensions**:

```sql
-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable full-text search (optional)
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Enable secure password hashing
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

---

## Running Migrations

### Migration Files Location

```
/home/workbench/Development-env/repos/advancingtechnology.dev/supabase/
├── migrations/
│   └── 20250124_create_plugins_schema.sql
└── seed/
    └── plugins.sql
```

### Step 1: Review Migration File

The main migration creates:
- ✅ `plugins` table with price, ratings, metadata
- ✅ `categories` table for plugin organization
- ✅ `plugin_categories` junction table
- ✅ `plugin_versions` for version management
- ✅ `plugin_purchases` for Stripe integration
- ✅ `plugin_reviews` for user feedback
- ✅ RLS policies for all tables
- ✅ Triggers for automatic rating updates
- ✅ Functions for download counting

### Step 2: Run Migrations

#### Option A: Using Supabase Dashboard (Recommended)

1. Navigate to **SQL Editor**
2. Click **New query**
3. Copy contents of `supabase/migrations/20250124_create_plugins_schema.sql`
4. Click **Run**
5. Verify success message

#### Option B: Using Supabase CLI

```bash
cd /home/workbench/Development-env/repos/advancingtechnology.dev

# Run all migrations
supabase db push

# Or run specific migration
psql $SUPABASE_DB_URL < supabase/migrations/20250124_create_plugins_schema.sql
```

### Step 3: Seed Data (Optional)

```bash
# Load seed data
psql $SUPABASE_DB_URL < supabase/seed/plugins.sql
```

### Step 4: Verify Migration

```sql
-- Check tables exist
SELECT tablename FROM pg_tables WHERE schemaname = 'public';

-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND rowsecurity = true;

-- Verify categories inserted
SELECT COUNT(*) FROM categories;
-- Should return 12
```

---

## Row Level Security

### Overview

RLS policies ensure users can only access data they're authorized to see. All tables have RLS enabled.

### Plugins Table Policies

```sql
-- ✅ Anyone can view published plugins
-- ✅ Users can only modify their own plugins
-- ✅ Only published plugins visible to public
```

### Plugin Purchases Policies

```sql
-- ✅ Users can only see their own purchases
-- ✅ Plugin authors can see purchases of their plugins
-- ✅ Service role can manage all purchases (for Stripe webhooks)
```

### Testing RLS Policies

#### Test 1: Unauthenticated User Can View Published Plugins

```sql
-- Run as anon user
SELECT COUNT(*) FROM plugins WHERE status = 'published';
-- Should return published plugins

SELECT COUNT(*) FROM plugins WHERE status = 'draft';
-- Should return 0
```

#### Test 2: User Can Only Manage Own Plugins

```sql
-- Create test users and plugins via Dashboard
-- Try to update another user's plugin
UPDATE plugins SET name = 'Hacked' WHERE author_id != auth.uid();
-- Should fail with RLS violation
```

#### Test 3: Purchase Privacy

```sql
-- User A tries to view User B's purchases
SELECT * FROM plugin_purchases WHERE user_id != auth.uid();
-- Should return empty
```

### RLS Policy Updates

To add new policies:

```sql
-- Example: Allow admins to manage all plugins
CREATE POLICY "Admins can manage all plugins" ON public.plugins
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);
```

---

## Backup Strategy

### Automatic Backups

Supabase automatically backs up Pro/Team plan databases:
- **Frequency**: Daily
- **Retention**: 7 days (Pro), 14 days (Team)
- **Location**: **Settings → Database → Backups**

### Manual Backups

#### Full Database Backup

```bash
# Backup entire database
pg_dump $SUPABASE_DB_URL > backup_$(date +%Y%m%d).sql

# Backup specific tables
pg_dump $SUPABASE_DB_URL \
  -t plugins \
  -t plugin_purchases \
  -t plugin_reviews \
  > backup_critical_$(date +%Y%m%d).sql
```

#### Restore from Backup

```bash
# Restore full database
psql $SUPABASE_DB_URL < backup_20250106.sql

# Restore specific tables
psql $SUPABASE_DB_URL < backup_critical_20250106.sql
```

### Backup Schedule Recommendation

- **Daily**: Automatic (Supabase handles)
- **Weekly**: Manual full backup before major deployments
- **Monthly**: Download backup to external storage
- **Pre-Migration**: Always backup before running migrations

### Critical Data to Backup

Priority order:
1. ⚡ `plugin_purchases` (financial data)
2. ⚡ `plugins` (business content)
3. ⚡ `profiles` (user data)
4. 🔹 `plugin_reviews` (user content)
5. 🔹 `plugin_versions` (version history)

---

## Performance Optimization

### Indexes

The migration already includes optimized indexes:

```sql
-- ✅ Created by migration
CREATE INDEX idx_plugins_slug ON plugins(slug);
CREATE INDEX idx_plugins_status ON plugins(status);
CREATE INDEX idx_plugins_featured ON plugins(featured);
CREATE INDEX idx_plugins_price ON plugins(price);
CREATE INDEX idx_plugins_rating ON plugins(rating);
CREATE INDEX idx_plugin_purchases_user_id ON plugin_purchases(user_id);
```

### Query Optimization

#### Slow Query Analysis

```sql
-- Enable query statistics
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Find slowest queries
SELECT
  mean_exec_time,
  calls,
  query
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

#### Add Missing Indexes

```sql
-- Example: Add index for frequent filter
CREATE INDEX idx_plugins_created_at_status
ON plugins(created_at, status)
WHERE status = 'published';
```

### Connection Pooling

For production, use connection pooling:

```typescript
// Use pooling connection string
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    db: {
      schema: 'public'
    },
    auth: {
      persistSession: true
    }
  }
);
```

### Database Size Monitoring

```sql
-- Check database size
SELECT pg_size_pretty(pg_database_size('postgres'));

-- Check table sizes
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

## Monitoring & Alerts

### Supabase Dashboard Monitoring

Monitor daily in **Reports**:

1. **API Health**
   - Request count
   - Error rate
   - Response times

2. **Database Performance**
   - Active connections
   - Query performance
   - Cache hit rate

3. **Authentication**
   - Login success rate
   - Failed login attempts
   - Active sessions

### Set Up Alerts

Navigate to **Settings → Alerts** to configure:

- 🚨 Database CPU > 80%
- 🚨 Database memory > 90%
- 🚨 Connection pool > 90%
- ⚠️ Error rate > 5%
- ⚠️ API response time > 2s

### Application-Level Monitoring

```typescript
// Add query performance logging
const { data, error } = await supabase
  .from('plugins')
  .select('*')
  .eq('status', 'published');

if (error) {
  console.error('Query failed:', error);
  // Send to Sentry or logging service
}

// Log slow queries
const startTime = Date.now();
// ... query ...
const duration = Date.now() - startTime;
if (duration > 1000) {
  console.warn(`Slow query detected: ${duration}ms`);
}
```

### Health Check Endpoint

```typescript
// app/api/health/route.ts
export async function GET() {
  try {
    const supabase = await createSupabaseServer();

    // Test database connection
    const { error } = await supabase
      .from('plugins')
      .select('count')
      .limit(1);

    if (error) throw error;

    return Response.json({ status: 'healthy' });
  } catch (error) {
    return Response.json(
      { status: 'unhealthy', error: error.message },
      { status: 503 }
    );
  }
}
```

---

## Troubleshooting

### Issue: Connection Timeout

**Symptoms**: Database queries hang or timeout

**Diagnosis**:
```sql
-- Check active connections
SELECT count(*) FROM pg_stat_activity;

-- Check max connections
SHOW max_connections;
```

**Solutions**:
- Use connection pooling URL
- Close connections properly
- Upgrade to higher Supabase plan
- Implement connection retry logic

### Issue: RLS Policy Blocking Queries

**Symptoms**: Empty results despite data existing

**Diagnosis**:
```sql
-- Disable RLS temporarily (testing only!)
ALTER TABLE plugins DISABLE ROW LEVEL SECURITY;

-- Run query again
SELECT * FROM plugins;

-- Re-enable RLS
ALTER TABLE plugins ENABLE ROW LEVEL SECURITY;
```

**Solutions**:
- Review policy with `\d+ plugins` in psql
- Check `auth.uid()` returns expected user ID
- Verify user session is valid
- Use service role for admin operations

### Issue: Migration Failed

**Symptoms**: Error when running migration SQL

**Diagnosis**:
- Check error message details
- Verify table/column doesn't already exist
- Check for syntax errors

**Solutions**:
```sql
-- Rollback specific table
DROP TABLE IF EXISTS plugins CASCADE;

-- Re-run migration
-- ... migration SQL ...

-- Verify
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
```

### Issue: Slow Query Performance

**Symptoms**: Queries taking >2 seconds

**Diagnosis**:
```sql
-- Explain query plan
EXPLAIN ANALYZE
SELECT * FROM plugins WHERE status = 'published'
ORDER BY rating DESC;
```

**Solutions**:
- Add missing indexes
- Reduce number of JOINs
- Use pagination/limits
- Enable caching

### Issue: Authentication Errors

**Symptoms**: `Invalid JWT` or `User not found` errors

**Diagnosis**:
```bash
# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY

# Verify keys match Supabase dashboard
```

**Solutions**:
- Verify API keys are correct
- Clear browser cookies/localStorage
- Check token expiration (default: 1 hour)
- Refresh session with `supabase.auth.refreshSession()`

---

## Production Checklist

Before going live:

### Configuration
- [ ] Production project created in Supabase
- [ ] Environment variables configured in Vercel
- [ ] Database extensions enabled
- [ ] Authentication providers configured
- [ ] Email templates customized

### Database
- [ ] All migrations run successfully
- [ ] Seed data loaded (if applicable)
- [ ] Indexes created and verified
- [ ] RLS policies tested
- [ ] Database backup taken

### Security
- [ ] RLS enabled on all tables
- [ ] Service role key secured
- [ ] No test data in production
- [ ] Audit logging enabled
- [ ] Connection pooling configured

### Performance
- [ ] Query performance tested
- [ ] Indexes optimized
- [ ] Connection limits appropriate
- [ ] Slow query alerts configured

### Monitoring
- [ ] Dashboard alerts configured
- [ ] Health check endpoint created
- [ ] Backup schedule established
- [ ] Error tracking integrated
- [ ] Team members have appropriate access

### Documentation
- [ ] Team trained on RLS policies
- [ ] Backup/restore procedures documented
- [ ] Emergency contacts established
- [ ] Monitoring dashboard shared

---

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Database Performance](https://supabase.com/docs/guides/database/performance)
- [CLI Reference](https://supabase.com/docs/reference/cli)
- [Migration Guide](https://supabase.com/docs/guides/cli/local-development#database-migrations)

---

## Support Contacts

- **Supabase Support**: https://supabase.com/support
- **Community Discord**: https://discord.supabase.com
- **Status Page**: https://status.supabase.com

---

**Last Updated**: November 6, 2025
**Maintained By**: AdvancingTechnology Development Team
