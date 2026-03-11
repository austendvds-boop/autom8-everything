"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Play, ArrowRight, FileText } from "lucide-react";
import { reveal, revealReduced } from "@/lib/motion";

export default function CadenceDemoPlaceholder() {
  const prefersReducedMotion = useReducedMotion();
  const revealPreset = prefersReducedMotion ? revealReduced : reveal;

  return (
    <section className="py-20 bg-[#12121A]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div className="text-center mb-10" {...revealPreset}>
          <h2 className="section-heading mb-4">Hear Cadence in Action</h2>
          <p className="section-subheading mx-auto">
            See what happens when a customer calls your business and Cadence picks up.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Audio Sample Placeholder */}
          <motion.div className="card-base p-6 text-center" {...revealPreset}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#D4A030]/10 flex items-center justify-center">
              <Play className="w-8 h-8 text-[#D4A030]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Listen to a Sample Call</h3>
            <p className="text-sm text-[#A1A1AA]">
              Hear how Cadence answers, handles questions, and routes calls.
            </p>
            {/* TODO: Add real audio player with sample call recording */}
            <div className="mt-4 h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
              <span className="text-xs text-[#52525B]">Audio sample coming soon</span>
            </div>
          </motion.div>

          {/* Call Flow Preview */}
          <motion.div className="card-base p-6" {...revealPreset}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#D4A030]/10 flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-[#D4A030]" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">How a Call Flows</h3>
            <div className="space-y-3 mt-4">
              {[
                "Customer calls your number",
                "Cadence answers instantly",
                "Handles the question or request",
                "Routes urgent calls to you",
                "Sends you a summary",
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#D4A030]/20 flex items-center justify-center text-xs text-[#E8C068] font-mono shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-[#D4D4D8]">{step}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Summary Preview */}
          <motion.div className="card-base p-6" {...revealPreset}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#D4A030]/10 flex items-center justify-center">
              <FileText className="w-8 h-8 text-[#D4A030]" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">Call Summary Preview</h3>
            <div className="mt-4 rounded-xl bg-white/[0.03] border border-white/5 p-4 text-sm space-y-2">
              <div>
                <span className="text-[#52525B]">Caller:</span>{" "}
                <span className="text-[#D4D4D8]">New customer</span>
              </div>
              <div>
                <span className="text-[#52525B]">Asked about:</span>{" "}
                <span className="text-[#D4D4D8]">AC repair availability</span>
              </div>
              <div>
                <span className="text-[#52525B]">Cadence action:</span>{" "}
                <span className="text-[#D4D4D8]">Confirmed service area, collected contact info</span>
              </div>
              <div>
                <span className="text-[#52525B]">Follow-up:</span>{" "}
                <span className="text-[#4ADE80]">Summary sent to your phone</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div className="text-center mt-10" {...revealPreset}>
          <p className="text-[#E8C068] mb-4 text-lg">Try it yourself</p>
          <a href="tel:+14806313993" className="btn-primary text-lg px-10 py-4">
            Call (480) 631-3993
          </a>
        </motion.div>
      </div>
    </section>
  );
}
