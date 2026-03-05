# ralph-context.md

## Batch Notes (keep last 3)

### 2026-03-05 — Batch 5: Customer funnel page + public funnel APIs

#### Files created
- `src/app/api/review-funnel/funnel/[requestId]/route.ts`
- `src/app/api/review-funnel/funnel/rate/route.ts`
- `src/app/api/review-funnel/funnel/feedback/route.ts`
- `src/app/r/[requestId]/page.tsx`
- `src/app/r/[requestId]/FunnelClient.tsx`
- `src/app/r/[requestId]/thanks/page.tsx`
- `src/components/review-funnel/StarRating.tsx`
- `src/app/review-funnel/signup/SignupClient.tsx`

#### Files modified
- `src/app/review-funnel/login/page.tsx`
  - wrapped `LoginClient` in `<Suspense>` to satisfy `useSearchParams` CSR requirement during build
- `package.json`
  - added `nodemailer`
  - added dev dependency `@types/nodemailer`
- `package-lock.json`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

#### Behavior implemented
- Public funnel data route (`GET /api/review-funnel/funnel/[requestId]`):
  - joins request + tenant branding (and location review URL when available)
  - returns business name, logo, colors, promo offer/code, request state
  - tracks `page_opened_at` on first page load
- Rating route (`POST /api/review-funnel/funnel/rate`):
  - validates `requestId`, `rating` (1–5), optional `googleReviewClicked`
  - writes `rating`, `rated_at`, and `google_review_clicked`
- Feedback route (`POST /api/review-funnel/funnel/feedback`):
  - validates payload and enforces feedback for 1–4★ only
  - writes `feedback_text` and `promo_shown`
- Customer funnel page (`/r/[requestId]`):
  - standalone branded experience (no site nav/footer)
  - star selection UX with large mobile tap targets
  - 5★ flow: Google review CTA -> thank-you
  - 1–4★ flow: promo + feedback form -> thank-you with promo details
  - tracks required funnel fields through API calls
- Static fallback thanks page at `/r/[requestId]/thanks`.
- Added reusable `StarRating` component with keyboard/ARIA support and animated interaction states.

#### Verification
- `npm run build` ✅

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
