"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { cardHover, reveal, revealReduced, revealStagger } from "@/lib/motion";

type Testimonial = {
  quote: ReactNode;
  attribution: string;
  image: string;
};

// TODO: Replace with real client testimonials and headshots
const testimonials: Testimonial[] = [
  {
    quote: (
      <>
        <BrandLogo as="span" size="xs" showMark={false} showDescriptor={false} className="mr-1 align-[-0.1em]" screenReaderText="Autom8" />
        helped us reply to new leads faster, and we stopped losing jobs to slow follow-up.
      </>
    ),
    attribution: "Owner, Home Services Company",
    image: "HS",
  },
  {
    quote: "Our new website is much easier to use. We get clearer calls and better leads.",
    attribution: "Founder, Local Service Company",
    image: "LS",
  },
  {
    quote: "The process was simple. They handled the hard parts and kept us updated the whole time.",
    attribution: "Operations Manager, Healthcare Practice",
    image: "HP",
  },
];

export default function Testimonials() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-28 md:py-32 relative overflow-hidden mesh-bg">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div className="text-center mb-14 md:mb-16" {...(prefersReducedMotion ? revealReduced : reveal)} initial={false}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            What Business Owners <span className="gradient-text">Say</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg md:text-xl max-w-2xl mx-auto">What business owners say about working with Autom8.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.attribution}
              className="h-full"
              {...revealStagger(index, prefersReducedMotion)}
              initial={false}
              {...(prefersReducedMotion ? {} : cardHover)}
            >
              <div className="bg-[#111118] border border-white/[0.04] rounded-3xl p-8 h-full">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>

                <p className="text-[#A1A1AA] mb-6 leading-relaxed text-[15px]">
                  <span aria-hidden="true">“</span>
                  {testimonial.quote}
                  <span aria-hidden="true">”</span>
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center text-white font-semibold">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="text-sm text-[#D4D4D8]">{testimonial.attribution}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
