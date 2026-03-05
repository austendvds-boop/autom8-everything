# ralph-context.md

## Batch Notes (keep last 3)

### 2026-03-05 — Batch 4: Review Funnel admin panel refresh (server-rendered list + stats)

#### Files created
- `src/app/review-funnel/admin/layout.tsx`
- `src/lib/review-funnel/admin-dashboard.ts`

#### Files modified
- `src/app/review-funnel/(admin-public)/admin/login/page.tsx`
- `src/app/review-funnel/(admin-public)/admin/login/AdminLoginClient.tsx`
- `src/app/api/review-funnel/admin/auth/route.ts`
- `src/app/review-funnel/admin/page.tsx`
- `src/app/review-funnel/admin/stats/page.tsx`
- `src/app/review-funnel/admin/tenants/[id]/page.tsx`
- `docs/ENV-VARS.md`
- `docs/UI-VERIFICATION.md`
- `docs/implementation-plan.md`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

#### Admin auth approach
- Login page (`/review-funnel/admin/login`) now posts a password to `POST /api/review-funnel/admin/auth`.
- API compares the submitted password against `process.env.RF_ADMIN_SECRET`.
- On match: sets `rf_admin_session` httpOnly JWT cookie with 8-hour expiry.
- On mismatch: returns `401` with `Incorrect password` for inline UI feedback.
- `src/app/review-funnel/admin/layout.tsx` now validates `rf_admin_session` on every protected admin render and redirects missing/invalid sessions to `/review-funnel/admin/login`.
- `/review-funnel/admin/login` is served from `src/app/review-funnel/(admin-public)/admin/login/*`, so the login page stays reachable without a session.
- This admin auth remains separate from Review Funnel magic-link auth.

#### Data + UI changes
- `/review-funnel/admin` is now a server component table with required columns:
  - Business name
  - Plan
  - Calendars connected (active calendar connection count)
  - Text messages used this month / monthly limit
  - Status (`active` / `past_due` / `cancelled`) from Stripe subscription status
  - Joined date
- Added row-level needs-attention badges:
  - 🔴 No calendar
  - 🔴 No messages sent
  - 🟡 Calendar offline
  - 🔴 Payment issue
  - 🟢 Upgrade ready
- Sorting now prioritizes needs-attention severity (`payment > no calendar > calendar offline > no messages > upgrade`), then joined date descending.
- Stripe subscription status checks use `GET https://api.stripe.com/v1/subscriptions/<id>` with a 5-minute cache.
- `/review-funnel/admin/stats` is now a server component with cards for Starter MRR, Growth MRR, Total MRR, total monthly text messages, and new signups this month.

#### Secrets
- Generated a new `RF_ADMIN_SECRET` and saved it to:
  - `C:\Users\austen\.openclaw\credentials\rf-admin-secret.txt`
- Updated Vercel env var `RF_ADMIN_SECRET` for:
  - `production`
  - `preview`
  - `development`

---

### 2026-03-05 — Batch 3 retry: Pricing UI + calendar limit enforcement

#### Files modified
- `src/app/services/review-funnel/page.tsx`
- `src/app/review-funnel/signup/SignupClient.tsx`
- `src/lib/review-funnel/services/calendar.ts`
- `src/app/api/review-funnel/google/auth-url/route.ts`
- `src/app/api/review-funnel/google/callback/route.ts`
- `src/app/review-funnel/dashboard/settings/SettingsClient.tsx`
- `docs/ralph-context.md`

#### Verification
- `npm run build` ✅

---

### 2026-03-05 — Batch 3: RF admin panel for Austen

#### Scope completed
- Added `RF_ADMIN_SECRET`-based admin auth, admin APIs, admin login page, tenant list/detail pages, and stats page.
- Added reusable admin shell sidebar and updated docs for env vars + UI verification.

#### Verification
- `npm run build` ✅
