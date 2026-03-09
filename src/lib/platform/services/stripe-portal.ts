import Stripe from "stripe"
import { and, eq, sql } from "drizzle-orm"
import { platformDb } from "../db/client"
import { a8Clients, a8ClientServices } from "../db/schema"
import { provisionCadenceTenant, provisionService } from "./provisioning"
import { generatePortalMagicLink } from "./auth"
import { sendWelcomeEmail } from "./email"

let cachedStripeClient: Stripe | null = null

// Initialize Stripe lazily to avoid env checks during build import time.
function getStripe(): Stripe {
  if (cachedStripeClient) {
    return cachedStripeClient
  }

  const secretKey = process.env.STRIPE_SECRET_KEY?.trim()

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured")
  }

  cachedStripeClient = new Stripe(secretKey, {
    apiVersion: "2025-02-24.acacia",
  })

  return cachedStripeClient
}

export interface CheckoutParams {
  email: string
  businessName: string
  phone?: string
  areaCode?: string
  product: "cadence" | "review_funnel"
  plan?: string
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function trimSiteOrigin(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()

  if (!siteUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL is not configured")
  }

  return siteUrl.replace(/\/+$/, "")
}

function isPortalProduct(value: string | null | undefined): value is "cadence" | "review_funnel" {
  return value === "cadence" || value === "review_funnel"
}

export async function createPortalCheckoutSession(params: CheckoutParams): Promise<{ url: string }> {
  const stripe = getStripe()
  const normalizedEmail = normalizeEmail(params.email)

  // Find or create Stripe customer.
  const existingCustomers = await stripe.customers.list({ email: normalizedEmail, limit: 1 })

  let customerId: string

  if (existingCustomers.data.length > 0) {
    customerId = existingCustomers.data[0].id

    await stripe.customers.update(customerId, {
      name: params.businessName,
      phone: params.phone || undefined,
      metadata: {
        ...(existingCustomers.data[0].metadata ?? {}),
        product: params.product,
        portal: "true",
      },
    })
  } else {
    const customer = await stripe.customers.create({
      email: normalizedEmail,
      name: params.businessName,
      phone: params.phone || undefined,
      metadata: {
        product: params.product,
        portal: "true",
      },
    })

    customerId = customer.id
  }

  // Determine price id.
  let priceId: string | undefined

  if (params.product === "cadence") {
    priceId = process.env.PORTAL_STRIPE_PRICE_CADENCE_STARTER?.trim()
  } else {
    priceId =
      params.plan === "growth"
        ? process.env.RF_STRIPE_PRICE_GROWTH?.trim()
        : process.env.RF_STRIPE_PRICE_STARTER?.trim()
  }

  if (!priceId) {
    throw new Error(`No Stripe price configured for ${params.product}`)
  }

  const siteOrigin = trimSiteOrigin()

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: {
      portal: "true",
      product: params.product,
      businessName: params.businessName,
      email: normalizedEmail,
      phone: params.phone || "",
      areaCode: params.areaCode || "480",
      plan: params.plan || "starter",
    },
    subscription_data: {
      trial_period_days: params.product === "cadence" ? 7 : undefined,
      metadata: {
        portal: "true",
        product: params.product,
      },
    },
    success_url: `${siteOrigin}/portal/checkout/success?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(normalizedEmail)}&product=${params.product}`,
    cancel_url: `${siteOrigin}/portal/checkout`,
  })

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL")
  }

  return { url: session.url }
}

export async function handlePortalWebhookEvent(event: Stripe.Event): Promise<void> {
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    if (session.metadata?.portal !== "true") {
      return
    }

    const metadata = session.metadata
    const product = metadata?.product

    if (!isPortalProduct(product)) {
      console.error("[PORTAL_STRIPE] Invalid product metadata", { product })
      return
    }

    const email =
      metadata?.email?.trim() ||
      session.customer_email?.trim() ||
      session.customer_details?.email?.trim() ||
      ""

    if (!email) {
      console.error("[PORTAL_STRIPE] No email found for checkout session", { sessionId: session.id })
      return
    }

    const normalizedEmail = normalizeEmail(email)
    const businessName = metadata?.businessName?.trim() || "Business"
    const phone = metadata?.phone?.trim() || null
    const areaCode = metadata?.areaCode?.trim() || "480"

    let client = await platformDb.query.a8Clients.findFirst({
      where: sql`lower(${a8Clients.email}) = ${normalizedEmail}`,
    })

    if (!client) {
      const [newClient] = await platformDb
        .insert(a8Clients)
        .values({
          businessName,
          contactName: businessName,
          email: normalizedEmail,
          phone,
          stripeCustomerId: typeof session.customer === "string" ? session.customer : null,
          isActive: true,
        })
        .returning()

      if (!newClient) {
        throw new Error("Failed to create platform client from Stripe checkout")
      }

      client = newClient
    } else if (!client.stripeCustomerId && typeof session.customer === "string") {
      await platformDb
        .update(a8Clients)
        .set({
          stripeCustomerId: session.customer,
          updatedAt: new Date(),
        })
        .where(eq(a8Clients.id, client.id))
    }

    if (product === "cadence") {
      const { clientId: cadenceTenantId } = await provisionCadenceTenant({
        businessName,
        email: normalizedEmail,
        phone: phone || undefined,
        areaCode,
      })

      await provisionService(client.id, "cadence", { cadenceTenantId })
    } else {
      // RF customer records are created by RF's own Stripe webhook.
      // If that record is not available yet, this will be retried manually later.
      try {
        await provisionService(client.id, "review_funnel")
      } catch (error) {
        console.error("[PORTAL_STRIPE] Review Funnel provisioning deferred", error)
      }
    }

    if (session.subscription) {
      const subscriptionId =
        typeof session.subscription === "string" ? session.subscription : session.subscription.id

      await platformDb
        .update(a8ClientServices)
        .set({
          stripeSubscriptionId: subscriptionId,
          updatedAt: new Date(),
        })
        .where(and(eq(a8ClientServices.clientId, client.id), eq(a8ClientServices.serviceType, product)))
    }

    try {
      const token = await generatePortalMagicLink(normalizedEmail)

      await sendWelcomeEmail({
        toEmail: normalizedEmail,
        clientName: businessName,
        serviceName: product,
        magicLinkToken: token,
      })
    } catch (error) {
      console.error("[PORTAL_STRIPE] Welcome email failed", error)
    }

    return
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription

    if (subscription.metadata?.portal !== "true") {
      return
    }

    const product = subscription.metadata?.product

    if (!isPortalProduct(product)) {
      return
    }

    const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id

    const client = await platformDb.query.a8Clients.findFirst({
      where: eq(a8Clients.stripeCustomerId, customerId),
    })

    if (!client) {
      return
    }

    const { cancelService } = await import("./provisioning")
    await cancelService(client.id, product)
  }
}
