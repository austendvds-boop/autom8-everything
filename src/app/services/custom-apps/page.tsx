import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";

const steps = [
  {
    title: "Tell Us the Problem",
    description: "What's eating your time? What's manual that shouldn't be? We'll figure out the right solution.",
  },
  {
    title: "We Scope & Build It",
    description: "Clear timeline, clear price, no surprises. You see progress every step of the way.",
  },
  {
    title: "Launch & Support",
    description: "We deploy it, train your team, and stick around for ongoing support and updates.",
  },
];

const buildExamples = [
  {
    title: "Lead Scrapers",
    description:
      "Pull leads from county records, MLS, directories — wherever your prospects live. Example: real estate lead tool pulling Maricopa County parcel data.",
  },
  {
    title: "Internal Dashboards",
    description:
      "See your business data in one place. Sales, appointments, revenue, team performance — no more spreadsheets.",
  },
  {
    title: "Booking & Scheduling",
    description:
      "Custom booking flows that match your exact process. Not a generic Calendly — YOUR workflow.",
  },
  {
    title: "Automated Workflows",
    description:
      "Connect your tools. When X happens, Y fires automatically. Invoices, follow-ups, notifications — all hands-free.",
  },
  {
    title: "Customer Portals",
    description:
      "Give your clients a login to check status, upload documents, or manage their account. White-labeled to your brand.",
  },
  {
    title: "Data Integrations",
    description:
      "Connect systems that don't talk to each other. CRM to accounting, scheduling to invoicing, anything to anything.",
  },
];

const comparisonRows = [
  {
    feature: "Understands your business",
    autom8: "✅ Deep discovery",
    freelancer: "Spec-dependent",
    noCode: "You figure it out",
  },
  {
    feature: "Fixed pricing",
    autom8: "✅",
    freelancer: "Usually hourly",
    noCode: "Monthly subscription",
  },
  {
    feature: "Ongoing support",
    autom8: "✅ Included",
    freelancer: "Per-hour",
    noCode: "DIY",
  },
  {
    feature: "Custom to your workflow",
    autom8: "✅",
    freelancer: "✅",
    noCode: "Limited",
  },
  {
    feature: "Speed to launch",
    autom8: "2-4 weeks",
    freelancer: "4-12 weeks",
    noCode: "Days (but fragile)",
  },
  {
    feature: "Scales with you",
    autom8: "✅",
    freelancer: "Rebuild needed",
    noCode: "Breaks at scale",
  },
];

const faqs = [
  {
    question: "How much does a custom build cost?",
    answer:
      "It depends on scope. Most projects range from $2,000-$10,000. We give you a fixed quote upfront — no hourly surprises.",
  },
  {
    question: "Can you work with tools I already use?",
    answer:
      "Yes. We build integrations with most platforms — CRMs, scheduling tools, payment processors, spreadsheets, you name it.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Typically 2-4 weeks for most builds. Complex projects may take longer — we'll tell you upfront.",
  },
  {
    question: "Do I own what you build?",
    answer: "Yes. Full ownership of all code and assets. We host and maintain it, but it's yours.",
  },
  {
    question: "What if I need changes later?",
    answer:
      "All builds include ongoing support. New features, tweaks, and updates are scoped and quoted clearly.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Custom Apps for Local Businesses | Autom8 Everything",
  description:
    "Custom dashboards, scrapers, internal tools, and integrations built around how your business actually works.",
  path: "/services/custom-apps",
  keywords: [
    "custom business apps",
    "internal tools development",
    "workflow automation development",
    "custom dashboard development",
    "small business software development",
  ],
});

export default function CustomAppsPage() {
  const serviceSchema = buildServiceSchema({
    name: "Custom Apps",
    description:
      "Custom-built dashboards, workflows, portals, and integrations designed around each business's real operations.",
    path: "/services/custom-apps",
  });

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4">CUSTOM BUILD</p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Tools Built Around How You Actually Work
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl">
            Dashboards, scrapers, internal tools, booking systems — whatever your business needs, built from scratch
            for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
            >
              Book a Discovery Call
            </Link>
            <Link
              href="#what-we-build"
              className="inline-block px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:border-[#8B5CF6]/60"
            >
              See Examples
            </Link>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10" style={{ fontFamily: "var(--font-playfair), serif" }}>
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-white/10 bg-[#12121A] p-6">
                <p className="text-[#8B5CF6] font-semibold mb-3">Step {index + 1}</p>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-[#A1A1AA]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="what-we-build" className="py-20 bg-[#12121A]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10" style={{ fontFamily: "var(--font-playfair), serif" }}>
            What We Build
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {buildExamples.map((example) => (
              <div
                key={example.title}
                className="bg-[#0A0A0F] border border-white/5 rounded-2xl p-8 hover:border-[#8B5CF6]/30 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3">{example.title}</h3>
                <p className="text-[#A1A1AA] leading-relaxed">{example.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Pricing
          </h2>
          <div className="rounded-2xl border border-[#8B5CF6]/40 bg-[#12121A] p-10 mt-8">
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">Custom Quote</p>
            <p className="text-3xl md:text-4xl font-bold mb-4">Scoped after a discovery call</p>
            <p className="text-[#A1A1AA] mb-8 max-w-2xl mx-auto">
              Every project is different. We&apos;ll give you a clear scope, timeline, and fixed price before any work
              starts. No hourly billing surprises.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
            >
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Why Autom8 vs Hiring a Developer or Using No-Code?
          </h2>
          <p className="text-[#A1A1AA] mb-8 max-w-3xl">
            You can stitch something together fast, but fragile systems break as you grow. We build durable tools that
            fit your workflow now and still hold up as volume increases.
          </p>

          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead>
                  <tr className="bg-[#0A0A0F] text-left">
                    <th className="p-4 font-semibold">Feature</th>
                    <th className="p-4 border-l border-white/10 font-semibold">Autom8</th>
                    <th className="p-4 border-l border-white/10 font-semibold">Freelance Dev</th>
                    <th className="p-4 border-l border-white/10 font-semibold">No-Code (Zapier, etc.)</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="border-t border-white/10">
                      <td className="p-4 text-[#A1A1AA]">{row.feature}</td>
                      <td className="p-4 border-l border-white/10 text-[#8B5CF6] font-medium">{row.autom8}</td>
                      <td className="p-4 border-l border-white/10 text-[#A1A1AA]">{row.freelancer}</td>
                      <td className="p-4 border-l border-white/10 text-[#A1A1AA]">{row.noCode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-white/10 bg-[#12121A] p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-[#A1A1AA]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Got a Problem That Needs a Custom Solution?
          </h2>
          <p className="text-[#A1A1AA] text-lg mb-8">
            Book a free discovery call. We&apos;ll figure out if a custom build is the right move — no pressure.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
          >
            Book a Discovery Call
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
