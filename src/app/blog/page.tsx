import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Business Automation Blog for Phoenix, AZ Service Companies",
  description:
    "Explore practical guides on business automation, CRM workflows, and local SEO systems for Phoenix and Arizona service businesses.",
  path: "/blog",
  keywords: [
    "business automation blog",
    "phoenix automation agency",
    "crm automation best practices",
    "local seo automation",
  ],
});

export default function BlogPage() {
  return <BlogPageClient posts={getAllPosts()} />;
}
