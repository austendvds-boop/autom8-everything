import { and, eq, sql } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { requireReviewFunnelDashboardAuth } from "@/lib/review-funnel/middleware"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfCalendarWatches, rfGoogleOauthTokens, rfTenants, type NewRfTenant } from "@/lib/review-funnel/db/schema"

function nullableTrimmedString(schema: z.ZodString) {
  return z.preprocess(
    (value) => {
      if (value === null || value === undefined) {
        return null
      }

      if (typeof value !== "string") {
        return value
      }

      const trimmed = value.trim()
      return trimmed.length > 0 ? trimmed : null
    },
    schema.nullable().optional(),
  )
}

const reviewPlatformSchema = z.enum(["google", "yelp", "both"])

const profilePatchSchema = z
  .object({
    businessName: z.string().trim().min(1).max(255).optional(),
    ownerName: z.string().trim().min(1).max(255).optional(),
    ownerPhone: z.string().trim().min(3).max(20).optional(),
    promoOffer: z.string().trim().min(1).max(500).optional(),
    promoCode: nullableTrimmedString(z.string()),
    promoMessage: nullableTrimmedString(z.string().max(500)),
    logoUrl: nullableTrimmedString(z.string()),
    gmbReviewUrl: nullableTrimmedString(z.string()),
    yelpReviewUrl: nullableTrimmedString(z.string()),
    reviewPlatform: reviewPlatformSchema.optional(),
    primaryColor: z.string().trim().regex(/^#[0-9a-fA-F]{6}$/).optional(),
    accentColor: z.string().trim().regex(/^#[0-9a-fA-F]{6}$/).optional(),
    overageBillingEnabled: z.boolean().optional(),
    followUpNudgeEnabled: z.boolean().optional(),
  })
  .strict()

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function toInt(value: number | string | null | undefined): number {
  if (typeof value === "number") {
    return value
  }

  if (typeof value === "string") {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
  }

  return 0
}

function isValidUrlOrNull(value: string | null | undefined): boolean {
  if (!value) {
    return true
  }

  if (value.startsWith("/")) {
    return true
  }

  try {
    const parsed = new URL(value)
    return parsed.protocol === "http:" || parsed.protocol === "https:"
  } catch {
    return false
  }
}

async function getCalendarSnapshot(tenantId: string) {
  const token = await rfDb.query.rfGoogleOauthTokens.findFirst({
    where: eq(rfGoogleOauthTokens.tenantId, tenantId),
    columns: {
      googleEmail: true,
    },
  })

  const [watchCount] = await rfDb
    .select({
      count: sql<number>`count(*)`,
    })
    .from(rfCalendarWatches)
    .where(and(eq(rfCalendarWatches.tenantId, tenantId), eq(rfCalendarWatches.isActive, true)))

  return {
    connected: Boolean(token),
    googleEmail: token?.googleEmail ?? null,
    activeWatchCount: toInt(watchCount?.count),
  }
}

export async function GET(request: NextRequest) {
  const authResult = await requireReviewFunnelDashboardAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const calendar = await getCalendarSnapshot(authResult.tenant.id)

  return NextResponse.json({
    profile: {
      businessName: authResult.tenant.businessName,
      ownerName: authResult.tenant.ownerName,
      ownerEmail: authResult.tenant.ownerEmail,
      ownerPhone: authResult.tenant.ownerPhone,
      logoUrl: authResult.tenant.logoUrl,
      primaryColor: authResult.tenant.primaryColor,
      accentColor: authResult.tenant.accentColor,
      promoOffer: authResult.tenant.promoOffer,
      promoCode: authResult.tenant.promoCode,
      promoMessage: authResult.tenant.promoMessage,
      googlePlaceId: authResult.tenant.googlePlaceId,
      gmbReviewUrl: authResult.tenant.gmbReviewUrl,
      yelpReviewUrl: authResult.tenant.yelpReviewUrl,
      reviewPlatform: authResult.tenant.reviewPlatform,
      plan: authResult.tenant.plan,
      overageBillingEnabled: authResult.tenant.overageBillingEnabled,
      followUpNudgeEnabled: authResult.tenant.followUpNudgeEnabled,
    },
    calendar,
  })
}

export async function PATCH(request: NextRequest) {
  const authResult = await requireReviewFunnelDashboardAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 })
  }

  const parsed = profilePatchSchema.safeParse(rawBody)

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid profile payload",
        details: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    )
  }

  const payload = parsed.data

  if (
    payload.followUpNudgeEnabled === true &&
    authResult.tenant.plan !== "growth" &&
    authResult.tenant.plan !== "pro"
  ) {
    return NextResponse.json(
      { error: "followUpNudgeEnabled is only available on Growth and Pro plans" },
      { status: 400 },
    )
  }

  if (!isValidUrlOrNull(payload.logoUrl) || !isValidUrlOrNull(payload.gmbReviewUrl) || !isValidUrlOrNull(payload.yelpReviewUrl)) {
    return NextResponse.json(
      { error: "logoUrl, gmbReviewUrl, and yelpReviewUrl must be valid http(s) URLs" },
      { status: 400 },
    )
  }

  const hasOwn = (key: keyof typeof payload) => Object.prototype.hasOwnProperty.call(payload, key)

  const updateData: Partial<NewRfTenant> & { updatedAt: Date } = {
    updatedAt: new Date(),
  }

  if (hasOwn("businessName") && payload.businessName !== undefined) {
    updateData.businessName = payload.businessName
  }

  if (hasOwn("ownerName") && payload.ownerName !== undefined) {
    updateData.ownerName = payload.ownerName
  }

  if (hasOwn("ownerPhone") && payload.ownerPhone !== undefined) {
    updateData.ownerPhone = payload.ownerPhone
  }

  if (hasOwn("promoOffer") && payload.promoOffer !== undefined) {
    updateData.promoOffer = payload.promoOffer
  }

  if (hasOwn("promoCode")) {
    updateData.promoCode = payload.promoCode ?? null
  }

  if (hasOwn("promoMessage")) {
    updateData.promoMessage = payload.promoMessage ?? null
  }

  if (hasOwn("logoUrl")) {
    updateData.logoUrl = payload.logoUrl ?? null
  }

  if (hasOwn("gmbReviewUrl")) {
    updateData.gmbReviewUrl = payload.gmbReviewUrl ?? authResult.tenant.gmbReviewUrl
  }

  if (hasOwn("yelpReviewUrl")) {
    updateData.yelpReviewUrl = payload.yelpReviewUrl ?? null
  }

  if (hasOwn("reviewPlatform") && payload.reviewPlatform !== undefined) {
    updateData.reviewPlatform = payload.reviewPlatform
  }

  if (hasOwn("primaryColor") && payload.primaryColor !== undefined) {
    updateData.primaryColor = payload.primaryColor
  }

  if (hasOwn("accentColor") && payload.accentColor !== undefined) {
    updateData.accentColor = payload.accentColor
  }

  if (hasOwn("overageBillingEnabled") && payload.overageBillingEnabled !== undefined) {
    updateData.overageBillingEnabled = payload.overageBillingEnabled
  }

  if (hasOwn("followUpNudgeEnabled") && payload.followUpNudgeEnabled !== undefined) {
    updateData.followUpNudgeEnabled = payload.followUpNudgeEnabled
  }

  if (Object.keys(updateData).length === 1) {
    return NextResponse.json({ error: "No profile fields provided" }, { status: 400 })
  }

  const [updated] = await rfDb
    .update(rfTenants)
    .set(updateData)
    .where(eq(rfTenants.id, authResult.tenant.id))
    .returning({
      businessName: rfTenants.businessName,
      ownerName: rfTenants.ownerName,
      ownerEmail: rfTenants.ownerEmail,
      ownerPhone: rfTenants.ownerPhone,
      logoUrl: rfTenants.logoUrl,
      primaryColor: rfTenants.primaryColor,
      accentColor: rfTenants.accentColor,
      promoOffer: rfTenants.promoOffer,
      promoCode: rfTenants.promoCode,
      promoMessage: rfTenants.promoMessage,
      gmbReviewUrl: rfTenants.gmbReviewUrl,
      yelpReviewUrl: rfTenants.yelpReviewUrl,
      reviewPlatform: rfTenants.reviewPlatform,
      overageBillingEnabled: rfTenants.overageBillingEnabled,
      followUpNudgeEnabled: rfTenants.followUpNudgeEnabled,
    })

  const calendar = await getCalendarSnapshot(authResult.tenant.id)

  return NextResponse.json({
    profile: updated,
    calendar,
  })
}
