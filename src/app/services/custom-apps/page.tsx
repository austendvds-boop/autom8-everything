import type { Metadata } from "next";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";
import CustomAppsPageClient from "@/app/services/custom-apps/CustomAppsPageClient";

const customAppsFaqs = [
  { question: "What kinds of apps do you build?", answer: "Dashboards, lead tools, workflow automations, booking tools, and other business-specific systems." },
  { question: "Can you build something like a realtor scraper?", answer: "Yes. That is exactly the kind of custom build we handle." },
  { question: "How is pricing handled?", answer: "After a consultation, we give you a clear project scope and quote." },
  { question: "Do you support the app after launch?", answer: "Yes. We can support updates, fixes, and new features after go-live." },
];

export const metadata: Metadata = buildMetadata({
  title: "Custom Apps for Local Businesses | Autom8 Everything",
  description: "Custom business apps built around your workflow, from lead scrapers to internal dashboards.",
  path: "/services/custom-apps",
  keywords: ["custom apps", "business workflow tools", "custom dashboards", "small business app development"],
});

export default function CustomAppsPage() {
  const serviceSchema = buildServiceSchema({
    name: "Custom Apps",
    description: "Custom app builds designed around each business's real workflow and operations.",
    path: "/services/custom-apps",
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(customAppsFaqs)) }} />
      <CustomAppsPageClient />
    </>
  );
}
