# Monitoring & Error Tracking Setup Guide

## Overview

Comprehensive monitoring and error tracking configuration for advancingtechnology.dev production deployment using Sentry, Vercel Analytics, and custom monitoring solutions.

## Table of Contents

1. [Vercel Analytics](#vercel-analytics)
2. [Sentry Error Tracking](#sentry-error-tracking)
3. [Custom Monitoring](#custom-monitoring)
4. [Performance Monitoring](#performance-monitoring)
5. [Alerting Strategy](#alerting-strategy)
6. [Dashboards](#dashboards)

---

## Vercel Analytics

### Overview

Vercel Analytics provides:
- ✅ Web Vitals monitoring (LCP, FID, CLS)
- ✅ Page view tracking
- ✅ User engagement metrics
- ✅ Zero configuration required

### Setup

Already installed in `package.json`:

```json
{
  "dependencies": {
    "@vercel/analytics": "^1.5.0",
    "@vercel/speed-insights": "^1.2.0"
  }
}
```

### Implementation

Add to your root layout (`app/layout.tsx`):

```typescript
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Viewing Analytics

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to **Analytics** tab

**Key Metrics to Monitor**:
- Core Web Vitals score (aim for >90)
- Page load times (aim for <2s)
- Top visited pages
- Geographic distribution

### Vercel Speed Insights

Automatically tracks:
- Real User Monitoring (RUM)
- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

---

## Sentry Error Tracking

### Why Sentry?

- ✅ Real-time error tracking
- ✅ Source map support
- ✅ User context and breadcrumbs
- ✅ Performance monitoring
- ✅ Release tracking
- ✅ Issue assignment and workflow

### Step 1: Create Sentry Project

1. Go to [Sentry.io](https://sentry.io/)
2. Click **Create Project**
3. Select **Next.js** as platform
4. Name: `advancingtechnology-dev-prod`
5. Copy the DSN

### Step 2: Install Sentry

```bash
cd /home/workbench/Development-env/repos/advancingtechnology.dev

# Install Sentry SDK
npm install --save @sentry/nextjs

# Run configuration wizard
npx @sentry/wizard@latest -i nextjs
```

### Step 3: Configure Environment Variables

Add to Vercel:

```bash
# Public DSN (safe for client-side)
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id

# Auth token for uploading source maps
SENTRY_AUTH_TOKEN=your-auth-token

# Organization and project
SENTRY_ORG=your-organization
SENTRY_PROJECT=advancingtechnology-dev-prod
```

### Step 4: Sentry Configuration Files

The wizard creates these files:

#### `sentry.client.config.ts`
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance monitoring
  tracesSampleRate: 1.0, // 100% in dev, reduce to 0.1 in production

  // Session replay (optional)
  replaysSessionSampleRate: 0.1, // 10% of sessions
  replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors

  // Environment
  environment: process.env.NODE_ENV,

  // Integrations
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
```

#### `sentry.server.config.ts`
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

#### `sentry.edge.config.ts`
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

### Step 5: Update Next.js Config

`next.config.ts`:
```typescript
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  // ... existing config
};

export default withSentryConfig(nextConfig, {
  // Sentry webpack plugin options
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Upload source maps
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
});
```

### Step 6: Error Boundary Integration

Create error boundary component:

```typescript
// components/ErrorBoundary.tsx
'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
```

Add to `app/error.tsx`:
```typescript
import ErrorBoundary from '@/components/ErrorBoundary';
export default ErrorBoundary;
```

### Step 7: Manual Error Tracking

```typescript
import * as Sentry from '@sentry/nextjs';

// Capture exception
try {
  // risky operation
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      section: 'checkout',
      critical: 'true'
    },
    extra: {
      userId: user.id,
      pluginId: plugin.id
    }
  });
}

// Capture message
Sentry.captureMessage('Payment webhook received', {
  level: 'info',
  tags: { webhook: 'stripe' }
});

// Add breadcrumb
Sentry.addBreadcrumb({
  category: 'navigation',
  message: 'User navigated to checkout',
  level: 'info'
});
```

### Step 8: Performance Monitoring

```typescript
import * as Sentry from '@sentry/nextjs';

// Track custom operations
const transaction = Sentry.startTransaction({
  name: 'Plugin Purchase',
  op: 'checkout'
});

const span = transaction.startChild({
  op: 'stripe.checkout',
  description: 'Create Stripe session'
});

// ... Stripe operations ...

span.finish();
transaction.finish();
```

### Sentry Best Practices

#### Filter Sensitive Data

```typescript
Sentry.init({
  beforeSend(event, hint) {
    // Remove sensitive data
    if (event.request) {
      delete event.request.cookies;
    }

    // Filter by error type
    if (event.exception) {
      const error = hint.originalException;
      if (error instanceof SomeIgnorableError) {
        return null; // Don't send to Sentry
      }
    }

    return event;
  },
});
```

#### User Context

```typescript
// Set user context
Sentry.setUser({
  id: user.id,
  email: user.email,
  // Don't include sensitive data like passwords!
});

// Clear user context on logout
Sentry.setUser(null);
```

#### Release Tracking

```typescript
// In sentry config
Sentry.init({
  release: process.env.VERCEL_GIT_COMMIT_SHA,
  environment: process.env.VERCEL_ENV || 'development'
});
```

---

## Custom Monitoring

### Application Health Endpoint

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase-server';

export async function GET() {
  const checks = {
    timestamp: new Date().toISOString(),
    status: 'healthy',
    services: {} as Record<string, { status: string; latency?: number }>
  };

  // Database check
  try {
    const start = Date.now();
    const supabase = await createSupabaseServer();
    await supabase.from('plugins').select('count').limit(1);
    checks.services.database = {
      status: 'healthy',
      latency: Date.now() - start
    };
  } catch (error) {
    checks.status = 'unhealthy';
    checks.services.database = { status: 'unhealthy' };
  }

  // Stripe check (optional)
  try {
    const start = Date.now();
    // Minimal Stripe API call
    checks.services.stripe = {
      status: 'healthy',
      latency: Date.now() - start
    };
  } catch (error) {
    checks.services.stripe = { status: 'degraded' };
  }

  const statusCode = checks.status === 'healthy' ? 200 : 503;
  return NextResponse.json(checks, { status: statusCode });
}
```

### Custom Metrics Logging

```typescript
// lib/metrics.ts
type MetricType = 'counter' | 'gauge' | 'histogram';

interface Metric {
  name: string;
  type: MetricType;
  value: number;
  tags?: Record<string, string>;
  timestamp: string;
}

export class MetricsCollector {
  private metrics: Metric[] = [];

  track(name: string, type: MetricType, value: number, tags?: Record<string, string>) {
    this.metrics.push({
      name,
      type,
      value,
      tags,
      timestamp: new Date().toISOString()
    });

    // In production, send to metrics backend
    if (process.env.NODE_ENV === 'production') {
      this.flush();
    }
  }

  private async flush() {
    if (this.metrics.length === 0) return;

    // Send to metrics service (e.g., DataDog, Prometheus)
    console.log('Metrics:', this.metrics);
    this.metrics = [];
  }
}

export const metrics = new MetricsCollector();
```

Usage:
```typescript
import { metrics } from '@/lib/metrics';

// Track plugin purchase
metrics.track('plugin.purchase', 'counter', 1, {
  pluginId: plugin.id,
  price: plugin.price.toString()
});

// Track API latency
const start = Date.now();
// ... operation ...
metrics.track('api.latency', 'histogram', Date.now() - start, {
  endpoint: '/api/checkout'
});
```

### Request Logging Middleware

```typescript
// middleware.ts (add to existing)
export async function middleware(req: NextRequest) {
  const start = Date.now();
  const res = NextResponse.next();

  // Log request
  res.headers.set('X-Request-ID', crypto.randomUUID());

  // Log after response
  res.headers.set('X-Response-Time', `${Date.now() - start}ms`);

  // Log to monitoring service
  if (process.env.NODE_ENV === 'production') {
    console.log({
      method: req.method,
      url: req.url,
      duration: Date.now() - start,
      status: res.status
    });
  }

  return res;
}
```

---

## Performance Monitoring

### Web Vitals Tracking

```typescript
// app/layout.tsx
'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to analytics
    console.log(metric);

    // Send to custom analytics endpoint
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/analytics/web-vitals', {
        method: 'POST',
        body: JSON.stringify(metric),
        headers: { 'Content-Type': 'application/json' }
      });
    }
  });

  return null;
}
```

### Database Query Performance

```typescript
// lib/supabase-client.ts
import { createClient } from '@supabase/supabase-js';
import * as Sentry from '@sentry/nextjs';

export function createSupabaseClient() {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Wrap queries with performance tracking
  const originalFrom = client.from.bind(client);
  client.from = (table: string) => {
    const start = Date.now();
    const query = originalFrom(table);

    // Track on query completion
    const originalThen = query.then.bind(query);
    query.then = (onfulfilled, onrejected) => {
      const duration = Date.now() - start;

      if (duration > 1000) {
        Sentry.captureMessage(`Slow query on ${table}: ${duration}ms`, {
          level: 'warning',
          tags: { table, duration: duration.toString() }
        });
      }

      return originalThen(onfulfilled, onrejected);
    };

    return query;
  };

  return client;
}
```

---

## Alerting Strategy

### Critical Alerts (Immediate Response)

- 🚨 Server downtime (5xx errors > 1%)
- 🚨 Database connection failures
- 🚨 Payment webhook failures
- 🚨 Authentication system failures

**Action**: Page on-call engineer immediately

### High Priority Alerts (Within 1 Hour)

- ⚠️ Error rate > 5%
- ⚠️ Response time > 3 seconds
- ⚠️ Database CPU > 80%
- ⚠️ Failed Stripe charges

**Action**: Investigate within 1 hour

### Medium Priority Alerts (Within 24 Hours)

- 🔹 Error rate 1-5%
- 🔹 Response time 2-3 seconds
- 🔹 Web Vitals degradation
- 🔹 RLS policy violations

**Action**: Review during business hours

### Alert Configuration

#### Vercel Alerts

Configure in Vercel Dashboard:
1. Go to **Settings → Notifications**
2. Enable:
   - Deployment failures
   - Performance degradation
   - Error spike detection

#### Sentry Alerts

1. Navigate to **Alerts** in Sentry project
2. Create alert rules:

```yaml
# High Error Rate Alert
When: Error count > 10 in 5 minutes
Filter: Environment = production
Action: Email + Slack notification

# Slow Transaction Alert
When: Transaction duration > 2000ms
Filter: Transaction = checkout.*
Action: Email notification

# Critical Error Alert
When: Error with tag critical=true
Filter: Any occurrence
Action: Email + SMS + Slack
```

#### Uptime Monitoring

Use external service (e.g., UptimeRobot, Pingdom):

```
Endpoints to monitor:
- https://advancingtechnology.dev (every 5 minutes)
- https://advancingtechnology.dev/api/health (every 5 minutes)
```

---

## Dashboards

### Sentry Dashboard

Key views:
1. **Issues** → Recent errors, trending issues
2. **Performance** → Transaction performance, slow queries
3. **Releases** → Deploy tracking, issue resolution
4. **Discover** → Custom queries and analysis

### Vercel Analytics Dashboard

Key metrics:
1. **Web Vitals** → LCP, FID, CLS scores
2. **Top Pages** → Most visited routes
3. **Realtime** → Current active users
4. **Demographics** → User location, devices

### Custom Dashboard (Optional)

Consider tools like:
- **Grafana**: Custom metrics visualization
- **DataDog**: Full-stack monitoring
- **New Relic**: Application performance monitoring

---

## Production Checklist

Before going live:

### Monitoring Setup
- [ ] Vercel Analytics installed and verified
- [ ] Sentry project created and configured
- [ ] Source maps uploading to Sentry
- [ ] Error boundaries implemented
- [ ] Health check endpoint created

### Alerting
- [ ] Critical alerts configured
- [ ] On-call rotation established
- [ ] Alert notification channels set up
- [ ] Escalation procedures documented

### Performance
- [ ] Web Vitals baseline established
- [ ] Slow query alerts configured
- [ ] Database performance monitoring enabled
- [ ] CDN caching verified

### Logging
- [ ] Request logging enabled
- [ ] Error logging working
- [ ] Sensitive data filtered
- [ ] Log retention configured

---

## Additional Resources

- [Vercel Analytics Docs](https://vercel.com/docs/analytics)
- [Sentry Next.js Guide](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Web Vitals](https://web.dev/vitals/)
- [Core Web Vitals](https://web.dev/articles/vitals)

---

**Last Updated**: November 6, 2025
**Maintained By**: AdvancingTechnology Development Team
