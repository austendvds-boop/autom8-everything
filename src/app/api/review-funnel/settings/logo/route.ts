import fs from "node:fs"
import path from "node:path"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfTenants } from "@/lib/review-funnel/db/schema"
import { requireReviewFunnelDashboardAuth } from "@/lib/review-funnel/middleware"

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024
const ALLOWED_MIME_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/svg+xml"])

const EXTENSION_BY_MIME_TYPE: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/svg+xml": "svg",
}

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  const authResult = await requireReviewFunnelDashboardAuth(request)

  if (!authResult.ok) {
    return authResult.response
  }

  const formData = await request.formData()
  const file = formData.get("logo")

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Please choose a logo file to upload." }, { status: 400 })
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Logo must be a PNG, JPG, WEBP, or SVG file." }, { status: 400 })
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json({ error: "Logo must be 2MB or smaller." }, { status: 400 })
  }

  const extension = EXTENSION_BY_MIME_TYPE[file.type]
  const filename = `${authResult.tenant.id}-${Date.now()}.${extension}`
  const relativeLogoPath = `/uploads/review-funnel/logos/${filename}`
  const uploadsDirectory = path.join(process.cwd(), "public", "uploads", "review-funnel", "logos")
  const absoluteLogoPath = path.join(uploadsDirectory, filename)

  fs.mkdirSync(uploadsDirectory, { recursive: true })

  const buffer = Buffer.from(await file.arrayBuffer())
  fs.writeFileSync(absoluteLogoPath, buffer)

  await rfDb
    .update(rfTenants)
    .set({
      logoUrl: relativeLogoPath,
      updatedAt: new Date(),
    })
    .where(eq(rfTenants.id, authResult.tenant.id))

  return NextResponse.json({ logoUrl: relativeLogoPath })
}
