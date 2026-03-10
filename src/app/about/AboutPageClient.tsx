"use client";

import Link from "next/link";
import { ReactLenis } from "lenis/react";
import { motion, useReducedMotion } from "framer-motion";
import { Target, Zap, Shield, Heart } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BrandLogo from "@/components/BrandLogo";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

const values = [
  { icon: Target, title: "Focus", description: "We automate low-value tasks so your team can focus on growth." },
  { icon: Zap, title: "Speed", description: "Fast implementation cycles with measurable outcomes." },
  { icon: Shield, title: "Security", description: "Automation architecture built with reliability and governance." },
  { icon: Heart, title: "Care", description: "We care about business outcomes, not just technical deliverables." },
];

export default function AboutPageClient() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ReactLenis root>
      <main className="min-h-screen bg-[#0A0A0F]">
        <Navigation />

        <section className="mesh-bg pt-32 pb-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <motion.h1
              className="mb-6 text-5xl font-semibold will-change-transform md:text-7xl"
              style={{ fontFamily: "var(--font-playfair), serif" }}
              variants={fadeUp}
              initial={prefersReducedMotion ? false : "hidden"}
              animate="visible"
            >
              About{" "}
              <BrandLogo as="span" size="sm" showMark={false} showDescriptor={false} className="align-[-0.12em]" screenReaderText="Autom8" />
            </motion.h1>
            <motion.p
              className="mx-auto max-w-2xl text-xl text-[#A1A1AA] will-change-transform"
              variants={fadeUp}
              initial={prefersReducedMotion ? false : "hidden"}
              animate="visible"
              transition={prefersReducedMotion ? undefined : { delay: 0.12 }}
            >
              We are a Phoenix automation consultancy focused on custom automation, AI execution systems, and local SEO growth infrastructure.
            </motion.p>
          </div>
        </section>

        <section className="bg-[#12121A] py-20">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div variants={staggerContainer} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
              <motion.h2 variants={staggerItem} className="mb-6 text-3xl font-semibold will-change-transform" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Our Story and Mission
              </motion.h2>
              <motion.p variants={staggerItem} className="mb-6 text-lg leading-relaxed text-[#A1A1AA] will-change-transform">
                <BrandLogo as="span" size="xs" showMark={false} showDescriptor={false} className="mr-1 align-[-0.08em]" screenReaderText="Autom8" />
                was built after seeing high-growth teams waste hours each week on repetitive tasks. We now design and deploy systems that automate execution while protecting quality and brand consistency.
              </motion.p>
              <motion.p variants={staggerItem} className="text-lg leading-relaxed text-[#A1A1AA] will-change-transform">
                We partner with businesses that want practical automation wins first, then scale into AI workflows and compounding SEO growth. Explore our{" "}
                <Link href="/pricing" className="text-[#8B5CF6] hover:text-[#A78BFA]">
                  core services
                </Link>{" "}
                or review real client outcomes in{" "}
                <Link href="/blog" className="text-[#8B5CF6] hover:text-[#A78BFA]">
                  automation case studies
                </Link>
                .
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <motion.h2
              className="mb-12 text-center text-3xl font-semibold will-change-transform"
              style={{ fontFamily: "var(--font-playfair), serif" }}
              variants={fadeUp}
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={viewportOnce}
            >
              Our <span className="gradient-text">Values</span>
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
              variants={staggerContainer}
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={viewportOnce}
            >
              {values.map((value) => (
                <motion.div key={value.title} className="rounded-2xl border border-white/5 bg-[#1A1A23] p-6 text-center will-change-transform" variants={staggerItem}>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#8B5CF6]/20">
                    <value.icon className="h-7 w-7 text-[#8B5CF6]" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                  <p className="text-[#A1A1AA]">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <motion.div variants={staggerContainer} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
              <motion.h2 variants={staggerItem} className="mb-6 text-3xl font-semibold will-change-transform" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Ready to Get Started?
              </motion.h2>
              <motion.p variants={staggerItem} className="mb-8 text-lg text-[#A1A1AA] will-change-transform">
                Let us map your first high-impact automation build.
              </motion.p>
              <Link href="/contact" className="inline-block rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-8 py-4 font-semibold text-white">
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
