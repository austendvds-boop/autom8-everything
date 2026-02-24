# autom8 everything — Website Architecture Blueprint

**Version:** 1.0  
**Date:** February 19, 2026  
**Project:** autom8 everything — Custom Automations & SEO for Business Owners  
**Design Philosophy:** "Dark Premium Tech" with kinetic motion design

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Site Structure & Information Architecture](#site-structure--information-architecture)
3. [Design System](#design-system)
4. [Component Library](#component-library)
5. [Animation & Motion Specifications](#animation--motion-specifications)
6. [Technology Stack](#technology-stack)
7. [Page-by-Page Breakdown](#page-by-page-breakdown)
8. [Special Features Implementation](#special-features-implementation)
9. [Performance & Accessibility](#performance--accessibility)

---

## Executive Summary

### Brand Positioning
**autom8 everything** positions itself as the premier automation partner for modern business owners. The website must convey:
- **Technical Excellence** — We understand cutting-edge automation
- **Business Results** — Tangible ROI and time savings
- **Premium Service** — White-glove experience for clients
- **Future-Forward** — AI-powered, ahead of the curve

### Core Value Propositions
1. "From chaos to autopilot" — Business operations streamlined
2. "Your business, on autopilot" — Hands-off automation
3. "Automate everything. Grow faster." — Scale without scaling headaches

### Design Vibe
> "Visiting this site should make business owners feel like they've discovered a secret weapon that their competitors don't know about yet."

---

## Site Structure & Information Architecture

### Primary Navigation Structure

```
autom8 everything
├── /
│   └── Hero → Services → Process → Social Proof → Testimonials → CTA
├── /services
│   └── Automation Services → SEO Services → Packages → FAQ
├── /case-studies
│   └── Featured Case Study → Case Study Grid → Results Showcase
├── /about
│   └── Mission → Story → Values → Team
└── /contact
    └── Contact Form → Calendar Booking → FAQ
```

### Page Inventory

| Page | Purpose | Key Features |
|------|---------|--------------|
| **Home (/)** | Convert visitors to leads | Kinetic hero, bento services, testimonial wall |
| **Services (/services)** | Detail service offerings | Interactive service cards, pricing, FAQ |
| **Case Studies (/case-studies)** | Build credibility | Before/after showcases, result metrics |
| **About (/about)** | Humanize the brand | Story timeline, mission, values |
| **Contact (/contact)** | Capture leads | Multi-step form, calendar integration |
| **404** | Graceful error handling | Animated 8-ball, helpful navigation |

---

## Design System

### Color Palette

#### Primary Colors (Dark Premium)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0A0A0F` | Main background |
| `--bg-secondary` | `#12121A` | Cards, elevated surfaces |
| `--bg-tertiary` | `#1A1A23` | Input fields, subtle containers |
| `--accent-primary` | `#8B5CF6` | Primary CTAs, highlights |
| `--accent-secondary` | `#06B6D4` | Secondary accents, links |
| `--accent-gradient-start` | `#8B5CF6` | Gradient start (violet) |
| `--accent-gradient-end` | `#06B6D4` | Gradient end (cyan) |

#### Extended Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#FAFAFA` | Headlines, important text |
| `--text-secondary` | `#A1A1AA` | Body text, descriptions |
| `--text-muted` | `#71717A` | Captions, meta text |
| `--border-subtle` | `#27272A` | Subtle borders |
| `--border-default` | `#3F3F46` | Default borders |
| `--success` | `#22C55E` | Success states |
| `--warning` | `#F59E0B` | Warning states |
| `--error` | `#EF4444` | Error states |

#### Gradient Definitions

```css
--gradient-aurora: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(139, 92, 246, 0.05) 100%);
--gradient-cta: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #06B6D4 100%);
--gradient-text: linear-gradient(135deg, #FAFAFA 0%, #A78BFA 100%);
--gradient-border: linear-gradient(135deg, rgba(139, 92, 246, 0.5) 0%, rgba(6, 182, 212, 0.5) 100%);
```

### Typography System

#### Font Families

| Purpose | Font | Fallback |
|---------|------|----------|
| Display/Hero | **Cal Sans** (geometric) | Inter, system-ui |
| Body/UI | **Inter** | -apple-system, sans-serif |
| Monospace | **JetBrains Mono** | Consolas, monospace |

#### Type Scale

| Level | Desktop | Mobile | Weight | Line Height | Letter Spacing |
|-------|---------|--------|--------|-------------|----------------|
| Hero | 96px | 48px | 700 | 1.0 | -0.04em |
| H1 | 72px | 40px | 700 | 1.1 | -0.03em |
| H2 | 48px | 32px | 600 | 1.2 | -0.02em |
| H3 | 32px | 24px | 600 | 1.3 | -0.01em |
| H4 | 24px | 20px | 600 | 1.4 | 0 |
| Body Large | 20px | 18px | 400 | 1.6 | 0 |
| Body | 16px | 16px | 400 | 1.6 | 0 |
| Body Small | 14px | 14px | 400 | 1.5 | 0 |
| Caption | 12px | 12px | 500 | 1.4 | 0.02em |

### Spacing System

| Token | Value |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-20` | 80px |
| `--space-24` | 96px |
| `--space-32` | 128px |

### Border Radius System

| Token | Value |
|-------|-------|
| `--radius-sm` | 4px |
| `--radius-md` | 8px |
| `--radius-lg` | 12px |
| `--radius-xl` | 16px |
| `--radius-2xl` | 24px |
| `--radius-full` | 9999px |

### Shadow System

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.4);
--shadow-glow: 0 0 40px rgba(139, 92, 246, 0.15), 0 0 80px rgba(6, 182, 212, 0.1);
--shadow-cta: 0 0 20px rgba(139, 92, 246, 0.4), 0 0 40px rgba(6, 182, 212, 0.2);
```

---

## Component Library

### 1. Buttons

#### Primary Button (CTA)
- Background: gradient-cta
- Text: white, 16px, font-weight 600
- Padding: 16px 32px
- Border-radius: radius-full (pill)
- Hover: scale(1.02), enhanced glow
- Active: scale(0.98)
- Transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1)

#### Secondary Button
- Background: transparent
- Border: 1px solid border-default
- Text: text-primary, 16px, font-weight 500
- Padding: 16px 32px
- Hover: bg-secondary, border accent-primary

#### Ghost Button
- Background: transparent
- Text: text-secondary, 14px
- Hover: text-primary

### 2. Cards

#### Service Card (Bento Grid)
- Background: bg-secondary
- Border: 1px solid border-subtle
- Border-radius: radius-xl
- Padding: space-8
- Hover: translateY(-4px), border accent-primary/30, shadow-lg

#### Testimonial Card
- Background: bg-secondary
- Border: 1px solid border-subtle
- Border-radius: radius-lg
- Padding: space-6
- Contains: Quote, Avatar, Name, Title, Company

#### Stat Card
- Background: bg-secondary
- Border: 1px solid border-subtle
- Border-radius: radius-lg
- Padding: space-6
- Animation: Count up on scroll

### 3. Form Elements

#### Input Field
- Background: bg-tertiary
- Border: 1px solid border-subtle
- Border-radius: radius-md
- Padding: 12px 16px
- Focus: border accent-primary, subtle glow

### 4. Navigation

#### Header
- Position: fixed, top
- Background: bg-primary/80 (glassmorphism)
- Backdrop-filter: blur(12px)
- Height: 72px
- Z-index: 50

#### Navigation Links
- Font: 14px, font-weight 500
- Color: text-secondary
- Hover: text-primary
- Underline animation: scale from center

### 5. Icons
- Library: Lucide React
- Size Scale: 16px, 20px, 24px, 32px
- Stroke Width: 1.5px

---

## Animation & Motion Specifications

### Animation Philosophy
> "Every animation serves a purpose. No gratuitous motion."

### Easing Functions

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
--ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
```

### Duration Scale

| Type | Duration | Usage |
|------|----------|-------|
| Micro | 150ms | Hover states |
| Fast | 200ms | Button clicks |
| Normal | 300ms | Card transitions |
| Slow | 500ms | Section entrances |
| Dramatic | 800ms | Hero animations |

### Global Animations

#### 1. Page Load Sequence (1200ms total, 100ms stagger)
1. Background gradient fades in (0-400ms)
2. Logo appears with scale (200-600ms)
3. Navigation fades in (300-700ms)
4. Hero text reveals line by line (400-1000ms)
5. CTA button slides up (600-1000ms)

#### 2. Smooth Scroll
- Library: Lenis
- Lerp: 0.1
- Smoothness: 1.2

#### 3. Scroll-Triggered Reveals
- Trigger: Element enters viewport (threshold: 0.2)
- Initial: opacity 0, translateY(30px)
- Final: opacity 1, translateY(0)
- Duration: 600ms
- Easing: ease-out-expo
- Stagger: 100ms between items

### Component-Specific Animations

#### Kinetic Logo (Hero)
- Letters slide in from alternating directions
- "8" rotates 360° on load (800ms, ease-spring)
- Hover: "8" rotates 180°

#### Hero Gradient Background
- Living gradient mesh
- 20s infinite loop
- Subtle color shifts (violet/cyan/purple at 5% opacity)

#### Bento Grid Cards
- Scroll trigger: Enter viewport
- Animation: scale(0.95) → scale(1), opacity 0 → 1
- Stagger: 100ms between cards
- Duration: 500ms
- Hover: translateY(-4px), border glow

#### Service Cards
- Hover: translateY(-8px), shadow expands
- Icon scales: 1 → 1.1
- Arrow slides right
- Duration: 300ms, ease-out-expo

#### Testimonial Wall (Marquee)
- Infinite horizontal scroll: 40px/second
- Pause on hover
- Gradient masks on edges
- 3 rows, alternating directions

#### Stats Counter
- Trigger: Scroll into view
- Count from 0 to target
- Duration: 2000ms
- Easing: ease-out-expo

#### CTA Button (Magnetic)
- Follows cursor within 20px radius
- Max displacement: 20px
- Spring physics for return

#### Navigation Underline
- Scale from center: scaleX(0) → scaleX(1)
- Origin: center
- Duration: 200ms

---

## Technology Stack

### Core Framework
| Technology | Purpose | Version |
|------------|---------|---------|
| Next.js | React framework | 14+ (App Router) |
| React | UI library | 18+ |
| TypeScript | Type safety | 5+ |

### Styling
| Technology | Purpose |
|------------|---------|
| Tailwind CSS | Utility-first CSS |
| tailwind-merge | Class merging |
| clsx | Conditional classes |

### Animation Libraries
| Technology | Purpose |
|------------|---------|
| Framer Motion | React animations |
| GSAP | Complex timelines, ScrollTrigger |
| Lenis | Smooth scroll |
| @gsap/react | GSAP React integration |

### Icons & Assets
| Technology | Purpose |
|------------|---------|
| Lucide React | Icon library |
| next/image | Optimized images |

### Fonts
| Font | Source |
|------|--------|
| Inter | Google Fonts / next/font |
| JetBrains Mono | Google Fonts / next/font |
| Cal Sans | CDN (geometric display font) |

### Optional Add-ons
| Technology | Purpose |
|------------|---------|
| Three.js / React Three Fiber | 3D effects |
| @number-flow/react | Animated numbers |

---

## Page-by-Page Breakdown

### 1. Home Page (/)

#### Section: Navigation Header
- Fixed position, glassmorphism on scroll
- Logo (left), Nav links (center), CTA (right)
- Mobile hamburger menu

#### Section: Hero (100vh)
- Kinetic "autom8 everything" headline
- Subheadline: "The automation system for modern businesses"
- Supporting text about 10+ hours saved weekly
- Primary CTA: "Book Your Free Audit"
- Secondary CTA: "See How It Works"
- Trust badge: "Trusted by 50+ business owners"
- 3 floating gradient orbs
- Scroll indicator at bottom

#### Section: Social Proof Bar
- "Trusted by forward-thinking businesses"
- Client logo carousel (grayscale)

#### Section: Services (Bento Grid)
- 5 service cards in bento layout:
  1. Workflow Automation (large, 2 cols)
  2. AI Integration
  3. Website SEO
  4. Email Automation
  5. Custom Development (large, 2 cols)
- Each: Icon, title, description, "Learn more →"

#### Section: Process
- Label: "HOW IT WORKS"
- Headline: "From chaos to autopilot in 3 steps"
- Steps: Discover → Build → Scale
- Connected line animation on scroll

#### Section: Stats/Social Proof
- 4-column grid:
  - 50+ Businesses Automated
  - 10,000+ Hours Saved
  - 99.9% Uptime
  - $2M+ Revenue Generated

#### Section: Testimonials (The Wall)
- 3-row infinite marquee
- 9-12 testimonial cards
- Glassmorphism effect
- Alternating scroll directions

#### Section: FAQ
- 5-6 accordion items
- Smooth expand/collapse
- Plus icon rotates to X

#### Section: Final CTA
- Gradient overlay background
- "Ready to automate your business?"
- "Book Your Free Audit" button

#### Section: Footer
- 4 columns: Logo, Links, Social, Contact
- Copyright: 2026 autom8 everything

---

### 2. Services Page (/services)

#### Section: Page Hero (60vh)
- "Services that scale with you"
- Brief description

#### Section: Service Detail Cards
- Vertical stack with alternating layout
- Each service: image, description, features, CTA

#### Section: Pricing
- 3 tiers: Starter ($1,500), Growth ($3,500), Scale (Custom)
- Feature lists
- "Popular" badge on Growth

---

### 3. Case Studies Page (/case-studies)

#### Section: Featured Case Study
- Full-width hero
- Large client name, industry tag, results highlight

#### Section: Case Study Grid
- 2-column masonry
- Each: logo, industry, challenge, result metric

---

### 4. About Page (/about)

#### Section: Mission
- "We believe business owners should work ON their business, not IN it."
- Mission statement

#### Section: Timeline
- Visual company journey
- Key milestones

#### Section: Values
- 4 values in bento grid

---

### 5. Contact Page (/contact)

#### Section: Contact Hero
- "Let's build something automated"

#### Section: Contact Form
- Fields: Name, Email, Company, Budget, Message
- Validation, success animation

#### Section: Alternative Contact
- Email, calendar link, social links

---

## Special Features Implementation

### 1. Kinetic Logo
- "autom8" with animated "8"
- 360° spin on load
- 180° rotation on hover
- GSAP for rotation, Framer Motion for hover

### 2. Bento Grid
- CSS Grid with named areas
- Responsive: 3 → 2 → 1 columns
- Gap: 24px
- Hover: gradient border, lift effect

### 3. Testimonial Wall
- Duplicate content for seamless loop
- CSS animation for scroll
- 3 rows, alternating directions
- Pause on hover

### 4. Living Gradient Background
```css
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.hero-bg {
  background: radial-gradient(ellipse at 20% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
  background-size: 200% 200%;
  animation: gradientShift 20s ease infinite;
}
```

### 5. Magnetic Buttons
- Framer Motion with useMotionValue
- Track mouse position relative to button
- Max displacement: 20px
- Spring physics for return

### 6. Scroll-Triggered Counters
- useInView hook from framer-motion
- Count from 0 to target value
- Duration: 2000ms
- Format with commas and suffixes

### 7. Glassmorphism
```css
.glass {
  background: rgba(18, 18, 26, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### 8. Gradient Border
```css
.gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: inherit;
  background: linear-gradient(135deg, #8B5CF6, #06B6D4);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.gradient-border:hover::before { opacity: 1; }
```

---

## Performance & Accessibility

### Performance Targets
- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

### Animation Performance
- Use `transform` and `opacity` only for animations
- Apply `will-change` sparingly
- Use `@media (prefers-reduced-motion: reduce)` fallbacks
- Implement `loading="lazy"` for images below fold

### Accessibility
- WCAG 2.1 AA compliance
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text for all images
- Keyboard navigation support
- Focus visible states
- Color contrast ratios 4.5:1 minimum
- Screen reader friendly animations

### SEO
- Semantic HTML structure
- Meta tags for all pages
- Open Graph / Twitter Cards
- Structured data (JSON-LD)
- Sitemap.xml
- Robots.txt

---

## File Structure

```
my-app/
├── app/
│   ├── page.tsx                    # Home page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   ├── services/
│   │   └── page.tsx
│   ├── case-studies/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── not-found.tsx               # 404 page
├── components/
│   ├── ui/                         # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── accordion.tsx
│   ├── sections/                   # Page sections
│   │   ├── hero.tsx
│   │   ├── services-grid.tsx
│   │   ├── process.tsx
│   │   ├── stats.tsx
│   │   ├── testimonials.tsx
│   │   ├── faq.tsx
│   │   └── footer.tsx
│   ├── navigation.tsx
│   ├── kinetic-logo.tsx
│   ├── bento-card.tsx
│   ├── testimonial-card.tsx
│   ├── stat-card.tsx
│   └── magnetic-button.tsx
├── hooks/
│   ├── use-scroll-animation.ts
│   ├── use-mouse-position.ts
│   └── use-counter.ts
├── lib/
│   ├── utils.ts
│   └── animations.ts
├── public/
│   ├── images/
│   └── fonts/
├── tailwind.config.ts
├── next.config.js
└── package.json
```

---

## Implementation Notes

### Phase 1: Foundation
1. Set up Next.js project with TypeScript
2. Configure Tailwind with custom theme
3. Install animation libraries (Framer Motion, GSAP, Lenis)
4. Set up fonts (Inter, JetBrains Mono, Cal Sans)

### Phase 2: Core Components
1. Build UI component library (Button, Card, Input)
2. Create layout components (Header, Footer)
3. Implement Kinetic Logo component
4. Build Bento Grid layout

### Phase 3: Page Sections
1. Hero section with all animations
2. Services bento grid
3. Process section with line animation
4. Stats counter section
5. Testimonial wall (marquee)
6. FAQ accordion

### Phase 4: Polish
1. Add reduced motion support
2. Performance optimization
3. SEO implementation
4. Accessibility audit
5. Cross-browser testing

---

## Implementation Update (2026-02-21)

### Brand Identity Assets
- Added an original **Autom8 mark + wordmark treatment** and standardized usage via `src/components/BrandLogo.tsx`.
- Wired the logo system into:
  - Primary header navigation
  - Mobile nav overlay
  - Footer brand block
  - Hero top brand chip (key brand surface)

### Favicon & Device Icons
- Added production-ready icon assets in `public/`:
  - `favicon.ico`
  - `favicon-16x16.png`
  - `favicon-32x32.png`
  - `favicon-512x512.png`
  - `apple-touch-icon.png`
  - `icon.svg`
- Synced `src/app/favicon.ico` to the new icon set.

### Social Metadata & Share Previews
- Upgraded root metadata in `src/app/layout.tsx`:
  - Title template + default title
  - Global description
  - Canonical metadata (`/`)
  - Open Graph (`title`, `description`, `url`, `siteName`, `images`)
  - Twitter card metadata (`summary_large_image` + share image)
  - `metadataBase` driven by `NEXT_PUBLIC_SITE_URL` fallback to Vercel production URL
- Added OG share image asset: `public/og/autom8-share.png` (1200×630).

### Domain & Crawl Alignment
- Corrected sitemap root entry and normalized URLs in `public/sitemap.xml` to the production domain.

### Inline Brand Asset Consistency (2026-02-21)
- Extended `src/components/BrandLogo.tsx` with inline-safe variants:
  - size scale now includes `xs`
  - `as="span"` rendering mode for non-link inline placements
  - `showMark` toggle for compact wordmark-only substitutions
  - `screenReaderText` fallback via visually hidden text (`sr-only`) to preserve accessibility/SEO context
- Replaced plain-text brand mentions with inline logo treatment in marketing copy:
  - `src/app/about/page.tsx` (`About autom8` heading and opening story paragraph)
  - `src/components/Testimonials.tsx` (lead testimonial quote)
  - `src/components/Footer.tsx` (copyright line)
- Applied baseline alignment and compact spacing classes (`align-[...]`, `mr-1`, flex wrapping) to avoid layout shifts across mobile/desktop.

---

**End of Architecture Blueprint**

*This document serves as the single source of truth for the autom8 everything website implementation.*

## Implementation Update (2026-02-21 — Blog Buildout Deep Pass)

### Blog Content Architecture Hardening
- Expanded seeded blog model to support richer editorial and SEO fields:
  - `seoTitle`, `tags`, `featured`, `trendingScore`
  - `updatedAt`, `localRelevance`, and route-aware `serviceLinks`
  - section-level checklist/example support for practical execution depth
- All existing seeded posts are now expanded with implementation checklists and applied scenario guidance.

### Blog Index UX Improvements
- `/blog` now includes:
  - Featured guides module
  - Trending panel with ranked post discoverability
  - Category and topic-tag discovery chips
  - Enhanced article cards with tags and cleaner scan hierarchy

### Blog Detail UX + Content Controls
- `/blog/[slug]` now renders clear H2/H3 structure, practical checklist blocks, and real-world example blocks.
- Added Phoenix/Arizona relevance callout for local-intent posts.
- Added per-post internal service linking block plus explicit quote/contact CTA.

### Schema Upgrade
- Added `BlogPosting` schema generator (`buildBlogPostingSchema`) with:
  - `datePublished`, `dateModified`, `articleSection`, `inLanguage`
  - explicit `mainEntityOfPage`, author/publisher/image coverage
- Blog detail route now emits FAQ + Breadcrumb + BlogPosting JSON-LD for stronger SERP eligibility.

### Validation
- Lint: pass
- Build: pass
## Implementation Update (2026-02-21 � SEO Batch 1: Technical + On-Page Foundation)

### Technical SEO Baseline
- Introduced shared SEO helper in `src/lib/seo.ts` to standardize:
  - canonical path handling
  - titles/descriptions
  - Open Graph + Twitter metadata defaults
- Updated route architecture so core pages can export route metadata cleanly.
- Added app-router metadata routes:
  - `src/app/robots.ts`
  - `src/app/sitemap.ts`
- Added/updated static crawl artifacts in `public/robots.txt` and `public/sitemap.xml`.

### Information Architecture Expansion
- Added `/blog` as a content hub for SEO and internal-link equity flow.
- Added high-intent service landing pages:
  - `/services/ai-automation`
  - `/services/crm-automation`
  - `/services/local-seo-automation`
- Updated navigation/footer/internal sections to improve crawl paths between home, services, blog, and conversion pages.

### Local SEO Foundation
- Injected `LocalBusiness` JSON-LD schema globally in `src/app/layout.tsx`.
- Added visible NAP consistency blocks in footer and contact experience.
- Added service-area language for Phoenix, Arizona + broader U.S. service model.

### Content SEO Quick Wins
- Improved H1/H2 language on core pages to align with high-intent keyword targets.
- Reduced generic headings and added clearer topical entities (automation services, CRM automation, local SEO automation, case studies).

### Performance / UX Safeguards
- Preserved current visual system and animation behavior (no major visual redesign).
- No large new media assets added in this batch.

### Remaining Follow-Up
- Replace placeholder phone in NAP/schema with final verified business number.
- Add article detail pages, FAQ schema per service page, and citation/backlink execution phase.

## Implementation Update (2026-02-21 — Offer Pivot: Website + Tools + Review Funnel + Managed SEO)

### Messaging Pivot (Conversion Copy)
- Home hero now leads with revenue-focused website creation + custom tools.
- Hero and supporting copy explicitly position managed SEO + monthly blog content as the ongoing growth layer.
- CTA copy updated across key surfaces to action-oriented language:
  - Build Strategy Call
  - View Growth Plan

### Services Taxonomy (Primary Offer)
- Refactored core services sections to emphasize exactly four primary cards:
  1. Website Creation
  2. Custom Tools
  3. Review Funnel System
  4. Managed SEO + Blog Content

### Proof Positioning Update
- Added a dedicated internal-workflow proof block in testimonials to communicate a driving-school style review-funnel implementation pattern.
- Framing intentionally avoids fabricated claims and presents methodology + expected operational impact.

### Package Framing
- Services page now includes a two-track package block:
  - Build (one-time implementation)
  - Growth (monthly managed retainer)

### FAQ Pivot
- Updated FAQ with required decision-stage questions:
  - Do you manage SEO and blogs monthly?
  - Do you build custom tools?
  - Can you replace my current website?

### Validation
- Lint: pass
- Build: pass
- Visual system preserved (content pivot with minor layout edits only).

## Implementation Update (2026-02-21 — SEO Mega Batch)

### New Content Architecture
- Added `src/content/blogPosts.ts` as centralized SEO content dataset.
- Added `src/app/blog/[slug]/page.tsx` with static generation via `generateStaticParams` for all posts.
- Added `src/content/locations.ts` + `src/app/locations/[slug]/page.tsx` for Phoenix-local scaling.

### New Route Families
- Blog details: `/blog/[slug]` (22 published posts)
- Location hub/details:
  - `/locations`
  - `/locations/[slug]`
- Additional high-intent service pages:
  - `/services/business-process-automation`
  - `/services/email-automation-services`
  - `/services/zapier-consulting`
  - `/services/gohighlevel-setup`

### Structured Data System
- Extended `src/lib/seo.ts` with reusable schema builders:
  - `buildFaqSchema`
  - `buildServiceSchema`
  - `buildBreadcrumbSchema`
  - `toAbsoluteUrl`
- Applied FAQ + Service + Breadcrumb schema where relevant (service pages, location pages, blog detail).

### Crawl & Internal Linking
- Expanded `src/app/sitemap.ts` to include static + dynamic blog/location routes.
- Synced fallback `public/sitemap.xml` route coverage.
- Navigation/footer now include location architecture links for stronger crawl path distribution.

### Operations Docs Added
- `docs/CONVERSION-TRACKING-SETUP.md`
- `docs/BACKLINK-CITATION-EXECUTION.md`
- `docs/CITATION-CHECKLIST.csv`

## Implementation Update (2026-02-21 — Final Hardening)

### SEO & Schema Hardening
- Added `Article` JSON-LD coverage on blog detail pages (`/blog/[slug]`) in addition to existing FAQ/Breadcrumb schema.
- Kept canonical/meta generation centralized via `buildMetadata` for static and dynamic route families.

### NAP & Config Hardening
- Added env-driven business profile source (`src/lib/business.ts`) for:
  - business name
  - email
  - phone display + E.164
  - location/service-area label
  - social profile URLs
- Added `.env.example` with exact production keys to prevent placeholder NAP drift.
- Updated global `LocalBusiness` schema and visible contact/footer NAP surfaces to consume env-driven values.

### Crawl & IA Hardening
- Added legal page architecture and linked it from footer:
  - `/privacy`
  - `/terms`
  - `/security`
- Expanded sitemap coverage to include new legal routes.
- Strengthened location hub internal-link flow into services/blog/contact.
- Added missing GoHighLevel service card to improve service architecture discoverability.

### Deployment Status
- Production deployed to `https://autom8everything.com`
- Deployment ID: `GTxunsScrDbRekrj437iDpMYfKpf`

## Implementation Update (2026-02-21 � Proof Card Removal)

### Homepage content adjustment
- Removed the previously added internal workflow proof card from the testimonials section (`src/components/Testimonials.tsx`) including:
  - "Internal Workflow Proof"
  - "Driving School Review Funnel Pattern"
- Kept the testimonial wall and section heading intact while rebalancing vertical spacing to preserve intentional layout rhythm.
- Confirmed the removed card does not leave any broken section anchors/links.

### Validation + Deploy
- Build sanity check passed (`npm run build`).
- Deployed to Vercel production:
  - Alias: `https://autom8everything.com`
  - Deployment URL: `https://autom8-everything-oidensgki-austs-projects-ee024705.vercel.app`

## Implementation Update (2026-02-21 — Homepage Mass-Market Messaging Rewrite)

### Scope
- Homepage content pass only (`/`) with minimal layout changes.
- Goal: improve clarity for average local business owners while keeping high conversion intent.

### Copy System Changes (Homepage)
- Hero rewritten for plain-language outcomes:
  - more calls
  - more booked jobs
  - fewer missed leads
- Service section descriptions simplified and stripped of technical jargon where possible.
- Process section reframed to a simple 3-step path (quick call -> build -> ongoing growth).
- Social proof/testimonial language rewritten to sound more natural and business-owner friendly.
- FAQ rewritten in direct, easy-to-scan Q&A language.
- Final CTA rewritten with clearer action labels and plain-language close.

### SEO Messaging Alignment
- Home metadata (`src/app/page.tsx`) updated to match mass-market positioning and simpler keyword intent.

### Validation
- Lint: pass
- Build: pass

## Implementation Update (2026-02-21 � Local Preset B Cinematic Preview)

### Added local preview route
- New local-only route: `/b-copy` (not wired into sitemap/nav and marked `noindex, nofollow`).
- Files added:
  - `src/app/b-copy/page.tsx`
  - `src/app/b-copy/BCopyPageClient.tsx`
  - `src/app/b-copy/b-copy.css`

### Preset B visual system applied exactly
- Palette tokens used in the preview implementation:
  - Obsidian `#0D0D12`
  - Champagne `#C9A84C`
  - Ivory `#FAF8F5`
  - Slate `#2A2A35`
- Typography stack enforced via existing layout font variables:
  - Inter
  - Playfair Display (italic emphasis in hero/section display)
  - JetBrains Mono (system labels/indicators)

### Cinematic UX + interaction model
- Global subtle noise texture overlay implemented via inline SVG `feTurbulence` data URI at low opacity.
- Rounded container language implemented with 2rem�3rem radius system (`--b-radius-lg`, `--b-radius-xl`).
- Micro-interactions implemented:
  - magnetic hover behavior (pointer-follow translation + reset)
  - hover scale `1.03` with `cubic-bezier(0.25,0.46,0.45,0.94)`
  - button sliding background span transitions (`overflow-hidden`)
  - interactive lift `translateY(-1px)` on links/cards

### Animation lifecycle + section architecture
- GSAP + ScrollTrigger integration added; animation setup uses `gsap.context()` and cleanup with `ctx.revert()`.
- Easing/stagger usage aligned to prompt constraints:
  - entrances: `power3.out`
  - morphs/transitions: `power2.inOut`
  - stagger: `0.08` text, `0.15` cards
- `/b-copy` section flow implemented:
  1. Floating island navbar with scroll morph
  2. 100dvh hero opening shot with full-bleed real Unsplash image + heavy gradient + bottom-left typographic composition + GSAP intro stagger
  3. Features with 3 interactive cards:
     - Diagnostic Shuffler (3s cycle)
     - Telemetry Typewriter (blinking cursor + live feed pulse)
     - Cursor Protocol Scheduler (animated SVG cursor routing)
  4. Philosophy manifesto section with parallax texture
  5. Protocol sticky stacking archive (3 pinned cards + stack timeline effects + SVG/canvas-like animated motifs)
  6. Membership/Pricing 3-tier grid with emphasized middle tier
  7. Footer operational indicator (pulsing green dot + monospace)

### Dependency/config
- Added `gsap` dependency.
- Updated `next.config.ts` image remote pattern for `images.unsplash.com` to support real hero media.

### Validation
- `npm run lint` ?
- `npm run build` ?

### Blockers / notes
- Existing non-blocking Next workspace-root warning remains due multiple lockfiles outside the project directory.

## Implementation Update (2026-02-21 — Local Preset C "Brutalist Signal" Preview)

### Route and purpose
- Added a local-only preview route at `/c-copy`.
- Route is intentionally excluded from indexing (`noindex, nofollow`) for safe local iteration.

### Preset C design system (route-scoped)
- Color tokens implemented exactly:
  - Paper `#E8E4DD`
  - Signal Red `#E63B2E`
  - Off-white `#F5F3EE`
  - Black `#111111`
- Typography stack implemented directly in the route with `next/font/google`:
  - Space Grotesk (UI/body)
  - DM Serif Display Italic (display emphasis)
  - Space Mono (labels/system text)

### Cinematic architecture retained, effects simplified
- Preserved the cinematic section sequencing while reducing high-risk animation layers to prioritize readability and render stability:
  1. Signal-style sticky nav + CTA
  2. Hero block with clear value proposition and conversion CTA
  3. Feature signal cards (diagnostic queue + activity feed + offer stack)
  4. Manifesto split block
  5. Protocol archive progression cards
  6. Pricing/plans grid
  7. Footer CTA
- Removed complex overlap/pinned stack effects in this variant to avoid text ghosting and clipping issues observed in the prior prototype.

### Content direction
- Copy rewritten for mass-market clarity (local business owner language, outcome-first, minimal jargon).

### Validation
- Lint: pass
- Build: pass


## Implementation Update (2026-02-23 - Launch metadata/NAP hardening)
- Updated src/lib/business.ts defaults to remove placeholder email and support optional street/postal env keys.
- Updated global LocalBusiness schema in src/app/layout.tsx to conditionally emit street/postal, and set areaServed from configured service-area label.
- Updated .env.example to remove placeholder phone values and document final production NAP requirements.
- Added docs/QA.md with implemented-vs-verified evidence and acceptance checklist.
- Added docs/RUNBOOK.md for deployment verification steps (metadata, schema, robots/sitemap, OG previews).
