import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { locationPages } from "@/content/locations";
import { siteUrl } from "@/lib/seo";

const staticRoutes = [
  "",
  "/pricing",
  "/services/cadence",
  "/services/websites",
  "/services/website-creation",
  "/services/review-funnel",
  "/services/seo-content",
  "/services/custom-apps",
  "/about",
  "/blog",
  "/locations",
  "/contact",
  "/privacy",
  "/terms",
  "/security",
  "/get-started",
  "/get-started/success",
  "/cadence/get-started",
  "/cadence/welcome",
  "/onboarding",
  "/onboarding/success",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const blogRoutes = getAllPosts().map((post) => `/blog/${post.slug}`);
  const locationRoutes = locationPages.map((location) => `/locations/${location.slug}`);

  return [...staticRoutes, ...blogRoutes, ...locationRoutes].map((route, index) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route.startsWith("/blog/") ? "weekly" : "monthly",
    priority: index === 0 ? 1 : route.startsWith("/services") || route.startsWith("/locations") || route === "/pricing" ? 0.9 : 0.8,
  }));
}
