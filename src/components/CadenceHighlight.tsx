"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import { reveal, revealReduced } from "@/lib/motion";

export default function CadenceHighlight() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-32 bg-[#0A0A0F] relative overflow-hidden">
      <div className="section-glow section-glow--cyan -bottom-32 left-0" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          {...(prefersReducedMotion ? revealReduced : reveal)}
        >
          <div>
            <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-3">New: Cadence AI Voice</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Your Business Deserves a Receptionist That Never Sleeps
            </h2>
            <p className="text-[#A1A1AA] text-lg md:text-xl mb-6">
              Cadence answers every call, books appointments, and handles FAQs — 24/7. Forward your calls and you&apos;re live in 5
              minutes. No developer. No setup fee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/services/cadence"
                className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
              >
                Start Free Trial
              </Link>
              <Link
                href="/services/cadence"
                className="inline-block px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:border-[#8B5CF6]/60"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="bg-[#111118] border border-white/[0.04] rounded-3xl p-8 shadow-[0_0_80px_rgba(139,92,246,0.08)]">
            <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-[#8B5CF6]" />
            </div>
            <p className="text-4xl font-bold mb-1">$199/mo</p>
            <p className="text-[#A1A1AA] mb-6">7-day free trial • No contracts</p>
            <ul className="space-y-3 text-[15px] leading-relaxed text-[#A1A1AA]">
              <li>24/7 answering</li>
              <li>Appointment booking</li>
              <li>Live call transfer</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
