import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ShieldCheck, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
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

const examples = [
  {
    title: "Lead Scrapers",
    description: "We built a realtor data scraper that pulls 500+ targeted leads per week for a real estate team.",
    // TODO: Replace with real case study when available
  },
  {
    title: "Internal Dashboards",
    description:
      "A home services company tracks every job, invoice, and follow-up in a single view — replacing 3 separate tools.",
    // TODO: Replace with real case study when available
  },
  {
    title: "Custom Booking Flows",
    description:
      "A med spa replaced their generic scheduling widget with a flow that matches their actual service categories and prep times.",
    // TODO: Replace with real case study when available
  },
  {
    title: "Workflow Automations",
    description:
      "An HVAC company triggers automatic follow-up texts, invoice reminders, and review requests after every completed job.",
    // TODO: Replace with real case study when available
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
    <main className="min-h-screen bg-[#0A0A0F] pb-20 md:pb-0">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4">Custom Apps</p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            When Off-the-Shelf Tools Don&apos;t Fit, We Build What Does.
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl">
            Scrapers, dashboards, automations, internal tools - if it saves you time or makes you money, we can build it.
          </p>
          <p className="mt-4 text-sm text-[#A78BFA] italic">
            We take on a limited number of custom builds to ensure quality. Not every request is a fit — and that is by design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/contact" className="btn-primary px-8 py-4">
              Let&apos;s Talk
            </Link>
            <Link href="#how-it-works" className="btn-secondary px-8 py-4">
              How It Works
            </Link>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-heading mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="card-base p-6">
                <p className="text-[#8B5CF6] font-semibold mb-3">Step {index + 1}</p>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-[#A1A1AA]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-heading mb-10">The ROI of a Custom Tool</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Time Saved",
                description: "If your team spends 5 hours per week on a manual process, a custom tool pays for itself in months.",
                icon: Clock,
              },
              {
                title: "Errors Eliminated",
                description: "Automated workflows don't forget steps, miss follow-ups, or enter data wrong.",
                icon: ShieldCheck,
              },
              {
                title: "Competitive Edge",
                description: "Your competitors use the same off-the-shelf tools. A custom build is yours alone.",
                icon: Zap,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card-base p-8 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#8B5CF6]/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-[#8B5CF6]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-heading mb-10">Examples We Can Build</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {examples.map((example) => (
              <div key={example.title} className="card-base p-8">
                <h3 className="text-xl font-semibold mb-3">{example.title}</h3>
                <p className="text-[#A1A1AA] leading-relaxed">{example.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="section-heading">Pricing</h2>
          <div className="card-base border-[#8B5CF6]/40 p-10 mt-8">
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">Custom Scope</p>
            <p className="text-4xl font-bold mb-3">Let&apos;s Talk</p>
            <p className="text-[#A1A1AA] mb-4">Every build is scoped after a short call. We quote each project based on your workflow and goals.</p>
            <p className="text-[#A1A1AA] mb-6">We quote each build after understanding your workflow and goals.</p>
            <Link href="/contact" className="btn-primary px-8 py-4">
              Let&apos;s Talk
            </Link>
            <div className="text-left max-w-sm mx-auto mt-6">
              <p className="text-sm text-[#A1A1AA] mb-3">What affects pricing:</p>
              <ul className="space-y-1.5 text-sm text-[#A1A1AA]">
                <li>• Complexity of the workflow</li>
                <li>• How many tools need to work together</li>
                <li>• Ongoing support requirements</li>
                <li>• Timeline urgency</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-heading mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="card-base p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-[#A1A1AA]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="section-heading mb-4">Need a custom tool built around your process?</h2>
          <p className="text-[#A1A1AA] text-lg mb-8">Let&apos;s scope it and show you the fastest path to launch.</p>
          <Link href="/contact" className="btn-primary px-8 py-4">
            Let&apos;s Talk
          </Link>
        </div>
      </section>

      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
