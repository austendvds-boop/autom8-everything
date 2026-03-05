# ENV-VARS.md — autom8everything.com Review Funnel

## Core
- DATABASE_URL — Neon Postgres (set ✅)
- CRON_SECRET — Cron endpoint auth (set ✅)

## Auth
- RF_JWT_SECRET — JWT signing secret (set ✅)
- RF_ENCRYPTION_KEY — AES-256 for OAuth token encryption (set ✅)
- RF_ADMIN_SECRET — admin panel password secret used to sign `rf_admin_session` (set in Vercel during Batch 3; generated and stored at `C:\Users\austen\.openclaw\credentials\rf-admin-secret.txt`)

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
- RF_STRIPE_PRICE_STARTER — set ✅ (updated in Batch 2: `price_1T7hMIBxWKNs26XE5RMWhTmX`)
- RF_STRIPE_PRICE_GROWTH — set ✅ (updated in Batch 2: `price_1T7hMIBxWKNs26XEx6KV6naT`)

## Google
- GOOGLE_PLACES_API_KEY — set ✅
- GOOGLE_CLIENT_ID — PENDING: needs GCP OAuth setup for Calendar
- GOOGLE_CLIENT_SECRET — PENDING
- GOOGLE_REDIRECT_URI — PENDING: https://autom8everything.com/api/review-funnel/google/callback
