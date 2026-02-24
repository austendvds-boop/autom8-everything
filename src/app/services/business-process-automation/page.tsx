import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";

const faqs = [
  {
    question: "What is business process automation?",
    answer: "Business process automation uses connected workflows to remove repetitive manual tasks across sales, delivery, and operations.",
  },
  {
    question: "How fast can process automation launch?",
    answer: "Most teams can launch first-phase workflows in 2-4 weeks with clear scope and system access.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Business Process Automation Services",
  description:
    "Business process automation services for service businesses that want faster operations, fewer handoff errors, and clearer reporting.",
  path: "/services/business-process-automation",
  keywords: ["business process automation services", "workflow automation consultant", "operations automation"],
});

export default function BusinessProcessAutomationPage() {
  const serviceSchema = buildServiceSchema({
    name: "Business Process Automation Services",
    description:
      "Business process automation services for service businesses that want faster operations, fewer handoff errors, and clearer reporting.",
    path: "/services/business-process-automation",
  });

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Business Process Automation Services
          </h1>
          <p className="text-xl text-[#A1A1AA]">
            Eliminate operational bottlenecks with workflow architecture and automation systems built for service teams.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-6">Typical deliverables</h2>
          <ul className="space-y-3 text-[#A1A1AA] list-disc pl-6">
            <li>Lead-to-delivery workflow mapping and automation design</li>
            <li>Approval workflows with exception handling and alerts</li>
            <li>Cross-tool synchronization for CRM, forms, and communication apps</li>
            <li>Operational dashboards for turnaround time and throughput</li>
          </ul>
          <p className="text-[#A1A1AA] mt-8">
            Pair with <Link href="/services/crm-automation" className="text-[#8B5CF6] hover:text-[#A78BFA]">CRM automation</Link> and
            local execution from our <Link href="/locations" className="text-[#8B5CF6] hover:text-[#A78BFA]">Phoenix service areas</Link>.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
