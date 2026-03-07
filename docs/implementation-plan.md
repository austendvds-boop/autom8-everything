# implementation-plan.md — Review Funnel batches

## 2026-03-07 — B7: websites + SEO services page overhauls

- [x] Update `src/app/services/websites/page.tsx` hero copy
- [x] Add `Why Your Website Matters` stat section after hero
- [x] Insert mid-page CTA between How It Works and Pricing
- [x] Upgrade website tiers with `bestFor` and `recommended` badge support
- [x] Add `Built for Real Businesses` proof placeholder section
- [x] Update website final CTA headline and two-button action row
- [x] Update `src/app/services/seo-content/page.tsx` hero copy
- [x] Add timeline expectations section after How It Works
- [x] Replace monthly work grid with deliverables icon list
- [x] Import and render `ComparisonTable` one-off vs retainer section
- [x] Add `SEO Works Best as Part of Your Growth Stack` pairing section
- [x] Add pricing context bullets under `Contact Us`
- [x] Keep service schema + FAQ schema scripts intact on both pages
- [x] Update docs (`docs/UI-VERIFICATION.md`, `docs/ralph-context.md`, `docs/CODER-CONTEXT.md`, `docs/implementation-plan.md`)
- [x] Run `npm run build` and ensure pass
- [x] Commit and push to `origin/ui/cro-passover`

## 2026-03-07 — B6 retry 6: fresh commit to close commit-gate

- [x] Confirm working tree state and HEAD is pushed to origin
- [x] Re-verify `npm run build` passes
- [x] Update docs for this retry pass
- [x] Commit and push fresh SHA to `origin/ui/cro-passover`

## 2026-03-07 — B6 retry 5: final verification + handoff refresh

- [x] Re-verify all B6 page changes remain implemented in `src/app/services/review-funnel/page.tsx`
- [x] Confirm exact 10-section order remains intact
- [x] Re-run `npm run build` and ensure pass
- [x] Append latest batch details to `docs/ralph-context.md` and keep only last 3 batches
- [x] Update `docs/CODER-CONTEXT.md` + `docs/implementation-plan.md`
- [x] Commit and push to `origin/ui/cro-passover`

## 2026-03-07 — B6 retry 4 (final): gate closure — verified + committed

- [x] Verify B6 page changes committed in `45d25d8` (`src/app/services/review-funnel/page.tsx`)
- [x] Confirm 10-section order, hero, compounding stats, visual how-it-works, objections, bundle CTA
- [x] Confirm `import React` and keyed `React.Fragment` present in committed file
- [x] `npm run build` ✅
- [x] Trim `docs/ralph-context.md` to last 3 batches
- [x] Update `docs/CODER-CONTEXT.md` + `docs/implementation-plan.md`
- [x] Commit and push to `origin/ui/cro-passover`

## 2026-03-07 — B6 retry 3: commit-gate closure after PowerShell chaining failure

- [x] Re-verify all B6 requested UI/content updates remain implemented in `src/app/services/review-funnel/page.tsx`
- [x] Re-run `npm run build` and ensure pass
- [x] Append retry handoff notes and keep `docs/ralph-context.md` trimmed to last 3 batches
- [x] Update `docs/CODER-CONTEXT.md` + `docs/implementation-plan.md` for this retry
- [x] Commit and push retry pass to `origin/ui/cro-passover`

## 2026-03-07 — B6 retry 2: final commit-gate closure

- [x] Re-verify all B6 requested UI/content updates remain implemented in `src/app/services/review-funnel/page.tsx`
- [x] Re-run `npm run build` and ensure pass
- [x] Append retry handoff notes and keep `docs/ralph-context.md` trimmed to last 3 batches
- [x] Update `docs/CODER-CONTEXT.md` + `docs/implementation-plan.md` for this retry
- [x] Commit and push retry pass to `origin/ui/cro-passover`

## 2026-03-07 — B6 retry: commit/push gate recovery

- [x] Re-verify all B6 page changes are present in `src/app/services/review-funnel/page.tsx`
- [x] Re-run `npm run build` and ensure pass
- [x] Update retry handoff docs (`docs/ralph-context.md`, `docs/CODER-CONTEXT.md`, `docs/implementation-plan.md`)
- [x] Commit and push retry pass to `origin/ui/cro-passover`

## 2026-03-07 — B6: review funnel page overhaul

- [x] Rewrite hero headline/subhead on `src/app/services/review-funnel/page.tsx`
- [x] Insert reputation compounding section after hero and before pricing
- [x] Upgrade How It Works to connected visual flow with icons (`Calendar`, `MessageSquare`, `Star`)
- [x] Add testimonials TODO attribution note above testimonials array
- [x] Add `Common Concerns` section before FAQ
- [x] Add `Cadence + Review Funnel` bundle section before final CTA with `$278/mo combined`
- [x] Preserve section order and existing pricing/comparison functionality
- [x] Update docs (`docs/UI-VERIFICATION.md`, `docs/ralph-context.md`, `docs/CODER-CONTEXT.md`, `docs/implementation-plan.md`)
- [x] Run `npm run build` and ensure pass
- [x] Commit and push to `origin/ui/cro-passover`

## 2026-03-07 — B5: Cadence page full overhaul

- [x] Create `src/components/ComparisonTable.tsx` — reusable responsive table component
- [x] Create `src/components/CadenceDemoPlaceholder.tsx` — 3-col demo section
- [x] Rewrite `src/app/services/cadence/page.tsx` — 9-section layout
- [x] Hero: new headline, tel CTA, /get-started CTA, trust line
- [x] Pain-point math section: 3 stat cards with sources
- [x] Demo section: CadenceDemoPlaceholder component
- [x] Features section: 6 cards in 3-col grid
- [x] Use-cases section: 4 scenario cards in 2-col grid
- [x] Comparison section: ComparisonTable with 7 rows × 3 columns
- [x] Pricing section: checklist + value framing line + 2 CTAs
- [x] FAQ: expanded from 5 to 8 entries
- [x] Final CTA section: 2 buttons + trust line
- [x] Preserve structured data schemas (service + FAQ)
- [x] Update docs (UI-VERIFICATION.md, ralph-context.md, CODER-CONTEXT.md, implementation-plan.md)
- [x] `npm run build` ✅
- [x] Commit and push to `origin/ui/cro-passover`

## 2026-03-07 — B4 retry 2: verification + commit-gate recovery

- [x] Re-verify requested B4 homepage changes are present in all 5 target components
- [x] Re-run `npm run build` and ensure pass
- [x] Update retry handoff docs (`docs/ralph-context.md`, `docs/CODER-CONTEXT.md`, `docs/implementation-plan.md`)
- [x] Commit and push retry pass to `origin/ui/cro-passover`

## 2026-03-06 — B4: homepage product stack + verticals + FAQ + final CTA

- [x] Update `src/components/ServicesBento.tsx` Cadence urgency copy and micro-proof
- [x] Add non-hero product badges (Review Funnel, Website Creation, SEO & Content, Custom Apps)
- [x] Render non-hero badge pill next to eyebrow in ServicesBento cards
- [x] Replace `WhoItsFor` audience section with 6-card industry verticals grid + bottom CTA
- [x] Rewrite FAQ array to 7 buying-friction questions/answers (no accordion structural changes)
- [x] Strengthen final CTA section copy and replace primary button with tel `<a>`
- [x] Convert testimonials carousel to static 3-card grid and remove duplicated testimonial list
- [x] Update docs (`docs/UI-VERIFICATION.md`, `docs/ralph-context.md`, `docs/CODER-CONTEXT.md`, `docs/implementation-plan.md`)
- [x] Run `npm run build` and ensure pass
- [x] Commit and push to `origin/ui/cro-passover`

## 2026-03-06 — B3 retry: commit-gate recovery + verification

- [x] Verify B3 UI files are present and match requested structure/content
- [x] Verify homepage section order includes `ProofBar` and `OfferLadder`
- [x] Update handoff docs (`docs/ralph-context.md`, `docs/CODER-CONTEXT.md`, `docs/implementation-plan.md`)
- [x] Run `npm run build` and ensure pass
- [x] Commit and push retry pass to `origin/ui/cro-passover`

## 2026-03-06 — B3: Homepage trust/proof + offer ladder + how it works

- [x] Rewrite `src/components/SocialProofBar.tsx` stats and keep 5-star card
- [x] Add trust-logo placeholder row and TODO note in `SocialProofBar`
- [x] Create `src/components/ProofBar.tsx` with 3 proof stat callouts + sources
- [x] Create `src/components/OfferLadder.tsx` with 4 offer tiers and featured Grow card badge/highlight
- [x] Rewrite `src/components/HowItWorks.tsx` step titles/descriptions to conversion-focused copy
- [x] Update How It Works bottom CTA to `See Pricing` linking to `#offer-ladder`
- [x] Update `src/app/HomePageClient.tsx` imports and section order to include `ProofBar` + `OfferLadder`
- [x] Update docs (`docs/UI-VERIFICATION.md`, `docs/ralph-context.md`, `docs/CODER-CONTEXT.md`, `docs/implementation-plan.md`)
- [x] Run `npm run build` and ensure pass
- [x] Commit and push to `origin/ui/cro-passover`

## 2026-03-06 — B2: Homepage hero + CTA overhaul

- [x] Rewrite `src/components/Hero.tsx` eyebrow, headline, and subhead copy
- [x] Replace primary CTA with `Call Cadence Live` tel link (`tel:+14806313993`) and phone icon
- [x] Replace secondary CTA with `Book a 15-Minute Demo` linking to `/contact`
- [x] Add trust micro-strip under hero CTAs (`7-day free trial • No contracts • Setup in 5 minutes`)
- [x] Remove old Cadence prompt paragraph and replace with supporting note under trust strip
- [x] Keep existing `buttonHover`, Framer reveal motion, `BrandLogo`, and reduced-motion handling unchanged
- [x] Update docs (`docs/UI-VERIFICATION.md`, `docs/ralph-context.md`, `docs/CODER-CONTEXT.md`, `docs/implementation-plan.md`)
- [x] Run `npm run build` and ensure pass
- [x] Commit and push to `origin/ui/cro-passover`

## 2026-03-06 — B1: CRO passover branch + design tokens

- [x] Checkout `master` and ensure branch base is current
- [x] Create/switch to branch `ui/cro-passover`
- [x] Add section spacing CSS custom properties to `src/app/globals.css`
- [x] Add shared card/button/typography utility classes to `src/app/globals.css`
- [x] Create `src/lib/design-tokens.ts` with `SECTION_PY`, `CARD_BASE`, `CARD_ELEVATED`, `COLORS`
- [x] Create/update `docs/ralph-context.md` with B1 handoff notes and gotchas
- [x] Run `npm run build` and ensure pass
- [x] Commit and push to `origin/ui/cro-passover`

## 2026-03-06 — Platform final integration wiring + docs

- [x] Keep public `Navigation` free of portal/admin entry links
- [x] Add subtle `Client Portal` link in `Footer` to `/portal/login`
- [x] Create `docs/platform-setup.md` with env, migration, and flow notes
- [x] Verify platform/review-funnel imports (no circular cross-module dependency introduced)
- [x] Update docs (`docs/UI-VERIFICATION.md`, `docs/ENV-VARS.md`, `docs/ralph-context.md`, `docs/CODER-CONTEXT.md`, `docs/implementation-plan.md`)
- [x] Run `npm run build` and ensure pass
- [ ] Commit and push to `origin/master`

## 2026-03-06 — Platform client portal UI (/portal)

- [x] Create `src/app/portal/login/page.tsx` server shell for login route
- [x] Build `src/app/portal/login/PortalLoginClient.tsx` with magic-link email form, success message, and error handling
- [x] Create `src/app/portal/page.tsx` server shell for portal dashboard route
- [x] Build `src/app/portal/PortalDashboardClient.tsx` with auth gate, service cards, and billing portal action
- [x] Create `src/app/portal/cadence/page.tsx` server shell for Cadence settings route
- [x] Build `src/app/portal/cadence/PortalCadenceClient.tsx` with settings editor, save flow, success toast, and recent call table with load-more
- [x] Create `src/app/portal/review-funnel/page.tsx` handoff route with dashboard link card
- [x] Create `src/app/portal/billing/page.tsx` server shell for billing redirect route
- [x] Build `src/app/portal/billing/PortalBillingClient.tsx` with auto-redirect on mount and no-account message
- [x] Update docs (`docs/UI-VERIFICATION.md`, `docs/ralph-context.md`, `docs/CODER-CONTEXT.md`, `docs/implementation-plan.md`)
- [x] Run `npm run build` and ensure pass
- [x] Commit and push to `origin/master`

## 2026-03-06 — Platform operator dashboard UI (/admin/clients)

- [x] Create `src/app/admin/clients/page.tsx` server route shell for the operator list UI
- [x] Build `src/app/admin/clients/AdminClientsClient.tsx` with admin login gate, searchable client list, and create-client modal
- [x] Create `src/app/admin/clients/[id]/page.tsx` server route shell for client detail
- [x] Build `src/app/admin/clients/[id]/AdminClientDetailClient.tsx` with back nav, inline client edits, service controls, add-service form, and usage panels
- [x] Extend `GET /api/admin/clients/[id]` response to include `usage.recentCalls` passthrough for Cadence usage table rendering
- [x] Update UI verification docs for new operator routes
- [x] Run `npm run build` and ensure pass
- [x] Update docs (`docs/ralph-context.md`, `docs/CODER-CONTEXT.md`, `docs/implementation-plan.md`)
- [x] Commit and push to `origin/master`

## 2026-03-06 — Platform client portal API routes

- [x] Create `POST /api/portal/auth/login` for magic-link requests with email-enumeration-safe success response
- [x] Create `GET /api/portal/auth/verify` to consume portal magic link, set `a8_portal_session`, and redirect to `/portal`
- [x] Create `GET /api/portal/me` to return authenticated client profile + service rows
- [x] Create `GET/PATCH /api/portal/cadence/settings` with active Cadence service gate and Cadence settings passthrough
- [x] Create `GET /api/portal/cadence/calls` with `limit`/`offset` support and Cadence service gate
- [x] Create `POST /api/portal/billing/portal` using Stripe billing portal session and fixed return URL
- [x] Ensure all portal routes except login/verify require `requirePortalAuth`
- [x] Run `npm run build` and ensure pass
- [x] Update docs (`docs/ralph-context.md`, `docs/CODER-CONTEXT.md`, `docs/implementation-plan.md`)
- [x] Commit and push to `origin/master`

## 2026-03-06 — Platform operator admin API routes + provisioning/email services

- [x] Create `src/lib/platform/services/email.ts` with Gmail SMTP resolution parity and portal/welcome email senders
- [x] Create `src/lib/platform/services/provisioning.ts` with provision/pause/cancel/resume service lifecycle helpers
- [x] Create `POST /api/admin/auth` route for shared-secret login and `a8_admin_session` cookie issuance
- [x] Create `GET/POST /api/admin/clients` routes for admin-authenticated list/create operations
- [x] Create `GET/PATCH /api/admin/clients/[id]` routes for admin-authenticated detail/update operations including Cadence/RF usage hydration
- [x] Create `POST/DELETE/PATCH /api/admin/clients/[id]/services` routes for service provisioning state changes + welcome email send
- [x] Ensure every admin route checks `requireAdminAuth` before route logic (except admin login route)
- [x] Run `npm run build` and ensure pass
- [x] Update docs (`docs/ralph-context.md`, `docs/CODER-CONTEXT.md`, `docs/implementation-plan.md`)
- [x] Commit and push to `origin/master`

## 2026-03-06 — Platform portal auth services + admin/portal middleware

- [x] Create `src/lib/platform/services/auth.ts` with magic-link hashing/generation/verification and JWT portal sessions
- [x] Use `require("jsonwebtoken")` pattern for JWT signing/verifying in platform auth
- [x] Create `src/lib/platform/services/cadence-api.ts` with `X-Portal-Secret` authenticated requests and typed interfaces
- [x] Add cadence API helpers: `getCadenceTenantConfig`, `updateCadenceTenantConfig`, `getCadenceRecentCalls`
- [x] Create `src/lib/platform/admin-middleware.ts` with timing-safe admin-secret check, 8h admin session JWT, and auth gate
- [x] Export `A8_ADMIN_SESSION_COOKIE_NAME = "a8_admin_session"`
- [x] Create `src/lib/platform/portal-middleware.ts` with Bearer/cookie portal auth gate
- [x] Export `A8_PORTAL_SESSION_COOKIE_NAME = "a8_portal_session"`
- [x] Run `npm run build` and ensure pass
- [x] Update docs (`docs/ralph-context.md`, `docs/CODER-CONTEXT.md`, `docs/implementation-plan.md`)
- [x] Commit and push to `origin/master`

## 2026-03-06 — Platform DB spec alignment + finalize commit

- [x] Validate existing platform DB foundation files against requested spec
- [x] Align `a8_clients` unique index to direct `email` uniqueness
- [x] Keep required partial indexes and inferred `A8*` types
- [x] Keep platform DB client merged with `reviewFunnelSchema`
- [x] Keep platform env zod config + build placeholders
- [x] Align `.env.example` platform section with requested keys
- [x] Align SQL migration with schema index updates
- [x] Run `npm run build` and ensure pass
- [x] Append docs (`docs/ralph-context.md`, `docs/CODER-CONTEXT.md`, `docs/implementation-plan.md`)
- [x] Commit and push to `origin/master`

## 2026-03-06 — Platform DB foundation (a8_ tables + config + client)

- [x] Create `src/lib/platform/db/schema.ts` with `a8_clients`, `a8_client_services`, and `a8_magic_links`
- [x] Add required indexes (including partial indexes + lower(email) uniqueness)
- [x] Export `platformSchema` and inferred `A8*` select/insert types
- [x] Create `src/lib/platform/db/client.ts` with Neon + Drizzle singleton
- [x] Merge `platformSchema` + `reviewFunnelSchema` in platform DB client
- [x] Create `src/lib/platform/config.ts` with zod env parsing + build placeholders
- [x] Update `drizzle.config.ts` tables filter to include `a8_*`
- [x] Append Platform env section to `.env.example`
- [x] Add fallback SQL migration `docs/migrations/2026-03-07-platform-tables.sql`
- [x] Run `npm run build` and ensure pass
- [x] Update docs (`docs/ralph-context.md`, `docs/CODER-CONTEXT.md`, `docs/implementation-plan.md`)
- [x] Commit and push to `origin/master`

## Batch 8 — Consent logging + health endpoint + env docs

- [x] Add `rf_consent_log` table to `src/lib/review-funnel/db/schema.ts`
- [x] Export consent log table in `reviewFunnelSchema` and add consent types
- [x] Log `sms_sent` consent in `sendReviewRequest()` after successful Twilio send + usage increment
- [x] Log `opt_out` consent in Twilio inbound webhook after `handleOptOut(from)`
- [x] Add `GET /api/review-funnel/health` endpoint with DB ping + env checks
- [x] Expand `.env.example` with comprehensive Review Funnel env var docs/comments
- [x] Attempt `npx drizzle-kit push` (documented failure due missing `DATABASE_URL`)
- [x] Add SQL fallback migration for `rf_consent_log`
- [x] Run `npm run build` and ensure pass
- [x] Update docs (`docs/ralph-context.md`, `docs/CODER-CONTEXT.md`, `docs/implementation-plan.md`)
- [x] Commit and push to `origin/master`

## Batch 7 retry 3 — PowerShell build gate recovery

- [x] Re-verify Batch 7 implementation files and behavior
- [x] Re-run `npx drizzle-kit push` using PowerShell-safe command chaining
- [x] Confirm migration failure mode remains `DATABASE_URL` missing (`url: ''`)
- [x] Re-run `npm run build` using `Set-Location ...; npm run build`
- [x] Update docs (`docs/ralph-context.md`, `docs/CODER-CONTEXT.md`, `docs/implementation-plan.md`)
- [x] Commit and push retry pass to `origin/master`

## Batch 7 retry 2 — Verification + commit gate recovery

- [x] Re-verify Batch 7 implementation files and behavior
- [x] Re-run `npx drizzle-kit push` (confirm failure mode without `DATABASE_URL`)
- [x] Re-run `npm run build`
- [x] Update docs (`docs/ralph-context.md`, `docs/CODER-CONTEXT.md`, `docs/implementation-plan.md`)
- [x] Commit and push retry pass to `origin/master`

## Batch 7 — Logo upload + Yelp platform

- [x] Add `POST /api/review-funnel/settings/logo` multipart upload endpoint with auth + validation + file save + tenant update
- [x] Add `yelp_review_url` and `review_platform` to `rf_tenants` schema
- [x] Update profile settings API GET/PATCH for Yelp fields and review platform validation
- [x] Update dashboard settings profile UI with logo upload + review platform selector + conditional Yelp URL input
- [x] Update public funnel API payload with Yelp fields
- [x] Update funnel five-star CTA rendering logic for google/yelp/both
- [x] Attempt DB migration via `npx drizzle-kit push`
- [x] Add SQL fallback migration file for manual ALTERs
- [x] Update docs (`UI-VERIFICATION.md`, `ralph-context.md`, `CODER-CONTEXT.md`)
- [x] Run `npm run build` and ensure pass
- [x] Commit and push to `origin/master`

## Batch 6 — Process SMS cron finalization

- [x] Verify `process-sms` cron route is fully implemented and auth-protected
- [x] Ensure quiet-hours reschedule explicitly preserves `status: queued`
- [x] Verify HELP keyword handling remains before STOP/opt-out in Twilio inbound webhook
- [x] Update docs (`docs/ralph-context.md`, `docs/CODER-CONTEXT.md`)
- [x] Run `npm run build` and ensure pass
- [x] Commit and push to `origin/master`

## Batch 5 — Process SMS cron + Twilio HELP handling

- [x] Replace `GET /api/review-funnel/cron/process-sms` stub with queue processor logic
- [x] Add cron auth guard using `CRON_SECRET` (`Authorization: Bearer` and `x-cron-secret`)
- [x] Query due queued `rf_pending_sms` rows (`status=queued`, `send_after <= now`, `attempts < 3`, ASC, limit 50)
- [x] Call `sendReviewRequest(reviewRequestId)` for each queued row and persist outcomes
- [x] Handle send outcomes: sent, quiet hours reschedule, skipped (opted out/no phone), limit reached
- [x] Handle errors by incrementing attempts, storing `last_error`, and failing at 3 attempts
- [x] Return summary JSON `{ processed, sent, skipped, failed, rescheduled }`
- [x] Add HELP keyword handling (`help`, `info`) to Twilio inbound webhook before STOP handling
- [x] Update docs (`docs/ralph-context.md`, `docs/CODER-CONTEXT.md`)
- [x] Run `npm run build` and ensure pass
- [x] Commit and push to `origin/master`

## Batch 1 — Production hardening pass

- [x] Route canonical strategy updates:
  - keep `/services/websites` as canonical website service page
  - make `/services/website-creation` a permanent redirect to `/services/websites`
- [x] Indexing guardrails:
  - mark `/get-started/success` and `/onboarding/success` as `noindex, nofollow`
  - mark internal Cadence onboarding/status routes as `noindex, nofollow`
- [x] Sitemap hygiene:
  - remove non-SEO/internal funnel routes from `src/app/sitemap.ts`
  - sync fallback `public/sitemap.xml` to valid, indexable routes only
- [x] Robots cleanup:
  - use clean `Host` directive format (`autom8everything.com`)
  - keep sitemap reference on both dynamic and static robots outputs
- [x] Legal/compliance hardening:
  - expand `/privacy`, `/terms`, `/security` with plain-English production copy
  - include text message consent + STOP/HELP + frequency/rates language where applicable
- [x] Analytics sanity:
  - add shared browser analytics helper
  - add hooks for contact form submit, call-click tracking, and get-started completion
- [x] Validation:
  - run `npm run build`
  - smoke-check impacted routes locally (`200/308`, canonical, robots, sitemap, noindex)

## Batch 4 retry 2 — Deploy gate recovery

- [x] Confirm latest `master` SHA and verify production deploy was still on older commit
- [x] Re-run `npm run build`
- [x] Push a minimal safe non-feature commit to trigger fresh production deploy
- [x] Verify latest production deployment is `READY` for newest `master` commit

## Batch 4 — Review Funnel admin panel (tenant review + stats)

- [x] Generate a new `RF_ADMIN_SECRET` and save it to `C:\Users\austen\.openclaw\credentials\rf-admin-secret.txt`
- [x] Set `RF_ADMIN_SECRET` in Vercel for production/preview/development
- [x] Add `/review-funnel/admin/layout.tsx` auth guard for `rf_admin_session`
- [x] Update `/review-funnel/admin/login` to use `Admin Password` + `Sign In` copy and inline `Incorrect password` handling
- [x] Update `POST /api/review-funnel/admin/auth` to validate password against `process.env.RF_ADMIN_SECRET`
- [x] Rebuild `/review-funnel/admin` as a server component with required columns + needs-attention badges
- [x] Implement Stripe subscription status lookup with 5-minute cache for admin table status/badges
- [x] Enforce table sort order: needs-attention severity first, then joined date descending
- [x] Rebuild `/review-funnel/admin/stats` as a server component with Starter/Growth/Total MRR + monthly totals
- [x] Update docs (`ENV-VARS.md`, `UI-VERIFICATION.md`, `ralph-context.md`, `CODER-CONTEXT.md`)
- [x] Run `npm run build` and ensure pass
- [x] Commit and push to `origin/master`

## Batch 3 — Pricing UI + calendar limit enforcement

- [x] Update `/services/review-funnel` pricing cards to Starter/Growth/Pro requirements
- [x] Set Starter/Growth CTA to `Get Started` (`/review-funnel/signup`)
- [x] Set Pro CTA to `Contact Us` (`mailto:aust@autom8everything.com`)
- [x] Update `/review-funnel/signup` Step 4 cards to match tier pricing and limits
- [x] Keep Starter/Growth on checkout and Pro as contact-only
- [x] Enforce `calendar_limit` before creating new calendar watch connections
- [x] Return friendly limit error message from calendar auth-url endpoint
- [x] Show calendar limit error inline on settings calendar card
- [x] Update docs (`UI-VERIFICATION.md`, `ralph-context.md`, `CODER-CONTEXT.md`)
- [x] Run `npm run build` and ensure pass
- [x] Commit and push to origin/master

## Batch 2 retry — Deploy gate recovery

- [x] Confirm latest `master` SHA and rerun `npm run build`
- [x] Trigger fresh production deployment for latest commit (minimal no-op push)
- [x] Verify Vercel latest production deployment is `READY`

## Batch 1 — Routing Bug Fix + DB Migration + Docs

- [x] Audit routing behavior for:
  - /review-funnel/login
  - /review-funnel/dashboard
  - /services/review-funnel
- [x] Fix redirect/auth coupling so unauthenticated dashboard users go to /review-funnel/login
- [x] Confirm login route renders login UI only (no redirect)
- [x] Confirm services page remains public marketing page (no redirect)
- [x] Pull DATABASE_URL from Vercel and run `npx drizzle-kit push`
- [x] Remove temporary .env.local
- [x] Confirm `rf_` tables exist in database
- [x] Create docs/ENV-VARS.md
- [x] Create docs/UI-VERIFICATION.md
- [x] Append docs/ralph-context.md with batch summary
- [x] Run `npm run build` and ensure pass
- [x] Commit and push to origin/master

## Batch 2 — Calendar-Based Pricing + Stripe Products + Schema Update

- [x] Add `calendar_limit` column to `rf_tenants` schema
- [x] Pull `DATABASE_URL` from Vercel and run `npx drizzle-kit push`
- [x] Remove temporary `.env.local`
- [x] Verify `rf_tenants.calendar_limit` exists in database
- [x] Create new Stripe Starter ($79) and Growth ($149) products + monthly prices
- [x] Update Vercel env vars `RF_STRIPE_PRICE_STARTER` and `RF_STRIPE_PRICE_GROWTH`
- [x] Delete Vercel env var `RF_STRIPE_PRICE_PRO`
- [x] Update Review Funnel plan/pricing constants in code
- [x] Update `/review-funnel/signup` Step 4 plan cards + CTAs
- [x] Update `/services/review-funnel` pricing section copy and limits
- [x] Enforce calendar limit in calendar watch creation flow
- [x] Update docs (`ENV-VARS.md`, `UI-VERIFICATION.md`, `CODER-CONTEXT.md`, `ralph-context.md`)
- [x] Run `npm run build` and ensure pass
- [x] Commit and push to origin/master

## Batch 3 retry 2 - Deploy gate recovery

- [x] Confirm latest `master` SHA on local and origin
- [x] Trigger fresh production deployment for latest `master` via minimal safe push
- [x] Verify latest Vercel production deployment is `READY` and commit SHA matches `master`
- [x] Re-run `npm run build`

