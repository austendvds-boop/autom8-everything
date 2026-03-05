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

## Smoke tests (no auth required)
- GET /review-funnel/login → must render login form, NOT redirect
- GET /review-funnel/signup → must render Step 1 of 4 wizard
- GET /services/review-funnel → must render pricing/marketing page, NOT redirect
- GET /api/review-funnel/funnel/nonexistent → must return 404, not 500

## Known PENDING (not bugs)
- Google Calendar connect → OAuth flow (GOOGLE_CLIENT_ID not set yet)
- SMS sending → RF_TWILIO_PHONE_NUMBER not set yet
