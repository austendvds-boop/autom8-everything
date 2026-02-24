import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";

const faqs = [
  {
    question: "What is included in GoHighLevel setup services?",
    answer: "CRM pipelines, automation workflows, messaging setup, and conversion tracking are core setup components.",
  },
  {
    question: "Can you migrate existing data into GoHighLevel?",
    answer: "Yes, we support phased migration plans to protect lead data and maintain reporting continuity.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "GoHighLevel Setup Service",
  description:
    "GoHighLevel setup service for CRM architecture, sales automations, and reporting systems that support growth-stage service teams.",
  path: "/services/gohighlevel-setup",
  keywords: ["GoHighLevel setup service", "GoHighLevel automation", "CRM setup service"],
});

export default function GoHighLevelSetupPage() {
  const serviceSchema = buildServiceSchema({
    name: "GoHighLevel Setup Service",
    description:
      "GoHighLevel setup service for CRM architecture, sales automations, and reporting systems that support growth-stage service teams.",
    path: "/services/gohighlevel-setup",
  });

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            GoHighLevel Setup Service
          </h1>
          <p className="text-xl text-[#A1A1AA]">
            Build a conversion-ready GoHighLevel stack with clean CRM pipelines, automation rules, and KPI dashboards.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-6">Implementation deliverables</h2>
          <ul className="space-y-3 text-[#A1A1AA] list-disc pl-6">
            <li>Pipeline architecture and lifecycle stage design</li>
            <li>Lead follow-up, reminder, and no-show automation</li>
            <li>Attribution and conversion event reporting setup</li>
            <li>Team handoff documentation and QA checklists</li>
          </ul>
          <p className="text-[#A1A1AA] mt-8">
            Compare platforms in our <Link href="/blog/gohighlevel-vs-hubspot-automation" className="text-[#8B5CF6] hover:text-[#A78BFA]">GoHighLevel vs HubSpot guide</Link> or
            <Link href="/contact" className="text-[#8B5CF6] hover:text-[#A78BFA]"> request a setup quote</Link>.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
