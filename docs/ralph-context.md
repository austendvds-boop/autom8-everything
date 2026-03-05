# ralph-context.md

## Batch Notes (keep last 3)

### 2026-03-05 — Batch 4 retry 2: deploy gate recovery

#### Scope completed
- Verified latest production deployment for Vercel project `prj_VDUyHtQs8yg3QUy1BEvVyEyY96aj` was still on older commit `f1b8e324...`.
- Re-ran `npm run build` (pass) before triggering retry deploy.
- Pushed a minimal docs-only commit to `master` to trigger a fresh production deployment.
- Verified newest production deployment reached `READY` and now points at the latest retry commit.

---

### 2026-03-05 — Batch 4 retry: commit/push gate recovery

#### Scope completed
- Retry run focused on clearing the commit gate failure (`no new commit detected on origin/master`).
- Re-ran `npm run build` and confirmed it passes.
- Confirmed `RF_ADMIN_SECRET` exists in Vercel for `production`, `preview`, and `development`.
- Confirmed local admin secret file exists at `C:\Users\austen\.openclaw\credentials\rf-admin-secret.txt` (32-character value).
- Created and pushed a fresh commit to `origin/master`.

---

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

