# Production Launch Checklist

## Environment (Vercel)
- [ ] NEXT_PUBLIC_SITE_URL = https://autom8everything.com
- [ ] NEXT_PUBLIC_BUSINESS_NAME = Autom8 Everything
- [ ] NEXT_PUBLIC_BUSINESS_EMAIL = hello@autom8everything.com
- [ ] All env vars from docs/ENV-VARS.md present

## Database (Neon)
- [ ] Run docs/migrations/000-full-schema.sql
- [ ] Verify via /api/health — all table checks pass

## Stripe Webhooks
- [ ] RF webhook registered (see docs/STRIPE-WEBHOOKS.md)
- [ ] Portal webhook registered (see docs/STRIPE-WEBHOOKS.md)
- [ ] Cadence webhook registered (see docs/STRIPE-WEBHOOKS.md)

## Cross-Service
- [ ] PORTAL_API_SECRET matches between Vercel and Railway
- [ ] /api/health shows cadencePortalAuth: true

## SMS / 10DLC
- [ ] A2P campaign status: [REJECTED — resubmit needed]
- [ ] Email fallback active: yes (B4)
- [ ] Dashboard shows SMS status: yes (B4)

## Final Verification
- [ ] /api/health returns healthy: true
- [ ] /api/review-funnel/health returns healthy: true
- [ ] Portal login flow works (request magic link → email → verify → dashboard)
- [ ] Stripe checkout flow works (portal/checkout → Stripe → webhook → provisioned)
