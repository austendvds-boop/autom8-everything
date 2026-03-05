import { z } from "zod"

const optionalEnvString = z.preprocess(
  (value) => {
    if (typeof value !== "string") return value
    const trimmed = value.trim()
    return trimmed.length === 0 ? undefined : trimmed
  },
  z.string().optional(),
)

const BUILD_PLACEHOLDER_DATABASE_URL = "postgres://build:build@localhost:5432/review-funnel"
const BUILD_PLACEHOLDER_ENCRYPTION_KEY = "0000000000000000000000000000000000000000000000000000000000000000"
const BUILD_PLACEHOLDER_JWT_SECRET = "review-funnel-build-placeholder-secret"

function getReviewFunnelEnvSource() {
  const envSource: Record<string, string | undefined> = {
    ...process.env,
  }

  if (process.env.NEXT_PHASE === "phase-production-build") {
    envSource.DATABASE_URL ??= BUILD_PLACEHOLDER_DATABASE_URL
    envSource.RF_ENCRYPTION_KEY ??= BUILD_PLACEHOLDER_ENCRYPTION_KEY
    envSource.RF_JWT_SECRET ??= BUILD_PLACEHOLDER_JWT_SECRET
  }

  return envSource
}

export const reviewFunnelEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),

  RF_ENCRYPTION_KEY: z
    .string()
    .regex(/^[0-9a-fA-F]{64}$/, "RF_ENCRYPTION_KEY must be 64 hex characters (32 bytes)"),
  RF_JWT_SECRET: z.string().min(32, "RF_JWT_SECRET must be at least 32 characters"),
  RF_MAGIC_LINK_TTL_MINUTES: z.coerce.number().int().positive().default(15),
  RF_SESSION_TTL_HOURS: z.coerce.number().int().positive().default(24),

  RF_GMAIL_CREDENTIALS_PATH: optionalEnvString,

  TWILIO_ACCOUNT_SID: optionalEnvString,
  TWILIO_AUTH_TOKEN: optionalEnvString,
  RF_TWILIO_PHONE_NUMBER: optionalEnvString,
  RF_TWILIO_MESSAGING_SERVICE_SID: optionalEnvString,

  STRIPE_SECRET_KEY: optionalEnvString,
  RF_STRIPE_WEBHOOK_SECRET: optionalEnvString,
  RF_STRIPE_PRICE_STARTER: optionalEnvString,
  RF_STRIPE_PRICE_GROWTH: optionalEnvString,
  RF_STRIPE_PRICE_PRO: optionalEnvString,

  RF_QUIET_HOURS_START: z.coerce.number().int().min(0).max(23).default(21),
  RF_QUIET_HOURS_END: z.coerce.number().int().min(0).max(23).default(9),
})

export type ReviewFunnelConfig = z.infer<typeof reviewFunnelEnvSchema>

export const reviewFunnelConfig: ReviewFunnelConfig = reviewFunnelEnvSchema.parse(getReviewFunnelEnvSource())
