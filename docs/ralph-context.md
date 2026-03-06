# ralph-context.md

## Batch Notes (keep last 3)

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
- `GET /api/review-funnel/cron/process-sms` now fully processes queued rows in `rf_pending_sms`:
  - auth checks `CRON_SECRET` from either `Authorization: Bearer <secret>` or `x-cron-secret`
  - selects due queued rows (`status=queued`, `send_after <= now`, `attempts < 3`) ordered by `send_after ASC`, limit 50
  - calls `sendReviewRequest(reviewRequestId)` for each row
  - updates pending row status/fields based on result:
    - `sent` -> `status: sent`
    - `quiet_hours` -> update `send_after`, keep queued
    - `opted_out`/`no_phone` -> `status: skipped`
    - `limit_reached` -> `status: limit_reached`
  - on exception: increments `attempts`, stores `last_error`, and marks `status: failed` when attempts reaches 3
  - returns summary JSON `{ processed, sent, skipped, failed, rescheduled }`
- Twilio inbound webhook now handles HELP before STOP:
  - `HELP_KEYWORDS = new Set(['help', 'info'])`
  - `isHelpMessage()` helper mirrors opt-out parsing pattern (first word, case-insensitive)
  - HELP response TwiML:
    - `For help with review requests, contact the business that texted you. To stop messages, reply STOP.`

#### Gotchas for next batch
- `process-sms` updates pending rows only; `sendReviewRequest()` still owns `rf_review_requests` status updates (`sent`, `opted_out`, `limit_reached`, `no_phone`).
- `failed` counter in cron response increments only when retries reach terminal failure (attempts >= 3), not on intermediate retryable errors.

---

### 2026-03-05 — Batch 4 retry 2: deploy gate recovery

#### Scope completed
- Verified latest production deployment for Vercel project `prj_VDUyHtQs8yg3QUy1BEvVyEyY96aj` was still on older commit `f1b8e324...`.
- Re-ran `npm run build` (pass) before triggering retry deploy.
- Pushed a minimal docs-only commit to `master` to trigger a fresh production deployment.
- Verified newest production deployment reached `READY` and now points at the latest retry commit.
