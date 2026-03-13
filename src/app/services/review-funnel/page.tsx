import type { Metadata } from "next";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";
import ReviewFunnelPageClient from "@/app/services/review-funnel/ReviewFunnelPageClient";

const reviewFunnelFaqs = [
  { question: "How long does setup take?", answer: "Most businesses can connect everything in about 5 minutes." },
  { question: "Do I need to learn new software?", answer: "No. We keep it simple so you can run this without the tech headache." },
  { question: "Can I edit the review text message?", answer: "Yes. You can customize the message so it sounds like your business." },
  {
    question: "What happens with negative feedback?",
    answer: "Instead of a public 1-star review, unhappy customers get a promo code to come back. You keep the feedback private and turn a bad experience into a second chance.",
  },
  { question: "Can I cancel anytime?", answer: "Yes. Plans are month-to-month and you can cancel whenever you need to." },
];

export const metadata: Metadata = buildMetadata({
  title: "Review Funnel for Local Businesses | Autom8 Everything",
  description: "Get more 5-star reviews with automatic follow-up texts. Simple setup, clear pricing, and no tech headache.",
  path: "/services/review-funnel",
  keywords: ["review funnel", "google review automation", "review request text messages", "local business reputation", "set it and forget it reviews"],
});

export default function ReviewFunnelPage() {
  const serviceSchema = buildServiceSchema({
    name: "Review Funnel",
    description: "Automated review follow-up for local businesses with text messages, simple setup, and monthly pricing.",
    path: "/services/review-funnel",
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(reviewFunnelFaqs)) }} />
      <ReviewFunnelPageClient />
    </>
  );
}
