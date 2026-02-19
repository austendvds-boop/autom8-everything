"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    quote: "autom8 has saved us over 30 hours per week. Our team now focuses on high-value work instead of repetitive tasks.",
    author: "Sarah Chen",
    role: "CEO",
    company: "TechFlow Inc",
    image: "SC",
  },
  {
    quote: "The ROI was immediate. Within the first month, we saw a 40% increase in lead conversion rates.",
    author: "Marcus Johnson",
    role: "Founder",
    company: "GrowthLabs",
    image: "MJ",
  },
  {
    quote: "Best investment we've made. The automation setup was seamless and the support is incredible.",
    author: "Emily Rodriguez",
    role: "Operations Director",
    company: "ScaleUp Co",
    image: "ER",
  },
  {
    quote: "We went from drowning in admin work to having a perfectly streamlined operation. Game changer.",
    author: "David Park",
    role: "Managing Partner",
    company: "Apex Solutions",
    image: "DP",
  },
  {
    quote: "The CRM sync alone has eliminated so many data entry errors. Our team loves using it.",
    author: "Lisa Thompson",
    role: "Sales Manager",
    company: "Quantum Sales",
    image: "LT",
  },
];

const duplicatedTestimonials = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden mesh-bg">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            What Business <span className="gradient-text">Owners Say</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            Join hundreds of businesses already saving time and boosting productivity.
          </p>
        </motion.div>

        {/* Infinite scroll carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -50 * (testimonials.length) * 4], // Each card is roughly 400px
            }}
            transition={{
              duration: testimonials.length * 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: `${duplicatedTestimonials.length * 400}px`,
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-[350px] md:w-[400px]"
                whileHover={{ y: -5 }}
              >
                <div className="bg-[#12121A] border border-white/5 rounded-2xl p-6 h-full">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-[#A1A1AA] mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
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
