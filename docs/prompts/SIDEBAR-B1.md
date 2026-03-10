# SIDEBAR-B1: Core ProductSidebar Component + Desktop Layout

**Thinking level: medium**

## Context
You are working on `autom8everything.com` — a Next.js 16 site with TypeScript, Tailwind CSS 4, and Framer Motion 12. Branch: `ui/framer-sidebar`.

The current homepage (`src/app/HomePageClient.tsx`) uses a `ServicesBento` component that displays 4 products in a bento grid. We're replacing it with a Framer-inspired sidebar product browser.

## Task

### 1. Add Syne Font (`src/app/layout.tsx`)

Add `Syne` from `next/font/google` alongside the existing fonts:

```typescript
import { Inter, JetBrains_Mono, Playfair_Display, Syne } from "next/font/google";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800"],
});
```

Add `${syne.variable}` to the `<body>` className alongside the existing font variables.

### 2. Build `ProductSidebar` Component (`src/components/ProductSidebar.tsx`)

Create a new `"use client"` component that renders a sidebar product browser. Study the existing `src/components/ServicesBento.tsx` for the product data structure — reuse the exact same `products` array and `Product` type (copy them into this file or extract to a shared location).

**Desktop layout (≥ 1024px):**
- Section wrapper with `id="services"` (same as ServicesBento)
- Section heading: reuse the exact heading text and subheading from ServicesBento's `<h2>` and `<p>` above the sidebar
- Two-column layout: left sidebar (~28% width) + right detail panel (~72% width)
- Sidebar has the 4 product names stacked vertically as large clickable labels
- Label typography: `font-family: var(--font-syne)`, `font-weight: 800`, size `text-4xl lg:text-5xl` (48-64px range)
- Active label: `text-white` with a 3px left border bar in `#8B5CF6` (purple), slight purple text-shadow: `0 0 30px rgba(139,92,246,0.3)`
- Inactive labels: `text-[#52525B]`, hover → `text-[#A1A1AA]`, `cursor-pointer`
- Labels spaced with `gap-6` or `gap-8` for breathing room
- `useState` to track selected product index (default: 0, Cadence)

**Detail panel (right side):**
- Shows the selected product's full detail:
  - Eyebrow label (e.g., "AI Receptionist") in `text-xs uppercase tracking-[0.16em] text-[#8B5CF6]`
  - Product icon in a rounded container (same style as ServicesBento's icon treatment)
  - Product name as `<h3>` in Playfair Display, `text-2xl md:text-3xl font-bold text-white`
  - Value prop paragraph in `text-[#A1A1AA] text-[15px] leading-relaxed`
  - Badge if present (e.g., "7-DAY FREE TRIAL") — same badge styling as ServicesBento
  - Divider line
  - Features list (if product has features) with check icons — same style as ServicesBento
  - Price in large bold text (`text-4xl font-extrabold text-white`)
  - Price context below
  - Micro proof line with check icon
  - CTA button(s) — primary gradient button + optional secondary outline button
- Panel background: `bg-[#111118]/60` with `border border-white/[0.06] rounded-3xl p-8 md:p-10`
- For Cadence (hero product), show the features sub-panel. For non-hero products, show a simpler layout without the features grid.

**Mobile layout (< 1024px) — PLACEHOLDER for B2:**
- For now, just stack the sidebar labels horizontally in a flex row with `overflow-x-auto` and the detail below
- This will be polished in B2

**Styling notes:**
- Use existing CSS variables and design tokens from `globals.css`
- Use existing glass-card patterns where appropriate
- Section glow effects: include the `section-glow section-glow--purple` div like ServicesBento does
- Keep the `max-w-6xl mx-auto px-6` container pattern

### 3. Swap on Homepage (`src/app/HomePageClient.tsx`)

- Replace `import ServicesBento from "@/components/ServicesBento"` with `import ProductSidebar from "@/components/ProductSidebar"`
- Replace `<ServicesBento />` with `<ProductSidebar />`
- Do NOT delete ServicesBento.tsx — just stop importing it

### 4. No Content Changes
Do not modify any text, copy, pricing, CTAs, or feature lists. Use the exact same data from the products array.

## Gate
```bash
npm run build
```
Must complete with zero errors.

## Procurement Contract
Every coder batch must terminate immediately after the required gates for that batch are satisfied and the code is committed and pushed. Coders must not start local servers, run manual verification loops, open-ended exploratory tests, or invent post-gate validation steps. Every batch must end with a git commit and push to the project branch. If a batch makes no code changes, the coder must write a status/log entry (e.g., append to docs/deploy-log.md) and commit+push it. Coders MUST notify Steve as the final step after git push by POSTing to `http://localhost:18789/hooks/agent` with `Authorization: Bearer KyCiiWTXATTqCayTrPyoE9krcBzXFP7YPtzqEGlA1aA=` and body `{"message":"Batch complete. Gate ready.","agentId":"main","deliver":false}`. Write the JSON to a temp file and use `curl.exe --data-binary @file` to avoid shell escaping issues. Coders do NOT need to set up git credentials. The orchestrator handles PAT configuration pre-flight.
