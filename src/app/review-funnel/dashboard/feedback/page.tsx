import type { Metadata } from "next"
import FeedbackClient from "./FeedbackClient"

export const metadata: Metadata = {
  title: "Review Funnel Feedback",
  description: "Review private low-rating feedback captured before public reviews.",
}

export default function ReviewFunnelFeedbackPage() {
  return <FeedbackClient />
}
