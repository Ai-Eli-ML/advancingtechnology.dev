# Security Hardening Guide

## Overview

Comprehensive security hardening guide for advancingtechnology.dev production deployment, covering headers, CSP, rate limiting, CSRF protection, and security best practices.

## Table of Contents

1. [Security Headers](#security-headers)
2. [Content Security Policy](#content-security-policy)
3. [Rate Limiting](#rate-limiting)
4. [CSRF Protection](#csrf-protection)
5. [Input Validation](#input-validation)
6. [Authentication Security](#authentication-security)
7. [API Security](#api-security)
8. [Database Security](#database-security)

---

## Security Headers

### Overview

Security headers protect against common web vulnerabilities like XSS, clickjacking, and MITM attacks.

### Implementation

Already configured in `next.config.ts`:

```typescript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        // Strict Transport Security (HTTPS only)
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload'
        },

        // Prevent clickjacking
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },

        // Prevent MIME type sniffing
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },

        // Enable XSS protection
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },

        // Control referrer information
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        },

        // Restrict browser features
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()'
        },

        // Enable DNS prefetching
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
      ],
    },
  ];
}
```

### Header Explanations

#### Strict-Transport-Security (HSTS)
- **Purpose**: Forces HTTPS connections
- **Value**: `max-age=63072000` (2 years)
- **Impact**: Prevents downgrade attacks, SSL stripping

#### X-Frame-Options
- **Purpose**: Prevents clickjacking
- **Value**: `SAMEORIGIN` (only same-origin frames)
- **Impact**: Blocks embedding in external iframes

#### X-Content-Type-Options
- **Purpose**: Prevents MIME confusion attacks
- **Value**: `nosniff`
- **Impact**: Browser won't guess content types

#### X-XSS-Protection
- **Purpose**: Legacy XSS filter (use CSP instead)
- **Value**: `1; mode=block`
- **Impact**: Blocks page on XSS detection

#### Referrer-Policy
- **Purpose**: Controls referrer information
- **Value**: `strict-origin-when-cross-origin`
- **Impact**: Only sends origin on cross-origin requests

#### Permissions-Policy
- **Purpose**: Controls browser features
- **Value**: Disables camera, microphone, geolocation
- **Impact**: Prevents unauthorized feature access

### Verification

Test headers using:

```bash
# Check security headers
curl -I https://advancingtechnology.dev

# Use online security scanner
https://securityheaders.com/?q=advancingtechnology.dev
```

Target score: **A+** on securityheaders.com

---

## Content Security Policy

### Overview

CSP prevents XSS attacks by controlling which resources can be loaded.

### Implementation Strategy

CSP can break functionality if too strict. Implement incrementally:

#### Phase 1: Report-Only Mode

Add to `next.config.ts`:

```typescript
async headers() {
  const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https: blob:;
    font-src 'self' data:;
    connect-src 'self' https://*.supabase.co https://api.stripe.com https://vitals.vercel-insights.com;
    frame-src 'self' https://js.stripe.com;
    worker-src 'self' blob:;
    form-action 'self';
    base-uri 'self';
    frame-ancestors 'self';
  `.replace(/\s{2,}/g, ' ').trim();

  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Content-Security-Policy-Report-Only',
          value: ContentSecurityPolicy
        },
        // ... other headers
      ],
    },
  ];
}
```

#### Phase 2: Monitor Reports

```typescript
// app/api/csp-report/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const report = await req.json();

    // Log CSP violations
    console.error('CSP Violation:', {
      documentUri: report['csp-report']?.['document-uri'],
      violatedDirective: report['csp-report']?.['violated-directive'],
      blockedUri: report['csp-report']?.['blocked-uri'],
    });

    // Send to monitoring service
    // await sendToSentry(report);

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid report' }, { status: 400 });
  }
}
```

Add report endpoint to CSP:
```typescript
report-uri /api/csp-report;
```

#### Phase 3: Enforcement Mode

After monitoring and fixing violations, change to enforcement:

```typescript
{
  key: 'Content-Security-Policy',  // Remove -Report-Only
  value: ContentSecurityPolicy
}
```

### CSP Directives Explained

- **default-src 'self'**: Only load resources from same origin
- **script-src**: Allow scripts from self, Stripe, Vercel Analytics
- **style-src**: Allow styles from self (unsafe-inline for Tailwind)
- **img-src**: Allow images from anywhere (adjust if needed)
- **connect-src**: Allow API calls to Supabase, Stripe, Vercel
- **frame-src**: Allow Stripe checkout iframes
- **form-action**: Only submit forms to same origin

### Nonce-based CSP (Recommended)

For stricter security, use nonces:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const csp = `
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
  `;

  const res = NextResponse.next();
  res.headers.set('Content-Security-Policy', csp);
  res.headers.set('x-nonce', nonce);

  return res;
}
```

Use in components:
```typescript
import { headers } from 'next/headers';

export default async function Page() {
  const nonce = (await headers()).get('x-nonce');

  return (
    <script nonce={nonce}>
      console.log('Allowed by nonce');
    </script>
  );
}
```

---

## Rate Limiting

### Why Rate Limiting?

Prevents:
- ✅ Brute force attacks
- ✅ API abuse
- ✅ DDoS attacks
- ✅ Credential stuffing

### Implementation: Vercel Rate Limiting

Create rate limiting middleware:

```typescript
// lib/rate-limit.ts
import { NextRequest } from 'next/server';

interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  uniqueTokenPerInterval: number; // Max unique IPs per window
  limit: number; // Max requests per IP per window
}

const rateLimiters = new Map<string, Map<string, number[]>>();

export function rateLimit(config: RateLimitConfig = {
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
  limit: 10,
}) {
  return async (req: NextRequest): Promise<{ success: boolean; remaining?: number }> => {
    const identifier = req.ip ?? 'unknown';
    const now = Date.now();
    const windowStart = now - config.interval;

    // Get or create rate limiter for this config
    const key = `${config.interval}-${config.limit}`;
    if (!rateLimiters.has(key)) {
      rateLimiters.set(key, new Map());
    }
    const limiter = rateLimiters.get(key)!;

    // Get request timestamps for this IP
    const requests = limiter.get(identifier) || [];

    // Filter out old requests
    const recentRequests = requests.filter(timestamp => timestamp > windowStart);

    // Check if limit exceeded
    if (recentRequests.length >= config.limit) {
      return { success: false };
    }

    // Add current request
    recentRequests.push(now);
    limiter.set(identifier, recentRequests);

    // Cleanup old entries
    if (limiter.size > config.uniqueTokenPerInterval) {
      const oldestKey = Array.from(limiter.keys())[0];
      limiter.delete(oldestKey);
    }

    return {
      success: true,
      remaining: config.limit - recentRequests.length - 1
    };
  };
}
```

### Usage in API Routes

```typescript
// app/api/checkout/route.ts
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
  limit: 5, // 5 checkout requests per minute
});

export async function POST(req: NextRequest) {
  // Apply rate limit
  const { success, remaining } = await limiter(req);

  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': '0',
          'Retry-After': '60'
        }
      }
    );
  }

  // Set rate limit headers
  const headers = new Headers();
  headers.set('X-RateLimit-Limit', '5');
  headers.set('X-RateLimit-Remaining', remaining?.toString() || '0');

  // Continue with request
  // ...
}
```

### Endpoint-Specific Limits

```typescript
// Different limits for different endpoints
const authLimiter = rateLimit({
  interval: 15 * 60 * 1000, // 15 minutes
  limit: 5, // 5 login attempts
});

const apiLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  limit: 100, // 100 requests per minute
});

const checkoutLimiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  limit: 10, // 10 checkout sessions per hour
});
```

### Upstash Redis Rate Limiting (Production)

For distributed rate limiting across Vercel Edge Functions:

```bash
npm install @upstash/ratelimit @upstash/redis
```

```typescript
// lib/rate-limit-redis.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
  analytics: true,
  prefix: '@upstash/ratelimit',
});

// Usage
const { success, limit, remaining } = await rateLimit.limit(identifier);
```

---

## CSRF Protection

### Overview

Cross-Site Request Forgery attacks trick authenticated users into performing unwanted actions.

### Built-in Protection

Next.js provides CSRF protection through:
1. **SameSite cookies** (Supabase auth)
2. **Origin checking** (for POST requests)

### Additional Protection

Implement CSRF tokens for sensitive operations:

```typescript
// lib/csrf.ts
import { cookies } from 'next/headers';
import crypto from 'crypto';

export async function generateCSRFToken(): Promise<string> {
  const token = crypto.randomBytes(32).toString('hex');
  const cookieStore = await cookies();

  cookieStore.set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60, // 1 hour
  });

  return token;
}

export async function verifyCSRFToken(token: string): Promise<boolean> {
  const cookieStore = await cookies();
  const storedToken = cookieStore.get('csrf-token')?.value;

  if (!storedToken || storedToken !== token) {
    return false;
  }

  return true;
}
```

Usage in forms:

```typescript
// app/checkout/page.tsx
import { generateCSRFToken } from '@/lib/csrf';

export default async function CheckoutPage() {
  const csrfToken = await generateCSRFToken();

  return (
    <form action="/api/checkout" method="POST">
      <input type="hidden" name="csrf-token" value={csrfToken} />
      {/* ... rest of form ... */}
    </form>
  );
}
```

Verification in API:

```typescript
// app/api/checkout/route.ts
import { verifyCSRFToken } from '@/lib/csrf';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const csrfToken = formData.get('csrf-token') as string;

  if (!await verifyCSRFToken(csrfToken)) {
    return NextResponse.json(
      { error: 'Invalid CSRF token' },
      { status: 403 }
    );
  }

  // Continue processing
}
```

### Origin Validation

```typescript
// middleware.ts
export function middleware(req: NextRequest) {
  // For state-changing methods, verify origin
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    const origin = req.headers.get('origin');
    const host = req.headers.get('host');

    if (origin && new URL(origin).host !== host) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  return NextResponse.next();
}
```

---

## Input Validation

### Zod Schema Validation

Already implemented in checkout API:

```typescript
import { z } from 'zod';

const checkoutSchema = z.object({
  pluginId: z.string().uuid(),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validationResult = checkoutSchema.safeParse(body);

  if (!validationResult.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: validationResult.error.issues },
      { status: 400 }
    );
  }

  const { pluginId, successUrl, cancelUrl } = validationResult.data;
  // ... safe to use validated data
}
```

### Validation Best Practices

```typescript
// Email validation
const emailSchema = z.string().email().max(255);

// Password validation
const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password too long')
  .regex(/[A-Z]/, 'Must contain uppercase letter')
  .regex(/[a-z]/, 'Must contain lowercase letter')
  .regex(/[0-9]/, 'Must contain number')
  .regex(/[^A-Za-z0-9]/, 'Must contain special character');

// URL validation
const urlSchema = z.string().url().max(2048);

// UUID validation
const uuidSchema = z.string().uuid();

// Amount validation
const amountSchema = z.number().positive().max(1000000);

// Enum validation
const statusSchema = z.enum(['pending', 'completed', 'failed', 'refunded']);
```

### SQL Injection Prevention

**Always use parameterized queries** (Supabase handles this automatically):

```typescript
// ✅ SAFE: Parameterized query
const { data } = await supabase
  .from('plugins')
  .select('*')
  .eq('slug', userInput);

// ❌ DANGEROUS: Never construct raw SQL
const query = `SELECT * FROM plugins WHERE slug = '${userInput}'`;
```

### XSS Prevention

```typescript
// Sanitize user input before storing
import DOMPurify from 'isomorphic-dompurify';

const sanitizedDescription = DOMPurify.sanitize(userInput, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
  ALLOWED_ATTR: ['href'],
});
```

---

## Authentication Security

### Supabase Auth Best Practices

```typescript
// Check authentication in API routes
export async function GET(req: NextRequest) {
  const supabase = await createSupabaseServer();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // User authenticated, continue
}
```

### Session Security

- ✅ Use HTTP-only cookies (Supabase default)
- ✅ Set secure flag in production
- ✅ Use SameSite=Lax or Strict
- ✅ Implement session timeout (1 hour default)
- ✅ Refresh tokens automatically

### Password Requirements

Enforce in Supabase Dashboard → Authentication → Policies:
- Minimum 8 characters
- Require uppercase letter
- Require lowercase letter
- Require number
- Require special character

### Multi-Factor Authentication (Optional)

```typescript
// Enable MFA for users
const { data, error } = await supabase.auth.mfa.enroll({
  factorType: 'totp',
  friendlyName: 'My Authenticator App',
});
```

---

## API Security

### Authentication Middleware

```typescript
// lib/auth-middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase-server';

export async function withAuth(
  handler: (req: NextRequest, user: any) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    const supabase = await createSupabaseServer();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return handler(req, user);
  };
}

// Usage
export const POST = withAuth(async (req, user) => {
  // User is authenticated
  // ... handler logic
});
```

### Request Size Limits

```typescript
// next.config.ts
export default {
  api: {
    bodyParser: {
      sizeLimit: '1mb', // Limit request body size
    },
  },
};
```

### API Versioning

```typescript
// app/api/v1/plugins/route.ts
export async function GET() {
  // v1 implementation
}

// app/api/v2/plugins/route.ts
export async function GET() {
  // v2 implementation with breaking changes
}
```

---

## Database Security

### Row Level Security (RLS)

Ensure RLS is enabled on all tables:

```sql
-- Check RLS status
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- All should show rowsecurity = true
```

### Service Role Key Security

**CRITICAL**: The service role key bypasses RLS

```typescript
// ✅ SAFE: Use in server-side code only
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Server-side only
);

// ❌ NEVER: Expose in client-side code
// This would allow anyone to bypass RLS!
```

### Audit Logging

```sql
-- Create audit log table
CREATE TABLE audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  old_data JSONB,
  new_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (table_name, operation, user_id, old_data, new_data)
  VALUES (
    TG_TABLE_NAME,
    TG_OP,
    auth.uid(),
    to_jsonb(OLD),
    to_jsonb(NEW)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to sensitive tables
CREATE TRIGGER audit_plugin_purchases
AFTER INSERT OR UPDATE OR DELETE ON plugin_purchases
FOR EACH ROW EXECUTE FUNCTION audit_trigger();
```

---

## Production Security Checklist

Before deploying:

### Configuration
- [ ] All environment variables secured in Vercel
- [ ] No secrets committed to git
- [ ] HTTPS enforced (automatic on Vercel)
- [ ] Security headers configured
- [ ] CSP implemented (at least report-only)

### Authentication
- [ ] Strong password requirements enforced
- [ ] Session timeout configured
- [ ] HTTP-only cookies enabled
- [ ] Secure cookie flag set in production

### API Security
- [ ] Rate limiting implemented on sensitive endpoints
- [ ] Input validation with Zod on all API routes
- [ ] CSRF protection for state-changing operations
- [ ] Authentication required where needed
- [ ] Request size limits configured

### Database Security
- [ ] RLS enabled on all tables
- [ ] RLS policies tested
- [ ] Service role key secured
- [ ] Audit logging on sensitive tables
- [ ] Database backups configured

### Monitoring
- [ ] Error tracking configured (Sentry)
- [ ] Security alerts set up
- [ ] Audit logs monitored
- [ ] Failed authentication attempts tracked

### Testing
- [ ] Security scan completed (securityheaders.com)
- [ ] Penetration testing performed (if budget allows)
- [ ] Vulnerability scan run
- [ ] Authentication flows tested
- [ ] RLS policies verified

---

## Security Incident Response

### Detection

Monitor for:
- Unusual spike in failed login attempts
- High rate of 4xx/5xx errors
- Unexpected database queries
- Abnormal traffic patterns

### Response Plan

1. **Identify**: Confirm security incident
2. **Contain**: Disable affected endpoints/accounts
3. **Investigate**: Review logs, identify scope
4. **Remediate**: Fix vulnerability, rotate keys
5. **Recover**: Restore service, verify security
6. **Document**: Post-mortem, lessons learned

### Emergency Contacts

- **Vercel Support**: support@vercel.com
- **Supabase Support**: https://supabase.com/support
- **Stripe Security**: security@stripe.com

---

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/authentication)
- [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Security Headers](https://securityheaders.com/)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)

---

**Last Updated**: November 6, 2025
**Maintained By**: AdvancingTechnology Development Team
