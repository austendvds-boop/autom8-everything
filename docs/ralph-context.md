# ralph-context.md

## Batch Notes (keep last 3)

### 2026-03-06 - Batch 16: final integration wiring + platform setup docs

#### Files modified
- `src/components/Footer.tsx`
- `docs/platform-setup.md` (new)
- `docs/UI-VERIFICATION.md`
- `docs/ENV-VARS.md`
- `docs/implementation-plan.md`
- `docs/CODER-CONTEXT.md`
- `docs/ralph-context.md`

#### Key exports / behavior
- Left public navigation unchanged (`src/components/Navigation.tsx`):
  - no `/admin/clients` public nav link
  - no `/portal/login` public nav link
- Added subtle footer entry point in Company links:
  - `Client Portal` -> `/portal/login`
  - small text style and placed at bottom of links section
- Added `docs/platform-setup.md` runbook covering:
  - platform env vars for autom8-everything
  - required shared secret alignment with cadence-v2
  - DB migration options (`docs/migrations/2026-03-07-platform-tables.sql` or drizzle push)
  - end-to-end operator/client workflow
- Import verification:
  - Checked platform/review-funnel module boundaries for this batch; no circular dependency introduced.

#### Gotchas for next batch
- Public header still includes legacy Cadence `Client Login` external link; intentionally left unchanged because task only required portal entry in footer.
- `docs/platform-setup.md` is now the canonical quick-start for platform rollout; keep it in sync with any auth/env changes.

---

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
