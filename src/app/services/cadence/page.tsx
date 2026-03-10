import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CadenceDemoPlaceholder from "@/components/CadenceDemoPlaceholder";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ComparisonTable from "@/components/ComparisonTable";
import { buildFaqSchema, buildMetadata } from "@/lib/seo";

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
  {
    question: "What is AI phone answering?",
    answer:
      "AI phone answering uses voice AI to answer your business calls in real time. It handles common questions, takes messages, and routes urgent calls - without a human receptionist.",
  },
  {
    question: "How does an AI receptionist work for small businesses?",
    answer:
      "An AI receptionist like Cadence answers every call with your custom greeting, handles FAQs about your services and hours, and sends you a summary. It works 24/7 so you never miss a lead.",
  },
  {
    question: "Is AI phone answering better than voicemail?",
    answer:
      "Yes. 80% of callers won't leave a voicemail. AI phone answering engages callers immediately, answers their questions, and captures their information - so you don't lose the lead.",
  },
  {
    question: "Can I use an automated phone answering service in Phoenix?",
    answer:
      "Yes. Cadence is built by Autom8 Everything in Phoenix, AZ and serves local businesses across the Valley. Setup takes about 5 minutes.",
  },
  {
    question: "How much does an AI receptionist cost compared to hiring?",
    answer:
      "Cadence costs $199/month. A full-time receptionist costs $2,500-$4,000+/month. You get 24/7 coverage at a fraction of the cost.",
  },
  {
    question: "Will callers know they're talking to AI?",
    answer:
      "Cadence sounds natural and conversational. Most callers don't realize it's AI - they just get their questions answered quickly.",
  },
  {
    question: "Can an automated phone answering service book appointments?",
    answer:
      "Yes. Cadence can collect caller information and schedule follow-ups based on rules you set during onboarding.",
  },
  {
    question: "What types of businesses use AI phone answering?",
    answer:
      "HVAC companies, plumbers, dentists, contractors, law firms, and any service business that loses leads to missed calls. If you rely on phone leads, Cadence helps.",
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
  title: "AI Phone Answering for Small Business | Cadence by Autom8 Everything",
  description:
    "Cadence answers your business calls, handles common questions, and helps customers take the next step. 7-day free trial, then $199/month.",
  path: "/services/cadence",
  keywords: [
    "AI phone answering",
    "AI receptionist for small business",
    "automated phone answering service Phoenix",
    "voice receptionist",
    "business call answering",
    "small business phone answering",
    "cadence receptionist",
    "after hours call coverage",
  ],
});

export default function CadencePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "AI Voice Receptionist",
    name: "Cadence Voice Receptionist",
    description:
      "AI-powered voice receptionist that answers business calls 24/7, handles FAQs, routes urgent calls, and sends call summaries. Built for small businesses in Phoenix, Arizona.",
    provider: {
      "@type": "LocalBusiness",
      name: "Autom8 Everything",
      url: "https://autom8everything.com",
    },
    areaServed: "Phoenix, Arizona",
    url: "https://autom8everything.com/services/cadence",
    offers: {
      "@type": "Offer",
      price: "199",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "199",
        priceCurrency: "USD",
        unitText: "MONTH",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: "1",
          unitCode: "MON",
        },
      },
      description: "Monthly subscription. 7-day free trial. Cancel anytime.",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="min-h-screen bg-[#0A0A0F] pb-20 md:pb-0">
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
            <Link href="/portal/checkout?product=cadence" className="btn-secondary text-lg px-8 py-4">
              Start Your 7-Day Free Trial
            </Link>
          </div>
          <p className="mt-4 text-sm text-[#71717A]">7-day free trial · No credit card required to start</p>
          <p className="mt-2 text-sm text-[#A1A1AA]">
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

      {/* CRM Integration Coming Soon */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl text-center px-6">
          <span className="inline-block rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 mb-6">
            Coming Soon
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Automatic Lead Capture</h2>
          <p className="mt-4 text-lg text-[#A1A1AA] max-w-2xl mx-auto">
            Every call logged, no manual entry. Cadence captures caller name, phone number, call topic, and outcome
            — automatically. No more sticky notes or missed follow-ups.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-3xl mx-auto">
            <div className="rounded-2xl border border-white/8 bg-[#12121A]/80 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#8B5CF6]/20">
                <svg className="h-6 w-6 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white">Incoming Call</h3>
              <p className="mt-1 text-xs text-[#A1A1AA]">Cadence answers and handles the conversation</p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-[#12121A]/80 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/20">
                <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white">AI Summary</h3>
              <p className="mt-1 text-xs text-[#A1A1AA]">Name, phone, topic, and outcome captured</p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-[#12121A]/80 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400/20">
                <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white">CRM Sync</h3>
              <p className="mt-1 text-xs text-[#A1A1AA]">Auto-push to HubSpot or GoHighLevel</p>
            </div>
          </div>

          <p className="mt-6 text-sm text-[#71717A]">
            CRM integration coming soon. Call logging and summaries available now in your dashboard.
          </p>
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
              <Link href="/portal/checkout?product=cadence" className="btn-secondary text-lg px-8 py-4">
                Start Your Free Trial Online
              </Link>
            </div>
            <p className="mt-4 text-sm text-[#71717A]">7-day free trial · No credit card required to start</p>
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
            <Link href="/portal/checkout?product=cadence" className="btn-secondary text-lg px-8 py-4">
              Start Your Free Trial Online
            </Link>
          </div>
          <p className="mt-6 text-sm text-[#71717A]">7-day free trial · No credit card required to start</p>
          <p className="mt-2 text-sm text-[#A1A1AA]">7-day free trial • No credit card • Live in 5 minutes</p>
        </div>
      </section>

      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
