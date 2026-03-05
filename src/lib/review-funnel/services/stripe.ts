import Stripe from "stripe"
import { eq, or, sql, type SQL } from "drizzle-orm"
import { reviewFunnelConfig } from "../config"
import { rfDb } from "../db/client"
import { rfTenants } from "../db/schema"

const PRO_SMS_LIMIT_SENTINEL = 999_999
const MAX_SLUG_LENGTH = 63

const PLAN_CONFIG = {
  starter: {
    amountMonthlyUsd: 79,
    smsLimitMonthly: 150,
  },
  growth: {
    amountMonthlyUsd: 129,
    smsLimitMonthly: 500,
  },
  pro: {
    amountMonthlyUsd: 199,
    smsLimitMonthly: PRO_SMS_LIMIT_SENTINEL,
  },
} as const

export type ReviewFunnelPlan = keyof typeof PLAN_CONFIG

export interface CreateCheckoutSessionParams {
  email: string
  businessName: string
  ownerName: string
  ownerPhone: string
  plan: ReviewFunnelPlan
  googlePlaceId: string
}

export interface CreateCheckoutSessionResult {
  sessionId: string
  url: string
}

let cachedStripeClient: Stripe | null = null

function getStripeClient(): Stripe {
  if (cachedStripeClient) {
    return cachedStripeClient
  }

  const secretKey = reviewFunnelConfig.STRIPE_SECRET_KEY?.trim() || process.env.STRIPE_SECRET_KEY?.trim()

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured")
  }

  cachedStripeClient = new Stripe(secretKey)
  return cachedStripeClient
}

function getWebhookSecret(): string {
  const webhookSecret = reviewFunnelConfig.RF_STRIPE_WEBHOOK_SECRET?.trim()

  if (!webhookSecret) {
    throw new Error("RF_STRIPE_WEBHOOK_SECRET is not configured")
  }

  return webhookSecret
}

function parsePlan(rawPlan: string | null | undefined): ReviewFunnelPlan | null {
  const plan = rawPlan?.trim().toLowerCase()

  if (plan === "starter" || plan === "growth" || plan === "pro") {
    return plan
  }

  return null
}

function getPlanPriceId(plan: ReviewFunnelPlan): string {
  const rawPriceId =
    plan === "starter"
      ? reviewFunnelConfig.RF_STRIPE_PRICE_STARTER
      : plan === "growth"
        ? reviewFunnelConfig.RF_STRIPE_PRICE_GROWTH
        : reviewFunnelConfig.RF_STRIPE_PRICE_PRO

  const priceId = rawPriceId?.trim()

  if (!priceId) {
    throw new Error(`Stripe price id is not configured for Review Funnel ${plan} plan`)
  }

  return priceId
}

function getPlanForPriceId(priceId: string | null | undefined): ReviewFunnelPlan | null {
  const normalizedPriceId = priceId?.trim()
  if (!normalizedPriceId) {
    return null
  }

  if (reviewFunnelConfig.RF_STRIPE_PRICE_STARTER?.trim() === normalizedPriceId) {
    return "starter"
  }

  if (reviewFunnelConfig.RF_STRIPE_PRICE_GROWTH?.trim() === normalizedPriceId) {
    return "growth"
  }

  if (reviewFunnelConfig.RF_STRIPE_PRICE_PRO?.trim() === normalizedPriceId) {
    return "pro"
  }

  return null
}

function getPlanSmsLimit(plan: ReviewFunnelPlan): number {
  return PLAN_CONFIG[plan].smsLimitMonthly
}

function normalizeEmail(value: string | null | undefined): string | null {
  if (!value) {
    return null
  }

  const normalized = value.trim().toLowerCase()
  return normalized.length > 0 ? normalized : null
}

function toBoundedString(value: string | null | undefined, maxLength: number): string | null {
  if (!value) {
    return null
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return null
  }

  return trimmed.length > maxLength ? trimmed.slice(0, maxLength) : trimmed
}

function toStripeId(
  value:
    | string
    | Stripe.Customer
    | Stripe.DeletedCustomer
    | Stripe.Subscription
    | null
    | undefined,
): string | null {
  if (!value) {
    return null
  }

  if (typeof value === "string") {
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : null
  }

  return typeof value.id === "string" && value.id.trim().length > 0 ? value.id : null
}

function buildReviewUrl(googlePlaceId: string): string {
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(googlePlaceId)}`
}

function trimSiteOrigin(): string {
  return reviewFunnelConfig.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "")
}

function buildSuccessUrl(): string {
  return `${trimSiteOrigin()}/review-funnel/signup/success?session_id={CHECKOUT_SESSION_ID}`
}

function buildCancelUrl(): string {
  return `${trimSiteOrigin()}/review-funnel/signup`
}

function slugifyBusinessName(businessName: string): string {
  const normalized = businessName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

  if (!normalized) {
    return "review-funnel"
  }

  return normalized.slice(0, MAX_SLUG_LENGTH)
}

function withSlugSuffix(baseSlug: string, suffix: string): string {
  const safeSuffix = suffix.trim().toLowerCase().replace(/[^a-z0-9]/g, "")
  if (!safeSuffix) {
    return baseSlug
  }

  const maxBaseLength = MAX_SLUG_LENGTH - safeSuffix.length - 1
  const trimmedBase = maxBaseLength > 0 ? baseSlug.slice(0, maxBaseLength) : "rf"

  return `${trimmedBase}-${safeSuffix}`
}

async function createUniqueSlug(businessName: string): Promise<string> {
  const baseSlug = slugifyBusinessName(businessName)

  for (let attempt = 0; attempt < 20; attempt += 1) {
    const candidate =
      attempt === 0
        ? baseSlug
        : withSlugSuffix(
            baseSlug,
            `${Date.now().toString(36).slice(-4)}${Math.random().toString(36).slice(2, 6)}`,
          )

    const existing = await rfDb.query.rfTenants.findFirst({
      where: eq(rfTenants.slug, candidate),
      columns: { id: true },
    })

    if (!existing) {
      return candidate
    }
  }

  throw new Error("Unable to allocate a unique tenant slug")
}

async function findCustomerByEmail(email: string): Promise<Stripe.Customer | null> {
  const customers = await getStripeClient().customers.list({
    email,
    limit: 1,
  })

  return customers.data[0] ?? null
}

async function getOrCreateStripeCustomer(params: {
  email: string
  ownerName: string
  ownerPhone: string
  businessName: string
  plan: ReviewFunnelPlan
  googlePlaceId: string
}): Promise<string> {
  const existingCustomer = await findCustomerByEmail(params.email)

  if (existingCustomer) {
    await getStripeClient().customers.update(existingCustomer.id, {
      name: params.ownerName,
      phone: params.ownerPhone,
      metadata: {
        ...(existingCustomer.metadata ?? {}),
        product: "review-funnel",
        plan: params.plan,
        businessName: params.businessName,
        ownerEmail: params.email,
        ownerPhone: params.ownerPhone,
        googlePlaceId: params.googlePlaceId,
      },
    })

    return existingCustomer.id
  }

  const createdCustomer = await getStripeClient().customers.create({
    email: params.email,
    name: params.ownerName,
    phone: params.ownerPhone,
    metadata: {
      product: "review-funnel",
      plan: params.plan,
      businessName: params.businessName,
      ownerEmail: params.email,
      ownerPhone: params.ownerPhone,
      googlePlaceId: params.googlePlaceId,
    },
  })

  return createdCustomer.id
}

function buildTenantLookupWhere(customerId: string | null, subscriptionId: string | null): SQL<unknown> | undefined {
  if (customerId && subscriptionId) {
    return or(eq(rfTenants.stripeCustomerId, customerId), eq(rfTenants.stripeSubscriptionId, subscriptionId))
  }

  if (customerId) {
    return eq(rfTenants.stripeCustomerId, customerId)
  }

  if (subscriptionId) {
    return eq(rfTenants.stripeSubscriptionId, subscriptionId)
  }

  return undefined
}

function extractCheckoutMetadataValue(
  metadata: Stripe.Metadata | null | undefined,
  key: string,
  maxLength: number,
): string | null {
  const value = metadata?.[key]
  if (typeof value !== "string") {
    return null
  }

  return toBoundedString(value, maxLength)
}

async function inferPlanFromSubscription(subscriptionId: string): Promise<ReviewFunnelPlan | null> {
  const subscription = await getStripeClient().subscriptions.retrieve(subscriptionId)
  const metadataPlan = parsePlan(subscription.metadata?.plan)

  if (metadataPlan) {
    return metadataPlan
  }

  const firstPriceId = subscription.items.data[0]?.price?.id ?? null
  return getPlanForPriceId(firstPriceId)
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session): Promise<void> {
  if (session.mode !== "subscription") {
    return
  }

  const customerId = toStripeId(session.customer)
  const subscriptionId = toStripeId(session.subscription)
  const ownerEmail =
    normalizeEmail(extractCheckoutMetadataValue(session.metadata, "ownerEmail", 255)) ||
    normalizeEmail(session.customer_details?.email) ||
    normalizeEmail(session.customer_email)

  if (!customerId || !subscriptionId || !ownerEmail) {
    throw new Error("Missing Stripe checkout session identifiers or owner email")
  }

  const businessName =
    toBoundedString(extractCheckoutMetadataValue(session.metadata, "businessName", 255), 255) || "Review Funnel"
  const ownerName =
    toBoundedString(extractCheckoutMetadataValue(session.metadata, "ownerName", 255), 255) || businessName
  const ownerPhone =
    toBoundedString(extractCheckoutMetadataValue(session.metadata, "ownerPhone", 20), 20) ||
    toBoundedString(session.customer_details?.phone, 20)

  if (!ownerPhone) {
    throw new Error("Missing owner phone number in Stripe checkout metadata")
  }

  const googlePlaceId = toBoundedString(extractCheckoutMetadataValue(session.metadata, "googlePlaceId", 255), 255)
  const gmbReviewUrl = googlePlaceId ? buildReviewUrl(googlePlaceId) : "https://search.google.com/local/writereview"

  const metadataPlan = parsePlan(extractCheckoutMetadataValue(session.metadata, "plan", 20))
  const plan = metadataPlan || (await inferPlanFromSubscription(subscriptionId))

  if (!plan) {
    throw new Error(`Unable to determine Review Funnel plan for subscription ${subscriptionId}`)
  }

  const existingTenant = await rfDb.query.rfTenants.findFirst({
    where: or(
      eq(rfTenants.stripeCustomerId, customerId),
      sql`lower(${rfTenants.ownerEmail}) = ${ownerEmail}`,
    ),
    columns: {
      id: true,
    },
  })

  if (existingTenant) {
    await rfDb
      .update(rfTenants)
      .set({
        businessName,
        ownerName,
        ownerEmail,
        ownerPhone,
        googlePlaceId,
        gmbReviewUrl,
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        plan,
        smsLimitMonthly: getPlanSmsLimit(plan),
        isActive: true,
        updatedAt: new Date(),
      })
      .where(eq(rfTenants.id, existingTenant.id))

    return
  }

  const slug = await createUniqueSlug(businessName)

  await rfDb.insert(rfTenants).values({
    slug,
    businessName,
    ownerName,
    ownerEmail,
    ownerPhone,
    googlePlaceId,
    gmbReviewUrl,
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscriptionId,
    plan,
    smsLimitMonthly: getPlanSmsLimit(plan),
    isActive: true,
  })
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription): Promise<void> {
  const plan = parsePlan(subscription.metadata?.plan) || getPlanForPriceId(subscription.items.data[0]?.price?.id)

  if (!plan) {
    throw new Error(`Unable to map subscription ${subscription.id} to a Review Funnel plan`)
  }

  const customerId = toStripeId(subscription.customer)
  const where = buildTenantLookupWhere(customerId, subscription.id)

  if (!where) {
    return
  }

  await rfDb
    .update(rfTenants)
    .set({
      ...(customerId ? { stripeCustomerId: customerId } : {}),
      stripeSubscriptionId: subscription.id,
      plan,
      smsLimitMonthly: getPlanSmsLimit(plan),
      isActive: subscription.status !== "canceled" && subscription.status !== "unpaid",
      updatedAt: new Date(),
    })
    .where(where)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription): Promise<void> {
  const customerId = toStripeId(subscription.customer)
  const where = buildTenantLookupWhere(customerId, subscription.id)

  if (!where) {
    return
  }

  await rfDb
    .update(rfTenants)
    .set({
      ...(customerId ? { stripeCustomerId: customerId } : {}),
      stripeSubscriptionId: subscription.id,
      isActive: false,
      updatedAt: new Date(),
    })
    .where(where)
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
  const customerId = toStripeId(invoice.customer)
  const subscriptionId = toStripeId(invoice.subscription)
  const where = buildTenantLookupWhere(customerId, subscriptionId)

  if (!where) {
    return
  }

  await rfDb
    .update(rfTenants)
    .set({
      ...(customerId ? { stripeCustomerId: customerId } : {}),
      ...(subscriptionId ? { stripeSubscriptionId: subscriptionId } : {}),
      isActive: false,
      updatedAt: new Date(),
    })
    .where(where)
}

export async function createCheckoutSession(params: CreateCheckoutSessionParams): Promise<CreateCheckoutSessionResult> {
  const email = normalizeEmail(params.email)
  const businessName = toBoundedString(params.businessName, 255)
  const ownerName = toBoundedString(params.ownerName, 255)
  const ownerPhone = toBoundedString(params.ownerPhone, 20)
  const googlePlaceId = toBoundedString(params.googlePlaceId, 255)

  if (!email || !businessName || !ownerName || !ownerPhone || !googlePlaceId) {
    throw new Error("Missing required checkout fields")
  }

  const customerId = await getOrCreateStripeCustomer({
    email,
    businessName,
    ownerName,
    ownerPhone,
    plan: params.plan,
    googlePlaceId,
  })

  const session = await getStripeClient().checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: getPlanPriceId(params.plan), quantity: 1 }],
    success_url: buildSuccessUrl(),
    cancel_url: buildCancelUrl(),
    metadata: {
      product: "review-funnel",
      plan: params.plan,
      businessName,
      ownerName,
      ownerEmail: email,
      ownerPhone,
      googlePlaceId,
      planAmountMonthlyUsd: String(PLAN_CONFIG[params.plan].amountMonthlyUsd),
      planSmsLimitMonthly:
        PLAN_CONFIG[params.plan].smsLimitMonthly >= PRO_SMS_LIMIT_SENTINEL
          ? "unlimited"
          : String(PLAN_CONFIG[params.plan].smsLimitMonthly),
    },
  })

  if (!session.url) {
    throw new Error("Stripe checkout session did not return a redirect URL")
  }

  return {
    sessionId: session.id,
    url: session.url,
  }
}

export function constructStripeWebhookEvent(payload: string, signature: string): Stripe.Event {
  return getStripeClient().webhooks.constructEvent(payload, signature, getWebhookSecret())
}

export async function handleWebhookEvent(event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
      break
    case "customer.subscription.updated":
      await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
      break
    case "customer.subscription.deleted":
      await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
      break
    case "invoice.payment_failed":
      await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
      break
    default:
      break
  }
}

export async function createBillingPortalSession(tenantId: string): Promise<string> {
  const tenant = await rfDb.query.rfTenants.findFirst({
    where: eq(rfTenants.id, tenantId),
    columns: {
      stripeCustomerId: true,
    },
  })

  const customerId = tenant?.stripeCustomerId?.trim()

  if (!customerId) {
    throw new Error("Tenant is missing a Stripe customer id")
  }

  const portalSession = await getStripeClient().billingPortal.sessions.create({
    customer: customerId,
    return_url: `${trimSiteOrigin()}/review-funnel/dashboard/settings`,
  })

  return portalSession.url
}
