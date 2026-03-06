import fs from "node:fs"
import nodemailer from "nodemailer"
import { platformConfig } from "../config"

const DEFAULT_GMAIL_CREDENTIALS_PATH = "C:\\Users\\austen\\.openclaw\\credentials\\gmail-autom8.txt"
const PORTAL_ORIGIN = "https://autom8everything.com"
const EMAIL_FROM = "aust@autom8everything.com"

interface GmailSmtpCredentials {
  user: string
  appPassword: string
}

interface SendPortalMagicLinkEmailParams {
  toEmail: string
  token: string
}

interface SendWelcomeEmailParams {
  toEmail: string
  clientName: string
  serviceName: "cadence" | "review_funnel"
  magicLinkToken: string
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
    cleanValue(DEFAULT_GMAIL_CREDENTIALS_PATH) ||
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

function buildPortalMagicLinkUrl(token: string): string {
  return `${PORTAL_ORIGIN}/api/portal/auth/verify?token=${encodeURIComponent(token)}`
}

function serviceDescription(serviceName: "cadence" | "review_funnel"): string {
  if (serviceName === "cadence") {
    return "Your AI receptionist is set up. Log in to customize your script, business hours, and booking link."
  }

  return "Your Review Funnel is active. Log in to see your dashboard and track reviews."
}

function buildShell({
  title,
  body,
  buttonLabel,
  buttonUrl,
  footer,
}: {
  title: string
  body: string
  buttonLabel: string
  buttonUrl: string
  footer: string
}) {
  return `
    <div style="margin:0;padding:24px;background:#0A0A0F;font-family:Inter,Arial,sans-serif;color:#FAFAFA;">
      <div style="max-width:560px;margin:0 auto;background:#12121A;border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:28px;">
        <p style="margin:0 0 12px 0;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#A78BFA;">Autom8 Everything</p>
        <h1 style="margin:0 0 12px 0;font-size:28px;line-height:1.2;">${title}</h1>
        <p style="margin:0 0 24px 0;font-size:16px;line-height:1.6;color:#D4D4D8;">${body}</p>
        <a href="${buttonUrl}" style="display:inline-block;padding:14px 22px;border-radius:9999px;background:linear-gradient(90deg,#8B5CF6,#A78BFA);color:#FFFFFF;text-decoration:none;font-weight:600;">
          ${buttonLabel}
        </a>
        <p style="margin:20px 0 0 0;font-size:14px;line-height:1.6;color:#A1A1AA;">${footer}</p>
      </div>
    </div>
  `
}

export async function sendPortalMagicLinkEmail({ toEmail, token }: SendPortalMagicLinkEmailParams): Promise<void> {
  const destination = cleanValue(toEmail)

  if (!destination) {
    throw new Error("A destination email is required")
  }

  const linkUrl = buildPortalMagicLinkUrl(token)

  await getTransporter().sendMail({
    from: EMAIL_FROM,
    to: destination,
    subject: "Your Autom8 portal login link",
    text: `Use this link to log in to your portal: ${linkUrl}\n\nThis link expires in ${platformConfig.A8_MAGIC_LINK_TTL_MINUTES} minutes.`,
    html: buildShell({
      title: "Your login link is ready",
      body: "Tap the button below to log in to your Autom8 portal.",
      buttonLabel: "Log in to your portal",
      buttonUrl: linkUrl,
      footer: `This link expires in ${platformConfig.A8_MAGIC_LINK_TTL_MINUTES} minutes. If you did not request this, you can ignore this email.`,
    }),
  })
}

export async function sendWelcomeEmail({
  toEmail,
  clientName,
  serviceName,
  magicLinkToken,
}: SendWelcomeEmailParams): Promise<void> {
  const destination = cleanValue(toEmail)

  if (!destination) {
    throw new Error("A destination email is required")
  }

  const linkUrl = buildPortalMagicLinkUrl(magicLinkToken)
  const serviceLabel = serviceName === "cadence" ? "Cadence" : "Review Funnel"

  await getTransporter().sendMail({
    from: EMAIL_FROM,
    to: destination,
    subject: `Welcome to ${serviceLabel}`,
    text: `${clientName}, ${serviceDescription(serviceName)}\n\nLog in here: ${linkUrl}`,
    html: buildShell({
      title: `Welcome to ${serviceLabel}`,
      body: `${clientName}, ${serviceDescription(serviceName)}`,
      buttonLabel: "Open your portal",
      buttonUrl: linkUrl,
      footer: "You can use this link to jump straight into your dashboard and start customizing your setup.",
    }),
  })
}
