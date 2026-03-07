# ENV-VARS.md — autom8everything.com Review Funnel

## Core
- DATABASE_URL — Neon Postgres (set ✅)
- CRON_SECRET — Cron endpoint auth (set ✅)

## Auth
- RF_JWT_SECRET — JWT signing secret (set ✅)
- RF_ENCRYPTION_KEY — AES-256 for OAuth token encryption (set ✅)
- RF_ADMIN_SECRET — admin panel password secret used to sign `rf_admin_session` (generated in Batch 4, set in Vercel for production/preview/development, and stored at `C:\Users\austen\.openclaw\credentials\rf-admin-secret.txt`)

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
- RF_STRIPE_PRICE_STARTER — set ✅ (updated in Batch 2 rerun: `price_1T7hegBxWKNs26XEZGeX5otQ`)
- RF_STRIPE_PRICE_GROWTH — set ✅ (updated in Batch 2 rerun: `price_1T7hehBxWKNs26XEeKM2MwGm`)

## Google
- GOOGLE_PLACES_API_KEY — set ✅
- GOOGLE_CLIENT_ID — PENDING: needs GCP OAuth setup for Calendar
- GOOGLE_CLIENT_SECRET — PENDING
- GOOGLE_REDIRECT_URI — PENDING: https://autom8everything.com/api/review-funnel/google/callback

## Platform (Autom8 client portal)
- A8_ADMIN_SECRET — required; password for `/admin/clients` operator login
- A8_JWT_SECRET — required; 32+ char secret for portal sessions
- A8_MAGIC_LINK_TTL_MINUTES — optional (default `15`)
- A8_SESSION_TTL_HOURS — optional (default `24`)
- CADENCE_API_URL — required; cadence-v2 base URL
- PORTAL_API_SECRET — required; must match cadence-v2 value
