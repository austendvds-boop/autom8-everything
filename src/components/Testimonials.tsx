"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { cardHover, reveal, revealReduced } from "@/lib/motion";

type Testimonial = {
  quote: ReactNode;
  author: string;
  role: string;
  company: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    quote: (
      <>
        <BrandLogo as="span" size="xs" showMark={false} showDescriptor={false} className="mr-1 align-[-0.1em]" screenReaderText="Autom8" />
        helped us reply to new leads faster, and we stopped losing jobs to slow follow-up.
      </>
    ),
    author: "Sarah Chen",
    role: "Owner",
    company: "Local Service Business",
    image: "SC",
  },
  {
    quote: "Our new website is much easier to use. We get clearer calls and better leads.",
    author: "Marcus Johnson",
    role: "Founder",
    company: "Home Services Company",
    image: "MJ",
  },
  {
    quote: "The process was simple. They handled the hard parts and kept us updated the whole time.",
    author: "Emily Rodriguez",
    role: "Operations Manager",
    company: "Healthcare Practice",
    image: "ER",
  },
  {
    quote: "We finally have one clear system for leads, follow-up, and reviews. Our team saves time every day.",
    author: "David Park",
    role: "Managing Partner",
    company: "Professional Services Firm",
    image: "DP",
  },
  {
    quote: "Monthly SEO and blog support gave us a steady stream of new inquiries instead of random spikes.",
    author: "Lisa Thompson",
    role: "General Manager",
    company: "Local Multi-Location Brand",
    image: "LT",
  },
];

const duplicatedTestimonials = [...testimonials, ...testimonials];

export default function Testimonials() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-40 relative overflow-hidden mesh-bg">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div className="text-center mb-20" {...(prefersReducedMotion ? revealReduced : reveal)}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            What Business Owners <span className="gradient-text">Say</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg md:text-xl max-w-2xl mx-auto">Real feedback from local businesses we support.</p>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={prefersReducedMotion ? undefined : { x: [0, -50 * testimonials.length * 4] }}
            transition={{ duration: testimonials.length * 7, repeat: Infinity, ease: "linear" }}
            style={{ width: `${duplicatedTestimonials.length * 400}px` }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div key={index} className="flex-shrink-0 w-[350px] md:w-[400px]" {...(prefersReducedMotion ? {} : cardHover)}>
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
                      <p className="font-semibold text-white">{testimonial.author}</p>
                      <p className="text-sm text-[#52525B]">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
