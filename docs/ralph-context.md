# ralph-context.md

## Batch Notes (keep last 3)

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
- Added `GET /api/review-funnel/health` that reports:
  - DB connectivity (`SELECT 1`)
  - required env presence checks
  - status `200` when all healthy, else `503`
- Expanded `.env.example` with comprehensive Review Funnel env vars and comments.
- Migration attempt result:
  - `npx drizzle-kit push` failed due missing `DATABASE_URL` (`url: ''`).
  - Added manual SQL fallback migration at `docs/migrations/2026-03-06-rf-consent-log.sql`.

#### Gotchas for next batch
- Run `npx drizzle-kit push` (or apply SQL fallback) once `DATABASE_URL` is available to create `rf_consent_log` in DB.
- No DB-level check constraints were added for `consent_type`/`source`; allowed values are currently enforced in app typing/conventions.

---

### 2026-03-06 - Batch 7 retry 3: PowerShell build gate recovery

#### Files modified
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`
- `docs/implementation-plan.md`

#### Key exports / behavior
- Re-verified Batch 7 feature set remains implemented end-to-end:
  - logo upload API route and dashboard profile upload flow
  - `rf_tenants` Yelp fields (`yelp_review_url`, `review_platform`)
  - settings profile GET/PATCH support for Yelp fields + platform validation
  - funnel payload and five-star CTA behavior for Google/Yelp/Both
- Re-ran DB migration command with PowerShell-safe syntax:
  - `npx drizzle-kit push` still fails in this environment because `DATABASE_URL` is empty (`url: ''`).
  - SQL fallback migration remains available at `docs/migrations/2026-03-06-rf-yelp-platform.sql`.
- Re-ran full build with PowerShell-safe command chaining (`Set-Location ...; npm run build`) and build passes.

#### Gotchas for next batch
- On Windows PowerShell, use `;` (or separate statements) instead of `&&` when chaining commands.
- DB migration remains blocked until `DATABASE_URL` is available in the local environment.

---

### 2026-03-06 - Batch 7 retry 2: verification + commit gate recovery

#### Files modified
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`
- `docs/implementation-plan.md`

#### Key exports / behavior
- Verified Batch 7 implementation is present end-to-end:
  - logo upload API route and dashboard profile upload flow
  - `rf_tenants` Yelp fields (`yelp_review_url`, `review_platform`)
  - settings profile GET/PATCH support for Yelp fields + platform validation
  - funnel payload + five-star CTA behavior for Google/Yelp/Both
- Re-ran DB migration attempt:
  - `npx drizzle-kit push` failed in this environment because `DATABASE_URL` is empty.
  - SQL fallback migration remains at `docs/migrations/2026-03-06-rf-yelp-platform.sql`.
- Re-ran full build successfully.

#### Gotchas for next batch
- `npx drizzle-kit push` requires `DATABASE_URL`; set env before rerunning.
- Yelp and Google CTA clicks still share existing `googleReviewClicked` boolean tracking in `rf_review_requests`.
