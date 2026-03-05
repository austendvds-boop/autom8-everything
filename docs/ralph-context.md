# ralph-context.md

## Batch Notes (keep last 3)

### 2026-03-05 — Batch 3 retry: Pricing UI + calendar limit enforcement

#### Files modified
- `src/app/services/review-funnel/page.tsx`
- `src/app/review-funnel/signup/SignupClient.tsx`
- `src/lib/review-funnel/services/calendar.ts`
- `src/app/api/review-funnel/google/auth-url/route.ts`
- `src/app/api/review-funnel/google/callback/route.ts`
- `src/app/review-funnel/dashboard/settings/SettingsClient.tsx`
- `docs/ralph-context.md`

#### UI changes summary
- `/services/review-funnel` pricing now shows:
  - Starter `$79/month` with `1 connected calendar`, `150 text messages per month`, and `Get Started` to `/review-funnel/signup`
  - Growth `$149/month` with `Up to 5 connected calendars`, `600 text messages per month`, `Most Popular`, and `Get Started` to `/review-funnel/signup`
  - Pro `Let's talk` with `Unlimited calendars`, `Custom message volume`, `Priority support`, and `Contact Us` to `mailto:aust@autom8everything.com`
- `/review-funnel/signup` Step 4 plan cards match the same three tiers.
  - Starter and Growth continue to Stripe checkout.
  - Pro is contact-only and does not open checkout.

#### Calendar limit enforcement location
- Main enforcement in `src/lib/review-funnel/services/calendar.ts`:
  - `ensureCalendarConnectionAllowed(tenantId)` checks active calendar watch count against `rf_tenants.calendar_limit`.
  - `createWatch()` also enforces the same limit before creating a new watch.
  - Friendly message used: `You've reached your calendar limit for your current plan. Upgrade to connect more calendars.`
- Enforced before connect flow starts in `src/app/api/review-funnel/google/auth-url/route.ts`.
- Inline user-facing message shown in `src/app/review-funnel/dashboard/settings/SettingsClient.tsx` via `CalendarStatus` error block on the calendar card.

#### Verification
- `npm run build` ✅

---

### 2026-03-05 — Batch 2 (rerun): Schema + Stripe backend refresh

#### Scope completed
- Re-ran Batch 2 backend flow from `ralph-queue.md` in `master` without UI edits.
- Confirmed schema definition already includes `rf_tenants.calendar_limit` in `src/lib/review-funnel/db/schema.ts` (`integer NOT NULL DEFAULT 1`).
- Ran Vercel env fetch + temporary `.env.local` + `npx drizzle-kit push` flow, then removed `.env.local`.
  - Drizzle surfaced legacy `DROP SEQUENCE` statements for unrelated tables and was aborted at confirmation prompt (no destructive changes applied).
  - Independently verified DB column exists: `calendar_limit` (`integer`, default `1`, not null) in `public.rf_tenants`.
- Created new Stripe products/prices:
  - Starter product `prod_U5tRNpAHSzUdKZ` / price `price_1T7hegBxWKNs26XEZGeX5otQ`
  - Growth product `prod_U5tReGySXLI0wU` / price `price_1T7hehBxWKNs26XEeKM2MwGm`
- Updated Vercel env vars:
  - `RF_STRIPE_PRICE_STARTER` -> `price_1T7hegBxWKNs26XEZGeX5otQ`
  - `RF_STRIPE_PRICE_GROWTH` -> `price_1T7hehBxWKNs26XEeKM2MwGm`
  - `RF_STRIPE_PRICE_PRO` confirmed absent
- Updated docs:
  - `docs/ENV-VARS.md` with the new Starter/Growth price IDs.

#### Verification
- `npx drizzle-kit push` executed (aborted before destructive legacy sequence drops)
- DB check for `rf_tenants.calendar_limit` passed

---

### 2026-03-05 — Batch 3: RF admin panel for Austen

#### Scope completed
- Generated `RF_ADMIN_SECRET` (32-char hex) and set it in Vercel (`production` + `preview`) for `prj_VDUyHtQs8yg3QUy1BEvVyEyY96aj`. Saved local copy to `C:\Users\austen\.openclaw\credentials\rf-admin-secret.txt`.
- Added admin auth system:
  - `src/lib/review-funnel/admin.ts` — plan config constants + helpers
  - `src/lib/review-funnel/admin-middleware.ts` — `requireReviewFunnelAdminAuth` (validates `RF_ADMIN_SECRET` header or `rf_admin_session` JWT cookie; timing-safe secret compare)
  - `POST /api/review-funnel/admin/auth` — accepts `{ secret }`, sets `rf_admin_session` httpOnly cookie (JWT, 8h expiry)
  - `DELETE /api/review-funnel/admin/auth` — clears admin session cookie
- Added protected admin API routes (all guarded by `requireReviewFunnelAdminAuth`):
  - `GET /api/review-funnel/admin/tenants` — searchable, sortable tenant list
  - `GET /api/review-funnel/admin/tenants/[id]` — full tenant detail + calendar connections + 3-month SMS history + last 20 review requests
  - `PATCH /api/review-funnel/admin/tenants/[id]` — activate/deactivate or change plan
  - `GET /api/review-funnel/admin/stats` — plan counts, monthly SMS total, MRR, new signups this month
- Added admin UI routes (all server-rendered, auth-gate redirect to `/review-funnel/admin/login`):
  - `/review-funnel/admin/login` — single password field, no username
  - `/review-funnel/admin` — tenant table (search, sort by created_at / plan / status)
  - `/review-funnel/admin/tenants/[id]` — tenant detail view + actions
  - `/review-funnel/admin/stats` — overview KPIs
- Added reusable `AdminShell` sidebar (`src/components/review-funnel/admin/AdminShell.tsx`) with Tenants | Stats | Logout.
- Updated docs: `ENV-VARS.md`, `UI-VERIFICATION.md`, `implementation-plan.md`, `CODER-CONTEXT.md`.

#### Verification
- `npm run build` ✅ (exit 0, 74 routes, all 4 new admin routes show as `ƒ Dynamic`)
