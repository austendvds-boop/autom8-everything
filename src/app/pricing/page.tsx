import type { Metadata } from "next";
import PricingPageClient from "@/app/pricing/PricingPageClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pricing | Autom8 Everything",
  description: "Simple pricing for Cadence, review funnel, websites, monthly plans, and custom apps.",
  path: "/pricing",
});

export default function PricingPage() {
  return <PricingPageClient />;
}
