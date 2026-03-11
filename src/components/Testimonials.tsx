"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Star } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { cardHover, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

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

const testimonialReveal: Variants = {
  hidden: { opacity: 0, y: 30, rotate: -2 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring", stiffness: 100, damping: 20, mass: 0.5 },
  },
};

export default function Testimonials() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-28 md:py-32 relative overflow-hidden mesh-bg">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-14 md:mb-16"
          variants={fadeUp}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] font-semibold mb-4" style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
            What Business Owners <span className="gradient-text">Say</span>
          </h2>
          <p className="text-[#9B978F] text-lg md:text-xl max-w-2xl mx-auto">What business owners say about working with Autom8.</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.attribution}
              className="h-full"
              variants={testimonialReveal}
              initial={prefersReducedMotion ? false : undefined}
              {...(prefersReducedMotion ? {} : cardHover)}
            >
              <div className="bg-[#161920] border border-white/[0.06] hover:shadow-[0_0_40px_rgba(212,160,48,0.20)] hover:border-[rgba(212,160,48,0.30)] transition-all duration-300 rounded-3xl p-8 h-full">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>

                <p className="text-[#EDEBE8] mb-6 leading-relaxed text-[15px]">
                  <span aria-hidden="true">&ldquo;</span>
                  {testimonial.quote}
                  <span aria-hidden="true">&rdquo;</span>
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A030] to-[#E8C068] flex items-center justify-center text-white font-semibold">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="text-sm text-[#9B978F]">{testimonial.attribution}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
