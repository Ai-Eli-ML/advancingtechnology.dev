# AdvancingTechnology.Dev - Claude 4 Development System

## 🎯 COMPREHENSIVE DEVELOPMENT FRAMEWORK FOR CLAUDE 4

**CRITICAL: This is the complete development system that Claude 4 must follow for all work on AdvancingTechnology.Dev.**

---

## 📋 MANDATORY WORKFLOW: State-Driven Development

### TASK 1: Initial Assessment & Context Gathering
1. ALWAYS START HERE: Read `completed-docs/claude-ai-workflow-system/templates/docs/project_management/development-plan.json` - THE SINGLE SOURCE OF TRUTH
2. Context Selection: Review relevant documentation:
   - API/Backend Tasks → `completed-docs/technical_specs/API_ARCHITECTURE.md`
   - Security Tasks → `completed-docs/technical_specs/MIDDLEWARE_ARCHITECTURE.md`
   - Performance Tasks → `completed-docs/technical_specs/PERFORMANCE_OPTIMIZATION_PLAN.md`
   - UI/UX Tasks → `completed-docs/claude-ai-workflow-system/templates/docs/project_management/USER_FLOWS.md`
   - Email Tasks → `completed-docs/technical_specs/SMTP_SETUP_GUIDE.md`
3. Update features-tracking.md and todos for every new task
4. Stop and Confirm: Present analysis to user before proceeding

### TASK 2: Strategic Planning & Architecture Analysis
1. Use MCP Tools for Deep Analysis:
   - Sequential Thinking Tool → Break down complex problems
   - Database MCP Server → Inspect schemas, verify policies
   - Browser Console Logs → Client-side diagnostics
2. Risk Assessment: Identify breaking changes, edge cases
3. Technical Approach: Document implementation strategy
4. Stop and Confirm: Present plan to user before implementation

### TASK 3: Implementation Following Project Standards
1. Code Standards: Adhere to `styleGuidelines` in development-plan.json
2. Pattern Consistency: Use existing patterns from codebase
3. Critical Rules:
   - Use established Supabase client patterns (NO direct client creation)
   - Follow React/Next.js hook rules
   - Use Zod validation for all forms and API inputs
   - Implement error boundaries and loading states
4. Progressive Implementation: Make changes incrementally, test frequently
5. Stop and Confirm: Present implementation to user for review

### TASK 4: Verification & Quality Assurance
1. Required Checks:
   ```bash
   pnpm type-check    # MUST PASS
   pnpm lint:check    # MUST PASS
   pnpm build         # MUST SUCCEED
   pnpm test-rls      # For database/critical changes
   ```
2. Functional Testing: Test in different user roles
3. Performance Check: Verify no performance regressions
4. Stop and Confirm: Present test results to user

### TASK 5: Documentation & Tracking Updates
1. MANDATORY: Update `completed-docs/claude-ai-workflow-system/templates/docs/project_management/features-tracking.md`
   - Change status from `pending/In Progress` → `Done`
   - Add concise implementation notes
2. Update Related Docs: If architecture changes, update relevant documentation
3. Mark all related todos as completed
4. Stop and Confirm: Present final status to user

---

## 🏗️ PROJECT ARCHITECTURE & STANDARDS

- **Framework**: Next.js 15 (App Router, TypeScript strict mode)
- **Database**: Supabase (PostgreSQL, RLS policies)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS + Shadcn/UI
- **State Management**: React Query + Zustand
- **Package Manager**: pnpm
- **Testing**: Jest, Playwright, Cypress (see deployment guide)

## Critical Development Rules
1. Documentation First: Always consult guides before coding
2. State Tracking: Use features-tracking.md and todos throughout workflow
3. Stop Points: Present work at each major milestone
4. Test Everything: Every change must pass type-check + lint
5. Document Changes: Update tracking files immediately
6. Security First: Follow security policies and input validation
7. Performance Aware: Monitor query performance and bundle size

## File Structure & Patterns
```
repos/advancingtechnology.dev/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── ...
├── types/
├── public/
├── completed-docs/
│   ├── claude-ai-workflow-system/
│   ├── technical_specs/
│   └── ...
└── ...
```

## 🚀 DEVELOPMENT COMMANDS

### Daily Development
```bash
pnpm dev           # Start development server
pnpm type-check    # Type validation (RUN BEFORE COMMITS)
pnpm lint:check    # Code linting validation
pnpm lint          # Auto-fix linting issues
pnpm build         # Production build test
```

### Database Operations
```bash
# Run database migrations and seed data as needed
```

### Quality Assurance
```bash
pnpm test-rls      # Run test suite
pnpm build         # Must succeed for deployment
```

## 🔒 ENVIRONMENT & SECURITY

### Required Environment Variables
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- NEXT_PUBLIC_SITE_URL

### Security Standards
- All forms use Zod validation
- Supabase RLS policies protect all data access
- Rate limiting on API endpoints
- Audit logging for admin actions
- Security headers for protection

## 📊 TASK COMPLETION CRITERIA

- All type errors resolved
- All linting warnings addressed
- Production build succeeds
- Database policies tested
- User roles tested
- Performance verified
- Documentation updated
- features-tracking.md status updated
- User confirms completion

---

**REMEMBER: Stop at each major milestone and confirm with the user before proceeding. This ensures alignment and prevents unnecessary work.** 