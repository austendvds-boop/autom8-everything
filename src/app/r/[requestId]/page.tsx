import type { Metadata } from "next"
import { and, eq } from "drizzle-orm"
import FunnelClient from "./FunnelClient"
import { rfDb } from "@/lib/review-funnel/db/client"
import { rfReviewRequests, rfTenants } from "@/lib/review-funnel/db/schema"
import { defaultOgImage } from "@/lib/seo"

const FALLBACK_TITLE = "Share Your Experience"
const FALLBACK_DESCRIPTION = "We'd love to hear about your recent experience."

export const dynamic = "force-dynamic"

async function getBusinessNameForRequest(requestId: string): Promise<string | null> {
  try {
    const [record] = await rfDb
      .select({
        businessName: rfTenants.businessName,
      })
      .from(rfReviewRequests)
      .innerJoin(rfTenants, eq(rfReviewRequests.tenantId, rfTenants.id))
      .where(and(eq(rfReviewRequests.id, requestId), eq(rfTenants.isActive, true)))
      .limit(1)

    return record?.businessName ?? null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ requestId: string }> }): Promise<Metadata> {
  const { requestId } = await params
  const businessName = await getBusinessNameForRequest(requestId)

  const title = businessName ? `Leave a review for ${businessName}` : FALLBACK_TITLE
  const description = businessName
    ? `Thanks for choosing ${businessName}. We'd appreciate your quick feedback.`
    : FALLBACK_DESCRIPTION

  return {
    title,
    description,
    alternates: {
      canonical: `/r/${requestId}`,
    },
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title,
      description,
      url: `/r/${requestId}`,
      siteName: businessName ?? "Autom8 Everything",
      type: "website",
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: businessName ? `${businessName} review request` : "Review request",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage],
    },
  }
}

export default async function ReviewFunnelPage({ params }: { params: Promise<{ requestId: string }> }) {
  const { requestId } = await params

  return <FunnelClient requestId={requestId} />
}
