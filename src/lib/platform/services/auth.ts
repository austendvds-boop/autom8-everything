import crypto from "node:crypto"
import { and, desc, eq, gt, isNull, sql } from "drizzle-orm"
import { platformConfig } from "../config"
import { platformDb } from "../db/client"
import { a8Clients, a8MagicLinks, type A8Client } from "../db/schema"

const jwt: {
  sign: (payload: Record<string, unknown>, secret: string, options?: Record<string, unknown>) => string
  verify: (token: string, secret: string) => unknown
} = require("jsonwebtoken")

interface PortalSessionClaims {
  sub: string
  role: "portal_client"
  iat?: number
  exp?: number
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex")
}

export function createPortalSession(clientId: string): string {
  return jwt.sign(
    { sub: clientId, role: "portal_client" },
    platformConfig.A8_JWT_SECRET,
    {
      expiresIn: `${platformConfig.A8_SESSION_TTL_HOURS}h`,
    },
  )
}

export async function generatePortalMagicLink(email: string): Promise<string> {
  const normalizedEmail = email.trim().toLowerCase()

  const client = await platformDb.query.a8Clients.findFirst({
    where: and(
      eq(a8Clients.isActive, true),
      sql`lower(${a8Clients.email}) = ${normalizedEmail}`,
    ),
  })

  if (!client) {
    throw new Error("No active portal client found for that email")
  }

  const rawToken = crypto.randomBytes(32).toString("base64url")
  const tokenHash = hashToken(rawToken)
  const expiresAt = new Date(Date.now() + platformConfig.A8_MAGIC_LINK_TTL_MINUTES * 60_000)

  await platformDb.insert(a8MagicLinks).values({
    clientId: client.id,
    email: client.email,
    tokenHash,
    expiresAt,
  })

  return rawToken
}

export async function verifyPortalMagicLink(token: string): Promise<{ sessionToken: string; client: A8Client } | null> {
  const tokenHash = hashToken(token)
  const now = new Date()

  return platformDb.transaction(async (tx) => {
    const link = await tx.query.a8MagicLinks.findFirst({
      where: and(
        eq(a8MagicLinks.tokenHash, tokenHash),
        isNull(a8MagicLinks.usedAt),
        gt(a8MagicLinks.expiresAt, now),
      ),
      orderBy: [desc(a8MagicLinks.createdAt)],
    })

    if (!link) {
      return null
    }

    const [consumed] = await tx
      .update(a8MagicLinks)
      .set({ usedAt: now })
      .where(and(eq(a8MagicLinks.id, link.id), isNull(a8MagicLinks.usedAt)))
      .returning({ clientId: a8MagicLinks.clientId })

    if (!consumed) {
      return null
    }

    const client = await tx.query.a8Clients.findFirst({
      where: and(
        eq(a8Clients.id, consumed.clientId),
        eq(a8Clients.isActive, true),
      ),
    })

    if (!client) {
      return null
    }

    const sessionToken = createPortalSession(client.id)

    return {
      sessionToken,
      client,
    }
  })
}

export async function verifyPortalSession(token: string): Promise<A8Client | null> {
  try {
    const payload = jwt.verify(token, platformConfig.A8_JWT_SECRET)

    if (!payload || typeof payload !== "object") {
      return null
    }

    const claims = payload as PortalSessionClaims

    if (claims.role !== "portal_client" || typeof claims.sub !== "string" || !claims.sub) {
      return null
    }

    const client = await platformDb.query.a8Clients.findFirst({
      where: and(eq(a8Clients.id, claims.sub), eq(a8Clients.isActive, true)),
    })

    return client ?? null
  } catch {
    return null
  }
}
