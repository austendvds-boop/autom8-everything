# ralph-context.md

## Batch Notes (keep last 3)

### 2026-03-06 — Batch 7: logo upload + Yelp platform support

#### Files modified
- `src/app/api/review-funnel/settings/logo/route.ts` (new)
- `src/lib/review-funnel/db/schema.ts`
- `src/app/api/review-funnel/settings/profile/route.ts`
- `src/app/review-funnel/dashboard/settings/SettingsClient.tsx`
- `src/app/api/review-funnel/funnel/[requestId]/route.ts`
- `src/app/r/[requestId]/FunnelClient.tsx`
- `docs/migrations/2026-03-06-rf-yelp-platform.sql` (new)
- `docs/UI-VERIFICATION.md`
- `docs/implementation-plan.md`
- `docs/CODER-CONTEXT.md`
- `docs/ralph-context.md`

#### Key exports / behavior
- New authenticated logo upload endpoint:
  - `POST /api/review-funnel/settings/logo`
  - accepts `multipart/form-data` field `logo`
  - validates file type (`png/jpg/webp/svg`) and max size `2MB`
  - writes file to `public/uploads/review-funnel/logos/{tenantId}-{Date.now()}.{ext}`
  - updates `rf_tenants.logo_url`
  - returns `{ logoUrl }`
- `rf_tenants` schema now includes:
  - `yelp_review_url` (`text`, nullable)
  - `review_platform` (`varchar(20)`, not null, default `google`)
- Profile settings API now supports Yelp fields:
  - `GET /api/review-funnel/settings/profile` returns `reviewPlatform` + `yelpReviewUrl`
  - `PATCH` accepts/saves `reviewPlatform` (`google|yelp|both`) + `yelpReviewUrl`
- Settings UI profile tab now includes:
  - logo upload/preview flow with explicit save step
  - review platform selector (Google, Yelp, Both)
  - conditional Yelp review URL input
- Public funnel payload now returns tenant `reviewPlatform` + `yelpReviewUrl`.
- 5-star step CTA behavior:
  - `google` -> Google button only
  - `yelp` -> Yelp button only
  - `both` -> both buttons side by side

#### Gotchas for next batch
- `npx drizzle-kit push` failed in this environment due missing `DATABASE_URL`; use `docs/migrations/2026-03-06-rf-yelp-platform.sql` (or run push with DB env loaded) before expecting DB columns in runtime.
- Yelp/Google button click currently both mark `googleReviewClicked` internally (existing boolean field reused).

---

### 2026-03-06 — Batch 6: finalize process-sms cron + Twilio HELP handling

#### Files modified
- `src/app/api/review-funnel/cron/process-sms/route.ts`
- `docs/CODER-CONTEXT.md`
- `docs/ralph-context.md`

#### Key exports / behavior
- `GET /api/review-funnel/cron/process-sms` remains fully implemented and auth-protected by `CRON_SECRET` (`Authorization: Bearer` or `x-cron-secret`).
- Queue processing continues to:
  - select due `rf_pending_sms` rows where `status='queued'`, `send_after <= now`, `attempts < 3`, ordered by `send_after ASC`, limit 50
  - call `sendReviewRequest(reviewRequestId)` per row
  - persist outcomes (`sent`, `skipped`, `limit_reached`, `quiet_hours` reschedule, retry/fail-on-3)
  - return summary `{ processed, sent, skipped, failed, rescheduled }`
- Quiet-hours branch now explicitly sets `status: 'queued'` when rescheduling to keep state deterministic.
- Twilio inbound HELP handling (added in prior batch) is active before STOP/opt-out checks:
  - keywords: `help`, `info`
  - response: `For help with review requests, contact the business that texted you. To stop messages, reply STOP.`

#### Gotchas for next batch
- `limit_reached` rows are terminal in `rf_pending_sms` but not counted in the `skipped` metric; summary intentionally stays `{ processed, sent, skipped, failed, rescheduled }`.
- Retry counter increments on thrown exceptions only; terminal service statuses do not increment attempts.

---

### 2026-03-06 — Batch 5: process-sms cron + Twilio HELP keyword handling

#### Files modified
- `src/app/api/review-funnel/cron/process-sms/route.ts`
- `src/app/api/review-funnel/webhooks/twilio/inbound/route.ts`
- `docs/implementation-plan.md`
- `docs/CODER-CONTEXT.md`
- `docs/ralph-context.md`

#### Key exports / behavior
- `GET /api/review-funnel/cron/process-sms` now fully processes queued rows in `rf_pending_sms`.
- Twilio inbound webhook now handles HELP before STOP.

#### Gotchas for next batch
- `process-sms` updates pending rows only; `sendReviewRequest()` still owns `rf_review_requests` status updates (`sent`, `opted_out`, `limit_reached`, `no_phone`).
- `failed` counter in cron response increments only when retries reach terminal failure (attempts >= 3), not on intermediate retryable errors.
