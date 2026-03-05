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

## Batch 2 checks (calendar pricing redesign)
- /review-funnel/signup (Step 4) shows:
  - Starter: `$79/mo`, `1 Google Calendar`, `150 review requests/mo`, CTA `Start with Starter`
  - Growth: `$149/mo`, `Up to 5 Google Calendars`, `600 review requests/mo`, badge `Most Popular`, CTA `Start with Growth`
  - Pro: `Let's talk`, unlimited limits, CTA `Contact Us` (opens `mailto:hello@autom8everything.com`)
- /services/review-funnel pricing cards use the same tier values and plain language (`1 location or staff calendar`)
- /pricing Review Funnel summary line shows `Growth $149/mo` and `Pro is a contact-us plan`
- If a tenant is at their calendar limit, Google Calendar connect should show: `Upgrade your plan to connect more calendars`

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
