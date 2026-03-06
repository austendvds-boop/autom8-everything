# ralph-context.md

## Batch Notes (keep last 3)

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
  - Added interfaces:
    - `CadenceTenantConfig`
    - `CadenceTenantUpdate`
    - `CadenceCall`
    - `CadenceCallsResponse`
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

---

### 2026-03-06 - Batch 9: platform DB foundation (a8 tables + config + client)

#### Files modified
- `src/lib/platform/db/schema.ts` (new)
- `src/lib/platform/db/client.ts` (new)
- `src/lib/platform/config.ts` (new)
- `docs/migrations/2026-03-07-platform-tables.sql` (new)
- `drizzle.config.ts`
- `.env.example`
- `docs/implementation-plan.md`
- `docs/CODER-CONTEXT.md`
- `docs/ralph-context.md`

#### Key exports / behavior
- Added `a8_clients`, `a8_client_services`, and `a8_magic_links` in `platformSchema`.
- Added inferred types: `A8Client`, `NewA8Client`, `A8ClientService`, `NewA8ClientService`, `A8MagicLink`, `NewA8MagicLink`.
- Added platform DB singleton client `platformDb` and exported `PlatformDb` type.
- Platform DB client merges `platformSchema` + `reviewFunnelSchema` so shared queries can include `rf_*` tables.
- Added `platformEnvSchema` + `platformConfig` with build placeholders for required platform secrets/URLs during Next production build phase.
- Added fallback SQL migration for all `a8_*` tables and indexes.
- Updated Drizzle table filter to include both `rf_*` and `a8_*`.

#### Gotchas for next batch
- `drizzle.config.ts` still points `schema` to `./src/lib/review-funnel/db/schema.ts`; only `tablesFilter` was updated per task. If Drizzle push for `a8_*` is needed, use the SQL fallback file or expand schema input in a follow-up.
- `a8_client_services.rf_tenant_id` is intentionally stored as UUID without FK constraint to keep migration simple and avoid cross-module coupling in schema declarations.
