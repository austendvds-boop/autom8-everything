# Stripe Webhook Registration

This document lists the Stripe webhook endpoints that must be registered for autom8-everything and the external Cadence v2 deployment.

## Endpoint 1: Review Funnel

- URL: `https://autom8everything.com/api/review-funnel/webhooks/stripe`
- Secret env var: `RF_STRIPE_WEBHOOK_SECRET`
- Required events:
  - `checkout.session.completed` - creates `rf_tenant` from checkout metadata
  - `customer.subscription.updated` - updates plan/limits
  - `customer.subscription.deleted` - deactivates tenant
  - `invoice.payment_failed` - deactivates tenant
- Handler: `src/lib/review-funnel/services/stripe.ts` -> `handleWebhookEvent()`

## Endpoint 2: Portal (Unified Client Platform)

- URL: `https://autom8everything.com/api/portal/webhooks/stripe`
- Secret env var: `PORTAL_STRIPE_WEBHOOK_SECRET`
- Required events:
  - `checkout.session.completed` - creates `a8_client`, provisions Cadence tenant via cadence-v2 API, sends welcome email
  - `customer.subscription.deleted` - cancels service
- Handler: `src/lib/platform/services/stripe-portal.ts` -> `handlePortalWebhookEvent()`
- Note: Only processes events where `session.metadata.portal === "true"`

## Endpoint 3: Cadence v2 (Railway)

- URL: `https://cadence-v2-production.up.railway.app/stripe-webhook`
- Alternate URL: `https://cadence-v2-production.up.railway.app/webhook/stripe`
- Secret env var: `STRIPE_WEBHOOK_SECRET` (in Railway)
- Required events:
  - `checkout.session.completed` - completes onboarding session, triggers provisioning
  - `customer.subscription.updated` - updates client plan
  - `customer.subscription.deleted` - deactivates client
  - `invoice.payment_succeeded` - no-op
  - `invoice.payment_failed` - handled by billing-service
- Handler: `src/stripe.ts` -> `handleStripeWebhook()` plus `src/billing-service.ts` -> `handleWebhookEvent()`

## Registration Checklist

1. Open the Stripe Dashboard for the correct account and switch to the correct mode (`Test` or `Live`).
2. Go to `Developers` -> `Webhooks`.
3. Click `Add destination` or `Add endpoint`.
4. Enter the endpoint URL for the service you are registering.
5. Select `Events to send` and add only the required events listed above for that endpoint.
6. Save the endpoint and copy the signing secret that Stripe displays.
7. Store the signing secret in the matching environment variable for that deployment.
8. Redeploy or refresh environment variables for the affected service if needed.
9. Use Stripe's `Send test webhook` action for each configured event to confirm the endpoint accepts signed requests.
10. Repeat the process separately for Review Funnel, Portal, and Cadence v2 so each endpoint has its own secret.
