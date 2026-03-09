import { NextResponse } from "next/server"
import { sql } from "drizzle-orm"
import { platformDb } from "@/lib/platform/db/client"
import { rfDb } from "@/lib/review-funnel/db/client"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const REQUIRED_TABLES = [
  "a8_clients",
  "a8_client_services",
  "a8_magic_links",
  "rf_tenants",
  "rf_locations",
  "rf_google_oauth_tokens",
  "rf_calendar_watches",
  "rf_review_requests",
  "rf_pending_sms",
  "rf_sms_opt_outs",
  "rf_sms_usage",
  "rf_magic_links",
  "rf_consent_log",
] as const

type RequiredTable = (typeof REQUIRED_TABLES)[number]
type TableRow = { table_name: string }
type ColumnRow = { column_name: string }

function hasEnvValue(name: string): boolean {
  return Boolean(process.env[name]?.trim())
}

async function checkCadenceReachability() {
  const cadenceApiUrl = process.env.CADENCE_API_URL?.trim()

  if (!cadenceApiUrl) {
    return false
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5_000)

  try {
    const response = await fetch(cadenceApiUrl, {
      cache: "no-store",
      signal: controller.signal,
    })

    if (!response.ok) {
      return false
    }

    const payload = (await response.json().catch(() => null)) as { status?: string } | null
    return payload?.status === "ok"
  } catch {
    return false
  } finally {
    clearTimeout(timeout)
  }
}

export async function GET() {
  const envChecks = {
    NEXT_PUBLIC_SITE_URL: hasEnvValue("NEXT_PUBLIC_SITE_URL"),
    DATABASE_URL: hasEnvValue("DATABASE_URL"),
    STRIPE_SECRET_KEY: hasEnvValue("STRIPE_SECRET_KEY"),
    A8_ADMIN_SECRET: hasEnvValue("A8_ADMIN_SECRET"),
    A8_JWT_SECRET: hasEnvValue("A8_JWT_SECRET"),
    RF_ENCRYPTION_KEY: hasEnvValue("RF_ENCRYPTION_KEY"),
    RF_JWT_SECRET: hasEnvValue("RF_JWT_SECRET"),
    CRON_SECRET: hasEnvValue("CRON_SECRET"),
    CADENCE_API_URL: hasEnvValue("CADENCE_API_URL"),
    PORTAL_API_SECRET: hasEnvValue("PORTAL_API_SECRET"),
  }

  let platformDatabase = false
  let reviewFunnelDatabase = false
  let existingTables: RequiredTable[] = []
  let missingTables: RequiredTable[] = [...REQUIRED_TABLES]
  let hasReviewPlatformColumn = false

  try {
    await platformDb.execute(sql`SELECT 1`)
    platformDatabase = true
  } catch {
    platformDatabase = false
  }

  try {
    await rfDb.execute(sql`SELECT 1`)
    reviewFunnelDatabase = true
  } catch {
    reviewFunnelDatabase = false
  }

  try {
    const result = await platformDb.execute<TableRow>(
      sql`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_name IN (
            'a8_clients',
            'a8_client_services',
            'a8_magic_links',
            'rf_tenants',
            'rf_locations',
            'rf_google_oauth_tokens',
            'rf_calendar_watches',
            'rf_review_requests',
            'rf_pending_sms',
            'rf_sms_opt_outs',
            'rf_sms_usage',
            'rf_magic_links',
            'rf_consent_log'
          )
      `,
    )

    const existingTableSet = new Set(
      result.rows.map((row) => row.table_name).filter((tableName): tableName is RequiredTable =>
        REQUIRED_TABLES.includes(tableName as RequiredTable),
      ),
    )

    existingTables = REQUIRED_TABLES.filter((tableName) => existingTableSet.has(tableName))
    missingTables = REQUIRED_TABLES.filter((tableName) => !existingTableSet.has(tableName))
  } catch {
    existingTables = []
    missingTables = [...REQUIRED_TABLES]
  }

  try {
    const result = await platformDb.execute<ColumnRow>(
      sql`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'rf_tenants' AND column_name = 'review_platform'
      `,
    )
    hasReviewPlatformColumn = result.rows.some((row) => row.column_name === "review_platform")
  } catch {
    hasReviewPlatformColumn = false
  }

  const cadenceReachable = await checkCadenceReachability()
  const migrations = {
    tables: {
      existing: existingTables,
      missing: missingTables,
    },
    columns: {
      "rf_tenants.review_platform": hasReviewPlatformColumn,
    },
  }

  const checks = {
    db: {
      rfDb: reviewFunnelDatabase,
      platformDb: platformDatabase,
    },
    env: envChecks,
    cadence: {
      reachable: cadenceReachable,
    },
  }

  const healthy =
    platformDatabase &&
    reviewFunnelDatabase &&
    Object.values(envChecks).every(Boolean) &&
    missingTables.length === 0 &&
    hasReviewPlatformColumn &&
    cadenceReachable

  return NextResponse.json(
    {
      healthy,
      checks,
      migrations,
      timestamp: new Date().toISOString(),
    },
    { status: healthy ? 200 : 503 },
  )
}
