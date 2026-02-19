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
    question: "How long does setup take?",
    answer: "Most setups are completed within 1-2 weeks. The timeline depends on the complexity of your workflows and the number of integrations required. We provide a detailed roadmap during the discovery phase.",
  },
  {
    question: "Do I need technical skills?",
    answer: "Not at all! Our team handles all the technical implementation. You simply tell us what you want to automate, and we build it. We also provide easy-to-use dashboards so you can manage your automations without code.",
  },
  {
    question: "What tools do you integrate with?",
    answer: "We integrate with 100+ tools including Salesforce, HubSpot, Pipedrive, Zoho, Google Workspace, Microsoft 365, Slack, Zapier, Mailchimp, ConvertKit, ActiveCampaign, and many more. Custom integrations are also available.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use enterprise-grade encryption (AES-256), SOC 2 Type II certified infrastructure, and comply with GDPR and CCPA. Your data is never shared with third parties without your explicit consent.",
  },
  {
    question: "What's the pricing model?",
    answer: "We offer flexible pricing based on your needs - from starter packages for small businesses to enterprise solutions. All plans include a 14-day free trial with no credit card required.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes! You can cancel your subscription at any time with no penalties or hidden fees. We believe in earning your business every month.",
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
