# Product Cards Enterprise Redesign Blueprint

> **Scope:** ServicesBento product grid (5 cards) + PricingOverview section on homepage.  
> **Goal:** Elevate from "list-like & cheap" to polished, enterprise-grade product + pricing cards.  
> **Constraint:** No new dependencies. Same dark/purple theme. Architect doc only — no code changes.

---

## 1. Problem Statement

The current cards have three issues:

1. **Flat hierarchy** — Every card is the same surface (`#111118`, `border-white/[0.04]`, icon → title → paragraph → link). There's no visual weight system. Cadence is "featured" only by being full-width; its interior treatment is nearly identical to the rest.
2. **Pricing is either missing or dumped** — The ServicesBento cards have zero pricing context. PricingOverview exists as a separate section with plain text tiers. This creates a disconnect: you see the products, scroll past multiple sections, then finally see prices. Pricing should live *with* the product, not after it.
3. **No value anchoring** — Cards read like feature descriptions. There's no visual progression from "what this is" → "what it costs" → "why it's worth it" → "act now." Enterprise SaaS cards use deliberate content hierarchy to guide the eye.

### What we're NOT changing
- Copy/messaging tone (Austen's voice stays)
- Color palette (purple/cyan/dark base)
- Existing motion system (`motion.ts` presets)
- Section order on homepage (ServicesBento stays where it is)
- Component file structure

---

## 2. Card Design System

### 2.1 Content Hierarchy (top → bottom within each card)

Every product card follows this anatomy, with layers that can be shown or hidden per-product:

```
┌─────────────────────────────────────────────┐
│  [EYEBROW]          e.g. "AI Voice Agent"   │  ← category/tag, subtle
│                                              │
│  [PRODUCT NAME]     e.g. "Cadence"          │  ← largest text, brand weight
│                                              │
│  [VALUE PROP]       1-line benefit hook      │  ← what it does for YOU
│                                              │
│  [PRICING ANCHOR]   "$199/mo" or "From $799" │  ← visual price callout
│  [PRICE CONTEXT]    "7-day free trial"       │  ← de-risk / qualify
│                                              │
│  [MICRO-PROOF]      "Live in 5 min" / icon   │  ← trust signal, tiny
│                                              │
│  [CTA]              Button or link           │  ← single clear action
└─────────────────────────────────────────────┘
```

**Key rules:**
- Pricing anchor is ALWAYS visible — no card hides its price. If pricing is variable, show "From $X" or "Custom quote."
- Value prop is ONE sentence, not a feature list. Features live on service detail pages.
- Micro-proof is a single trust chip (e.g., "No contracts", "Live in 5 min", "Avg 4.8★ increase") — not a bullet list.

### 2.2 Card Tiers (Visual Weight)

Three visual tiers, not just "featured" vs "not featured":

| Tier | Usage | Visual Treatment |
|---|---|---|
| **Hero Card** | Cadence (1 card) | Full-width, double height, gradient border ring, interior gradient wash, glow shadow always-on, dual CTA buttons, badge pill |
| **Primary Card** | Website + SEO (2 cards) | Standard grid cell, subtle gradient border on hover, single CTA button (filled), price prominent |
| **Secondary Card** | Review Funnel + Custom Tools (2 cards) | Standard grid cell, text-link CTA, price shown but lighter weight, "supporting cast" feel |

This creates deliberate visual hierarchy: Cadence dominates → Website/SEO feel substantial → Review Funnel/Custom feel accessible but clearly secondary.

### 2.3 Typography Scale (within cards)

| Element | Size | Weight | Color | Font |
|---|---|---|---|---|
| Eyebrow | `text-xs` / `tracking-[0.16em]` / `uppercase` | `font-medium` | `#8B5CF6` | Inter |
| Product Name | `text-2xl md:text-3xl` (hero) / `text-xl` (others) | `font-bold` | `#FFFFFF` | Playfair Display |
| Value Prop | `text-[15px]` / `leading-relaxed` | `font-normal` | `#A1A1AA` | Inter |
| Pricing Anchor | `text-3xl` (hero) / `text-xl` (primary) / `text-lg` (secondary) | `font-bold` | `#FFFFFF` | Inter |
| Price Context | `text-xs` | `font-normal` | `#71717A` (zinc-500) | Inter |
| Micro-Proof | `text-xs` | `font-medium` | `#A78BFA` | Inter |
| CTA Text | `text-sm` | `font-semibold` | white (filled) or `#A78BFA` (text link) | Inter |

**Product Name uses Playfair Display** — this is the key elevation. Currently card titles use Inter like everything else. Giving product names the serif font creates immediate premium feel and separates them from body copy.

### 2.4 Spacing Scale

| Token | Value | Usage |
|---|---|---|
| Card outer padding | `p-8` (hero: `p-10`) | Internal breathing room |
| Eyebrow → Product Name | `mb-2` (8px) | Tight — they're a unit |
| Product Name → Value Prop | `mb-3` (12px) | Readable separation |
| Value Prop → Pricing | `mb-5` (20px) | Visual break before price — creates "reveal" moment |
| Pricing → Price Context | `mt-1` (4px) | Tight — context is subordinate |
| Pricing block → Micro-Proof | `mb-4` (16px) | Breathing room |
| Micro-Proof → CTA | `mt-auto` | Push to bottom, consistent alignment |
| Grid gap | `gap-6` | Tighter than current `gap-8` — cards feel more like a cohesive system |
| Hero card → Grid | `mb-6` | Consistent with grid gap |

### 2.5 Visual Tokens

#### Surfaces

| Token | Value | Usage |
|---|---|---|
| Card base | `bg-[#111118]` | All cards |
| Hero card wash | `bg-gradient-to-br from-[#8B5CF6]/[0.06] via-transparent to-[#06B6D4]/[0.04]` | Overlay inside hero card only |
| Hover wash | `bg-gradient-to-br from-[#8B5CF6]/[0.04] to-transparent` | All cards on hover |

#### Borders

| State | Treatment |
|---|---|
| Default | `border border-white/[0.06]` — slightly more visible than current `0.04` |
| Hero default | `border border-[#8B5CF6]/20` — always has hint of purple |
| Hover (all) | `border-[#8B5CF6]/40` |
| Focus-visible | `outline: 2px solid #8B5CF6; outline-offset: 2px` (existing global rule) |

#### Shadows & Glow

| State | Treatment |
|---|---|
| Default | `shadow-none` — clean at rest |
| Hero default | `shadow-[0_0_60px_rgba(139,92,246,0.06)]` — subtle ambient glow |
| Hover (all) | `shadow-[0_0_80px_rgba(139,92,246,0.10)]` — lift glow intensifies |
| Hero hover | `shadow-[0_0_100px_rgba(139,92,246,0.14)]` — stronger glow |

#### Accent Details

- **Badge pill** (hero card only): `bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-[#A78BFA]` — current treatment is good, keep it.
- **Icon container**: `w-11 h-11 rounded-xl bg-[#8B5CF6]/[0.12]` — slightly smaller than current `w-12 h-12`, tighter radius. Icon: `w-5 h-5 text-[#8B5CF6]`.
- **Pricing divider**: A subtle `h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent` line between value prop and pricing block. Creates visual "section" within the card without feeling heavy.
- **Micro-proof chip**: `inline-flex items-center gap-1.5 text-xs text-[#A78BFA]` with a small icon (checkmark or similar from Lucide). Not a badge — just styled inline text.

### 2.6 Interaction States

| State | Card Behavior | Reduced Motion Fallback |
|---|---|---|
| **Rest** | Static, clean surface | Same |
| **Hover** | `translateY(-4px)`, border brightens to `#8B5CF6/40`, glow shadow appears, gradient wash fades in, icon scales to 1.08 | Border brightens, glow appears (no transform) |
| **Focus-visible** | Purple outline ring (global rule), no transform | Same |
| **Active/Press** | `translateY(-2px)` (settles slightly from hover) | Border brightens only |

**Timing:**
- Transform: `duration: 0.3s`, ease: `[0.4, 0, 0.2, 1]`
- Border/shadow: `transition-all duration-300`
- Gradient wash: `transition-opacity duration-500`

**Reduced motion:** Use existing `useReducedMotion()` hook. When true, skip all `translateY` and `scale` transforms. Keep color/opacity transitions (they're non-vestibular).

---

## 3. Per-Card Content Specifications

### Card 1: Cadence (Hero Card — full width)

```
Eyebrow:       "AI Voice Agent"
Badge:          "FREE TRIAL"
Product Name:   "Cadence"
Value Prop:     "Never miss another customer call. AI answers 24/7, books appointments, handles FAQs."
Pricing:        "$199/mo"
Price Context:  "after 7-day free trial · no contracts"
Micro-Proof:    "✓ Live in 5 minutes"
Primary CTA:    "Start Free Trial" (filled gradient button)
Secondary CTA:  "Learn More" (ghost button)
```

**Layout:** Two-column on `md+`. Left: text content stack. Right: A styled pricing "module" (not a separate card — an inset region with slightly different surface `bg-[#0A0A0F]/40 rounded-2xl p-6` showing the price, context, and proof prominently). This replaces the current CadenceHighlight approach of having a separate pricing card — now it's integrated.

**Why this works:** The price isn't floating in a sidebar card; it's an intentional focal zone within the hero card. Feels integrated, not bolted on.

### Card 2: Website Creation (Primary Card)

```
Eyebrow:       "Web Development"
Product Name:   "Websites That Convert"
Value Prop:     "Fast, clean sites designed to show up on Google and get you more calls."
Pricing:        "From $799"
Price Context:  "one-time · 3 tiers available"
Micro-Proof:    "✓ Launch in 2 weeks"
CTA:            "View Packages" (filled button, smaller than hero)
```

**No tier breakdown on the card.** The current PricingOverview dumps "Launch $799 · Scale $1,499 · Custom $2,499+" which is info overload for a homepage card. "From $799" anchors value. "3 tiers available" signals there are options. Detail lives on `/services/website-creation`.

### Card 3: SEO & Content (Primary Card)

```
Eyebrow:       "Search & Content"
Product Name:   "Monthly SEO"
Value Prop:     "Blog posts, ranking improvements, and local visibility — every month."
Pricing:        "From $500/mo"
Price Context:  "monthly · no long-term contracts"
Micro-Proof:    "✓ Results within 90 days"
CTA:            "Get Started" (filled button)
```

### Card 4: Review Funnel (Secondary Card)

```
Eyebrow:       "Reputation"
Product Name:   "Review Autopilot"
Value Prop:     "Automatically collect 5-star reviews. Catch bad experiences privately."
Pricing:        "From $149/mo"
Price Context:  "per location"
Micro-Proof:    "✓ Avg 4.8★ increase"
CTA:            "Learn More →" (text link)
```

**Note:** If actual pricing for Review Funnel isn't set yet, use "Custom quote" with context "based on volume." The point is every card has a price anchor — even if approximate. A card without a price feels unfinished.

### Card 5: Custom Tools (Secondary Card)

```
Eyebrow:       "Custom Build"
Product Name:   "Custom Apps"
Value Prop:     "Dashboards, booking systems, internal tools — built around how you work."
Pricing:        "Custom quote"
Price Context:  "scoped after discovery call"
Micro-Proof:    "✓ Your workflow, not ours"
CTA:            "Tell Us What You Need →" (text link)
```

**Custom Tools is the only card without a numeric price.** That's fine — "Custom quote" is honest and expected for bespoke work. The micro-proof ("Your workflow, not ours") reinforces the value of custom.

---

## 4. Grid Layout

### Current
```
[  Cadence — full width  ]
[ Card 2 ]  [ Card 3 ]
[ Card 4 ]  [ Card 5 ]
```

### Proposed (same structure, refined proportions)

```
┌─────────────────────────────────────────────┐
│  CADENCE (hero card, full width)            │
│  Two-column interior: copy | pricing zone   │
└─────────────────────────────────────────────┘
      gap-6
┌──────────────────┐  ┌──────────────────┐
│  Website (primary)│  │  SEO (primary)    │
│  min-h-[280px]   │  │  min-h-[280px]   │
└──────────────────┘  └──────────────────┘
      gap-6
┌──────────────────┐  ┌──────────────────┐
│  Reviews (second) │  │  Custom (second)  │
│  min-h-[240px]   │  │  min-h-[240px]   │
└──────────────────┘  └──────────────────┘
```

**Key changes:**
- Replace `auto-rows-[220px]` with `min-h` per row tier. Primary cards are taller (more content with pricing). Secondary cards are slightly shorter.
- Primary row uses `min-h-[280px]` — enough for full hierarchy without cramming.
- Secondary row uses `min-h-[240px]` — still generous but signals lighter weight.
- On mobile (`< md`), all cards stack single-column. Hero card's two-column interior collapses to stacked.

---

## 5. Eliminating PricingOverview

**PricingOverview becomes redundant.** Once every product card carries its own pricing anchor + context, the separate PricingOverview section is duplicative information that interrupts the page flow.

**Action:** Remove `<PricingOverview />` from `HomePageClient.tsx` import and render. Keep `PricingOverview.tsx` file for potential use on `/pricing` route.

This tightens the homepage and prevents the "I already saw this info" feeling.

---

## 6. CadenceHighlight Consolidation

The current homepage has:
1. Cadence as featured card in ServicesBento (with pricing)
2. CadenceHighlight as a separate section (with pricing, again)

This is redundant. Two options:

**Option A (Recommended): Remove CadenceHighlight from homepage.** The hero card in ServicesBento now carries all the Cadence info (pricing, CTA, proof). CadenceHighlight's value prop copy can be absorbed into the hero card. Keep `CadenceHighlight.tsx` for use on `/services/cadence` page.

**Option B: Keep CadenceHighlight but strip pricing.** Transform it into a pure "social proof / deeper story" section — testimonial quote, demo embed, or expanded feature explanation. No duplicate pricing.

**Recommendation: Option A.** Fewer sections = tighter page = more premium feel. Enterprise sites don't repeat the same product twice on one page.

### Updated Homepage Section Order

```
Navigation (fixed)
Hero
SocialProofBar
ServicesBento (all 5 cards with integrated pricing)
WhoItsFor
HowItWorks
Testimonials
FAQ
CTA
Footer
```

Removed: `CadenceHighlight`, `PricingOverview`, `Stats` (per existing blueprint).

---

## 7. Accessibility Requirements

| Requirement | Implementation |
|---|---|
| **Card as landmark** | Each card wraps content in `<article>` with `aria-label="{Product Name}"`. Screen readers announce "Cadence, article" etc. |
| **Price readability** | Pricing anchor uses `aria-label="Price: $199 per month"` (screen readers don't parse "$199/mo" well). |
| **CTA clarity** | Button text must be unique per card. No generic "Learn More" × 3. Current copy is already good here. |
| **Color contrast** | Price context at `#71717A` on `#111118` = 3.5:1 — passes AA for supplementary text (≥14px). Do NOT use for essential info. |
| **Focus order** | Tab order follows visual order: top-left → right → next row. Cards are focusable via CTA links/buttons inside them, not the card wrapper itself. |
| **Reduced motion** | Per §2.6 — transforms skip, opacity/color transitions remain. |
| **Touch targets** | All CTA buttons: min `h-11` (44px). Text-link CTAs: ensure `py-2` padding for 44px touch target. |

---

## 8. Performance Constraints

| Rule | Rationale |
|---|---|
| Zero new dependencies | All achievable with Tailwind + existing framer-motion |
| No new images/assets | Cards are typography + layout. No illustrations, no product screenshots. |
| No new fonts | Playfair Display already loaded — just apply it to product names |
| Fewer sections rendered | Removing PricingOverview + CadenceHighlight = less DOM, less JS, fewer animation observers |
| Card gradient washes use CSS only | No framer-motion `animate` for background gradients — use `transition-opacity` on a pseudo-element or Tailwind's `group-hover:` |
| Icon containers: no SVG animation | Static icons only. The `group-hover:scale-110` on icons is fine (CSS transform, GPU-accelerated). |

---

## 9. Implementation Checklist

The coder should execute these in order, in a single pass:

### Phase 1: Data & Structure

- [ ] **Update `products` array in `ServicesBento.tsx`** — Add to each product object: `eyebrow`, `productName`, `price`, `priceContext`, `microProof` fields. Map the content from §3 above.
- [ ] **Remove `featured` boolean** — Replace with a `tier: 'hero' | 'primary' | 'secondary'` field.
- [ ] **Add tier-specific rendering logic** — Three render paths based on `tier` value (hero card, primary card, secondary card).

### Phase 2: Hero Card Interior

- [ ] **Restructure hero card layout** — Two-column grid on `md+` (`grid grid-cols-1 md:grid-cols-[1fr,auto]`). Left column: eyebrow → badge → product name → value prop → CTAs. Right column: pricing zone inset (`bg-[#0A0A0F]/40 rounded-2xl p-6`).
- [ ] **Apply Playfair Display** to product name via `style={{ fontFamily: "var(--font-playfair), serif" }}`.
- [ ] **Add gradient border** — Hero card gets `border-[#8B5CF6]/20` default, `border-[#8B5CF6]/40` hover.
- [ ] **Add always-on ambient glow** — `shadow-[0_0_60px_rgba(139,92,246,0.06)]`.
- [ ] **Add pricing divider line** — `h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent` between value prop and pricing.

### Phase 3: Primary & Secondary Cards

- [ ] **Apply full content hierarchy** — Eyebrow → product name (Playfair) → value prop → divider → pricing anchor → price context → micro-proof → CTA.
- [ ] **Primary cards: filled CTA button** — `px-5 py-2.5 rounded-full bg-[#8B5CF6] text-white text-sm font-semibold hover:bg-[#7C3AED]`.
- [ ] **Secondary cards: text-link CTA** — `text-[#A78BFA] hover:text-[#8B5CF6] font-medium text-sm` with arrow.
- [ ] **Adjust row heights** — Primary row: `min-h-[280px]`. Secondary row: `min-h-[240px]`. Remove `auto-rows-[220px]`.
- [ ] **Slightly muted secondary card pricing** — Price anchor at `text-lg` instead of `text-xl`. Same `#FFFFFF` color but smaller scale signals "supporting."

### Phase 4: Visual Polish

- [ ] **Increase border visibility** — All cards: `border-white/[0.06]` (up from `0.04`).
- [ ] **Add pricing divider** to all cards (not just hero).
- [ ] **Add micro-proof chip styling** — `inline-flex items-center gap-1.5 text-xs text-[#A78BFA] font-medium` with Lucide `Check` icon (`w-3.5 h-3.5`).
- [ ] **Tighten grid gap** — `gap-6` (from `gap-8`).
- [ ] **Hero card mb** — `mb-6` (matching grid gap).
- [ ] **Hover state refinement** — `translateY(-4px)` (from `-6px`), slower gradient wash fade-in (`duration-500`).

### Phase 5: Cleanup

- [ ] **Remove `<PricingOverview />` from `HomePageClient.tsx`** — Remove import and render. Keep file.
- [ ] **Remove `<CadenceHighlight />` from `HomePageClient.tsx`** — Remove import and render. Keep file.
- [ ] **Remove CadenceHighlight import from `HomePageClient.tsx`**.
- [ ] **Update section order** — Should read: Navigation → Hero → SocialProofBar → ServicesBento → WhoItsFor → HowItWorks → Testimonials → FAQ → CTA → Footer.
- [ ] **Wrap each card in `<article>`** with `aria-label`.
- [ ] **Add `aria-label` to pricing anchors** (e.g., `aria-label="Price: $199 per month"`).

### Phase 6: Validate

- [ ] `npm run build` passes
- [ ] `npm run lint` passes (or pre-existing warnings only)
- [ ] Visual: All 5 cards have visible pricing
- [ ] Visual: Cadence card is clearly dominant
- [ ] Visual: Primary cards feel substantial, secondary cards feel intentional (not neglected)
- [ ] Visual: No card looks like a bulleted list dump
- [ ] Keyboard: Tab through all cards, focus ring visible on every CTA
- [ ] Reduced motion: Toggle in devtools, verify no transforms fire
- [ ] Mobile: All cards stack cleanly, no horizontal overflow

---

## 10. Acceptance Criteria & Visual Quality Gates

### Must-Pass (blockers)

1. **Every card shows a price or "Custom quote"** — No card without a pricing anchor.
2. **Cadence card is visually 2× the presence of any other card** — Larger, glowing, gradient-washed, dual CTA.
3. **Product names use Playfair Display** — Visible serif/sans contrast between product name and body text.
4. **No bullet lists visible on any card** — Zero `<ul>` / `<li>` elements inside cards. All info is structured hierarchy.
5. **Pricing divider line visible** — Subtle gradient line separates value prop from pricing zone on every card.
6. **Build passes** with zero new errors.
7. **PricingOverview and CadenceHighlight removed from homepage render.**

### Should-Pass (quality bar)

8. **Hover lifts feel smooth** — 300ms ease, no jank, shadow appears gracefully.
9. **Cards feel like they belong to the same system** — Consistent spacing, alignment, typography scale across all 5.
10. **Mobile layout has no cramped cards** — Min padding `p-6` on mobile, `p-8` on `md+`.
11. **Micro-proof chips are visually consistent** — Same size, color, icon treatment across all cards.
12. **Grid gap feels tight and intentional** — Cards read as a cohesive product suite, not separate unrelated boxes.

### Nice-to-Have

13. **Subtle stagger animation** on scroll — Cards 2-5 enter with 100ms stagger delay per card.
14. **Hero card pricing zone has a faint inner glow** — `shadow-inner` or `box-shadow: inset 0 0 40px rgba(139,92,246,0.04)`.

---

## 11. What This Does NOT Cover

- **Service detail page redesign** — Only homepage cards. `/services/*` pages untouched.
- **New copy** — Blueprint provides content structure, not copywriting. The copy values in §3 are suggestions; Austen should review/approve final wording.
- **Pricing strategy** — "From $149/mo" for Review Funnel is a placeholder. If actual pricing differs, substitute. The design system works regardless of the specific numbers.
- **A/B testing** — No split test infrastructure. Ship it, measure with existing analytics.
- **Mobile-specific card variants** — Cards are responsive via Tailwind breakpoints, not separate mobile components.

