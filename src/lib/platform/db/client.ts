import { neon, neonConfig } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { platformConfig } from "../config"
import { reviewFunnelSchema } from "../../review-funnel/db/schema"
import { platformSchema } from "./schema"

neonConfig.fetchConnectionCache = true

export function createPlatformDb(databaseUrl = platformConfig.DATABASE_URL) {
  const sql = neon(databaseUrl)
  return drizzle(sql, {
    schema: {
      ...platformSchema,
      ...reviewFunnelSchema,
    },
  })
}

type PlatformDb = ReturnType<typeof createPlatformDb>

const globalForPlatformDb = globalThis as typeof globalThis & {
  __platformDb?: PlatformDb
}

export const platformDb = globalForPlatformDb.__platformDb ?? createPlatformDb()

if (process.env.NODE_ENV !== "production") {
  globalForPlatformDb.__platformDb = platformDb
}

export type { PlatformDb }
