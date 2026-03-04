import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";

const steps = [
  {
    title: "Finish the job",
    description: "You do great work for your customer like normal.",
  },
  {
    title: "Request goes out automatically",
    description: "A friendly review request is sent by text or email at the right time.",
  },
  {
    title: "More reviews, better follow-up",
    description: "Happy customers leave public reviews and your team can respond quickly.",
  },
];

const faqs = [
  {
    question: "How are requests sent?",
    answer: "By text or email, based on your preference.",
  },
  {
    question: "Can we edit the message?",
    answer: "Yes. You can use your own voice and branding.",
  },
  {
    question: "Can this work with my current process?",
    answer: "Yes. We can connect it to your current workflow or keep setup simple if you prefer.",
  },
  {
    question: "Is this available now?",
    answer: "It is currently in rollout. Join the waitlist and we will contact you as spots open.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Review Funnel | Autom8 Everything",
  description: "Collect more customer reviews with automatic follow-up and simple response workflows.",
  path: "/services/review-funnel",
  keywords: [
    "review funnel",
    "google review follow up",
    "small business review system",
    "automated review requests",
  ],
});

export default function ReviewFunnelPage() {
  const serviceSchema = buildServiceSchema({
    name: "Review Funnel",
    description: "Automated review request flow that helps local businesses collect and respond to reviews.",
    path: "/services/review-funnel",
  });

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4">Review Funnel</p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Turn good service into more 5-star reviews.
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl">
            Review Funnel asks at the right time, keeps the process easy for customers, and helps your team stay consistent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
            >
              Join the Waitlist
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
            What You Get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ["Automatic review requests", "No more reminding your team to ask manually."],
              ["Simple customer experience", "One clear request with one easy next step."],
              ["Response support", "Stay on top of new reviews and reply quickly."],
              ["Stronger local trust", "More quality reviews help future customers choose you."],
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
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">Review Funnel</p>
            <p className="text-4xl font-bold mb-3">Coming Soon</p>
            <p className="text-[#A1A1AA] mb-6">Join the waitlist and we will share launch pricing first.</p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
            >
              Join the Waitlist
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
            Want first access when it opens?
          </h2>
          <p className="text-[#A1A1AA] text-lg mb-8">Tell us about your business and we will reserve your spot.</p>
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
