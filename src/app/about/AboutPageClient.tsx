"use client";

import Link from "next/link";
import { ReactLenis } from "lenis/react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Target, Zap, Shield, Heart } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

export default function AboutPageClient() {
  return (
    <ReactLenis root>
      <main className="min-h-screen bg-[#0A0A0F]">
        <Navigation />

        <section className="pt-32 pb-20 mesh-bg">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-semibold mb-6"
              style={{ fontFamily: "var(--font-playfair), serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About{" "}
              <BrandLogo
                as="span"
                size="sm"
                showMark={false}
                showDescriptor={false}
                className="align-[-0.12em]"
                screenReaderText="Autom8"
              />
            </motion.h1>
            <motion.p
              className="text-xl text-[#A1A1AA] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We are a Phoenix automation consultancy focused on custom automation, AI execution systems, and local SEO growth infrastructure.
            </motion.p>
          </div>
        </section>

        <section className="py-20 bg-[#12121A]">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Our Story and Mission
              </h2>
              <p className="text-[#A1A1AA] text-lg leading-relaxed mb-6">
                <BrandLogo
                  as="span"
                  size="xs"
                  showMark={false}
                  showDescriptor={false}
                  className="mr-1 align-[-0.08em]"
                  screenReaderText="Autom8"
                />
                was built after seeing high-growth teams waste hours each week on repetitive tasks. We now design and deploy systems that automate execution while protecting quality and brand consistency.
              </p>
              <p className="text-[#A1A1AA] text-lg leading-relaxed">
                We partner with businesses that want practical automation wins first, then scale into AI workflows and compounding SEO growth. Explore our <Link href="/services" className="text-[#8B5CF6] hover:text-[#A78BFA]">core services</Link> or review real client outcomes in <Link href="/automations" className="text-[#8B5CF6] hover:text-[#A78BFA]">automation case studies</Link>.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2
              className="text-3xl font-semibold mb-12 text-center"
              style={{ fontFamily: "var(--font-playfair), serif" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our <span className="gradient-text">Values</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Target, title: "Focus", description: "We automate low-value tasks so your team can focus on growth." },
                { icon: Zap, title: "Speed", description: "Fast implementation cycles with measurable outcomes." },
                { icon: Shield, title: "Security", description: "Automation architecture built with reliability and governance." },
                { icon: Heart, title: "Care", description: "We care about business outcomes, not just technical deliverables." },
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

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Ready to Get Started?
              </h2>
              <p className="text-[#A1A1AA] text-lg mb-8">
                Let us map your first high-impact automation build.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </ReactLenis>
  );
}
