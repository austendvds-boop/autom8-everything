import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";

const faqs = [
  {
    question: "What email automations should launch first?",
    answer: "Start with lead response, appointment reminders, and onboarding sequences tied to lifecycle stage.",
  },
  {
    question: "Can email automation improve close rates?",
    answer: "Yes. Timely, intent-based follow-up often improves response quality and pipeline progression.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Email Automation Services for Small Business",
  description:
    "Email automation services for small business teams that need lead nurturing, onboarding consistency, and conversion-focused follow-up.",
  path: "/services/email-automation-services",
  keywords: ["email automation services for small business", "email workflow automation", "automated follow-up"],
});

export default function EmailAutomationServicesPage() {
  const serviceSchema = buildServiceSchema({
    name: "Email Automation Services for Small Business",
    description:
      "Email automation services for small business teams that need lead nurturing, onboarding consistency, and conversion-focused follow-up.",
    path: "/services/email-automation-services",
  });

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Email Automation Services for Small Businesses
          </h1>
          <p className="text-xl text-[#A1A1AA]">
            Build lifecycle email workflows that reduce manual follow-up and increase conversion consistency.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-6">What we automate</h2>
          <ul className="space-y-3 text-[#A1A1AA] list-disc pl-6">
            <li>Lead nurture and proposal follow-up sequences</li>
            <li>Client onboarding communication and milestone reminders</li>
            <li>Re-engagement campaigns for dormant opportunities</li>
            <li>Reporting dashboards for open rates, clicks, and conversions</li>
          </ul>
          <p className="text-[#A1A1AA] mt-8">
            Also see our <Link href="/services/business-process-automation" className="text-[#8B5CF6] hover:text-[#A78BFA]">process automation services</Link> and
            <Link href="/contact" className="text-[#8B5CF6] hover:text-[#A78BFA]"> request a custom quote</Link>.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
