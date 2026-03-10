import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";

export const metadata: Metadata = buildMetadata({
  title: "Business Automation Services | Autom8 Everything",
  description:
    "Explore business automation, AI receptionist, website, review funnel, and SEO services from Autom8 Everything.",
  path: "/services",
});

export default function ServicesPage() {
  redirect("/pricing");
}
