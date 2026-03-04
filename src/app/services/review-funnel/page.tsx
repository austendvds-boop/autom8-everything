import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";

const steps = [
  {
    title: "Finish a Job",
    description: "Complete a service for your customer. That's the only thing you do.",
  },
  {
    title: "We Send the Request",
    description: "Your customer gets a friendly text or email asking for a review. Timed perfectly.",
  },
  {
    title: "Reviews Roll In",
    description: "Happy customers leave Google reviews. Unhappy ones get routed to private feedback first.",
  },
];

const includedFeatures = [
  {
    title: "Automated Review Requests",
    description: "Text or email sent after every completed job. No manual follow-up needed.",
  },
  {
    title: "Smart Routing",
    description: "Happy customers go to Google. Unhappy ones go to a private form so you can fix it first.",
  },
  {
    title: "Google Review Link",
    description: "One-tap link takes customers straight to your Google review page. No friction.",
  },
  {
    title: "Review Monitoring",
    description: "See all your reviews across platforms in one dashboard. Get alerted on new ones.",
  },
  {
    title: "Response Templates",
    description: "Reply to reviews quickly with customizable templates. Stay professional, save time.",
  },
  {
    title: "Monthly Reports",
    description: "Track your rating trend, review volume, and response rate month over month.",
  },
];

const comparisonRows = [
  {
    feature: "Setup complexity",
    autom8: "Done for you",
    competitor: "Self-serve",
    diy: "Manual",
  },
  {
    feature: "Monthly cost",
    autom8: "$149/mo",
    competitor: "$300-500/mo",
    diy: "Free (your time)",
  },
  {
    feature: "Smart negative routing",
    autom8: "✅",
    competitor: "✅",
    diy: "❌",
  },
  {
    feature: "Automated requests",
    autom8: "✅",
    competitor: "✅",
    diy: "❌",
  },
  {
    feature: "No long-term contract",
    autom8: "✅",
    competitor: "Annual contracts",
    diy: "N/A",
  },
  {
    feature: "Local business focused",
    autom8: "✅",
    competitor: "Enterprise-first",
    diy: "N/A",
  },
];

const faqs = [
  {
    question: "How do you send review requests?",
    answer:
      "Text message or email — your choice. Sent automatically after you mark a job complete.",
  },
  {
    question: "What if a customer is unhappy?",
    answer:
      "They're routed to a private feedback form instead of Google. You get a chance to make it right first.",
  },
  {
    question: "Do I need special software?",
    answer:
      "No. We set everything up. You just tell us when a job is done — or we integrate with your scheduling tool.",
  },
  {
    question: "How many reviews can I expect?",
    answer: "Most businesses see 3-5x more reviews within the first month. Results depend on your volume.",
  },
  {
    question: "Can I customize the messages?",
    answer:
      "Yes. We write the initial templates, and you can adjust the tone and timing to match your brand.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Review Funnel for Local Businesses | Autom8 Everything",
  description:
    "Automated review requests after every job. Get more 5-star Google reviews, protect your rating, and build trust on autopilot.",
  path: "/services/review-funnel",
  keywords: [
    "review funnel",
    "google review automation",
    "local business reputation management",
    "automated review requests",
    "5 star review system",
  ],
});

export default function ReviewFunnelPage() {
  const serviceSchema = buildServiceSchema({
    name: "Review Funnel",
    description:
      "Automated review requests with smart routing that sends happy customers to Google and unhappy customers to private feedback.",
    path: "/services/review-funnel",
  });

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4">REPUTATION</p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Turn Every Happy Customer Into a 5-Star Review
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl">
            Automated review requests after every job. More Google reviews, better ratings, more trust — on autopilot.
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
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">Per Location</p>
            <p className="text-5xl font-bold mb-2">
              $149<span className="text-xl text-[#A1A1AA]">/month</span>
            </p>
            <p className="text-[#A1A1AA] mb-6">Setup included.</p>
            <ul className="text-left max-w-md mx-auto space-y-2 text-[#A1A1AA] text-sm mb-8">
              <li>✓ Automated review requests</li>
              <li>✓ Smart routing</li>
              <li>✓ Monitoring dashboard</li>
              <li>✓ Response templates</li>
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
            Why Autom8 vs BirdEye, Podium, or DIY?
          </h2>
          <p className="text-[#A1A1AA] mb-8 max-w-3xl">
            Enterprise platforms can get expensive fast, and DIY follow-up almost never stays consistent. Autom8 gives
            you the same core outcomes with less complexity and a simpler monthly price.
          </p>

          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="bg-[#0A0A0F] text-left">
                    <th className="p-4 font-semibold">Feature</th>
                    <th className="p-4 border-l border-white/10 font-semibold">Autom8</th>
                    <th className="p-4 border-l border-white/10 font-semibold">BirdEye/Podium</th>
                    <th className="p-4 border-l border-white/10 font-semibold">DIY</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="border-t border-white/10">
                      <td className="p-4 text-[#A1A1AA]">{row.feature}</td>
                      <td className="p-4 border-l border-white/10 text-[#8B5CF6] font-medium">{row.autom8}</td>
                      <td className="p-4 border-l border-white/10 text-[#A1A1AA]">{row.competitor}</td>
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
            Start Getting More Reviews This Week
          </h2>
          <p className="text-[#A1A1AA] text-lg mb-8">
            Setup takes less than a day. Your first review request goes out tomorrow.
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
