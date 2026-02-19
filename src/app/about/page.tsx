"use client";

import { ReactLenis } from "lenis/react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Target, Zap, Shield, Heart } from "lucide-react";

export default function About() {
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
              About <span className="gradient-text">autom8</span>
            </motion.h1>
            <motion.p
              className="text-xl text-[#A1A1AA] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We're on a mission to free businesses from the burden of repetitive tasks.
            </motion.p>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 bg-[#12121A]">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-semibold mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Our Story
              </h2>
              <p className="text-[#A1A1AA] text-lg leading-relaxed mb-6">
                autom8 was born from a simple frustration: watching talented people waste their best hours on tedious, repetitive tasks. Our founders spent years in operations roles, manually copying data between systems, sending follow-up emails, and managing schedules.
              </p>
              <p className="text-[#A1A1AA] text-lg leading-relaxed">
                We knew there had to be a better way. So we built one. Today, we help hundreds of businesses reclaim their time and focus on what truly matters — growing their companies and serving their customers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2
              className="text-3xl font-semibold mb-12 text-center"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our <span className="gradient-text">Values</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Target, title: "Focus", description: "We help you focus on what matters most" },
                { icon: Zap, title: "Speed", description: "Fast implementation, instant results" },
                { icon: Shield, title: "Security", description: "Your data is always protected" },
                { icon: Heart, title: "Care", description: "We genuinely care about your success" },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  className="bg-[#1A1A23] border border-white/5 rounded-2xl p-6 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center">
                    <value.icon className="w-7 h-7 text-[#8B5CF6]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-[#A1A1AA]">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-semibold mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Ready to Get Started?
              </h2>
              <p className="text-[#A1A1AA] text-lg mb-8">
                Let's discuss how automation can transform your business.
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
              >
                Contact Us
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </ReactLenis>
  );
}
