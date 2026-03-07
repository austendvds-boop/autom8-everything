# Autom8 Client Platform Setup

## Environment Variables (autom8-everything)
- `A8_ADMIN_SECRET` — password for /admin/clients login
- `A8_JWT_SECRET` — 32+ char secret for portal JWT signing
- `A8_MAGIC_LINK_TTL_MINUTES` — magic link expiry (default 15)
- `A8_SESSION_TTL_HOURS` — portal session duration (default 24)
- `CADENCE_API_URL` — cadence-v2 base URL (e.g., https://cadence-v2-production.up.railway.app)
- `PORTAL_API_SECRET` — shared secret for cross-service API calls

## Environment Variables (cadence-v2)
- `PORTAL_API_SECRET` — must match autom8-everything's value

## Database Migration
Run the SQL in `docs/migrations/2026-03-07-platform-tables.sql` against the Neon database.
Or use `npx drizzle-kit push` with DATABASE_URL set.

## How it works
1. Operator logs into /admin/clients with A8_ADMIN_SECRET
2. Creates a client record (business name, email, contact)
3. Adds services (Cadence / Review Funnel) — links to existing service accounts
4. Client receives welcome email with magic link to /portal
5. Client logs in, sees their services, manages Cadence settings, views calls
6. Billing managed via Stripe customer portal link
