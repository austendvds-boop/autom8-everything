import type { Metadata } from "next";
import { buildFaqSchema, buildMetadata } from "@/lib/seo";
import CadencePageClient from "@/app/services/cadence/CadencePageClient";

const cadenceFaqs = [
  { question: "Do I need a new phone number?", answer: "No. You can keep your current number and forward calls to Cadence." },
  { question: "How long does setup take?", answer: "Most businesses are live the same day. Onboarding typically takes about 5 minutes." },
  { question: "Can Cadence transfer urgent calls to me?", answer: "Yes. You can set rules for when a call should go straight to you or your team." },
  { question: "Is there a long-term contract?", answer: "No. Cadence is month-to-month. Cancel anytime." },
  { question: "What happens after the trial?", answer: "If you keep it, your plan moves to $199/month. If not, you can cancel before billing starts." },
];

export const metadata: Metadata = buildMetadata({
  title: "AI Phone Answering for Small Business | Cadence by Autom8 Everything",
  description:
    "Cadence answers your business calls, handles common questions, and helps customers take the next step. 7-day free trial, then $199/month.",
  path: "/services/cadence",
  keywords: [
    "AI phone answering",
    "AI receptionist for small business",
    "automated phone answering service Phoenix",
    "voice receptionist",
    "business call answering",
    "small business phone answering",
    "cadence receptionist",
    "after hours call coverage",
  ],
});

export default function CadencePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "AI Voice Receptionist",
    name: "Cadence Voice Receptionist",
    description:
      "AI-powered voice receptionist that answers business calls 24/7, handles FAQs, routes urgent calls, and sends call summaries. Built for small businesses in Phoenix, Arizona.",
    provider: {
      "@type": "LocalBusiness",
      name: "Autom8 Everything",
      url: "https://autom8everything.com",
    },
    areaServed: "Phoenix, Arizona",
    url: "https://autom8everything.com/services/cadence",
    offers: {
      "@type": "Offer",
      price: "199",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "199",
        priceCurrency: "USD",
        unitText: "MONTH",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: "1",
          unitCode: "MON",
        },
      },
      description: "Monthly subscription. 7-day free trial. Cancel anytime.",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(cadenceFaqs)) }} />
      <CadencePageClient />
    </>
  );
}
