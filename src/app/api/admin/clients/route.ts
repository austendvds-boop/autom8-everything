import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { desc } from "drizzle-orm"
import { requireAdminAuth } from "@/lib/platform/admin-middleware"
import { platformDb } from "@/lib/platform/db/client"
import { a8Clients } from "@/lib/platform/db/schema"

const createClientSchema = z.object({
  businessName: z.string().trim().min(1),
  contactName: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().max(20).optional(),
  notes: z.string().trim().optional(),
})

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const authResult = await requireAdminAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  const clients = await platformDb.query.a8Clients.findMany({
    orderBy: [desc(a8Clients.createdAt)],
  })

  const services = await platformDb.query.a8ClientServices.findMany({
    columns: {
      clientId: true,
      serviceType: true,
      status: true,
      provisionedAt: true,
    },
  })

  const servicesByClient = new Map<string, Array<{ serviceType: string; status: string; provisionedAt: Date | null }>>()

  for (const service of services) {
    const clientServices = servicesByClient.get(service.clientId) ?? []
    clientServices.push({
      serviceType: service.serviceType,
      status: service.status,
      provisionedAt: service.provisionedAt,
    })
    servicesByClient.set(service.clientId, clientServices)
  }

  return NextResponse.json({
    clients: clients.map((client) => ({
      id: client.id,
      businessName: client.businessName,
      contactName: client.contactName,
      email: client.email,
      phone: client.phone,
      isActive: client.isActive,
      services: servicesByClient.get(client.id) ?? [],
      createdAt: client.createdAt,
    })),
  })
}

export async function POST(request: NextRequest) {
  const authResult = await requireAdminAuth(request)
  if (!authResult.ok) {
    return authResult.response
  }

  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 })
  }

  const parsedBody = createClientSchema.safeParse(rawBody)

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error: "Invalid client payload",
        details: parsedBody.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    )
  }

  const payload = parsedBody.data

  const [client] = await platformDb
    .insert(a8Clients)
    .values({
      businessName: payload.businessName,
      contactName: payload.contactName,
      email: payload.email.trim().toLowerCase(),
      phone: payload.phone?.trim() || null,
      notes: payload.notes?.trim() || null,
    })
    .returning()

  if (!client) {
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 })
  }

  return NextResponse.json({
    client,
  })
}
