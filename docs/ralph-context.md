# Ralph Context — Autom8 CRO Passover

## B3: Homepage trust/proof bar + offer ladder + how it works refresh
- Modified: `src/components/SocialProofBar.tsx`
  - Stats now: `Local Businesses / Active Clients`, `24/7 / Call Coverage`, `5 min / Average Setup Time`
  - Existing five-star card retained with same motion/reduced-motion behavior
  - Added trust-logo placeholder row: `Google Business`, `Stripe`, `Twilio`, `Google Calendar`
  - Added TODO note to replace text with real integration logos later
- Created: `src/components/ProofBar.tsx`
  - New proof strip with three sourced stat callouts:
    - `80%` callers won't leave voicemail (Ruby Receptionist)
    - `$1,000+` missed call value (Industry average)
    - `93%` review-reading behavior (BrightLocal 2024)
- Created: `src/components/OfferLadder.tsx`
  - New 4-tier pricing bundle section with heading/subheading
  - Tiers: Start, Grow (featured), Expand, Custom
  - Grow card is highlighted and includes `Most Popular` badge
  - Includes icons, value props, checkmark feature lists, and CTA buttons
  - Section id: `offer-ladder` for internal anchor linking
- Modified: `src/components/HowItWorks.tsx`
  - Rewrote 3 steps with conversion-focused copy
  - Bottom CTA now `See Pricing` linking to `#offer-ladder` using `btn-secondary`
- Modified: `src/app/HomePageClient.tsx`
  - Added imports for `ProofBar` and `OfferLadder`
  - Updated section order: Hero -> SocialProofBar -> ProofBar -> ServicesBento -> OfferLadder -> WhoItsFor -> HowItWorks -> Testimonials -> FAQ -> CTA -> Footer
- Docs updated:
  - `docs/UI-VERIFICATION.md`
  - `docs/implementation-plan.md`
  - `docs/CODER-CONTEXT.md`
- Gotchas:
  - `SocialProofBar` filename and exported component name are intentionally unchanged to avoid import breakage.
  - `OfferLadder` CTAs intentionally mix tel and contact links.

## B2: Homepage hero + CTA overhaul
- Modified: `src/components/Hero.tsx`
- Copy updates:
  - Eyebrow → `Growth infrastructure for local businesses`
  - H1 → `Stop Losing Calls. Start Winning Customers.`
  - Subhead → `Autom8 helps local businesses answer every call, collect 5-star reviews, and turn their website into a lead machine — without becoming tech experts.`
- CTA updates:
  - Primary CTA is now a tel link (`tel:+14806313993`) labeled `Call Cadence Live` with `PhoneCall` icon from `lucide-react`
  - Secondary CTA now links to `/contact` labeled `Book a 15-Minute Demo`
- Trust cues:
  - Added micro-strip below CTAs: `7-day free trial • No contracts • Setup in 5 minutes`
  - Added supporting note: `Try Cadence right now — it will answer like your receptionist.`
- Gotchas:
  - Kept Framer reveal animations, `buttonHover` preset, `BrandLogo`, and reduced-motion handling unchanged.
  - Secondary CTA still uses `buttonHover` via a motion wrapper around `Link`.

## B1: Design Tokens
- Created: `src/lib/design-tokens.ts` — exports SECTION_PY, CARD_BASE, CARD_ELEVATED, COLORS
- Modified: `src/app/globals.css` — added .card-base, .card-elevated, .btn-primary, .btn-secondary, .btn-ghost, .section-heading, .section-subheading, CSS custom properties for section spacing
- Branch: ui/cro-passover created from master
- Gotchas: Tailwind v4 uses @theme inline block — new CSS classes are plain CSS, not @apply. Components can use these classes directly via className.
