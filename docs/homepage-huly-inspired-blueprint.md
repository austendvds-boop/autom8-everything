# Homepage UI Refresh Blueprint — Huly-Inspired Design Language

> **Scope:** Homepage only (`HomePageClient.tsx` + its component imports). No other routes.
> **Constraint:** Inspired by huly.io design principles — no copied assets, code, or trademarks.
> **Brand:** Autom8 Everything identity preserved (colors, logo, copy voice).

---

## 1. Design Language Analysis (What We're Drawing From)

Huly.io's homepage uses these design principles we want to adapt:

| Huly Pattern | Autom8 Adaptation |
|---|---|
| Deep black background with subtle warm/cool glow zones | Keep `#0A0A0F` base; add localized radial glow regions per section instead of flat bg alternation |
| Large cinematic hero with product screenshot as focal point | Full-viewport hero with a single compelling visual element (abstract glow composition, not a product screenshot) |
| Generous vertical whitespace between sections (120–160px) | Increase section padding from `py-24` (96px) to `py-32`/`py-40` (128–160px) |
| Feature sections with UI mockup screenshots as proof | Replace icon-only service cards with richer visual cards (gradient surfaces, subtle illustrations) |
| Bold serif headlines, clean sans body | Already using Playfair Display + Inter — strengthen the contrast |
| Minimal nav that feels floating | Already have glass nav — refine to true floating pill (inset from edges, rounded-full on scroll) |
| Smooth section reveals on scroll, not bouncy | Shift from spring-based framer-motion to eased `power3.out` reveals |
| Dark card surfaces with very subtle borders (`white/5`) | Already present — add hover glow halos |
| CTA sections with saturated gradient backgrounds | Already present in `CTA.tsx` — keep |
| Feature grids: 2×3 or 3-col with generous card padding | Refine bento grid to be more spacious |

---

## 2. Visual System Changes

### 2.1 Layout & Spacing

| Token | Current | New | Applies To |
|---|---|---|---|
| `--section-py-default` | `py-24` (96px) | `py-32` (128px) | All homepage sections |
| `--section-py-hero` | `min-h-screen` | `min-h-[100dvh]` | Hero |
| `--section-py-large` | n/a | `py-40` (160px) | CTA, Testimonials |
| `--content-max-w` | `max-w-7xl` (1280px) | `max-w-6xl` (1152px) | All sections except CTA (full bleed) |
| `--card-padding` | `p-6` / `p-7` | `p-8` | All cards |
| `--section-gap` | `gap-6` | `gap-8` | Card grids |
| `--heading-mb` | `mb-16` | `mb-20` | Section header to content gap |

### 2.2 Surfaces & Backgrounds

**Current problem:** Sections alternate between `#0A0A0F` and `#12121A` in flat blocks. This creates a banded look.

**New approach:** Unified `#0A0A0F` base for the entire page. Section differentiation via:

1. **Localized glow zones** — Large, soft radial gradients positioned behind specific sections (not full-width bands)
2. **Elevated card surfaces** — Cards use `#111118` with `border border-white/[0.04]` (slightly more transparent than current `white/5`)
3. **Glow halos on hover** — Cards get `box-shadow: 0 0 80px rgba(139,92,246,0.08)` on hover

Specific surface changes:
- `ServicesBento`: Remove `bg-[#12121A]`, use `bg-transparent` with a positioned glow blob behind the grid
- `FAQ`: Remove `bg-[#12121A]`, use `bg-transparent`
- `Testimonials`: Keep `mesh-bg` but soften the radial intensities by 30%
- `Footer`: Keep `bg-[#0A0A0F]` with border-t

### 2.3 Gradients

Add to `globals.css`:

```css
/* Section glow blobs — positioned absolutely behind section content */
.section-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.12;
  pointer-events: none;
}

.section-glow--purple { background: #8B5CF6; }
.section-glow--cyan { background: #06B6D4; }
.section-glow--mixed { background: linear-gradient(135deg, #8B5CF6, #06B6D4); }
```

### 2.4 Typography Scale

| Element | Current | New |
|---|---|---|
| Hero h1 | `text-4xl md:text-6xl lg:text-7xl` | `text-5xl md:text-7xl lg:text-[5.5rem]` — bigger, more cinematic |
| Hero subtitle | `text-lg md:text-xl` | `text-xl md:text-2xl` |
| Section h2 | `text-4xl md:text-5xl` | `text-4xl md:text-5xl lg:text-6xl` — add lg breakpoint |
| Section subtitle | `text-lg` | `text-lg md:text-xl` |
| Card h3 | `text-xl` | `text-xl` (unchanged) |
| Card body | `text-sm` | `text-[15px] leading-relaxed` — slightly larger for readability |
| Hero h1 `font-weight` | `font-semibold` | `font-bold` — more punch |
| Section h2 `letter-spacing` | default | `tracking-[-0.02em]` — tighter like Huly |

### 2.5 Border Radius

| Element | Current | New |
|---|---|---|
| Cards | `rounded-2xl` (16px) | `rounded-3xl` (24px) — softer, more modern |
| CTA buttons | `rounded-full` | `rounded-full` (unchanged) |
| Nav glass bar | implicit | `rounded-full` when scrolled (floating pill style) |

---

## 3. Motion System Tokens

### 3.1 New CSS Custom Properties (add to `:root` in `globals.css`)

```css
/* Motion tokens */
--motion-reveal-duration: 0.7s;
--motion-reveal-ease: cubic-bezier(0.16, 1, 0.3, 1); /* power3.out equivalent */
--motion-hover-duration: 0.3s;
--motion-hover-ease: cubic-bezier(0.4, 0, 0.2, 1);
--motion-stagger-text: 0.06s;
--motion-stagger-card: 0.1s;
--motion-scroll-offset: 30px; /* translateY distance for scroll reveals */
```

### 3.2 Framer Motion Presets (new file: `src/lib/motion.ts`)

```ts
export const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

export const revealStagger = (index: number) => ({
  ...reveal,
  transition: { ...reveal.transition, delay: index * 0.1 },
});

export const cardHover = {
  whileHover: { y: -6, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
};

export const buttonHover = {
  whileHover: { scale: 1.04 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 400, damping: 25 },
};
```

### 3.3 Motion Changes Per Component

| Component | Current Motion | New Motion |
|---|---|---|
| Hero elements | `duration: 0.8`, spring-based button hover | `duration: 0.7`, eased `[0.16,1,0.3,1]`; remove floating background orb animations (replace with static positioned glows for perf) |
| Hero background orbs | Infinite `animate` with `x/y` keyframes | **Remove.** Replace with CSS-only positioned glow blobs (no JS animation overhead) |
| ServicesBento cards | `whileHover: { y: -8 }` | `whileHover: { y: -6 }` — subtler lift |
| SocialProofBar | Infinite horizontal scroll via `animate.x` | Keep but slow down: `duration: 30` (was 20) for more relaxed feel |
| Testimonials carousel | Infinite scroll | Keep; slow to `duration: testimonials.length * 7` |
| Stats counters | `duration: 2000ms` JS interval | Keep (it works) |
| CTA background | Infinite radial gradient keyframe | Keep but slow to `duration: 15` (was 10) |
| HowItWorks connector | `scaleX` animation | Keep |
| FAQ accordion | `duration: 0.3` | Keep |
| **All `whileInView` reveals** | Various durations/delays | Standardize to `reveal` / `revealStagger` presets from `motion.ts` |

### 3.4 Reduced Motion

Current `globals.css` already has `@media (prefers-reduced-motion: reduce)` that kills all animations. This is correct. No change needed, but the coder must ensure any new GSAP or Lenis behaviors also respect this media query.

---

## 4. Exact Components to Modify

### 4.1 File-by-file changelist

| # | File | Changes |
|---|---|---|
| 1 | `src/lib/motion.ts` | **NEW FILE.** Motion preset exports (`reveal`, `revealStagger`, `cardHover`, `buttonHover`). |
| 2 | `src/app/globals.css` | Add motion tokens to `:root`. Add `.section-glow` utility classes. Tighten heading letter-spacing globally. |
| 3 | `src/app/HomePageClient.tsx` | Remove `<Stats />` from between Testimonials and FAQ (merge proof stats into Testimonials section — they're duplicative). Add `<Stats />` removal import cleanup. |
| 4 | `src/components/Navigation.tsx` | On scroll: transition from transparent full-width to floating pill nav (max-w, mx-auto, rounded-full, inset from top ~12px). |
| 5 | `src/components/Hero.tsx` | Remove animated background orbs. Add 2–3 static CSS glow blobs. Increase h1 size. Use `reveal` presets. |
| 6 | `src/components/SocialProofBar.tsx` | Slow marquee to 30s. Reduce vertical padding to `py-8` (tighter). |
| 7 | `src/components/ServicesBento.tsx` | Remove `bg-[#12121A]` section bg. Add positioned section-glow blob. Increase card padding to `p-8`. Cards to `rounded-3xl`. Use `revealStagger` preset. Increase card row height from `200px` to `220px`. |
| 8 | `src/components/CadenceHighlight.tsx` | Increase padding to `py-32`. Add a subtle glow behind the pricing card. Card to `rounded-3xl`. |
| 9 | `src/components/WhoItsFor.tsx` | Increase padding to `py-32`. Cards to `rounded-3xl`, `p-8`. Add hover glow shadow. Use `revealStagger`. |
| 10 | `src/components/Testimonials.tsx` | Increase padding to `py-40`. Absorb proof stats row inline (keep the 3 stat pills above the carousel). Soften mesh-bg radial opacities. Slow carousel. Cards to `rounded-3xl`. |
| 11 | `src/components/HowItWorks.tsx` | Increase padding to `py-32`. Icon containers to `rounded-3xl`. Use `reveal` presets. |
| 12 | `src/components/FAQ.tsx` | Remove `bg-[#12121A]` section bg. FAQ item containers to `rounded-2xl` (keep slightly tighter than cards). Add hover glow. |
| 13 | `src/components/CTA.tsx` | Increase padding to `py-40`. Keep gradient bg as-is. Slow background animation. |
| 14 | `src/components/Footer.tsx` | No visual changes. |
| 15 | `src/components/Stats.tsx` | **Remove from homepage** (import + render). File stays for potential use on other pages. Proof stats already shown in Testimonials. |

### 4.2 Section order (unchanged)

```
Navigation (fixed)
Hero
SocialProofBar
ServicesBento
CadenceHighlight
WhoItsFor
Testimonials  ← now includes proof stats inline
HowItWorks
FAQ
CTA
Footer
```

### 4.3 `max-w` transition

Change inner content containers from `max-w-7xl` to `max-w-6xl` in:
- Hero (already `max-w-5xl` — keep)
- ServicesBento
- CadenceHighlight (already `max-w-5xl` — keep)
- WhoItsFor
- Testimonials
- HowItWorks
- FAQ (already `max-w-3xl` — keep)
- CTA (already `max-w-4xl` — keep)

---

## 5. Accessibility Constraints

| Requirement | Implementation |
|---|---|
| **Reduced motion** | Existing `@media (prefers-reduced-motion: reduce)` in globals.css handles CSS animations. Coder must also wrap framer-motion `whileInView` and `animate` props with `useReducedMotion()` hook — if reduced motion is on, skip `y` transforms and use opacity-only fades. |
| **Color contrast** | All body text (`#A1A1AA` on `#0A0A0F`) = 7.2:1 ratio ✅. Muted text (`#52525B` on `#0A0A0F`) = 3.3:1 — acceptable for supplementary text only. Do NOT use `#52525B` for any interactive or essential text. |
| **Focus states** | Every interactive element (buttons, links, FAQ accordions) must have a visible `focus-visible` ring: `outline: 2px solid #8B5CF6; outline-offset: 2px;`. Add to `globals.css` as a global rule. |
| **Keyboard navigation** | FAQ accordion already uses `<button>` ✅. Testimonials carousel is decorative (no interaction needed). SocialProofBar marquee is decorative. Nav hamburger already has `aria-label` ✅. |
| **Touch targets** | All buttons already ≥44px height ✅. FAQ items have `p-6` ✅. |
| **Skip link** | Add a visually-hidden "Skip to main content" link before `<Navigation />` in `HomePageClient.tsx`. Target: `<main id="main-content">`. |

---

## 6. Performance Guardrails

| Metric | Budget |
|---|---|
| **First Contentful Paint** | < 1.5s |
| **Largest Contentful Paint** | < 2.5s |
| **Total Blocking Time** | < 200ms |
| **Cumulative Layout Shift** | < 0.1 |
| **JS bundle (homepage route)** | < 150KB gzipped (currently framer-motion + lenis + lucide are the main contributors) |
| **No new dependencies** | This refresh adds zero new npm packages. All changes use existing framer-motion, Tailwind, and CSS. |

### Specific perf rules for coder:

1. **Remove Hero animated orbs** — These run infinite JS animation loops via framer-motion's `animate` prop. Replace with CSS-positioned static glow divs (zero JS cost).
2. **No GSAP on homepage** — GSAP is installed for `/b-copy` preview. Do NOT import it on the homepage. Framer-motion + CSS handles everything.
3. **Lazy-load below-fold sections** — Already using `whileInView` with `viewport: { once: true }` which is good. No change needed.
4. **No new images** — This refresh is typography/layout/motion only. Zero new image assets.
5. **No new fonts** — Inter, Playfair Display, JetBrains Mono are already loaded. No additions.
6. **`motion.ts` must be tree-shakeable** — Export individual presets, not a default object.

---

## 7. Implementation Plan

**Estimated effort:** One focused coder session (2–3 hours). All changes are CSS/layout/motion — no data model or API changes.

### Step 1: Foundation (motion.ts + globals.css)
1. Create `src/lib/motion.ts` with the preset exports defined in §3.2.
2. Update `globals.css`:
   - Add motion token custom properties to `:root` (§3.1)
   - Add `.section-glow` utility classes (§2.3)
   - Add global `focus-visible` outline rule (§5)
   - Add `letter-spacing: -0.02em` to section heading utility or apply inline

### Step 2: Navigation floating pill
1. Update `Navigation.tsx`:
   - When `isScrolled`, apply: `max-w-4xl mx-auto mt-3 rounded-full` to the header container
   - Keep glass background
   - Animate transition with framer-motion `layout` or CSS transition

### Step 3: Hero cleanup
1. Remove the two `<motion.div>` animated orb elements
2. Add 2–3 static `<div className="section-glow ...">` elements positioned with `absolute` + percentages
3. Increase h1 to `text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.02em]`
4. Increase subtitle to `text-xl md:text-2xl`
5. Replace inline transition objects with `reveal` imports from `motion.ts`

### Step 4: Section-by-section updates (top to bottom)
Apply changes per §4.1 table. For each component:
1. Swap section bg colors (remove `bg-[#12121A]` where specified)
2. Update padding values
3. Update card border-radius to `rounded-3xl`
4. Update card padding to `p-8`
5. Import and apply `reveal`/`revealStagger`/`cardHover` from `motion.ts`
6. Add `.section-glow` positioned elements where noted

### Step 5: Remove Stats from homepage
1. In `HomePageClient.tsx`: remove `import Stats` and `<Stats />` render
2. Do NOT delete `Stats.tsx` file

### Step 6: Add skip link
1. In `HomePageClient.tsx`, add before `<Navigation />`:
   ```tsx
   <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#8B5CF6] focus:text-white focus:rounded-lg">
     Skip to main content
   </a>
   ```
2. Add `id="main-content"` to the `<main>` tag

### Step 7: Validate
1. `npm run build` — must pass
2. `npm run lint` — must pass (or only pre-existing warnings)
3. Manual: check `prefers-reduced-motion` in browser devtools
4. Manual: verify no layout shifts on load
5. Lighthouse: homepage score ≥ 90 on Performance

---

## 8. Acceptance Checklist

- [ ] `src/lib/motion.ts` exists with `reveal`, `revealStagger`, `cardHover`, `buttonHover` exports
- [ ] `globals.css` has motion tokens, `.section-glow` classes, and global `focus-visible` rule
- [ ] Navigation transitions to floating pill on scroll
- [ ] Hero has no JS-animated background orbs; uses static CSS glow blobs instead
- [ ] Hero h1 is larger (`text-5xl md:text-7xl lg:text-[5.5rem]`) and bolder
- [ ] All homepage sections use unified `#0A0A0F` base (no `#12121A` section backgrounds except inside cards)
- [ ] Section padding is `py-32` minimum (`py-40` for CTA and Testimonials)
- [ ] All cards use `rounded-3xl` and `p-8`
- [ ] All `whileInView` animations use standardized presets from `motion.ts`
- [ ] SocialProofBar marquee duration increased to 30s
- [ ] Testimonials carousel slowed down
- [ ] `<Stats />` component removed from homepage render (file preserved)
- [ ] Skip-to-content link present and functional
- [ ] `focus-visible` outlines visible on all interactive elements
- [ ] `npm run build` passes
- [ ] `npm run lint` passes (or only pre-existing warnings)
- [ ] No new npm dependencies added
- [ ] No GSAP imports on homepage
- [ ] `prefers-reduced-motion` respected (verify opacity-only fallback)
- [ ] Content max-width narrowed to `max-w-6xl` where specified
- [ ] CTA background animation slowed to 15s

---

## 9. What This Does NOT Change

- **Copy/messaging** — All headlines, descriptions, and CTAs stay as-is
- **Page routes** — Homepage only; no other pages touched
- **Data model** — No content or schema changes
- **Dependencies** — Zero new packages
- **Brand colors** — Same purple/cyan/accent palette
- **Fonts** — Same Inter/Playfair/JetBrains stack
- **SEO metadata** — Untouched
- **Footer** — Untouched
- **Mobile menu** — Untouched (works fine)
