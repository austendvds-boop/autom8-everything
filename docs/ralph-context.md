# Ralph Context — Autom8 CRO Passover

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
