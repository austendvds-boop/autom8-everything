"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

type Testimonial = {
  quote: ReactNode;
  author: string;
  role: string;
  company: string;
  image: string;
};

const proofStats = [
  { value: "25+", label: "Local businesses supported" },
  { value: "24 hrs", label: "Typical follow-up setup window" },
  { value: "5.0/5", label: "Client satisfaction rating" },
];

const testimonials: Testimonial[] = [
  {
    quote: (
      <>
        <BrandLogo
          as="span"
          size="xs"
          showMark={false}
          showDescriptor={false}
          className="mr-1 align-[-0.1em]"
          screenReaderText="Autom8"
        />
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
  return (
    <section className="py-24 relative overflow-hidden mesh-bg">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Proof That This <span className="gradient-text">Works</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            Real owner feedback from local businesses we support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {proofStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-[#12121A] border border-white/5 rounded-xl p-5 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <p className="text-3xl font-bold gradient-text mb-1">{stat.value}</p>
              <p className="text-[#A1A1AA] text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: [0, -50 * testimonials.length * 4] }}
            transition={{ duration: testimonials.length * 5, repeat: Infinity, ease: "linear" }}
            style={{ width: `${duplicatedTestimonials.length * 400}px` }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div key={index} className="flex-shrink-0 w-[350px] md:w-[400px]" whileHover={{ y: -5 }}>
                <div className="bg-[#12121A] border border-white/5 rounded-2xl p-6 h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>

                  <p className="text-[#A1A1AA] mb-6 leading-relaxed">
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
