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
  { icon: Target, title: "Focus", description: "We cut the noise. You get tools that do one thing and do it well." },
  { icon: Zap, title: "Speed", description: "Built fast, shipped fast. No 6-month implementation projects." },
  { icon: Shield, title: "Security", description: "Your data stays yours. No surprises, no third-party selling your info." },
  { icon: Heart, title: "Care", description: "We actually pick up the phone. Real support from the people who built it." },
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
              Phoenix-based. Built for businesses that are tired of paying for software nobody knows how to use.
            </motion.p>
          </div>
        </section>

        <section className="bg-[#12121A] py-20">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div variants={staggerContainer} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
              <motion.h2 variants={staggerItem} className="mb-6 text-3xl font-semibold will-change-transform" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Our Story
              </motion.h2>
              <motion.p variants={staggerItem} className="mb-6 text-lg leading-relaxed text-[#A1A1AA] will-change-transform">
                Autom8 Everything started with a simple frustration. As a business owner, the tools that were supposed to make life easier - didn&apos;t. They were bloated, overpriced, and built for someone with an IT department. Not for the person running the show.
              </motion.p>
              <motion.p variants={staggerItem} className="mb-6 text-lg leading-relaxed text-[#A1A1AA] will-change-transform">
                So we built our own. Simple tools that do exactly what you need - answer calls, get more reviews, show up online - without the learning curve or the tech headache.
              </motion.p>
              <motion.p variants={staggerItem} className="text-lg leading-relaxed text-[#A1A1AA] will-change-transform">
                <span className="mb-2 block text-base font-semibold text-white">Who We Help:</span>
                Whether you&apos;re a one-person shop or scaling a multi-location operation, if your current software is working against you, you&apos;re in the right place.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="pb-20">
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
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#D4A030]/15">
                    <value.icon className="h-7 w-7 text-[#D4A030]" />
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
                Tell us about your business and we&apos;ll point you in the right direction.
              </motion.p>
              <Link href="/contact" className="inline-block rounded-full bg-gradient-to-r from-[#D4A030] to-[#E8C068] px-8 py-4 font-semibold text-[#0E1015]">
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
