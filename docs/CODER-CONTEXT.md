# CODER-CONTEXT.md — autom8-everything

## 2026-03-05 — Review Funnel Batch 7: Dashboard + settings implementation

### Scope completed
- Implemented the authenticated Review Funnel dashboard shell and all requested dashboard/settings pages:
  - `src/app/review-funnel/dashboard/layout.tsx`
  - `src/app/review-funnel/dashboard/page.tsx`
  - `src/app/review-funnel/dashboard/DashboardOverview.tsx`
  - `src/app/review-funnel/dashboard/reviews/page.tsx`
  - `src/app/review-funnel/dashboard/reviews/ReviewsClient.tsx`
  - `src/app/review-funnel/dashboard/feedback/page.tsx`
  - `src/app/review-funnel/dashboard/feedback/FeedbackClient.tsx`
  - `src/app/review-funnel/dashboard/settings/page.tsx`
  - `src/app/review-funnel/dashboard/settings/SettingsClient.tsx`
- Added dashboard layout UI component with responsive sidebar nav + header + logout:
  - `src/components/review-funnel/DashboardLayout.tsx`
- Added shared dashboard components:
  - `src/components/review-funnel/StatsCard.tsx`
  - `src/components/review-funnel/ReviewTable.tsx`
  - `src/components/review-funnel/FeedbackList.tsx`
  - `src/components/review-funnel/CalendarStatus.tsx`
  - `src/components/review-funnel/SmsTemplateEditor.tsx`
  - `src/components/review-funnel/BrandingPreview.tsx`
- Added required dashboard/settings API routes:
  - `src/app/api/review-funnel/dashboard/stats/route.ts`
  - `src/app/api/review-funnel/dashboard/sms-usage/route.ts`
  - `src/app/api/review-funnel/dashboard/reviews/route.ts`
  - `src/app/api/review-funnel/dashboard/reviews/[id]/route.ts`
  - `src/app/api/review-funnel/dashboard/feedback/route.ts`
  - `src/app/api/review-funnel/settings/profile/route.ts`
  - `src/app/api/review-funnel/settings/sms/route.ts`
  - `src/app/api/review-funnel/settings/locations/route.ts`
  - `src/app/api/review-funnel/settings/locations/[id]/route.ts`
- Implemented dashboard auth redirect behavior in server layout using `rf_session` + `verifySession()`.
- Added a build unblocker during verification:
  - `src/app/review-funnel/login/LoginClient.tsx` and `src/app/review-funnel/login/page.tsx` now pass URL error keys from server `searchParams` prop instead of using `useSearchParams`, removing prerender suspense bailout.

### Files changed in this batch
- `src/app/review-funnel/dashboard/layout.tsx`
- `src/app/review-funnel/dashboard/page.tsx`
- `src/app/review-funnel/dashboard/DashboardOverview.tsx`
- `src/app/review-funnel/dashboard/reviews/page.tsx`
- `src/app/review-funnel/dashboard/reviews/ReviewsClient.tsx`
- `src/app/review-funnel/dashboard/feedback/page.tsx`
- `src/app/review-funnel/dashboard/feedback/FeedbackClient.tsx`
- `src/app/review-funnel/dashboard/settings/page.tsx`
- `src/app/review-funnel/dashboard/settings/SettingsClient.tsx`
- `src/components/review-funnel/DashboardLayout.tsx`
- `src/components/review-funnel/StatsCard.tsx`
- `src/components/review-funnel/ReviewTable.tsx`
- `src/components/review-funnel/FeedbackList.tsx`
- `src/components/review-funnel/CalendarStatus.tsx`
- `src/components/review-funnel/SmsTemplateEditor.tsx`
- `src/components/review-funnel/BrandingPreview.tsx`
- `src/app/api/review-funnel/dashboard/stats/route.ts`
- `src/app/api/review-funnel/dashboard/sms-usage/route.ts`
- `src/app/api/review-funnel/dashboard/reviews/route.ts`
- `src/app/api/review-funnel/dashboard/reviews/[id]/route.ts`
- `src/app/api/review-funnel/dashboard/feedback/route.ts`
- `src/app/api/review-funnel/settings/profile/route.ts`
- `src/app/api/review-funnel/settings/sms/route.ts`
- `src/app/api/review-funnel/settings/locations/route.ts`
- `src/app/api/review-funnel/settings/locations/[id]/route.ts`
- `src/app/review-funnel/login/LoginClient.tsx`
- `src/app/review-funnel/login/page.tsx`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅
- `npm run lint` ❌ (pre-existing lint error in `src/lib/review-funnel/services/auth.ts` uses `require()` import style)

## 2026-03-05 — Review Funnel Batch 8: Product page live rewrite + polish + deploy prep

### Scope completed
- Rewrote `src/app/services/review-funnel/page.tsx` from teaser/waitlist into a live product page with:
  - pricing tiers (Starter `$79/mo`, Growth `$129/mo`, Pro `Contact Us`)
  - reusable plan cards (`src/components/review-funnel/PlanCard.tsx`)
  - manual follow-up comparison section
  - 3-step flow (`Connect Calendar` → `Automatic SMS` → `Reviews Roll In`)
  - testimonials placeholder section
  - FAQ section
  - primary CTA to `/review-funnel/signup`
- Polish pass for consistency across related surfaces:
  - updated Review Funnel pricing card copy on homepage (`src/components/ServicesBento.tsx`)
  - updated Review Funnel pricing block on `/pricing` (`src/app/pricing/page.tsx`)
  - refreshed signup hero copy and kept existing 4-step checkout flow (`src/app/review-funnel/signup/SignupClient.tsx`)
- SEO/meta updates for new Review Funnel pages:
  - `src/app/review-funnel/signup/page.tsx` uses `buildMetadata`
  - `src/app/review-funnel/login/page.tsx` uses `buildMetadata` + `robots: noindex`
  - `src/app/review-funnel/signup/success/page.tsx` uses `buildMetadata` + `robots: noindex`
- Sitemap update:
  - added `/review-funnel/signup` to `src/app/sitemap.ts`
- Navigation/footer verification:
  - `Review Funnel` links were already present in `src/components/Navigation.tsx` and `src/components/Footer.tsx` (no additional edits required).
- Build blocker fix discovered during verification:
  - `src/app/review-funnel/dashboard/settings/SettingsClient.tsx` narrowed `payload.profile` before `setProfile` callback to satisfy TypeScript strictness.

### Files changed in this batch
- `src/app/services/review-funnel/page.tsx`
- `src/components/review-funnel/PlanCard.tsx`
- `src/components/ServicesBento.tsx`
- `src/app/pricing/page.tsx`
- `src/app/review-funnel/signup/SignupClient.tsx`
- `src/app/review-funnel/signup/page.tsx`
- `src/app/review-funnel/login/page.tsx`
- `src/app/review-funnel/signup/success/page.tsx`
- `src/app/sitemap.ts`
- `src/app/review-funnel/dashboard/settings/SettingsClient.tsx`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅
- Note: Neon warning persists during build (`fetchConnectionCache` deprecation; already always true).

## 2026-03-05 — Review Funnel Batch 6: magic link auth + signup flow

### Scope completed
- Added magic-link auth API routes:
  - `POST /api/review-funnel/auth/login` (`src/app/api/review-funnel/auth/login/route.ts`)
    - accepts `{ email }`
    - generates one-time magic link token
    - stores hashed token in `rf_magic_links`
    - sends login email via Gmail SMTP
    - returns `{ success: true, message: "Check your email" }`
  - `GET /api/review-funnel/auth/verify` (`src/app/api/review-funnel/auth/verify/route.ts`)
    - validates token and marks it as used
    - creates JWT cookie session (`rf_session`)
    - redirects to `/review-funnel/dashboard`
  - `POST /api/review-funnel/auth/logout` (`src/app/api/review-funnel/auth/logout/route.ts`)
    - clears session cookie
- Added magic-link mail delivery service:
  - `src/lib/review-funnel/services/magic-link-email.ts`
  - Uses Nodemailer + Gmail SMTP.
  - Reads credentials from env vars with fallback to `C:\Users\austen\.openclaw\credentials\gmail-autom8.txt`.
  - From: `aust@autom8everything.com`
  - Subject: `Your Review Funnel login link`
  - Link URL: `https://autom8everything.com/api/review-funnel/auth/verify?token=...`
- Updated auth/config behavior:
  - `src/lib/review-funnel/config.ts`
    - default `RF_MAGIC_LINK_TTL_MINUTES` now `15`
    - added optional `RF_GMAIL_CREDENTIALS_PATH`
- Added Review Funnel login UI:
  - `src/app/review-funnel/login/page.tsx`
  - `src/app/review-funnel/login/LoginClient.tsx`
  - Simple email form + `Send Login Link` CTA + success state message.
- Added Review Funnel signup wizard:
  - `src/app/review-funnel/signup/page.tsx`
  - `src/app/review-funnel/signup/SignupClient.tsx`
  - 4 steps:
    1) business info
    2) Google business lookup (Place ID)
    3) branding (primary color + promo offer)
    4) plan selection (Starter, Growth, Pro contact path)
  - Starter/Growth submit to Stripe Checkout redirect.
  - Pro path routes to contact CTA.
- Added signup success page:
  - `src/app/review-funnel/signup/success/page.tsx`
  - Includes `Connect Google Calendar` CTA.
- Added Google Places lookup API route for signup step 2:
  - `GET /api/review-funnel/google/places-search` (`src/app/api/review-funnel/google/places-search/route.ts`)
  - Uses Google Places API (Text Search) and returns place candidates.
- Extended Stripe checkout intake to preserve signup branding fields:
  - `src/app/api/review-funnel/checkout/route.ts` now accepts optional `primaryColor` and `promoOffer`.
  - `src/lib/review-funnel/services/stripe.ts` now stores those values via checkout metadata and persists into `rf_tenants` on webhook completion.

### Files changed
- `src/app/api/review-funnel/auth/login/route.ts` (new)
- `src/app/api/review-funnel/auth/verify/route.ts` (new)
- `src/app/api/review-funnel/auth/logout/route.ts` (new)
- `src/lib/review-funnel/services/magic-link-email.ts` (new)
- `src/lib/review-funnel/config.ts`
- `src/app/review-funnel/login/page.tsx` (new)
- `src/app/review-funnel/login/LoginClient.tsx` (new)
- `src/app/review-funnel/signup/page.tsx`
- `src/app/review-funnel/signup/SignupClient.tsx`
- `src/app/review-funnel/signup/success/page.tsx` (new)
- `src/app/api/review-funnel/google/places-search/route.ts` (new)
- `src/app/api/review-funnel/checkout/route.ts`
- `src/lib/review-funnel/services/stripe.ts`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm install` ✅
- `npm run build` ✅
- Build warning observed (pre-existing): Neon `fetchConnectionCache` deprecation notice.

## 2026-03-05 — Review Funnel Batch 5: customer funnel page + public funnel APIs

### Scope completed
- Implemented public funnel API routes:
  - `GET /api/review-funnel/funnel/[requestId]` (`src/app/api/review-funnel/funnel/[requestId]/route.ts`)
    - Returns tenant branding and review request payload for the customer-facing page.
    - Tracks first page open by setting `rf_review_requests.page_opened_at` when null.
    - Includes color sanitization fallback and location review URL override (`rf_locations.gmb_review_url` when present).
  - `POST /api/review-funnel/funnel/rate` (`src/app/api/review-funnel/funnel/rate/route.ts`)
    - Validates `requestId`, `rating` (1–5), optional `googleReviewClicked`.
    - Persists `rating`, `rated_at` (first-set), ensures `page_opened_at`, and tracks `google_review_clicked`.
  - `POST /api/review-funnel/funnel/feedback` (`src/app/api/review-funnel/funnel/feedback/route.ts`)
    - Validates `requestId` + feedback text.
    - Enforces 1–4★ flow only (`rating` required and must not be 5).
    - Persists `feedback_text` + `promo_shown` and returns promo details.
- Added customer-facing funnel pages:
  - `src/app/r/[requestId]/page.tsx`
    - Dynamic server shell + metadata/OG tags including business name when available.
    - Marked dynamic and noindex for the public request-specific page.
  - `src/app/r/[requestId]/FunnelClient.tsx`
    - Client-side fetch of funnel payload on mount.
    - Mobile-first standalone branded UI (no site nav/footer).
    - Implements full flow:
      - star selection (1–5)
      - 5★ prompt -> Google review CTA -> thank-you
      - 1–4★ promo + feedback form -> submit -> thank-you with promo details
    - Tracks required events via API calls: `page_opened_at`, `rating`, `rated_at`, `google_review_clicked`, `feedback_text`.
  - `src/app/r/[requestId]/thanks/page.tsx` static fallback thank-you page.
- Added reusable star selector:
  - `src/components/review-funnel/StarRating.tsx`
  - 5 interactive stars with large tap targets, hover/selection animation, keyboard support, and ARIA radio semantics.

### Build unblockers completed during this batch
- `npm run build` initially failed on pre-existing Review Funnel auth/signup files present in workspace but not fully wired.
- Added missing/supporting pieces required for successful build:
  - `src/app/review-funnel/signup/SignupClient.tsx` (placeholder client component for existing signup page import)
  - Updated `src/app/review-funnel/login/page.tsx` to wrap client usage in `Suspense` (required for `useSearchParams` CSR bailout)
  - Installed email dependency/types required by existing magic-link mailer files:
    - `nodemailer` (dependency)
    - `@types/nodemailer` (dev dependency)
  - Updated lockfile accordingly (`package-lock.json`).

### Files changed
- `src/app/api/review-funnel/funnel/[requestId]/route.ts` (new)
- `src/app/api/review-funnel/funnel/rate/route.ts` (new)
- `src/app/api/review-funnel/funnel/feedback/route.ts` (new)
- `src/app/r/[requestId]/page.tsx` (new)
- `src/app/r/[requestId]/FunnelClient.tsx` (new)
- `src/app/r/[requestId]/thanks/page.tsx` (new)
- `src/components/review-funnel/StarRating.tsx` (new)
- `src/app/review-funnel/login/page.tsx`
- `src/app/review-funnel/signup/SignupClient.tsx` (new)
- `package.json`
- `package-lock.json`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅
- Build warning observed (pre-existing): Neon `fetchConnectionCache` deprecation notice.

## 2026-03-04 — Review Funnel Batch 4: Stripe integration + checkout + billing routes

### Scope completed
- Added Stripe service at `src/lib/review-funnel/services/stripe.ts` with the core primitives:
  - `createCheckoutSession(params)` for Stripe subscription checkout
  - `constructStripeWebhookEvent(payload, signature)` for signature verification
  - `handleWebhookEvent(event)` for Review Funnel Stripe lifecycle events
  - `createBillingPortalSession(tenantId)` for Stripe Billing Portal redirect URLs
- Implemented Review Funnel plan mapping and limits in Stripe service:
  - Starter: $79/mo, 150 SMS
  - Growth: $129/mo, 500 SMS
  - Pro: $199/mo, unlimited SMS (stored as sentinel `999999`)
- Added checkout endpoint `POST /api/review-funnel/checkout`:
  - Validates payload fields: `email`, `businessName`, `ownerName`, `ownerPhone`, `plan`, `googlePlaceId`
  - Creates/reuses Stripe customer
  - Creates Stripe Checkout Session in subscription mode
  - Uses success URL `/review-funnel/signup/success?session_id={CHECKOUT_SESSION_ID}`
  - Uses cancel URL `/review-funnel/signup`
- Added Stripe webhook endpoint `POST /api/review-funnel/webhooks/stripe`:
  - Verifies signature with `stripe.webhooks.constructEvent()`
  - Handles `checkout.session.completed` by creating/updating `rf_tenants` with Stripe IDs, plan, and SMS limits
  - Handles `customer.subscription.updated` by syncing plan + SMS limit
  - Handles `customer.subscription.deleted` by deactivating tenant (`is_active = false`)
  - Handles `invoice.payment_failed` by flagging tenant via deactivation (`is_active = false`) because schema currently has no dedicated billing-flag field
- Added billing settings routes:
  - `GET /api/review-funnel/settings/billing` (authenticated) returns current plan/subscription ids/usage snapshot
  - `POST /api/review-funnel/settings/billing/portal` (authenticated) returns billing portal URL
- Extended Review Funnel config parsing in `src/lib/review-funnel/config.ts` to include `STRIPE_SECRET_KEY`.

### Files changed
- `src/lib/review-funnel/services/stripe.ts` (new)
- `src/app/api/review-funnel/checkout/route.ts` (new)
- `src/app/api/review-funnel/webhooks/stripe/route.ts` (new)
- `src/app/api/review-funnel/settings/billing/route.ts` (new)
- `src/app/api/review-funnel/settings/billing/portal/route.ts` (new)
- `src/lib/review-funnel/config.ts`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅
- Build warning seen from Neon driver: `fetchConnectionCache` deprecation (already true by default).

## 2026-03-04 — Review Funnel Batch 3: SMS service + Twilio webhooks + cron processing

### Scope completed
- Added `src/lib/review-funnel/services/sms.ts` with required SMS primitives:
  - `sendReviewRequest(reviewRequestId)` sends Twilio SMS with funnel URL interpolation.
  - `interpolateTemplate(template, vars)` supports `{customer_name}`, `{business_name}`, `{funnel_url}`.
  - `checkOptOut(phone)` checks `rf_sms_opt_outs`.
  - `checkMonthlyLimit(tenantId)` compares current usage in `rf_sms_usage` against tenant limits.
  - `incrementUsage(tenantId)` upserts monthly usage counters.
  - `handleOptOut(phone)` inserts/ignores in `rf_sms_opt_outs`.
  - Quiet-hours helper (`RF_QUIET_HOURS_START` / `RF_QUIET_HOURS_END`) returns next allowed send time.
- Added cron route `GET /api/review-funnel/cron/process-sms`:
  - Atomically claims up to 10 due queued rows from `rf_pending_sms` and sets them to `processing`.
  - Sends through `sendReviewRequest`, handles terminal states, quiet-hours deferral, and retries.
  - Retry policy implemented with up to 3 attempts and 3-minute backoff multiplier.
- Added Twilio webhook routes:
  - `POST /api/review-funnel/webhooks/twilio/status` maps Twilio delivery states to `rf_review_requests.sms_status`.
  - `POST /api/review-funnel/webhooks/twilio/inbound` handles STOP/UNSUBSCRIBE opt-outs and responds with TwiML.
- Added `vercel.json` cron schedule entries for:
  - `/api/review-funnel/cron/process-sms` every minute.
  - `/api/review-funnel/cron/renew-watches` every 4 hours.
- Build unblock/fixes while integrating Review Funnel server routes:
  - `src/lib/review-funnel/config.ts` now injects safe placeholder values only during Next production build phase when required RF env vars are absent.
  - `src/lib/review-funnel/services/calendar.ts` type fixes (`OAuth2` instance typing + nullable token row return).

### Files changed
- `src/lib/review-funnel/services/sms.ts` (new)
- `src/app/api/review-funnel/cron/process-sms/route.ts` (new)
- `src/app/api/review-funnel/webhooks/twilio/status/route.ts` (new)
- `src/app/api/review-funnel/webhooks/twilio/inbound/route.ts` (new)
- `src/lib/review-funnel/config.ts`
- `src/lib/review-funnel/services/calendar.ts`
- `vercel.json` (new)
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅
- Build warning seen from Neon driver: `fetchConnectionCache` deprecation (already true by default).

## 2026-03-03 — Full content overhaul (homepage, product pages, pricing, website tiers)

### Scope completed
- Rewrote homepage hero to outcome-first messaging with required phrase: **"without the tech headache"**.
- Updated homepage CTA stack to product-first flow:
  - Primary: `See What We Build` → `/pricing`
  - Secondary: `Call Us` → `/contact`
- Reworked product card grid to requested structure:
  - 1 featured large card: **Cadence** (`$199/mo`, `7-day free trial`, CTA → `/onboarding`)
  - 4 smaller cards: **Review Funnel**, **Website Creation**, **SEO & Content**, **Custom Apps**
  - Custom Apps card CTA set to `Book a Consultation`
- Improved trust/social section copy for clearer plain-language credibility messaging.
- Cleaned footer product links so it now includes all product pages + `/onboarding`.

### Product pages
- Verified and rewrote all required product pages with consistent structure:
  - Hero section
  - 3-step “How It Works”
  - Pricing section
  - Primary CTA section
  - FAQ section
- Updated/created routes:
  - `/services/cadence` (copy refreshed)
  - `/services/review-funnel` (pricing now “Coming Soon / Contact Us”)
  - `/services/websites` (**new canonical website page**)
  - `/services/seo-content` (monthly retainer + contact pricing)
  - `/services/custom-apps` (consultative pricing and CTA)
- Set legacy route `/services/website-creation` to redirect to `/services/websites`.

### Pricing page
- Rebuilt `/pricing` content to include all products with requested positioning:
  - Cadence: `$199/mo` + `7-day free trial`
  - Review Funnel: `Coming Soon` + contact CTA
  - Websites: Launch/Scale/Custom with explicit tiers
  - SEO & Content: monthly retainer + `Contact Us`
  - Custom Apps: consultative pricing + `Book a Consultation`
- Applied website tier pricing requirements:
  - **Launch** — `$1,500`
  - **Scale** — `$3,500`
  - **Custom** — `Let’s Talk`

### Files changed
- `src/components/Hero.tsx`
- `src/components/ServicesBento.tsx`
- `src/components/SocialProofBar.tsx`
- `src/components/Footer.tsx`
- `src/components/Navigation.tsx`
- `src/components/CTA.tsx`
- `src/app/services/cadence/page.tsx`
- `src/app/services/review-funnel/page.tsx`
- `src/app/services/websites/page.tsx` (new)
- `src/app/services/website-creation/page.tsx` (redirect)
- `src/app/services/seo-content/page.tsx`
- `src/app/services/custom-apps/page.tsx`
- `src/app/pricing/page.tsx`
- `src/app/sitemap.ts`
- `src/app/services/ServicesPageClient.tsx` (copy cleanup)
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅
- Note: pre-existing Next.js warning remains about inferred workspace root due to multiple lockfiles.


## 2026-03-03 — ServicesBento non-hero card uniformity pass (homepage product grid)

### Scope completed
- Kept Cadence as the featured hero card with no structural role changes.
- Consolidated all 4 non-hero cards to one shared internal skeleton and spacing rhythm:
  - eyebrow
  - icon
  - title
  - description
  - pricing line + context
  - micro-proof
  - bottom-anchored CTA row
- Removed tier-based layout divergence (`primary` vs `secondary`) from non-hero rendering so all four cards now share identical padding, typography sizing, min-height, and CTA placement behavior.
- Replaced non-button text-link CTA treatment on secondary cards with real pill buttons so all four non-hero cards use the same button shape, height, and spacing.
- Updated non-hero CTA intent/labels per requested direction:
  - Websites: `See Plans` → `/pricing` (unchanged)
  - SEO: `See Plans` → `/pricing` (unchanged)
  - Review: `See Plans` → `/pricing` (changed from Learn More)
  - Custom Apps: `Book Call` → `/contact` (changed from Tell Us What You Need)
- Preserved existing Autom8 premium visual language (palette, card surfaces, glow, hover motion, typography family).

### Files changed
- `src/components/ServicesBento.tsx`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run lint` ✅ (`EXIT:0`)
- `npm run build` ✅
- Note: pre-existing Next.js warning remains about inferred workspace root due to multiple lockfiles.

## 2026-03-03 — CTA architecture consolidation (homepage/nav/pricing/contact/product pages)

### Scope completed
- Implemented the website-architecture consolidation blueprint end-to-end while preserving the existing premium visual system.
- Enforced CTA taxonomy on core funnel pages:
  - Hero primary CTA is now `See Plans` → `/pricing`.
  - Hero secondary CTA added: `Start Free Trial` → `/cadence/get-started`.
  - Homepage bottom CTA label normalized: `Book a Call`.
  - Contact page label normalized: `Book a Call` (mailto destination kept intentionally).
- Standardized ServicesBento CTA behavior across all 5 product cards:
  - Cadence: `Start Free Trial` + `Learn More`.
  - Website: `See Plans` → `/pricing`.
  - SEO: `See Plans` → `/pricing`.
  - Review Funnel: `Learn More` → `/services/review-funnel`.
  - Custom Apps: `Tell Us What You Need` → `/contact`.
- Elevated `/pricing` into canonical plan-detail page with all 5 products and consistent CTA pattern:
  - Added rows for Cadence, Website, Review Funnel, SEO, and Custom Apps.
  - Added per-row inclusion bullets and consistent `Learn More` links to product detail pages.
  - Primary CTAs now standardized to `Start Free Trial` (Cadence) and `Book a Call` (consultative offers).
  - Replaced intake-footer wording with: "Not sure which plan fits? Tell us about your business..."
- Removed conflicting/retired labels from active code paths (`View Packages`, `View Website Packages`, `Book a Quick Call`, `Book a 15-Minute Call`, `Go to intake form`, `See What We Can Do`).
- Cleaned product-detail conversion flow to match page-role map:
  - Website/SEO/Review pages now route pricing-intent CTA to `/pricing` via `See Plans`.
  - Custom Apps product CTA normalized to `Book a Call`.
  - Website detail page no longer hosts full tier tables; now concise pricing anchor + canonical `/pricing` handoff.

### Files changed
- `src/components/Hero.tsx`
- `src/components/ServicesBento.tsx`
- `src/components/CTA.tsx`
- `src/components/PricingOverview.tsx`
- `src/app/pricing/page.tsx`
- `src/app/contact/ContactPageClient.tsx`
- `src/app/services/website-creation/page.tsx`
- `src/app/services/review-funnel/page.tsx`
- `src/app/services/seo-content/page.tsx`
- `src/app/services/custom-apps/page.tsx`
- `src/app/services/cadence/page.tsx`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run lint` ✅
- `npm run build` ✅
- Note: pre-existing Next.js warning remains about inferred workspace root due to multiple lockfiles.

## 2026-03-03 — Enterprise product cards implemented + homepage pricing redundancy removed

### Scope completed
- Rebuilt `src/components/ServicesBento.tsx` to match the enterprise product card blueprint:
  - Introduced explicit card tiers (`hero`, `primary`, `secondary`) and full per-card hierarchy (eyebrow → product name → value prop → pricing anchor + context → micro-proof → CTA).
  - Kept Cadence as dominant hero card with integrated pricing module, dual CTAs, premium gradient/glow treatment, and plain-language copy.
  - Applied Playfair to all product names, added pricing divider lines, micro-proof chips with check icon, and integrated pricing anchors on all five cards.
  - Preserved reduced-motion behavior (no transform lift/press when `useReducedMotion()` is true) while keeping color/opacity transitions.
  - Added accessibility improvements: each card rendered as `<article aria-label="...">`; each pricing anchor has explicit `aria-label` text for screen readers.
- Updated `src/app/HomePageClient.tsx`:
  - Removed homepage `<PricingOverview />` import/render ("Simple, Transparent Pricing" section no longer appears on homepage).
  - Confirmed no homepage `CadenceHighlight` render.
  - Adjusted section order to `ServicesBento -> WhoItsFor -> HowItWorks -> Testimonials -> FAQ -> CTA` per current blueprint direction.

### Files changed
- `src/components/ServicesBento.tsx`
- `src/app/HomePageClient.tsx`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run lint` ✅
- `npm run build` ✅
- Note: pre-existing Next.js warning remains about inferred workspace root due to multiple lockfiles.

## 2026-03-03 — SocialProofBar rating card made explicitly star-first

### Scope completed
- Updated only the trust/rating card (third card) in `src/components/SocialProofBar.tsx`.
- Shifted the visual hierarchy so five gold stars are the dominant element.
- Removed the larger text-forward treatment in favor of minimal supporting copy (`Client Rating`).
- Preserved subtle premium twinkle/glow motion and existing reduced-motion-safe behavior.

### Files changed
- `src/components/SocialProofBar.tsx`

### Verification
- `npm run build` ✅


## 2026-03-03 — Homepage reliability metric card converted to premium star-rating motif

### Scope completed
- Updated only the homepage social proof metric card area in `src/components/SocialProofBar.tsx`.
- Replaced the old numeric reliability metric treatment with a star-rating trust motif and subtle motion glow/twinkle.
- Preserved existing theme surface, typography, and spacing system (no broad redesign).

### Files changed
- `src/components/SocialProofBar.tsx`
- `src/app/globals.css`

### Key decisions
- Kept the first two stat cards unchanged and scoped the redesign to the third trust/reliability card only.
- Added five-star icon row with restrained shimmer/twinkle and amber radial glow for premium visual emphasis.
- Added reduced-motion-safe behavior by disabling Framer star motion when `useReducedMotion()` is true; CSS animations also respect existing global `prefers-reduced-motion` guard.
- Maintained contrast with white primary text and `#A1A1AA` secondary text on the existing dark card surface.

### Verification
- `npm run build` ✅

## 2026-03-03 — Homepage-only Huly-inspired refresh

### Scope completed
- Applied the homepage-only visual refresh in `src/app/HomePageClient.tsx` and homepage section components.
- Did **not** touch non-homepage routes.
- No new dependencies added.

### Files changed
- `src/lib/motion.ts` (new)
- `src/app/globals.css`
- `src/app/HomePageClient.tsx`
- `src/components/Navigation.tsx`
- `src/components/Hero.tsx`
- `src/components/SocialProofBar.tsx`
- `src/components/ServicesBento.tsx`
- `src/components/CadenceHighlight.tsx`
- `src/components/WhoItsFor.tsx`
- `src/components/Testimonials.tsx`
- `src/components/HowItWorks.tsx`
- `src/components/FAQ.tsx`
- `src/components/CTA.tsx`

### Key decisions
- Standardized homepage reveal/hover motion via `src/lib/motion.ts` presets.
- Added reduced-motion-safe paths by combining `useReducedMotion()` with opacity-first reveal fallback.
- Replaced Hero JS-animated orbs with static CSS glow blobs for lower runtime animation overhead.
- Added global focus-visible outline and skip-to-content link (`#main-content`) for keyboard accessibility.
- Unified section background treatment around `#0A0A0F` with localized glow zones.

### Verification
- `npm run build` ✅
- `npm run lint` ✅
- Build warning persists from pre-existing workspace lockfile root detection (`Next.js inferred workspace root`).

## 2026-03-03 — Cadence onboarding validation moved to input step

### Scope completed
- Updated `/cadence/get-started` to validate fields at the step where users enter them (instead of surfacing Step 3 format issues on final submit).
- Added inline, human-readable field error messages and accessible `aria-invalid` + `aria-describedby` wiring for each input/textarea.
- Kept backend validation untouched; added frontend mapping for backend error keys/messages to user-friendly text.

### Files changed
- `src/app/cadence/get-started/CadenceGetStartedClient.tsx`

### Key decisions
- Step-level validation now runs continuously from form state (`validateStep`) so Continue buttons are blocked until current-step requirements/formats are valid.
- Field-level validation runs on blur, then re-validates on subsequent changes for touched fields (immediate feedback, no late surprise).
- Step 3 optional fields (`transfer_number`, `booking_url`) are validated only when non-empty.
- Step 4 submit gate validates area code only and no longer introduces new Step 3 format surprises.
- Backend error strings like `Invalid owner_phone` are normalized/mapped to friendly copy before rendering.

### Verification
- `npm run build` ✅
- Manual path check (`/cadence/get-started`, local dev):
  - Step 1/2 Continue remains disabled until required fields are valid.
  - Step 3 with invalid `owner_phone`, `owner_email`, or `booking_url` shows inline readable messages and keeps Continue disabled.
  - Step 3 valid formats allows progression to Step 4.
  - Step 4 focused on area code requirement (`###`) and submit button state tied to that field.

## 2026-03-03 � Featured Cadence card copy + emphasis refinement

### Scope completed
- Updated only the featured Cadence card in the homepage product grid (`src/components/ServicesBento.tsx`).
- Added explicit visible product label: `Cadence`.
- Made pricing more prominent with exact text `Cadence � $199/mo` and subtext `after free trial`.
- Expanded description to plain-language explanation of call answering, booking, FAQs, and call summaries.
- Preserved CTA structure and labels: `Start Free Trial` (primary) and `Learn More` (secondary).

### Files changed
- `src/components/ServicesBento.tsx`

### Verification
- `npm run build` ?

## 2026-03-03 — Website pricing switched to explicit 3-tier structure

### Scope completed
- Replaced website custom/starting-price messaging with explicit tier pricing in all requested surfaces:
  - `/pricing`
  - `/services/website-creation`
  - homepage pricing overview snippet (`src/components/PricingOverview.tsx`)
- Locked tier names and prices implemented exactly:
  - Launch — $799
  - Scale — $1,499
  - Custom — $2,499+
- Added plain-language tier bullets covering:
  - Launch: quick launch essentials
  - Scale: conversion-focused + integrations
  - Custom: bespoke functionality/workflows
- Added migration note where website pricing is shown: existing site clone/migration is an upcharge and quoted after review.

### Files changed
- `src/app/pricing/page.tsx`
- `src/app/services/website-creation/page.tsx`
- `src/components/PricingOverview.tsx`
- `docs/CODER-CONTEXT.md`

### Key decisions
- Kept existing visual theme/layout patterns (same card styles, spacing system, and CTA patterns) and scoped edits only to website pricing/tier content.
- Updated website service page metadata description so SERP snippet aligns with new pricing tiers.

### Verification
- `npm run build` ✅
- Note: pre-existing Next.js warning remains about inferred workspace root due to multiple lockfiles.
