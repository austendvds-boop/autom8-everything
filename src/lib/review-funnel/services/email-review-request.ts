import fs from "node:fs"
import nodemailer from "nodemailer"
import { and, eq } from "drizzle-orm"
import { rfDb } from "../db/client"
import { rfLocations, rfReviewRequests, rfTenants } from "../db/schema"
import { reviewFunnelConfig } from "../config"

const DEFAULT_GMAIL_CREDENTIALS_PATH = "C:\\Users\\austen\\.openclaw\\credentials\\gmail-autom8.txt"
const REVIEW_REQUEST_FROM = "aust@autom8everything.com"

interface GmailSmtpCredentials {
  user: string
  appPassword: string
}

let cachedTransporter: nodemailer.Transporter | null = null

function cleanValue(value: string | null | undefined): string | null {
  if (!value) return null
  const cleaned = value.trim()
  return cleaned.length > 0 ? cleaned : null
}

function parseCredentialFile(content: string): GmailSmtpCredentials | null {
  const lines = content.split(/\r?\n/)
  const parsed = new Map<string, string>()

  for (const line of lines) {
    const separatorIndex = line.indexOf(":")
    if (separatorIndex === -1) continue

    const key = line.slice(0, separatorIndex).trim().toLowerCase()
    const value = line.slice(separatorIndex + 1).trim()

    if (!key || !value) continue
    parsed.set(key, value)
  }

  const user = cleanValue(parsed.get("email"))
  const appPassword = cleanValue(parsed.get("app_password"))

  if (!user || !appPassword) {
    return null
  }

  return {
    user,
    appPassword: appPassword.replace(/\s+/g, ""),
  }
}

function readCredentialFile(filePath: string): GmailSmtpCredentials | null {
  try {
    if (!fs.existsSync(filePath)) {
      return null
    }

    const content = fs.readFileSync(filePath, "utf8")
    return parseCredentialFile(content)
  } catch {
    return null
  }
}

function resolveSmtpCredentials(): GmailSmtpCredentials {
  const envUser = cleanValue(process.env.RF_SMTP_USER) || cleanValue(process.env.GMAIL_SMTP_USER)
  const envAppPassword = cleanValue(process.env.RF_SMTP_PASS) || cleanValue(process.env.GMAIL_SMTP_APP_PASSWORD)

  if (envUser && envAppPassword) {
    return {
      user: envUser,
      appPassword: envAppPassword.replace(/\s+/g, ""),
    }
  }

  const credentialPath =
    cleanValue(process.env.RF_GMAIL_CREDENTIALS_PATH) ||
    cleanValue(reviewFunnelConfig.RF_GMAIL_CREDENTIALS_PATH) ||
    DEFAULT_GMAIL_CREDENTIALS_PATH

  const fromFile = readCredentialFile(credentialPath)

  if (fromFile) {
    return fromFile
  }

  throw new Error("Gmail SMTP credentials are not configured")
}

function getTransporter() {
  if (cachedTransporter) {
    return cachedTransporter
  }

  const credentials = resolveSmtpCredentials()

  cachedTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: credentials.user,
      pass: credentials.appPassword,
    },
  })

  return cachedTransporter
}

function buildReviewRequestEmailHtml({
  businessName,
  locationName,
  reviewUrl,
}: {
  businessName: string
  locationName: string | null
  reviewUrl: string
}): string {
  const body = locationName
    ? `Thanks for visiting ${locationName}. We'd love your feedback about your experience with ${businessName}.`
    : `Thanks for choosing ${businessName}. We'd love your feedback about your experience.`

  return `
    <div style="margin:0;padding:24px;background:#0A0A0F;font-family:Inter,Arial,sans-serif;color:#FAFAFA;">
      <div style="max-width:560px;margin:0 auto;background:#12121A;border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:28px;">
        <p style="margin:0 0 12px 0;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#A78BFA;">${businessName}</p>
        <h1 style="margin:0 0 12px 0;font-size:28px;line-height:1.2;">We'd love your feedback</h1>
        <p style="margin:0 0 24px 0;font-size:16px;line-height:1.6;color:#D4D4D8;">${body}</p>
        <a href="${reviewUrl}" style="display:inline-block;padding:14px 22px;border-radius:9999px;background:linear-gradient(90deg,#8B5CF6,#A78BFA);color:#FFFFFF;text-decoration:none;font-weight:600;">
          Leave a Review
        </a>
        <p style="margin:20px 0 0 0;font-size:14px;line-height:1.6;color:#A1A1AA;">
          It only takes a moment, and your feedback helps ${businessName} keep improving.
        </p>
      </div>
    </div>
  `
}

export async function sendReviewRequestEmail(reviewRequestId: string): Promise<void> {
  const reviewRequest = await rfDb.query.rfReviewRequests.findFirst({
    where: eq(rfReviewRequests.id, reviewRequestId),
    columns: {
      id: true,
      tenantId: true,
      locationId: true,
      customerEmail: true,
    },
  })

  if (!reviewRequest) {
    throw new Error(`Review request not found: ${reviewRequestId}`)
  }

  const destination = cleanValue(reviewRequest.customerEmail)

  if (!destination) {
    throw new Error(`Review request ${reviewRequestId} does not have a customer email`)
  }

  const tenant = await rfDb.query.rfTenants.findFirst({
    where: and(eq(rfTenants.id, reviewRequest.tenantId), eq(rfTenants.isActive, true)),
    columns: {
      businessName: true,
    },
  })

  if (!tenant) {
    throw new Error(`Active tenant not found for review request: ${reviewRequestId}`)
  }

  const location = reviewRequest.locationId
    ? await rfDb.query.rfLocations.findFirst({
        where: and(eq(rfLocations.id, reviewRequest.locationId), eq(rfLocations.tenantId, reviewRequest.tenantId)),
        columns: {
          name: true,
        },
      })
    : null

  const reviewUrl = new URL(`/r/${reviewRequest.id}`, reviewFunnelConfig.NEXT_PUBLIC_SITE_URL).toString()
  const subject = `${tenant.businessName} - We'd love your feedback`

  await getTransporter().sendMail({
    from: REVIEW_REQUEST_FROM,
    to: destination,
    subject,
    text: `We'd love your feedback. Leave a review here: ${reviewUrl}`,
    html: buildReviewRequestEmailHtml({
      businessName: tenant.businessName,
      locationName: location?.name ?? null,
      reviewUrl,
    }),
  })
}
