# implementation-plan.md — Review Funnel Batches 1-3

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
