import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";

const steps = [
  {
    title: "We Audit Your Presence",
    description:
      "We check your Google ranking, website health, and local listings. You get a clear picture of where you stand.",
  },
  {
    title: "We Build Your Plan",
    description:
      "Targeted keywords, content calendar, and technical fixes — all specific to your market and services.",
  },
  {
    title: "We Execute Monthly",
    description:
      "Blog posts, on-page SEO, Google Business Profile updates, and local citation management. Every month.",
  },
];

const includedFeatures = [
  {
    title: "Local Keyword Research",
    description: "We find the exact terms your customers use to search for your services in your area.",
  },
  {
    title: "Monthly Blog Content",
    description:
      "Fresh, relevant articles published to your site every week. Written for humans, optimized for Google.",
  },
  {
    title: "On-Page SEO",
    description:
      "Title tags, meta descriptions, schema markup, internal linking — the technical stuff that moves rankings.",
  },
  {
    title: "Google Business Profile",
    description:
      "Regular posts, photo updates, and Q&A management to keep your listing active and competitive.",
  },
  {
    title: "Local Citations",
    description: "Consistent business info across 50+ directories. NAP accuracy that Google trusts.",
  },
  {
    title: "Monthly Reporting",
    description:
      "Clear reports showing ranking changes, traffic growth, and what we did that month. No jargon.",
  },
];

const comparisonRows = [
  {
    feature: "Local focus",
    autom8: "✅",
    agency: "Sometimes",
    diy: "Maybe",
  },
  {
    feature: "Monthly content included",
    autom8: "✅",
    agency: "Extra cost",
    diy: "Your time",
  },
  {
    feature: "Transparent reporting",
    autom8: "✅",
    agency: "Varies",
    diy: "N/A",
  },
  {
    feature: "No long-term contract",
    autom8: "✅",
    agency: "6-12 months",
    diy: "N/A",
  },
  {
    feature: "Cost",
    autom8: "From $500/mo",
    agency: "$1,500-5,000/mo",
    diy: "Free (your time)",
  },
  {
    feature: "Time to results",
    autom8: "2-3 months",
    agency: "3-6 months",
    diy: "6-12 months",
  },
];

const faqs = [
  {
    question: "How long until I see results?",
    answer:
      "Most businesses see ranking improvements within 2-3 months. SEO compounds — results get better over time.",
  },
  {
    question: "Do you write the blog content?",
    answer:
      "Yes. We write everything based on your business, services, and target keywords. You can review before publishing.",
  },
  {
    question: "What if I already have an SEO person?",
    answer: "We can work alongside them or take over. We'll audit what's been done and build from there.",
  },
  {
    question: "Do I need a website from you to use this?",
    answer:
      "No, but it works best with sites we build or manage. We can work with most modern platforms.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Month-to-month, no contracts. We keep you because it works, not because you're locked in.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "SEO + Content for Local Businesses | Autom8 Everything",
  description:
    "Monthly SEO and content that helps local businesses rank higher in search, grow traffic, and get more calls.",
  path: "/services/seo-content",
  keywords: [
    "local seo services",
    "seo content marketing",
    "google business profile management",
    "small business seo",
    "monthly seo service",
  ],
});

export default function SeoContentPage() {
  const serviceSchema = buildServiceSchema({
    name: "SEO + Content",
    description:
      "Monthly local SEO and content execution including keyword targeting, on-page optimization, GBP management, and citations.",
    path: "/services/seo-content",
  });

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4">SEARCH & CONTENT</p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Show Up When Customers Search for What You Do
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl">
            Monthly SEO and content that keeps your business ranking in local search. We do the work — you get the
            calls.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
            >
              Book a Call
            </Link>
            <Link
              href="#pricing"
              className="inline-block px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:border-[#8B5CF6]/60"
            >
              See Pricing
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
            What&apos;s Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {includedFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-[#0A0A0F] border border-white/5 rounded-2xl p-8 hover:border-[#8B5CF6]/30 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-[#A1A1AA] leading-relaxed">{feature.description}</p>
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
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">Monthly Service</p>
            <p className="text-5xl font-bold mb-2">From $500/mo</p>
            <p className="text-[#A1A1AA] mb-6">Scope depends on location count and market competition.</p>
            <ul className="text-left max-w-md mx-auto space-y-2 text-[#A1A1AA] text-sm mb-8">
              <li>✓ Keyword research</li>
              <li>✓ Weekly content</li>
              <li>✓ On-page SEO</li>
              <li>✓ GBP management</li>
              <li>✓ Local citations</li>
              <li>✓ Monthly reports</li>
            </ul>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Why Autom8 vs an SEO Agency or DIY?
          </h2>
          <p className="text-[#A1A1AA] mb-8 max-w-3xl">
            You don&apos;t need a giant agency retainer or another DIY project on your plate. We keep the strategy simple,
            execute consistently, and show you exactly what changed each month.
          </p>

          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="bg-[#0A0A0F] text-left">
                    <th className="p-4 font-semibold">Feature</th>
                    <th className="p-4 border-l border-white/10 font-semibold">Autom8</th>
                    <th className="p-4 border-l border-white/10 font-semibold">Traditional Agency</th>
                    <th className="p-4 border-l border-white/10 font-semibold">DIY</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="border-t border-white/10">
                      <td className="p-4 text-[#A1A1AA]">{row.feature}</td>
                      <td className="p-4 border-l border-white/10 text-[#8B5CF6] font-medium">{row.autom8}</td>
                      <td className="p-4 border-l border-white/10 text-[#A1A1AA]">{row.agency}</td>
                      <td className="p-4 border-l border-white/10 text-[#A1A1AA]">{row.diy}</td>
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
            Start Ranking Higher This Month
          </h2>
          <p className="text-[#A1A1AA] text-lg mb-8">
            Book a call and we&apos;ll show you exactly where you stand and what it takes to move up.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
          >
            Book a Call
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
