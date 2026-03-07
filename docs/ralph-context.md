# Ralph Context — Autom8 CRO Passover

## B3-0 (2026-03-07): portal Stripe checkout + auto-provisioning webhook
- Implemented new platform Stripe service at `src/lib/platform/services/stripe-portal.ts`.
  - Key exports:
    - `createPortalCheckoutSession(params)`
    - `handlePortalWebhookEvent(event)`
  - Checkout metadata now carries `portal`, `product`, `businessName`, `email`, `phone`, `areaCode`, `plan`.
- Added public pre-purchase checkout API route:
  - `src/app/api/portal/checkout/route.ts`
  - `POST` validates payload and returns `{ url }`
  - CORS headers set for site origin + `OPTIONS` preflight
  - `dynamic = "force-dynamic"`
- Added Stripe webhook route for portal provisioning:
  - `src/app/api/portal/webhooks/stripe/route.ts`
  - raw body via `request.text()` + signature verification using `PORTAL_STRIPE_WEBHOOK_SECRET`
  - forwards events to `handlePortalWebhookEvent(event)`
  - logs errors and always returns `200 { received: true }`
- Added portal checkout UI:
  - `src/app/portal/checkout/page.tsx`
  - `src/app/portal/checkout/CheckoutClient.tsx`
  - `src/app/portal/checkout/success/page.tsx`
  - `src/app/portal/checkout/success/SuccessClient.tsx`
- Updated platform env config/docs:
  - `src/lib/platform/config.ts` now parses optional `PORTAL_STRIPE_WEBHOOK_SECRET` and `PORTAL_STRIPE_PRICE_CADENCE_STARTER`
  - `.env.example`, `docs/ENV-VARS.md`, `docs/UI-VERIFICATION.md`, `docs/CODER-CONTEXT.md`, `docs/implementation-plan.md`
- Build: `npm run build` ✅
- Gotchas for next batch:
  - Portal webhook intentionally returns 200 even on handled failures; rely on logs for triage.
  - Review Funnel linking from portal checkout can be deferred if RF tenant is not yet created by RF webhook.
  - Stripe SDK in this repo expects API version `2025-02-24.acacia` (older literals fail TypeScript).

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
