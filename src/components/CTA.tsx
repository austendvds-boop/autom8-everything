"use client";

import { motion, useReducedMotion } from "framer-motion";
import ShimmerButton from "@/components/ShimmerButton";
import { reveal, revealReduced } from "@/lib/motion";

export default function CTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-40 relative overflow-hidden min-h-[70vh] flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4A030] via-[#B8892A] to-[#0E1015]">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  background: [
                    "radial-gradient(circle at 30% 30%, rgba(212, 160, 48, 0.5) 0%, transparent 50%)",
                    "radial-gradient(circle at 70% 60%, rgba(232, 192, 104, 0.5) 0%, transparent 50%)",
                    "radial-gradient(circle at 40% 80%, rgba(184, 137, 42, 0.5) 0%, transparent 50%)",
                    "radial-gradient(circle at 30% 30%, rgba(212, 160, 48, 0.5) 0%, transparent 50%)",
                  ],
                }
          }
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h2
          className="text-5xl md:text-7xl font-semibold text-white mb-6"
          style={{ fontFamily: "var(--font-manrope), sans-serif" }}
          {...(prefersReducedMotion ? revealReduced : reveal)}
        >
          Your Competitors Are Already Answering Their Calls.
        </motion.h2>

        <motion.p className="text-xl md:text-2xl text-white/80 mb-10" {...(prefersReducedMotion ? revealReduced : reveal)}>
          Start with Cadence today. Add reviews, a website, and SEO when you're ready. No contracts, no risk.
        </motion.p>

        <motion.div className="flex items-center justify-center" {...(prefersReducedMotion ? revealReduced : reveal)}>
          <ShimmerButton href="tel:+14806313993" size="lg" variant="primary">
            Call Cadence Live {"\u2014"} (480) 631-3993
          </ShimmerButton>
        </motion.div>

        <motion.p className="mt-8 text-white/70 text-sm" {...(prefersReducedMotion ? revealReduced : revealReduced)}>
          7-day free trial {"\u2022"} No credit card for trial {"\u2022"} Cancel anytime
        </motion.p>
      </div>
    </section>
  );
}
