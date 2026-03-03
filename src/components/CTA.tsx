"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { reveal, revealReduced } from "@/lib/motion";

export default function CTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-40 relative overflow-hidden min-h-[70vh] flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6] via-[#A78BFA] to-[#06B6D4]">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  background: [
                    "radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.5) 0%, transparent 50%)",
                    "radial-gradient(circle at 70% 60%, rgba(6, 182, 212, 0.5) 0%, transparent 50%)",
                    "radial-gradient(circle at 40% 80%, rgba(167, 139, 250, 0.5) 0%, transparent 50%)",
                    "radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.5) 0%, transparent 50%)",
                  ],
                }
          }
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h2 className="text-5xl md:text-7xl font-semibold text-white mb-6" style={{ fontFamily: "var(--font-playfair), serif" }} {...(prefersReducedMotion ? revealReduced : reveal)}>
          Ready to stop losing customers?
        </motion.h2>

        <motion.p className="text-xl md:text-2xl text-white/80 mb-10" {...(prefersReducedMotion ? revealReduced : reveal)}>
          Pick the easiest next step for you.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" {...(prefersReducedMotion ? revealReduced : reveal)}>
          <Link href="/cadence/get-started" className="inline-block px-10 py-5 rounded-full bg-white text-[#0A0A0F] font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow">
            Start Your Free Trial
          </Link>
          <Link href="/contact" className="inline-block px-8 py-4 rounded-full border border-white/40 text-white font-semibold text-lg hover:bg-white/10 transition-colors">
            Book a Quick Call
          </Link>
        </motion.div>

        <motion.p className="mt-8 text-white/70 text-sm" {...(prefersReducedMotion ? revealReduced : revealReduced)}>
          No credit card for the trial. No pressure on the call.
        </motion.p>
      </div>
    </section>
  );
}
