# Website Architecture Consolidation Blueprint

> **Author:** Architect Agent  
> **Date:** 2026-03-03  
> **Scope:** CTA taxonomy, funnel deduplication, page-role clarity, nav simplification, copy consistency  
> **Constraint:** Architecture/content/flow cleanup only — preserve premium visual theme, no full redesign, no code changes  
> **Prerequisite docs:** autom8-content-ia-blueprint.md, product-cards-enterprise-blueprint.md

---

## Executive Summary

The site has been through two rounds of good work (content/IA blueprint → product cards enterprise redesign) but the blueprints were applied incrementally, creating layer-on-layer redundancy. The homepage now shows pricing information in **three separate places** (ServicesBento cards, PricingOverview section, and the nav link to /pricing). CTA labels for the same product use different words depending on where they appear. The pricing page is nearly a clone of the homepage PricingOverview section. The contact page has three different action labels that all go to the same destination.

**Root cause:** Each blueprint solved its own problem well, but nobody reconciled the overlap between them. The product cards blueprint added inline pricing to every card (good), but didn't remove the PricingOverview section that was created by the content IA blueprint (which existed precisely because the old cards lacked pricing). Now both exist simultaneously.

**Fix:** One pass to collapse the duplication, enforce a strict CTA label taxonomy, define what each page is FOR, and make the pricing page the canonical detail layer instead of a homepage clone.

---

## 1. CTA Taxonomy — Allowed Labels & Placement Rules

### 1.1 Approved CTA Labels (exhaustive list)

Only these labels may appear on any customer-facing page. No synonyms, no creative variants.

| # | Label | Intent | Destination | Button Style |
|---|---|---|---|---|
| **C1** | `Start Free Trial` | Self-serve Cadence signup | `/cadence/get-started` | Filled gradient (primary) |
| **C2** | `See Plans` | View all pricing details | `/pricing` | Filled solid or ghost (context-dependent) |
| **C3** | `Book a Call` | Schedule consultative conversation | `/contact` | Ghost/outline |
| **C4** | `Learn More` | Navigate to a specific product detail page | `/services/{slug}` | Text link with arrow |
| **C5** | `Send Intake` | Submit the contact form | Form submit action | Filled gradient (form context only) |
| **C6** | `Tell Us What You Need` | Custom/bespoke inquiry | `/contact` | Text link with arrow |

### 1.2 Retired Labels (must not appear anywhere)

| Retired Label | Replacement | Reason |
|---|---|---|
| `View Packages` | `See Plans` (C2) | Product-specific; inconsistent with global pricing language |
| `View Website Packages` | `See Plans` (C2) | Same — overly specific, creates label sprawl |
| `Get Started` | `See Plans` (C2) or `Start Free Trial` (C1) | Ambiguous — "get started" with what? |
| `Book a Quick Call` | `Book a Call` (C3) | "Quick" is filler — every call is quick. Simpler is clearer. |
| `Book a 15-Minute Call` | `Book a Call` (C3) | Duration is a detail, not a label |
| `Book Your Strategy Call` | `Book a Call` (C3) | "Strategy call" is agency jargon |
| `See What We Can Do` | Remove entirely | Vague scroll-to-section CTA — replaced by direct routing |
| `Go to intake form` | Remove entirely | Meta-label ("go to form") — the form IS on the contact page already |
| `Take 2 minutes to tell us about your business` | `Tell Us What You Need` (C6) or just a link to `/contact` | Too wordy for a CTA |
| `See Services & Pricing` | `See Plans` (C2) | Redundant compound label |

### 1.3 Placement Rules

| Page/Section | Primary CTA | Secondary CTA | Tertiary (text link) |
|---|---|---|---|
| **Nav bar (desktop)** | C1: `Start Free Trial` | — | — |
| **Nav bar (mobile menu)** | C1: `Start Free Trial` | — | — |
| **Hero** | C2: `See Plans` | C1: `Start Free Trial` | — |
| **ServicesBento — Cadence card** | C1: `Start Free Trial` | C4: `Learn More` → /services/cadence | — |
| **ServicesBento — Website card** | C2: `See Plans` | — | — |
| **ServicesBento — SEO card** | C2: `See Plans` | — | — |
| **ServicesBento — Review card** | — | — | C4: `Learn More` → /services/review-funnel |
| **ServicesBento — Custom card** | — | — | C6: `Tell Us What You Need` → /contact |
| **Bottom CTA section** | C1: `Start Free Trial` | C3: `Book a Call` | — |
| **Pricing page (per product row)** | Product-appropriate: C1 for Cadence, C3 for others | — | C4: `Learn More` per product |
| **Contact page** | C5: `Send Intake` (form) | C1: `Start Free Trial` (sidebar) | — |
| **Product detail pages** | Product-appropriate: C1 for Cadence, C2 for priced products, C3 for Custom | — | — |
| **Footer** | None (navigation links only) | — | — |

### 1.4 The "See Plans" Rule

`See Plans` is the universal pricing CTA. It always goes to `/pricing`. It never goes to a product-specific page. The pricing page is the single source of truth for "what does this cost?" — individual product pages provide feature/scope detail, not pricing comparison.

**Exception:** Cadence hero card uses `Start Free Trial` (C1) instead of `See Plans` because Cadence has a self-serve signup flow. The trial IS the plan entry point.

---

## 2. Funnel Map by Product

### 2.1 Cadence (AI Phone Answering)

```
Discovery                    Consideration              Conversion
─────────                    ─────────────              ──────────
Homepage hero CTA ──────────→ /pricing (sees $199/mo) ──→ /cadence/get-started
Homepage Cadence card ──────→ /services/cadence ────────→ /cadence/get-started
Nav "Start Free Trial" ─────→ /cadence/get-started (direct)
Bottom CTA section ─────────→ /cadence/get-started (direct)
```

**Key:** Cadence is the only product with a direct-to-conversion path that skips pricing. The free trial IS the conversion. No call needed.

### 2.2 Website Creation

```
Discovery                    Consideration              Conversion
─────────                    ─────────────              ──────────
Homepage Website card ──────→ /pricing (sees tiers) ────→ /contact (intake form)
                             ↕ (cross-link)
                             /services/website-creation → /contact (intake form)
```

**Key:** Website is always consultative. `See Plans` routes to /pricing where tiers are visible. User then self-qualifies and submits intake or books a call. The product detail page at /services/website-creation provides scope examples, portfolio, and process — not pricing (pricing lives on /pricing).

### 2.3 Review Funnel

```
Discovery                    Consideration              Conversion
─────────                    ─────────────              ──────────
Homepage Review card ───────→ /services/review-funnel ──→ /contact (intake form)
                             ↕ (cross-link)
                             /pricing (sees $149/mo) ───→ /contact (intake form)
```

**Key:** Review Funnel is a secondary card with a `Learn More` text link. It routes to the product page first (because the concept needs explanation), then to contact. Price is visible on /pricing.

### 2.4 SEO & Content

```
Discovery                    Consideration              Conversion
─────────                    ─────────────              ──────────
Homepage SEO card ──────────→ /pricing (sees from $500) → /contact (intake form)
                             ↕ (cross-link)
                             /services/seo-content ─────→ /contact (intake form)
```

**Key:** Same pattern as Website. `See Plans` from homepage card → pricing page → contact.

### 2.5 Custom Apps

```
Discovery                    Consideration              Conversion
─────────                    ─────────────              ──────────
Homepage Custom card ───────→ /contact (intake form, direct)
```

**Key:** Custom has no pricing page entry and no product detail page CTA that routes through pricing. "Custom quote" means the conversation IS the pricing discovery. `Tell Us What You Need` goes straight to contact. The /pricing page mentions Custom Apps with "Custom quote — tell us what you need" but doesn't pretend to show a price.

---

## 3. Page-Role Map

### 3.1 Role Definitions

| Page | Role | What it DOES | What it does NOT do |
|---|---|---|---|
| **Homepage** (`/`) | **Anchor + Route** | Establishes identity, presents all 5 products with outcome hooks and inline price anchors, routes to pricing or product pages | Does NOT duplicate the pricing page layout. Does NOT contain a standalone pricing section. |
| **Pricing** (`/pricing`) | **Canonical Plan Detail** | Single source of truth for all pricing. Shows every product's price, tier breakdown, what's included per tier, comparison context. This is where "what does it cost?" gets answered completely. | Does NOT repeat homepage marketing copy. Does NOT have its own hero/testimonials/social proof. |
| **Product Pages** (`/services/*`) | **Feature + Scope Detail** | Explains what the product does, how it works, what's included, scope examples, process timeline. Provides enough info to make a product-specific buy decision. | Does NOT show full pricing tables (links to /pricing for that). May show a single price anchor for context. |
| **Contact** (`/contact`) | **Intake + Conversion** | Captures leads via intake form. Offers call booking as secondary path. Cadence trial as escape hatch for people who want to try before talking. | Does NOT re-pitch products. Does NOT show pricing. |
| **About** (`/about`) | **Trust + Identity** | Who Autom8 is, why it exists, who's behind it. | Does NOT sell products. No CTAs beyond "Contact" or "See Plans." |
| **Blog** (`/blog`) | **SEO + Education** | Drives organic traffic, establishes expertise. | Does NOT have aggressive product CTAs in every post. Subtle footer CTA at most. |

### 3.2 The Redundancy This Eliminates

**Before (current state):**
- User sees Cadence pricing on: homepage card, PricingOverview section, /pricing page, /services/cadence page = **4 places**
- User sees Website tiers on: PricingOverview section, /pricing page = **2 places** (with different CTA labels each time)
- User sees SEO pricing on: homepage card, PricingOverview section, /pricing page = **3 places**

**After:**
- Homepage cards show **price anchors only** (e.g., "$199/mo", "From $799") — just enough to set expectations
- `/pricing` is the **only place** with full tier breakdowns, what's-included lists, and comparison context
- Product pages show a single contextual price reference and link to `/pricing` for details

### 3.3 What Changes per Page

| Page | Change | Rationale |
|---|---|---|
| **Homepage** | Remove `<PricingOverview />` section entirely | ServicesBento cards already have inline pricing from the enterprise cards blueprint. PricingOverview duplicates that info AND duplicates /pricing. Two layers of redundancy. |
| **Homepage Hero** | Change primary CTA from "See What We Can Do" (scroll) to `See Plans` → /pricing. Keep secondary CTA as `Start Free Trial` → /cadence/get-started | Current hero CTA just scrolls down — that's a wasted click. Route directly to the canonical pricing page. |
| **Pricing page** | Expand from 3 sparse cards to full 5-product pricing breakdown with tier detail, what's-included, and per-product CTAs | Currently the pricing page is a near-clone of PricingOverview. Make it the real canonical pricing layer. |
| **ServicesBento cards** | Standardize CTA labels per taxonomy (§1.3). Change "View Packages" → "See Plans", "Get Started" → "See Plans" | Label consistency. |
| **Contact page** | Change "Book a 15-Minute Call" to `Book a Call`. Keep everything else. | Label consistency. |
| **Bottom CTA section** | No changes needed — already uses C1 + C3 labels correctly. | Already clean. |

---

## 4. Navigation Simplification & Button Strategy

### 4.1 Current Nav (no changes needed to structure)

The nav is already clean after the content IA blueprint:
```
Products ▾ | Pricing | About | Blog | Contact | [Start Free Trial]
```

This is correct. No changes.

### 4.2 Products Dropdown (no changes)

Current dropdown links are correct:
- AI Phone Answering → /services/cadence
- Website Creation → /services/website-creation
- Review Funnel → /services/review-funnel
- SEO & Content → /services/seo-content
- Custom Apps → /services/custom-apps

### 4.3 Button Strategy

**Rule: Maximum 2 CTA buttons visible at any decision point.** A "decision point" is any place on the page where the user is asked to take action (hero, end of a section, bottom CTA, etc.).

| Decision Point | Button 1 (Primary) | Button 2 (Secondary) | Why only 2 |
|---|---|---|---|
| Hero | `See Plans` (filled gradient) | `Start Free Trial` (ghost) | Primary routes to pricing (universal). Secondary captures Cadence-ready visitors. |
| ServicesBento per card | 1 button or 1 text link per card | — | Each card is its own micro-decision. One action per card. |
| Bottom CTA | `Start Your Free Trial` (filled white) | `Book a Call` (ghost white) | Captures both self-serve and consultative intent. |

**What this eliminates:** The current PricingOverview section has 3 different CTA buttons (Start Free Trial + View Website Packages + Book a Quick Call) all visible simultaneously. That's 3 competing actions in one viewport. Removing PricingOverview removes this problem entirely.

---

## 5. Copy Consistency Rules

### 5.1 Price Display Rules

| Context | Format | Example |
|---|---|---|
| Card price anchor (homepage) | Currency + amount + period, no decimals | `$199/mo` |
| Card price context (homepage) | Lowercase, period-separated qualifiers | `after 7-day free trial · no contracts` |
| Pricing page — tier headers | Same as card anchor | `$199/mo` |
| Pricing page — tier context | Full sentence, plain language | `No setup fee. Cancel anytime. 7-day free trial included.` |
| Variable pricing | "From" prefix | `From $500/mo` |
| Custom pricing | Exact phrase | `Custom quote` |

**Never:** "Starting at", "As low as", "Only $X", "$X+", "Contact for pricing", "Call for quote"

### 5.2 CTA Copy Rules

1. **Verb-first.** Every CTA starts with a verb: Start, See, Book, Learn, Tell, Send.
2. **Max 4 words.** No CTA label exceeds 4 words. (`Tell Us What You Need` is the one exception at 5 — it's specific enough to justify it.)
3. **No urgency modifiers.** No "now", "today", "limited time", "don't miss out."
4. **No qualifiers.** No "free consultation", "no-obligation call", "quick chat." The label is the action; context goes in microcopy below.
5. **Consistent capitalization.** Title Case for button labels. Sentence case for text-link CTAs.

### 5.3 Section Header Rules

1. **One gradient-text word per section header.** Currently used well (e.g., "Everything Your Business Needs to **Grow**"). Don't add more.
2. **Section subtitles are plain sentences, not taglines.** "Pick what you need now. Add more later." — good. "Unlock your growth potential" — bad.
3. **No section header should promise what a different section delivers.** If the hero says "See Plans," the pricing page delivers plans. If the ServicesBento says "Everything Your Business Needs to Grow," the cards deliver the product overview. Each section fulfills its own promise.

### 5.4 Vocabulary Rules (inherited from content IA blueprint §2)

The approved/banned vocabulary from `autom8-content-ia-blueprint.md` §2.1 and §2.2 remains in full effect. Key additions for this consolidation:

| Instead of… | Write… |
|---|---|
| Packages | Plans (or just describe what's included) |
| Tiers | Plans |
| Discovery call | Call (just "Book a Call") |
| Intake form | Form (or just "Tell us about your business") |
| Strategy session | Call |

---

## 6. Implementation Checklist

Single-pass execution order. Each item is a discrete, committable change.

### Phase 1: Homepage CTA Consolidation

- [ ] **6.1** `Hero.tsx` — Change primary CTA from `See What We Can Do` (href="#services") to `See Plans` (href="/pricing"). Keep secondary CTA `Start Free Trial` (href="/cadence/get-started") as ghost button.
- [ ] **6.2** `HomePageClient.tsx` — Remove `PricingOverview` import and render. Delete the `<PricingOverview />` line from the JSX. Keep `PricingOverview.tsx` file (may reuse on /pricing).
- [ ] **6.3** `ServicesBento.tsx` — Change Website card CTA label from `View Packages` to `See Plans`. Change href from `/services/website-creation` to `/pricing`.
- [ ] **6.4** `ServicesBento.tsx` — Change SEO card CTA label from `Get Started` to `See Plans`. Change href from `/services/seo-content` to `/pricing`.
- [ ] **6.5** Verify homepage section order is now: Navigation → Hero → SocialProofBar → ServicesBento → WhoItsFor → HowItWorks → Testimonials → FAQ → CTA → Footer. (PricingOverview gap is closed.)

### Phase 2: Pricing Page Elevation

- [ ] **6.6** `pricing/page.tsx` — Expand from 3-card layout to full 5-product pricing page. Add Review Funnel ($149/mo) and Custom Apps (Custom quote) rows. Each product row should include: product name, price, what's included (3–5 bullet points), and a single CTA per the taxonomy (C1 for Cadence, C3 for all others).
- [ ] **6.7** `pricing/page.tsx` — Change Website card CTA from `View Website Packages` to `See Plans` or `Learn More` (text link to /services/website-creation for scope detail). Primary CTA should be `Book a Call` → /contact.
- [ ] **6.8** `pricing/page.tsx` — Change SEO card CTA from `Book a Quick Call` to `Book a Call`.
- [ ] **6.9** `pricing/page.tsx` — Add a footer note: "Not sure which plan fits? [Tell us about your business](/contact) and we'll recommend one." (Replaces current "Go to intake form" label.)
- [ ] **6.10** `pricing/page.tsx` — Remove "Go to intake form →" link. Replace with inline text link per 6.9.

### Phase 3: Contact Page Label Cleanup

- [ ] **6.11** `ContactPageClient.tsx` — Change "Book a 15-Minute Call" button label to `Book a Call`. Remove duration from label. (Keep mailto href as-is.)
- [ ] **6.12** `ContactPageClient.tsx` — Verify "Start Free Trial" sidebar callout is present and correct. (Currently correct — no change needed.)

### Phase 4: Cross-Page Link Consistency

- [ ] **6.13** `Footer.tsx` — No changes needed. Footer links are navigational, not CTA buttons. Current structure (Products / Company / Resources) is clean.
- [ ] **6.14** Global grep for retired labels: search entire `src/` for any occurrence of "View Packages", "View Website Packages", "Get Started" (as CTA, not body copy), "Book a Quick Call", "Book a 15-Minute Call", "Book Your Strategy Call", "Go to intake form". Remove or replace per §1.2.
- [ ] **6.15** Verify no product detail page (`/services/*`) shows a full pricing table. Each should show at most a single price anchor and link to `/pricing` for comparison.

### Phase 5: Validation

- [ ] **6.16** `npm run build` — must pass.
- [ ] **6.17** `npm run lint` — must pass or only pre-existing warnings.
- [ ] **6.18** Click-test: every CTA on homepage resolves to correct destination.
- [ ] **6.19** Click-test: /pricing page has all 5 products with working CTAs.
- [ ] **6.20** Click-test: no dead links from retired label changes.
- [ ] **6.21** Visual check: PricingOverview gap on homepage doesn't create awkward spacing between Testimonials and FAQ.

---

## 7. Acceptance Criteria

### CTA Taxonomy Enforcement
- [ ] No CTA button or text link on any page uses a label not in the taxonomy (§1.1)
- [ ] "View Packages" appears nowhere in the codebase
- [ ] "View Website Packages" appears nowhere in the codebase
- [ ] "Get Started" does not appear as a CTA label (may appear in body copy)
- [ ] "Book a Quick Call" appears nowhere
- [ ] "Book a 15-Minute Call" appears nowhere
- [ ] "Go to intake form" appears nowhere
- [ ] "See What We Can Do" appears nowhere
- [ ] Every instance of `See Plans` links to `/pricing`
- [ ] Every instance of `Start Free Trial` links to `/cadence/get-started`
- [ ] Every instance of `Book a Call` links to `/contact`

### Redundancy Elimination
- [ ] `PricingOverview` component is not rendered on the homepage
- [ ] Pricing information appears on the homepage only inside ServicesBento cards (as inline price anchors) — no separate pricing section
- [ ] The `/pricing` page is the only place with full tier breakdowns and what's-included lists
- [ ] No product's pricing is shown in more than 2 places total (card anchor + /pricing page)
- [ ] Homepage has exactly 0 standalone pricing sections (ServicesBento price anchors don't count — they're part of product cards)

### Funnel Clarity
- [ ] Each product has exactly one primary conversion path (documented in §2)
- [ ] No two CTAs on the same viewport compete with different labels for the same destination
- [ ] Maximum 2 CTA buttons visible at any decision point (hero, bottom CTA, etc.)
- [ ] Cadence is the only product with a direct-to-conversion skip (Start Free Trial bypasses pricing page)

### Page Role Integrity
- [ ] Homepage does not duplicate /pricing content
- [ ] /pricing page does not duplicate homepage marketing copy (no hero, no testimonials, no social proof)
- [ ] Product detail pages do not show full pricing tables
- [ ] Contact page does not re-pitch products (Cadence trial callout is an escape hatch, not a pitch)

### Copy Consistency
- [ ] All CTA labels follow verb-first, max-4-word rule
- [ ] All price displays follow format rules from §5.1
- [ ] No retired labels from §1.2 appear in customer-facing copy
- [ ] "Plans" is used instead of "Packages" or "Tiers" in all CTA contexts

### Technical
- [ ] `npm run build` passes
- [ ] `npm run lint` passes (or pre-existing warnings only)
- [ ] No new npm dependencies added
- [ ] No visual theme changes (colors, fonts, spacing, motion system unchanged)
- [ ] PricingOverview.tsx file preserved (not deleted) for potential /pricing page reuse

---

## Appendix A: Before/After CTA Map

### Homepage — Before

```
Hero:           "See What We Can Do" → #services (scroll)      ← vague, wastes a click
ServicesBento:  "Start Free Trial" → /cadence/get-started      ← correct
                "View Packages" → /services/website-creation    ← wrong label, wrong dest
                "Get Started" → /services/seo-content           ← ambiguous label
                "Learn More" → /services/review-funnel          ← fine
                "Tell Us What You Need" → /contact              ← fine
PricingOverview: "Start Free Trial" → /cadence/get-started     ← duplicate of card above
                "View Website Packages" → /services/web...      ← 3rd label for same action
                "Book a Quick Call" → /contact                  ← 2nd label for same action
                "Tell us about your business" → /contact        ← 3rd label for same action
Bottom CTA:     "Start Your Free Trial" → /cadence/get-started  ← correct
                "Book a Quick Call" → /contact                  ← wrong label
Nav:            "Start Free Trial" → /cadence/get-started       ← correct

Total unique CTA labels on homepage: 8
Total CTAs linking to /contact: 3 (with 3 different labels)
Total CTAs linking to /cadence/get-started: 3 (with 2 different labels)
```

### Homepage — After

```
Hero:           "See Plans" → /pricing                          ← routes to canonical pricing
                "Start Free Trial" → /cadence/get-started       ← captures ready visitors
ServicesBento:  "Start Free Trial" → /cadence/get-started       ← Cadence card
                "See Plans" → /pricing                          ← Website card
                "See Plans" → /pricing                          ← SEO card
                "Learn More" → /services/review-funnel          ← Review card
                "Tell Us What You Need" → /contact              ← Custom card
[PricingOverview removed]
Bottom CTA:     "Start Your Free Trial" → /cadence/get-started  ← unchanged
                "Book a Call" → /contact                        ← label fixed
Nav:            "Start Free Trial" → /cadence/get-started       ← unchanged

Total unique CTA labels on homepage: 5 (down from 8)
Total CTAs linking to /contact: 2 (with 2 labels — "Book a Call" and "Tell Us What You Need" — appropriate since they serve different intents)
Total CTAs linking to /cadence/get-started: 3 (all using same label family)
```

### Pricing Page — Before

```
3 cards (Cadence, Website, SEO) — missing Review Funnel and Custom Apps
CTAs: "Start Free Trial", "View Website Packages", "Book a Quick Call"
Footer: "Go to intake form →" → /contact
```

### Pricing Page — After

```
5 product rows (Cadence, Website, Review Funnel, SEO, Custom Apps)
CTAs: "Start Free Trial" (Cadence), "Book a Call" (Website, SEO, Review, Custom)
Each row: "Learn More →" text link to product detail page
Footer: "Not sure which plan fits? Tell us about your business." → /contact
```

---

## Appendix B: File Impact Summary

| File | Change Type | What Changes |
|---|---|---|
| `src/components/Hero.tsx` | EDIT | Primary CTA label + href. "See What We Can Do" → "See Plans" (href="/pricing"). Add secondary CTA button for "Start Free Trial" → /cadence/get-started. |
| `src/app/HomePageClient.tsx` | EDIT | Remove PricingOverview import + render line. |
| `src/components/ServicesBento.tsx` | EDIT | Website card: label "View Packages" → "See Plans", href → "/pricing". SEO card: label "Get Started" → "See Plans", href → "/pricing". |
| `src/app/pricing/page.tsx` | EDIT | Expand to 5 products, add what's-included per row, standardize CTAs per taxonomy, fix footer link. |
| `src/app/contact/ContactPageClient.tsx` | EDIT | "Book a 15-Minute Call" → "Book a Call". |
| `src/components/CTA.tsx` | EDIT (minor) | "Book a Quick Call" → "Book a Call". |
| `src/components/PricingOverview.tsx` | NO EDIT | Preserved but no longer rendered on homepage. |

**Files NOT touched:** Navigation.tsx, Footer.tsx, ServicesBento structure/layout, all product detail pages, all visual/motion/theme files.

---

## Appendix C: Decision Log

| Decision | Rationale | Alternative Considered |
|---|---|---|
| Remove PricingOverview from homepage | ServicesBento cards already show pricing inline (enterprise cards blueprint). PricingOverview duplicates both the cards above it AND the /pricing page. Three layers of pricing = confused user. | Keep PricingOverview but strip it to just CTAs (no prices). Rejected: still redundant section with no unique value. |
| Hero primary CTA → "See Plans" | Current "See What We Can Do" scrolls to #services — that's one click to see what's already half-visible. Routing to /pricing puts the user at the canonical decision-making page. | Keep scroll CTA but rename to "See Our Products." Rejected: scroll CTAs are weak — they don't advance the user's journey. |
| "See Plans" as universal pricing label | Consistent language reduces cognitive load. User sees "See Plans" anywhere → knows it goes to pricing. | "View Pricing" — rejected: "Plans" implies structured options, which is what /pricing provides. "Pricing" is a noun, not an action. |
| Website/SEO cards route to /pricing, not product pages | Product pages explain features/scope. Pricing page answers "what does it cost?" When a user clicks a CTA that looks like it leads to pricing info, they should get pricing info. | Route to product pages first, then cross-link to /pricing. Rejected: adds a click. User who wants to compare prices across products needs to visit 3 product pages vs. 1 pricing page. |
| Preserve PricingOverview.tsx file | May be useful as a starting point for the expanded /pricing page. Also avoids unnecessary file deletion. | Delete it. Not wrong either, but preservation costs nothing. |
| Custom Apps keeps "Tell Us What You Need" instead of "See Plans" | Custom work has no plan to see. "Custom quote" on /pricing is a dead end — the real next step is a conversation. This is the one product where direct-to-contact is correct. | Use "Book a Call" for Custom too. Rejected: "Tell Us What You Need" better matches the bespoke/discovery intent. "Book a Call" implies a scheduled meeting; submitting a form is lower friction. |
