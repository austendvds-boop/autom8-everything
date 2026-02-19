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

**End of Architecture Blueprint**

*This document serves as the single source of truth for the autom8 everything website implementation.*