# MOTION-B5: Scroll-Linked Effects + Navigation Enhancement + Global Polish + Reduced Motion Audit

**Thinking level: low**
**Branch: `ui/motion-system`**
**Gate: `npm run build`**

---

## Context

B1-B4 built the complete motion system, upgraded all homepage sections, pricing page, and all product/service pages. This final batch adds scroll-linked effects, enhances the navigation, and performs a global polish pass.

Read `src/lib/motion.ts` for available tokens.

---

## Task 1: Enhance `src/components/Navigation.tsx` Scroll Effects

The navbar already detects `scrollY > 50` and applies glass styles. Upgrade to smooth scroll-linked interpolation.

**Changes:**

1. Replace the boolean `isScrolled` state with `useTransform` motion values:
   ```typescript
   const { scrollY } = useScroll();
   const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.85]);
   const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);
   const blur = useTransform(scrollY, [0, 100], [0, 12]);
   const navScale = useTransform(scrollY, [0, 100], [1, 0.98]); // subtle shrink
   ```

2. Apply via `useMotionTemplate`:
   ```typescript
   const background = useMotionTemplate`rgba(10, 10, 15, ${bgOpacity})`;
   const backdropFilter = useMotionTemplate`blur(${blur}px)`;
   const border = useMotionTemplate`1px solid rgba(255, 255, 255, ${borderOpacity})`;
   ```

3. Apply these as `style` props on the nav container `motion.div`.

4. Keep the `isScrolled` state for the conditional CSS classes (padding change, max-width change, rounded-full) — those need boolean toggling, not interpolation. The scroll-linked values handle the visual transition smoothly.

5. **Desktop products dropdown:** Add `AnimatePresence` + `motion.div` with `scaleIn` animation on open/close (replacing CSS `hidden group-hover:block`). Use `onMouseEnter`/`onMouseLeave` with state instead of CSS-only hover.

6. Keep `useReducedMotion` — when true, fall back to current boolean-switch behavior.

---

## Task 2: Add Scroll-Linked Parallax to Section Separators

Add subtle scroll-linked opacity transitions between major sections on the homepage.

In `src/app/HomePageClient.tsx`, add gradient dividers between sections:

```tsx
<ScrollFade /> // between each major section pair
```

Create `src/components/ScrollFade.tsx`:
```typescript
"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function ScrollFade() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 0]);

  return (
    <motion.div
      ref={ref}
      className="h-32 relative pointer-events-none"
      style={{ opacity }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8B5CF6]/[0.05] to-transparent" />
    </motion.div>
  );
}
```

Place `<ScrollFade />` between: Hero→SocialProofBar, ServicesBento→OfferLadder, HowItWorks→Testimonials. Don't overdo it — 3 placements max.

---

## Task 3: Remaining Pages Motion Treatment

Check these pages and add motion if they're still static:

### `/about` page
- `src/app/about/page.tsx` or `AboutPageClient.tsx`
- Hero heading: `fadeUp`
- Content sections: `staggerContainer` + `staggerItem`
- Team/about cards (if any): `scaleIn` with stagger

### `/contact` page
- `src/app/contact/page.tsx`
- Heading: `fadeUp`
- Form: `fadeUp` with slight delay
- Contact info: `staggerItem`

### `/blog` page
- If it has a listing page, add `staggerContainer` + `staggerItem` on blog post cards

### `/get-started` page
- Heading: `fadeUp`
- Steps/form: `staggerContainer`

**Pattern for each:** Same as B4 — if server component with metadata, extract client component. Import motion tokens, guard with `useReducedMotion`.

---

## Task 4: Global Reduced Motion Audit

Scan ALL components that use Framer Motion. For each one, verify:

1. `useReducedMotion` is called
2. When `prefersReducedMotion` is true, animations are disabled:
   - `initial={false}` or `initial="visible"` (skip entrance animation)
   - No `whileHover`/`whileTap` interactions
   - Static render for AuroraBackground, AnimatedHeadline
3. No component should animate if the user has requested reduced motion

**Files to audit:**
- All components in `src/components/`
- All page client components
- `src/components/AuroraBackground.tsx`
- `src/components/AnimatedHeadline.tsx`
- `src/components/TiltCard.tsx`
- `src/components/ShimmerButton.tsx`

Fix any gaps found.

---

## Task 5: Performance Polish

1. **Add `will-change-transform`** class to any animated element that doesn't have it yet — especially:
   - Aurora orbs
   - TiltCard inner div
   - Any `motion.div` with translate/scale animations

2. **Verify no layout-triggering animations:** Search for any Framer Motion `animate` that targets `width`, `height`, `top`, `left`, `margin`, `padding`. Replace with `transform`-based equivalents.

3. **Check mobile at 375px:**
   - Verify no horizontal overflow from animated elements (translateX animations must not push content off-screen)
   - Aurora orbs should be contained within `overflow: hidden` parent
   - ShimmerButton `::before` and `::after` pseudo-elements must not cause overflow

---

## Task 6: Footer + StickyMobileCTA Polish

### Footer (`src/components/Footer.tsx`)
- Add `fadeUp` on footer content — subtle, single animation, not staggered
- Keep it minimal — footer doesn't need heavy motion

### StickyMobileCTA (`src/components/StickyMobileCTA.tsx`)
- If it has a CTA button, apply `<ShimmerButton>` styling
- Entrance animation: slide up from bottom with spring

---

## Files to create
- `src/components/ScrollFade.tsx` — NEW

## Files to modify
- `src/components/Navigation.tsx` — scroll-linked enhancement
- `src/app/HomePageClient.tsx` — ScrollFade placement
- `src/app/about/page.tsx` or `AboutPageClient.tsx` — motion
- `src/app/contact/page.tsx` — motion (if applicable)
- `src/components/Footer.tsx` — light motion
- `src/components/StickyMobileCTA.tsx` — ShimmerButton + entrance
- Various components — reduced motion audit fixes

## Files to NOT modify
- `src/lib/motion.ts` (complete from B1)
- Hero.tsx, ServicesBento.tsx, HowItWorks.tsx (done in B1/B2)
- Pricing page (done in B3)
- Product pages (done in B4)

---

## Gate
```bash
npm run build
```

Build must succeed with zero errors.

---

## Procurement Contract
Every coder batch must terminate immediately after the required gates for that batch are satisfied and the code is committed and pushed. Coders must not start local servers, run manual verification loops, open-ended exploratory tests, or invent post-gate validation steps. Every batch must end with a git commit and push to the project branch. If a batch makes no code changes, the coder must write a status/log entry (e.g., append to docs/deploy-log.md) and commit+push it. Coders MUST notify Steve as the final step after git push by POSTing to `http://localhost:18789/hooks/agent` with `Authorization: Bearer KyCiiWTXATTqCayTrPyoE9krcBzXFP7YPtzqEGlA1aA=` and body `{"message":"Batch complete. Gate ready.","agentId":"main","deliver":false}`. Write the JSON to a temp file and use `curl.exe --data-binary @file` to avoid shell escaping issues. Coders do NOT need to set up git credentials. The orchestrator handles PAT configuration pre-flight.
