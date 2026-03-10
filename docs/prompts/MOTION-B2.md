# MOTION-B2: Products Section + How It Works Motion Signatures + Card Interactions

**Thinking level: medium**
**Branch: `ui/motion-system`**
**Gate: `npm run build`**

---

## Context

B1 added expanded motion tokens to `src/lib/motion.ts` including `fadeUp`, `scaleIn`, `slideInLeft`, `slideInRight`, `staggerContainer`, `staggerItem`, `springSmooth`, `springSnappy`, and `viewportOnce`. It also created `AuroraBackground` and `AnimatedHeadline` components and upgraded the Hero. 

This batch upgrades the Products section (ServicesBento) and How It Works with unique motion signatures, plus adds 3D tilt card interactions.

Read `src/lib/motion.ts` first to see available motion tokens.

---

## Task 1: Create `src/components/TiltCard.tsx`

A wrapper component that adds subtle 3D perspective tilt on mouse hover (desktop only).

**Props:**
```typescript
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max degrees, default 5
  perspective?: number; // default 800
  scale?: number; // hover scale, default 1.02
}
```

**Implementation:**
- Use `useMotionValue` for `rotateX` and `rotateY`
- On `onMouseMove`: calculate mouse position relative to card center, map to ±maxTilt degrees
- On `onMouseLeave`: spring back to `rotateX: 0, rotateY: 0`
- Apply `style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}` on inner `motion.div`
- Parent div gets `perspective: {perspective}px`
- Use `useReducedMotion` — if true, render children without tilt wrapper
- Mobile detection: use `onMouseMove`/`onMouseLeave` only — these don't fire on touch, so mobile automatically gets no tilt. Add `whileTap={{ scale: 0.98 }}` for touch feedback.
- Add `will-change-transform` class to the animated element

**Important:** This component must work as a wrapper — children are rendered inside it, not replaced.

---

## Task 2: Update `src/components/ServicesBento.tsx`

Apply `scaleIn` motion signature with staggered card reveals.

**Changes:**

1. **Section heading:** Replace current `{...revealPreset}` with the new variant system:
   ```tsx
   <motion.div
     initial="hidden"
     whileInView="visible"
     viewport={viewportOnce}
     variants={fadeUp}
   >
   ```

2. **Hero product card (Cadence):** Wrap in `<TiltCard>`. Use `scaleIn` variant:
   ```tsx
   <motion.article variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewportOnce}>
   ```

3. **Non-hero cards grid:** Wrap the grid container in a `staggerContainer`:
   ```tsx
   <motion.div
     className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
     variants={staggerContainer}
     initial="hidden"
     whileInView="visible"
     viewport={viewportOnce}
   >
   ```
   Each card article uses `variants={scaleIn}` (no individual `initial`/`whileInView` — parent orchestrates).

4. **Wrap each non-hero card** in `<TiltCard>` for 3D hover effect.

5. **Add glassmorphism border animation** to cards:
   - Add a CSS class `glass-card` in globals.css:
     ```css
     .glass-card {
       position: relative;
       overflow: hidden;
     }
     .glass-card::before {
       content: '';
       position: absolute;
       inset: 0;
       border-radius: inherit;
       padding: 1px;
       background: linear-gradient(135deg, rgba(139,92,246,0.3), transparent 40%, transparent 60%, rgba(6,182,212,0.3));
       -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
       -webkit-mask-composite: xor;
       mask-composite: exclude;
       opacity: 0;
       transition: opacity 0.3s;
     }
     .glass-card:hover::before {
       opacity: 1;
     }
     ```
   - Apply `glass-card` class to each card article element

6. **Keep all existing content, links, prices, and copy unchanged.** Only motion behavior changes.

7. Remove old `{...revealStagger(index, prefersReducedMotion)}` and `{...cardHover}` spread patterns — replace with the new variant system. But keep `useReducedMotion` check: when reduced motion preferred, use `initial={false}` and skip TiltCard wrapper.

---

## Task 3: Update `src/components/HowItWorks.tsx`

Apply alternating slide-in motion signature — ping-pong effect.

**Changes:**

1. **Section heading:** Use `fadeUp` variant with `initial="hidden" whileInView="visible" viewport={viewportOnce}`

2. **Steps grid:** Wrap in `staggerContainer`:
   ```tsx
   <motion.div
     className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
     variants={staggerContainer}
     initial="hidden"
     whileInView="visible"
     viewport={viewportOnce}
   >
   ```

3. **Each step:** Use alternating variants based on index:
   ```tsx
   variants={index % 2 === 0 ? slideInLeft : slideInRight}
   ```
   On mobile (single column), all three steps slide in from alternating sides — creates a visual rhythm.

4. **Keep the animated connector lines** between steps — they already look good.

5. **Step icon hover:** Add `whileHover={{ scale: 1.1, rotate: 5 }}` with `springSnappy` transition (desktop only — wrap in reduced motion check).

6. Keep all copy, links, and structure unchanged.

---

## Task 4: Update `src/components/Testimonials.tsx`

Apply tilt-correction entrance — cards appear slightly tilted and straighten on reveal.

**Changes:**

1. **Section heading:** `fadeUp` variant

2. **Cards grid:** `staggerContainer` wrapper

3. **Each testimonial card:** Custom variant with rotation correction:
   ```typescript
   const testimonialReveal: Variants = {
     hidden: { opacity: 0, y: 30, rotate: -2 },
     visible: { 
       opacity: 1, y: 0, rotate: 0,
       transition: { type: "spring", stiffness: 100, damping: 20, mass: 0.5 }
     },
   };
   ```
   Apply as `variants={testimonialReveal}` on each card's `motion.div`.

4. Keep all content unchanged.

---

## Files to modify
- `src/components/TiltCard.tsx` — NEW
- `src/components/ServicesBento.tsx` — motion upgrade
- `src/components/HowItWorks.tsx` — motion upgrade
- `src/components/Testimonials.tsx` — motion upgrade
- `src/app/globals.css` — add `glass-card` styles

## Files to NOT modify
- Hero.tsx (done in B1)
- Navigation.tsx (done in B5)
- Any page files, pricing, or service pages

---

## Gate
```bash
npm run build
```

Build must succeed with zero errors. Warnings are acceptable.

---

## Procurement Contract
Every coder batch must terminate immediately after the required gates for that batch are satisfied and the code is committed and pushed. Coders must not start local servers, run manual verification loops, open-ended exploratory tests, or invent post-gate validation steps. Every batch must end with a git commit and push to the project branch. If a batch makes no code changes, the coder must write a status/log entry (e.g., append to docs/deploy-log.md) and commit+push it. Coders MUST notify Steve as the final step after git push by POSTing to `http://localhost:18789/hooks/agent` with `Authorization: Bearer KyCiiWTXATTqCayTrPyoE9krcBzXFP7YPtzqEGlA1aA=` and body `{"message":"Batch complete. Gate ready.","agentId":"main","deliver":false}`. Write the JSON to a temp file and use `curl.exe --data-binary @file` to avoid shell escaping issues. Coders do NOT need to set up git credentials. The orchestrator handles PAT configuration pre-flight.
