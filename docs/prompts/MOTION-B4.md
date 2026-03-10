# MOTION-B4: Product Pages Motion + Pricing Copy Fixes + Web/SEO Merge

**Thinking level: low**
**Branch: `ui/motion-system`**
**Gate: `npm run build`**

---

## Context

B1-B3 built the complete motion system: tokens in `src/lib/motion.ts`, Aurora background, AnimatedHeadline, TiltCard, ShimmerButton, upgraded homepage sections, and pricing page. This batch applies motion to all product/service pages and fixes pricing copy across the site.

Read `src/lib/motion.ts` for available tokens. Read components: TiltCard, ShimmerButton, AnimatedHeadline.

---

## Task 1: Pricing Copy Fixes (apply everywhere)

Search the entire `src/` directory for price references and update:

1. **"$500"** for Launch website → **"$499"**
2. **"$1,000"** or **"$1000"** for Enterprise website → **"$999"**
3. **"From $500"** → **"From $499"**
4. Wherever Launch or Enterprise prices are shown, add a note below: **"+ $50/mo hosting required"**
   - In card/tier displays, add as a small text line: `<p className="text-xs text-[#71717A] mt-1">+ $50/mo hosting required</p>`

**Files to check and update:**
- `src/components/ServicesBento.tsx` — product cards
- `src/app/pricing/page.tsx` and/or `src/app/pricing/PricingPageClient.tsx` — pricing tiers
- `src/app/services/websites/page.tsx` — website tiers
- `src/app/services/website-creation/page.tsx` — if it exists with prices
- Any other file containing "$500" or "$1,000" price for websites

**Do NOT change:**
- Cadence $199/mo — correct
- Review Funnel $79/mo — correct  
- Growth plan $299/mo — correct
- Hosting $50/mo — correct

---

## Task 2: Merge `/services/seo-content` into `/services/websites`

The website page at `src/app/services/websites/page.tsx` needs to cover both web and SEO.

**Steps:**

1. Read `src/app/services/seo-content/page.tsx` to understand the SEO content page structure and copy
2. Read `src/app/services/websites/page.tsx` to understand the website page structure
3. Merge into `src/app/services/websites/page.tsx`:
   - Top section: website tiers and build process (existing website page content)
   - Divider/transition section
   - Bottom section: monthly SEO plans, deliverables, how it works (from seo-content page)
   - Keep both sets of FAQs, deduplicate if any overlap
4. Apply metadata for the merged page — title should reference both: `"Websites + Monthly SEO | Autom8 Everything"`
5. Replace `src/app/services/seo-content/page.tsx` with a redirect:
   ```typescript
   import { redirect } from "next/navigation";
   export default function SeoContentPage() {
     redirect("/services/websites");
   }
   ```

**The merged page must be a Server Component for metadata.** Create a `WebsitesPageClient.tsx` if the merged page needs client-side motion.

---

## Task 3: Add Motion to All Product/Service Pages

Each service page follows the same pattern. If the page is currently a Server Component with metadata, extract JSX into a Client Component (like `CadencePageClient.tsx`).

**Apply to each page:**

### `/services/cadence` (page.tsx)
- Hero section heading: `<AnimatedHeadline>` or `fadeUp` variant
- Feature cards/list: `staggerContainer` + `staggerItem`
- CTA buttons: Replace with `<ShimmerButton>`
- FAQ section: `fadeUp` stagger
- Add `useReducedMotion` guard

### `/services/review-funnel` (page.tsx)
- Same pattern as Cadence
- Hero heading: `fadeUp`
- Benefits/features: `staggerContainer` + `scaleIn` on each card
- CTA: `<ShimmerButton>`

### `/services/websites` (merged page from Task 2)
- Website tier cards: `scaleIn` with `staggerContainer`, wrap in `<TiltCard>`
- SEO deliverables: `staggerContainer` + `staggerItem`
- How it works steps: alternating `slideInLeft`/`slideInRight`
- CTA: `<ShimmerButton>`

### `/services/custom-apps` (page.tsx)
- Hero: `fadeUp`
- Feature list: `staggerContainer` + `staggerItem`
- CTA: `<ShimmerButton>`

**For each page:**
- Import motion tokens from `@/lib/motion`
- Import `useReducedMotion` from `motion/react`
- When reduced motion preferred, render static (no animation)
- Keep all copy, links, and structure unchanged (except pricing fixes from Task 1)

---

## Task 4: Services Hub Page

Check `src/app/services/page.tsx` and `src/app/services/ServicesPageClient.tsx`. If they exist and list all services:
- Apply `fadeUp` on heading
- `staggerContainer` + `scaleIn` on service cards
- `<ShimmerButton>` on CTAs

---

## Files to create (as needed)
- `src/app/services/cadence/CadencePageClient.tsx` — if extracting from server page
- `src/app/services/review-funnel/ReviewFunnelPageClient.tsx` — if extracting
- `src/app/services/websites/WebsitesPageClient.tsx` — for merged page
- `src/app/services/custom-apps/CustomAppsPageClient.tsx` — if extracting

## Files to modify
- `src/components/ServicesBento.tsx` — pricing fix
- `src/app/pricing/page.tsx` or `PricingPageClient.tsx` — pricing fix
- `src/app/services/websites/page.tsx` — merge + motion
- `src/app/services/seo-content/page.tsx` — redirect
- `src/app/services/cadence/page.tsx` — motion
- `src/app/services/review-funnel/page.tsx` — motion
- `src/app/services/custom-apps/page.tsx` — motion
- `src/app/services/page.tsx` or `ServicesPageClient.tsx` — motion

---

## Gate
```bash
npm run build
```

Build must succeed with zero errors.

---

## Procurement Contract
Every coder batch must terminate immediately after the required gates for that batch are satisfied and the code is committed and pushed. Coders must not start local servers, run manual verification loops, open-ended exploratory tests, or invent post-gate validation steps. Every batch must end with a git commit and push to the project branch. If a batch makes no code changes, the coder must write a status/log entry (e.g., append to docs/deploy-log.md) and commit+push it. Coders MUST notify Steve as the final step after git push by POSTing to `http://localhost:18789/hooks/agent` with `Authorization: Bearer KyCiiWTXATTqCayTrPyoE9krcBzXFP7YPtzqEGlA1aA=` and body `{"message":"Batch complete. Gate ready.","agentId":"main","deliver":false}`. Write the JSON to a temp file and use `curl.exe --data-binary @file` to avoid shell escaping issues. Coders do NOT need to set up git credentials. The orchestrator handles PAT configuration pre-flight.
