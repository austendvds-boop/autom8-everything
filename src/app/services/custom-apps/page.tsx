import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";

const steps = [
  {
    title: "Share the bottleneck",
    description: "Tell us what is slowing you down or costing you time every week.",
  },
  {
    title: "We design and build the solution",
    description: "You get a clear scope, timeline, and build plan before work starts.",
  },
  {
    title: "Launch and support",
    description: "We deploy it, train your team, and support improvements as your business grows.",
  },
];

const faqs = [
  {
    question: "What kinds of apps do you build?",
    answer: "Dashboards, lead tools, workflow automations, booking tools, and other business-specific systems.",
  },
  {
    question: "Can you build something like a realtor scraper?",
    answer: "Yes. That is exactly the kind of custom build we handle.",
  },
  {
    question: "How is pricing handled?",
    answer: "After a consultation, we give you a clear project scope and quote.",
  },
  {
    question: "Do you support the app after launch?",
    answer: "Yes. We can support updates, fixes, and new features after go-live.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Custom Apps for Local Businesses | Autom8 Everything",
  description: "Custom business apps built around your workflow, from lead scrapers to internal dashboards.",
  path: "/services/custom-apps",
  keywords: [
    "custom apps",
    "business workflow tools",
    "custom dashboards",
    "small business app development",
  ],
});

export default function CustomAppsPage() {
  const serviceSchema = buildServiceSchema({
    name: "Custom Apps",
    description: "Custom app builds designed around each business's real workflow and operations.",
    path: "/services/custom-apps",
  });

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4">Custom Apps</p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Get the exact tool your business has been missing.
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl">
            We build custom apps around your real workflow so your team spends less time on manual tasks and more time on customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
            >
              Book a Consultation
            </Link>
            <Link
              href="#how-it-works"
              className="inline-block px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:border-[#8B5CF6]/60"
            >
              How It Works
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

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Examples We Can Build
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ["Lead scrapers", "Pull and organize lead data for your team, including niche builds like realtor data tools."],
              ["Internal dashboards", "See jobs, sales, follow-up, and team activity in one place."],
              ["Custom booking flows", "Match scheduling to how your business actually works."],
              ["Workflow automations", "Trigger reminders, notifications, and handoffs automatically."],
            ].map(([title, description]) => (
              <div key={title} className="bg-[#0A0A0F] border border-white/5 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                <p className="text-[#A1A1AA] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Pricing
          </h2>
          <div className="rounded-2xl border border-[#8B5CF6]/40 bg-[#12121A] p-10 mt-8">
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">Custom Scope</p>
            <p className="text-4xl font-bold mb-3">Book a Consultation</p>
            <p className="text-[#A1A1AA] mb-6">We quote each build after understanding your workflow and goals.</p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-white/10 bg-[#0A0A0F] p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-[#A1A1AA]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Need a custom tool built around your process?
          </h2>
          <p className="text-[#A1A1AA] text-lg mb-8">Let&apos;s scope it and show you the fastest path to launch.</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
          >
            Book a Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
