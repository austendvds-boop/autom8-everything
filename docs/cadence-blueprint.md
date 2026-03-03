# Cadence AI Voice Agent — Integration Blueprint

## Executive Summary

Add **Cadence** (AI receptionist for local businesses) to the autom8everything.com site. Four changes: new service page, card on services listing, homepage highlight section, footer link. Frontend-only — no new env vars, no backend changes.

---

## Change 1: New Service Page `/services/cadence`

### File to Create

`src/app/services/cadence/page.tsx`

### Structure

Server component (matches `ai-automation/page.tsx` pattern). Uses `Navigation`, `Footer`, `buildMetadata`, `buildServiceSchema`, `buildFaqSchema` from existing `@/lib/seo`.

### Component Outline

```
<main className="min-h-screen bg-[#0A0A0F]">
  <Navigation />
  <script ld+json serviceSchema />
  <script ld+json faqSchema />

  <!-- HERO -->
  <section className="pt-32 pb-20 mesh-bg">
    <div className="max-w-4xl mx-auto px-6">
      <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4">Cadence AI Voice</p>
      <h1>Never Miss a Call Again</h1>
      <p>AI receptionist that answers your business line 24/7. We give you a number, you forward your calls to it. Done in 5 minutes.</p>
      <div className="flex gap-4 mt-8">
        <Link href="/contact" CTA button> Start Free Trial </Link>
        <Link href="#how-it-works" ghost button> See How It Works </Link>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS (3 steps) -->
  <section id="how-it-works" className="py-20">
    <div className="max-w-5xl mx-auto px-6">
      <h2>Live in 5 Minutes. Seriously.</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        Step 1 — "Sign Up & Get Your Number"
          "We provision a dedicated phone number for your business. No hardware, no porting."

        Step 2 — "Forward Your Calls"
          "Set your existing business line to forward to your new Cadence number. One setting change."

        Step 3 — "Cadence Answers 24/7"
          "Cadence handles FAQs, books appointments, and transfers urgent calls to you. You stay in control."

      </div>
    </div>
  </section>

  <!-- KEY FEATURES -->
  <section className="py-20 bg-[#12121A]">
    <div className="max-w-5xl mx-auto px-6">
      <h2>What Cadence Does</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        Feature cards (same border/hover style as ServicesPageClient cards):
        - "24/7 Call Answering" — Never send another customer to voicemail. Cadence picks up every call, day or night.
        - "Appointment Booking" — Cadence checks availability and books directly into your calendar.
        - "FAQ Handling" — Answers common questions about hours, pricing, services, and location automatically.
        - "Live Transfer" — Urgent calls get transferred to you or your team in real time.
        - "Call Summaries" — Get a text or email summary after every call so nothing falls through the cracks.
        - "Zero Tech Setup" — No webhooks, no APIs, no developers. Just call forwarding.

      </div>
    </div>
  </section>

  <!-- VS COMPETITORS -->
  <section className="py-20">
    <div className="max-w-4xl mx-auto px-6">
      <h2>Why Cadence Instead of Vapi, Retell, or GHL Voice?</h2>
      <p className="text-[#A1A1AA] mb-8">
        Those platforms are built for developers. You need a phone system, API keys, webhooks, and technical staff to get started. Cadence is built for business owners — forward your calls and you're live.
      </p>
      <table or comparison grid:
        | Feature              | Cadence          | Vapi / Retell / GHL |
        |----------------------|------------------|---------------------|
        | Setup time           | 5 minutes        | Hours to days       |
        | Requires developer   | No               | Yes                 |
        | Existing phone infra | Not needed       | Required            |
        | Monthly cost         | $199/mo flat     | Usage-based + infra |
        | Setup fee            | $0               | Varies              |
    </div>
  </section>

  <!-- PRICING -->
  <section className="py-20 bg-[#12121A]">
    <div className="max-w-3xl mx-auto px-6 text-center">
      <h2>Simple Pricing. No Surprises.</h2>
      <div className="rounded-2xl border border-[#8B5CF6]/40 bg-[#0A0A0F] p-10 mt-8">
        <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">All-Inclusive</p>
        <p className="text-5xl font-bold mb-2">$199<span className="text-xl text-[#A1A1AA]">/month</span></p>
        <p className="text-[#A1A1AA] mb-6">7-day free trial. No contracts. Cancel anytime.</p>
        <ul className="text-left max-w-sm mx-auto space-y-2 text-[#A1A1AA] text-sm mb-8">
          <li>✓ $0 setup fee</li>
          <li>✓ Dedicated phone number included</li>
          <li>✓ Unlimited calls during trial</li>
          <li>✓ 24/7 AI answering</li>
          <li>✓ Appointment booking</li>
          <li>✓ Call summaries via text/email</li>
          <li>✓ Live transfer to your phone</li>
        </ul>
        <Link href="/contact" CTA button>Start Your Free Trial</Link>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section className="py-20">
    <div className="max-w-3xl mx-auto px-6">
      <h2>Frequently Asked Questions</h2>
      FAQs (also used in ld+json schema):
        - "Do I need a new phone number?" → "No. You keep your existing number. We give you a Cadence number and you forward calls to it."
        - "What happens during the free trial?" → "Full access for 7 days. If you don't love it, cancel before the trial ends and pay nothing."
        - "Can Cadence transfer calls to me?" → "Yes. For urgent or complex calls, Cadence transfers directly to your cell or office line."
        - "What if I already use a VoIP system?" → "Cadence works with any phone system that supports call forwarding — landlines, cell phones, VoIP, all of it."
        - "Is there a contract?" → "No. Month-to-month. Cancel anytime from your dashboard."
    </div>
  </section>

  <!-- BOTTOM CTA -->
  <section className="py-20 bg-[#12121A]">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <h2>Stop Missing Calls. Start Your Free Trial.</h2>
      <p className="text-[#A1A1AA] text-lg mb-8">
        Set up in 5 minutes. No credit card required for the trial.
      </p>
      <Link href="/contact" CTA button>Start Free Trial</Link>
    </div>
  </section>

  <Footer />
</main>
```

### Metadata

```ts
export const metadata: Metadata = buildMetadata({
  title: "Cadence AI Voice Agent — AI Receptionist for Local Businesses",
  description:
    "Cadence answers your business calls 24/7, books appointments, and handles FAQs. No setup fee, no developer needed. 7-day free trial, then $199/month.",
  path: "/services/cadence",
  keywords: [
    "ai receptionist",
    "ai phone answering service",
    "virtual receptionist for small business",
    "ai voice agent",
    "cadence ai",
  ],
});
```

### Structured Data

```ts
const serviceSchema = buildServiceSchema({
  name: "Cadence AI Voice Agent",
  description: "AI receptionist that answers business calls 24/7, books appointments, handles FAQs, and transfers urgent calls. $199/month, no setup fee.",
  path: "/services/cadence",
});
```

---

## Change 2: Services Listing Page — Add Cadence Card

### File to Edit

`src/app/services/ServicesPageClient.tsx`

### What to Change

In the "Supporting Service Pages" section, add Cadence as the **first item** in the array (to give it top-left prominence):

```ts
{
  href: "/services/cadence",
  title: "Cadence AI Voice Agent",
  description: "AI receptionist that answers your calls 24/7, books appointments, and handles FAQs. Live in 5 minutes.",
},
```

Insert before the existing `ai-automation` entry.

### Exact Location

Inside the `.map()` array in the `<section className="py-20 bg-[#12121A]">` block (the one with the "Supporting Service Pages" heading), prepend the new object to the array.

---

## Change 3: Homepage — Cadence Highlight Section

### File to Edit

`src/app/HomePageClient.tsx`

### What to Change

Add a new component `<CadenceHighlight />` between `<ServicesBento />` and `<WhoItsFor />`:

```tsx
<ServicesBento />
<CadenceHighlight />
<WhoItsFor />
```

### New Component to Create

`src/components/CadenceHighlight.tsx`

```
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

Section: py-24 bg-[#0A0A0F]
Container: max-w-5xl mx-auto px-6
Layout: Two-column on md+ (text left, visual/stats right). Single column on mobile.

Left column:
  <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-3">New: Cadence AI Voice</p>
  <h2 className="text-3xl md:text-4xl font-semibold mb-4" playfair>
    Your Business Deserves a Receptionist That Never Sleeps
  </h2>
  <p className="text-[#A1A1AA] text-lg mb-6">
    Cadence answers every call, books appointments, and handles FAQs — 24/7. Forward your calls and you're live in 5 minutes. No developer. No setup fee.
  </p>
  <div className="flex gap-4">
    <Link href="/services/cadence" CTA purple button>Start Free Trial</Link>
    <Link href="/services/cadence" ghost button>Learn More</Link>
  </div>

Right column:
  Styled card (bg-[#12121A] border border-[#8B5CF6]/20 rounded-2xl p-8) with:
    - Phone icon in purple circle
    - "$199/mo" large text
    - "7-day free trial • No contracts" subtitle
    - Three mini feature lines: "24/7 answering", "Appointment booking", "Live call transfer"

Animation: motion initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
```

### Import

Add to `HomePageClient.tsx`:

```ts
import CadenceHighlight from "@/components/CadenceHighlight";
```

---

## Change 4: Footer — Add Cadence Link

### File to Edit

`src/components/Footer.tsx`

### What to Change

In the `footerLinks.product` array, add after "AI Automation":

```ts
{ label: "Cadence AI Voice", href: "/services/cadence" },
```

### Exact Location

```ts
const footerLinks = {
  product: [
    { label: "Automation Services", href: "/services" },
    { label: "AI Automation", href: "/services/ai-automation" },
    { label: "Cadence AI Voice", href: "/services/cadence" },  // ← ADD THIS LINE
    { label: "CRM Automation", href: "/services/crm-automation" },
    ...
  ],
```

---

## Files Summary

| Action | File Path | Description |
|--------|-----------|-------------|
| **CREATE** | `src/app/services/cadence/page.tsx` | Full Cadence service page |
| **CREATE** | `src/components/CadenceHighlight.tsx` | Homepage highlight section |
| **EDIT** | `src/app/services/ServicesPageClient.tsx` | Add card to Supporting Service Pages |
| **EDIT** | `src/app/HomePageClient.tsx` | Import + render CadenceHighlight |
| **EDIT** | `src/components/Footer.tsx` | Add footer link |

## Dependencies

No new npm packages. Uses existing:
- `next/link`
- `framer-motion` (motion)
- `lucide-react` (Phone, Check, etc.)
- `@/lib/seo` (buildMetadata, buildServiceSchema, buildFaqSchema)
- `@/components/Navigation`, `@/components/Footer`

## Environment Variables

**None required.** This is a frontend-only change. No API keys, no Twilio config, no backend integration. The "Start Free Trial" CTA links to `/contact` (existing contact form).

## Design Tokens (existing, reuse)

- Background dark: `#0A0A0F`
- Background card: `#12121A`
- Card alt: `#1A1A23`
- Purple primary: `#8B5CF6`
- Purple light: `#A78BFA`
- Muted text: `#A1A1AA`
- Border subtle: `border-white/5`
- Border hover: `border-[#8B5CF6]/30` or `/40` or `/50`
- Font heading: `var(--font-playfair), serif`
- Gradient text class: `gradient-text`
- Hero background class: `mesh-bg`

## CTA Strategy

All "Start Free Trial" buttons link to `/contact`. If a dedicated Cadence signup flow is built later, update the href to `/services/cadence/signup` or an external form URL. For now, the contact page is the funnel.

## SEO Notes

- Service page gets its own `buildMetadata` and `buildServiceSchema` structured data
- FAQ section uses `buildFaqSchema` for rich results
- Internal linking: service page links back to `/services`, `/blog`, and `/locations/phoenix`
- Cadence card on services listing page provides crawl path from `/services` → `/services/cadence`
- Footer link provides site-wide crawl path
