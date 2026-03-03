# CODER-CONTEXT.md — autom8-everything

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
