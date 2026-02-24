import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Business Automation Services",
  description:
    "Explore Autom8 Everything business automation services including CRM automation, AI workflows, lead generation systems, and reporting automation.",
  path: "/services",
  keywords: [
    "business automation services",
    "crm automation services",
    "ai automation services",
    "workflow automation consulting",
    "automation agency phoenix",
  ],
});

export default function ServicesPage() {
  return <ServicesPageClient />;
}
