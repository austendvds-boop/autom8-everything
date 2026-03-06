import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";

const sections = [
  {
    title: "What we collect",
    body: [
      "We collect the details you share with us, like your name, phone number, email, business details, and any notes you send through our forms.",
      "If you become a customer, we may also store project notes, billing details, and communication history so we can deliver your service.",
    ],
  },
  {
    title: "How we use your information",
    body: [
      "We use your information to reply to you, provide the services you asked for, send updates about active work, and improve your customer experience.",
      "We do not sell your personal information.",
    ],
  },
  {
    title: "Text message consent and opt-out",
    body: [
      "If you give us your phone number, we may send service-related text messages such as setup updates, reminders, and support follow-ups.",
      "Message frequency varies by account activity. Message and data rates may apply.",
      "Reply STOP at any time to stop text messages. Reply HELP for help.",
    ],
  },
  {
    title: "When we share information",
    body: [
      "We only share information when needed to run your service, process payments, or follow the law.",
      "Any company we work with on your behalf must use your information only for the work requested.",
    ],
  },
  {
    title: "How long we keep data",
    body: [
      "We keep business records for as long as needed to provide service, support your account, and meet legal obligations.",
      "You can request deletion of your contact record at any time unless we are required to keep part of it for legal or billing reasons.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You can ask to review, correct, or delete your information.",
      "You can also ask us to stop non-essential communications.",
    ],
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Autom8 Everything collects, uses, and protects your information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <p className="mb-3 text-sm uppercase tracking-wide text-[#8B5CF6]">Last updated: March 2026</p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Privacy Policy
          </h1>
          <p className="text-[#A1A1AA] text-lg mb-10">
            This page explains what information we collect, why we collect it, and how you can control it.
          </p>

          <div className="space-y-6">
            {sections.map((section) => (
              <section key={section.title} className="rounded-2xl border border-white/10 bg-[#12121A] p-6">
                <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
                <div className="space-y-3 text-[#A1A1AA]">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="text-[#A1A1AA] text-lg mt-10">
            Questions about privacy? <Link href="/contact" className="text-[#8B5CF6] hover:text-[#A78BFA]">Contact us</Link>.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
