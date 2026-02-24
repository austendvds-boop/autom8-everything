import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";

const faqs = [
  {
    question: "What AI automation use cases work best first?",
    answer: "Start with intake triage, knowledge-assisted support, and internal drafting workflows with human approval.",
  },
  {
    question: "Do AI automations replace team members?",
    answer: "No. They remove repetitive execution work so teams can focus on high-value decisions and client communication.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "AI Automation Services",
  description:
    "AI automation services for operations, support, and internal execution workflows. Deploy AI agents that improve speed and consistency.",
  path: "/services/ai-automation",
  keywords: ["ai automation services", "ai agents for business", "workflow ai integration"],
});

export default function AiAutomationPage() {
  const serviceSchema = buildServiceSchema({
    name: "AI Automation Services",
    description:
      "AI automation services for operations, support, and internal execution workflows. Deploy AI agents that improve speed and consistency.",
    path: "/services/ai-automation",
  });

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            AI Automation Services for Lean Teams
          </h1>
          <p className="text-xl text-[#A1A1AA]">
            We build practical AI-powered workflows that reduce repetitive work, improve speed to response, and increase operational consistency.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-6">What We Implement</h2>
          <ul className="space-y-3 text-[#A1A1AA] list-disc pl-6">
            <li>AI-assisted intake and triage workflows</li>
            <li>Knowledge-enabled support copilots</li>
            <li>Research and content drafting automations</li>
            <li>Human-in-the-loop approval pipelines</li>
          </ul>
          <p className="text-[#A1A1AA] mt-8">
            Explore more offerings on our <Link href="/services" className="text-[#8B5CF6] hover:text-[#A78BFA]">services page</Link>,
            see local execution in <Link href="/locations/phoenix" className="text-[#8B5CF6] hover:text-[#A78BFA]">Phoenix</Link>, or read implementation ideas in the
            <Link href="/blog" className="text-[#8B5CF6] hover:text-[#A78BFA]"> blog</Link>.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
