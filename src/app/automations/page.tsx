"use client";

import { ReactLenis } from "lenis/react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Users, DollarSign, ArrowRight } from "lucide-react";

const caseStudies = [
  {
    company: "Regional Logistics Co",
    industry: "Logistics",
    challenge: "Manual data entry across 5 different systems, taking 30+ hours per week",
    solution: "Built automated data pipelines that sync all systems in real-time",
    results: [
      { metric: "30+", label: "Hours Saved/Week", icon: Clock },
      { metric: "99%", label: "Data Accuracy", icon: TrendingUp },
      { metric: "3x", label: "Faster Processing", icon: Users },
    ],
    quote: "We went from drowning in spreadsheets to having a perfectly streamlined operation. The ROI was immediate.",
  },
  {
    company: "Tech Startup",
    industry: "SaaS",
    challenge: "Inefficient lead nurturing causing low conversion rates",
    solution: "Implemented automated multi-channel follow-up sequences",
    results: [
      { metric: "40%", label: "Higher Conversion", icon: TrendingUp },
      { metric: "25hrs", label: "Saved Weekly", icon: Clock },
      { metric: "3x", label: "ROI in 30 Days", icon: DollarSign },
    ],
    quote: "Our sales team now focuses on closing deals instead of chasing leads. Best investment we've made.",
  },
  {
    company: "Marketing Agency",
    industry: "Marketing",
    challenge: "Client reporting taking 20 hours per month to compile",
    solution: "Automated dashboard that generates reports in real-time",
    results: [
      { metric: "20hrs", label: "Saved/Month", icon: Clock },
      { metric: "100%", label: "Automated Reporting", icon: TrendingUp },
      { metric: "15+", label: "Clients Scaled", icon: Users },
    ],
    quote: "The automated reporting saved us so much time that we were able to take on 30% more clients.",
  },
  {
    company: "E-commerce Brand",
    industry: "E-commerce",
    challenge: "Customer support overwhelmed with repetitive inquiries",
    solution: "AI-powered chatbot handling 80% of common questions",
    results: [
      { metric: "80%", label: "Tickets Automated", icon: TrendingUp },
      { metric: "24/7", label: "Support Coverage", icon: Clock },
      { metric: "60%", label: "Cost Reduction", icon: DollarSign },
    ],
    quote: "Our customers love the instant responses. Support satisfaction actually went UP while costs dropped.",
  },
];

export default function Automations() {
  return (
    <ReactLenis root>
      <main className="min-h-screen bg-[#0A0A0F]">
        <Navigation />
        
        {/* Hero */}
        <section className="pt-32 pb-20 mesh-bg">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-semibold mb-6"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Automation <span className="gradient-text">Case Studies</span>
            </motion.h1>
            <motion.p
              className="text-xl text-[#A1A1AA] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              See how we've helped businesses transform their operations with automation.
            </motion.p>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="space-y-16">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={study.company}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Content */}
                  <div className="order-2 lg:order-1">
                    <div className="text-sm text-[#8B5CF6] font-mono mb-2">{study.industry}</div>
                    <h3 className="text-2xl font-semibold mb-4">{study.company}</h3>
                    
                    <div className="mb-6">
                      <h4 className="text-sm text-[#52525B] uppercase tracking-wide mb-2">Challenge</h4>
                      <p className="text-[#A1A1AA]">{study.challenge}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-sm text-[#52525B] uppercase tracking-wide mb-2">Solution</h4>
                      <p className="text-[#A1A1AA]">{study.solution}</p>
                    </div>
                    
                    <blockquote className="border-l-2 border-[#8B5CF6] pl-4 italic text-[#A1A1AA]">
                      "{study.quote}"
                    </blockquote>
                  </div>
                  
                  {/* Results */}
                  <div className="order-1 lg:order-2">
                    <div className="bg-[#12121A] border border-white/5 rounded-2xl p-8">
                      <h4 className="text-sm text-[#52525B] uppercase tracking-wide mb-6">Results</h4>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {study.results.map((result) => (
                          <div key={result.label} className="text-center">
                            <result.icon className="w-6 h-6 mx-auto mb-2 text-[#8B5CF6]" />
                            <div className="text-2xl font-bold gradient-text">{result.metric}</div>
                            <div className="text-xs text-[#52525B]">{result.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#12121A]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Want Similar <span className="gradient-text">Results</span>?
              </h2>
              <p className="text-[#A1A1AA] text-lg mb-8">
                Let's discuss how we can automate your business workflows.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </ReactLenis>
  );
}
