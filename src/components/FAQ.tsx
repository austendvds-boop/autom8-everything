"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { reveal, revealReduced, revealStagger } from "@/lib/motion";

const faqs = [
  {
    question: "How much does Cadence cost?",
    answer: "$199 per month with a 7-day free trial. Month-to-month, cancel anytime. No setup fees.",
  },
  {
    question: "What if I already have a website?",
    answer: "We can work with your existing site or rebuild it on our platform. Migration is quoted separately as an add-on.",
  },
  {
    question: "How is Cadence different from a normal answering service?",
    answer:
      "Cadence is an AI voice receptionist that answers in seconds, handles your specific business questions, routes calls based on your rules, and sends you summaries. No hold times, no outsourced call centers, no per-minute billing surprises.",
  },
  {
    question: "Do I need to be tech-savvy?",
    answer: "No. We handle all setup and configuration. You get a phone number and a simple dashboard. Most businesses are live in under 5 minutes.",
  },
  {
    question: "Can I start with just one product?",
    answer: "Yes. Most businesses start with Cadence alone and add reviews or a website later when they are ready.",
  },
  {
    question: "Is there a long-term contract?",
    answer: "No. Everything is month-to-month or project-scoped with clear timelines. We do not lock you in.",
  },
  {
    question: "What if I am not happy?",
    answer: "Cadence has a 7-day free trial — cancel before it ends and you pay nothing. Website and SEO projects have clear milestones and approval steps.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-32 bg-transparent relative" id="faq">
      <div className="section-glow section-glow--mixed -top-20 right-0" />
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div className="text-center mb-20" {...(prefersReducedMotion ? revealReduced : reveal)}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div key={index} {...revealStagger(index, prefersReducedMotion)}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-6 bg-[#111118] border border-white/[0.04] rounded-2xl hover:border-[#8B5CF6]/30 hover:shadow-[0_0_80px_rgba(139,92,246,0.08)] transition-all group"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-lg text-white group-hover:text-[#8B5CF6] transition-colors">{faq.question}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      {isOpen ? <Minus className="w-5 h-5 text-[#8B5CF6] flex-shrink-0" /> : <Plus className="w-5 h-5 text-[#52525B] group-hover:text-[#8B5CF6] transition-colors" />}
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-[#A1A1AA] leading-relaxed text-[15px]">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
