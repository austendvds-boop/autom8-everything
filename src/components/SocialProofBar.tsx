"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { reveal, revealReduced, revealStagger } from "@/lib/motion";

const stats = [
  { value: "Local Businesses", label: "Active Clients" },
  { value: "24/7", label: "Call Coverage" },
  { value: "5 min", label: "Average Setup Time" },
];

export default function SocialProofBar() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-8 bg-[#0A0A0F] border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          className="text-center text-[#A1A1AA] text-sm uppercase tracking-widest mb-6"
          {...(prefersReducedMotion ? revealReduced : reveal)}
        >
          Trusted by local teams that want growth without extra busywork
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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
            {...revealStagger(3, prefersReducedMotion)}
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(245,158,11,0.24),transparent_62%)]"
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-start gap-2">
              <div className="inline-flex items-center gap-1.5" role="img" aria-label="Five star client rating">
                {[0, 1, 2, 3, 4].map((starIndex) => (
                  <motion.span
                    key={starIndex}
                    className={prefersReducedMotion ? "" : "star-twinkle"}
                    animate={prefersReducedMotion ? undefined : { opacity: [0.9, 1, 0.9], scale: [1, 1.05, 1] }}
                    transition={
                      prefersReducedMotion
                        ? undefined
                        : { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: starIndex * 0.18 }
                    }
                  >
                    <Star className="h-6 w-6 fill-[#F59E0B] text-[#F59E0B]" aria-hidden="true" />
                  </motion.span>
                ))}
              </div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#A1A1AA]">5-Star Client Feedback</p>
            </div>
          </motion.div>
        </div>

        {/* TODO: Replace text labels with real integration logos */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 opacity-50">
          {["Google Business", "Stripe", "Twilio", "Google Calendar"].map((name) => (
            <span key={name} className="text-xs uppercase tracking-widest text-[#52525B]">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
