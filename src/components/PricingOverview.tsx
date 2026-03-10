"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { reveal, revealReduced, revealStagger } from "@/lib/motion";

const tiers = [
  {
    title: "Start Free",
    product: "Cadence Phone Answering",
    price: "$199/mo after 7-day free trial",
    cta: { label: "Call Cadence Live", href: "tel:+14806313993" },
  },
  {
    title: "Website Plans",
    product: "Launch $500 • Enterprise $1,000",
    price: "One-time build + optional monthly plans",
    cta: { label: "Get a Free Quote", href: "/contact" },
  },
  {
    title: "Grow Every Month",
    product: "Hosting $50/mo • Growth $299/mo",
    price: "Blog posts, local SEO, monthly reports",
    cta: { label: "Get a Free Quote", href: "/contact" },
  },
];

export default function PricingOverview() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-32 bg-[#0A0A0F]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div className="text-center mb-20" {...(prefersReducedMotion ? revealReduced : reveal)}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg md:text-xl max-w-3xl mx-auto">
            No hidden fees. No long-term contracts. You always know what you&apos;re paying.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.title}
              className="rounded-3xl border border-white/[0.04] bg-[#111118] p-8 hover:border-[#8B5CF6]/40 transition-colors h-full flex flex-col"
              {...revealStagger(index, prefersReducedMotion)}
            >
              <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">{tier.title}</p>
              <h3 className="text-xl font-semibold mb-2">{tier.product}</h3>
              <p className="text-[#A1A1AA] mb-4 text-[15px] leading-relaxed">{tier.price}</p>
              <Link href={tier.cta.href} className="inline-flex w-fit mt-auto px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:border-[#8B5CF6]/60 transition-colors">
                {tier.cta.label}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p className="text-center text-[#A1A1AA] mt-8" {...(prefersReducedMotion ? revealReduced : reveal)}>
          Not sure where to start? <Link href="/contact" className="text-[#A78BFA] hover:text-[#8B5CF6]">Tell Us What You Need.</Link>
        </motion.p>
      </div>
    </section>
  );
}
