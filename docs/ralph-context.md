# ralph-context.md

## Batch Notes (keep last 3)

### 2026-03-04 — Batch 4: Stripe integration + checkout + billing routes

#### Files created
- `src/lib/review-funnel/services/stripe.ts`
- `src/app/api/review-funnel/checkout/route.ts`
- `src/app/api/review-funnel/webhooks/stripe/route.ts`
- `src/app/api/review-funnel/settings/billing/route.ts`
- `src/app/api/review-funnel/settings/billing/portal/route.ts`

#### Files modified
- `src/lib/review-funnel/config.ts`
  - added `STRIPE_SECRET_KEY` env parsing support
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

#### Stripe service exports
- `createCheckoutSession(params)`
- `constructStripeWebhookEvent(payload, signature)`
- `handleWebhookEvent(event)`
- `createBillingPortalSession(tenantId)`

#### Behavior implemented
- Plan config added for Starter/Growth/Pro:
  - Starter: `$79/mo`, `150 SMS`
  - Growth: `$129/mo`, `500 SMS`
  - Pro: `$199/mo`, `unlimited` (stored as sentinel `999999`)
- Checkout flow (`POST /api/review-funnel/checkout`):
  - validates payload (`email`, `businessName`, `ownerName`, `ownerPhone`, `plan`, `googlePlaceId`)
  - creates/reuses Stripe customer
  - creates Stripe Checkout session in `subscription` mode
  - uses success URL `/review-funnel/signup/success?session_id={CHECKOUT_SESSION_ID}`
  - uses cancel URL `/review-funnel/signup`
- Stripe webhook flow (`POST /api/review-funnel/webhooks/stripe`):
  - verifies signature via `stripe.webhooks.constructEvent(...)`
  - `checkout.session.completed`: creates/updates `rf_tenants` with Stripe IDs, plan, and SMS limits
  - `customer.subscription.updated`: updates plan + SMS limit + active state
  - `customer.subscription.deleted`: deactivates tenant (`is_active = false`)
  - `invoice.payment_failed`: flags tenant by deactivating account (`is_active = false`) due current schema lacking a dedicated billing-flag column
- Billing settings routes:
  - `GET /api/review-funnel/settings/billing` (authenticated): returns plan, Stripe IDs, active status, monthly SMS limit, and current month usage
  - `POST /api/review-funnel/settings/billing/portal` (authenticated): returns Stripe Billing Portal URL

#### Verification
- `npm run build` ✅

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

### 2026-03-04 — Batch 2: Google Calendar OAuth + webhook/watch renewal

#### Files created
- `src/lib/review-funnel/services/calendar.ts`
- `src/app/api/review-funnel/google/auth-url/route.ts`
- `src/app/api/review-funnel/google/callback/route.ts`
- `src/app/api/review-funnel/google/disconnect/route.ts`
- `src/app/api/review-funnel/webhooks/google-calendar/route.ts`
- `src/app/api/review-funnel/cron/renew-watches/route.ts`

#### Files modified
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

#### Calendar service exports
- `generateAuthUrl(tenantId)`
- `parseGoogleOAuthState(state)`
- `handleCallback(code, tenantId)`
- `createWatch(tenantId, calendarId)`
- `renewWatch(watchId)`
- `disconnectCalendar(tenantId)`
- `processWebhookNotification(channelId, resourceId)`

#### Behavior implemented
- Google OAuth URL generation with `calendar.readonly` scope and signed state payload.
- OAuth callback token exchange with encrypted token persistence in `rf_google_oauth_tokens`.
- Google Calendar watch registration to `/api/review-funnel/webhooks/google-calendar`.
- Watch renewal flow for expiring channels (new watch + best-effort stop/deactivate old watch).
- Calendar disconnect flow (best-effort Google stop, DB watch deactivation, token deletion).
- Webhook incremental sync handling with sync-token fallback/reset on 410.
- Completed appointment extraction window (past 24h), phone extraction from description/attendees/extended properties, and queued inserts into:
  - `rf_review_requests`
  - `rf_pending_sms`

#### Verification
- `npm run build` ✅
