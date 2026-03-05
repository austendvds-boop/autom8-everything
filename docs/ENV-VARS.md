# ENV-VARS.md — autom8everything.com Review Funnel

## Core
- DATABASE_URL — Neon Postgres (set ✅)
- CRON_SECRET — Cron endpoint auth (set ✅)

## Auth
- RF_JWT_SECRET — JWT signing secret (set ✅)
- RF_ENCRYPTION_KEY — AES-256 for OAuth token encryption (set ✅)

## Gmail (magic links)
- RF_GMAIL_USER — aust@autom8everything.com (set ✅)
- RF_GMAIL_APP_PASSWORD — Gmail app password (set ✅)

## Twilio (SMS)
- TWILIO_ACCOUNT_SID — set ✅
- TWILIO_AUTH_TOKEN — set ✅
- RF_TWILIO_PHONE_NUMBER — PENDING: dedicated RF number not yet purchased

## Stripe
- STRIPE_SECRET_KEY — Autom8 Stripe (set ✅)
- RF_STRIPE_WEBHOOK_SECRET — set ✅
- RF_STRIPE_PRICE_STARTER — set ✅ (will be updated in Batch 2)
- RF_STRIPE_PRICE_GROWTH — set ✅ (will be updated in Batch 2)
- RF_STRIPE_PRICE_PRO — N/A (Pro tier is contact-us, no Stripe price)

## Google
- GOOGLE_PLACES_API_KEY — set ✅
- GOOGLE_CLIENT_ID — PENDING: needs GCP OAuth setup for Calendar
- GOOGLE_CLIENT_SECRET — PENDING
- GOOGLE_REDIRECT_URI — PENDING: https://autom8everything.com/api/review-funnel/google/callback
