import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Autom8 Everything",
  description:
    "Meet Autom8 Everything, a Phoenix-based business automation team helping companies scale with AI workflows, process automation, and local SEO execution.",
  path: "/about",
  keywords: ["about autom8 everything", "phoenix automation consultants", "ai workflow team"],
});

export default function AboutPage() {
  return <AboutPageClient />;
}
