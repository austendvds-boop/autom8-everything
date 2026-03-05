import crypto from "node:crypto"
import { and, desc, eq, gt, isNull, sql } from "drizzle-orm"
import { reviewFunnelConfig } from "../config"
import { rfDb } from "../db/client"
import { rfMagicLinks, rfTenants, type RfTenant } from "../db/schema"

const jwt: {
  sign: (payload: Record<string, unknown>, secret: string, options?: Record<string, unknown>) => string
  verify: (token: string, secret: string) => unknown
} = require("jsonwebtoken")

interface SessionClaims {
  sub: string
  role: "tenant"
  iat?: number
  exp?: number
}

export interface VerifiedMagicLinkSession {
  sessionToken: string
  tenant: RfTenant
}

export function hashMagicLinkToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex")
}

export function createSession(tenantId: string): string {
  return jwt.sign(
    { sub: tenantId, role: "tenant" },
    reviewFunnelConfig.RF_JWT_SECRET,
    { expiresIn: `${reviewFunnelConfig.RF_SESSION_TTL_HOURS}h` },
  )
}

export async function generateMagicLink(email: string): Promise<string> {
  const normalizedEmail = email.trim().toLowerCase()

  const tenant = await rfDb.query.rfTenants.findFirst({
    where: and(
      eq(rfTenants.isActive, true),
      sql`lower(${rfTenants.ownerEmail}) = ${normalizedEmail}`,
    ),
  })

  if (!tenant) {
    throw new Error("No active Review Funnel tenant found for that email")
  }

  const rawToken = crypto.randomBytes(32).toString("base64url")
  const tokenHash = hashMagicLinkToken(rawToken)
  const expiresAt = new Date(Date.now() + reviewFunnelConfig.RF_MAGIC_LINK_TTL_MINUTES * 60_000)

  await rfDb.insert(rfMagicLinks).values({
    tenantId: tenant.id,
    email: tenant.ownerEmail,
    tokenHash,
    expiresAt,
  })

  return rawToken
}

export async function verifyMagicLink(token: string): Promise<VerifiedMagicLinkSession | null> {
  const tokenHash = hashMagicLinkToken(token)
  const now = new Date()

  return rfDb.transaction(async (tx) => {
    const link = await tx.query.rfMagicLinks.findFirst({
      where: and(
        eq(rfMagicLinks.tokenHash, tokenHash),
        isNull(rfMagicLinks.usedAt),
        gt(rfMagicLinks.expiresAt, now),
      ),
      orderBy: [desc(rfMagicLinks.createdAt)],
    })

    if (!link) {
      return null
    }

    const [consumed] = await tx
      .update(rfMagicLinks)
      .set({ usedAt: now })
      .where(and(eq(rfMagicLinks.id, link.id), isNull(rfMagicLinks.usedAt)))
      .returning({ tenantId: rfMagicLinks.tenantId })

    if (!consumed) {
      return null
    }

    const tenant = await tx.query.rfTenants.findFirst({
      where: and(eq(rfTenants.id, consumed.tenantId), eq(rfTenants.isActive, true)),
    })

    if (!tenant) {
      return null
    }

    const sessionToken = createSession(tenant.id)

    return {
      sessionToken,
      tenant,
    }
  })
}

export async function verifySession(token: string): Promise<RfTenant | null> {
  try {
    const payload = jwt.verify(token, reviewFunnelConfig.RF_JWT_SECRET)

    if (!payload || typeof payload !== "object") {
      return null
    }

    const claims = payload as SessionClaims

    if (claims.role !== "tenant" || typeof claims.sub !== "string" || !claims.sub) {
      return null
    }

    const tenant = await rfDb.query.rfTenants.findFirst({
      where: and(eq(rfTenants.id, claims.sub), eq(rfTenants.isActive, true)),
    })

    return tenant ?? null
  } catch {
    return null
  }
}
