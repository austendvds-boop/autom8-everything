import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";

const sections = [
  {
    title: "How we protect your information",
    body: [
      "We limit account access to the team members who need it to do the work.",
      "We use secure passwords, access controls, and trusted service providers for hosting and payments.",
      "We do not place sensitive account values in public code files.",
    ],
  },
  {
    title: "Monitoring and updates",
    body: [
      "We review our systems, update software, and remove unused access whenever possible.",
      "If we detect unusual activity, we investigate quickly and take steps to contain it.",
    ],
  },
  {
    title: "Text message safety",
    body: [
      "We only send text messages to numbers provided by the business owner or customer.",
      "People can stop text messages at any time by replying STOP, and they can reply HELP for help.",
      "Message frequency varies. Message and data rates may apply.",
    ],
  },
  {
    title: "If a security issue happens",
    body: [
      "If we confirm a security issue that affects your data, we will notify you and share what happened, what we fixed, and what steps to take next.",
      "We also document incidents internally so we can improve prevention moving forward.",
    ],
  },
  {
    title: "What you can do",
    body: [
      "Use strong passwords and two-step verification wherever available.",
      "Only share account access with trusted team members.",
      "Tell us right away if you think an account has been compromised.",
    ],
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Security",
  description: "How Autom8 Everything protects your data and handles security incidents.",
  path: "/security",
});

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <p className="mb-3 text-sm uppercase tracking-wide text-[#8B5CF6]">Last updated: March 2026</p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Security
          </h1>
          <p className="text-[#A1A1AA] text-lg mb-10">
            Security is part of every project we run. This page explains our baseline approach.
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
            Need a security review for your company? <Link href="/contact" className="text-[#8B5CF6] hover:text-[#A78BFA]">Contact us</Link>.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
