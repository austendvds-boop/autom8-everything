# CODER-CONTEXT.md

## 2026-03-03 — Hero copy/CTA focused update

### Completed
- Updated homepage hero copy in `src/components/Hero.tsx` only:
  - Headline: `Simple tools to help your business grow.`
  - Subhead: `We build and run the systems that bring in more calls, better leads, and more booked jobs — without the tech headache.`
- Kept a single hero CTA button: `See What We Can Do`.
- Removed the secondary hero CTA/button (`Try Cadence Free — AI Phone Answering`) while preserving the existing hero visual style, motion, and layout structure.

### Validation
- `npm run build` ✅

## 2026-02-21 — Branding + Metadata Pass

### Completed
- Added reusable brand component: `src/components/BrandLogo.tsx` (custom mark + wordmark treatment).
- Integrated logo treatment into key brand surfaces:
  - `src/components/Navigation.tsx`
  - `src/components/Hero.tsx`
  - `src/components/Footer.tsx`
- Reworked root metadata in `src/app/layout.tsx`:
  - title template + default title
  - improved description
  - canonical metadata
  - Open Graph metadata (siteName/url/image/title/description)
  - Twitter card metadata
  - explicit icons metadata
  - `metadataBase` sourced from `NEXT_PUBLIC_SITE_URL` fallback to `https://autom8-everything.vercel.app`
- Added generated brand icon assets:
  - `public/favicon.ico`
  - `public/favicon-16x16.png`
  - `public/favicon-32x32.png`
  - `public/favicon-512x512.png`
  - `public/apple-touch-icon.png`
  - `public/icon.svg`
  - Synced `src/app/favicon.ico`
- Added OG share image at `public/og/autom8-share.png` (1200x630).
- Fixed malformed root entry in `public/sitemap.xml` and aligned URLs to production domain.
- Updated architecture docs in `docs/ARCHITECTURE.md`.

### Notes
- Removed decorative heart symbol in footer copy to keep brand copy/assets emoji-free.
- No deployment performed.

## 2026-02-21 — Inline Brand Asset Replacement Pass

### Completed
- Refactored `src/components/BrandLogo.tsx` for inline copy substitution use cases:
  - added `xs` size variant
  - added `as="span"` mode (non-link inline rendering)
  - added `showMark` toggle for wordmark-only usage
  - added `screenReaderText` + `sr-only` fallback for accessibility/SEO support when replacing text with visual brand treatment
- Replaced visible brand text mentions in key marketing copy with inline brand assets:
  - `src/app/about/page.tsx`
    - hero heading (`About autom8`)
    - story intro line (`autom8 was born...`)
  - `src/components/Testimonials.tsx`
    - first testimonial leading brand mention
  - `src/components/Footer.tsx`
    - copyright brand name in legal line
- Tuned inline spacing/baseline alignment (`align-[...]`, compact sizing, margin/flex wrapping) to keep sentence flow clean and responsive.
- Deployment:
  - Vercel production deployed successfully
  - Production URL: `https://autom8everything.com`
  - Deployment alias URL: `https://autom8-everything-lxoo0a3t3-austs-projects-ee024705.vercel.app`

### Validation
- `npm run build` ✅ passed
- `npm run lint` ❌ existing repo lint errors remain in unchanged files (`react/no-unescaped-entities` on several app pages + a few unused var warnings)

## 2026-02-21 � SEO Batch 1 (Technical + On-Page Foundation)

### Completed
- Ran docs discovery command (`npx ts-node scripts/docs-list.ts autom8-everything`), command failed with ESM `__dirname` issue, then manually reviewed all docs in `docs/`.
- Added shared SEO utility: `src/lib/seo.ts`.
- Upgraded global metadata and LocalBusiness schema in `src/app/layout.tsx`.
- Converted core routes to server metadata wrappers + client page components:
  - Home
  - Services
  - About
  - Automations
  - Contact
- Added canonical/title/description/OG/Twitter metadata coverage for core + new routes.
- Added new SEO IA pages:
  - `src/app/blog/page.tsx`
  - `src/app/services/ai-automation/page.tsx`
  - `src/app/services/crm-automation/page.tsx`
  - `src/app/services/local-seo-automation/page.tsx`
- Strengthened internal linking pathways across home/services/blog/case studies/contact.
- Added local SEO signals and NAP consistency:
  - Footer business contact line
  - Contact page NAP/service-area block
  - LocalBusiness JSON-LD (site-wide)
- Added dynamic crawl endpoints:
  - `src/app/robots.ts`
  - `src/app/sitemap.ts`
- Synced static fallbacks:
  - `public/robots.txt`
  - `public/sitemap.xml`
- Cleaned lint warnings from unused animation variant constants.

### Validation
- `npm run lint` ?
- `npm run build` ?

### Notes
- Next build emits a non-blocking workspace-root warning due multiple lockfiles outside project folder.
- Placeholder phone number introduced for NAP consistency; should be replaced with final business number.
- No deploy performed.

## 2026-02-21 — Offer Pivot Copy Pass (Website + Tools + Review Funnel + Managed SEO)

### Completed
- Updated home hero messaging in `src/components/Hero.tsx` to lead with revenue-focused website builds + custom tools and explicitly include managed SEO/blog content as the monthly growth layer.
- Replaced core CTA copy across primary surfaces with clearer action language:
  - `Build Strategy Call`
  - `View Growth Plan`
- Refactored home services cards in `src/components/ServicesBento.tsx` to the four required offers:
  - Website Creation
  - Custom Tools
  - Review Funnel System
  - Managed SEO + Blog Content
- Added proof/case-study positioning block in `src/components/Testimonials.tsx` describing the driving-school review-funnel workflow as proven internal implementation pattern (no fabricated result claims).
- Reworked services page in `src/app/services/ServicesPageClient.tsx`:
  - New page hero copy aligned to pivot
  - Primary service stack reduced to the same four core offers
  - Added package framing section for `Build` (one-time) and `Growth` (monthly retainer)
  - Updated lower-page CTA actions to Build/Growth language
- Updated FAQ in `src/components/FAQ.tsx` with required questions and pivot-aligned answers.
- Updated automations page CTA text in `src/app/automations/AutomationsPageClient.tsx` to `Build Strategy Call`.
- Updated project docs with implementation notes:
  - `docs/BUILD_NOTES.md`
  - `docs/ARCHITECTURE.md`

### Validation
- `npm run lint` ✅ (EXIT:0)
- `npm run build` ✅ (successful static build)

### Notes
- Build still shows existing non-blocking Next workspace-root warning due multiple lockfiles.
- No deployment performed.

## 2026-02-21 — SEO Mega Batch (Hardening + Content + Local Expansion)

### Completed
- Ran mandatory docs command first (`npx ts-node scripts/docs-list.ts autom8-everything`) — script still fails due ESM `__dirname`; manually reviewed all docs files.
- Added reusable SEO/schema utilities in `src/lib/seo.ts`:
  - `toAbsoluteUrl`
  - `buildFaqSchema`
  - `buildServiceSchema`
  - `buildBreadcrumbSchema`
- Expanded blog architecture:
  - `src/content/blogPosts.ts` (22 keyword-targeted posts)
  - `src/app/blog/page.tsx` (full article index)
  - `src/app/blog/[slug]/page.tsx` (SSG detail pages + FAQ/Breadcrumb schema + conversion CTA/internal links)
- Expanded service IA with high-intent pages:
  - `/services/business-process-automation`
  - `/services/email-automation-services`
  - `/services/zapier-consulting`
  - `/services/gohighlevel-setup`
- Added location IA for Phoenix-local SEO:
  - `src/content/locations.ts`
  - `/locations`
  - `/locations/[slug]` for phoenix/scottsdale/glendale/tempe/mesa/chandler
- Updated existing service pages to include FAQ + Service schema and stronger internal links.
- Updated crawl + route coverage:
  - `src/app/sitemap.ts` now includes static + blog + location routes
  - `public/sitemap.xml` synced to expanded route set
- Updated navigation/footer for stronger service + location internal linking.
- Added execution docs:
  - `docs/CONVERSION-TRACKING-SETUP.md`
  - `docs/BACKLINK-CITATION-EXECUTION.md`
  - `docs/CITATION-CHECKLIST.csv`
- Updated docs:
  - `docs/BUILD_NOTES.md`
  - `docs/ARCHITECTURE.md`
  - `docs/SEO-ROADMAP.md`

### Validation
- `npm run lint` ✅
- `npm run build` ✅ (non-blocking workspace root warning remains)

### Blockers / Caveats
- docs-list utility script remains broken (ESM `__dirname` issue in workspace script).
- Business phone/NAP is still placeholder and should be replaced before citation rollout and schema final QA.
- No deployment performed.

## 2026-02-21 — Final SEO/Tech Hardening + Production Deployment

### Completed
- Re-ran mandatory docs command first (`npx ts-node scripts/docs-list.ts autom8-everything`) using CJS compiler override and reviewed all docs.
- Removed placeholder NAP phone usage from code paths and made business identity env-driven via `src/lib/business.ts`.
  - Added `.env.example` with exact required keys for NAP + socials.
  - Updated LocalBusiness schema in `src/app/layout.tsx` to conditionally include phone only when configured.
  - Updated footer/contact blocks to consume env-driven email/phone/location values.
- Eliminated obvious placeholder links in footer social icons by making them env-driven and hidden when unset.
- Added legal routes to remove dead-end/legal placeholders and improve crawlable architecture:
  - `/privacy`
  - `/terms`
  - `/security`
- Strengthened schema coverage with `Article` JSON-LD for blog detail pages.
- Expanded crawl coverage in sitemap sources:
  - added legal routes to `src/app/sitemap.ts`
  - synced `public/sitemap.xml`
- Strengthened internal linking from the location hub with a cross-link CTA block to `/services`, `/blog`, and `/contact`.
- Added missing discoverability link for `/services/gohighlevel-setup` on the main services page.
- Validation:
  - `npm run lint` ✅
  - `npm run build` ✅
- Deployment:
  - Production URL: `https://autom8everything.com`
  - Deployment URL: `https://autom8-everything-9tjvrstkb-austs-projects-ee024705.vercel.app`
  - Deployment ID: `GTxunsScrDbRekrj437iDpMYfKpf`

### Remaining blockers
- Final business NAP values (especially phone) are still not provided; env keys are now ready and documented in `.env.example`.
- External account-bound items remain manual: GA4/GTM wiring, Search Console verification, citations/backlink execution.

## 2026-02-21 � Remove Internal Workflow Proof Card + Deploy

### Completed
- Removed the full testimonials proof card in `src/components/Testimonials.tsx` that contained:
  - `Internal Workflow Proof`
  - `Driving School Review Funnel Pattern`
- Rebalanced spacing after removal:
  - adjusted section intro container spacing from `mb-16` to `mb-14`
  - updated intro copy to remove review-funnel-specific reference
- Verified no remaining occurrences of removed text in `src/`.
- Verified no `href="#..."` placeholders in `src/` (no broken in-page anchor leftovers).

### Validation
- `npm run build` ?

### Deployment
- Production alias: `https://autom8everything.com`
- Deployment URL: `https://autom8-everything-oidensgki-austs-projects-ee024705.vercel.app`

## 2026-02-21 — Deep Blog Buildout Pass (All Seeded Posts)

### Completed
- Ran required docs discovery command first:
  - `npx ts-node scripts/docs-list.ts autom8-everything` ❌ fails due ESM `__dirname` in script.
  - Manually read every file in `docs/` before code changes.
- Expanded blog content model in `src/content/blogPosts.ts`:
  - Added `seoTitle`, `tags`, `featured`, `trendingScore`, `updatedAt`, `localRelevance`, and `serviceLinks`.
  - Added section-level `checklist` and `example` support.
  - Applied enrichment to all 22 seeded posts (practical checklist + real-world Phoenix execution scenario).
  - Upgraded reading time floor to reflect expanded article depth.
- Rebuilt blog index UX (`src/app/blog/page.tsx`):
  - Featured guides area
  - Trending-ranked content area
  - Category chips + topic-tag discoverability
  - Cleaner article cards with tags
- Rebuilt blog detail template (`src/app/blog/[slug]/page.tsx`):
  - Uses post-level SEO title
  - Strong H2/H3 hierarchy via checklist/example blocks
  - Local relevance callout for Arizona/Phoenix context
  - Topic-specific internal service links + quote/contact CTA
- Upgraded schema helper (`src/lib/seo.ts`):
  - Added `buildBlogPostingSchema` using `BlogPosting` JSON-LD with richer fields (`dateModified`, `articleSection`, `inLanguage`, `mainEntityOfPage`, image)
  - Kept compatibility alias: `buildArticleSchema = buildBlogPostingSchema`

### Validation
- `npm run lint` ✅
- `npm run build` ✅ (non-blocking multi-lockfile workspace-root warning remains)

### Notes
- No deployment performed in this pass.
- Docs updated:
  - `docs/BUILD_NOTES.md`
  - `docs/ARCHITECTURE.md`

## 2026-02-21 — Rating Stat Branding Alignment (5.0/5)

### Completed
- Located the metric component rendering the old `4.9/5 Average Rating` stat: `src/components/Stats.tsx`.
- Updated the rating metric source value from `4.9` to `5`.
- Added per-stat decimal display support (`decimals?: number`) and applied `decimals: 1` to the rating stat so it renders as **`5.0/5`** consistently.
- Kept existing visual design, typography, layout, spacing, and animation behavior unchanged.

### Validation
- `npm run build` ✅ (passes)

### Notes
- Searched codebase for related rating/trust stat instances; this `Stats` metric is the branding-relevant rating display surface in the site UI.

## 2026-02-21 � Homepage Mass-Market Copy Rewrite (Content-First)

### Completed
- Ran mandatory docs step first; `npx ts-node scripts/docs-list.ts autom8-everything` failed again with ESM `__dirname` error, then manually reviewed all docs files in `docs/`.
- Rewrote homepage copy for plain-language, broad local-business clarity while preserving existing design structure.
- Updated homepage messaging across:
  - `src/components/Hero.tsx`
  - `src/components/SocialProofBar.tsx`
  - `src/components/ServicesBento.tsx`
  - `src/components/HowItWorks.tsx`
  - `src/components/Testimonials.tsx`
  - `src/components/Stats.tsx`
  - `src/components/FAQ.tsx`
  - `src/components/CTA.tsx`
- Updated home metadata to match new positioning:
  - `src/app/page.tsx`
- Updated docs:
  - `docs/BUILD_NOTES.md`
  - `docs/ARCHITECTURE.md`

### Validation
- `npm run lint` ? (exit code 0)
- `npm run build` ?

### Notes
- No deployment performed.

## 2026-02-21 � Local Preset B Cinematic Preview Build (/b-copy)

### Completed
- Ran mandatory docs command first (`npx ts-node scripts/docs-list.ts autom8-everything`) � still fails due ESM `__dirname`; manually reviewed all docs files in `docs/` before changes.
- Added local preview route:
  - `src/app/b-copy/page.tsx` (`noindex, nofollow` metadata)
  - `src/app/b-copy/BCopyPageClient.tsx`
  - `src/app/b-copy/b-copy.css`
- Implemented strict Preset B direction with required tokens and typography:
  - `#0D0D12`, `#C9A84C`, `#FAF8F5`, `#2A2A35`
  - Inter + Playfair Display Italic + JetBrains Mono
- Added global subtle noise overlay via inline SVG turbulence data URI and low opacity.
- Implemented rounded container language using 2rem�3rem radii.
- Implemented full requested cinematic section architecture:
  1. Floating island navbar with GSAP scroll morph
  2. 100dvh hero with full-bleed real Unsplash image, heavy gradient overlay, bottom-left composition, and two-line dramatic typography
  3. Interactive features section:
     - Diagnostic Shuffler (cycles every 3s)
     - Telemetry Typewriter (blinking cursor + live pulse feed)
     - Cursor Protocol Scheduler (animated SVG cursor interactions)
  4. Philosophy manifesto with dark background + parallax texture
  5. Sticky stacking protocol archive with 3 pinned cards + GSAP stack timeline
  6. Membership/Pricing 3-tier grid with middle emphasis
  7. Footer system operational indicator (pulsing green dot + monospace)
- Added GSAP lifecycle and microinteraction constraints exactly:
  - `gsap.context()` + `ctx.revert()` cleanup
  - `power3.out` entrances, `power2.inOut` morphs
  - stagger `0.08` for text, `0.15` for cards
  - magnetic hover + `scale(1.03)` + interactive `translateY(-1px)` + sliding button spans
- Added dependency/config support:
  - installed `gsap`
  - updated `next.config.ts` with `images.unsplash.com` remote pattern for real Unsplash hero image

### Validation
- `npm run lint` ?
- `npm run build` ?

### Notes
- No deployment performed (local preview only).
- Non-blocking Next workspace-root lockfile warning remains.

## 2026-02-21 — Local Preset C "Brutalist Signal" Preview (/c-copy)

### Completed
- Ran mandatory docs command first (`npx ts-node scripts/docs-list.ts autom8-everything`) — failed due ESM `__dirname`; manually reviewed all docs files in `docs/` before implementation.
- Added local preview route:
  - `src/app/c-copy/page.tsx` (`noindex, nofollow` metadata)
  - `src/app/c-copy/CCopyPageClient.tsx`
  - `src/app/c-copy/c-copy.css`
- Implemented Preset C tokens exactly:
  - Paper `#E8E4DD`
  - Signal Red `#E63B2E`
  - Off-white `#F5F3EE`
  - Black `#111111`
- Implemented route-scoped typography stack:
  - Space Grotesk
  - DM Serif Display Italic
  - Space Mono
- Kept cinematic architecture concept from the prior preview but simplified animation/layout complexity for reliability and readability:
  1) sticky signal nav + CTA
  2) clear hero value proposition + action row
  3) feature signal cards + rotating diagnostic queue
  4) manifesto split section
  5) protocol archive progression cards (non-overlapping)
  6) pricing plans grid
  7) footer conversion CTA
- Rewrote all preview copy for mass-market clarity (plain local-business language).
- Removed overlap-prone/pinned stack behavior in this variant to avoid ghosting/text-collision bugs.
- Updated docs:
  - `docs/BUILD_NOTES.md`
  - `docs/ARCHITECTURE.md`

### Validation
- `npm run lint` ✅
- `npm run build` ✅

### Notes
- Local preview only; no deployment performed.
- Next workspace-root lockfile warning remains non-blocking.

## 2026-03-03 — Cadence AI Voice Page + Site Integration

### Completed
- Added full Cadence service page at `src/app/services/cadence/page.tsx` with:
  - Hero section + CTA
  - 3-step how-it-works section
  - 6 feature cards
  - competitor comparison table
  - pricing block
  - FAQ section
  - bottom CTA
  - `buildMetadata`, `buildServiceSchema`, and `buildFaqSchema`
- Added homepage highlight component at `src/components/CadenceHighlight.tsx` (dark two-column layout, pitch + pricing card, motion reveal).
- Updated `src/app/services/ServicesPageClient.tsx` to add Cadence as the first card in Supporting Service Pages.
- Updated `src/app/HomePageClient.tsx` to import/render `<CadenceHighlight />` directly between `<ServicesBento />` and `<WhoItsFor />`.
- Updated `src/components/Footer.tsx` product links to include `Cadence AI Voice` → `/services/cadence`.

### Validation
- `npm run build` ✅ passed (TypeScript clean, no TS errors).

### Git / Deploy
- Commit: `cbfddd6`
- Branch: `master`
- Pushed to: `origin/master`
- Vercel production deployment: `https://autom8-everything-10j4g6ei2-austs-projects-ee024705.vercel.app`
- Aliased production URL: `https://autom8everything.com`
- Verified route responds: `https://autom8everything.com/services/cadence` (HTTP 200).

## 2026-03-03 — Cadence SaaS onboarding wizard + welcome flow

### Completed
- Added onboarding route and 4-step wizard:
  - `src/app/cadence/get-started/page.tsx`
  - `src/app/cadence/get-started/CadenceGetStartedClient.tsx`
- Wizard collects Phase 1 blueprint fields and calls backend endpoints:
  - `POST /api/onboarding/start`
  - `POST /api/onboarding/checkout`
  - redirects user to returned Stripe Checkout URL
- Added welcome/status route that polls provisioning state:
  - `src/app/cadence/welcome/page.tsx`
  - `src/app/cadence/welcome/CadenceWelcomeClient.tsx`
  - displays status + assigned number + failure error when present
- Updated `src/app/services/cadence/page.tsx` CTA buttons to route users to `/cadence/get-started`.
- Updated `.env.example` with `NEXT_PUBLIC_CADENCE_API_URL`.

### Validation
- `npm run build` ✅ (non-blocking Next workspace root warning about multiple lockfiles)

### Git
- Commit: `<pending>`
- Push: `<pending>`

## 2026-03-03 — Homepage + IA rewrite (content architecture blueprint)

### Completed
- Reworked homepage IA order in `src/app/HomePageClient.tsx`:
  - removed standalone `CadenceHighlight` from render
  - reordered sections to: Hero → Social Proof → Product Grid → How It Works → Who It’s For → Testimonials → Pricing Overview → FAQ → CTA
  - added new `PricingOverview` section component
- Updated homepage conversion strategy and plain-language copy:
  - `src/components/Hero.tsx`
  - `src/components/SocialProofBar.tsx`
  - `src/components/ServicesBento.tsx` (featured Cadence + 4 product cards)
  - `src/components/HowItWorks.tsx`
  - `src/components/WhoItsFor.tsx`
  - `src/components/Testimonials.tsx`
  - `src/components/FAQ.tsx`
  - `src/components/CTA.tsx`
- Added new `src/components/PricingOverview.tsx` with mixed pricing model and tiered CTAs.
- Updated navigation and footer IA:
  - `src/components/Navigation.tsx` now uses Products + Pricing top-level structure and `Start Free Trial` CTA.
  - `src/components/Footer.tsx` now follows Products / Company / Resources structure.
- Added new product pages:
  - `src/app/services/website-creation/page.tsx`
  - `src/app/services/review-funnel/page.tsx`
  - `src/app/services/seo-content/page.tsx`
  - `src/app/services/custom-apps/page.tsx`
  - `src/app/pricing/page.tsx`
- Implemented redirect and route consolidation:
  - `src/app/services/page.tsx` now redirects to `/pricing`
  - `next.config.ts` now includes permanent redirects from deprecated service slugs and `/automations`
- Updated contact flow in `src/app/contact/ContactPageClient.tsx`:
  - added intake-style checkboxes, optional phone field, and Cadence trial callout
  - kept call booking path as secondary action
- Updated sitemap routes in `src/app/sitemap.ts` for the new IA.

### Validation
- `npm run lint` ✅
- `npm run build` ✅

### Notes
- Build still reports non-blocking Next workspace-root warning due multiple lockfiles.
- Existing legacy route files remain in repo but are now covered by 301 redirects in `next.config.ts`.

