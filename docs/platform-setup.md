# Platform Portal Setup

## Stripe Configuration

### Cadence Product
1. Create a product "Cadence — AI Receptionist" in Stripe Dashboard
2. Add a recurring price: $199/month
3. Enable 7-day free trial on the price or subscription
4. Copy the price ID → set as `PORTAL_STRIPE_PRICE_CADENCE_STARTER`

### Webhook Registration
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://autom8everything.com/api/portal/webhooks/stripe`
3. Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Copy the signing secret → set as `PORTAL_STRIPE_WEBHOOK_SECRET`

## Environment Variables

### Required for Portal (Vercel)
- `STRIPE_SECRET_KEY` — Stripe API secret key
- `PORTAL_STRIPE_WEBHOOK_SECRET` — Stripe webhook signing secret
- `PORTAL_STRIPE_PRICE_CADENCE_STARTER` — Stripe price ID for Cadence
- `CADENCE_API_URL` — cadence-v2 API URL (https://cadence-v2-production.up.railway.app)
- `PORTAL_API_SECRET` — shared secret for cadence-v2 portal API auth
- `A8_JWT_SECRET` — JWT signing secret for portal sessions
- `A8_ADMIN_SECRET` — admin panel auth secret
- `DATABASE_URL` — Neon Postgres connection string

### Required for cadence-v2 (Railway)
- `PORTAL_API_SECRET` — must match autom8-everything value

## Database Migration
Run `docs/migrations/2026-03-07-platform-tables.sql` against the production Neon database to create `a8_clients`, `a8_client_services`, and `a8_magic_links` tables.
