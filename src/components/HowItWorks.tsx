"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LucideIcon, Search, Wrench, Rocket } from "lucide-react";
import { reveal, revealReduced, revealStagger } from "@/lib/motion";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Quick Call",
    description: "We learn how you get leads now and where calls or jobs are slipping through.",
    icon: Search,
  },
  {
    number: "02",
    title: "We Build It",
    description: "We launch your site and lead follow-up setup so new leads get a fast response.",
    icon: Wrench,
  },
  {
    number: "03",
    title: "You Keep Growing",
    description: "We keep improving your SEO and reviews so your phone keeps ringing.",
    icon: Rocket,
  },
];

export default function HowItWorks() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-32 relative overflow-hidden bg-[#0A0A0F]">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#8B5CF6]/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div className="text-center mb-20" {...(prefersReducedMotion ? revealReduced : reveal)}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Our Simple <span className="gradient-text">3-Step Process</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg md:text-xl max-w-2xl mx-auto">Three simple steps to help you get more leads and book more work.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <motion.div key={step.number} className="relative" {...revealStagger(index, prefersReducedMotion)}>
                {!isLast && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.3 }}
                      style={{ originX: 0 }}
                    />
                  </div>
                )}

                <div className="text-center">
                  <motion.div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] font-mono text-sm mb-6">
                    {step.number}
                  </motion.div>

                  <motion.div
                    className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-[#111118] border border-white/[0.04] flex items-center justify-center"
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-10 h-10 text-[#8B5CF6]" />
                  </motion.div>

                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-[#A1A1AA] text-[15px] leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
