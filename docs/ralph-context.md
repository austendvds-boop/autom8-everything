# ralph-context.md

## Batch Notes (keep last 3)

### 2026-03-05 — Batch 3: Pricing UI + calendar limit enforcement

#### Files modified
- `src/app/services/review-funnel/page.tsx`
- `src/app/review-funnel/signup/SignupClient.tsx`
- `src/lib/review-funnel/services/calendar.ts`
- `src/app/api/review-funnel/google/auth-url/route.ts`
- `src/app/api/review-funnel/google/callback/route.ts`
- `src/app/review-funnel/dashboard/settings/SettingsClient.tsx`
- `docs/UI-VERIFICATION.md`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

#### Scope completed
- Updated `/services/review-funnel` pricing cards to match required tiers:
  - Starter: `$79/month`, `1 connected calendar`, `150 text messages per month`
  - Growth: `$149/month`, `Up to 5 connected calendars`, `600 text messages per month`, `Most Popular`
  - Pro: `Let's talk`, `Unlimited calendars`, `Custom message volume`, `Priority support`
  - CTA updates: Starter/Growth `Get Started` to `/review-funnel/signup`; Pro `Contact Us` to `mailto:aust@autom8everything.com`
- Updated `/review-funnel/signup` Step 4 plan cards to match the same pricing/limits and CTA behavior.
  - Starter/Growth keep Stripe checkout path.
  - Pro opens contact email only (no checkout).
- Enforced calendar limit with user-friendly handling:
  - Enforcement logic in `src/lib/review-funnel/services/calendar.ts` before watch creation (`createWatch`) using active watch count vs `rf_tenants.calendar_limit`.
  - Added shared limit message: `You've reached your calendar limit for your current plan. Upgrade to connect more calendars.`
  - Added pre-check in `GET /api/review-funnel/google/auth-url` so limit errors are returned before calendar connect redirect.
  - Added inline calendar error display in `SettingsClient` -> `CalendarStatus` card so the message appears where users click Connect Calendar.
- Sanitized calendar-connect failure messaging to plain-language output in callback/settings flow.

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
