"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PhoneCall } from "lucide-react";
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
          Tools for local businesses
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.02em] leading-tight mb-6"
          style={{ fontFamily: "var(--font-playfair), serif" }}
          {...revealPreset}
        >
          Stop Losing Calls. Start Winning Customers.
        </motion.h1>

        <motion.p className="text-xl md:text-2xl text-[#A1A1AA] max-w-4xl mx-auto mb-10" {...revealPreset}>
          Answer every call, collect more reviews, and get found online - without the tech headache.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" {...revealPreset}>
          <motion.a
            href="tel:+14806313993"
            className="btn-primary text-lg gap-2 px-10 py-4 shadow-[0_0_30px_rgba(139,92,246,0.4)]"
            {...buttonHover}
          >
            <PhoneCall className="w-5 h-5" />
            Call Cadence Live
          </motion.a>

          <motion.a href="#services" className="btn-secondary text-lg px-8 py-4" {...buttonHover}>
            See Our Products
          </motion.a>
        </motion.div>

        <motion.p className="mt-6 text-sm text-[#A1A1AA] flex items-center justify-center gap-3 flex-wrap" {...revealPreset}>
          <span>7-day free trial</span>
          <span className="text-white/20">•</span>
          <span>No contracts</span>
          <span className="text-white/20">•</span>
          <span>Setup in 5 minutes</span>
        </motion.p>
      </div>
    </section>
  );
}
