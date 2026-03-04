import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Minus } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Autom8 Pricing",
  description: "Simple pricing for Cadence, websites, review funnels, SEO, and custom apps.",
  path: "/pricing",
});

type CtaCell = {
  label: string;
  href: string;
};

type FeatureCell = {
  status: "yes" | "no";
  note?: string;
};

type CellValue = string | CtaCell | FeatureCell;

type ComparisonRow = {
  label: string;
  values: CellValue[];
  isCtaRow?: boolean;
};

const productHeaders = ["Cadence", "Websites", "Review Funnel", "SEO & Content", "Custom Apps"];

const comparisonRows: ComparisonRow[] = [
  {
    label: "Price",
    values: ["$199/mo", "From $799", "$149/mo", "From $500/mo", "Custom quote"],
  },
  {
    label: "Best for",
    values: ["Missing calls", "No website or bad one", "Few/no reviews", "Not showing up on Google", "Manual processes"],
  },
  {
    label: "Setup",
    values: ["5 minutes", "~2 weeks", "Less than a day", "1 week audit", "2-4 weeks"],
  },
  {
    label: "Contract",
    values: ["Month-to-month", "One-time + optional support", "Month-to-month", "Month-to-month", "Per-project"],
  },
  {
    label: "Free trial",
    values: [
      { status: "yes", note: "7 days" },
      { status: "no", note: "None" },
      { status: "no", note: "None" },
      { status: "no", note: "None" },
      { status: "no", note: "None" },
    ],
  },
  {
    label: "CTA",
    isCtaRow: true,
    values: [
      { label: "Start Free Trial", href: "/cadence/get-started" },
      { label: "Learn More", href: "/services/website-creation" },
      { label: "Learn More", href: "/services/review-funnel" },
      { label: "Learn More", href: "/services/seo-content" },
      { label: "Book a Call", href: "/contact" },
    ],
  },
];

const faqs = [
  {
    question: "Can I combine services?",
    answer: "Yes. You can run one service or stack multiple services at the same time.",
  },
  {
    question: "Do you require a long-term contract?",
    answer: "No. Recurring plans are month-to-month. Website and custom app work is scoped per project.",
  },
  {
    question: "How do I get started?",
    answer: "Use the links in the table to start, or book a call if you want a recommendation.",
  },
];

function isCtaCell(value: CellValue): value is CtaCell {
  return typeof value !== "string" && "href" in value;
}

function isFeatureCell(value: CellValue): value is FeatureCell {
  return typeof value !== "string" && "status" in value;
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Autom8 Pricing
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto">
            Compare each product side by side. Start with one service and add more when you need them.
          </p>
        </div>
      </section>

      <section className="pb-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-3xl border border-white/10 bg-[#111118] overflow-x-auto">
            <table className="w-full min-w-[920px] border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide text-[#A1A1AA] border-b border-white/10 bg-[#12121A]">
                    Compare Plans
                  </th>
                  {productHeaders.map((header, index) => (
                    <th
                      key={header}
                      className={`px-5 py-4 text-left text-base font-semibold border-b border-white/10 ${
                        index === 0
                          ? "bg-[#1A1230] text-white border-l border-r border-[#8B5CF6]/40"
                          : "bg-[#12121A] text-white"
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, rowIndex) => {
                  const isLastRow = rowIndex === comparisonRows.length - 1;

                  return (
                    <tr key={row.label}>
                      <th
                        scope="row"
                        className={`px-5 py-4 text-left text-sm font-semibold text-white/90 bg-[#0F0F16] ${
                          isLastRow ? "" : "border-b border-white/10"
                        }`}
                      >
                        {row.label}
                      </th>

                      {row.values.map((value, colIndex) => (
                        <td
                          key={`${row.label}-${colIndex}`}
                          className={`px-5 py-4 text-sm align-middle ${
                            isLastRow ? "" : "border-b border-white/10"
                          } ${
                            colIndex === 0
                              ? "bg-[#160F28] border-l border-r border-[#8B5CF6]/40"
                              : "bg-[#111118] text-[#E4E4E7]"
                          }`}
                        >
                          {row.isCtaRow && isCtaCell(value) ? (
                            <Link
                              href={value.href}
                              className={`inline-flex items-center gap-1 font-semibold transition-colors ${
                                colIndex === 0 ? "text-[#C4B5FD] hover:text-[#DDD6FE]" : "text-[#A78BFA] hover:text-[#C4B5FD]"
                              }`}
                            >
                              {value.label} <span aria-hidden>→</span>
                            </Link>
                          ) : isFeatureCell(value) ? (
                            <span className={`inline-flex items-center gap-2 ${colIndex === 0 ? "text-white" : "text-[#D4D4D8]"}`}>
                              {value.status === "yes" ? (
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#8B5CF6]" aria-hidden />
                              ) : (
                                <Minus className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
                              )}
                              {value.note ? <span>{value.note}</span> : null}
                            </span>
                          ) : (
                            <span className={colIndex === 0 ? "text-white" : "text-[#D4D4D8]"}>{value as string}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-center text-[#A1A1AA]">
            Need help choosing?{" "}
            <Link href="/contact" className="text-[#A78BFA] hover:text-[#8B5CF6] font-semibold">
              Tell us about your business
            </Link>{" "}
            and we&apos;ll recommend a starting point.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-4xl mx-auto px-6">
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

      <Footer />
    </main>
  );
}
