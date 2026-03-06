# ralph-context.md

## Batch Notes (keep last 3)

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
- Usage hydration in client detail:
  - Cadence services call `getCadenceTenantConfig()` + `getCadenceRecentCalls()`.
  - Review Funnel services query current month usage from `rf_sms_usage` via SQL.

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

---

### 2026-03-06 - Batch 10: platform DB spec alignment + finalize commit

#### Files modified
- `src/lib/platform/db/schema.ts`
- `src/lib/platform/db/client.ts`
- `src/lib/platform/config.ts`
- `docs/migrations/2026-03-07-platform-tables.sql`
- `drizzle.config.ts`
- `.env.example`
- `docs/implementation-plan.md`
- `docs/CODER-CONTEXT.md`
- `docs/ralph-context.md`

#### Key exports / behavior
- Confirmed the unified platform DB foundation is in place with `a8_clients`, `a8_client_services`, and `a8_magic_links`.
- Kept required type exports and platform DB client schema merge with Review Funnel tables.
- Aligned `a8_clients` unique index to direct `email` uniqueness (instead of expression-based uniqueness).
- Kept required partial indexes (`stripe_customer_id` and `cadence_tenant_id`) and magic-link indexes.
- Confirmed platform config env parsing + build placeholders match requested behavior.
- Updated SQL migration and `.env.example` platform block to match task spec.

#### Gotchas for next batch
- `drizzle.config.ts` table filter now includes `a8_*`, but `schema` still points to review-funnel schema path. Use the SQL migration file for DB creation unless schema config is expanded in a follow-up.
