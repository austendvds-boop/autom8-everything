# ralph-context.md

## Batch Notes (keep last 3)

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
