# ralph-context.md

## Batch Notes (keep last 3)

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

---

### 2026-03-06 - Batch 8: consent logging + health endpoint + env docs

#### Files modified
- `src/lib/review-funnel/db/schema.ts`
- `src/lib/review-funnel/services/sms.ts`
- `src/app/api/review-funnel/webhooks/twilio/inbound/route.ts`
- `src/app/api/review-funnel/health/route.ts` (new)
- `.env.example`
- `docs/migrations/2026-03-06-rf-consent-log.sql` (new)
- `docs/implementation-plan.md`
- `docs/CODER-CONTEXT.md`
- `docs/ralph-context.md`

#### Key exports / behavior
- Added new `rf_consent_log` table + indexes and exported it in `reviewFunnelSchema`.
- Added consent type/source aliases for expected values:
  - `consentType`: `sms_sent | opt_out | opt_in`
  - `source`: `calendar_event | manual | twilio_inbound | cron_process`
- `sendReviewRequest()` now writes a consent log after a successful SMS send and usage increment.
- Twilio inbound opt-out flow now writes a consent log entry after `handleOptOut(from)`.
- Added `GET /api/review-funnel/health` that reports DB connectivity and required env presence.

#### Gotchas for next batch
- Run `npx drizzle-kit push` (or apply SQL fallback) once `DATABASE_URL` is available to create `rf_consent_log` in DB.
