"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import BrandLogo from "@/components/BrandLogo";
import { buttonHover, reveal, revealReduced } from "@/lib/motion";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const revealPreset = prefersReducedMotion ? revealReduced : reveal;

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#0A0A0F]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="section-glow section-glow--purple -top-24 -left-24" />
        <div className="section-glow section-glow--cyan -bottom-28 -right-24" />
        <div className="section-glow section-glow--mixed top-1/3 left-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-16">
        <motion.div className="mb-8 flex justify-center" {...revealPreset}>
          <BrandLogo
            size="md"
            showDescriptor={false}
            className="rounded-full border border-white/10 bg-black/30 px-3 py-2 backdrop-blur"
          />
        </motion.div>

        <motion.p className="text-sm uppercase tracking-widest text-[#8B5CF6] mb-4" {...revealPreset}>
          For local business owners in Phoenix &amp; beyond
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.02em] leading-tight mb-6"
          style={{ fontFamily: "var(--font-playfair), serif" }}
          {...revealPreset}
        >
          Stop losing customers to missed calls and invisible websites.
        </motion.h1>

        <motion.p className="text-xl md:text-2xl text-[#A1A1AA] max-w-4xl mx-auto mb-10" {...revealPreset}>
          We build your website, answer your phone 24/7, get you more 5-star reviews, and keep you showing up on Google. You
          run your business — we handle the rest.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" {...revealPreset}>
          <Link href="#services">
            <motion.button
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#06B6D4] text-white font-semibold text-lg shadow-lg"
              {...buttonHover}
            >
              See What We Can Do
            </motion.button>
          </Link>

          <Link href="/services/cadence">
            <motion.button
              className="group px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-lg flex items-center gap-2"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.02, borderColor: "rgba(139, 92, 246, 0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              Try Cadence Free — AI Phone Answering
              <span className="inline-block">→</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
