import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildFaqSchema, buildMetadata, buildServiceSchema } from "@/lib/seo";

const steps = [
  {
    title: "Start your trial",
    description: "Create your account and choose your business settings in a few minutes.",
  },
  {
    title: "Forward your calls",
    description: "Point your business number to Cadence so calls are covered day and night.",
  },
  {
    title: "Let Cadence handle the front desk",
    description: "Customers get answers, calls are routed correctly, and you get a summary after each call.",
  },
];

const faqs = [
  {
    question: "Do I need a new phone number?",
    answer: "No. You can keep your current number and forward calls to Cadence.",
  },
  {
    question: "How long does setup take?",
    answer: "Most businesses are live the same day.",
  },
  {
    question: "Can Cadence transfer urgent calls to me?",
    answer: "Yes. You can set rules for when a call should go straight to you or your team.",
  },
  {
    question: "Is there a long-term contract?",
    answer: "No. Cadence is month-to-month.",
  },
  {
    question: "What happens after the trial?",
    answer: "If you keep it, your plan moves to $199/month. If not, you can cancel before billing starts.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4">Cadence</p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Every call gets answered, even when you are busy.
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl">
            Cadence works like a voice receptionist for your business, so customers get help right away and you stop losing calls to voicemail.
          </p>
          <div className="mt-8">
            <p className="text-[#C4B5FD] mb-4 text-lg">Try it right now — call (480) 631-3993</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+14806313993"
                className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold text-center"
              >
                Call (480) 631-3993
              </a>
              <Link
                href="/get-started"
                className="inline-block px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:border-[#8B5CF6]/60 text-center"
              >
                Prefer to type? Use the web form
              </Link>
            </div>
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
            What Cadence Helps With
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ["Never miss another lead", "Calls are answered when you are on a job, with a customer, or closed for the day."],
              ["Answer common questions", "Customers can get info about services, hours, and next steps without waiting."],
              ["Route calls the right way", "Set clear rules for who gets forwarded calls and when."],
              ["Stay in the loop", "Get quick call summaries so you can follow up fast."],
            ].map(([title, description]) => (
              <div key={title} className="bg-[#0A0A0F] border border-white/5 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                <p className="text-[#A1A1AA] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" id="pricing">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Simple Pricing
          </h2>
          <div className="rounded-2xl border border-[#8B5CF6]/40 bg-[#12121A] p-10 mt-8">
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">Cadence Plan</p>
            <p className="text-5xl font-bold mb-2">
              $199<span className="text-xl text-[#A1A1AA]">/month</span>
            </p>
            <p className="text-[#A1A1AA] mb-6">7-day free trial. Month-to-month. Cancel anytime.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="tel:+14806313993"
                className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
              >
                Call (480) 631-3993
              </a>
              <Link
                href="/get-started"
                className="inline-block px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:border-[#8B5CF6]/60"
              >
                Prefer to type? Use the web form
              </Link>
            </div>
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
            Ready to stop missing calls?
          </h2>
          <p className="text-[#A1A1AA] text-lg mb-8">Try it right now — call (480) 631-3993.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:+14806313993"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
            >
              Call (480) 631-3993
            </a>
            <Link
              href="/get-started"
              className="inline-block px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:border-[#8B5CF6]/60"
            >
              Prefer to type? Use the web form
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

