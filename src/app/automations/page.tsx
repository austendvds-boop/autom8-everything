import type { Metadata } from "next";
import AutomationsPageClient from "./AutomationsPageClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Automation Case Studies",
  description:
    "See automation case studies from Autom8 Everything covering CRM automation, AI support systems, and workflow optimization with measurable ROI.",
  path: "/automations",
  keywords: ["automation case studies", "workflow automation results", "ai automation roi"],
});

export default function AutomationsPage() {
  return <AutomationsPageClient />;
}
