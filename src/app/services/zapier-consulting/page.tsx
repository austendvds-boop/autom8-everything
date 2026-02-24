import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";

const faqs = [
  {
    question: "What does a Zapier consultant do?",
    answer: "A Zapier consultant designs, builds, tests, and optimizes automation workflows across your business systems.",
  },
  {
    question: "Can Zapier support complex workflows?",
    answer: "Yes, with the right architecture. Complex workflows may also combine Zapier with custom API logic.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Zapier Consulting Services",
  description:
    "Zapier consulting services for lead routing, CRM sync, and operations automation for small and midsize service businesses.",
  path: "/services/zapier-consulting",
  keywords: ["zapier consultant near me", "zapier consulting services", "zapier workflow automation"],
});

export default function ZapierConsultingPage() {
  const serviceSchema = buildServiceSchema({
    name: "Zapier Consulting Services",
    description:
      "Zapier consulting services for lead routing, CRM sync, and operations automation for small and midsize service businesses.",
    path: "/services/zapier-consulting",
  });

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Zapier Consulting Services
          </h1>
          <p className="text-xl text-[#A1A1AA]">
            Design and deploy reliable Zapier workflows that reduce manual operations and improve lead-to-close speed.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-6">Zapier implementation focus</h2>
          <ul className="space-y-3 text-[#A1A1AA] list-disc pl-6">
            <li>Lead routing and qualification workflows</li>
            <li>CRM synchronization and deduplication logic</li>
            <li>Proposal, booking, and notification automations</li>
            <li>Workflow QA and failure-monitoring setup</li>
          </ul>
          <p className="text-[#A1A1AA] mt-8">
            Need platform evaluation too? Read our <Link href="/blog/zapier-vs-make-small-business" className="text-[#8B5CF6] hover:text-[#A78BFA]">Zapier vs Make comparison</Link>.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
