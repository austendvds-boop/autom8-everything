import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { locationPages } from "@/content/locations";
import { siteUrl } from "@/lib/seo";

const staticRoutes = [
  "",
  "/services",
  "/services/ai-automation",
  "/services/crm-automation",
  "/services/local-seo-automation",
  "/services/business-process-automation",
  "/services/email-automation-services",
  "/services/zapier-consulting",
  "/services/gohighlevel-setup",
  "/about",
  "/automations",
  "/blog",
  "/locations",
  "/contact",
  "/privacy",
  "/terms",
  "/security",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const blogRoutes = getAllPosts().map((post) => `/blog/${post.slug}`);
  const locationRoutes = locationPages.map((location) => `/locations/${location.slug}`);

  return [...staticRoutes, ...blogRoutes, ...locationRoutes].map((route, index) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route.startsWith("/blog/") ? "weekly" : "monthly",
    priority: index === 0 ? 1 : route.startsWith("/services") || route.startsWith("/locations") ? 0.9 : 0.8,
  }));
}
