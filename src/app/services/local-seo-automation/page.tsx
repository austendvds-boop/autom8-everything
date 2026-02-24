import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";

const faqs = [
  {
    question: "What is local SEO automation?",
    answer: "Local SEO automation standardizes metadata, schema, internal links, and citation workflows for consistent local growth.",
  },
  {
    question: "Can local SEO automation help multiple city pages?",
    answer: "Yes. A strong template and QA process lets teams scale city pages without sacrificing quality.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Local SEO Automation Services",
  description:
    "Local SEO automation services for service businesses. Improve local rankings with optimized landing pages, internal linking, schema, and NAP consistency.",
  path: "/services/local-seo-automation",
  keywords: ["local seo automation", "phoenix local seo services", "service area seo"],
});

export default function LocalSeoAutomationPage() {
  const serviceSchema = buildServiceSchema({
    name: "Local SEO Automation Services",
    description:
      "Local SEO automation services for service businesses. Improve local rankings with optimized landing pages, internal linking, schema, and NAP consistency.",
    path: "/services/local-seo-automation",
  });

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Local SEO Automation Services for Service-Area Businesses
          </h1>
          <p className="text-xl text-[#A1A1AA]">
            We build local SEO infrastructure that compounds: optimized pages, schema, internal links, and location signals aligned to conversion intent.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-6">Local SEO Systems Included</h2>
          <ul className="space-y-3 text-[#A1A1AA] list-disc pl-6">
            <li>Service landing pages targeting high-intent local terms</li>
            <li>On-page optimization for title, headers, and entities</li>
            <li>LocalBusiness schema and NAP alignment</li>
            <li>Internal linking between home, services, and blog hubs</li>
          </ul>
          <p className="text-[#A1A1AA] mt-8">
            Need full-funnel execution? Combine this with <Link href="/services/crm-automation" className="text-[#8B5CF6] hover:text-[#A78BFA]">CRM automation</Link>,
            browse our <Link href="/locations" className="text-[#8B5CF6] hover:text-[#A78BFA]">Phoenix-area pages</Link>, and
            <Link href="/contact" className="text-[#8B5CF6] hover:text-[#A78BFA]"> book a strategy call</Link>.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
