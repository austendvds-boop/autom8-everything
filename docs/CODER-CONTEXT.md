# CODER-CONTEXT.md — autom8-everything

## 2026-03-07 — B6 retry 4: gate closure — verified + committed

### Scope completed
- Verified all B6 Review Funnel overhaul content is committed and present in `src/app/services/review-funnel/page.tsx`.
- Confirmed 10-section order, hero rewrite, compounding stats, visual how-it-works, objection handling, bundle CTA, testimonials TODO — all implemented in commit `45d25d8`.
- `import React from "react"` and keyed `React.Fragment` blocks confirmed in committed file.
- Re-ran `npm run build` ✅
- Updated docs for this retry gate closure.

### Files changed
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`
- `docs/implementation-plan.md`

### Verification
- `npm run build` ✅

## 2026-03-07 — B5: Cadence page full overhaul

### Scope completed
- Created `src/components/ComparisonTable.tsx` (new reusable component):
  - Client component, responsive: desktop table + mobile stacked cards
  - Props: `title`, `subtitle?`, `columns[]` with optional `highlight`, `rows[]`
- Created `src/components/CadenceDemoPlaceholder.tsx` (new):
  - 3-col demo section: audio placeholder, call flow steps, call summary preview
  - Uses framer-motion + `reveal`/`revealReduced` from `@/lib/motion`
- Rewrote `src/app/services/cadence/page.tsx`:
  - 9-section layout: hero, pain-point math, demo, features, use-cases, comparison, pricing, FAQ, final CTA
  - All CTAs use `btn-primary`/`btn-secondary` utility classes from globals.css
  - Pricing section now has feature checklist and value-framing line
  - FAQ expanded from 5 to 8 entries
  - Preserved: metadata, buildServiceSchema, buildFaqSchema, Navigation, Footer, structured data
- Updated docs: `docs/ralph-context.md`, `docs/CODER-CONTEXT.md`, `docs/UI-VERIFICATION.md`, `docs/implementation-plan.md`

### Files changed
- `src/components/ComparisonTable.tsx` (new)
- `src/components/CadenceDemoPlaceholder.tsx` (new)
- `src/app/services/cadence/page.tsx`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`
- `docs/UI-VERIFICATION.md`
- `docs/implementation-plan.md`

### Verification
- `npm run build` ✅
- Commit: `b2baa03` on `ui/cro-passover`

## 2026-03-07 — B6 retry 4: commit-gate closure with PowerShell-safe chaining

### Scope completed
- Re-validated that the full B6 Review Funnel overhaul remains implemented in `src/app/services/review-funnel/page.tsx` with all requested section content/order intact.
- Aligned compounding-loop rendering with keyed `React.Fragment` blocks (plus `React` import) to match B6 guidance exactly.
- Re-ran build verification for this retry pass.
- Updated retry handoff docs:
  - `docs/UI-VERIFICATION.md`
  - `docs/ralph-context.md` (appended latest batch and kept only last 3 batches)
  - `docs/CODER-CONTEXT.md`
  - `docs/implementation-plan.md`

### Files changed
- `src/app/services/review-funnel/page.tsx`
- `docs/UI-VERIFICATION.md`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`
- `docs/implementation-plan.md`

### Verification
- `npm run build` ✅

## 2026-03-07 — B6 retry 3: commit-gate closure after PowerShell chaining failure

### Scope completed
- Re-validated that the full B6 Review Funnel overhaul remains implemented in `src/app/services/review-funnel/page.tsx` with all requested section content/order intact.
- Re-ran build verification for this retry pass.
- Updated retry handoff docs:
  - `docs/ralph-context.md` (appended latest batch and kept only last 3 batches)
  - `docs/CODER-CONTEXT.md`
  - `docs/implementation-plan.md`

### Files changed
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`
- `docs/implementation-plan.md`

### Verification
- `npm run build` ✅

## 2026-03-07 — B6 retry 2: final commit-gate closure

### Scope completed
- Re-validated that the full B6 Review Funnel overhaul remains implemented in `src/app/services/review-funnel/page.tsx` with all required section order/content intact.
- Performed docs-only retry updates to close commit-gate requirements:
  - `docs/ralph-context.md` (appended latest batch and kept only last 3 batches)
  - `docs/CODER-CONTEXT.md`
  - `docs/implementation-plan.md`

### Files changed
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`
- `docs/implementation-plan.md`

### Verification
- `npm run build` ✅

## 2026-03-07 — B6 retry: commit/push gate recovery

### Scope completed
- Re-validated that the full B6 Review Funnel overhaul remains implemented in `src/app/services/review-funnel/page.tsx` (hero rewrite, compounding section, visual how-it-works, objections section, bundle CTA, testimonial TODO, and required section order).
- Re-ran build verification for this retry pass.
- Updated retry handoff docs for commit-gate closure:
  - `docs/ralph-context.md`
  - `docs/CODER-CONTEXT.md`
  - `docs/implementation-plan.md`

### Files changed
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`
- `docs/implementation-plan.md`

### Verification
- `npm run build` ✅

## 2026-03-07 — B6: Review Funnel page overhaul

### Scope completed
- Updated `src/app/services/review-funnel/page.tsx` for the full B6 CRO pass:
  - Hero headline changed to `Your Reputation Compounds. Every Review Brings the Next Customer.`
  - Hero subhead updated to reputation compounding framing.
  - Added new `Why Reviews Compound` section (3 stat cards + compounding loop visual).
  - Kept pricing section in place and preserved existing plan card behavior/links.
  - Kept comparison table section in place and preserved existing content.
  - Replaced text-only `How it works` with connected visual step cards using `Calendar`, `MessageSquare`, `Star` icons and desktop connector arrows.
  - Added testimonial TODO comment for future real-name attribution while keeping current descriptor titles.
  - Added new `Common Concerns` objection-handling section.
  - Added new `Even Better Together: Cadence + Review Funnel` bundle CTA section with side-by-side cards, `$278/mo combined` pricing, and `/contact` CTA.
  - Preserved final FAQ and final CTA sections with updated page ordering.
- Updated docs:
  - `docs/UI-VERIFICATION.md`
  - `docs/ralph-context.md`
  - `docs/CODER-CONTEXT.md`
  - `docs/implementation-plan.md`

### Files changed
- `src/app/services/review-funnel/page.tsx`
- `docs/UI-VERIFICATION.md`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`
- `docs/implementation-plan.md`

### Verification
- `npm run build` ✅


## 2026-03-07 — B4 retry 2: verification + commit-gate recovery

### Scope completed
- Confirmed the requested B4 homepage updates are already implemented and present in:
  - `src/components/ServicesBento.tsx`
  - `src/components/WhoItsFor.tsx`
  - `src/components/FAQ.tsx`
  - `src/components/CTA.tsx`
  - `src/components/Testimonials.tsx`
- Re-ran build verification for this retry pass.
- Build initially failed due a stale Next lock file (`.next/lock`), then succeeded after clearing the stale lock.
- Updated retry handoff docs:
  - `docs/ralph-context.md`
  - `docs/implementation-plan.md`
  - `docs/CODER-CONTEXT.md`

### Files changed
- `docs/ralph-context.md`
- `docs/implementation-plan.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅

## 2026-03-07 — B4 retry: finalize content parity + commit gate recovery

### Scope completed
- Updated `src/components/WhoItsFor.tsx` to use `HardHat` from `lucide-react` for the General Contractors vertical card (instead of fallback `Hammer`) now that icon availability is confirmed.
- Updated `src/components/FAQ.tsx` to match the requested buying-friction answer text exactly for `Do I need to be tech-savvy?` (`setup and configuration` phrasing).
- Updated docs and tracking artifacts for this retry pass:
  - `docs/UI-VERIFICATION.md`
  - `docs/implementation-plan.md`
  - `docs/ralph-context.md`
  - `docs/CODER-CONTEXT.md`

### Files changed
- `src/components/WhoItsFor.tsx`
- `src/components/FAQ.tsx`
- `docs/UI-VERIFICATION.md`
- `docs/implementation-plan.md`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅

## 2026-03-06 — B4: homepage product stack + verticals + FAQ + final CTA

### Scope completed
- Updated `src/components/ServicesBento.tsx`:
  - Cadence hero value prop now uses urgency-first missed-call framing.
  - Cadence micro-proof now reads `Live in 5 minutes. Try it right now.`
  - Added/used non-hero product badges:
    - Review Funnel: `Pairs with Cadence`
    - Website Creation: `Foundation`
    - SEO & Content: `Ongoing Growth`
    - Custom Apps: `Advanced`
  - Rendered badge pills beside non-hero eyebrows when `product.badge` exists.
- Rebuilt `src/components/WhoItsFor.tsx` into a verticals section:
  - New heading/subheading for local business operators.
  - Added 6 industry cards with icon + title + description.
  - Added section-level CTA button to `/contact`.
- Replaced FAQ content in `src/components/FAQ.tsx` with 7 buying-friction questions while keeping accordion behavior unchanged.
- Rewrote `src/components/CTA.tsx` final block:
  - urgency headline/subhead
  - primary CTA is now tel `<a href="tel:+14806313993">Call Cadence Live — (480) 631-3993</a>`
  - secondary CTA now `Book a 15-Minute Demo`
  - trust line updated to trial/risk-reversal statement
- Cleaned `src/components/Testimonials.tsx`:
  - removed duplicated testimonials and marquee animation
  - switched to static responsive 3-card grid
  - trimmed to 3 testimonials with role/company-only attribution + initials avatars
  - added TODO to replace placeholders with real client proof assets
- Updated docs:
  - `docs/UI-VERIFICATION.md`
  - `docs/implementation-plan.md`
  - `docs/ralph-context.md`

### Files changed
- `src/components/ServicesBento.tsx`
- `src/components/WhoItsFor.tsx`
- `src/components/FAQ.tsx`
- `src/components/CTA.tsx`
- `src/components/Testimonials.tsx`
- `docs/UI-VERIFICATION.md`
- `docs/implementation-plan.md`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅

## 2026-03-06 — B3 retry: commit-gate recovery + verification

### Scope completed
- Verified the B3 homepage implementation is already present on `ui/cro-passover` and matches requested spec for:
  - `src/components/SocialProofBar.tsx`
  - `src/components/ProofBar.tsx`
  - `src/components/OfferLadder.tsx`
  - `src/components/HowItWorks.tsx`
  - `src/app/HomePageClient.tsx`
- Added retry handoff docs entry to preserve latest-batch context for next agent.

### Files changed
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`
- `docs/implementation-plan.md`

### Verification
- `npm run build` ✅

## 2026-03-06 — B3: homepage trust/proof + offer ladder + how it works refresh

### Scope completed
- Updated `src/components/SocialProofBar.tsx` into trust-bar layout while preserving existing star card and motion behavior.
- Replaced stats with:
  - `Local Businesses` / `Active Clients`
  - `24/7` / `Call Coverage`
  - `5 min` / `Average Setup Time`
- Added integration placeholder row under stats with labels:
  - `Google Business`, `Stripe`, `Twilio`, `Google Calendar`
- Added TODO note to swap text placeholders for real logos later.
- Created new proof strip component `src/components/ProofBar.tsx` with three sourced proof callouts.
- Created new tiered bundle section `src/components/OfferLadder.tsx`:
  - 4 tiers: Start, Grow, Expand, Custom
  - Grow card highlighted with `Most Popular` badge and featured border treatment
  - icons, value props, checkmark feature lists, and CTA buttons wired per spec
- Updated `src/components/HowItWorks.tsx` with conversion-focused step titles/descriptions and bottom CTA:
  - CTA now `See Pricing` linking to `#offer-ladder`
- Updated homepage composition in `src/app/HomePageClient.tsx`:
  - added imports for `ProofBar` and `OfferLadder`
  - section order now: Navigation, Hero, SocialProofBar, ProofBar, ServicesBento, OfferLadder, WhoItsFor, HowItWorks, Testimonials, FAQ, CTA, Footer
- Updated docs:
  - `docs/UI-VERIFICATION.md`
  - `docs/implementation-plan.md`
  - `docs/ralph-context.md`
  - `docs/CODER-CONTEXT.md`

### Files changed
- `src/components/SocialProofBar.tsx`
- `src/components/ProofBar.tsx` (new)
- `src/components/OfferLadder.tsx` (new)
- `src/components/HowItWorks.tsx`
- `src/app/HomePageClient.tsx`
- `docs/UI-VERIFICATION.md`
- `docs/implementation-plan.md`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅

## 2026-03-06 — B2: homepage hero + CTA overhaul

### Scope completed
- Updated `src/components/Hero.tsx` copy and CTA structure for CRO passover hero requirements.
- Replaced hero eyebrow text with `Growth infrastructure for local businesses`.
- Replaced H1 with `Stop Losing Calls. Start Winning Customers.`
- Replaced subhead with the new lead-machine positioning copy.
- Swapped CTA stack to:
  - primary `Call Cadence Live` tel link (`tel:+14806313993`) with `PhoneCall` icon.
  - secondary `Book a 15-Minute Demo` link to `/contact`.
- Added trust micro-strip under CTAs: `7-day free trial • No contracts • Setup in 5 minutes`.
- Replaced old Cadence call paragraph with note: `Try Cadence right now — it will answer like your receptionist.`
- Preserved existing motion behavior (`reveal`, `revealReduced`, `buttonHover`) and `BrandLogo` usage.
- Updated handoff docs:
  - `docs/UI-VERIFICATION.md`
  - `docs/implementation-plan.md`
  - `docs/ralph-context.md`

### Files changed
- `src/components/Hero.tsx`
- `docs/UI-VERIFICATION.md`
- `docs/implementation-plan.md`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅


## 2026-03-06 — B1: CRO passover branch + sitewide design tokens

### Scope completed
- Checked out branch `ui/cro-passover` (branch already existed locally; switched to it).
- Updated `src/app/globals.css`:
  - added section spacing custom properties in `:root` (`--section-py-sm`, `--section-py-md`, `--section-py-lg`, `--section-gap`)
  - added shared utility classes:
    - card system: `.card-base`, `.card-elevated` (+ hover state)
    - button system: `.btn-primary`, `.btn-secondary`, `.btn-ghost` (+ hover states)
    - typography: `.section-heading` responsive scale, `.section-subheading` responsive scale
- Added `src/lib/design-tokens.ts` exporting:
  - `SECTION_PY`
  - `CARD_BASE`
  - `CARD_ELEVATED`
  - `COLORS`
- Replaced `docs/ralph-context.md` with CRO-passover batch context notes for next batches.

### Files changed
- `src/app/globals.css`
- `src/lib/design-tokens.ts` (new)
- `docs/ralph-context.md`

### Verification
- `npm run build` ✅

## 2026-03-06 — Batch 16: platform final integration wiring + setup docs

### Scope completed
- Left `src/components/Navigation.tsx` unchanged for platform entry points:
  - no `/admin/clients` link in public nav
  - no `/portal/login` link in public nav
- Updated `src/components/Footer.tsx` with a subtle bottom-of-links `Client Portal` link to `/portal/login` in the Company column.
- Added setup runbook `docs/platform-setup.md` including:
  - required platform env vars for autom8-everything
  - matching `PORTAL_API_SECRET` requirement in cadence-v2
  - DB migration instructions
  - end-to-end operator/client workflow summary
- Import/circular-check pass:
  - reviewed cross references between `src/lib/platform` and `src/lib/review-funnel`
  - no circular import dependency introduced by this batch
- Updated docs:
  - `docs/UI-VERIFICATION.md`
  - `docs/ENV-VARS.md`
  - `docs/implementation-plan.md`
  - `docs/ralph-context.md`
  - `docs/CODER-CONTEXT.md`

### Files changed
- `src/components/Footer.tsx`
- `docs/platform-setup.md` (new)
- `docs/UI-VERIFICATION.md`
- `docs/ENV-VARS.md`
- `docs/implementation-plan.md`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅

## 2026-03-06 — Batch 15: platform client portal UI (/portal)

### Scope completed
- Added portal login route at `src/app/portal/login/page.tsx` + `src/app/portal/login/PortalLoginClient.tsx`:
  - centered branded dark card
  - email input + `Send login link` action posting `POST /api/portal/auth/login`
  - success and error inline messaging
- Added portal dashboard route at `src/app/portal/page.tsx` + `src/app/portal/PortalDashboardClient.tsx`:
  - auth gate via `GET /api/portal/me` with redirect to `/portal/login` on 401
  - welcome header with contact and business name
  - service cards for Cadence and Review Funnel with active/paused/inactive badges
  - Cadence quick preview attempts call stats (`GET /api/portal/cadence/calls?limit=1`), with fallback copy when count is unavailable
  - billing action button posts `POST /api/portal/billing/portal` and redirects to returned Stripe URL
- Added Cadence settings route at `src/app/portal/cadence/page.tsx` + `src/app/portal/cadence/PortalCadenceClient.tsx`:
  - auth gate via `GET /api/portal/me`
  - editable settings fields: greeting, transfer number, booking URL, timezone, business hours, services list, FAQ list
  - save flow via `PATCH /api/portal/cadence/settings` sending changed top-level fields only
  - success toast on save and inline error states
  - recent calls table from `GET /api/portal/cadence/calls` with masked phone numbers, formatted duration, summary first line, and load-more pagination
- Added portal billing route at `src/app/portal/billing/page.tsx` + `src/app/portal/billing/PortalBillingClient.tsx`:
  - auto request on mount to billing portal endpoint
  - loading state while request is in progress
  - user-facing fallback message when no billing account is linked
- Added portal Review Funnel handoff route `src/app/portal/review-funnel/page.tsx`:
  - simple card with direct link to `/review-funnel/dashboard`
- Updated docs:
  - `docs/UI-VERIFICATION.md`
  - `docs/implementation-plan.md`
  - `docs/ralph-context.md`
  - `docs/CODER-CONTEXT.md`

### Files changed
- `src/app/portal/login/page.tsx` (new)
- `src/app/portal/login/PortalLoginClient.tsx` (new)
- `src/app/portal/page.tsx` (new)
- `src/app/portal/PortalDashboardClient.tsx` (new)
- `src/app/portal/cadence/page.tsx` (new)
- `src/app/portal/cadence/PortalCadenceClient.tsx` (new)
- `src/app/portal/review-funnel/page.tsx` (new)
- `src/app/portal/billing/page.tsx` (new)
- `src/app/portal/billing/PortalBillingClient.tsx` (new)
- `docs/UI-VERIFICATION.md`
- `docs/implementation-plan.md`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅

## 2026-03-06 — Batch 14: platform operator dashboard UI (/admin/clients)

### Scope completed
- Added new operator dashboard list route at `src/app/admin/clients/page.tsx` + `src/app/admin/clients/AdminClientsClient.tsx`:
  - on mount, calls `GET /api/admin/clients` for auth gate + data load
  - shows admin sign-in form on `401` and posts `POST /api/admin/auth` with `{ secret }`
  - renders searchable client list with business/contact/email/service badges/created date
  - row click navigation to `/admin/clients/[id]`
  - includes `New Client` modal posting `POST /api/admin/clients`
- Added client detail route at `src/app/admin/clients/[id]/page.tsx` + `src/app/admin/clients/[id]/AdminClientDetailClient.tsx`:
  - back link, client header, inline edit mode for core fields
  - service cards with status badges + this-month call/text message counts
  - pause/resume/cancel controls wired to `PATCH/DELETE /api/admin/clients/[id]/services`
  - add-service form wired to `POST /api/admin/clients/[id]/services` with:
    - Cadence account ID input when adding Cadence
    - Review Funnel auto-match note by client email
  - success confirmation message after service add (`Service added. Welcome email sent to [email].`)
  - usage panel for Cadence recent calls and Review Funnel text-message totals
- Extended API hydration in `src/app/api/admin/clients/[id]/route.ts`:
  - added `extractCadenceRecentCalls()` helper
  - includes `usage.recentCalls` in Cadence service payload for detail-page usage table rendering
- Updated docs:
  - `docs/UI-VERIFICATION.md` with `/admin/clients` + `/admin/clients/[id]` verification checks
  - `docs/implementation-plan.md`
  - `docs/ralph-context.md`
  - `docs/CODER-CONTEXT.md`

### Files changed
- `src/app/admin/clients/page.tsx` (new)
- `src/app/admin/clients/AdminClientsClient.tsx` (new)
- `src/app/admin/clients/[id]/page.tsx` (new)
- `src/app/admin/clients/[id]/AdminClientDetailClient.tsx` (new)
- `src/app/api/admin/clients/[id]/route.ts`
- `docs/UI-VERIFICATION.md`
- `docs/implementation-plan.md`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅

## 2026-03-06 — Batch 13: platform client portal API routes

### Scope completed
- Added portal auth login route `POST /api/portal/auth/login` at `src/app/api/portal/auth/login/route.ts`:
  - validates `{ email }` via zod
  - normalizes to lowercase
  - calls `generatePortalMagicLink(email)`
  - sends login email with `sendPortalMagicLinkEmail({ toEmail, token })`
  - returns `{ ok: true }` for unknown emails to avoid account enumeration
- Added portal auth verify route `GET /api/portal/auth/verify` at `src/app/api/portal/auth/verify/route.ts`:
  - reads `token` query param
  - validates/consumes token via `verifyPortalMagicLink(token)`
  - on success sets `a8_portal_session` cookie using `A8_PORTAL_SESSION_COOKIE_NAME`
  - cookie options: httpOnly, sameSite lax, secure in production, path `/`, maxAge from `platformConfig.A8_SESSION_TTL_HOURS`
  - redirects to `/portal`
  - invalid/missing token returns `401 { error: "Invalid or expired link" }`
- Added portal self route `GET /api/portal/me` at `src/app/api/portal/me/route.ts`:
  - requires `requirePortalAuth`
  - returns client identity fields + associated `a8_client_services` rows (`serviceType`, `status`, `cadenceTenantId`, `rfTenantId`, `provisionedAt`)
- Added Cadence settings route `src/app/api/portal/cadence/settings/route.ts`:
  - `GET` requires portal auth, resolves active Cadence service, returns `getCadenceTenantConfig(cadenceTenantId)`
  - `PATCH` requires portal auth, validates optional settings payload, updates via `updateCadenceTenantConfig(cadenceTenantId, body)`
  - returns `404` when no active Cadence service exists
- Added Cadence calls route `GET /api/portal/cadence/calls` at `src/app/api/portal/cadence/calls/route.ts`:
  - requires portal auth
  - resolves active Cadence service
  - parses query params `limit` (default 50) and `offset` (default 0)
  - returns `getCadenceRecentCalls(cadenceTenantId, limit, offset)`
- Added billing portal route `POST /api/portal/billing/portal` at `src/app/api/portal/billing/portal/route.ts`:
  - requires portal auth
  - loads `stripeCustomerId` from `a8_clients`
  - returns `400 { error: "No billing account linked" }` when missing
  - creates Stripe billing portal session via `new Stripe(process.env.STRIPE_SECRET_KEY)` pattern
  - fixed return URL: `https://autom8everything.com/portal`
  - returns `{ url: portalSession.url }`

### Files changed
- `src/app/api/portal/auth/login/route.ts` (new)
- `src/app/api/portal/auth/verify/route.ts` (new)
- `src/app/api/portal/me/route.ts` (new)
- `src/app/api/portal/cadence/settings/route.ts` (new)
- `src/app/api/portal/cadence/calls/route.ts` (new)
- `src/app/api/portal/billing/portal/route.ts` (new)
- `docs/implementation-plan.md`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅

## 2026-03-06 — Batch 12: platform operator admin API routes + provisioning/email services

### Scope completed
- Added new platform email service at `src/lib/platform/services/email.ts`:
  - Reuses the same Gmail SMTP credential resolution pattern (env-first with credentials-file fallback).
  - Exports `sendPortalMagicLinkEmail({ toEmail, token })` with portal verify URL:
    - `https://autom8everything.com/api/portal/auth/verify?token=...`
  - Exports `sendWelcomeEmail({ toEmail, clientName, serviceName, magicLinkToken })`.
  - Uses the same dark-theme email shell style as Review Funnel (`#0A0A0F` background, `#12121A` card, purple gradient CTA button).
- Added service provisioning helper at `src/lib/platform/services/provisioning.ts`:
  - `provisionService(clientId, serviceType, metadata?)`
  - `pauseService(clientId, serviceType)`
  - `cancelService(clientId, serviceType)`
  - `resumeService(clientId, serviceType)`
  - Cadence provisioning requires and stores `cadenceTenantId` from metadata.
  - Review Funnel provisioning resolves/stores `rfTenantId` either from metadata or by matching `a8_clients.email` to `rf_tenants.owner_email`.
- Added platform admin auth route `POST /api/admin/auth` at `src/app/api/admin/auth/route.ts`:
  - Validates `{ secret }` via `isAdminSecretValid`
  - Creates admin session JWT via `createAdminSessionToken`
  - Sets `a8_admin_session` HTTP-only cookie
  - Returns `{ ok: true }` on success, `401` on invalid secret
- Added platform admin clients collection route `src/app/api/admin/clients/route.ts`:
  - `GET` (admin-auth required): returns all clients plus mapped services summary (`serviceType`, `status`, `provisionedAt`).
  - `POST` (admin-auth required): creates a new `a8_clients` record and returns `{ client }`.
- Added platform admin client detail route `src/app/api/admin/clients/[id]/route.ts`:
  - `GET` (admin-auth required): returns client, full services, and usage hydration:
    - Cadence services: calls `getCadenceTenantConfig()` + `getCadenceRecentCalls()` and derives call count.
    - Review Funnel services: queries current-month count from `rf_sms_usage`.
  - `PATCH` (admin-auth required): updates partial client fields (`businessName`, `contactName`, `email`, `phone`, `notes`, `isActive`).
- Added platform admin client-service management route `src/app/api/admin/clients/[id]/services/route.ts`:
  - `POST` (admin-auth required): provisions service, generates portal magic link, sends welcome email, returns `{ ok: true, service }`.
  - `DELETE` (admin-auth required): cancels service, returns `{ ok: true }`.
  - `PATCH` (admin-auth required): pause/resume actions, returns `{ ok: true }`.

### Files changed
- `src/lib/platform/services/email.ts` (new)
- `src/lib/platform/services/provisioning.ts` (new)
- `src/app/api/admin/auth/route.ts` (new)
- `src/app/api/admin/clients/route.ts` (new)
- `src/app/api/admin/clients/[id]/route.ts` (new)
- `src/app/api/admin/clients/[id]/services/route.ts` (new)
- `docs/implementation-plan.md`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅

## 2026-03-06 — Batch 11: platform portal auth + middleware foundation

### Scope completed
- Added platform portal auth service at `src/lib/platform/services/auth.ts` using the same magic-link/session patterns as Review Funnel auth.
- Implemented SHA-256 token hashing and JWT session creation for portal clients:
  - `hashToken(token)`
  - `createPortalSession(clientId)` using `platformConfig.A8_JWT_SECRET` and `A8_SESSION_TTL_HOURS`
- Implemented portal magic-link lifecycle:
  - `generatePortalMagicLink(email)` looks up active `a8_clients` by normalized email, creates secure random token, stores hashed token in `a8_magic_links`, returns raw token
  - `verifyPortalMagicLink(token)` validates unexpired/unused link in transaction, atomically marks link used, loads active client, returns `{ sessionToken, client }`
  - `verifyPortalSession(token)` validates JWT claims and loads active `a8_clients` row
- Used `require("jsonwebtoken")` style import in platform auth/middleware files to avoid ESM issues.
- Added Cadence portal API client at `src/lib/platform/services/cadence-api.ts`:
  - injects `X-Portal-Secret` on every request
  - uses base URL from `platformConfig.CADENCE_API_URL`
  - exports:
    - `getCadenceTenantConfig(tenantId)`
    - `updateCadenceTenantConfig(tenantId, updates)`
    - `getCadenceRecentCalls(tenantId, limit?, offset?)`
  - defines interfaces:
    - `CadenceTenantConfig`
    - `CadenceTenantUpdate`
    - `CadenceCall`
    - `CadenceCallsResponse`
- Added admin auth middleware at `src/lib/platform/admin-middleware.ts`:
  - `isAdminSecretValid(candidate)` with timing-safe compare against `A8_ADMIN_SECRET`
  - `createAdminSessionToken()` with `{ role: "platform_admin" }` JWT, 8h expiry
  - `requireAdminAuth(request)` with `x-admin-secret` OR `a8_admin_session` cookie
  - exported `A8_ADMIN_SESSION_COOKIE_NAME = "a8_admin_session"`
- Added portal auth middleware at `src/lib/platform/portal-middleware.ts`:
  - supports Bearer token or `a8_portal_session` cookie
  - validates via `verifyPortalSession()` and returns `{ ok: true, client, sessionToken }`
  - exported `A8_PORTAL_SESSION_COOKIE_NAME = "a8_portal_session"`

### Files changed
- `src/lib/platform/services/auth.ts` (new)
- `src/lib/platform/services/cadence-api.ts` (new)
- `src/lib/platform/admin-middleware.ts` (new)
- `src/lib/platform/portal-middleware.ts` (new)
- `docs/implementation-plan.md`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅

## 2026-03-06 — Batch 10: platform DB spec alignment + finalize commit

### Scope completed
- Finalized unified platform DB foundation files and aligned details to task spec.
- Updated platform schema unique email index from expression-based `lower(email)` to direct unique email index.
- Kept required partial indexes and type exports for all `a8_*` tables.
- Verified platform DB client merges `platformSchema` + `reviewFunnelSchema` and exports `platformDb`/`PlatformDb`.
- Verified platform env config includes all required vars and build-phase placeholders.
- Updated `.env.example` platform section to exactly requested keys:
  - `A8_ADMIN_SECRET`
  - `A8_JWT_SECRET`
  - `CADENCE_API_URL`
  - `PORTAL_API_SECRET`
- Updated SQL migration index for `a8_clients.email` to match schema.

### Files changed
- `src/lib/platform/db/schema.ts`
- `src/lib/platform/db/client.ts`
- `src/lib/platform/config.ts`
- `docs/migrations/2026-03-07-platform-tables.sql`
- `drizzle.config.ts`
- `.env.example`
- `docs/implementation-plan.md`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅

## 2026-03-06 — Batch 9: platform DB foundation (a8 tables + config + client)

### Scope completed
- Added new unified platform Drizzle schema at `src/lib/platform/db/schema.ts`:
  - `a8_clients`
  - `a8_client_services`
  - `a8_magic_links`
- Added required indexes/constraints:
  - case-insensitive unique email index via `lower(email)` on `a8_clients`
  - partial index on `a8_clients.stripe_customer_id` where not null
  - unique `(client_id, service_type)` on `a8_client_services`
  - partial indexes on `a8_client_services.cadence_tenant_id` and `a8_client_services.rf_tenant_id`
  - unique `token_hash` and `(email, created_at)` index on `a8_magic_links`
  - check constraints for `a8_client_services.service_type` and `a8_client_services.status`
- Exported `platformSchema` and inferred types:
  - `A8Client`, `NewA8Client`
  - `A8ClientService`, `NewA8ClientService`
  - `A8MagicLink`, `NewA8MagicLink`
- Added platform DB client at `src/lib/platform/db/client.ts`:
  - follows Neon + Drizzle singleton pattern used by Review Funnel
  - merges `platformSchema` + `reviewFunnelSchema` so platform code can query `rf_*` tables
  - exports `platformDb` and `PlatformDb`
- Added platform env config at `src/lib/platform/config.ts`:
  - zod validation for `DATABASE_URL`, site URL, platform secrets, TTLs, Cadence URL
  - build-phase placeholder injection pattern mirrors Review Funnel config (`NEXT_PHASE === "phase-production-build"`)
- Updated migration/filtering and env docs:
  - `drizzle.config.ts` table filter now includes `a8_*`
  - appended Platform section to `.env.example`
  - added SQL fallback migration `docs/migrations/2026-03-07-platform-tables.sql`

### Files changed
- `src/lib/platform/db/schema.ts` (new)
- `src/lib/platform/db/client.ts` (new)
- `src/lib/platform/config.ts` (new)
- `docs/migrations/2026-03-07-platform-tables.sql` (new)
- `drizzle.config.ts`
- `.env.example`
- `docs/implementation-plan.md`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅

## 2026-03-06 — Batch 8: consent logging + health endpoint + env docs

### Scope completed
- Added Review Funnel consent log table in `src/lib/review-funnel/db/schema.ts`:
  - `rf_consent_log` with columns `id`, `phone`, `tenant_id`, `consent_type`, `source`, `metadata`, `created_at`
  - indexes on `phone` and `tenant_id`
  - exported via `reviewFunnelSchema`
  - added types: `RfConsentType`, `RfConsentSource`, `RfConsentLog`, `NewRfConsentLog`
- Added consent logging on successful SMS sends in `src/lib/review-funnel/services/sms.ts`:
  - after `incrementUsage()` inserts `sms_sent` from `cron_process`
  - metadata includes `{ reviewRequestId, smsSid }`
- Added consent logging on Twilio STOP/opt-out in `src/app/api/review-funnel/webhooks/twilio/inbound/route.ts`:
  - after `handleOptOut(from)` inserts `opt_out` from `twilio_inbound`
  - stores normalized phone fallback (`normalizedPhone || from`)
- Added health check endpoint `GET /api/review-funnel/health` at:
  - `src/app/api/review-funnel/health/route.ts`
  - performs DB `SELECT 1` check and required env presence checks
  - returns `200` when all checks pass, `503` otherwise
- Expanded `.env.example` with comprehensive Review Funnel env documentation/comments including:
  - DB/auth, Google calendar + places, Twilio, Stripe, cron/admin, SMTP options
- Ran DB migration command:
  - `npx drizzle-kit push` fails in this environment because `DATABASE_URL` is not set (`url: ''`)
  - added SQL fallback migration at `docs/migrations/2026-03-06-rf-consent-log.sql`

### Files changed
- `src/lib/review-funnel/db/schema.ts`
- `src/lib/review-funnel/services/sms.ts`
- `src/app/api/review-funnel/webhooks/twilio/inbound/route.ts`
- `src/app/api/review-funnel/health/route.ts` (new)
- `.env.example`
- `docs/migrations/2026-03-06-rf-consent-log.sql` (new)
- `docs/implementation-plan.md`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅

## 2026-03-06 — Batch 7 retry 3: PowerShell build gate recovery

### Scope completed
- Re-verified the Batch 7 implementation remains complete in code for:
  - logo upload API + dashboard upload flow
  - Yelp schema/profile API support
  - funnel payload updates and Google/Yelp/Both five-star CTA logic
- Re-ran `npx drizzle-kit push` using PowerShell-safe command chaining.
  - Result: still fails in this environment because `DATABASE_URL` is not set.
  - Confirmed SQL fallback migration remains at `docs/migrations/2026-03-06-rf-yelp-platform.sql`.
- Re-ran `npm run build` using `Set-Location ...; npm run build` and confirmed pass.
- Updated handoff docs for retry tracking.

### Files changed
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`
- `docs/implementation-plan.md`

### Verification
- `npm run build` ✅

## 2026-03-06 — Batch 7 retry 2: verification + commit gate recovery

### Scope completed
- Verified the full Batch 7 feature set is already implemented in code for:
  - logo upload API + dashboard upload flow
  - Yelp schema fields and profile API support
  - funnel payload updates and Google/Yelp/Both five-star CTA logic
- Re-ran `npx drizzle-kit push` to execute migration flow.
  - Result: failed in this environment due missing `DATABASE_URL`.
  - Confirmed SQL fallback migration remains available at `docs/migrations/2026-03-06-rf-yelp-platform.sql`.
- Updated handoff docs for retry tracking and commit-gate recovery.

### Files changed
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`
- `docs/implementation-plan.md`

### Verification
- `npm run build` ✅

## 2026-03-06 — Batch 7: logo upload + Yelp review platform support

### Scope completed
- Added new authenticated logo upload API route:
  - `POST /api/review-funnel/settings/logo` in `src/app/api/review-funnel/settings/logo/route.ts`
  - accepts multipart `logo` file input
  - validates MIME type (`image/png`, `image/jpeg`, `image/webp`, `image/svg+xml`) and max size (2MB)
  - writes files to `public/uploads/review-funnel/logos/{tenantId}-{Date.now()}.{ext}` and persists `rf_tenants.logo_url`
- Extended Review Funnel tenant schema in `src/lib/review-funnel/db/schema.ts`:
  - `yelpReviewUrl: text('yelp_review_url')`
  - `reviewPlatform: varchar('review_platform', { length: 20 }).notNull().default('google')`
- Updated profile settings API `src/app/api/review-funnel/settings/profile/route.ts`:
  - GET now returns `yelpReviewUrl` + `reviewPlatform`
  - PATCH now accepts/saves `yelpReviewUrl` + `reviewPlatform`
  - review platform validation constrained to `google | yelp | both`
- Updated settings profile UI `src/app/review-funnel/dashboard/settings/SettingsClient.tsx`:
  - Added logo upload section with preview and save action
  - Added review platform dropdown (Google, Yelp, Both)
  - Added conditional Yelp review URL input when platform is `yelp`/`both`
- Updated public funnel data API `src/app/api/review-funnel/funnel/[requestId]/route.ts`:
  - tenant payload now includes `yelpReviewUrl` + `reviewPlatform`
- Updated funnel client `src/app/r/[requestId]/FunnelClient.tsx`:
  - updated `FunnelApiPayload` tenant type for Yelp fields
  - five-star step now renders Google/Yelp CTA buttons based on `reviewPlatform`
- Added SQL fallback migration file:
  - `docs/migrations/2026-03-06-rf-yelp-platform.sql`

### DB migration note
- `npx drizzle-kit push` failed in this environment because `DATABASE_URL` is not set.
- Error: `Please provide required params for Postgres driver: url: ''`
- Use the SQL in `docs/migrations/2026-03-06-rf-yelp-platform.sql` (or rerun drizzle push with DB env loaded).

### Verification
- `npm run build` ✅


## 2026-03-06 — Batch 6: process-sms cron finalization

### Scope completed
- Verified the Review Funnel critical-path cron route and Twilio inbound keyword handling are wired and active.
- Updated `src/app/api/review-funnel/cron/process-sms/route.ts` quiet-hours reschedule branch to explicitly persist `status: "queued"` alongside updated `send_after`.
- Confirmed Twilio inbound HELP flow remains in place before STOP opt-out handling.
- Updated handoff docs (`docs/ralph-context.md`, `docs/CODER-CONTEXT.md`) with this batch summary and next-batch gotchas.

### Files changed
- `src/app/api/review-funnel/cron/process-sms/route.ts`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅

## 2026-03-06 — Batch 5: process-sms cron implementation + Twilio HELP handling

### Scope completed
- Replaced `src/app/api/review-funnel/cron/process-sms/route.ts` stub with full cron processor implementation.
- Added `export const dynamic = "force-dynamic"` to the process-sms cron route.
- Added CRON auth guard parity with renew-watches route:
  - accepts `Authorization: Bearer <CRON_SECRET>`
  - accepts `x-cron-secret: <CRON_SECRET>`
- Implemented pending queue query against `rf_pending_sms` with required filters:
  - `status = "queued"`
  - `send_after <= now()`
  - `attempts < 3`
  - order `send_after ASC`
  - limit `50`
- For each queued row, route now calls `sendReviewRequest(reviewRequestId)` and persists outcomes:
  - `sent` -> marks pending row `status: "sent"`
  - `quiet_hours` -> updates `send_after` and leaves queued
  - `opted_out` / `no_phone` -> marks pending row `status: "skipped"`
  - `limit_reached` -> marks pending row `status: "limit_reached"`
  - thrown errors -> increments `attempts`, writes `last_error`, and marks `status: "failed"` when attempts hit 3
- Added summary response payload from cron route:
  - `{ processed, sent, skipped, failed, rescheduled }`
- Updated Twilio inbound webhook `src/app/api/review-funnel/webhooks/twilio/inbound/route.ts`:
  - added `HELP_KEYWORDS = new Set(["help", "info"])`
  - added `isHelpMessage()` helper matching existing keyword parsing pattern
  - inserted HELP handling before opt-out handling
  - HELP now returns TwiML message:
    - `For help with review requests, contact the business that texted you. To stop messages, reply STOP.`

### Files changed
- `src/app/api/review-funnel/cron/process-sms/route.ts`
- `src/app/api/review-funnel/webhooks/twilio/inbound/route.ts`
- `docs/implementation-plan.md`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅

## 2026-03-05 — Batch 4 retry 2: deploy gate recovery

### Scope completed
- Verified `master` and `origin/master` are aligned and prepared for deploy-gate retry.
- Confirmed Vercel production for project `prj_VDUyHtQs8yg3QUy1BEvVyEyY96aj` was still serving older commit `f1b8e324...`.
- Re-ran `npm run build` to confirm a passing local build before deploy trigger.
- Created a minimal docs-only retry commit to force a fresh production auto-deploy from latest `master`.
- Verified latest production deployment reached `READY` and points to the newest retry commit.

### Verification
- `npm run build` ✅

## 2026-03-05 — Batch 4 retry: commit/push gate recovery

### Scope completed
- Performed a retry pass specifically to clear the commit gate failure (`no new commit detected on origin/master`).
- Re-verified that Batch 4 admin panel code and docs updates were already present in the repository.
- Re-ran build verification and confirmed success.
- Re-verified `RF_ADMIN_SECRET` presence in Vercel project `prj_VDUyHtQs8yg3QUy1BEvVyEyY96aj` across `production`, `preview`, and `development`.
- Re-verified local admin secret file exists at `C:\Users\austen\.openclaw\credentials\rf-admin-secret.txt` and contains a 32-character value.
- Committed and pushed a fresh retry commit to `origin/master`.

### Verification
- `npm run build` ✅

## 2026-03-05 — Review Funnel Batch 4: admin panel updates (auth layout + server list + server stats)

### Scope completed
- Generated a new 32-char `RF_ADMIN_SECRET`, wrote it to `C:\Users\austen\.openclaw\credentials\rf-admin-secret.txt`, and updated the existing Vercel `RF_ADMIN_SECRET` value for `production`, `preview`, and `development` in project `prj_VDUyHtQs8yg3QUy1BEvVyEyY96aj`.
- Added admin route layout guard at `src/app/review-funnel/admin/layout.tsx`:
  - validates `rf_admin_session` on every render
  - redirects unauthenticated admin pages to `/review-funnel/admin/login`
- Moved admin login route files to `src/app/review-funnel/(admin-public)/admin/login/*` so `/review-funnel/admin/login` is not wrapped by the protected admin layout.
- Updated admin login/auth flow:
  - `src/app/review-funnel/(admin-public)/admin/login/AdminLoginClient.tsx`
  - `src/app/review-funnel/(admin-public)/admin/login/page.tsx`
  - `src/app/api/review-funnel/admin/auth/route.ts`
  - UI now uses `Admin Password` label + `Sign In` button and shows inline `Incorrect password` on bad auth.
- Added server-side admin data layer in `src/lib/review-funnel/admin-dashboard.ts`:
  - aggregates per-business calendar/text-message stats
  - fetches Stripe subscription status from `GET /v1/subscriptions/:id`
  - caches Stripe status lookups for 5 minutes via `unstable_cache`
  - computes needs-attention badges and severity sort order (`payment > no calendar > calendar offline > no messages > upgrade`)
- Rebuilt `/review-funnel/admin` as a server component table in `src/app/review-funnel/admin/page.tsx`:
  - columns: business, plan, calendars connected, text messages used this month / limit, status, joined date
  - row badges: No calendar, No messages sent, Calendar offline, Payment issue, Upgrade ready
  - sorted by attention severity first, then joined date desc
- Rebuilt `/review-funnel/admin/stats` as a server component in `src/app/review-funnel/admin/stats/page.tsx` with cards for:
  - Starter MRR
  - Growth MRR
  - Total MRR
  - Total text messages sent this month
  - New signups this month
- Updated admin tenant detail route wrapper to rely on the new admin layout guard:
  - `src/app/review-funnel/admin/tenants/[id]/page.tsx`
- Updated docs:
  - `docs/ENV-VARS.md`
  - `docs/UI-VERIFICATION.md`
  - `docs/implementation-plan.md`
  - `docs/ralph-context.md`
  - `docs/CODER-CONTEXT.md`

### Decisions
- Kept admin auth fully separate from magic-link auth (dedicated cookie + JWT + admin-only API route).
- Used server-rendered admin list/stats to avoid client-side fetch waterfalls and ensure deterministic sort ordering.
- Mapped Stripe statuses to table statuses:
  - `active`/`trialing` -> `active`
  - `past_due`/`unpaid` -> `past_due`
  - all others/missing -> `cancelled`

### Verification
- `npm run build` ✅

## 2026-03-05 — Review Funnel Batch 3 retry: commit/push completion

### Scope completed
- Finalized and verified Batch 3 pricing + calendar-limit changes for commit/push on `master`.
- Confirmed pricing and CTA updates across:
  - `src/app/services/review-funnel/page.tsx`
  - `src/app/review-funnel/signup/SignupClient.tsx`
- Confirmed calendar limit enforcement + plain-language error handling across:
  - `src/lib/review-funnel/services/calendar.ts`
  - `src/app/api/review-funnel/google/auth-url/route.ts`
  - `src/app/api/review-funnel/google/callback/route.ts`
  - `src/app/review-funnel/dashboard/settings/SettingsClient.tsx`
- Updated docs:
  - `docs/ralph-context.md` (appended latest batch summary and kept only last 3 notes)

### Verification
- `npm run build` ✅
- Retry note: this run is the commit/push recovery pass after Gate 1 failed due no new `origin/master` commit.

## 2026-03-05 — Review Funnel Batch 3: pricing UI + calendar limit enforcement

### Scope completed
- Updated Review Funnel product pricing UI in `src/app/services/review-funnel/page.tsx`:
  - Starter: `$79/month`, `1 connected calendar`, `150 text messages per month`, CTA `Get Started`.
  - Growth: `$149/month`, `Up to 5 connected calendars`, `600 text messages per month`, `Most Popular`, CTA `Get Started`.
  - Pro: `Let's talk`, `Unlimited calendars`, `Custom message volume`, `Priority support`, CTA `Contact Us` -> `mailto:aust@autom8everything.com`.
- Updated signup wizard Step 4 in `src/app/review-funnel/signup/SignupClient.tsx` to match the same three tiers and CTA behavior.
  - Starter/Growth continue to Stripe checkout.
  - Pro remains contact-only (no checkout call) and now uses `mailto:aust@autom8everything.com`.
- Enforced and surfaced calendar connection limits:
  - `src/lib/review-funnel/services/calendar.ts`
    - Added shared message constant:
      - `You've reached your calendar limit for your current plan. Upgrade to connect more calendars.`
    - `createWatch()` now throws that message when active watches are already at `tenant.calendarLimit`.
    - Added `ensureCalendarConnectionAllowed(tenantId)` helper that checks active watch count against `rf_tenants.calendar_limit` before OAuth redirect.
  - `src/app/api/review-funnel/google/auth-url/route.ts`
    - Calls `ensureCalendarConnectionAllowed()` before generating the Google Calendar connect URL.
    - Returns `400` with the friendly message when limit is reached.
  - `src/app/api/review-funnel/google/callback/route.ts`
    - Normalizes callback errors to plain-language reasons (no internal auth jargon).
  - `src/app/review-funnel/dashboard/settings/SettingsClient.tsx`
    - Added calendar-specific inline error state.
    - Displays connect errors directly inside `CalendarStatus` where the user clicks Connect Calendar.
    - Keeps limit message exact and user-friendly.
- Updated UI verification checklist in `docs/UI-VERIFICATION.md` for:
  - `/services/review-funnel` pricing checks
  - `/review-funnel/signup` step 4 checks
  - inline calendar-limit error checks in settings calendar tab
- Updated `docs/ralph-context.md` with Batch 3 summary and enforcement location details.

### Verification
- `npm run build` ✅

## 2026-03-05 - Review Funnel Batch 2 rerun: schema + Stripe backend refresh (no UI changes)

### Scope completed
- Executed the Batch 2 backend task block again on `master`.
- Confirmed `rf_tenants.calendar_limit` already exists in schema definition (`src/lib/review-funnel/db/schema.ts`) with default `1`.
- Pulled `DATABASE_URL` from Vercel and ran `npx drizzle-kit push` using temporary `.env.local`.
  - Drizzle presented legacy sequence drop statements for unrelated tables; run was intentionally aborted at confirmation prompt to avoid destructive changes.
  - Verified directly in DB that `public.rf_tenants.calendar_limit` exists (`integer`, default `1`, not null).
- Created fresh Stripe products/prices for this rerun:
  - Starter product `prod_U5tRNpAHSzUdKZ` / price `price_1T7hegBxWKNs26XEZGeX5otQ`
  - Growth product `prod_U5tReGySXLI0wU` / price `price_1T7hehBxWKNs26XEeKM2MwGm`
- Updated Vercel env values:
  - `RF_STRIPE_PRICE_STARTER` -> `price_1T7hegBxWKNs26XEZGeX5otQ`
  - `RF_STRIPE_PRICE_GROWTH` -> `price_1T7hehBxWKNs26XEeKM2MwGm`
  - `RF_STRIPE_PRICE_PRO` confirmed absent
- No backend code logic changes were required; plan config already matched required values (Starter 79/1/150, Growth 149/5/600, Pro contact with no Stripe price env).

### Files changed in this rerun
- `docs/ENV-VARS.md`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- DB schema check for `calendar_limit` in `rf_tenants` passed.
- `npm run build` passed.

## 2026-03-05 — Batch 2 deploy-gate retry: force fresh production deploy for latest master commit

### Scope completed
- Verified local and remote `master` were both at `a1a8fa8e221020a8b4edc7ac9a52ed9c37e977af`.
- Re-ran `npm run build` and confirmed pass before deploy trigger.
- Triggered a fresh auto-deploy by pushing a minimal no-op commit to `origin/master` (no Batch 2 backend logic changed).
- Confirmed Vercel production deployment for `prj_VDUyHtQs8yg3QUy1BEvVyEyY96aj` reached `READY` for the latest commit from this retry.

### Verification
- `npm run build` ✅
- Vercel production deploy (latest commit) ✅ READY

## 2026-03-05 — Review Funnel Batch 3: Admin panel for Austen

### Scope completed
- Added Review Funnel admin auth primitives:
  - `src/lib/review-funnel/admin.ts` (admin session constants + plan config)
  - `src/lib/review-funnel/admin-middleware.ts` (ADMIN_SECRET header check + JWT cookie verification)
- Added admin auth API:
  - `POST /api/review-funnel/admin/auth` to validate `{ secret }` and set `rf_admin_session` cookie (8-hour expiry)
  - `DELETE /api/review-funnel/admin/auth` for logout
- Added protected admin APIs (all gated by `requireReviewFunnelAdminAuth`):
  - `GET /api/review-funnel/admin/tenants`
  - `GET/PATCH /api/review-funnel/admin/tenants/[id]`
  - `GET /api/review-funnel/admin/stats`
- Added admin UI routes:
  - `/review-funnel/admin/login` (single password input)
  - `/review-funnel/admin` (tenant list with search + sortable columns)
  - `/review-funnel/admin/tenants/[id]` (tenant detail, calendar connections, 3-month SMS history, recent requests, status/plan actions)
  - `/review-funnel/admin/stats` (plan counts, monthly SMS total, MRR, monthly signups)
- Added internal admin shell component with required sidebar nav: Tenants | Stats | Logout.
- Updated docs for Batch 3:
  - `docs/ENV-VARS.md`
  - `docs/UI-VERIFICATION.md`
  - `docs/implementation-plan.md`
  - `docs/ralph-context.md`
- Generated and set `RF_ADMIN_SECRET` in Vercel project `prj_VDUyHtQs8yg3QUy1BEvVyEyY96aj`; saved local copy to `C:\Users\austen\.openclaw\credentials\rf-admin-secret.txt`.

### Verification
- `npm run build` ✅

## 2026-03-05 — Review Funnel Batch 2: calendar-based pricing tiers + Stripe products + schema update

### Scope completed
- Added `calendarLimit` to the Review Funnel tenant schema in `src/lib/review-funnel/db/schema.ts` (maps to DB column `calendar_limit`, default `1`).
- Ran the queue-required DB flow without `psql`:
  - pulled `DATABASE_URL` from Vercel (`prj_VDUyHtQs8yg3QUy1BEvVyEyY96aj`), wrote temporary `.env.local`
  - ran `npx drizzle-kit push`
  - drizzle attempted legacy sequence drops and reported dependency error on `audit_log_id_seq`
  - independently verified `rf_tenants.calendar_limit` exists via Neon SQL query through `@neondatabase/serverless`
  - deleted `.env.local`
- Created new Stripe products + monthly prices:
  - Starter product `prod_U5t8pSDs2wkHG4` / price `price_1T7hMIBxWKNs26XE5RMWhTmX`
  - Growth product `prod_U5t8V16exFKWPK` / price `price_1T7hMIBxWKNs26XEx6KV6naT`
- Updated Vercel env vars:
  - `RF_STRIPE_PRICE_STARTER` -> `price_1T7hMIBxWKNs26XE5RMWhTmX`
  - `RF_STRIPE_PRICE_GROWTH` -> `price_1T7hMIBxWKNs26XEx6KV6naT`
  - deleted `RF_STRIPE_PRICE_PRO`
- Updated plan logic and pricing:
  - `src/lib/review-funnel/services/stripe.ts`: Growth now `$149` + `600` monthly request limit; Pro remains unlimited limits and no checkout plan
  - `src/lib/review-funnel/config.ts`: removed `RF_STRIPE_PRICE_PRO` env parse
  - `src/app/api/review-funnel/checkout/route.ts`: checkout payload now only allows `starter|growth`
  - `src/app/api/review-funnel/settings/billing/route.ts`: Growth monthly amount now `149`, Pro amount `null`
- Updated UI pricing copy:
  - `src/app/review-funnel/signup/SignupClient.tsx` Step 4 cards and CTA flow now match Starter/Growth/Pro spec (including `Most Popular` Growth badge and Pro `mailto:` contact CTA)
  - `src/app/services/review-funnel/page.tsx` pricing cards updated to new plan values and plain-language capacity copy (`1 location or staff calendar`)
  - `src/app/pricing/page.tsx` summary line updated to `Growth $149/mo • Pro is a contact-us plan`
- Enforced calendar limit in watch creation:
  - `src/lib/review-funnel/services/calendar.ts` now counts active watches and throws `Upgrade your plan to connect more calendars` when at limit before creating a new watch.

### Docs updated
- `docs/ENV-VARS.md` (Starter/Growth price IDs updated; Pro env removed)
- `docs/UI-VERIFICATION.md` (Batch 2 UI checks added)
- `docs/implementation-plan.md` (Batch 2 checklist added)
- `docs/ralph-context.md` (Batch 2 summary appended)

### Verification
- `npm run build` ✅

## 2026-03-05 — Review Funnel Batch 1 (retry 2): routing fix + DB migration + docs

### Scope completed
- Diagnosed routing bug root cause: `RF_SESSION_COOKIE_NAME` was exported from `src/lib/review-funnel/middleware.ts`, which also eagerly imports `verifySession` (`services/auth` -> `config`). Importing that cookie constant into login/dashboard auth flow pulled env-bound auth code at module load and caused incorrect routing behavior.
- Fixed routing/auth coupling by moving cookie constant to `src/lib/review-funnel/constants.ts` and updating imports in:
  - `src/lib/review-funnel/middleware.ts`
  - `src/app/review-funnel/dashboard/layout.tsx`
  - `src/app/api/review-funnel/auth/verify/route.ts`
  - `src/app/api/review-funnel/auth/logout/route.ts`
- Updated dashboard layout to lazy-import `verifySession` only after checking for the session cookie so unauthenticated requests now redirect to `/review-funnel/login`.
- Executed DB migration flow using `DATABASE_URL` from Vercel: wrote temporary `.env.local`, ran `npx drizzle-kit push`, then deleted `.env.local`.
- Confirmed `rf_*` tables exist in `public`: `rf_calendar_watches`, `rf_google_oauth_tokens`, `rf_locations`, `rf_magic_links`, `rf_pending_sms`, `rf_review_requests`, `rf_sms_opt_outs`, `rf_sms_usage`, `rf_tenants`.
- Created required docs:
  - `docs/ENV-VARS.md`
  - `docs/UI-VERIFICATION.md`
- Appended summary to `docs/ralph-context.md`.

### DB migration result
- `drizzle-kit push` attempted to drop legacy non-RF sequences and hit Postgres dependency protection on `audit_log_id_seq` (`cannot drop sequence ... because other objects depend on it`).
- RF tables remain present and queryable.

### Verification
- Route smoke checks using local `next dev`:
  - `GET /review-funnel/login` -> `200`
  - `GET /review-funnel/signup` -> `200`
  - `GET /services/review-funnel` -> `200`
  - `GET /review-funnel/dashboard` (no session) -> `307` redirect to `/review-funnel/login`
- `npm run build` ✅

## 2026-03-05 — Review Funnel Batch 9: Signup copy clarity + checkout 405 hardening + Stripe price setup

### Scope completed
- Updated Step 3 copy in `src/app/review-funnel/signup/SignupClient.tsx` to be plain-language and benefit-first for non-technical owners:
  - Added top explainer: "Customize what your customers see after their appointment."
  - Added helper text under Primary color to explain where it appears.
  - Renamed Promo offer label to "Recovery offer for unhappy customers" and added helper text with an example offer.
- Hardened `POST /api/review-funnel/checkout` in `src/app/api/review-funnel/checkout/route.ts` to prevent POST requests from surfacing as 405 when runtime config import fails:
  - Removed eager top-level Stripe service import.
  - Added lazy dynamic import inside `POST` after payload validation.
  - Added error normalization so missing env bootstrap failures now return a JSON 500 message (`Review Funnel checkout is not configured yet.`) instead of falling through to framework error-page handling.
- Verified route behavior locally in dev:
  - `POST /api/review-funnel/checkout` with `{}` returns `400` JSON payload validation errors.
  - `POST /api/review-funnel/checkout` with a valid body and missing env returns `500` JSON error (not HTML/405).
- Created Stripe products + recurring monthly prices in the shared Autom8 Stripe account:
  - Starter (`$79/mo`): `price_1T7dboBxWKNs26XE1sSy0jmD`
  - Growth (`$129/mo`): `price_1T7dbpBxWKNs26XETTV5H311`
  - Pro (`$199/mo`): `price_1T7dbqBxWKNs26XEBCBOE8vO`

### Files changed in this batch
- `src/app/review-funnel/signup/SignupClient.tsx`
- `src/app/api/review-funnel/checkout/route.ts`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅

## 2026-03-05 — Review Funnel Batch 7: Dashboard + settings implementation

### Scope completed
- Implemented the authenticated Review Funnel dashboard shell and all requested dashboard/settings pages:
  - `src/app/review-funnel/dashboard/layout.tsx`
  - `src/app/review-funnel/dashboard/page.tsx`
  - `src/app/review-funnel/dashboard/DashboardOverview.tsx`
  - `src/app/review-funnel/dashboard/reviews/page.tsx`
  - `src/app/review-funnel/dashboard/reviews/ReviewsClient.tsx`
  - `src/app/review-funnel/dashboard/feedback/page.tsx`
  - `src/app/review-funnel/dashboard/feedback/FeedbackClient.tsx`
  - `src/app/review-funnel/dashboard/settings/page.tsx`
  - `src/app/review-funnel/dashboard/settings/SettingsClient.tsx`
- Added dashboard layout UI component with responsive sidebar nav + header + logout:
  - `src/components/review-funnel/DashboardLayout.tsx`
- Added shared dashboard components:
  - `src/components/review-funnel/StatsCard.tsx`
  - `src/components/review-funnel/ReviewTable.tsx`
  - `src/components/review-funnel/FeedbackList.tsx`
  - `src/components/review-funnel/CalendarStatus.tsx`
  - `src/components/review-funnel/SmsTemplateEditor.tsx`
  - `src/components/review-funnel/BrandingPreview.tsx`
- Added required dashboard/settings API routes:
  - `src/app/api/review-funnel/dashboard/stats/route.ts`
  - `src/app/api/review-funnel/dashboard/sms-usage/route.ts`
  - `src/app/api/review-funnel/dashboard/reviews/route.ts`
  - `src/app/api/review-funnel/dashboard/reviews/[id]/route.ts`
  - `src/app/api/review-funnel/dashboard/feedback/route.ts`
  - `src/app/api/review-funnel/settings/profile/route.ts`
  - `src/app/api/review-funnel/settings/sms/route.ts`
  - `src/app/api/review-funnel/settings/locations/route.ts`
  - `src/app/api/review-funnel/settings/locations/[id]/route.ts`
- Implemented dashboard auth redirect behavior in server layout using `rf_session` + `verifySession()`.
- Added a build unblocker during verification:
  - `src/app/review-funnel/login/LoginClient.tsx` and `src/app/review-funnel/login/page.tsx` now pass URL error keys from server `searchParams` prop instead of using `useSearchParams`, removing prerender suspense bailout.

### Files changed in this batch
- `src/app/review-funnel/dashboard/layout.tsx`
- `src/app/review-funnel/dashboard/page.tsx`
- `src/app/review-funnel/dashboard/DashboardOverview.tsx`
- `src/app/review-funnel/dashboard/reviews/page.tsx`
- `src/app/review-funnel/dashboard/reviews/ReviewsClient.tsx`
- `src/app/review-funnel/dashboard/feedback/page.tsx`
- `src/app/review-funnel/dashboard/feedback/FeedbackClient.tsx`
- `src/app/review-funnel/dashboard/settings/page.tsx`
- `src/app/review-funnel/dashboard/settings/SettingsClient.tsx`
- `src/components/review-funnel/DashboardLayout.tsx`
- `src/components/review-funnel/StatsCard.tsx`
- `src/components/review-funnel/ReviewTable.tsx`
- `src/components/review-funnel/FeedbackList.tsx`
- `src/components/review-funnel/CalendarStatus.tsx`
- `src/components/review-funnel/SmsTemplateEditor.tsx`
- `src/components/review-funnel/BrandingPreview.tsx`
- `src/app/api/review-funnel/dashboard/stats/route.ts`
- `src/app/api/review-funnel/dashboard/sms-usage/route.ts`
- `src/app/api/review-funnel/dashboard/reviews/route.ts`
- `src/app/api/review-funnel/dashboard/reviews/[id]/route.ts`
- `src/app/api/review-funnel/dashboard/feedback/route.ts`
- `src/app/api/review-funnel/settings/profile/route.ts`
- `src/app/api/review-funnel/settings/sms/route.ts`
- `src/app/api/review-funnel/settings/locations/route.ts`
- `src/app/api/review-funnel/settings/locations/[id]/route.ts`
- `src/app/review-funnel/login/LoginClient.tsx`
- `src/app/review-funnel/login/page.tsx`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅
- `npm run lint` ❌ (pre-existing lint error in `src/lib/review-funnel/services/auth.ts` uses `require()` import style)

## 2026-03-05 — Review Funnel Batch 8: Product page live rewrite + polish + deploy prep

### Scope completed
- Rewrote `src/app/services/review-funnel/page.tsx` from teaser/waitlist into a live product page with:
  - pricing tiers (Starter `$79/mo`, Growth `$129/mo`, Pro `Contact Us`)
  - reusable plan cards (`src/components/review-funnel/PlanCard.tsx`)
  - manual follow-up comparison section
  - 3-step flow (`Connect Calendar` → `Automatic SMS` → `Reviews Roll In`)
  - testimonials placeholder section
  - FAQ section
  - primary CTA to `/review-funnel/signup`
- Polish pass for consistency across related surfaces:
  - updated Review Funnel pricing card copy on homepage (`src/components/ServicesBento.tsx`)
  - updated Review Funnel pricing block on `/pricing` (`src/app/pricing/page.tsx`)
  - refreshed signup hero copy and kept existing 4-step checkout flow (`src/app/review-funnel/signup/SignupClient.tsx`)
- SEO/meta updates for new Review Funnel pages:
  - `src/app/review-funnel/signup/page.tsx` uses `buildMetadata`
  - `src/app/review-funnel/login/page.tsx` uses `buildMetadata` + `robots: noindex`
  - `src/app/review-funnel/signup/success/page.tsx` uses `buildMetadata` + `robots: noindex`
- Sitemap update:
  - added `/review-funnel/signup` to `src/app/sitemap.ts`
- Navigation/footer verification:
  - `Review Funnel` links were already present in `src/components/Navigation.tsx` and `src/components/Footer.tsx` (no additional edits required).
- Build blocker fix discovered during verification:
  - `src/app/review-funnel/dashboard/settings/SettingsClient.tsx` narrowed `payload.profile` before `setProfile` callback to satisfy TypeScript strictness.

### Files changed in this batch
- `src/app/services/review-funnel/page.tsx`
- `src/components/review-funnel/PlanCard.tsx`
- `src/components/ServicesBento.tsx`
- `src/app/pricing/page.tsx`
- `src/app/review-funnel/signup/SignupClient.tsx`
- `src/app/review-funnel/signup/page.tsx`
- `src/app/review-funnel/login/page.tsx`
- `src/app/review-funnel/signup/success/page.tsx`
- `src/app/sitemap.ts`
- `src/app/review-funnel/dashboard/settings/SettingsClient.tsx`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅
- Note: Neon warning persists during build (`fetchConnectionCache` deprecation; already always true).

## 2026-03-05 — Review Funnel Batch 6: magic link auth + signup flow

### Scope completed
- Added magic-link auth API routes:
  - `POST /api/review-funnel/auth/login` (`src/app/api/review-funnel/auth/login/route.ts`)
    - accepts `{ email }`
    - generates one-time magic link token
    - stores hashed token in `rf_magic_links`
    - sends login email via Gmail SMTP
    - returns `{ success: true, message: "Check your email" }`
  - `GET /api/review-funnel/auth/verify` (`src/app/api/review-funnel/auth/verify/route.ts`)
    - validates token and marks it as used
    - creates JWT cookie session (`rf_session`)
    - redirects to `/review-funnel/dashboard`
  - `POST /api/review-funnel/auth/logout` (`src/app/api/review-funnel/auth/logout/route.ts`)
    - clears session cookie
- Added magic-link mail delivery service:
  - `src/lib/review-funnel/services/magic-link-email.ts`
  - Uses Nodemailer + Gmail SMTP.
  - Reads credentials from env vars with fallback to `C:\Users\austen\.openclaw\credentials\gmail-autom8.txt`.
  - From: `aust@autom8everything.com`
  - Subject: `Your Review Funnel login link`
  - Link URL: `https://autom8everything.com/api/review-funnel/auth/verify?token=...`
- Updated auth/config behavior:
  - `src/lib/review-funnel/config.ts`
    - default `RF_MAGIC_LINK_TTL_MINUTES` now `15`
    - added optional `RF_GMAIL_CREDENTIALS_PATH`
- Added Review Funnel login UI:
  - `src/app/review-funnel/login/page.tsx`
  - `src/app/review-funnel/login/LoginClient.tsx`
  - Simple email form + `Send Login Link` CTA + success state message.
- Added Review Funnel signup wizard:
  - `src/app/review-funnel/signup/page.tsx`
  - `src/app/review-funnel/signup/SignupClient.tsx`
  - 4 steps:
    1) business info
    2) Google business lookup (Place ID)
    3) branding (primary color + promo offer)
    4) plan selection (Starter, Growth, Pro contact path)
  - Starter/Growth submit to Stripe Checkout redirect.
  - Pro path routes to contact CTA.
- Added signup success page:
  - `src/app/review-funnel/signup/success/page.tsx`
  - Includes `Connect Google Calendar` CTA.
- Added Google Places lookup API route for signup step 2:
  - `GET /api/review-funnel/google/places-search` (`src/app/api/review-funnel/google/places-search/route.ts`)
  - Uses Google Places API (Text Search) and returns place candidates.
- Extended Stripe checkout intake to preserve signup branding fields:
  - `src/app/api/review-funnel/checkout/route.ts` now accepts optional `primaryColor` and `promoOffer`.
  - `src/lib/review-funnel/services/stripe.ts` now stores those values via checkout metadata and persists into `rf_tenants` on webhook completion.

### Files changed
- `src/app/api/review-funnel/auth/login/route.ts` (new)
- `src/app/api/review-funnel/auth/verify/route.ts` (new)
- `src/app/api/review-funnel/auth/logout/route.ts` (new)
- `src/lib/review-funnel/services/magic-link-email.ts` (new)
- `src/lib/review-funnel/config.ts`
- `src/app/review-funnel/login/page.tsx` (new)
- `src/app/review-funnel/login/LoginClient.tsx` (new)
- `src/app/review-funnel/signup/page.tsx`
- `src/app/review-funnel/signup/SignupClient.tsx`
- `src/app/review-funnel/signup/success/page.tsx` (new)
- `src/app/api/review-funnel/google/places-search/route.ts` (new)
- `src/app/api/review-funnel/checkout/route.ts`
- `src/lib/review-funnel/services/stripe.ts`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm install` ✅
- `npm run build` ✅
- Build warning observed (pre-existing): Neon `fetchConnectionCache` deprecation notice.

## 2026-03-05 — Review Funnel Batch 5: customer funnel page + public funnel APIs

### Scope completed
- Implemented public funnel API routes:
  - `GET /api/review-funnel/funnel/[requestId]` (`src/app/api/review-funnel/funnel/[requestId]/route.ts`)
    - Returns tenant branding and review request payload for the customer-facing page.
    - Tracks first page open by setting `rf_review_requests.page_opened_at` when null.
    - Includes color sanitization fallback and location review URL override (`rf_locations.gmb_review_url` when present).
  - `POST /api/review-funnel/funnel/rate` (`src/app/api/review-funnel/funnel/rate/route.ts`)
    - Validates `requestId`, `rating` (1–5), optional `googleReviewClicked`.
    - Persists `rating`, `rated_at` (first-set), ensures `page_opened_at`, and tracks `google_review_clicked`.
  - `POST /api/review-funnel/funnel/feedback` (`src/app/api/review-funnel/funnel/feedback/route.ts`)
    - Validates `requestId` + feedback text.
    - Enforces 1–4★ flow only (`rating` required and must not be 5).
    - Persists `feedback_text` + `promo_shown` and returns promo details.
- Added customer-facing funnel pages:
  - `src/app/r/[requestId]/page.tsx`
    - Dynamic server shell + metadata/OG tags including business name when available.
    - Marked dynamic and noindex for the public request-specific page.
  - `src/app/r/[requestId]/FunnelClient.tsx`
    - Client-side fetch of funnel payload on mount.
    - Mobile-first standalone branded UI (no site nav/footer).
    - Implements full flow:
      - star selection (1–5)
      - 5★ prompt -> Google review CTA -> thank-you
      - 1–4★ promo + feedback form -> submit -> thank-you with promo details
    - Tracks required events via API calls: `page_opened_at`, `rating`, `rated_at`, `google_review_clicked`, `feedback_text`.
  - `src/app/r/[requestId]/thanks/page.tsx` static fallback thank-you page.
- Added reusable star selector:
  - `src/components/review-funnel/StarRating.tsx`
  - 5 interactive stars with large tap targets, hover/selection animation, keyboard support, and ARIA radio semantics.

### Build unblockers completed during this batch
- `npm run build` initially failed on pre-existing Review Funnel auth/signup files present in workspace but not fully wired.
- Added missing/supporting pieces required for successful build:
  - `src/app/review-funnel/signup/SignupClient.tsx` (placeholder client component for existing signup page import)
  - Updated `src/app/review-funnel/login/page.tsx` to wrap client usage in `Suspense` (required for `useSearchParams` CSR bailout)
  - Installed email dependency/types required by existing magic-link mailer files:
    - `nodemailer` (dependency)
    - `@types/nodemailer` (dev dependency)
  - Updated lockfile accordingly (`package-lock.json`).

### Files changed
- `src/app/api/review-funnel/funnel/[requestId]/route.ts` (new)
- `src/app/api/review-funnel/funnel/rate/route.ts` (new)
- `src/app/api/review-funnel/funnel/feedback/route.ts` (new)
- `src/app/r/[requestId]/page.tsx` (new)
- `src/app/r/[requestId]/FunnelClient.tsx` (new)
- `src/app/r/[requestId]/thanks/page.tsx` (new)
- `src/components/review-funnel/StarRating.tsx` (new)
- `src/app/review-funnel/login/page.tsx`
- `src/app/review-funnel/signup/SignupClient.tsx` (new)
- `package.json`
- `package-lock.json`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅
- Build warning observed (pre-existing): Neon `fetchConnectionCache` deprecation notice.

## 2026-03-04 — Review Funnel Batch 4: Stripe integration + checkout + billing routes

### Scope completed
- Added Stripe service at `src/lib/review-funnel/services/stripe.ts` with the core primitives:
  - `createCheckoutSession(params)` for Stripe subscription checkout
  - `constructStripeWebhookEvent(payload, signature)` for signature verification
  - `handleWebhookEvent(event)` for Review Funnel Stripe lifecycle events
  - `createBillingPortalSession(tenantId)` for Stripe Billing Portal redirect URLs
- Implemented Review Funnel plan mapping and limits in Stripe service:
  - Starter: $79/mo, 150 SMS
  - Growth: $129/mo, 500 SMS
  - Pro: $199/mo, unlimited SMS (stored as sentinel `999999`)
- Added checkout endpoint `POST /api/review-funnel/checkout`:
  - Validates payload fields: `email`, `businessName`, `ownerName`, `ownerPhone`, `plan`, `googlePlaceId`
  - Creates/reuses Stripe customer
  - Creates Stripe Checkout Session in subscription mode
  - Uses success URL `/review-funnel/signup/success?session_id={CHECKOUT_SESSION_ID}`
  - Uses cancel URL `/review-funnel/signup`
- Added Stripe webhook endpoint `POST /api/review-funnel/webhooks/stripe`:
  - Verifies signature with `stripe.webhooks.constructEvent()`
  - Handles `checkout.session.completed` by creating/updating `rf_tenants` with Stripe IDs, plan, and SMS limits
  - Handles `customer.subscription.updated` by syncing plan + SMS limit
  - Handles `customer.subscription.deleted` by deactivating tenant (`is_active = false`)
  - Handles `invoice.payment_failed` by flagging tenant via deactivation (`is_active = false`) because schema currently has no dedicated billing-flag field
- Added billing settings routes:
  - `GET /api/review-funnel/settings/billing` (authenticated) returns current plan/subscription ids/usage snapshot
  - `POST /api/review-funnel/settings/billing/portal` (authenticated) returns billing portal URL
- Extended Review Funnel config parsing in `src/lib/review-funnel/config.ts` to include `STRIPE_SECRET_KEY`.

### Files changed
- `src/lib/review-funnel/services/stripe.ts` (new)
- `src/app/api/review-funnel/checkout/route.ts` (new)
- `src/app/api/review-funnel/webhooks/stripe/route.ts` (new)
- `src/app/api/review-funnel/settings/billing/route.ts` (new)
- `src/app/api/review-funnel/settings/billing/portal/route.ts` (new)
- `src/lib/review-funnel/config.ts`
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅
- Build warning seen from Neon driver: `fetchConnectionCache` deprecation (already true by default).

## 2026-03-04 — Review Funnel Batch 3: SMS service + Twilio webhooks + cron processing

### Scope completed
- Added `src/lib/review-funnel/services/sms.ts` with required SMS primitives:
  - `sendReviewRequest(reviewRequestId)` sends Twilio SMS with funnel URL interpolation.
  - `interpolateTemplate(template, vars)` supports `{customer_name}`, `{business_name}`, `{funnel_url}`.
  - `checkOptOut(phone)` checks `rf_sms_opt_outs`.
  - `checkMonthlyLimit(tenantId)` compares current usage in `rf_sms_usage` against tenant limits.
  - `incrementUsage(tenantId)` upserts monthly usage counters.
  - `handleOptOut(phone)` inserts/ignores in `rf_sms_opt_outs`.
  - Quiet-hours helper (`RF_QUIET_HOURS_START` / `RF_QUIET_HOURS_END`) returns next allowed send time.
- Added cron route `GET /api/review-funnel/cron/process-sms`:
  - Atomically claims up to 10 due queued rows from `rf_pending_sms` and sets them to `processing`.
  - Sends through `sendReviewRequest`, handles terminal states, quiet-hours deferral, and retries.
  - Retry policy implemented with up to 3 attempts and 3-minute backoff multiplier.
- Added Twilio webhook routes:
  - `POST /api/review-funnel/webhooks/twilio/status` maps Twilio delivery states to `rf_review_requests.sms_status`.
  - `POST /api/review-funnel/webhooks/twilio/inbound` handles STOP/UNSUBSCRIBE opt-outs and responds with TwiML.
- Added `vercel.json` cron schedule entries for:
  - `/api/review-funnel/cron/process-sms` every minute.
  - `/api/review-funnel/cron/renew-watches` every 4 hours.
- Build unblock/fixes while integrating Review Funnel server routes:
  - `src/lib/review-funnel/config.ts` now injects safe placeholder values only during Next production build phase when required RF env vars are absent.
  - `src/lib/review-funnel/services/calendar.ts` type fixes (`OAuth2` instance typing + nullable token row return).

### Files changed
- `src/lib/review-funnel/services/sms.ts` (new)
- `src/app/api/review-funnel/cron/process-sms/route.ts` (new)
- `src/app/api/review-funnel/webhooks/twilio/status/route.ts` (new)
- `src/app/api/review-funnel/webhooks/twilio/inbound/route.ts` (new)
- `src/lib/review-funnel/config.ts`
- `src/lib/review-funnel/services/calendar.ts`
- `vercel.json` (new)
- `docs/ralph-context.md`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅
- Build warning seen from Neon driver: `fetchConnectionCache` deprecation (already true by default).

## 2026-03-03 — Full content overhaul (homepage, product pages, pricing, website tiers)

### Scope completed
- Rewrote homepage hero to outcome-first messaging with required phrase: **"without the tech headache"**.
- Updated homepage CTA stack to product-first flow:
  - Primary: `See What We Build` → `/pricing`
  - Secondary: `Call Us` → `/contact`
- Reworked product card grid to requested structure:
  - 1 featured large card: **Cadence** (`$199/mo`, `7-day free trial`, CTA → `/onboarding`)
  - 4 smaller cards: **Review Funnel**, **Website Creation**, **SEO & Content**, **Custom Apps**
  - Custom Apps card CTA set to `Book a Consultation`
- Improved trust/social section copy for clearer plain-language credibility messaging.
- Cleaned footer product links so it now includes all product pages + `/onboarding`.

### Product pages
- Verified and rewrote all required product pages with consistent structure:
  - Hero section
  - 3-step “How It Works”
  - Pricing section
  - Primary CTA section
  - FAQ section
- Updated/created routes:
  - `/services/cadence` (copy refreshed)
  - `/services/review-funnel` (pricing now “Coming Soon / Contact Us”)
  - `/services/websites` (**new canonical website page**)
  - `/services/seo-content` (monthly retainer + contact pricing)
  - `/services/custom-apps` (consultative pricing and CTA)
- Set legacy route `/services/website-creation` to redirect to `/services/websites`.

### Pricing page
- Rebuilt `/pricing` content to include all products with requested positioning:
  - Cadence: `$199/mo` + `7-day free trial`
  - Review Funnel: `Coming Soon` + contact CTA
  - Websites: Launch/Scale/Custom with explicit tiers
  - SEO & Content: monthly retainer + `Contact Us`
  - Custom Apps: consultative pricing + `Book a Consultation`
- Applied website tier pricing requirements:
  - **Launch** — `$1,500`
  - **Scale** — `$3,500`
  - **Custom** — `Let’s Talk`

### Files changed
- `src/components/Hero.tsx`
- `src/components/ServicesBento.tsx`
- `src/components/SocialProofBar.tsx`
- `src/components/Footer.tsx`
- `src/components/Navigation.tsx`
- `src/components/CTA.tsx`
- `src/app/services/cadence/page.tsx`
- `src/app/services/review-funnel/page.tsx`
- `src/app/services/websites/page.tsx` (new)
- `src/app/services/website-creation/page.tsx` (redirect)
- `src/app/services/seo-content/page.tsx`
- `src/app/services/custom-apps/page.tsx`
- `src/app/pricing/page.tsx`
- `src/app/sitemap.ts`
- `src/app/services/ServicesPageClient.tsx` (copy cleanup)
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run build` ✅
- Note: pre-existing Next.js warning remains about inferred workspace root due to multiple lockfiles.


## 2026-03-03 — ServicesBento non-hero card uniformity pass (homepage product grid)

### Scope completed
- Kept Cadence as the featured hero card with no structural role changes.
- Consolidated all 4 non-hero cards to one shared internal skeleton and spacing rhythm:
  - eyebrow
  - icon
  - title
  - description
  - pricing line + context
  - micro-proof
  - bottom-anchored CTA row
- Removed tier-based layout divergence (`primary` vs `secondary`) from non-hero rendering so all four cards now share identical padding, typography sizing, min-height, and CTA placement behavior.
- Replaced non-button text-link CTA treatment on secondary cards with real pill buttons so all four non-hero cards use the same button shape, height, and spacing.
- Updated non-hero CTA intent/labels per requested direction:
  - Websites: `See Plans` → `/pricing` (unchanged)
  - SEO: `See Plans` → `/pricing` (unchanged)
  - Review: `See Plans` → `/pricing` (changed from Learn More)
  - Custom Apps: `Book Call` → `/contact` (changed from Tell Us What You Need)
- Preserved existing Autom8 premium visual language (palette, card surfaces, glow, hover motion, typography family).

### Files changed
- `src/components/ServicesBento.tsx`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run lint` ✅ (`EXIT:0`)
- `npm run build` ✅
- Note: pre-existing Next.js warning remains about inferred workspace root due to multiple lockfiles.

## 2026-03-03 — CTA architecture consolidation (homepage/nav/pricing/contact/product pages)

### Scope completed
- Implemented the website-architecture consolidation blueprint end-to-end while preserving the existing premium visual system.
- Enforced CTA taxonomy on core funnel pages:
  - Hero primary CTA is now `See Plans` → `/pricing`.
  - Hero secondary CTA added: `Start Free Trial` → `/cadence/get-started`.
  - Homepage bottom CTA label normalized: `Book a Call`.
  - Contact page label normalized: `Book a Call` (mailto destination kept intentionally).
- Standardized ServicesBento CTA behavior across all 5 product cards:
  - Cadence: `Start Free Trial` + `Learn More`.
  - Website: `See Plans` → `/pricing`.
  - SEO: `See Plans` → `/pricing`.
  - Review Funnel: `Learn More` → `/services/review-funnel`.
  - Custom Apps: `Tell Us What You Need` → `/contact`.
- Elevated `/pricing` into canonical plan-detail page with all 5 products and consistent CTA pattern:
  - Added rows for Cadence, Website, Review Funnel, SEO, and Custom Apps.
  - Added per-row inclusion bullets and consistent `Learn More` links to product detail pages.
  - Primary CTAs now standardized to `Start Free Trial` (Cadence) and `Book a Call` (consultative offers).
  - Replaced intake-footer wording with: "Not sure which plan fits? Tell us about your business..."
- Removed conflicting/retired labels from active code paths (`View Packages`, `View Website Packages`, `Book a Quick Call`, `Book a 15-Minute Call`, `Go to intake form`, `See What We Can Do`).
- Cleaned product-detail conversion flow to match page-role map:
  - Website/SEO/Review pages now route pricing-intent CTA to `/pricing` via `See Plans`.
  - Custom Apps product CTA normalized to `Book a Call`.
  - Website detail page no longer hosts full tier tables; now concise pricing anchor + canonical `/pricing` handoff.

### Files changed
- `src/components/Hero.tsx`
- `src/components/ServicesBento.tsx`
- `src/components/CTA.tsx`
- `src/components/PricingOverview.tsx`
- `src/app/pricing/page.tsx`
- `src/app/contact/ContactPageClient.tsx`
- `src/app/services/website-creation/page.tsx`
- `src/app/services/review-funnel/page.tsx`
- `src/app/services/seo-content/page.tsx`
- `src/app/services/custom-apps/page.tsx`
- `src/app/services/cadence/page.tsx`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run lint` ✅
- `npm run build` ✅
- Note: pre-existing Next.js warning remains about inferred workspace root due to multiple lockfiles.

## 2026-03-03 — Enterprise product cards implemented + homepage pricing redundancy removed

### Scope completed
- Rebuilt `src/components/ServicesBento.tsx` to match the enterprise product card blueprint:
  - Introduced explicit card tiers (`hero`, `primary`, `secondary`) and full per-card hierarchy (eyebrow → product name → value prop → pricing anchor + context → micro-proof → CTA).
  - Kept Cadence as dominant hero card with integrated pricing module, dual CTAs, premium gradient/glow treatment, and plain-language copy.
  - Applied Playfair to all product names, added pricing divider lines, micro-proof chips with check icon, and integrated pricing anchors on all five cards.
  - Preserved reduced-motion behavior (no transform lift/press when `useReducedMotion()` is true) while keeping color/opacity transitions.
  - Added accessibility improvements: each card rendered as `<article aria-label="...">`; each pricing anchor has explicit `aria-label` text for screen readers.
- Updated `src/app/HomePageClient.tsx`:
  - Removed homepage `<PricingOverview />` import/render ("Simple, Transparent Pricing" section no longer appears on homepage).
  - Confirmed no homepage `CadenceHighlight` render.
  - Adjusted section order to `ServicesBento -> WhoItsFor -> HowItWorks -> Testimonials -> FAQ -> CTA` per current blueprint direction.

### Files changed
- `src/components/ServicesBento.tsx`
- `src/app/HomePageClient.tsx`
- `docs/CODER-CONTEXT.md`

### Verification
- `npm run lint` ✅
- `npm run build` ✅
- Note: pre-existing Next.js warning remains about inferred workspace root due to multiple lockfiles.

## 2026-03-03 — SocialProofBar rating card made explicitly star-first

### Scope completed
- Updated only the trust/rating card (third card) in `src/components/SocialProofBar.tsx`.
- Shifted the visual hierarchy so five gold stars are the dominant element.
- Removed the larger text-forward treatment in favor of minimal supporting copy (`Client Rating`).
- Preserved subtle premium twinkle/glow motion and existing reduced-motion-safe behavior.

### Files changed
- `src/components/SocialProofBar.tsx`

### Verification
- `npm run build` ✅


## 2026-03-03 — Homepage reliability metric card converted to premium star-rating motif

### Scope completed
- Updated only the homepage social proof metric card area in `src/components/SocialProofBar.tsx`.
- Replaced the old numeric reliability metric treatment with a star-rating trust motif and subtle motion glow/twinkle.
- Preserved existing theme surface, typography, and spacing system (no broad redesign).

### Files changed
- `src/components/SocialProofBar.tsx`
- `src/app/globals.css`

### Key decisions
- Kept the first two stat cards unchanged and scoped the redesign to the third trust/reliability card only.
- Added five-star icon row with restrained shimmer/twinkle and amber radial glow for premium visual emphasis.
- Added reduced-motion-safe behavior by disabling Framer star motion when `useReducedMotion()` is true; CSS animations also respect existing global `prefers-reduced-motion` guard.
- Maintained contrast with white primary text and `#A1A1AA` secondary text on the existing dark card surface.

### Verification
- `npm run build` ✅

## 2026-03-03 — Homepage-only Huly-inspired refresh

### Scope completed
- Applied the homepage-only visual refresh in `src/app/HomePageClient.tsx` and homepage section components.
- Did **not** touch non-homepage routes.
- No new dependencies added.

### Files changed
- `src/lib/motion.ts` (new)
- `src/app/globals.css`
- `src/app/HomePageClient.tsx`
- `src/components/Navigation.tsx`
- `src/components/Hero.tsx`
- `src/components/SocialProofBar.tsx`
- `src/components/ServicesBento.tsx`
- `src/components/CadenceHighlight.tsx`
- `src/components/WhoItsFor.tsx`
- `src/components/Testimonials.tsx`
- `src/components/HowItWorks.tsx`
- `src/components/FAQ.tsx`
- `src/components/CTA.tsx`

### Key decisions
- Standardized homepage reveal/hover motion via `src/lib/motion.ts` presets.
- Added reduced-motion-safe paths by combining `useReducedMotion()` with opacity-first reveal fallback.
- Replaced Hero JS-animated orbs with static CSS glow blobs for lower runtime animation overhead.
- Added global focus-visible outline and skip-to-content link (`#main-content`) for keyboard accessibility.
- Unified section background treatment around `#0A0A0F` with localized glow zones.

### Verification
- `npm run build` ✅
- `npm run lint` ✅
- Build warning persists from pre-existing workspace lockfile root detection (`Next.js inferred workspace root`).

## 2026-03-03 — Cadence onboarding validation moved to input step

### Scope completed
- Updated `/cadence/get-started` to validate fields at the step where users enter them (instead of surfacing Step 3 format issues on final submit).
- Added inline, human-readable field error messages and accessible `aria-invalid` + `aria-describedby` wiring for each input/textarea.
- Kept backend validation untouched; added frontend mapping for backend error keys/messages to user-friendly text.

### Files changed
- `src/app/cadence/get-started/CadenceGetStartedClient.tsx`

### Key decisions
- Step-level validation now runs continuously from form state (`validateStep`) so Continue buttons are blocked until current-step requirements/formats are valid.
- Field-level validation runs on blur, then re-validates on subsequent changes for touched fields (immediate feedback, no late surprise).
- Step 3 optional fields (`transfer_number`, `booking_url`) are validated only when non-empty.
- Step 4 submit gate validates area code only and no longer introduces new Step 3 format surprises.
- Backend error strings like `Invalid owner_phone` are normalized/mapped to friendly copy before rendering.

### Verification
- `npm run build` ✅
- Manual path check (`/cadence/get-started`, local dev):
  - Step 1/2 Continue remains disabled until required fields are valid.
  - Step 3 with invalid `owner_phone`, `owner_email`, or `booking_url` shows inline readable messages and keeps Continue disabled.
  - Step 3 valid formats allows progression to Step 4.
  - Step 4 focused on area code requirement (`###`) and submit button state tied to that field.

## 2026-03-03 � Featured Cadence card copy + emphasis refinement

### Scope completed
- Updated only the featured Cadence card in the homepage product grid (`src/components/ServicesBento.tsx`).
- Added explicit visible product label: `Cadence`.
- Made pricing more prominent with exact text `Cadence � $199/mo` and subtext `after free trial`.
- Expanded description to plain-language explanation of call answering, booking, FAQs, and call summaries.
- Preserved CTA structure and labels: `Start Free Trial` (primary) and `Learn More` (secondary).

### Files changed
- `src/components/ServicesBento.tsx`

### Verification
- `npm run build` PASS

## 2026-03-03 — Website pricing switched to explicit 3-tier structure

### Scope completed
- Replaced website custom/starting-price messaging with explicit tier pricing in all requested surfaces:
  - `/pricing`
  - `/services/website-creation`
  - homepage pricing overview snippet (`src/components/PricingOverview.tsx`)
- Locked tier names and prices implemented exactly:
  - Launch — $799
  - Scale — $1,499
  - Custom — $2,499+
- Added plain-language tier bullets covering:
  - Launch: quick launch essentials
  - Scale: conversion-focused + integrations
  - Custom: bespoke functionality/workflows
- Added migration note where website pricing is shown: existing site clone/migration is an upcharge and quoted after review.

### Files changed
- `src/app/pricing/page.tsx`
- `src/app/services/website-creation/page.tsx`
- `src/components/PricingOverview.tsx`
- `docs/CODER-CONTEXT.md`

### Key decisions
- Kept existing visual theme/layout patterns (same card styles, spacing system, and CTA patterns) and scoped edits only to website pricing/tier content.
- Updated website service page metadata description so SERP snippet aligns with new pricing tiers.

### Verification
- `npm run build` ✅
- Note: pre-existing Next.js warning remains about inferred workspace root due to multiple lockfiles.


## 2026-03-05 � Batch 3 deploy-gate retry 2: fresh production deployment verification

### Scope completed
- Verified local and remote `master` head before retry.
- Triggered a fresh production auto-deploy for the latest `master` commit via a minimal docs-only push.
- Confirmed Vercel production deployment reached `READY` for the new latest commit.

### Verification
- `npm run build` PASS
- Vercel production deploy (latest `master`) PASS (READY)

