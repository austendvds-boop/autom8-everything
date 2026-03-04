import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";

const steps = [
  {
    title: "Find what your customers search",
    description: "We map the local search terms that matter for your business.",
  },
  {
    title: "Publish useful content every month",
    description: "We post clear articles and service content that answer real customer questions.",
  },
  {
    title: "Improve rankings over time",
    description: "We keep refining pages and local SEO signals so your visibility keeps climbing.",
  },
];

const faqs = [
  {
    question: "How long until I see results?",
    answer: "Most businesses see traction in a few months, then results compound with consistency.",
  },
  {
    question: "Do you write the content?",
    answer: "Yes. We write and publish content for you each month.",
  },
  {
    question: "Do you only work on sites you build?",
    answer: "Our best results come from websites in the Autom8 stack. Migration from other platforms is available as an upcharge.",
  },
  {
    question: "Is this a one-time project?",
    answer: "No. SEO and content work best as an ongoing monthly service.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "SEO & Content for Local Businesses | Autom8 Everything",
  description: "Monthly local SEO and blog publishing to help your business rank higher and get more inbound leads.",
  path: "/services/seo-content",
  keywords: [
    "local seo",
    "monthly seo service",
    "business blog content",
    "google rankings for local business",
  ],
});

export default function SeoContentPage() {
  const serviceSchema = buildServiceSchema({
    name: "SEO & Content",
    description: "Monthly local SEO and content publishing service for long-term search growth.",
    path: "/services/seo-content",
  });

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4">SEO & Content</p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Show up when people search for your services.
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl">
            We handle monthly local SEO and content so your business keeps gaining visibility without adding more to your plate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
            >
              Contact Us
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
            What We Do Every Month
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ["Publish useful blog content", "New posts that target local search terms your customers already use."],
              ["Improve service pages", "Better structure, headings, and internal links so pages perform better."],
              ["Strengthen local SEO", "Consistent local signals that help your business show up in map and local results."],
              ["Report progress clearly", "Simple updates on what changed and what results are improving."],
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
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">Monthly Retainer</p>
            <p className="text-4xl font-bold mb-3">Contact Us</p>
            <p className="text-[#A1A1AA] mb-6">Scope depends on your market, goals, and how much content you want each month.</p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-full bg-[#8B5CF6] text-white font-semibold hover:bg-[#7C3AED] transition-colors"
            >
              Contact Us
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
            Ready to grow your search traffic each month?
          </h2>
          <p className="text-[#A1A1AA] text-lg mb-8">We will show you exactly where to start.</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
