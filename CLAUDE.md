# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

**AT Contractor Portal** — an internal tool for Advancing Technology contractors to manage tasks (bounties), submit daily EOD reports, track time, and view documents. Admins manage contractors, review task submissions, and monitor bot conversations. Deployed to Vercel at `advancingtechnology.dev`.

This is NOT a public-facing product. `robots.txt` blocks all crawlers. Auth is required for all portal functionality.

## Commands

```bash
pnpm dev             # Start dev server (Turbopack)
pnpm build           # Production build — must pass before deploy
pnpm type-check      # TypeScript strict mode check (tsc --noEmit)
pnpm lint:check      # ESLint with zero warnings tolerance
pnpm lint            # ESLint with auto-fix
```

No test runner is configured yet (`pnpm test-rls` is a no-op stub).

**Vercel deploy**: Uses `npm install --legacy-peer-deps && npm run build` per `vercel.json` — this overrides the monorepo pnpm setup for Vercel's build environment.

## Architecture

### Route Groups

The app has two authenticated route groups with separate layouts and sidebar navigation:

- **`(portal)/`** — Contractor-facing. Layout in `src/app/(portal)/layout.tsx`. Pages: dashboard, tasks, tasks/[id], eod, documents, profile.
- **`(admin)/`** — Admin-only. Layout in `src/app/(admin)/layout.tsx`. Pages: admin (dashboard), admin/contractors, admin/tasks, admin/tasks/[id], admin/eod-reports, admin/bot-conversations.

The root `page.tsx` is a landing page that shows "Sign In", "Go to Dashboard", or "Admin Panel" based on auth state.

### Auth & Role Gating

Two-layer auth:

1. **Middleware** (`middleware.ts`): Server-side. Redirects unauthenticated users to `/auth` for protected routes. For `/admin` routes, queries `contractor_profiles.role` (with fallback to `user_metadata.role`) and redirects non-admins to `/dashboard`.

2. **AuthProvider** (`src/components/AuthProvider.tsx`): Client-side React context. Provides `user`, `session`, `profile`, `isAdmin`, `loading`, `signOut`, `refreshSession`. Profile fetch is fire-and-forget (non-blocking) — `isAdmin` falls back to `user_metadata.role` until the profile loads.

Admin status is determined by: `contractor_profiles.role === 'admin'` OR `user_metadata.role === 'admin'`.

### Supabase Client Pattern

Three client factories — always use these, never create clients directly:

| Factory | Location | Context |
|---------|----------|---------|
| `createSupabaseBrowser()` | `src/lib/supabase.ts` | Client components, query functions |
| `createSupabaseServer()` | `src/lib/supabase-server.ts` | Server Components, API routes (uses cookies) |
| `createSupabaseAdmin()` | `src/lib/supabase-server.ts` | Service-role operations (bypasses RLS) |

All three fall back to placeholder URLs during build time when env vars are missing, so `next build` succeeds without Supabase credentials.

### Data Layer

Query functions live in `src/lib/queries/` and are organized by domain:

| Module | Tables | Key Operations |
|--------|--------|----------------|
| `tasks.ts` | `bounties`, `task_submissions` | Browse/claim/submit tasks via RPCs (`claim_bounty`, `submit_bounty_work`) |
| `admin.ts` | `bounties`, `task_submissions`, `eod_reports`, `bounty_activity` | Review submissions via RPC (`review_submission`), create tasks, activity feed |
| `eod.ts` | `eod_reports` | Upsert daily reports (conflict on `contractor_id,report_date`) |
| `contractors.ts` | `contractor_profiles`, `documents` | Profile lookup, document listing |
| `timeclock.ts` | `time_clock` | Clock in/out shifts |
| `botconvos.ts` | `bot_conversations` | List Discord bot conversation logs |
| `user.ts` | — | User-related queries |

Tasks use a bounty model: `available → claimed → submitted → approved/rejected`. State transitions are enforced by Supabase RPCs, not client-side updates.

### API Routes

| Route | Purpose | Auth |
|-------|---------|------|
| `POST /api/auth` | Auth operations | Public |
| `GET /api/auth/callback` | Supabase OAuth callback | Public |
| `POST /api/aj-chat` | Canned chatbot responses (keyword matching, no LLM) | Public |
| `POST /api/notify-review` | Sends Discord DM + channel notification when admin reviews a task | Session required |
| `POST /api/checkout` | Stripe checkout session creation | Session required |
| `GET /api/checkout-session` | Retrieve checkout session | Session required |
| `POST /api/webhooks/stripe` | Stripe webhook handler | Stripe signature |

### Discord Integration

`/api/notify-review` sends Discord notifications via Bot API when an admin approves/rejects/requests revision on a task submission. Uses `DISCORD_BOT_TOKEN` env var. Contractor must have `discord_id` in their `contractor_profiles` row. Office channel mapping is hardcoded in the route handler.

### Maintenance Mode

Set `MAINTENANCE_MODE=true` env var to redirect all traffic to `/maintenance`. Middleware allows static assets and API routes through.

## Supabase Tables

Core tables (defined in `supabase/migrations/20260413_contractor_portal.sql`):

- `contractor_profiles` — id (FK to auth.users), full_name, email, role, status, discord_id
- `bounties` — Tasks with title, description, reward, difficulty, category, galaxy_id, status, claimed_by, source
- `task_submissions` — Proof of work per bounty (bounty_id, version, proof_url, proof_text, attachments, status)
- `bounty_activity` — Activity log for bounty state changes
- `eod_reports` — Daily end-of-day reports (contractor_id, report_date, tasks_completed, blockers, plan_tomorrow, hours_worked, loom_url, mood)
- `time_clock` — Clock in/out records (contractor_id, clock_in, clock_out)
- `bot_conversations` — Discord bot conversation logs
- `documents` — Contractor-facing documents (is_active, sort_order)

Legacy tables from the plugin marketplace pivot exist in earlier migrations but are not used.

## Environment Variables

**Required for runtime:**
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` — For admin operations
- `NEXT_PUBLIC_SITE_URL` — Canonical site URL

**Optional integrations:**
- `DISCORD_BOT_TOKEN` — For task review notifications
- `STRIPE_SECRET_KEY` — For checkout
- `STRIPE_WEBHOOK_SECRET` — For webhook verification
- `MAINTENANCE_MODE` — Set to `true` to enable maintenance redirect

## UI Stack

- **shadcn/ui** components in `src/components/ui/` (button, card, input, label, select, table, textarea, skeleton)
- **Tailwind CSS v3** with `tailwind-merge` + `clsx` via `cn()` helper (`src/lib/utils.ts`)
- **Framer Motion** for animations (`src/components/animations/`, `src/components/effects/`)
- **Lucide React** for icons
- **next-themes** for dark mode
- **sonner** for toast notifications
- **recharts** for charts
- **react-hook-form** + **zod** for form validation

## Conventions

- Path alias: `@/*` maps to `./src/*`
- TypeScript strict mode enforced — `ignoreBuildErrors: false` in next.config
- ESLint runs during build — `ignoreDuringBuilds: false`
- Console statements stripped in production via `compiler.removeConsole`
- Security headers (HSTS, X-Frame-Options, CSP-adjacent) set in `next.config.ts`
- Package manager for this project is **pnpm** locally, but Vercel build uses npm (per `vercel.json`)
