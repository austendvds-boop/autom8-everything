# Ralph Context — Autom8 CRO Passover

## B2 retry (2026-03-07): commit-gate recovery + verification pass
- Re-verified Cadence portal API wiring and onboarding provisioning changes for this batch:
  - `getCadenceTenantConfig()` -> `GET /api/portal/tenant/:tenantId` and returns `tenant`
  - `updateCadenceTenantConfig()` -> `PATCH /api/portal/tenant/:tenantId` and returns `tenant`
  - `getCadenceRecentCalls()` -> `GET /api/portal/tenant/:tenantId/calls`
  - Added/confirmed `getCadenceUsage()` and `triggerCadenceTestCall()` exports
  - Added/confirmed `provisionCadenceTenant()` calling `POST /api/onboard` with `X-Portal-Secret`
- Files modified in this retry batch:
  - `docs/ralph-context.md`
  - `docs/CODER-CONTEXT.md`
- Build: `npm run build` ✅
- Gotchas for next batch:
  - Portal endpoint response wrappers differ (`{ tenant }`, `{ ok, tenant }`) — do not assume legacy shapes.
  - `provisionCadenceTenant()` keeps `areaCode` in signature for caller parity; payload currently does not use it.

## B2 (2026-03-07): Cadence portal API endpoint fix + provisioning hook
- Updated `src/lib/platform/services/cadence-api.ts` to use Cadence portal endpoints authenticated by `X-Portal-Secret` instead of dashboard cookie endpoints:
  - `getCadenceTenantConfig(tenantId)` now calls `GET /api/portal/tenant/:tenantId` and returns `payload.tenant`
  - `updateCadenceTenantConfig(tenantId, updates)` now calls `PATCH /api/portal/tenant/:tenantId` and returns `payload.tenant`
  - `getCadenceRecentCalls(tenantId, limit, offset)` now calls `GET /api/portal/tenant/:tenantId/calls?limit=&offset=`
- Extended `CadenceTenantConfig` with `systemPrompt: string | null`.
- Added new Cadence API exports:
  - `getCadenceUsage(tenantId)`
  - `triggerCadenceTestCall(tenantId, toPhone)`
  - interfaces `CadenceUsageResponse` and `TestCallResponse`
- Added `provisionCadenceTenant()` to `src/lib/platform/services/provisioning.ts`:
  - Calls `POST ${CADENCE_API_URL}/api/onboard`
  - Sends `X-Portal-Secret` and onboarding payload
  - Returns `{ clientId, phoneNumber }` from `result`
- Files modified in this batch:
  - `src/lib/platform/services/cadence-api.ts`
  - `src/lib/platform/services/provisioning.ts`
  - `docs/ralph-context.md`
  - `docs/CODER-CONTEXT.md`
- Build: `npm run build` ✅
- Gotchas for next batch:
  - Portal endpoint response wrappers differ (`{ tenant }`, `{ ok, tenant }`) — do not assume legacy `{ settings }` shape.
  - `provisionCadenceTenant()` includes `areaCode` in the function signature for caller parity, but `/api/onboard` payload in this scope does not consume it.

## B1 (2026-03-07): Production hardening — meta noindex + robots + sitemap cleanup
- Added page-level `metadata` exports with `robots: { index: false, follow: false }` to all portal entry routes.
- Added noindex metadata to Review Funnel dashboard pages.
- Replaced `public/robots.txt` with hardened private-route disallow list.
- Deleted stale static `public/sitemap.xml` so dynamic sitemap route is used.
- Build: `npm run build` ✅
- Gotchas for next batch:
  - Keep noindex metadata on private dashboard/portal pages by default.
  - Do not re-add `public/sitemap.xml`; it shadows dynamic `src/app/sitemap.ts`.
