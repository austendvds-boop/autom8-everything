"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { reveal, revealReduced, revealStagger } from "@/lib/motion";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Can you help us get more calls and booked jobs?",
    answer: "Yes. That is the main goal. We improve your website, speed up follow-up, and help more local people find you on Google.",
  },
  {
    question: "Do you build websites and lead follow-up tools?",
    answer: "Yes. We build both. Your site and lead tools work together so every new lead gets a fast response.",
  },
  {
    question: "Can you replace our current website without hurting Google rankings?",
    answer: "Yes. We move important pages carefully and keep SEO basics in place during the switch.",
  },
  {
    question: "How long does setup take?",
    answer: "Most projects launch in about 2 to 6 weeks. We give you a clear timeline before we start.",
  },
  {
    question: "Do you offer monthly support?",
    answer: "Yes. After launch, we can handle monthly SEO, content updates, and ongoing improvements.",
  },
  {
    question: "Will this work with the software we already use?",
    answer: "Usually yes. We connect with most common tools and fill any gaps with simple custom setup.",
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
                      {isOpen ? (
                        <Minus className="w-5 h-5 text-[#8B5CF6] flex-shrink-0" />
                      ) : (
                        <Plus className="w-5 h-5 text-[#52525B] group-hover:text-[#8B5CF6] transition-colors" />
                      )}
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
