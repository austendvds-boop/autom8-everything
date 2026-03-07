import type { Metadata } from "next"
import ReviewsClient from "./ReviewsClient"

export const metadata: Metadata = {
  title: "Review Funnel Reviews",
  description: "Browse, filter, and inspect every review request for your business.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ReviewFunnelReviewsPage() {
  return <ReviewsClient />
}
