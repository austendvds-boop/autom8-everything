# implementation-plan.md — Review Funnel batches

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

