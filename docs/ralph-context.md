# ralph-context.md

## Batch Notes (keep last 3)

### 2026-03-06 - Batch 15: platform client portal UI (`/portal`)

#### Files modified
- `src/app/portal/login/page.tsx` (new)
- `src/app/portal/login/PortalLoginClient.tsx` (new)
- `src/app/portal/page.tsx` (new)
- `src/app/portal/PortalDashboardClient.tsx` (new)
- `src/app/portal/cadence/page.tsx` (new)
- `src/app/portal/cadence/PortalCadenceClient.tsx` (new)
- `src/app/portal/review-funnel/page.tsx` (new)
- `src/app/portal/billing/page.tsx` (new)
- `src/app/portal/billing/PortalBillingClient.tsx` (new)
- `docs/UI-VERIFICATION.md`
- `docs/implementation-plan.md`
- `docs/CODER-CONTEXT.md`
- `docs/ralph-context.md`

#### Key exports / behavior
- Added `/portal/login` UI:
  - server shell `src/app/portal/login/page.tsx`
  - client form posts `POST /api/portal/auth/login` with `{ email }`
  - success state: `Check your email for a login link.`
  - inline error handling for failed requests
- Added `/portal` dashboard UI:
  - server shell `src/app/portal/page.tsx`
  - client auth gate on mount with `GET /api/portal/me`; 401 redirects to `/portal/login`
  - welcome header shows `contactName` and `businessName`
  - service cards:
    - Cadence card (`📞`) with active/paused/inactive badge, quick calls preview fallback, `Manage` -> `/portal/cadence`
    - Review Funnel card (`⭐`) with status badge, `Open Dashboard` -> `/review-funnel/dashboard` in new tab
  - billing section button posts `POST /api/portal/billing/portal` then redirects to returned URL
- Added `/portal/cadence` settings UI:
  - server shell `src/app/portal/cadence/page.tsx`
  - client auth gate via `GET /api/portal/me`
  - settings load via `GET /api/portal/cadence/settings`
  - editable sections: greeting, transfer number, booking URL, timezone, business hours, services list, question list
  - save via `PATCH /api/portal/cadence/settings` with changed top-level fields only
  - success toast (`Settings saved`) and inline save error state
  - recent calls table from `GET /api/portal/cadence/calls` with:
    - local date/time formatting
    - masked caller phone format `(***) ***-1234`
    - duration formatted as `Xm Ys`
    - summary first-line display
    - load-more pagination
- Added `/portal/review-funnel` route as a simple handoff card linking to `/review-funnel/dashboard`.
- Added `/portal/billing` redirect route:
  - server shell `src/app/portal/billing/page.tsx`
  - client auto-posts `POST /api/portal/billing/portal` on mount
  - loading state while fetching
  - fallback message on error: `No billing account linked. Contact support.`

#### Gotchas for next batch
- Cadence settings shape from cadence-v2 is permissive; UI normalizes `hours/services/faqs` and writes back normalized arrays. If cadence-v2 requires a stricter schema, align normalization and payload shape.
- Dashboard call-count preview attempts common count keys (`callCount`, `total`, `count`) and falls back to generic copy when unavailable.
- `/portal/review-funnel` currently uses static handoff card (no server-side service entitlement check).

---

### 2026-03-06 - Batch 14: platform operator dashboard UI (`/admin/clients`)

#### Files modified
- `src/app/admin/clients/page.tsx` (new)
- `src/app/admin/clients/AdminClientsClient.tsx` (new)
- `src/app/admin/clients/[id]/page.tsx` (new)
- `src/app/admin/clients/[id]/AdminClientDetailClient.tsx` (new)
- `src/app/api/admin/clients/[id]/route.ts`
- `docs/UI-VERIFICATION.md`
- `docs/implementation-plan.md`
- `docs/CODER-CONTEXT.md`
- `docs/ralph-context.md`

#### Key exports / behavior
- Added platform admin list route UI at `/admin/clients`:
  - Login gate checks `GET /api/admin/clients` on mount.
  - If unauthorized, shows password form and signs in via `POST /api/admin/auth` with `{ secret }`.
  - On success, refetches and renders searchable client list.
  - List rows show business/contact/email/service badges + created date and navigate to `/admin/clients/[id]`.
  - Includes `New Client` modal form for creating records via `POST /api/admin/clients`.
- Added platform admin client detail UI at `/admin/clients/[id]`:
  - Includes back link, client header details, inline edit mode (`PATCH /api/admin/clients/[id]`).
  - Service cards include status badges, this-month usage counters, and pause/resume/cancel actions.
  - Add-service form supports Cadence account ID input and Review Funnel email-match onboarding.
  - Successful add shows confirmation: `Service added. Welcome email sent to [email].`
  - Usage section renders Cadence recent-call table + Review Funnel text-message usage when active.
- Updated admin client detail API hydration:
  - `GET /api/admin/clients/[id]` now includes `usage.recentCalls` extracted from Cadence calls response for UI table rendering.

#### Gotchas for next batch
- Cadence recent-call rows are passed through from upstream payload shape. If cadence-v2 field names change, update the detail UI call-row normalization helpers.
- Detail page currently includes its own login gate (same pattern as list page) instead of shared admin layout middleware.
- Review Funnel add-service flow still depends on email-based account lookup when explicit ID is not provided.

---

### 2026-03-06 - Batch 13: platform client portal API routes

#### Files modified
- `src/app/api/portal/auth/login/route.ts` (new)
- `src/app/api/portal/auth/verify/route.ts` (new)
- `src/app/api/portal/me/route.ts` (new)
- `src/app/api/portal/cadence/settings/route.ts` (new)
- `src/app/api/portal/cadence/calls/route.ts` (new)
- `src/app/api/portal/billing/portal/route.ts` (new)
- `docs/implementation-plan.md`
- `docs/CODER-CONTEXT.md`
- `docs/ralph-context.md`

#### Key exports / behavior
- Added `POST /api/portal/auth/login`:
  - accepts `{ email }`
  - normalizes to lowercase
  - calls `generatePortalMagicLink(email)`
  - sends `sendPortalMagicLinkEmail({ toEmail, token })` on known active client
  - always returns `200 { ok: true }` for unknown client emails
- Added `GET /api/portal/auth/verify`:
  - validates `token` query param with `verifyPortalMagicLink(token)`
  - sets `a8_portal_session` cookie using `A8_PORTAL_SESSION_COOKIE_NAME`
  - cookie options: `httpOnly`, `sameSite: "lax"`, `secure` in production, `path: "/"`, `maxAge` from `platformConfig.A8_SESSION_TTL_HOURS * 60 * 60`
  - redirects to `/portal`
  - invalid/missing token returns `401 { error: "Invalid or expired link" }`
- Added `GET /api/portal/me`:
  - requires `requirePortalAuth`
  - returns client identity fields plus mapped service list from `a8_client_services`
- Added `GET/PATCH /api/portal/cadence/settings`:
  - requires `requirePortalAuth`
  - gates on active Cadence service (`service_type = cadence`, `status = active`, non-empty `cadenceTenantId`)
  - `GET` returns `getCadenceTenantConfig(cadenceTenantId)`
  - `PATCH` validates payload shape and passes updates to `updateCadenceTenantConfig(cadenceTenantId, body)`
  - returns `404` if no active Cadence service
- Added `GET /api/portal/cadence/calls`:
  - requires `requirePortalAuth`
  - gates on active Cadence service
  - supports `limit` (default `50`) and `offset` (default `0`)
  - returns `getCadenceRecentCalls(cadenceTenantId, limit, offset)`
- Added `POST /api/portal/billing/portal`:
  - requires `requirePortalAuth`
  - loads `stripeCustomerId` from `a8_clients`
  - returns `400 { error: "No billing account linked" }` when missing
  - creates Stripe billing portal session via `new Stripe(process.env.STRIPE_SECRET_KEY)`
  - fixed return URL: `https://autom8everything.com/portal`

#### Gotchas for next batch
- `GET /api/portal/auth/verify` currently returns JSON 401 for invalid links (as requested). If product wants friendly UI redirect parity with Review Funnel login, add a dedicated portal error page and redirect flow.
- Cadence settings update schema allows unknown nested object shapes for `hours`, `services`, and `faqs` (`z.unknown()`), so deep validation is delegated to cadence-v2.
- Billing portal route reads `stripeCustomerId` from DB at request time; if service provisioning delays Stripe sync, users may see the expected `No billing account linked` until sync completes.
