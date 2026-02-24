"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

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

  return (
    <section className="py-24 bg-[#12121A]" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-6 bg-[#1A1A23] border border-white/5 rounded-xl hover:border-[#8B5CF6]/30 transition-colors group"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-lg text-white group-hover:text-[#8B5CF6] transition-colors">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
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
                        <p className="pt-4 text-[#A1A1AA] leading-relaxed">
                          {faq.answer}
                        </p>
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
