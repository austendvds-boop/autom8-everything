import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";

const sections = [
  {
    title: "Using our services",
    body: [
      "By using this website or hiring Autom8 Everything, you agree to these terms.",
      "Project details such as scope, timeline, and price are finalized in your signed proposal or service agreement.",
    ],
  },
  {
    title: "Payments",
    body: [
      "Invoices are due based on the schedule in your agreement.",
      "Late payments may pause active work until the account is current.",
    ],
  },
  {
    title: "What we need from you",
    body: [
      "To keep projects moving, you agree to provide timely feedback, approvals, and access to your business tools when needed.",
      "Delays in approvals or missing information can change launch timelines.",
    ],
  },
  {
    title: "Text message terms",
    body: [
      "If you opt in to receive text messages, you agree to receive service-related updates and reminders.",
      "Message frequency varies. Message and data rates may apply.",
      "Reply STOP to stop receiving text messages. Reply HELP for help.",
    ],
  },
  {
    title: "Results and expectations",
    body: [
      "We work to improve your lead flow, response speed, and customer experience, but we cannot promise exact revenue or ranking outcomes.",
      "Your results also depend on offer quality, follow-up speed, and market conditions.",
    ],
  },
  {
    title: "Cancellations",
    body: [
      "Either party may end service based on the notice period in the signed agreement.",
      "Work already completed and approved charges remain due.",
    ],
  },
  {
    title: "Liability",
    body: [
      "Autom8 Everything is not responsible for indirect or consequential losses.",
      "Our total liability is limited to the amount paid by you for the service period tied to the claim.",
    ],
  },
  {
    title: "Arizona law",
    body: [
      "These terms are governed by Arizona law.",
      "Any dispute that cannot be resolved directly will be handled in Arizona.",
    ],
  },
  {
    title: "Questions about these terms",
    body: [
      "Autom8 Everything is a service-area business, so we do not list a public storefront address on this site.",
      "For questions about these terms, email hello@autom8everything.com before placing an order or starting service.",
    ],
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "Plain-English service terms for Autom8 Everything.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <p className="mb-3 text-sm uppercase tracking-wide text-[#8B5CF6]">Last updated: March 2026</p>
          <p className="mb-3 text-sm uppercase tracking-wide text-[#8B5CF6]">Effective date: March 9, 2026</p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Terms of Service
          </h1>
          <p className="text-[#A1A1AA] text-lg mb-10">
            These terms explain how Autom8 Everything works with you and what both sides can expect.
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
            Need contract details for your business? Email <a href="mailto:hello@autom8everything.com" className="text-[#8B5CF6] hover:text-[#A78BFA]">hello@autom8everything.com</a> or <Link href="/contact" className="text-[#8B5CF6] hover:text-[#A78BFA]">contact us</Link>.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
