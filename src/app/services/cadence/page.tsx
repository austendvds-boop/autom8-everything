import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CadenceDemoPlaceholder from "@/components/CadenceDemoPlaceholder";
import ComparisonTable from "@/components/ComparisonTable";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";

const faqs = [
  {
    question: "Do I need a new phone number?",
    answer: "No. You can keep your current number and forward calls to Cadence.",
  },
  {
    question: "How long does setup take?",
    answer: "Most businesses are live the same day. Onboarding typically takes about 5 minutes.",
  },
  {
    question: "Can Cadence transfer urgent calls to me?",
    answer: "Yes. You can set rules for when a call should go straight to you or your team.",
  },
  {
    question: "Is there a long-term contract?",
    answer: "No. Cadence is month-to-month. Cancel anytime.",
  },
  {
    question: "What happens after the trial?",
    answer: "If you keep it, your plan moves to $199/month. If not, you can cancel before billing starts.",
  },
  {
    question: "How does Cadence know about my business?",
    answer:
      "We set it up with your business info, services, hours, and any custom answers during onboarding. Takes about 5 minutes.",
  },
  {
    question: "What if the caller needs a real person?",
    answer:
      "Cadence can transfer to you or your team based on rules you set. Urgent calls go straight through.",
  },
  {
    question: "Can I listen to call recordings?",
    answer:
      "You get detailed summaries after every call. Recording options depend on your plan and local regulations.",
  },
];

const features = [
  {
    title: "Answers Every Call",
    description: "No voicemail, no hold music. Customers get a real answer in seconds.",
  },
  {
    title: "Handles Your FAQs",
    description: "Hours, services, pricing, next steps — Cadence knows your answers.",
  },
  {
    title: "Routes Calls Intelligently",
    description: "Urgent? Transfer to you. Routine? Handle and summarize.",
  },
  {
    title: "Sends Call Summaries",
    description:
      "Get a text or email after every call with who called, what they needed, and what happened.",
  },
  {
    title: "Books and Schedules",
    description: "Cadence can collect info and schedule follow-ups based on your rules.",
  },
  {
    title: "Works 24/7/365",
    description: "Nights, weekends, holidays. Your phone is always answered.",
  },
];

const useCases = [
  {
    title: "HVAC Tech on a Job",
    scenario:
      "You're on a roof in 110° heat. A new customer calls. Cadence answers, gets their info, and texts you a summary when you're done.",
  },
  {
    title: "Dental Office",
    scenario:
      "Your front desk is with a patient. Cadence answers the scheduling question and lets your team stay focused.",
  },
  {
    title: "Plumber After Hours",
    scenario:
      "It's 9pm. A homeowner has a burst pipe. Cadence answers, flags it as urgent, and forwards to your on-call number.",
  },
  {
    title: "Contractor on Vacation",
    scenario:
      "You're off the grid for a week. Cadence handles every call and sends you daily summaries.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Cadence Voice Receptionist for Local Businesses | Autom8 Everything",
  description:
    "Cadence answers your business calls, handles common questions, and helps customers take the next step. 7-day free trial, then $199/month.",
  path: "/services/cadence",
  keywords: [
    "voice receptionist",
    "business call answering",
    "small business phone answering",
    "cadence receptionist",
    "after hours call coverage",
  ],
});

export default function CadencePage() {
  const serviceSchema = buildServiceSchema({
    name: "Cadence Voice Receptionist",
    description:
      "Voice receptionist service that answers calls, handles common questions, and routes customers based on your rules.",
    path: "/services/cadence",
  });

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }}
      />

      {/* 1. Hero */}
      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4">AI Voice Receptionist</p>
          <h1
            className="text-5xl md:text-6xl font-semibold mb-6"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Every Missed Call Is Money Walking Out the Door.
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl">
            Cadence answers your business calls in seconds — day and night. No hold times. No voicemail.
            Just a professional voice that knows your business.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href="tel:+14806313993" className="btn-primary text-lg px-10 py-4">
              Call Cadence Live — (480) 631-3993
            </a>
            <Link href="/get-started" className="btn-secondary text-lg px-8 py-4">
              Start Your 7-Day Free Trial
            </Link>
          </div>
          <p className="mt-4 text-sm text-[#A1A1AA]">
            $199/mo after trial • Month-to-month • Cancel anytime
          </p>
        </div>
      </section>

      {/* 2. Pain-point math */}
      <section className="py-20 bg-[#12121A]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-heading mb-10">What Missed Calls Actually Cost You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                stat: "80%",
                text: "of callers won't leave a voicemail",
                source: "Ruby Receptionist",
              },
              {
                stat: "$1,000+",
                text: "average value per missed service call",
                source: "Industry data",
              },
              {
                stat: "62%",
                text: "of calls to small businesses go unanswered",
                source: "Numa Research",
              },
            ].map((item) => (
              <div key={item.stat} className="card-base p-8 text-center">
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-3">{item.stat}</p>
                <p className="text-[#A1A1AA] mb-2">{item.text}</p>
                <p className="text-xs text-[#52525B]">Source: {item.source}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-lg text-[#C4B5FD]">
            Stop losing money. Let Cadence answer.
          </p>
        </div>
      </section>

      {/* 3. Demo */}
      <CadenceDemoPlaceholder />

      {/* 4. Features */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-heading mb-4">Everything Cadence Does For You</h2>
          <p className="section-subheading mb-10">
            One receptionist that never takes a day off.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="card-base p-6">
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Use cases */}
      <section className="py-20 bg-[#12121A]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-heading mb-4">Built for Real Business Situations</h2>
          <p className="section-subheading mb-10">
            The moments where Cadence pays for itself.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((uc) => (
              <div key={uc.title} className="card-base p-8">
                <h3 className="text-lg font-semibold mb-3 text-[#C4B5FD]">{uc.title}</h3>
                <p className="text-[#A1A1AA] leading-relaxed">{uc.scenario}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Comparison */}
      <ComparisonTable
        title="Cadence vs the Alternatives"
        subtitle="See how Cadence compares to what most businesses do today."
        columns={[
          { label: "Voicemail" },
          { label: "Hiring a Receptionist" },
          { label: "Cadence", highlight: true },
        ]}
        rows={[
          {
            feature: "Availability",
            values: ["When you remember to check", "Business hours only", "24/7/365"],
          },
          {
            feature: "Monthly cost",
            values: ["Free (but costly)", "$2,500–$4,000+", "$199/mo"],
          },
          {
            feature: "Setup time",
            values: ["Instant", "Weeks to hire + train", "5 minutes"],
          },
          {
            feature: "Handles FAQs",
            values: ["No", "If trained", "Yes, customized to your business"],
          },
          {
            feature: "Routes calls",
            values: ["No", "Yes", "Yes, with rules you set"],
          },
          {
            feature: "Call summaries",
            values: ["No", "Sometimes", "After every call"],
          },
          {
            feature: "Brand consistency",
            values: ["Generic greeting", "Varies by person", "Always on-brand"],
          },
        ]}
      />

      {/* 7. Pricing */}
      <section className="py-20 bg-[#12121A]" id="pricing">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="section-heading mb-4">Simple Pricing</h2>
          <div className="rounded-2xl border border-[#8B5CF6]/40 bg-[#0A0A0F] p-10 mt-8">
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">Cadence Plan</p>
            <p className="text-5xl font-bold mb-2">
              $199<span className="text-xl text-[#A1A1AA]">/month</span>
            </p>
            <p className="text-[#A1A1AA] mb-1">7-day free trial. Month-to-month. Cancel anytime.</p>
            <p className="text-[#C4B5FD] mb-6 text-sm font-medium">
              Less than $7/day. Less than a single missed lead.
            </p>
            <ul className="text-left max-w-xs mx-auto space-y-2 mb-8">
              {[
                "24/7 answering",
                "Custom business greeting",
                "Call routing rules",
                "Summaries after every call",
                "7-day free trial",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-[#D4D4D8]">
                  <span className="text-[#10B981]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:+14806313993" className="btn-primary text-lg px-10 py-4">
                Call (480) 631-3993
              </a>
              <Link href="/get-started" className="btn-secondary text-lg px-8 py-4">
                Start Your Free Trial Online
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-20">
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

      {/* 9. Final CTA */}
      <section className="py-20 bg-[#12121A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="section-heading mb-4">Ready to Stop Losing Calls?</h2>
          <p className="section-subheading mx-auto mb-8">
            Try Cadence right now. Call the number below and hear it answer like your receptionist.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:+14806313993" className="btn-primary text-lg px-10 py-4">
              Call (480) 631-3993
            </a>
            <Link href="/get-started" className="btn-secondary text-lg px-8 py-4">
              Start Your Free Trial Online
            </Link>
          </div>
          <p className="mt-6 text-sm text-[#A1A1AA]">
            7-day free trial • No credit card • Live in 5 minutes
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
