# ralph-context.md

## Batch Notes (keep last 3)

### 2026-03-05 — Batch 8: Review Funnel product page live + polish pass

#### Scope completed
- Replaced `/services/review-funnel` teaser/waitlist content with a full live product page.
- Added/confirmed required sections:
  - live pricing (Starter `$79/mo`, Growth `$129/mo`, Pro `Contact Us`)
  - reusable `PlanCard` component
  - comparison section vs manual follow-up
  - 3-step flow (`Connect Calendar` → `Automatic SMS` → `Reviews Roll In`)
  - testimonials placeholder block
  - FAQ block
  - primary CTA to `/review-funnel/signup`
- Aligned Review Funnel pricing/messaging across homepage + `/pricing`.
- Updated signup/login/success metadata and sitemap inclusion for `/review-funnel/signup`.

#### Files added
- `src/components/review-funnel/PlanCard.tsx`

#### Files modified
- `src/app/services/review-funnel/page.tsx`
- `src/components/ServicesBento.tsx`
- `src/app/pricing/page.tsx`
- `src/app/sitemap.ts`
- `src/app/review-funnel/signup/page.tsx`
- `src/app/review-funnel/login/page.tsx`
- `src/app/review-funnel/signup/success/page.tsx`
- `src/app/review-funnel/signup/SignupClient.tsx`
- `src/app/review-funnel/dashboard/settings/SettingsClient.tsx` (type-safety fix)

#### Verification
- `npm run build` ✅

### 2026-03-05 — Batch 7: Dashboard + settings shell, pages, and APIs

#### Scope completed
- Added authenticated dashboard app shell under `/review-funnel/dashboard`:
  - `src/app/review-funnel/dashboard/layout.tsx` now verifies `rf_session` and redirects to `/review-funnel/login` if missing/invalid.
  - `src/components/review-funnel/DashboardLayout.tsx` provides responsive sidebar nav (Overview, Reviews, Feedback, Settings), header with business name, mobile collapse, and logout.
- Added overview page + client:
  - `src/app/review-funnel/dashboard/page.tsx`
  - `src/app/review-funnel/dashboard/DashboardOverview.tsx`
  - Includes stats cards, SMS usage bar, calendar status widget, recent reviews list.
- Added reviews page + client:
  - `src/app/review-funnel/dashboard/reviews/page.tsx`
  - `src/app/review-funnel/dashboard/reviews/ReviewsClient.tsx`
  - Includes pagination, date/rating/status filters, and detail drawer panel.
- Added feedback page + client:
  - `src/app/review-funnel/dashboard/feedback/page.tsx`
  - `src/app/review-funnel/dashboard/feedback/FeedbackClient.tsx`
- Added settings page + client:
  - `src/app/review-funnel/dashboard/settings/page.tsx`
  - `src/app/review-funnel/dashboard/settings/SettingsClient.tsx`
  - Tabs: Profile, SMS, Calendar, Billing.
  - Profile: business/promo/colors + branding preview.
  - SMS: template editor + variable preview + delay.
  - Calendar: connect/disconnect actions.
  - Billing: plan/usage summary + Stripe portal CTA.
- Added shared dashboard components:
  - `src/components/review-funnel/StatsCard.tsx`
  - `src/components/review-funnel/ReviewTable.tsx`
  - `src/components/review-funnel/FeedbackList.tsx`
  - `src/components/review-funnel/CalendarStatus.tsx`
  - `src/components/review-funnel/SmsTemplateEditor.tsx`
  - `src/components/review-funnel/BrandingPreview.tsx`
- Added dashboard/settings API routes:
  - `GET /api/review-funnel/dashboard/stats`
  - `GET /api/review-funnel/dashboard/sms-usage`
  - `GET /api/review-funnel/dashboard/reviews`
  - `GET /api/review-funnel/dashboard/reviews/[id]`
  - `GET /api/review-funnel/dashboard/feedback`
  - `GET/PATCH /api/review-funnel/settings/profile`
  - `GET/PATCH /api/review-funnel/settings/sms`
  - `GET/POST /api/review-funnel/settings/locations`
  - `PATCH/DELETE /api/review-funnel/settings/locations/[id]`
- Build reliability fix applied while verifying this batch:
  - `src/app/review-funnel/login/LoginClient.tsx` + `src/app/review-funnel/login/page.tsx` now avoid `useSearchParams` prerender bailout by passing `searchParams` from server page to client props.

#### Verification
- `npm run build` ✅
- `npm run lint` ❌ (pre-existing lint error in `src/lib/review-funnel/services/auth.ts` uses `require()` for `jsonwebtoken`)

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
- Checkout flow (`POST /api/review-funnel/checkout`) validates payload, creates/reuses customer, creates subscription checkout session.
- Stripe webhook flow handles `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, and `invoice.payment_failed`.
- Billing routes expose plan snapshot and Stripe portal URL for authenticated tenants.

#### Verification
- `npm run build` ✅
