# Autom8 Everything — Content & Information Architecture Blueprint

> **Author:** Architect Agent  
> **Date:** 2026-03-03  
> **Scope:** Content, messaging, copy, IA, and conversion strategy. No code changes.  
> **Constraint:** Preserve existing design system (Huly-inspired refresh). Change words and structure, not visuals.

---

## Executive Summary

The current site has a polished dark UI and solid component architecture, but the messaging has three problems:

1. **Identity confusion** — The homepage positions Autom8 Everything as a generic web/SEO agency. Cadence (the standout product) is buried mid-page. The five product buckets aren't distinct.
2. **Copy speaks to marketers, not owners** — Phrases like "conversion-focused page architecture," "lead routing logic," and "compounding search visibility" read like agency-to-agency pitch decks. The target buyer is a plumber, dentist, or HVAC owner who wants more phone calls.
3. **Single conversion path dependency** — Every CTA funnels to "Book a Strategy Call." Non-technical owners who aren't ready for a call have no softer entry point.

This blueprint rewrites messaging and structure while keeping every existing component, design token, and animation intact.

---

## 1. Homepage Messaging Architecture

### 1.1 Hero Section

**Current problems:**
- H1 ("Websites and tools that get you more calls and booked jobs") is decent but generic — could be any web agency.
- Subtitle is vague ("build the site, set up smart follow-up, and run monthly SEO").
- Primary CTA is "Book a Strategy Call" which is high-commitment for a first visit.

**New hero structure:**

| Element | New Copy |
|---|---|
| **Eyebrow** | `For local business owners in Phoenix & beyond` |
| **H1** | `Stop losing customers to missed calls and invisible websites.` |
| **Subtitle** | `We build your website, answer your phone 24/7, get you more 5-star reviews, and keep you showing up on Google. You run your business — we handle the rest.` |
| **Primary CTA** | `See What We Can Do` → scrolls to product grid (#services) |
| **Secondary CTA** | `Try Cadence Free — AI Phone Answering` → links to /services/cadence |

**Rationale:**
- H1 names the pain in plain English. Every local owner has felt both problems.
- Subtitle lists all five value props without jargon.
- Primary CTA is low-commitment (just scroll down). Reduces bounce from owners who aren't ready to book a call on sight.
- Secondary CTA gives Cadence a hero-level entry point since it has a self-serve trial.

### 1.2 Social Proof Bar

**Current:** "Trusted by local businesses across service industries" with industry-name placeholders (no real logos).

**New:**
- **Copy:** `Helping 25+ local businesses get more calls every month`
- **Replace placeholder logos** with the 3 proof stats currently in Testimonials section: `25+ Businesses Served` · `24-Hour Setup` · `5.0/5 Client Rating`
- This makes the social proof bar actually prove something instead of being decorative filler.

### 1.3 Product Grid (ServicesBento) — Restructured

**Current:** 4 services in a bento grid (Website Creation, Custom Tools, Review Funnel, Managed SEO). Cadence is separate below.

**New: 5 products, 1 featured + 4 standard** (per locked decision)

| Position | Product | Card Size |
|---|---|---|
| **Featured (top, full-width)** | AI Phone Answering (Cadence) | Large — spans 2 cols, includes price badge `$199/mo · Free Trial` |
| Row 2, Col 1 | Review Funnel | Standard |
| Row 2, Col 2 | Website Creation | Standard |
| Row 3, Col 1 | SEO & Monthly Content | Standard |
| Row 3, Col 2 | Custom Apps & Tools | Standard |

**Section headline:** `Everything Your Business Needs to Grow`  
**Section subtitle:** `Pick what you need now. Add more later. No long-term contracts on any of it.`

**Why Cadence goes first:** It's the only product with instant self-serve signup ($199/mo, 7-day free trial). Every other product requires a conversation. Leading with the lowest-friction product maximizes the chance a first-time visitor takes action.

### 1.4 Section Order (Revised)

```
Navigation (fixed)
Hero
SocialProofBar (now with real proof stats)
ProductGrid (5 products, Cadence featured) ← renamed from ServicesBento
HowItWorks (3 steps — now earlier to reduce uncertainty)
WhoItsFor
Testimonials (carousel only — proof stats moved to SocialProofBar)
Pricing Overview (NEW section — see §4)
FAQ (updated questions)
CTA
Footer
```

**Changes from current:**
- CadenceHighlight removed as standalone section (Cadence is now featured card in ProductGrid)
- HowItWorks moved up — answering "how does this work?" earlier reduces drop-off
- WhoItsFor moved after HowItWorks (it's a qualifier, not a hook)
- New Pricing Overview section before FAQ
- Testimonials loses the proof stat pills (moved to SocialProofBar)

### 1.5 HowItWorks (Revised Copy)

| Step | Current Title | New Title | New Description |
|---|---|---|---|
| 01 | Quick Call | Tell Us What You Need | `Fill out a quick form or book a 15-minute call. We'll ask about your business and where you're losing leads.` |
| 02 | We Build It | We Set Everything Up | `We build your site, connect your phone answering, and launch your review funnel. Most businesses are live in 2–4 weeks.` |
| 03 | You Keep Growing | Your Phone Starts Ringing | `More calls. More reviews. Better Google rankings. We keep improving things every month so the results compound.` |

**Key change:** Step 1 now offers form OR call, not just call. This matches the conversion path strategy in §6.

### 1.6 WhoItsFor (Revised Copy)

| Card | Current | New |
|---|---|---|
| 1 | "Owners who are tired of missed leads" | **"You're missing calls after hours"** — `Customers call and get voicemail. They hang up and call the next company. You never even know it happened.` |
| 2 | "Teams with too much manual work" | **"Your website isn't bringing in leads"** — `You have a site, but it doesn't rank on Google and doesn't convince people to call. You're paying for something that isn't working.` |
| 3 | "Businesses ready for steady growth" | **"You don't have time to figure out marketing"** — `You're great at what you do. You shouldn't have to become a tech expert just to get new customers.` |

**Rationale:** Current cards describe abstract personas. New cards describe specific, visceral problems the owner has felt this week.

### 1.7 Testimonials

- Remove the 3 proof stat pills (moved to SocialProofBar)
- Keep carousel and all testimonial cards as-is
- Section heading: `What Business Owners Say` (instead of "Proof That This Works" — less salesy)

### 1.8 FAQ (Revised Questions)

Replace current FAQ items with questions a non-technical owner would actually ask:

| # | Question | Answer |
|---|---|---|
| 1 | `How much does this cost?` | `It depends on what you need. Phone answering is $199/mo with a free trial. Websites and review funnels have set project prices we'll share upfront. Monthly SEO starts at a flat rate. No hidden fees.` |
| 2 | `I already have a website. Can you work with it?` | `Yes. If you want us to improve your existing site, we can. If you want us to rebuild it from scratch on our platform, that's an option too. We'll recommend whatever makes more sense for your situation.` |
| 3 | `How fast can I get started?` | `Cadence phone answering is live in 5 minutes. Website projects take 2–4 weeks. We'll give you a timeline before you commit to anything.` |
| 4 | `Do I need to be tech-savvy?` | `No. That's the whole point. We handle the technical setup, and you get a simple dashboard to see what's happening. If something needs changing, you just tell us.` |
| 5 | `Is there a long-term contract?` | `No. Cadence is month-to-month, cancel anytime. Website and SEO projects have a defined scope — once it's done, it's done. Monthly SEO support is cancel-anytime too.` |
| 6 | `What areas do you serve?` | `We work with local businesses across the Phoenix metro area and nationwide. Everything is done remotely — no in-person meetings required.` |

### 1.9 CTA Section (Revised)

| Element | Current | New |
|---|---|---|
| H2 | "Want more leads without more chaos?" | `Ready to stop losing customers?` |
| Subtitle | "Book a quick call…" | `Pick the easiest next step for you.` |
| Primary CTA | "Book Your Strategy Call" | `Start Your Free Trial` → /cadence/get-started |
| Secondary CTA | "See Services & Pricing" | `Book a Quick Call` → /contact |
| Micro-copy | "Simple plan: launch first…" | `No credit card for the trial. No pressure on the call.` |

**Rationale:** Leading with the free trial as primary CTA captures people who want to try before talking. The call option is still there but repositioned as secondary.

---

## 2. Plain-Language Copy Framework

### 2.1 Approved Vocabulary

Use these words in all customer-facing copy:

| Instead of… | Write… |
|---|---|
| AI agent / AI-powered | Smart phone answering / answers your calls automatically |
| Conversion-focused | Built to get you more calls |
| Lead routing logic | Makes sure every lead gets a fast response |
| Pipeline | Your list of leads |
| Workflow automation | We handle the busy work |
| SEO optimization | Showing up on Google |
| Content strategy | Blog posts that bring in new visitors |
| Funnel | System / setup |
| Onboarding | Getting started / setup |
| Scalable | Works as you grow |
| Revenue-focused | Built to make your phone ring |
| Lifecycle campaign | Follow-up emails and texts |
| CRM | Your customer tracking tool |
| Integration | Connects with your other tools |
| Tech stack | The tools you already use |
| Deploy | Set up / launch |
| Leverage | Use |
| Robust | Reliable / solid |
| Streamline | Simplify / speed up |
| Optimize | Improve |
| Ecosystem | System / setup |
| End-to-end | Everything from start to finish |

### 2.2 Banned Jargon (never use in customer-facing copy)

- AI agent (use "smart phone answering" or describe the outcome)
- Machine learning
- LLM / large language model
- Natural language processing / NLP
- API / webhook / endpoint
- Full-stack / headless / serverless
- SaaS / B2B / B2C
- Conversion rate optimization / CRO
- Growth hacking
- Omnichannel
- Synergy / paradigm / disrupt
- Bleeding edge / cutting edge
- North star metric
- KPI (say "results" or "numbers")
- ROI (say "what you get back" or "results")
- Deliverables (say "what we build" or "what you get")

### 2.3 Tone Rules

1. **Write like you're explaining to a friend who owns a plumbing company.** If they'd say "what does that mean?" — rewrite it.
2. **Short sentences.** Max 20 words per sentence in body copy. If you need a comma, consider splitting into two sentences.
3. **Active voice always.** "We build your website" not "Your website will be built by our team."
4. **Second person.** "You" and "your" — never "one" or "businesses" in abstract.
5. **Specific over abstract.** "Your phone rings more" beats "increased lead velocity."
6. **No exclamation points** in headlines or body copy. They feel desperate.

---

## 3. Product Card Copy Templates

### 3.1 Featured Card — AI Phone Answering (Cadence)

```
Badge:        NEW · FREE TRIAL
Headline:     Never Miss Another Customer Call
One-liner:    Your phone gets answered 24/7. Appointments get booked. 
              You get a summary of every call. Live in 5 minutes.
Price badge:  $199/mo after free trial
Primary CTA:  Start Free Trial → /cadence/get-started
Secondary:    Learn More → /services/cadence
```

### 3.2 Review Funnel

```
Icon:         Star
Headline:     Get More 5-Star Reviews on Autopilot
One-liner:    After every job, we automatically ask happy customers to 
              leave a Google review. Bad experiences get caught privately.
CTA:          Learn More → /services/review-funnel (new page, see §5)
```

### 3.3 Website Creation

```
Icon:         Globe
Headline:     A Website That Actually Gets You Calls
One-liner:    We build fast, clean websites designed to show up on Google 
              and make it easy for customers to contact you.
CTA:          Learn More → /services/website-creation (new page, see §5)
```

### 3.4 SEO & Monthly Content

```
Icon:         LineChart (or TrendingUp)
Headline:     Show Up on Google Every Month
One-liner:    We write blog posts, improve your rankings, and make sure 
              local customers find you before your competitors.
CTA:          Learn More → /services/seo-content (new page, see §5)
```

### 3.5 Custom Apps & Tools

```
Icon:         Wrench (or Blocks)
Headline:     Custom Tools Built Around How You Work
One-liner:    Need something specific? We build dashboards, booking systems, 
              and internal tools that fit your business — not the other way around.
CTA:          Tell Us What You Need → /contact
```

---

## 4. Pricing Presentation Strategy

### 4.1 What Shows a Set Price

| Product | Display Price | Where |
|---|---|---|
| AI Phone Answering (Cadence) | `$199/mo` — 7-day free trial, no setup fee, cancel anytime | Homepage featured card, /services/cadence page |
| Review Funnel | `From $149/mo` — setup included | Product page (when built) |

### 4.2 What Shows as "Call-First"

| Product | Display | Rationale |
|---|---|---|
| Website Creation | `Starting at $2,500` with note: "Final price depends on scope. We'll quote you on a quick call." | Every site is different. Showing a floor sets expectations without locking in. |
| SEO & Monthly Content | `From $500/mo` with note: "Depends on how many locations and how competitive your market is." | Same logic — scope varies by market. |
| Custom Apps & Tools | `Custom pricing` with note: "Tell us what you need and we'll give you a flat quote." | Fully consultative. No way to standardize. |
| Existing site migration/replication | Note on Website Creation page: "Already have a site you love? We can replicate your design on our platform. Migration is quoted separately." | Per locked decision — this is an upcharge, not included in base price. |

### 4.3 New Homepage Section: Pricing Overview

Add a new lightweight section between Testimonials and FAQ. Not a full pricing table — just enough to pre-qualify.

```
Section heading:    Simple, Transparent Pricing
Subtitle:           No hidden fees. No long-term contracts. You always know what you're paying.

[3-column layout]

Column 1 — "Start Free"
  Cadence AI Phone Answering
  $199/mo after 7-day free trial
  → Start Free Trial

Column 2 — "Build Your Foundation"
  Website + Review Funnel
  Custom quote — most projects $2,500–$8,000
  → Get a Quote

Column 3 — "Grow Every Month"  
  SEO + Monthly Content
  From $500/mo
  → Book a Quick Call

Footer note: "Not sure where to start? Take 2 minutes to tell us about your business and we'll recommend a plan."
→ links to intake form (see §6)
```

---

## 5. Navigation & IA Recommendations

### 5.1 Top Navigation (Now)

Current nav: `Services | Locations | Case Studies | Blog | About | Contact`

**Recommended nav:**

```
Products ▾ | Pricing | About | Blog | Contact | [CTA: Start Free Trial]
```

**Products dropdown:**
- AI Phone Answering (Cadence)
- Website Creation
- Review Funnel
- SEO & Content
- Custom Apps

**Why:**
- "Products" is clearer than "Services" for this audience — these are things they buy, not abstract service categories.
- "Pricing" as a top-level nav item — pricing pages convert well because people self-qualify. Hiding pricing behind "Contact us" loses the people who just want a number.
- "Locations" removed from top nav — it's an SEO play, not a primary user path. Keep location pages indexed and linked from footer.
- "Case Studies" renamed or deferred — current `/automations` page name is confusing. If real case studies exist, keep it. If not, remove until there's real content.

### 5.2 Pages That Should Exist Now (Phase 1)

| Page | Path | Status | Notes |
|---|---|---|---|
| Homepage | `/` | EXISTS — rewrite copy | |
| AI Phone Answering (Cadence) | `/services/cadence` | EXISTS | Good as-is with minor copy tweaks |
| Cadence Get Started | `/cadence/get-started` | EXISTS | Self-serve signup flow |
| Website Creation | `/services/website-creation` | NEW | Dedicated product page with scope examples and pricing range |
| Review Funnel | `/services/review-funnel` | NEW | How it works, what's included, pricing |
| SEO & Content | `/services/seo-content` | NEW | What's included monthly, results timeline, pricing |
| Custom Apps | `/services/custom-apps` | NEW | Portfolio examples, process, "tell us what you need" |
| Pricing | `/pricing` | NEW | Consolidated pricing overview (all 5 products) |
| Contact | `/contact` | EXISTS | Add intake form option alongside call booking |
| About | `/about` | EXISTS | Minor copy refresh |
| Blog | `/blog` | EXISTS | No changes |
| Privacy / Terms / Security | Various | EXISTS | No changes |

### 5.3 Pages to Build Later (Phase 2)

| Page | Path | Notes |
|---|---|---|
| Case Studies | `/case-studies` | Only when there are 3+ real stories with permission |
| Industries | `/industries/[slug]` | Plumbing, HVAC, dental, etc. — SEO landing pages |
| Locations (keep indexed) | `/locations/[slug]` | Already exist, keep for SEO. Just remove from top nav. |
| Integrations | `/integrations` | "Works with the tools you already use" — when relevant |
| Cadence Welcome | `/cadence/welcome` | Post-signup onboarding (already exists) |

### 5.4 Pages to Deprecate / Redirect

| Current Page | Action | Reason |
|---|---|---|
| `/services` (index) | Redirect → `/pricing` | Pricing page replaces the services overview |
| `/services/ai-automation` | Redirect → `/services/custom-apps` | Redundant; "AI automation" is jargon |
| `/services/business-process-automation` | Redirect → `/services/custom-apps` | Same — consolidate |
| `/services/crm-automation` | Redirect → `/services/custom-apps` | Same |
| `/services/email-automation-services` | Redirect → `/services/custom-apps` | Same |
| `/services/zapier-consulting` | Redirect → `/services/custom-apps` | Same |
| `/services/gohighlevel-setup` | Redirect → `/services/custom-apps` | Same |
| `/services/local-seo-automation` | Redirect → `/services/seo-content` | Consolidate |
| `/automations` | Redirect → `/` (or `/case-studies` when built) | Page name is confusing |

**SEO note:** All redirects must be 301s. The old service slug pages were mostly thin content built for keyword targeting. The new consolidated pages will be stronger ranking targets with more substance.

### 5.5 Footer IA

```
Products                Company              Resources
─────────               ────────              ─────────
AI Phone Answering      About                 Blog
Website Creation        Contact               Locations
Review Funnel           Privacy Policy        
SEO & Content           Terms of Service      
Custom Apps             Security              
Pricing                                       
```

---

## 6. Conversion Path Recommendations

### 6.1 The Problem

Current site has exactly one conversion path: **Book a Strategy Call** (links to /contact). This is high-commitment for someone who just found the site. Non-technical owners often:
- Won't book a call on a first visit
- Want to see a price before talking to anyone
- Prefer to "try something" before committing money or time

### 6.2 Recommended Conversion Tiers

**Tier 1 — Zero Commitment (capture interest)**
- **Action:** Start Free Trial (Cadence)
- **Friction:** Email + business name + phone number
- **Where:** Hero secondary CTA, Cadence featured card, Pricing section, bottom CTA
- **Why:** Cadence free trial is the single lowest-friction conversion. No call needed. No payment. They experience the product immediately.

**Tier 2 — Low Commitment (capture intent)**
- **Action:** Quick Intake Form ("Tell us about your business")
- **Friction:** 4–5 fields: name, business name, phone, what they need help with (checkboxes: phone answering / website / reviews / SEO / not sure), anything else (optional textarea)
- **Where:** Pricing section "Not sure where to start?" link, Contact page alternative, FAQ bottom link
- **Implementation:** New section on /contact page, or standalone /get-started page. Submits to same backend as current contact form.
- **Why:** Owners who won't book a call WILL fill out a short form. You call them — they don't have to initiate.

**Tier 3 — Medium Commitment (qualified lead)**
- **Action:** Book a 15-Minute Call
- **Friction:** Calendly/Cal embed or equivalent
- **Where:** Pricing section "Build" and "Grow" columns, Contact page, nav CTA (desktop only)
- **Why:** This is still the right path for website/SEO/custom work. Just shouldn't be the ONLY path.

### 6.3 CTA Hierarchy by Page Location

| Location | Primary CTA | Secondary CTA |
|---|---|---|
| Hero | See What We Can Do (scroll) | Try Cadence Free |
| Product Grid (Cadence card) | Start Free Trial | Learn More |
| Product Grid (other cards) | Learn More → product page | — |
| HowItWorks | Tell Us What You Need → /contact | — |
| Pricing Overview | Start Free Trial / Get a Quote / Book a Call (per column) | "Not sure?" → intake form |
| Bottom CTA section | Start Your Free Trial | Book a Quick Call |
| Nav bar (desktop) | Start Free Trial (button) | — |
| Nav bar (mobile menu) | Start Free Trial | — |

### 6.4 What Changes on /contact

Current contact page has a generic form (name, email, company, message). Enhance to:

1. Add "What do you need help with?" checkboxes before the message field
2. Add phone number field (optional but encouraged)
3. Add a "Prefer to try something first?" callout linking to Cadence free trial
4. Keep the call-booking option but move it to a tab or secondary section

---

## 7. Implementation Checklist for Coder

Execute in this order. Each item is a discrete commit.

### Phase 1: Homepage Content Rewrite (no new pages)

- [ ] **7.1** Update `Hero.tsx` copy per §1.1 (H1, subtitle, CTAs, eyebrow)
- [ ] **7.2** Update `SocialProofBar.tsx` per §1.2 — replace industry placeholders with 3 proof stat badges, update copy
- [ ] **7.3** Restructure `ServicesBento.tsx` per §1.3 — 5 products, Cadence featured large card with price badge, rename section heading/subtitle. Update `services` array.
- [ ] **7.4** Remove `CadenceHighlight.tsx` from `HomePageClient.tsx` render (file preserved). It's now absorbed into the featured product card.
- [ ] **7.5** Update `HowItWorks.tsx` copy per §1.5
- [ ] **7.6** Update `WhoItsFor.tsx` copy per §1.6
- [ ] **7.7** Update `Testimonials.tsx` per §1.7 — remove `proofStats` array and the stat pills render. Update section heading.
- [ ] **7.8** Add new `PricingOverview.tsx` component per §4.3 — 3-column layout, insert between Testimonials and FAQ in `HomePageClient.tsx`
- [ ] **7.9** Update `FAQ.tsx` content per §1.8 — replace all 6 Q&A items
- [ ] **7.10** Update `CTA.tsx` copy per §1.9
- [ ] **7.11** Reorder sections in `HomePageClient.tsx` per §1.4 section order
- [ ] **7.12** Update `Navigation.tsx` — change nav links per §5.1, change CTA button text to "Start Free Trial" → /cadence/get-started

### Phase 2: New Product Pages

- [ ] **7.13** Create `/services/website-creation/page.tsx` — headline, what's included, scope examples, pricing range ("Starting at $2,500"), FAQ, CTA
- [ ] **7.14** Create `/services/review-funnel/page.tsx` — how it works, what's included, pricing ($149/mo), CTA
- [ ] **7.15** Create `/services/seo-content/page.tsx` — what's included monthly, timeline expectations, pricing (from $500/mo), CTA
- [ ] **7.16** Create `/services/custom-apps/page.tsx` — what we build, process, portfolio examples, "tell us what you need" form CTA
- [ ] **7.17** Create `/pricing/page.tsx` — consolidated pricing for all 5 products per §4 strategy

### Phase 3: Redirects & Cleanup

- [ ] **7.18** Add 301 redirects in `next.config.ts` per §5.4 deprecation table
- [ ] **7.19** Update `/contact` page — add intake form checkboxes, phone field, Cadence callout per §6.4
- [ ] **7.20** Update `Footer.tsx` links per §5.5
- [ ] **7.21** Remove `/automations` route (redirect covers it)
- [ ] **7.22** Update `/services/page.tsx` to redirect to `/pricing`
- [ ] **7.23** Update sitemap.ts to reflect new page structure

### Phase 4: Verification

- [ ] **7.24** `npm run build` — must pass
- [ ] **7.25** `npm run lint` — must pass or only pre-existing warnings
- [ ] **7.26** Click-test every internal link on homepage
- [ ] **7.27** Verify all 301 redirects resolve correctly
- [ ] **7.28** Verify Cadence free trial CTA path works end-to-end
- [ ] **7.29** Verify no broken images or missing components
- [ ] **7.30** Check mobile layout for new PricingOverview section

---

## 8. Acceptance Criteria

### Content & Messaging
- [ ] Hero H1 does NOT mention "Book a Strategy Call" as the lead
- [ ] Hero copy is plain English — no jargon from the banned list (§2.2)
- [ ] All 5 product buckets are represented on the homepage with distinct cards
- [ ] Cadence is the featured (large) card with visible pricing and "Start Free Trial" CTA
- [ ] No customer-facing copy uses the phrase "AI agent"
- [ ] FAQ answers the question "how much does this cost?" directly
- [ ] Every product card links to a dedicated product page (not generic /services)

### Structure & IA
- [ ] Homepage section order matches §1.4
- [ ] CadenceHighlight is no longer a standalone section (absorbed into product grid)
- [ ] Proof stats appear in SocialProofBar, NOT in Testimonials section
- [ ] New PricingOverview section exists between Testimonials and FAQ
- [ ] Navigation has "Products" dropdown, "Pricing" top-level link, "Start Free Trial" CTA
- [ ] Locations removed from top nav (still in footer and still indexed)

### Conversion Paths
- [ ] At least 2 distinct conversion paths on homepage: free trial AND call/form
- [ ] Cadence free trial is reachable within 1 click from homepage (hero or product card)
- [ ] "Not sure where to start?" intake form path exists on /contact or /pricing
- [ ] Bottom CTA section leads with free trial, not call booking

### Pricing
- [ ] Cadence shows `$199/mo` with free trial on homepage AND dedicated page
- [ ] Website Creation shows starting price range, not "call for pricing"
- [ ] SEO shows starting monthly rate
- [ ] Custom Apps shows "custom pricing — we'll quote you"
- [ ] Existing-site migration mentioned as separate upcharge on Website Creation page

### Technical
- [ ] All deprecated service pages have 301 redirects
- [ ] No broken internal links
- [ ] `npm run build` passes
- [ ] sitemap.ts reflects new page structure
- [ ] No new npm dependencies added
- [ ] Design system (colors, fonts, spacing, motion, border-radius) unchanged from Huly refresh

### SEO Constraints
- [ ] SEO/content automation copy only promises results for sites in Autom8-controlled ecosystem (not "we'll rank your existing Wix site")
- [ ] All new pages have proper metadata (title, description, OG tags)
- [ ] All redirects are 301 (permanent), not 302

---

## Appendix A: Current vs. New Section Map

```
CURRENT                          NEW
─────────────────────            ─────────────────────
Navigation                       Navigation (updated links)
Hero                             Hero (new copy + CTAs)
SocialProofBar                   SocialProofBar (proof stats)
ServicesBento (4 cards)          ProductGrid (5 cards, Cadence featured)
CadenceHighlight                 [REMOVED — absorbed into ProductGrid]
WhoItsFor                        HowItWorks (moved up)
Testimonials (with stats)        WhoItsFor (new pain-point copy)
HowItWorks                       Testimonials (carousel only)
FAQ                              PricingOverview (NEW)
CTA                              FAQ (new questions)
Footer                           CTA (new copy + trial-first)
                                 Footer (updated links)
```

## Appendix B: File Impact Summary

| File | Action | Scope |
|---|---|---|
| `src/app/HomePageClient.tsx` | EDIT | Reorder sections, remove CadenceHighlight, add PricingOverview |
| `src/components/Hero.tsx` | EDIT | All copy, CTAs, add eyebrow |
| `src/components/SocialProofBar.tsx` | EDIT | Replace marquee with static proof stats |
| `src/components/ServicesBento.tsx` | EDIT | 5 products, new grid layout, new copy |
| `src/components/CadenceHighlight.tsx` | NO EDIT | Remove from render only, preserve file |
| `src/components/HowItWorks.tsx` | EDIT | Copy only |
| `src/components/WhoItsFor.tsx` | EDIT | Copy only |
| `src/components/Testimonials.tsx` | EDIT | Remove proof stats, update heading |
| `src/components/PricingOverview.tsx` | NEW | 3-column pricing teaser |
| `src/components/FAQ.tsx` | EDIT | Replace all Q&A content |
| `src/components/CTA.tsx` | EDIT | Copy and CTA targets |
| `src/components/Navigation.tsx` | EDIT | Nav links, dropdown, CTA text |
| `src/components/Footer.tsx` | EDIT | Link structure |
| `src/app/services/website-creation/page.tsx` | NEW | Product page |
| `src/app/services/review-funnel/page.tsx` | NEW | Product page |
| `src/app/services/seo-content/page.tsx` | NEW | Product page |
| `src/app/services/custom-apps/page.tsx` | NEW | Product page |
| `src/app/pricing/page.tsx` | NEW | Consolidated pricing |
| `src/app/contact/ContactPageClient.tsx` | EDIT | Add intake form fields |
| `next.config.ts` | EDIT | Add 301 redirects |
| `src/app/sitemap.ts` | EDIT | Reflect new pages |
