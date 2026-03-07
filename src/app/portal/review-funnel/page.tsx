import type { Metadata } from "next"
import PortalReviewFunnelClient from "./PortalReviewFunnelClient"

export const metadata: Metadata = {
  title: "Review Funnel — Portal",
  robots: {
    index: false,
    follow: false,
  },
}

export default function PortalReviewFunnelPage() {
  return <PortalReviewFunnelClient />
}
