# implementation-plan.md — Review Funnel batches

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

