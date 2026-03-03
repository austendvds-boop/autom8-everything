"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { reveal, revealReduced, revealStagger } from "@/lib/motion";

const stats = [
  { value: "25+", label: "Businesses Served" },
  { value: "24-Hour", label: "Setup" },
];

export default function SocialProofBar() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-8 bg-[#0A0A0F] border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p className="text-center text-[#A1A1AA] text-sm uppercase tracking-widest mb-6" {...(prefersReducedMotion ? revealReduced : reveal)}>
          Helping 25+ local businesses get more calls every month
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl border border-white/[0.06] bg-[#111118] px-6 py-4 text-center"
              {...revealStagger(index, prefersReducedMotion)}
            >
              <p className="text-2xl font-bold gradient-text">{stat.value}</p>
              <p className="text-sm text-[#A1A1AA]">{stat.label}</p>
            </motion.div>
          ))}

          <motion.div
            className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111118] px-6 py-4"
            {...revealStagger(2, prefersReducedMotion)}
          >
            <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(245,158,11,0.22),transparent_58%)]"
                aria-hidden="true"
            />
            <div className="relative flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-[#A1A1AA]">Top-rated reliability</p>
                <p className="text-lg font-semibold text-white">Trusted by every launch week</p>
              </div>

              <div className="inline-flex items-center gap-1" role="img" aria-label="Five star reliability rating">
                {[0, 1, 2, 3, 4].map((starIndex) => (
                  <motion.span
                    key={starIndex}
                    className={prefersReducedMotion ? "" : "star-twinkle"}
                    animate={prefersReducedMotion ? undefined : { opacity: [0.9, 1, 0.9], scale: [1, 1.04, 1] }}
                    transition={
                      prefersReducedMotion
                        ? undefined
                        : { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: starIndex * 0.22 }
                    }
                  >
                    <Star className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" aria-hidden="true" />
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
