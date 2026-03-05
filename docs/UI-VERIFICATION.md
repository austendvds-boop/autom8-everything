# UI-VERIFICATION.md — autom8everything.com Review Funnel

## Pages to verify after any Review Funnel change
1. /services/review-funnel — product/pricing page (desktop + mobile)
2. /review-funnel/signup — steps 1-4 wizard (desktop + mobile)
3. /review-funnel/signup/success — post-Stripe success page
4. /review-funnel/login — magic link login page
5. /review-funnel/dashboard — overview (auth required)
6. /review-funnel/dashboard/reviews — reviews list
7. /review-funnel/dashboard/feedback — feedback inbox
8. /review-funnel/dashboard/settings — all 4 tabs
9. /r/[requestId] — customer star rating funnel page
10. /review-funnel/admin/login — admin password login (single password field)
11. /review-funnel/admin — tenant table (search + sort + status chips)
12. /review-funnel/admin/tenants/[id] — tenant detail with actions
13. /review-funnel/admin/stats — admin KPI overview

## Smoke tests (no auth required)
- GET /review-funnel/login → must render login form, NOT redirect
- GET /review-funnel/signup → must render Step 1 of 4 wizard
- GET /services/review-funnel → must render pricing/marketing page, NOT redirect
- GET /api/review-funnel/funnel/nonexistent → must return 404, not 500

## Batch 3 checks (pricing + calendar limit)
- `/services/review-funnel`
  - Pricing cards show Starter `$79/month`, Growth `$149/month`, Pro `Let's talk`
  - Growth card shows `Most Popular`
  - Starter/Growth include connected calendar + text message limits
  - CTA buttons:
    - Starter: `Get Started` -> `/review-funnel/signup`
    - Growth: `Get Started` -> `/review-funnel/signup`
    - Pro: `Contact Us` -> `mailto:aust@autom8everything.com`
  - Verify copy has no technical jargon and reads clearly on mobile + desktop
- `/review-funnel/signup` Step 4
  - Plan cards match the same three tiers and limits from `/services/review-funnel`
  - Starter + Growth buttons start Stripe checkout
  - Pro button opens `Contact Us` email and does not start checkout
- Calendar connect limit handling (`/review-funnel/dashboard/settings`, Calendar tab)
  - When calendar count reaches the plan limit, Connect Calendar does not continue
  - Inline error is shown in the calendar card:
    - `You've reached your calendar limit for your current plan. Upgrade to connect more calendars.`

## Batch 3 checks (admin panel for Austen)
- `/review-funnel/admin/login`:
  - password-only form renders (no username/email field)
  - wrong password shows error
  - successful login redirects to `/review-funnel/admin`
- `/review-funnel/admin` tenant list:
  - columns show business, owner, email, plan, calendars connected, SMS used/limit, status, created at
  - search filters by business name or owner email
  - sorting works for created date, plan, and status
- `/review-funnel/admin/tenants/[id]` tenant detail:
  - tenant profile block renders
  - calendar connections table renders
  - SMS usage table shows last 3 months
  - recent review requests table shows up to 20 rows
  - Deactivate/Reactivate and plan update actions persist
- `/review-funnel/admin/stats`:
  - plan counts render
  - total SMS sent this month renders
  - MRR renders
  - new signups this month renders

## Known PENDING (not bugs)
- Google Calendar connect → OAuth flow (GOOGLE_CLIENT_ID not set yet)
- SMS sending → RF_TWILIO_PHONE_NUMBER not set yet
