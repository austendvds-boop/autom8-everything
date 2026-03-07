# Ralph Context — Autom8 CRO Passover

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

## B8 (2026-03-07): Custom Apps + Footer + Sticky Mobile CTA + polish
- Added `src/components/StickyMobileCTA.tsx` and wired it into homepage + service pages.
- Reworked `src/app/services/custom-apps/page.tsx` with ROI/pricing structure updates.
- Updated `src/components/Footer.tsx` with prominent phone and a `Start Here` column.
- Build: `npm run build` ✅
- Gotchas for next batch:
  - Keep sticky CTA rendered after `Footer` inside `<main>` on new marketing pages.
  - Keep `pb-20 md:pb-0` on pages that include `StickyMobileCTA`.
