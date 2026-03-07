import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { requirePortalAuth } from "@/lib/platform/portal-middleware"
import { platformDb } from "@/lib/platform/db/client"
import { a8ClientServices } from "@/lib/platform/db/schema"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const authResult = await requirePortalAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const services = await platformDb.query.a8ClientServices.findMany({
    where: eq(a8ClientServices.clientId, authResult.client.id),
    columns: {
      serviceType: true,
      status: true,
      cadenceTenantId: true,
      rfTenantId: true,
      provisionedAt: true,
    },
  })

  return NextResponse.json({
    client: {
      id: authResult.client.id,
      businessName: authResult.client.businessName,
      contactName: authResult.client.contactName,
      email: authResult.client.email,
      phone: authResult.client.phone,
    },
    services,
  })
}
