# MOTION-B1: Global Motion System + Aurora Background + Hero Motion Upgrade

**Thinking level: high**
**Branch: `ui/motion-system`**
**Gate: `npm run build`**

---

## Context

You are upgrading autom8everything.com's motion design system. This is a dark-themed Next.js 16 site using Tailwind CSS 4, Framer Motion 12, and Lenis smooth scroll. The site already has basic `reveal`/`revealStagger`/`cardHover`/`buttonHover` variants in `src/lib/motion.ts` and all components already check `useReducedMotion`.

Read the site contract for brand/copy rules: `docs/autom8-site-contract.md`

This batch builds the foundational motion architecture that all subsequent batches depend on.

---

## Task 1: Expand `src/lib/motion.ts`

Replace the current file contents with a complete motion token system. Keep the existing `reveal`, `revealReduced`, `revealStagger`, `cardHover`, and `buttonHover` exports (other components import them), but add all new variants.

**New exports to add:**

```typescript
// Spring configs
export const springSmooth = { type: "spring" as const, stiffness: 100, damping: 20, mass: 0.5 };
export const springSnappy = { type: "spring" as const, stiffness: 400, damping: 25 };
export const springDramatic = { type: "spring" as const, stiffness: 80, damping: 15 };

// Viewport config
export const viewportOnce = { once: true, margin: "-80px" as const };

// Variant objects (use Variants pattern for parent-child orchestration)
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: springSmooth },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: springSmooth },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: springSmooth },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: springSmooth },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: springSmooth },
};
```

Import `Variants` from `"motion/react"`. Keep backward compat — do NOT remove existing exports (`reveal`, `revealReduced`, `revealStagger`, `cardHover`, `buttonHover`).

---

## Task 2: Create `src/components/AuroraBackground.tsx`

Animated gradient orb background for the hero section.

**Requirements:**
- 3 gradient orbs using `motion.div` with infinite `animate` keyframes
- Each orb is a large `div` with `border-radius: 50%`, blurred (`blur-[120px]`), absolutely positioned
- Orb 1: purple (#8B5CF6 at 30% opacity), drifts in a figure-8 pattern over 20s
- Orb 2: cyan (#06B6D4 at 25% opacity), drifts opposite direction over 25s  
- Orb 3: mixed (#A78BFA at 20% opacity), slow vertical drift over 30s
- Animate ONLY `transform` (translate) — never position properties
- Container: `absolute inset-0 overflow-hidden pointer-events-none`
- `useReducedMotion`: if true, render static orbs (no animation)
- Mobile (`useMediaQuery` or CSS): reduce to 2 orbs, reduce blur radius to `blur-[80px]`
  - Use a simple `useState` + `useEffect` with `matchMedia("(max-width: 640px)")` for the media query — don't add a dependency

**Animation pattern for each orb:**
```typescript
animate={{
  x: [0, 100, -50, 80, 0],
  y: [0, -80, 60, -40, 0],
}}
transition={{
  duration: 20,
  repeat: Infinity,
  ease: "easeInOut",
}}
```

Each orb gets different keyframe arrays and durations to prevent synchronized motion.

---

## Task 3: Create `src/components/AnimatedHeadline.tsx`

Word-by-word reveal component for hero headings.

**Props:**
```typescript
interface AnimatedHeadlineProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  staggerDelay?: number; // default 0.08
  startDelay?: number; // default 0
}
```

**Implementation:**
- Split `text` by spaces into words
- Wrap each word in `motion.span` with `display: inline-block` and `overflow: hidden` parent
- Use `staggerContainer` + custom word variant:
  ```typescript
  const wordVariant = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: "0%", opacity: 1, transition: { type: "spring", stiffness: 80, damping: 15 } },
  };
  ```
- Parent `motion.{as}` uses `initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}`
- Each word wrapper gets `overflow: hidden` so the word slides up from behind a mask
- Add `&nbsp;` between words to preserve spacing
- `useReducedMotion`: render plain text without animation

---

## Task 4: Update `src/components/Hero.tsx`

Replace the current hero with the new motion system.

**Changes:**
1. Replace the static `section-glow` divs with `<AuroraBackground />`
2. Replace the `<h1>` with `<AnimatedHeadline text="Stop Losing Calls. Start Winning Customers." as="h1" />`
3. Apply sequenced entrance to remaining elements:
   - Eyebrow + logo: `fadeUp` variant, no delay (appears with headline)
   - Subheadline: `fadeUp` with `transition.delay: 0.6`
   - CTA buttons: `fadeUp` with `transition.delay: 0.9`, wrap in `staggerContainer`
   - Trust badges: `fadeUp` with `transition.delay: 1.1`
4. Keep all existing classes, styles, and copy unchanged
5. Keep `useReducedMotion` — when true, all elements render statically (current behavior with `revealReduced`)

**Do NOT change any copy text or links — only motion behavior.**

---

## Task 5: Add scroll-linked parallax to hero Aurora orbs

In `Hero.tsx`, use `useScroll` and `useTransform` to make the Aurora background move at a slower rate than scroll:

```typescript
const { scrollY } = useScroll();
const auroraY = useTransform(scrollY, [0, 500], [0, -150]);
```

Wrap `<AuroraBackground />` in a `motion.div` with `style={{ y: auroraY }}`.

This creates parallax — the orbs drift up slower than the page scrolls, adding depth.

---

## Task 6: LazyMotion Setup (optional optimization)

**Only if time permits and build passes without it first:**
- In `src/app/layout.tsx`, wrap children with `<LazyMotion features={domAnimation}>`
- Import `LazyMotion` and `domAnimation` from `"motion/react"`

Note: This is a nice-to-have. The current `motion` import approach works fine with tree-shaking. Skip if it causes any import conflicts.

---

## Files to modify
- `src/lib/motion.ts` — expand with new variants
- `src/components/Hero.tsx` — new motion system
- `src/components/AuroraBackground.tsx` — NEW
- `src/components/AnimatedHeadline.tsx` — NEW

## Files to NOT modify
- Do not touch Navigation, ServicesBento, HowItWorks, or any other component
- Do not change any copy/text content
- Do not modify globals.css unless adding a keyframe needed for Aurora

---

## Gate
```bash
npm run build
```

Build must succeed with zero errors. Warnings are acceptable.

---

## Procurement Contract
Every coder batch must terminate immediately after the required gates for that batch are satisfied and the code is committed and pushed. Coders must not start local servers, run manual verification loops, open-ended exploratory tests, or invent post-gate validation steps. Every batch must end with a git commit and push to the project branch. If a batch makes no code changes, the coder must write a status/log entry (e.g., append to docs/deploy-log.md) and commit+push it. Coders MUST notify Steve as the final step after git push by POSTing to `http://localhost:18789/hooks/agent` with `Authorization: Bearer KyCiiWTXATTqCayTrPyoE9krcBzXFP7YPtzqEGlA1aA=` and body `{"message":"Batch complete. Gate ready.","agentId":"main","deliver":false}`. Write the JSON to a temp file and use `curl.exe --data-binary @file` to avoid shell escaping issues. Coders do NOT need to set up git credentials. The orchestrator handles PAT configuration pre-flight.
