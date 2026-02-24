import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Autom8 Everything",
  description:
    "Contact Autom8 Everything in Phoenix, AZ for business automation consulting, AI workflow design, and local SEO implementation.",
  path: "/contact",
  keywords: ["contact automation consultant", "phoenix automation agency", "local seo consulting"],
});

export default function ContactPage() {
  return <ContactPageClient />;
}
