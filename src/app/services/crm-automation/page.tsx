import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";

const faqs = [
  {
    question: "What CRM automations improve close rates fastest?",
    answer: "Instant lead routing, timed follow-up, and stage-based task automation are usually the fastest levers.",
  },
  {
    question: "Can CRM automation reduce admin time?",
    answer: "Yes. Automated updates, reminders, and reporting reduce manual pipeline maintenance significantly.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "CRM Automation Services",
  description:
    "CRM automation services for lead capture, routing, follow-up, and reporting. Keep your sales pipeline current without manual admin overhead.",
  path: "/services/crm-automation",
  keywords: ["crm automation services", "sales pipeline automation", "lead routing automation"],
});

export default function CrmAutomationPage() {
  const serviceSchema = buildServiceSchema({
    name: "CRM Automation Services",
    description:
      "CRM automation services for lead capture, routing, follow-up, and reporting. Keep your sales pipeline current without manual admin overhead.",
    path: "/services/crm-automation",
  });

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            CRM Automation Services That Improve Close Rates
          </h1>
          <p className="text-xl text-[#A1A1AA]">
            Build reliable CRM systems for lead handoff, task assignment, follow-up timing, and lifecycle visibility.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-6">Common CRM Automation Deliverables</h2>
          <ul className="space-y-3 text-[#A1A1AA] list-disc pl-6">
            <li>Instant lead routing and owner assignment</li>
            <li>Automated follow-up sequences by stage</li>
            <li>Pipeline hygiene checks and duplicate prevention</li>
            <li>Revenue tracking dashboards and handoff alerts</li>
          </ul>
          <p className="text-[#A1A1AA] mt-8">
            Pair CRM execution with <Link href="/services/ai-automation" className="text-[#8B5CF6] hover:text-[#A78BFA]">AI automation</Link>,
            <Link href="/services/gohighlevel-setup" className="text-[#8B5CF6] hover:text-[#A78BFA]"> GoHighLevel setup</Link>, or review
            our latest <Link href="/automations" className="text-[#8B5CF6] hover:text-[#A78BFA]">case studies</Link>.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
