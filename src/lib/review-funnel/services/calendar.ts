import crypto from "node:crypto"
import { and, eq, sql } from "drizzle-orm"
import { google, type calendar_v3 } from "googleapis"
import { rfDb } from "../db/client"
import {
  rfCalendarWatches,
  rfGoogleOauthTokens,
  rfPendingSms,
  rfReviewRequests,
  rfTenants,
  type RfCalendarWatch,
  type RfGoogleOauthToken,
  type RfTenant,
} from "../db/schema"
import { extractPhoneCandidates, normalizePhone } from "../utils/phone"
import { decrypt, encrypt } from "./crypto"

const GOOGLE_CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar.readonly"
const DEFAULT_GOOGLE_REDIRECT_URI = "https://autom8everything.com/api/review-funnel/google/callback"
const DEFAULT_SITE_URL = "https://autom8everything.com"
const GOOGLE_CALENDAR_WEBHOOK_PATH = "/api/review-funnel/webhooks/google-calendar"
const GOOGLE_WATCH_TTL_SECONDS = 7 * 24 * 60 * 60
const COMPLETED_APPOINTMENT_LOOKBACK_MS = 24 * 60 * 60 * 1000
const OAUTH_STATE_TTL_MS = 15 * 60 * 1000

export const CALENDAR_LIMIT_REACHED_MESSAGE = "You've reached your calendar limit for your current plan. Upgrade to connect more calendars."

type GoogleOAuthClient = ReturnType<typeof createOAuthClient>

interface GoogleOAuthConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
}

interface TenantCalendarContext {
  oauthClient: GoogleOAuthClient
  calendarClient: calendar_v3.Calendar
  tokenRow: RfGoogleOauthToken
  accessToken: string
  refreshToken: string
}

interface ChangedCalendarEvents {
  events: calendar_v3.Schema$Event[]
  nextSyncToken: string | null
}

export interface CalendarWebhookProcessingResult {
  processed: boolean
  reason?: string
  inspectedEvents: number
  queuedReviewRequests: number
}

function readRequiredEnv(name: string): string {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(`${name} is not configured`)
  }
  return value
}

function getGoogleOAuthConfig(): GoogleOAuthConfig {
  return {
    clientId: readRequiredEnv("GOOGLE_CLIENT_ID"),
    clientSecret: readRequiredEnv("GOOGLE_CLIENT_SECRET"),
    redirectUri: process.env.GOOGLE_REDIRECT_URI?.trim() || DEFAULT_GOOGLE_REDIRECT_URI,
  }
}

function getOAuthStateSecret(): string {
  return process.env.RF_JWT_SECRET?.trim() || process.env.RF_ENCRYPTION_KEY?.trim() || readRequiredEnv("GOOGLE_CLIENT_SECRET")
}

function createOAuthClient(): InstanceType<typeof google.auth.OAuth2> {
  const config = getGoogleOAuthConfig()
  return new google.auth.OAuth2(config.clientId, config.clientSecret, config.redirectUri)
}

function getGoogleWebhookAddress(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL
  return new URL(GOOGLE_CALENDAR_WEBHOOK_PATH, siteUrl).toString()
}

function buildOAuthState(tenantId: string): string {
  const issuedAt = Date.now()
  const payload = `${tenantId}:${issuedAt}`
  const signature = crypto.createHmac("sha256", getOAuthStateSecret()).update(payload).digest("base64url")
  return Buffer.from(`${payload}:${signature}`, "utf8").toString("base64url")
}

export function parseGoogleOAuthState(state: string | null | undefined): string | null {
  if (!state) return null

  try {
    const decoded = Buffer.from(state, "base64url").toString("utf8")
    const [tenantId, issuedAtRaw, signature] = decoded.split(":")

    if (!tenantId || !issuedAtRaw || !signature) {
      return null
    }

    const issuedAt = Number(issuedAtRaw)
    if (!Number.isFinite(issuedAt)) {
      return null
    }

    if (Date.now() - issuedAt > OAUTH_STATE_TTL_MS) {
      return null
    }

    const payload = `${tenantId}:${issuedAtRaw}`
    const expectedSignature = crypto
      .createHmac("sha256", getOAuthStateSecret())
      .update(payload)
      .digest("base64url")

    if (signature !== expectedSignature) {
      return null
    }

    return tenantId
  } catch {
    return null
  }
}

function parseScopes(scopeRaw: string | null | undefined, existingScopes: string[] | null): string[] {
  if (scopeRaw) {
    return scopeRaw
      .split(" ")
      .map((scope) => scope.trim())
      .filter(Boolean)
  }

  if (existingScopes && existingScopes.length > 0) {
    return existingScopes
  }

  return [GOOGLE_CALENDAR_SCOPE]
}

function pickTokenExpiry(expiryDateMs: number | null | undefined, existingExpiry: Date | null): Date {
  if (typeof expiryDateMs === "number" && Number.isFinite(expiryDateMs)) {
    return new Date(expiryDateMs)
  }

  if (existingExpiry) {
    return existingExpiry
  }

  return new Date(Date.now() + 60 * 60 * 1000)
}

async function ensureActiveTenant(tenantId: string): Promise<RfTenant> {
  const tenant = await rfDb.query.rfTenants.findFirst({
    where: and(eq(rfTenants.id, tenantId), eq(rfTenants.isActive, true)),
  })

  if (!tenant) {
    throw new Error("Review Funnel tenant not found or inactive")
  }

  return tenant
}

function toCount(value: number | string | null | undefined): number {
  if (typeof value === "number") {
    return value
  }

  if (typeof value === "string") {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
  }

  return 0
}

async function countActiveWatches(tenantId: string): Promise<number> {
  const [watchCount] = await rfDb
    .select({
      count: sql<number>`count(*)`,
    })
    .from(rfCalendarWatches)
    .where(and(eq(rfCalendarWatches.tenantId, tenantId), eq(rfCalendarWatches.isActive, true)))

  return toCount(watchCount?.count)
}

export async function ensureCalendarConnectionAllowed(tenantId: string): Promise<void> {
  const tenant = await ensureActiveTenant(tenantId)
  const activeWatchCount = await countActiveWatches(tenant.id)

  if (activeWatchCount >= tenant.calendarLimit) {
    throw new Error(CALENDAR_LIMIT_REACHED_MESSAGE)
  }
}

async function getGoogleTokenRow(tenantId: string): Promise<RfGoogleOauthToken | null> {
  const tokenRow = await rfDb.query.rfGoogleOauthTokens.findFirst({
    where: eq(rfGoogleOauthTokens.tenantId, tenantId),
  })

  return tokenRow ?? null
}

async function createTenantCalendarContext(tenantId: string): Promise<TenantCalendarContext> {
  const tokenRow = await getGoogleTokenRow(tenantId)

  if (!tokenRow) {
    throw new Error("Google Calendar is not connected for this tenant")
  }

  const accessToken = decrypt(tokenRow.accessTokenEnc)
  const refreshToken = decrypt(tokenRow.refreshTokenEnc)

  const oauthClient = createOAuthClient()
  oauthClient.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
    expiry_date: tokenRow.tokenExpiry.getTime(),
  })

  if (!oauthClient.credentials.expiry_date || oauthClient.credentials.expiry_date <= Date.now() + 60_000) {
    await oauthClient.getAccessToken()
  }

  return {
    oauthClient,
    calendarClient: google.calendar({ version: "v3", auth: oauthClient }),
    tokenRow,
    accessToken,
    refreshToken,
  }
}

async function persistUpdatedTokens(context: TenantCalendarContext): Promise<void> {
  const credentials = context.oauthClient.credentials

  const nextAccessToken = credentials.access_token ?? context.accessToken
  const nextRefreshToken = credentials.refresh_token ?? context.refreshToken
  const nextTokenExpiry = credentials.expiry_date
    ? new Date(credentials.expiry_date)
    : context.tokenRow.tokenExpiry

  const tokenChanged =
    nextAccessToken !== context.accessToken ||
    nextRefreshToken !== context.refreshToken ||
    nextTokenExpiry.getTime() !== context.tokenRow.tokenExpiry.getTime()

  if (!tokenChanged) {
    return
  }

  await rfDb
    .update(rfGoogleOauthTokens)
    .set({
      accessTokenEnc: encrypt(nextAccessToken),
      refreshTokenEnc: encrypt(nextRefreshToken),
      tokenExpiry: nextTokenExpiry,
      updatedAt: new Date(),
    })
    .where(eq(rfGoogleOauthTokens.id, context.tokenRow.id))
}

async function stopWatchChannel(context: TenantCalendarContext, watch: Pick<RfCalendarWatch, "channelId" | "resourceId">) {
  if (!watch.resourceId) {
    return false
  }

  try {
    await context.calendarClient.channels.stop({
      requestBody: {
        id: watch.channelId,
        resourceId: watch.resourceId,
      },
    })

    return true
  } catch {
    return false
  }
}

async function listChangedEvents(
  context: TenantCalendarContext,
  calendarId: string,
  syncToken: string | null,
): Promise<ChangedCalendarEvents> {
  const events: calendar_v3.Schema$Event[] = []
  let pageToken: string | undefined
  let nextSyncToken: string | null = null

  do {
    const listParams: calendar_v3.Params$Resource$Events$List = {
      calendarId,
      pageToken,
      maxResults: 250,
      singleEvents: true,
      showDeleted: false,
    }

    if (syncToken) {
      listParams.syncToken = syncToken
    } else {
      const now = Date.now()
      listParams.timeMin = new Date(now - COMPLETED_APPOINTMENT_LOOKBACK_MS).toISOString()
      listParams.timeMax = new Date(now).toISOString()
      listParams.orderBy = "startTime"
    }

    const response = await context.calendarClient.events.list(listParams)
    events.push(...(response.data.items ?? []))

    pageToken = response.data.nextPageToken ?? undefined
    if (!pageToken) {
      nextSyncToken = response.data.nextSyncToken ?? null
    }
  } while (pageToken)

  return {
    events,
    nextSyncToken,
  }
}

function isInvalidSyncTokenError(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false
  }

  const err = error as { code?: number; response?: { status?: number } }
  return err.code === 410 || err.response?.status === 410
}

function toEventEnd(event: calendar_v3.Schema$Event): Date | null {
  const endRaw = event.end?.dateTime || event.end?.date
  if (!endRaw) return null

  const parsed = new Date(endRaw)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

function toBoundedText(value: string | null | undefined, maxLength: number): string | null {
  if (!value) return null
  const trimmed = value.trim()
  if (!trimmed) return null
  return trimmed.length > maxLength ? trimmed.slice(0, maxLength) : trimmed
}

function extractCustomerName(event: calendar_v3.Schema$Event): string | null {
  const attendeeName = event.attendees?.find((attendee) => !attendee.self && !attendee.resource && attendee.displayName)
    ?.displayName

  return toBoundedText(attendeeName || event.summary, 255)
}

function extractCustomerEmail(event: calendar_v3.Schema$Event): string | null {
  const attendeeEmail = event.attendees?.find((attendee) => !attendee.self && !attendee.resource && attendee.email)
    ?.email

  const normalizedEmail = attendeeEmail?.trim().toLowerCase()
  return toBoundedText(normalizedEmail, 255)
}

function extractCustomerPhone(event: calendar_v3.Schema$Event): string | null {
  const attendeeText = (event.attendees ?? []).flatMap((attendee) => [attendee.displayName, attendee.email])
  const extendedPropertyValues = [
    ...Object.values(event.extendedProperties?.private ?? {}),
    ...Object.values(event.extendedProperties?.shared ?? {}),
  ]

  const candidates = extractPhoneCandidates(event.description, ...attendeeText, ...extendedPropertyValues)

  for (const candidate of candidates) {
    const normalized = normalizePhone(candidate)
    if (normalized) {
      return normalized
    }
  }

  return null
}

async function queueReviewRequestFromEvent(params: {
  watch: RfCalendarWatch
  tenant: RfTenant
  event: calendar_v3.Schema$Event
  appointmentEnd: Date
}): Promise<boolean> {
  const { watch, tenant, event, appointmentEnd } = params

  const calendarEventId = toBoundedText(event.id, 255)
  if (!calendarEventId) {
    return false
  }

  const customerPhone = extractCustomerPhone(event)
  if (!customerPhone) {
    return false
  }

  const smsScheduledAt = new Date(appointmentEnd.getTime() + tenant.smsDelayMinutes * 60_000)

  return rfDb.transaction(async (tx) => {
    const [createdReviewRequest] = await tx
      .insert(rfReviewRequests)
      .values({
        tenantId: tenant.id,
        locationId: watch.locationId,
        customerName: extractCustomerName(event),
        customerPhone,
        customerEmail: extractCustomerEmail(event),
        calendarEventId,
        appointmentEnd,
        smsScheduledAt,
      })
      .onConflictDoNothing({
        target: [rfReviewRequests.tenantId, rfReviewRequests.calendarEventId],
      })
      .returning({ id: rfReviewRequests.id })

    if (!createdReviewRequest) {
      return false
    }

    await tx.insert(rfPendingSms).values({
      reviewRequestId: createdReviewRequest.id,
      sendAfter: smsScheduledAt,
    })

    return true
  })
}

async function deactivateActiveWatchesForTenant(tenantId: string): Promise<{ stopped: number; deactivated: number }> {
  const activeWatches = await rfDb.query.rfCalendarWatches.findMany({
    where: and(eq(rfCalendarWatches.tenantId, tenantId), eq(rfCalendarWatches.isActive, true)),
  })

  if (activeWatches.length === 0) {
    return { stopped: 0, deactivated: 0 }
  }

  let stopped = 0

  try {
    const context = await createTenantCalendarContext(tenantId)

    for (const watch of activeWatches) {
      const stopOk = await stopWatchChannel(context, watch)
      if (stopOk) {
        stopped += 1
      }
    }

    await persistUpdatedTokens(context)
  } catch {
    // best-effort stop; we still deactivate rows below
  }

  await rfDb
    .update(rfCalendarWatches)
    .set({ isActive: false })
    .where(and(eq(rfCalendarWatches.tenantId, tenantId), eq(rfCalendarWatches.isActive, true)))

  return {
    stopped,
    deactivated: activeWatches.length,
  }
}

export function generateAuthUrl(tenantId: string): string {
  if (!tenantId?.trim()) {
    throw new Error("tenantId is required")
  }

  const oauthClient = createOAuthClient()
  return oauthClient.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    include_granted_scopes: true,
    scope: [GOOGLE_CALENDAR_SCOPE],
    state: buildOAuthState(tenantId.trim()),
  })
}

export async function handleCallback(code: string, tenantId: string): Promise<RfCalendarWatch> {
  if (!code?.trim()) {
    throw new Error("OAuth code is required")
  }

  const tenant = await ensureActiveTenant(tenantId)
  const oauthClient = createOAuthClient()
  const existingTokenRow = await getGoogleTokenRow(tenant.id)

  const tokenResponse = await oauthClient.getToken(code.trim())
  const tokens = tokenResponse.tokens

  const accessToken = tokens.access_token || (existingTokenRow ? decrypt(existingTokenRow.accessTokenEnc) : null)
  const refreshToken = tokens.refresh_token || (existingTokenRow ? decrypt(existingTokenRow.refreshTokenEnc) : null)

  if (!accessToken || !refreshToken) {
    throw new Error("Google OAuth token exchange did not return usable access and refresh tokens")
  }

  const tokenExpiry = pickTokenExpiry(tokens.expiry_date, existingTokenRow?.tokenExpiry ?? null)
  const scopes = parseScopes(tokens.scope, existingTokenRow?.scopes ?? null)

  await rfDb
    .insert(rfGoogleOauthTokens)
    .values({
      tenantId: tenant.id,
      accessTokenEnc: encrypt(accessToken),
      refreshTokenEnc: encrypt(refreshToken),
      tokenExpiry,
      scopes,
      googleEmail: existingTokenRow?.googleEmail ?? null,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: rfGoogleOauthTokens.tenantId,
      set: {
        accessTokenEnc: encrypt(accessToken),
        refreshTokenEnc: encrypt(refreshToken),
        tokenExpiry,
        scopes,
        googleEmail: existingTokenRow?.googleEmail ?? null,
        updatedAt: new Date(),
      },
    })

  return createWatch(tenant.id, "primary")
}

interface CreateWatchOptions {
  skipLimitCheck?: boolean
  ignoreExistingCalendarWatch?: boolean
}

export async function createWatch(
  tenantId: string,
  calendarId = "primary",
  options: CreateWatchOptions = {},
): Promise<RfCalendarWatch> {
  const tenant = await ensureActiveTenant(tenantId)
  const normalizedCalendarId = calendarId.trim() || "primary"

  if (!options.ignoreExistingCalendarWatch) {
    const existingWatch = await rfDb.query.rfCalendarWatches.findFirst({
      where: and(
        eq(rfCalendarWatches.tenantId, tenant.id),
        eq(rfCalendarWatches.calendarId, normalizedCalendarId),
        eq(rfCalendarWatches.isActive, true),
      ),
    })

    if (existingWatch) {
      return existingWatch
    }
  }

  if (!options.skipLimitCheck) {
    const activeWatchCount = await countActiveWatches(tenant.id)

    if (activeWatchCount >= tenant.calendarLimit) {
      throw new Error(CALENDAR_LIMIT_REACHED_MESSAGE)
    }
  }

  const context = await createTenantCalendarContext(tenant.id)

  const requestedChannelId = crypto.randomUUID()
  const watchResponse = await context.calendarClient.events.watch({
    calendarId: normalizedCalendarId,
    requestBody: {
      id: requestedChannelId,
      type: "web_hook",
      address: getGoogleWebhookAddress(),
      params: {
        ttl: `${GOOGLE_WATCH_TTL_SECONDS}`,
      },
    },
  })

  await persistUpdatedTokens(context)

  const responseChannelId = watchResponse.data.id || requestedChannelId
  const expirationMs = Number(watchResponse.data.expiration)
  const expiration = Number.isFinite(expirationMs) && expirationMs > 0
    ? new Date(expirationMs)
    : new Date(Date.now() + GOOGLE_WATCH_TTL_SECONDS * 1000)

  const [createdWatch] = await rfDb
    .insert(rfCalendarWatches)
    .values({
      tenantId: tenant.id,
      calendarId: normalizedCalendarId,
      channelId: responseChannelId,
      resourceId: watchResponse.data.resourceId ?? null,
      expiration,
      isActive: true,
    })
    .returning()

  if (!createdWatch) {
    throw new Error("Failed to store calendar watch")
  }

  return createdWatch
}

export async function renewWatch(watchId: string): Promise<RfCalendarWatch> {
  const existingWatch = await rfDb.query.rfCalendarWatches.findFirst({
    where: and(eq(rfCalendarWatches.id, watchId), eq(rfCalendarWatches.isActive, true)),
  })

  if (!existingWatch) {
    throw new Error("Calendar watch not found or already inactive")
  }

  const renewedWatch = await createWatch(existingWatch.tenantId, existingWatch.calendarId, {
    skipLimitCheck: true,
    ignoreExistingCalendarWatch: true,
  })

  try {
    const context = await createTenantCalendarContext(existingWatch.tenantId)
    await stopWatchChannel(context, existingWatch)
    await persistUpdatedTokens(context)
  } catch {
    // best-effort stop
  }

  await rfDb
    .update(rfCalendarWatches)
    .set({ isActive: false })
    .where(eq(rfCalendarWatches.id, existingWatch.id))

  return renewedWatch
}

export async function disconnectCalendar(tenantId: string): Promise<{
  stoppedWatches: number
  deactivatedWatches: number
  deletedTokens: number
}> {
  await ensureActiveTenant(tenantId)

  const stopResult = await deactivateActiveWatchesForTenant(tenantId)

  const deletedTokens = await rfDb
    .delete(rfGoogleOauthTokens)
    .where(eq(rfGoogleOauthTokens.tenantId, tenantId))
    .returning({ id: rfGoogleOauthTokens.id })

  return {
    stoppedWatches: stopResult.stopped,
    deactivatedWatches: stopResult.deactivated,
    deletedTokens: deletedTokens.length,
  }
}

export async function processWebhookNotification(
  channelId: string,
  resourceId: string | null | undefined,
): Promise<CalendarWebhookProcessingResult> {
  const trimmedChannelId = channelId.trim()
  if (!trimmedChannelId) {
    throw new Error("channelId is required")
  }

  const watch = await rfDb.query.rfCalendarWatches.findFirst({
    where: and(eq(rfCalendarWatches.channelId, trimmedChannelId), eq(rfCalendarWatches.isActive, true)),
  })

  if (!watch) {
    return {
      processed: false,
      reason: "watch_not_found",
      inspectedEvents: 0,
      queuedReviewRequests: 0,
    }
  }

  if (resourceId && watch.resourceId && resourceId !== watch.resourceId) {
    return {
      processed: false,
      reason: "resource_mismatch",
      inspectedEvents: 0,
      queuedReviewRequests: 0,
    }
  }

  const tenant = await rfDb.query.rfTenants.findFirst({
    where: and(eq(rfTenants.id, watch.tenantId), eq(rfTenants.isActive, true)),
  })

  if (!tenant) {
    return {
      processed: false,
      reason: "tenant_not_found",
      inspectedEvents: 0,
      queuedReviewRequests: 0,
    }
  }

  const context = await createTenantCalendarContext(watch.tenantId)

  let changedEvents: ChangedCalendarEvents
  try {
    changedEvents = await listChangedEvents(context, watch.calendarId, watch.syncToken)
  } catch (error) {
    if (!watch.syncToken || !isInvalidSyncTokenError(error)) {
      throw error
    }

    await rfDb
      .update(rfCalendarWatches)
      .set({ syncToken: null })
      .where(eq(rfCalendarWatches.id, watch.id))

    changedEvents = await listChangedEvents(context, watch.calendarId, null)
  } finally {
    await persistUpdatedTokens(context)
  }

  const now = Date.now()
  const lookbackStart = now - COMPLETED_APPOINTMENT_LOOKBACK_MS
  let queuedReviewRequests = 0

  for (const event of changedEvents.events) {
    if (event.status === "cancelled") {
      continue
    }

    const appointmentEnd = toEventEnd(event)
    if (!appointmentEnd) {
      continue
    }

    const appointmentEndMs = appointmentEnd.getTime()
    if (appointmentEndMs > now || appointmentEndMs < lookbackStart) {
      continue
    }

    const queued = await queueReviewRequestFromEvent({
      watch,
      tenant,
      event,
      appointmentEnd,
    })

    if (queued) {
      queuedReviewRequests += 1
    }
  }

  if (changedEvents.nextSyncToken) {
    await rfDb
      .update(rfCalendarWatches)
      .set({ syncToken: changedEvents.nextSyncToken })
      .where(eq(rfCalendarWatches.id, watch.id))
  }

  return {
    processed: true,
    inspectedEvents: changedEvents.events.length,
    queuedReviewRequests,
  }
}
