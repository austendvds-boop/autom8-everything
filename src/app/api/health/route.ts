import { NextResponse } from "next/server"
import { sql } from "drizzle-orm"
import { platformDb } from "@/lib/platform/db/client"
import { rfDb } from "@/lib/review-funnel/db/client"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

type TableCheckResult = string | null

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
  let a8ClientsTable: TableCheckResult = null
  let rfConsentLogTable: TableCheckResult = null

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
    const result = await platformDb.execute<{ table_name: TableCheckResult }>(
      sql`SELECT to_regclass('public.a8_clients') AS table_name`,
    )
    a8ClientsTable = result.rows[0]?.table_name ?? null
  } catch {
    a8ClientsTable = null
  }

  try {
    const result = await rfDb.execute<{ table_name: TableCheckResult }>(
      sql`SELECT to_regclass('public.rf_consent_log') AS table_name`,
    )
    rfConsentLogTable = result.rows[0]?.table_name ?? null
  } catch {
    rfConsentLogTable = null
  }

  const cadenceReachable = await checkCadenceReachability()

  const checks = {
    db: {
      rfDb: reviewFunnelDatabase,
      platformDb: platformDatabase,
    },
    env: envChecks,
    tables: {
      a8_clients: a8ClientsTable,
      rf_consent_log: rfConsentLogTable,
    },
    cadence: {
      reachable: cadenceReachable,
    },
  }

  const healthy =
    platformDatabase &&
    reviewFunnelDatabase &&
    Object.values(envChecks).every(Boolean) &&
    a8ClientsTable !== null &&
    rfConsentLogTable !== null &&
    cadenceReachable

  return NextResponse.json(
    {
      healthy,
      checks,
      timestamp: new Date().toISOString(),
    },
    { status: healthy ? 200 : 503 },
  )
}
