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
14. /admin/clients — platform client management list, auth gate, add-client modal
15. /admin/clients/[id] — platform client detail, edit mode, service controls, usage cards
16. /portal/login — client portal email login page
17. /portal — client portal dashboard with service cards + billing action
18. /portal/cadence — client Cadence settings + recent calls
19. /portal/billing — billing redirect/loading state
20. /portal/review-funnel — review funnel dashboard handoff card

## Smoke tests (no auth required)
- GET /review-funnel/login → must render login form, NOT redirect
- GET /review-funnel/signup → must render Step 1 of 4 wizard
- GET /services/review-funnel → must render pricing/marketing page, NOT redirect
- GET /api/review-funnel/funnel/nonexistent → must return 404, not 500

## Batch 15 checks (platform client portal UI)
- `/portal/login`
  - centered sign-in card renders with email field + `Send login link`
  - successful submit shows `Check your email for a login link.`
  - failed submit shows inline error text
- `/portal`
  - unauthenticated access redirects to `/portal/login`
  - authenticated view shows welcome header with contact + business name
  - Cadence card shows status badge and `Manage` button to `/portal/cadence`
  - Review Funnel card shows status badge and `Open Dashboard` button to `/review-funnel/dashboard` in a new tab
  - `Manage Billing` button opens billing portal (or shows inline error)
- `/portal/cadence`
  - unauthenticated access redirects to `/portal/login`
  - back link returns to `/portal`
  - form fields render: greeting, transfer number, booking URL, timezone, business hours rows
  - services list supports add/remove and editing name/description/price
  - questions list supports add/remove and editing question/answer
  - save action shows success toast (`Settings saved`) when update succeeds
  - recent calls table masks caller phone as `(***) ***-1234`
  - `Load more` appends more rows when available
- `/portal/billing`
  - shows loading state while billing portal request is in progress
  - redirects automatically when billing URL is returned
  - shows `No billing account linked. Contact support.` when no billing account exists
- `/portal/review-funnel`
  - route renders card with `Open Review Funnel Dashboard` link to `/review-funnel/dashboard`

## Batch 14 checks (platform operator dashboard)
- `/admin/clients`
  - unauthenticated users see password sign-in card
  - valid password opens `Client Management` list
  - search input filters by business/contact/email
  - each row shows business/contact/email/service badges/created date
  - clicking a row opens `/admin/clients/[id]`
  - `New Client` opens modal and successful submit refreshes list
- `/admin/clients/[id]`
  - back link returns to `/admin/clients`
  - header shows business/contact/email/phone details
  - `Edit Client` opens inline form and save persists updates
  - service cards show status plus call/text message month counters
  - pause/resume/cancel actions refresh service state
  - `Add Service` supports Cadence account ID input and Review Funnel email-match note
  - successful add shows confirmation: `Service added. Welcome email sent to [email].`
  - usage section shows Cadence call table when data exists and Review Funnel text-message count when active

## Batch 7 checks (logo upload + Yelp review platform)
- `/review-funnel/dashboard/settings` -> **Your Business** tab
  - Logo section shows current logo thumbnail when present
  - `Upload logo` / `Change logo` opens file picker for png/jpg/webp/svg
  - Selecting a file shows preview
  - Clicking `Save logo` uploads and shows success message
  - Uploaded logo renders on funnel page `/r/[requestId]`
  - `Review platform` dropdown options: Google, Yelp, Both
  - `Yelp review URL` input only appears when platform is Yelp or Both
- `/r/[requestId]` five-star step behavior
  - Google platform: shows only `Leave a Google review`
  - Yelp platform: shows only `Leave a Yelp review`
  - Both platform: shows both buttons side-by-side

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

## Batch 4 checks (review funnel admin panel)
- Breakpoints to verify for each route below: **375px** and **1280px**
- `/review-funnel/admin/login`
  - password form renders
  - wrong password shows inline `Incorrect password`
- `/review-funnel/admin`
  - tenant table renders with all columns:
    - Business name
    - Plan
    - Calendars connected
    - Text messages used this month / monthly limit
    - Status
    - Joined date
  - needs-attention badges render with colored dots when applicable
- `/review-funnel/admin/stats`
  - Starter MRR card renders
  - Growth MRR card renders
  - Total MRR card renders
  - Total text messages sent this month renders
  - New signups this month renders
- `/review-funnel/admin/tenants/[id]`
  - tenant detail page still loads and actions persist

## Batch 1 checks (production hardening)
- `/services/websites`
  - canonical tag points to `https://autom8everything.com/services/websites`
- `/services/website-creation`
  - returns permanent redirect (`308`) to `/services/websites`
- `/get-started/success`
  - page loads
  - includes `noindex, nofollow`
- `/onboarding/success`
  - page loads
  - includes `noindex, nofollow`
- `/privacy`, `/terms`, `/security`
  - render expanded plain-English legal text
  - include text message consent/opt-out language where applicable
- `/robots.txt`
  - contains `Host: autom8everything.com`
  - contains `Sitemap: https://autom8everything.com/sitemap.xml`
- `/sitemap.xml`
  - does **not** include internal funnel/success routes
  - includes `/services/websites`

## Known PENDING (not bugs)
- Google Calendar connect → OAuth flow (GOOGLE_CLIENT_ID not set yet)
- SMS sending → RF_TWILIO_PHONE_NUMBER not set yet
