import type { Metadata } from "next"
import FeedbackClient from "./FeedbackClient"

export const metadata: Metadata = {
  title: "Review Funnel Feedback",
  description: "Read private lower-star feedback from customers so your team can follow up quickly.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ReviewFunnelFeedbackPage() {
  return <FeedbackClient />
}
