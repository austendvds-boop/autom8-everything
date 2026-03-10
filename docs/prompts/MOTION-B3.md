# MOTION-B3: Pricing Page Motion + Counter Animation Upgrade + CTA Button System

**Thinking level: medium**
**Branch: `ui/motion-system`**
**Gate: `npm run build`**

---

## Context

B1 built the motion token system and hero. B2 upgraded ServicesBento, HowItWorks, and Testimonials with unique motion signatures and TiltCard interactions. This batch brings motion to the Pricing page, improves the counter animation, and creates a reusable ShimmerButton component.

Read `src/lib/motion.ts` for available tokens. Read `src/components/TiltCard.tsx` for the card interaction pattern.

---

## Task 1: Create `src/components/ShimmerButton.tsx`

A CTA button with gradient shimmer sweep on hover and spring-physics press.

**Props:**
```typescript
interface ShimmerButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
}
```

**Implementation:**
- `primary` variant: gradient background `from-[#8B5CF6] to-[#A78BFA]`, white text
- `secondary` variant: transparent bg, `border border-white/20`, white text
- Sizes: `sm` = `px-5 py-2 text-sm`, `md` = `px-6 py-2.5 text-sm`, `lg` = `px-10 py-4 text-lg`
- All variants: `rounded-full font-semibold inline-flex items-center justify-center gap-2`
- Render as `<motion.a>` if `href` provided, `<motion.button>` otherwise
- `whileHover={{ scale: 1.02 }}` / `whileTap={{ scale: 0.98 }}` with `springSnappy` transition

**Shimmer effect (CSS):**
Add to globals.css:
```css
.shimmer-btn {
  position: relative;
  overflow: hidden;
}
.shimmer-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
  transition: none;
}
.shimmer-btn:hover::before {
  animation: shimmer 0.6s ease-out forwards;
}
@keyframes shimmer {
  to { left: 100%; }
}
```
Apply `shimmer-btn` class to the primary variant only.

**Mobile ripple (CSS):**
```css
.shimmer-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--ripple-x, 50%) var(--ripple-y, 50%), rgba(255,255,255,0.2) 0%, transparent 60%);
  opacity: 0;
  transform: scale(0);
  border-radius: inherit;
}
.shimmer-btn:active::after {
  animation: ripple 0.4s ease-out forwards;
}
@keyframes ripple {
  to { opacity: 0; transform: scale(2.5); }
}
```

**Reduced motion:** Skip `whileHover`/`whileTap` when `useReducedMotion` returns true. CSS shimmer and ripple still work (they're visual, not motion-sensitive).

---

## Task 2: Upgrade `src/components/Stats.tsx` Counter

Replace the current `setInterval` counter with a smoother spring-based animation.

**Changes:**
1. Replace `Counter` component internals:
   - Use `useSpring` from `motion/react` to animate the count value
   - When `inView` becomes true, call `motionValue.set(targetValue)`
   - Use `useMotionValueEvent` to read the spring value and update display state
   - Spring config: `{ stiffness: 50, damping: 20 }` — slow, dramatic count

2. Wrap each stat in `staggerContainer`/`staggerItem` pattern:
   ```tsx
   <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
     {stats.map(stat => (
       <motion.div key={stat.label} variants={staggerItem}>
         <Counter ... />
       </motion.div>
     ))}
   </motion.div>
   ```

3. The large number display should use `gradient-text` class (already applied) — keep it.

4. Add `will-change-transform` to animated elements.

---

## Task 3: Add Motion to `src/app/pricing/page.tsx`

The pricing page is currently static (no Framer Motion). Add the motion system.

**This is a page component with `export const metadata` — it must remain a Server Component for metadata.**

**Strategy:** Create a new client component `src/app/pricing/PricingPageClient.tsx` and import it from `page.tsx`. Move all JSX into the client component. Keep metadata export in `page.tsx`.

**Motion treatment for PricingPageClient:**

1. **Page hero section:** `fadeUp` variant on heading and subheading

2. **Product cards (Cadence, Review Funnel):** 
   - Wrap in `staggerContainer`
   - Each card: `scaleIn` variant + `<TiltCard>` wrapper
   - Featured cards get `glass-card` class from B2

3. **Website tier cards (Launch, Enterprise):**
   - `staggerContainer` wrapper on the grid
   - Each tier: `scaleIn` variant
   - Featured (Enterprise): additional `whileInView` scale to 1.03 before settling to 1.0:
     ```typescript
     const featuredScale: Variants = {
       hidden: { opacity: 0, scale: 0.9 },
       visible: { 
         opacity: 1, scale: 1,
         transition: { type: "spring", stiffness: 80, damping: 12, mass: 0.8 }
       },
     };
     ```
   - The spring overshoot on `stiffness: 80, damping: 12` will naturally cause it to pop slightly larger then settle.

4. **Monthly plans section:** `fadeUp` stagger

5. **FAQ section:** `fadeUp` stagger on each Q&A

6. **All CTA buttons on the page:** Replace with `<ShimmerButton>` component

7. **Add "use client" directive** to PricingPageClient.tsx. Import `motion`, `useReducedMotion`, motion tokens, TiltCard, ShimmerButton.

---

## Task 4: Update `src/components/CTA.tsx`

Replace the plain `<a>` buttons with `<ShimmerButton>`:
- Primary CTA: `<ShimmerButton href="tel:+14806313993" size="lg" variant="primary">`
- Secondary CTA: `<ShimmerButton href="/contact" size="lg" variant="secondary">`

Keep the existing animated gradient background (it already looks good). Keep all copy unchanged.

---

## Files to create
- `src/components/ShimmerButton.tsx` — NEW
- `src/app/pricing/PricingPageClient.tsx` — NEW (extracted from page.tsx)

## Files to modify
- `src/app/globals.css` — add shimmer + ripple keyframes
- `src/components/Stats.tsx` — spring-based counter
- `src/app/pricing/page.tsx` — refactor to use PricingPageClient
- `src/components/CTA.tsx` — ShimmerButton integration

## Files to NOT modify
- Hero.tsx, ServicesBento.tsx, HowItWorks.tsx, Testimonials.tsx (done in B1/B2)
- Service pages (done in B4)
- Navigation.tsx (done in B5)

---

## Gate
```bash
npm run build
```

Build must succeed with zero errors.

---

## Procurement Contract
Every coder batch must terminate immediately after the required gates for that batch are satisfied and the code is committed and pushed. Coders must not start local servers, run manual verification loops, open-ended exploratory tests, or invent post-gate validation steps. Every batch must end with a git commit and push to the project branch. If a batch makes no code changes, the coder must write a status/log entry (e.g., append to docs/deploy-log.md) and commit+push it. Coders MUST notify Steve as the final step after git push by POSTing to `http://localhost:18789/hooks/agent` with `Authorization: Bearer KyCiiWTXATTqCayTrPyoE9krcBzXFP7YPtzqEGlA1aA=` and body `{"message":"Batch complete. Gate ready.","agentId":"main","deliver":false}`. Write the JSON to a temp file and use `curl.exe --data-binary @file` to avoid shell escaping issues. Coders do NOT need to set up git credentials. The orchestrator handles PAT configuration pre-flight.
