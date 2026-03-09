# ENV-VARS.md — autom8everything.com Review Funnel

Last updated: 2026-03-09 (Batch 1 verification + Vercel API sync)
Verification: 9 required Batch 1 vars confirmed present in Vercel via `GET /v9/projects/prj_VDUyHtQs8yg3QUy1BEvVyEyY96aj/env` on 2026-03-09.

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
- RF_TWILIO_PHONE_NUMBER — set ✅ (updated 2026-03-09: `+14806313993`)

## Stripe
- STRIPE_SECRET_KEY — Autom8 Stripe (set ✅)
- RF_STRIPE_WEBHOOK_SECRET — set ✅
- RF_STRIPE_PRICE_STARTER — set ✅ (updated in Batch 2 rerun: `price_1T7hegBxWKNs26XEZGeX5otQ`)
- RF_STRIPE_PRICE_GROWTH — set ✅ (updated in Batch 2 rerun: `price_1T7hehBxWKNs26XEeKM2MwGm`)

## Google
- GOOGLE_PLACES_API_KEY — set ✅
- GOOGLE_CLIENT_ID — set ✅ (updated 2026-03-09)
- GOOGLE_CLIENT_SECRET — set ✅ (updated 2026-03-09)
- GOOGLE_REDIRECT_URI — set ✅ (updated 2026-03-09: `https://autom8everything.com/api/review-funnel/google/callback`)

## Platform (Autom8 client portal)
- A8_ADMIN_SECRET — set ✅ (updated 2026-03-09)
- A8_JWT_SECRET — set ✅ (updated 2026-03-09)
- A8_MAGIC_LINK_TTL_MINUTES — optional (default `15`)
- A8_SESSION_TTL_HOURS — optional (default `24`)
- CADENCE_API_URL — set ✅ (updated 2026-03-09: `https://cadence-v2-production.up.railway.app`)
- PORTAL_API_SECRET — required; must match cadence-v2 value (source: shared secret in both apps)
- PORTAL_STRIPE_WEBHOOK_SECRET — set ✅ (updated 2026-03-09)
- PORTAL_STRIPE_PRICE_CADENCE_STARTER — set ✅ (updated 2026-03-09: `price_1T98KrBxWKNs26XEEQfthu8s`)
