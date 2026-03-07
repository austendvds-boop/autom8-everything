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
20. /portal/review-funnel — Review Funnel status page with usage, plan, and quick links
21. /portal/checkout — self-serve signup page for Cadence/Review Funnel
22. /portal/checkout/success — post-checkout setup confirmation page
23. site footer — subtle `Client Portal` link to `/portal/login`

## Smoke tests (no auth required)
- GET /review-funnel/login → must render login form, NOT redirect
- GET /review-funnel/signup → must render Step 1 of 4 wizard
- GET /services/review-funnel → must render pricing/marketing page, NOT redirect
- GET /api/review-funnel/funnel/nonexistent → must return 404, not 500

## Batch B6-0 checks (product CTAs + Cadence CRM v2 callout)
- `/services/cadence`
  - New section appears between `Everything Cadence Does For You` and later pricing sections:
    - badge: `Coming Soon` with emerald accent styling (`bg-emerald-400/10`, `text-emerald-300`, `border-emerald-400/30`)
    - heading: `Automatic Lead Capture`
    - 3 icon cards render in one column on mobile and 3 columns on `sm+`:
      - `Incoming Call`
      - `AI Summary`
      - `CRM Sync`
    - footer note: `CRM integration coming soon. Call logging and summaries available now in your dashboard.`
  - Primary online CTA links now point to portal checkout:
    - hero secondary CTA -> `/portal/checkout?product=cadence`
    - pricing secondary CTA -> `/portal/checkout?product=cadence`
    - final CTA secondary CTA -> `/portal/checkout?product=cadence`
  - trust line appears under CTA groups: `7-day free trial · No credit card required to start`
- `/services/review-funnel`
  - All primary `Get Started` links now route to `/portal/checkout?product=review_funnel`:
    - hero CTA
    - Starter/Growth plan card CTAs
    - final CTA
  - pricing copy/tiers remain unchanged
- `/pricing`
  - Cadence card CTA points to `/portal/checkout?product=cadence`
  - Review Funnel card CTA points to `/portal/checkout?product=review_funnel`
  - custom/contact CTAs remain unchanged
- Homepage/shared product CTA components
  - `src/components/ServicesBento.tsx` Review Funnel CTA points to `/portal/checkout?product=review_funnel`
  - `src/components/PricingOverview.tsx` Cadence CTA points to `/portal/checkout?product=cadence`

## Batch B5-0 checks (portal dashboard discovery + Review Funnel portal status)
- `/portal`
  - active Cadence card:
    - shows `Manage Settings` button linking to `/portal/cadence`
    - call line reads `X calls this month` when available
    - shows `Your Cadence number: ...` when settings include a phone number
  - active Review Funnel card:
    - button reads `Open Dashboard` and links to `/portal/review-funnel`
    - shows `Plan: ...` line when service metadata includes plan
  - More Products section only appears when one or both products are missing
    - card style uses muted treatment (`border-dashed border-white/15` + lower opacity)
    - Cadence discovery card copy and CTA:
      - title `Cadence — AI Receptionist`
      - price `$199/mo · 7-day free trial`
      - `Get Started` -> `/portal/checkout?product=cadence`
    - Review Funnel discovery card copy and CTA:
      - title `Review Funnel — Automated Reviews`
      - price `From $79/mo`
      - `Get Started` -> `/portal/checkout?product=review_funnel`
  - Account section at bottom:
    - shows customer name + email
    - `Manage Billing` posts to `/api/portal/billing/portal` and redirects
    - `Need help?` links to `/contact`
- `/portal/review-funnel`
  - page renders in portal dark theme with back link to `/portal`
  - status card shows:
    - plan line (`Plan: ...`)
    - active/inactive badge
    - usage summary line: `X / Y text messages sent this month`
    - progress bar with same style as `/portal/cadence` usage bars
    - connected calendar count
  - quick links section includes:
    - `Open Full Dashboard` -> `/review-funnel/dashboard` (prominent gradient button)
    - `Settings` -> `/review-funnel/dashboard/settings`
    - `View Reviews` -> `/review-funnel/dashboard/reviews`
    - `View Feedback` -> `/review-funnel/dashboard/feedback`
    - note text: `Your Review Funnel dashboard has detailed analytics, settings, and calendar management.`
- `/api/portal/review-funnel/status`
  - returns 401 without portal auth
  - returns 404 when the logged-in client has no active Review Funnel service
  - returns payload shape:
    - `plan` (string)
    - `smsUsed` (number)
    - `smsLimit` (number)
    - `calendarsConnected` (number)
    - `isActive` (boolean)

## Batch B4-0 checks (portal cadence enhancements)
- `/portal/cadence`
  - page starts with `Plan Usage` card above settings
  - usage card shows both progress bars:
    - `Calls: X / Y used this month`
    - `Minutes: X / Y used this month`
  - bar fill colors follow usage level:
    - under 60% = green
    - 60% to 80% = amber
    - over 80% = red
  - over-80% warning banner appears for calls and/or minutes with `Manage Billing` link to `/portal/billing`
  - if usage fetch fails, page still loads and shows muted `Usage data unavailable`
- Onboarding checklist (between usage and settings)
  - hidden when local storage key `cadence_onboarding_dismissed_{tenantId}` is set to `1`
  - when shown, displays `X of 6 complete`
  - step completion behavior:
    - `Account created` always complete
    - `Set your greeting` completes only when greeting is non-empty and custom
    - `Add your business hours` completes when at least one day is open
    - `Set your services & FAQs` completes when at least one service or FAQ exists
    - `Test your number` completes after successful test call (local storage key)
    - `Go live! Share your Cadence number` shows the current number value
  - incomplete linked steps scroll to their matching section on click
  - `Dismiss checklist` hides checklist and persists local storage flag
- Settings section
  - new field appears between Greeting and Business Hours:
    - label: `AI Personality & Instructions`
    - helper text describing behavior
    - textarea with at least 8 rows
    - character count line (`X characters`)
    - warning note: `Changes take effect on the next incoming call.`
  - prompt edits save through the existing `Save changes` action (no separate save button)
- Test mode section (after FAQs, before Recent Calls)
  - heading: `Test Your AI Receptionist`
  - phone field pre-fills from known account phone when available
  - `Call Me` flow:
    - click -> button shows `Calling...` and disables
    - success -> button shows `Call initiated! Pick up your phone.`
    - resets to idle state after ~30 seconds
  - inline error appears when call request fails
  - note appears: `You can test up to 3 times per hour.`
- Recent Calls table
  - clicking a row toggles expand/collapse
  - each row shows a chevron icon (`▸` closed / `▾` open)
  - expanded state shows all summary lines as bullet list below the row

## Batch B3-0 checks (portal checkout + post-purchase setup)
- `/portal/checkout`
  - dark theme background `#0A0A0F` with card surface `#12121A`
  - shows two product cards:
    - Cadence (`$199/month`, mentions `7-day free trial`)
    - Review Funnel (`Starter $79/month • Growth $149/month`)
  - supports query preselect: `/portal/checkout?product=review_funnel` selects Review Funnel card on first paint
  - form fields render: Business name, Email, Phone (optional)
  - Cadence selection shows area-code dropdown defaulted to `480`
  - Review Funnel selection hides area code and shows Starter/Growth plan choices
  - submit button shows loading copy `Redirecting to secure checkout...` during checkout request
  - server-side validation errors render in the red inline error box and can be dismissed with `Try again`
- `/portal/checkout/success`
  - initially shows spinner + `Setting up your account...`
  - after ~3 seconds, spinner fades and success state appears
  - success message includes: `Your account is being set up. Check your email for a login link.`
  - when `email` query param is present, it is displayed in the success card
  - link `Already have a login link? Go to Portal →` points to `/portal/login`

## Batch B8 checks (Custom Apps + Footer + Sticky Mobile CTA)
- `/services/custom-apps` section order is:
  1) Hero (new selectivity framing)
  2) How It Works
  3) The ROI of a Custom Tool
  4) Examples We Can Build
  5) Pricing
  6) FAQ
  7) Final CTA
- `/services/custom-apps` hero copy
  - headline: `When Off-the-Shelf Tools Don't Fit, We Build What Does.`
  - subhead starts with: `Custom apps designed around your actual workflow...`
  - italic selectivity note is visible under subhead
- `/services/custom-apps` ROI section
  - renders 3 icon cards: `Time Saved`, `Errors Eliminated`, `Competitive Edge`
- `/services/custom-apps` examples section
  - cards render concrete examples for Lead Scrapers, Internal Dashboards, Custom Booking Flows, Workflow Automations
- `/services/custom-apps` pricing section
  - includes range text: `Most custom builds range from $2,000 to $15,000 depending on scope.`
  - includes `What affects pricing:` list with 4 bullets
- Footer
  - phone number `(480) 631-3993` is shown directly under logo and links to `tel:+14806313993`
  - right side has 3 columns: `Products`, `Start Here`, `Company`
  - `Start Here` includes: Try Cadence Free, Get a Growth Audit, See Pricing, Book a Demo
- Sticky mobile CTA (`md` and below)
  - appears only after scrolling past hero (~80vh)
  - shows two actions: `Call Now` (`tel:+14806313993`) and `Book Demo` (`/contact`)
- StickyMobileCTA appears on:
  - `/` (homepage)
  - `/services/cadence`
  - `/services/review-funnel`
  - `/services/websites`
  - `/services/seo-content`
  - `/services/custom-apps`
- Main-content spacing check
  - each route above includes bottom padding on mobile (`pb-20 md:pb-0`) so sticky CTA does not cover bottom content

## Batch B7 checks (Websites + SEO page overhauls)
- `/services/websites` section order is:
  1) Hero
  2) Why Your Website Matters
  3) How It Works
  4) Mid-page CTA
  5) Pricing Tiers
  6) Built for Real Businesses
  7) FAQ
  8) Final CTA
- `/services/websites` hero copy
  - headline: `A Website That Gets Picked, Trusted, and Contacted.`
  - subhead starts with: `Most local business websites exist but don't convert...`
- `/services/websites` pricing cards
  - each tier shows `Best for:` line above description
  - `Scale` card shows `Recommended` badge
  - Launch/Scale/Custom pricing still reads `$1,500`, `$3,500`, `Let's Talk`
- `/services/websites` includes proof placeholder section
  - cards: `Home Services`, `Medical Practice`, `Professional Services`
  - each card shows `Website Preview` placeholder block
- `/services/websites` includes mid-page CTA text `Ready to upgrade? Let's pick your tier.`
- `/services/websites` final CTA
  - headline: `Your Website Should Work as Hard as You Do.`
  - two actions render: phone call button + form button
- `/services/seo-content` section order is:
  1) Hero
  2) How It Works
  3) What to Expect and When
  4) What We Deliver Every Month
  5) Comparison table (`SEO Is Not a Project. It's a Growth Engine.`)
  6) SEO Works Best as Part of Your Growth Stack
  7) Pricing
  8) FAQ
  9) Final CTA
- `/services/seo-content` hero copy
  - headline: `Get Found on Google. Get Called. Get Booked.`
  - subhead starts with: `Monthly local SEO and content that builds compounding visibility...`
- `/services/seo-content` monthly deliverables
  - renders 5 single-column icon rows (blog posts, service pages, Google profile, citations, monthly report)
- `/services/seo-content` comparison section
  - uses shared `ComparisonTable` with two columns: `One-Time SEO Audit`, `Monthly SEO Retainer`
  - monthly column is highlighted
- `/services/seo-content` pairing section
  - 3 cards render: `SEO + Website`, `SEO + Reviews`, `SEO + Cadence`
  - CTA button: `Build Your Full Growth Stack`
- `/services/seo-content` pricing card includes `What affects pricing:` list with 4 bullets

## Batch B6 retry 4 checks (compounding-loop fragment alignment)
- `/services/review-funnel`
  - `Why Reviews Compound` chip loop still renders as: More reviews → Higher ranking → More clicks → More customers → More reviews
  - chips and arrows remain centered and wrap cleanly on narrow screens
  - no spacing/layout regression after keyed fragment rendering update

## Batch B6 checks (Review Funnel page overhaul)
- `/services/review-funnel` section order is:
  1) Hero
  2) Why Reviews Compound
  3) Pricing
  4) Comparison table
  5) How it works
  6) Testimonials
  7) Common Concerns
  8) Even Better Together bundle
  9) FAQ
  10) Final CTA
- Hero copy
  - headline: `Your Reputation Compounds. Every Review Brings the Next Customer.`
  - subhead: `Every 5-star review makes the next customer more likely to call...`
  - CTAs remain `Get Started` and `See Pricing`
- `Why Reviews Compound` section
  - renders 3 stat cards (93%, 266%, 5-9%) with source lines
  - renders compounding chip flow: More reviews → Higher ranking → More clicks → More customers → More reviews
- `How it works` section
  - each step card has icon in tinted square:
    - Step 1 `Connect Calendar` uses calendar icon
    - Step 2 `Automatic Text` uses message icon
    - Step 3 `Reviews Roll In` uses star icon
  - desktop shows connector arrows between cards
- `Testimonials`
  - array has TODO note for replacing with real client names/businesses
  - current title attributions remain descriptor-based (`Home Services Team`, `Med Spa Owner`, `Dental Office Manager`)
- `Common Concerns` section
  - renders exactly 3 concern cards with concern heading + answer text
- `Even Better Together: Cadence + Review Funnel` section
  - two side-by-side cards with icons (phone + review follow-up)
  - combined pricing line reads `$278/mo combined`
  - supporting line reads `Cadence $199/mo + Review Funnel Starter $79/mo`
  - CTA button `Start with Both` links to `/contact`

## Batch B5 checks (Cadence page full overhaul)
- `/services/cadence`
  - **Section order (top to bottom):** hero → pain math → demo → features → use cases → comparison → pricing → FAQ → final CTA
  - **Hero:**
    - eyebrow: `AI Voice Receptionist`
    - headline: `Every Missed Call Is Money Walking Out the Door.`
    - primary CTA: `Call Cadence Live — (480) 631-3993` → `tel:+14806313993`
    - secondary CTA: `Start Your 7-Day Free Trial` → `/get-started`
    - trust line: `$199/mo after trial • Month-to-month • Cancel anytime`
  - **Pain math:**
    - 3 stat cards: `80%`, `$1,000+`, `62%` with source attribution
    - prompt line at bottom: `Stop losing money. Let Cadence answer.`
  - **Demo (`CadenceDemoPlaceholder`):**
    - 3-column grid renders: audio placeholder card, call flow steps card, call summary preview card
    - audio card shows "Audio sample coming soon" placeholder box
    - call flow lists 5 numbered steps
    - summary preview card shows mock caller/action/follow-up entries
    - bottom CTA: `Call (480) 631-3993` → `tel:+14806313993`
  - **Features:** 6 cards in 3-col desktop / 1-col mobile grid
  - **Use cases:** 4 scenario cards in 2-col grid with purple title treatment
  - **Comparison (`ComparisonTable`):**
    - Desktop: renders as `<table>` with 4 columns (Feature, Voicemail, Hiring a Receptionist, Cadence)
    - Cadence column header is purple (`#C4B5FD`) and cells have subtle tint
    - Mobile: stacked cards per row with column labels on left, values on right
    - 7 rows: Availability, Monthly cost, Setup time, Handles FAQs, Routes calls, Call summaries, Brand consistency
  - **Pricing:**
    - price: `$199/month`
    - value line: `Less than $7/day. Less than a single missed lead.`
    - 5-item checklist with green checkmarks
    - 2 CTAs: tel link + `/get-started`
  - **FAQ:** 8 questions render (no accordion — static card layout)
  - **Final CTA:** headline `Ready to Stop Losing Calls?`, 2 buttons, trust line: `7-day free trial • No credit card • Live in 5 minutes`
  - Navigation and Footer render on all viewport sizes

## Batch B4 checks (homepage product stack + verticals + FAQ + final CTA)
- `/` Services section (`ServicesBento`)
  - Cadence hero value prop reads: `Every missed call is a customer your competitor answers instead...` and includes `24/7`
  - Cadence hero micro-proof reads: `Live in 5 minutes. Try it right now.`
  - Non-hero badge pills render beside eyebrow labels:
    - Review Funnel: `Pairs with Cadence`
    - Website Creation: `Foundation`
    - SEO & Content: `Ongoing Growth`
    - Custom Apps: `Advanced`
- `/` verticals section (`WhoItsFor`)
  - heading reads `Built for Local Businesses That Rely on Calls and Reviews`
  - subtitle reads `Whether you run a crew...`
  - 6 cards render in one column on mobile and 3 columns on desktop:
    - HVAC & Plumbing
    - Roofing & Landscaping
    - Dental & Medical
    - Med Spa & Wellness
    - Legal & Professional
    - General Contractors
  - General Contractors card icon uses a hard-hat glyph
  - each card has icon in rounded purple-tint square + title + gray description text
  - bottom CTA renders: `See How It Works for Your Industry` -> `/contact`
- `/` FAQ section (`FAQ`)
  - exactly 7 buying-friction questions render in accordion
  - includes pricing, website migration, Cadence-vs-answering-service, tech comfort, single-product start, contract, and satisfaction/trial questions
- `/` final CTA section (`CTA`)
  - headline reads: `Your Competitors Are Already Answering Their Calls.`
  - subhead reads: `Start with Cadence today...`
  - primary CTA is phone link `<a href="tel:+14806313993">Call Cadence Live — (480) 631-3993</a>`
  - secondary CTA reads `Book a 15-Minute Demo` -> `/contact`
  - trust line reads: `7-day free trial • No credit card for trial • Cancel anytime`
- `/` testimonials section (`Testimonials`)
  - subtitle reads: `What business owners say about working with Autom8.`
  - renders static grid (`1/2/3` columns by breakpoint), no horizontal auto-scroll animation
  - exactly 3 testimonial cards with role/company attribution style (no fake full names)
  - initials badges render (e.g. `HS`)

## Batch B3 checks (homepage trust/proof + offer ladder + how it works)
- `/` homepage section order
  - Navigation
  - Hero
  - Trust bar (`SocialProofBar`)
  - Proof bar (`ProofBar`)
  - Services
  - Offer ladder
  - Who it's for
  - How it works
  - Testimonials
  - FAQ
  - CTA
  - Footer
- Trust bar (`SocialProofBar`)
  - three stat cards read:
    - `Local Businesses` / `Active Clients`
    - `24/7` / `Call Coverage`
    - `5 min` / `Average Setup Time`
  - existing five-star card still renders
  - trust logos row renders text labels:
    - `Google Business`, `Stripe`, `Twilio`, `Google Calendar`
- Proof bar (`ProofBar`)
  - shows 3 stat blocks with sources:
    - `80%` / `of callers won't leave a voicemail` / `Ruby Receptionist`
    - `$1,000+` / `average value of a missed service call` / `Industry average`
    - `93%` / `of consumers read reviews before choosing` / `BrightLocal 2024`
- Offer ladder (`OfferLadder`)
  - heading reads `One Platform. Pick Your Starting Point.`
  - subheading reads `Start with what you need today. Add more when you're ready.`
  - four tiers render: Start, Grow, Expand, Custom
  - Grow card has `Most Popular` badge and highlighted border treatment
  - CTA buttons:
    - Start -> `Try Cadence Free` (`tel:+14806313993`)
    - Grow -> `Get Started` (`/contact`)
    - Expand -> `Get a Quote` (`/contact`)
    - Custom -> `Book a Consultation` (`/contact`)
- How it works (`HowItWorks`)
  - updated 3 step titles and conversion-focused descriptions
  - bottom CTA reads `See Pricing` and links to `#offer-ladder`

## Batch B2 checks (homepage hero + CTA overhaul)
- `/` homepage hero
  - eyebrow reads: `Growth infrastructure for local businesses`
  - headline reads: `Stop Losing Calls. Start Winning Customers.`
  - subhead reads: `Autom8 helps local businesses answer every call, collect 5-star reviews, and turn their website into a lead machine — without becoming tech experts.`
  - primary CTA is a phone link: `Call Cadence Live` with phone icon and target `tel:+14806313993`
  - secondary CTA reads `Book a 15-Minute Demo` and links to `/contact`
  - trust strip appears under CTAs: `7-day free trial • No contracts • Setup in 5 minutes`
  - supporting note appears below trust strip: `Try Cadence right now — it will answer like your receptionist.`
  - mobile (`375px`): CTA buttons stack vertically

## Batch B1 checks (CRO passover design tokens)
- Confirm shared utility classes apply consistently where used:
  - buttons: `.btn-primary`, `.btn-secondary`, `.btn-ghost`
  - cards: `.card-base`, `.card-elevated` with hover glow treatment
  - typography: `.section-heading`, `.section-subheading`
- Verify section spacing rhythm is available from root custom properties:
  - `--section-py-sm`, `--section-py-md`, `--section-py-lg`, `--section-gap`

## Batch 16 checks (final integration wiring)
- Footer
  - bottom of the `Company` links includes a small `Client Portal` link
  - link goes to `/portal/login`

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
