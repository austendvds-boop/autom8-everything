import type { Metadata } from "next";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";
import WebsitesPageClient from "@/app/services/websites/WebsitesPageClient";

const websitesFaqs = [
  { question: "Can you rebuild my existing site?", answer: "Yes. We can migrate and rebuild older websites. Ask us for a quote." },
  { question: "Do I need to write all the content?", answer: "No. We handle the writing and structure. You just tell us about your business." },
  { question: "How long does a website take to build?", answer: "Most Launch sites are live in about a week. Enterprise projects take 2-3 weeks." },
  { question: "Can I start with Launch and add Growth later?", answer: "Yes. Many businesses start with a Launch site and Hosting, then add Growth when they are ready to invest in SEO." },
  { question: "What is the difference between Hosting and Growth?", answer: "Hosting keeps your site running and includes 1 edit per month. Growth adds blog posts, Google Business updates, local SEO, and a monthly report so you show up in more searches." },
  { question: "How long until I see SEO results?", answer: "Most businesses see traction in a few months, then results build over time with consistency." },
  { question: "Do you write the SEO content?", answer: "Yes. We write and publish content for you each month." },
];

export const metadata: Metadata = buildMetadata({
  title: "Websites + Monthly SEO | Autom8 Everything",
  description: "Professional business websites plus monthly local SEO and content for local businesses.",
  path: "/services/websites",
  keywords: [
    "website creation",
    "small business website packages",
    "monthly seo service",
    "local business websites and seo",
  ],
});

export default function WebsitesPage() {
  const serviceSchema = buildServiceSchema({
    name: "Website Creation + Monthly SEO",
    description: "Professional business websites plus ongoing monthly SEO and content for local businesses.",
    path: "/services/websites",
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(websitesFaqs)) }} />
      <WebsitesPageClient />
    </>
  );
}
