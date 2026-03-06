import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const siteHost = new URL(siteUrl).hostname;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteHost,
  };
}
