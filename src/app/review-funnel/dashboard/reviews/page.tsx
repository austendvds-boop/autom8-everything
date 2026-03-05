import type { Metadata } from "next"
import ReviewsClient from "./ReviewsClient"

export const metadata: Metadata = {
  title: "Review Funnel Reviews",
  description: "Browse, filter, and inspect every review request in your funnel.",
}

export default function ReviewFunnelReviewsPage() {
  return <ReviewsClient />
}
