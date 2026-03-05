# ralph-context.md

## Batch Notes (keep last 3)

### 2026-03-04 — Batch 3: SMS service + Twilio webhooks + cron

#### Files created
- `src/lib/review-funnel/services/sms.ts`
- `src/app/api/review-funnel/cron/process-sms/route.ts`
- `src/app/api/review-funnel/webhooks/twilio/status/route.ts`
- `src/app/api/review-funnel/webhooks/twilio/inbound/route.ts`
- `vercel.json`

#### Files modified
- `src/lib/review-funnel/config.ts`
  - added `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` env parsing
  - added build-phase placeholder fallbacks for `DATABASE_URL`, `RF_ENCRYPTION_KEY`, `RF_JWT_SECRET` so Next build can complete when Review Funnel env vars are not set locally
- `src/lib/review-funnel/services/calendar.ts`
  - fixed OAuth client typing (`InstanceType<typeof google.auth.OAuth2>`)
  - fixed nullable return from token lookup helper

#### SMS service exports
- `sendReviewRequest(reviewRequestId)`
- `interpolateTemplate(template, vars)`
- `checkOptOut(phone)`
- `checkMonthlyLimit(tenantId)`
- `incrementUsage(tenantId)`
- `handleOptOut(phone)`
- `getNextAllowedSendTime(date)`

#### Behavior implemented
- Twilio send with funnel URL interpolation and status callback wiring
- Quiet hours deferral using `RF_QUIET_HOURS_START`/`RF_QUIET_HOURS_END`
- Opt-out and monthly SMS limit enforcement before send
- Usage upsert/increment in `rf_sms_usage`
- Cron queue processing (`rf_pending_sms`) with:
  - atomic claim of up to 10 queued due rows
  - `processing` lock transition
  - retry up to 3 attempts with 3-minute backoff multiplier
  - terminal handling for opted-out / no-phone / limit-reached
- Twilio status webhook maps delivery states to `rf_review_requests.sms_status`
- Twilio inbound webhook handles STOP/UNSUBSCRIBE keywords and writes to `rf_sms_opt_outs`

#### Verification
- `npm run build` ✅

### 2026-03-04 — Batch 1: Review Funnel database schema + core library

#### Files created
- `drizzle.config.ts`
- `src/lib/review-funnel/db/schema.ts`
- `src/lib/review-funnel/db/client.ts`
- `src/lib/review-funnel/config.ts`
- `src/lib/review-funnel/services/crypto.ts`
- `src/lib/review-funnel/services/auth.ts`
- `src/lib/review-funnel/utils/phone.ts`
- `src/lib/review-funnel/middleware.ts`

#### Files modified
- `package.json` (added Review Funnel core dependencies + drizzle-kit)

#### Key exports
- `src/lib/review-funnel/db/schema.ts`
  - table exports: `rfTenants`, `rfLocations`, `rfGoogleOauthTokens`, `rfCalendarWatches`, `rfReviewRequests`, `rfPendingSms`, `rfSmsOptOuts`, `rfSmsUsage`, `rfMagicLinks`
  - schema aggregate: `reviewFunnelSchema`
  - typed row/insert exports: `RfTenant`, `NewRfTenant`, `RfLocation`, `NewRfLocation`, `RfGoogleOauthToken`, `NewRfGoogleOauthToken`, `RfCalendarWatch`, `NewRfCalendarWatch`, `RfReviewRequest`, `NewRfReviewRequest`, `RfPendingSms`, `NewRfPendingSms`, `RfSmsOptOut`, `NewRfSmsOptOut`, `RfSmsUsage`, `NewRfSmsUsage`, `RfMagicLink`, `NewRfMagicLink`
- `src/lib/review-funnel/db/client.ts`
  - `createReviewFunnelDb(...)`, `rfDb`, `ReviewFunnelDb`
- `src/lib/review-funnel/config.ts`
  - `reviewFunnelEnvSchema`, `reviewFunnelConfig`, `ReviewFunnelConfig`
- `src/lib/review-funnel/services/crypto.ts`
  - `encrypt(...)`, `decrypt(...)`
- `src/lib/review-funnel/services/auth.ts`
  - `hashMagicLinkToken(...)`, `generateMagicLink(...)`, `verifyMagicLink(...)`, `createSession(...)`, `verifySession(...)`, `VerifiedMagicLinkSession`
- `src/lib/review-funnel/utils/phone.ts`
  - `extractPhoneCandidates(...)`, `normalizePhone(...)`
- `src/lib/review-funnel/middleware.ts`
  - `RF_SESSION_COOKIE_NAME`, `unauthorizedReviewFunnelResponse(...)`, `getReviewFunnelSessionToken(...)`, `requireReviewFunnelDashboardAuth(...)`, `ReviewFunnelAuthSuccess`, `ReviewFunnelAuthFailure`, `ReviewFunnelAuthResult`

#### DB table names
- `rf_tenants`
- `rf_locations`
- `rf_google_oauth_tokens`
- `rf_calendar_watches`
- `rf_review_requests`
- `rf_pending_sms`
- `rf_sms_opt_outs`
- `rf_sms_usage`
- `rf_magic_links`
