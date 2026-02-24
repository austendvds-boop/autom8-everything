import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Websites and Tools That Get You More Calls and Booked Jobs",
  description:
    "We build the site, set up smart follow-up, and run monthly SEO so local businesses get more calls, more booked jobs, and less missed follow-up.",
  path: "/",
  keywords: [
    "local business website design",
    "lead follow up system",
    "small business SEO services",
    "get more calls from website",
  ],
});

export default function Home() {
  return <HomePageClient />;
}
