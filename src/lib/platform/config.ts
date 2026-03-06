import { z } from "zod"

const BUILD_PLACEHOLDER_DATABASE_URL = "postgres://build:build@localhost:5432/platform"
const BUILD_PLACEHOLDER_ADMIN_SECRET = "build-placeholder-admin-secret-0000"
const BUILD_PLACEHOLDER_JWT_SECRET = "build-placeholder-jwt-secret-00000000000000"
const BUILD_PLACEHOLDER_CADENCE_API_URL = "https://placeholder.example.com"
const BUILD_PLACEHOLDER_PORTAL_API_SECRET = "build-placeholder-portal-secret"

function getPlatformEnvSource() {
  const envSource: Record<string, string | undefined> = {
    ...process.env,
  }

  if (process.env.NEXT_PHASE === "phase-production-build") {
    envSource.DATABASE_URL ??= BUILD_PLACEHOLDER_DATABASE_URL
    envSource.A8_ADMIN_SECRET ??= BUILD_PLACEHOLDER_ADMIN_SECRET
    envSource.A8_JWT_SECRET ??= BUILD_PLACEHOLDER_JWT_SECRET
    envSource.CADENCE_API_URL ??= BUILD_PLACEHOLDER_CADENCE_API_URL
    envSource.PORTAL_API_SECRET ??= BUILD_PLACEHOLDER_PORTAL_API_SECRET
  }

  return envSource
}

export const platformEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),

  A8_ADMIN_SECRET: z.string().min(16, "A8_ADMIN_SECRET must be at least 16 characters"),
  A8_JWT_SECRET: z.string().min(32, "A8_JWT_SECRET must be at least 32 characters"),
  A8_MAGIC_LINK_TTL_MINUTES: z.coerce.number().int().positive().default(15),
  A8_SESSION_TTL_HOURS: z.coerce.number().int().positive().default(24),

  CADENCE_API_URL: z.string().min(1, "CADENCE_API_URL is required"),
  PORTAL_API_SECRET: z.string().min(16, "PORTAL_API_SECRET must be at least 16 characters"),
})

export type PlatformConfig = z.infer<typeof platformEnvSchema>

export const platformConfig: PlatformConfig = platformEnvSchema.parse(getPlatformEnvSource())
