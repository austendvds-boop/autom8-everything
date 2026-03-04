import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Autom8 Everything | Tools for Local Businesses Without the Tech Headache",
  description:
    "Autom8 helps local businesses answer calls, collect reviews, build websites, and grow with monthly SEO without the tech headache.",
  path: "/",
  keywords: [
    "local business tools",
    "voice receptionist",
    "website creation services",
    "local seo content",
  ],
});

export default function Home() {
  return <HomePageClient />;
}
