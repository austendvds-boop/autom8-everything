# ralph-context.md

## Batch Notes (keep last 3)

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

---

### 2026-03-06 - Batch 12: platform operator admin API routes + provisioning/email services

#### Files modified
- `src/lib/platform/services/email.ts` (new)
- `src/lib/platform/services/provisioning.ts` (new)
- `src/app/api/admin/auth/route.ts` (new)
- `src/app/api/admin/clients/route.ts` (new)
- `src/app/api/admin/clients/[id]/route.ts` (new)
- `src/app/api/admin/clients/[id]/services/route.ts` (new)
- `docs/implementation-plan.md`
- `docs/CODER-CONTEXT.md`
- `docs/ralph-context.md`

#### Key exports / behavior
- Added platform portal email service:
  - `sendPortalMagicLinkEmail({ toEmail, token })`
  - `sendWelcomeEmail({ toEmail, clientName, serviceName, magicLinkToken })`
  - Uses the dark email shell style parity with Review Funnel and links to `/api/portal/auth/verify?token=...`.
- Added platform provisioning service:
  - `provisionService(clientId, serviceType, metadata?)`
  - `pauseService(clientId, serviceType)`
  - `cancelService(clientId, serviceType)`
  - `resumeService(clientId, serviceType)`
- Provisioning specifics:
  - Cadence requires `metadata.cadenceTenantId` and stores it in `a8_client_services.cadence_tenant_id`.
  - Review Funnel resolves `rf_tenant_id` from `metadata.rfTenantId` or by matching `a8_clients.email` to `rf_tenants.owner_email`.
- Added admin auth route:
  - `POST /api/admin/auth` validates `{ secret }`, sets `a8_admin_session`, returns `{ ok: true }`.
- Added admin clients routes:
  - `GET /api/admin/clients` returns clients with summarized services array.
  - `POST /api/admin/clients` creates client.
  - `GET /api/admin/clients/[id]` returns client + full services + usage data.
  - `PATCH /api/admin/clients/[id]` updates partial client fields.
  - `POST /api/admin/clients/[id]/services` provisions service, generates portal magic link, sends welcome email.
  - `DELETE /api/admin/clients/[id]/services` cancels service.
  - `PATCH /api/admin/clients/[id]/services` pauses/resumes service.

#### Gotchas for next batch
- `GET /api/admin/clients/[id]` derives Cadence `callCount` from common keys in the calls payload (`callCount`, `total`, etc.) and falls back to `calls.length`. If cadence-v2 standardizes a definitive count field, tighten this mapping.
- Provisioning currently returns `500` for provisioning/email failures in `/api/admin/clients/[id]/services`; if UI needs finer-grained validation errors (e.g., missing Cadence ID, no matching RF tenant), split into explicit `4xx` responses.
- `sendPortalMagicLinkEmail` is implemented but not yet wired to an API route in this batch.

---

### 2026-03-06 - Batch 11: platform portal auth + middleware foundation

#### Files modified
- `src/lib/platform/services/auth.ts` (new)
- `src/lib/platform/services/cadence-api.ts` (new)
- `src/lib/platform/admin-middleware.ts` (new)
- `src/lib/platform/portal-middleware.ts` (new)
- `docs/implementation-plan.md`
- `docs/CODER-CONTEXT.md`
- `docs/ralph-context.md`

#### Key exports / behavior
- Added portal auth service with Review Funnel auth parity patterns:
  - `hashToken(token)` uses SHA-256 hex digest.
  - `createPortalSession(clientId)` creates JWT with role `portal_client` and TTL from `A8_SESSION_TTL_HOURS`.
  - `generatePortalMagicLink(email)` normalizes email, verifies active `a8_clients` row, stores hashed token in `a8_magic_links`, and returns raw token.
  - `verifyPortalMagicLink(token)` validates/consumes active link transactionally and returns `{ sessionToken, client }`.
  - `verifyPortalSession(token)` validates JWT and active client status.
- Added Cadence portal API client:
  - Base URL from `CADENCE_API_URL`
  - Adds `X-Portal-Secret` header on all requests
  - Exports:
    - `getCadenceTenantConfig(tenantId)`
    - `updateCadenceTenantConfig(tenantId, updates)`
    - `getCadenceRecentCalls(tenantId, limit?, offset?)`
- Added admin middleware:
  - `isAdminSecretValid(candidate)` with timing-safe compare to `A8_ADMIN_SECRET`
  - `createAdminSessionToken()` JWT with `{ role: "platform_admin" }`, 8h expiry
  - `requireAdminAuth(request)` accepts `x-admin-secret` OR `a8_admin_session` cookie
  - Exported `A8_ADMIN_SESSION_COOKIE_NAME = "a8_admin_session"`
- Added portal middleware:
  - `requirePortalAuth(request)` accepts Bearer token or `a8_portal_session` cookie
  - Returns `{ ok: true, client, sessionToken }` on success
  - Exported `A8_PORTAL_SESSION_COOKIE_NAME = "a8_portal_session"`

#### Gotchas for next batch
- Cadence API helper currently targets `/dashboard/api/settings` and `/dashboard/api/calls` with `clientId` query semantics. If cadence-v2 portal route naming differs, update these path builders in one place.
