import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";

const faqs = [
  {
    question: "Do I need a new phone number?",
    answer: "No. You keep your existing number. We give you a Cadence number and you forward calls to it.",
  },
  {
    question: "What happens during the free trial?",
    answer: "Full access for 7 days. If you don't love it, cancel before the trial ends and pay nothing.",
  },
  {
    question: "Can Cadence transfer calls to me?",
    answer: "Yes. For urgent or complex calls, Cadence transfers directly to your cell or office line.",
  },
  {
    question: "What if I already use a VoIP system?",
    answer: "Cadence works with any phone system that supports call forwarding — landlines, cell phones, VoIP, all of it.",
  },
  {
    question: "Is there a contract?",
    answer: "No. Month-to-month. Cancel anytime from your dashboard.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Cadence AI Voice Agent — AI Receptionist for Local Businesses",
  description:
    "Cadence answers your business calls 24/7, books appointments, and handles FAQs. No setup fee, no developer needed. 7-day free trial, then $199/month.",
  path: "/services/cadence",
  keywords: [
    "ai receptionist",
    "ai phone answering service",
    "virtual receptionist for small business",
    "ai voice agent",
    "cadence ai",
  ],
});

export default function CadencePage() {
  const serviceSchema = buildServiceSchema({
    name: "Cadence AI Voice Agent",
    description:
      "AI receptionist that answers business calls 24/7, books appointments, handles FAQs, and transfers urgent calls. $199/month, no setup fee.",
    path: "/services/cadence",
  });

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4">Cadence AI Voice</p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Never Miss a Call Again
          </h1>
          <p className="text-xl text-[#A1A1AA]">
            AI receptionist that answers your business line 24/7. We give you a number, you forward your calls to it. Done in 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/cadence/get-started"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
            >
              Start Free Trial
            </Link>
            <Link
              href="#how-it-works"
              className="inline-block px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:border-[#8B5CF6]/60"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-10" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Live in 5 Minutes. Seriously.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Sign Up & Get Your Number",
                description:
                  "We provision a dedicated phone number for your business. No hardware, no porting.",
              },
              {
                title: "Forward Your Calls",
                description:
                  "Set your existing business line to forward to your new Cadence number. One setting change.",
              },
              {
                title: "Cadence Answers 24/7",
                description:
                  "Cadence handles FAQs, books appointments, and transfers urgent calls to you. You stay in control.",
              },
            ].map((step, index) => (
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
            What Cadence Does
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ["24/7 Call Answering", "Never send another customer to voicemail. Cadence picks up every call, day or night."],
              ["Appointment Booking", "Cadence checks availability and books directly into your calendar."],
              ["FAQ Handling", "Answers common questions about hours, pricing, services, and location automatically."],
              ["Live Transfer", "Urgent calls get transferred to you or your team in real time."],
              ["Call Summaries", "Get a text or email summary after every call so nothing falls through the cracks."],
              ["Zero Tech Setup", "No webhooks, no APIs, no developers. Just call forwarding."],
            ].map(([title, description]) => (
              <div
                key={title}
                className="bg-[#0A0A0F] border border-white/5 rounded-2xl p-8 hover:border-[#8B5CF6]/30 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                <p className="text-[#A1A1AA] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Why Cadence Instead of Vapi, Retell, or GHL Voice?
          </h2>
          <p className="text-[#A1A1AA] mb-8">
            Those platforms are built for developers. You need a phone system, API keys, webhooks, and technical staff to get started.
            Cadence is built for business owners — forward your calls and you&apos;re live.
          </p>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-3 bg-[#12121A] text-sm font-semibold">
              <div className="p-4">Feature</div>
              <div className="p-4 border-l border-white/10">Cadence</div>
              <div className="p-4 border-l border-white/10">Vapi / Retell / GHL</div>
            </div>
            {[
              ["Setup time", "5 minutes", "Hours to days"],
              ["Requires developer", "No", "Yes"],
              ["Existing phone infra", "Not needed", "Required"],
              ["Monthly cost", "$199/mo flat", "Usage-based + infra"],
              ["Setup fee", "$0", "Varies"],
            ].map(([feature, cadence, other]) => (
              <div key={feature} className="grid grid-cols-3 text-sm border-t border-white/10">
                <div className="p-4 text-[#A1A1AA]">{feature}</div>
                <div className="p-4 border-l border-white/10 text-[#8B5CF6]">{cadence}</div>
                <div className="p-4 border-l border-white/10 text-[#A1A1AA]">{other}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Simple Pricing. No Surprises.
          </h2>
          <div className="rounded-2xl border border-[#8B5CF6]/40 bg-[#0A0A0F] p-10 mt-8">
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">All-Inclusive</p>
            <p className="text-5xl font-bold mb-2">
              $199<span className="text-xl text-[#A1A1AA]">/month</span>
            </p>
            <p className="text-[#A1A1AA] mb-6">7-day free trial. No contracts. Cancel anytime.</p>
            <ul className="text-left max-w-sm mx-auto space-y-2 text-[#A1A1AA] text-sm mb-8">
              <li>✓ $0 setup fee</li>
              <li>✓ Dedicated phone number included</li>
              <li>✓ Unlimited calls during trial</li>
              <li>✓ 24/7 AI answering</li>
              <li>✓ Appointment booking</li>
              <li>✓ Call summaries via text/email</li>
              <li>✓ Live transfer to your phone</li>
            </ul>
            <Link
              href="/cadence/get-started"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
            >
              Start Your Free Trial
            </Link>
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
            Stop Missing Calls. Start Your Free Trial.
          </h2>
          <p className="text-[#A1A1AA] text-lg mb-8">Set up in 5 minutes. No credit card required for the trial.</p>
          <Link
            href="/cadence/get-started"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
