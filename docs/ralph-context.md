# Ralph Context — Autom8 CRO Passover

## B1-0 (2026-03-07): CSS animation fixes + transition specificity (feature/mobile-perf)
- Branch: `feature/mobile-perf`
- Goal: eliminate PageSpeed "non-composited animations" warnings

### globals.css changes
- `.section-glow` — added `will-change: transform` for GPU compositing on blur elements
- `@keyframes pulse-glow` — replaced `filter: drop-shadow()` with `opacity` animation (0.7 → 1 → 0.7)
- `@keyframes gradient-shift` — **removed** entirely (animated `background-position`, non-composited, unused)
- `.animate-gradient` — **removed** (no TSX usages found)
- `.animate-float` — **removed** (no TSX usages found)
- `.animate-pulse-glow` — **removed** (no TSX usages found)
- `@keyframes star-twinkle` — replaced `filter: drop-shadow()` with `opacity` animation (0.85 → 1 → 0.85)
- `.star-twinkle` — added `will-change: opacity`
- `@keyframes shimmer` — kept (used in `b-copy` route, not homepage critical path)
- `@keyframes float` — kept (composited; uses `transform: translateY`)

### SocialProofBar.tsx
- Removed `star-twinkle` className from star `<motion.span>` elements
  - framer-motion `animate` (opacity/scale) is already composited — no double animation needed

### Navigation.tsx
- `transition-all duration-300` on outer `<motion.header>` → `transition-[background-color,border-color,box-shadow] duration-300`
- `transition-all duration-300` on inner container div → `transition-[background-color,border-color,backdrop-filter] duration-300`
- Both underline `<span>` elements (Products button + navLinks map) → `transition-[width] duration-300`

### ServicesBento.tsx
- Hero card `transition-all duration-300` → `transition-[box-shadow,border-color] duration-300`
- Non-hero card `transition-all duration-300` → `transition-[box-shadow,border-color] duration-300`
- Icon container already used `transition-transform duration-300` — no change needed

### FAQ.tsx
- FAQ button `transition-all` → `transition-[border-color,box-shadow] duration-200`

### Hero.tsx
- No changes needed — glow divs use `.section-glow` class which now has `will-change: transform`

- Build: `npm run build` ✅
- Commit: `4b29250` on `feature/mobile-perf`
- Gotchas for next batch:
  - `animate-float`, `animate-pulse-glow`, `animate-gradient` classes are now gone from globals.css — do not reference them
  - `shimmer` keyframe and class still exists (used by `/b-copy` route)
  - `@keyframes float` still exists (may be used by inline styles)

## B7-0 (2026-03-07): portal polish (SEO + errors + consistency)
- SEO hardening completed/verified:
  - confirmed noindex metadata on:
    - `src/app/portal/checkout/page.tsx`
    - `src/app/portal/checkout/success/page.tsx`
    - `src/app/portal/review-funnel/page.tsx`
  - updated `public/robots.txt` with portal disallow rules
  - verified `src/app/sitemap.ts` excludes portal routes
- Added shared portal session/fetch utility: `src/lib/platform/portal-fetch.ts`
- Added shared portal loading skeletons: `src/components/portal/LoadingSkeleton.tsx`
- Updated portal clients to use `portalFetch` session handling
- Loading polish: `PortalPageSkeleton` in `PortalDashboardClient` + `PortalCadenceClient`
- Checkout polish: back link, mapped submit errors, aligned card styling
- Build: `npm run build` ✅

## B6-0 (2026-03-07): product page CTAs + Cadence CRM v2 callout
- Updated `src/app/services/cadence/page.tsx`: CRM Coming Soon section + portal checkout CTAs
- Updated `src/app/services/review-funnel/page.tsx`: Get Started CTAs → `/portal/checkout?product=review_funnel`
- Updated `src/app/pricing/page.tsx`: Cadence + Review Funnel CTAs → portal checkout
- Updated `src/components/ServicesBento.tsx`: Review Funnel CTA → portal checkout
- Updated `src/components/PricingOverview.tsx`: Cadence CTA → portal checkout
- Build: `npm run build` ✅
