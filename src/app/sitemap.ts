import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { locationPages } from "@/content/locations";
import { siteUrl } from "@/lib/seo";

const staticRoutes = [
  "",
  "/pricing",
  "/services/cadence",
  "/services/websites",
  "/services/review-funnel",
  "/services/seo-content",
  "/services/custom-apps",
  "/automations",
  "/about",
  "/blog",
  "/locations",
  "/contact",
  "/get-started",
  "/review-funnel/signup",
  "/privacy",
  "/terms",
  "/security",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const blogRoutes = getAllPosts().map((post) => `/blog/${post.slug}`);
  const locationRoutes = locationPages.map((location) => `/locations/${location.slug}`);

  return [...staticRoutes, ...blogRoutes, ...locationRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency:
      route === ""
        ? "weekly"
        : route.startsWith("/blog/")
          ? "weekly"
          : route.startsWith("/services") || route === "/pricing" || route === "/automations"
            ? "monthly"
            : route === "/privacy" || route === "/terms" || route === "/security" || route === "/about" || route === "/contact"
              ? "yearly"
              : "monthly",
    priority:
      route === ""
        ? 1
        : route.startsWith("/services") || route === "/pricing" || route === "/automations"
          ? 0.9
          : route === "/about" || route === "/contact" || route === "/blog" || route === "/locations" || route === "/get-started"
            ? 0.8
            : route.startsWith("/blog/") || route.startsWith("/locations/")
              ? 0.7
              : route === "/review-funnel/signup"
                ? 0.6
                : route === "/privacy" || route === "/terms" || route === "/security"
                  ? 0.3
                  : 0.8,
  }));
}
