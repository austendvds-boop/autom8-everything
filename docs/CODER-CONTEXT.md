# CODER-CONTEXT.md — autom8-everything

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
