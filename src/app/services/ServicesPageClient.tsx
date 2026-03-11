"use client";

import Link from "next/link";
import { ReactLenis } from "lenis/react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion, useReducedMotion } from "framer-motion";
import { Globe, Wrench, Star, LineChart, Check } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/motion";

const services = [
  {
    icon: Globe,
    title: "Websites",
    description: "Professional websites that make your business look credible and easy to contact.",
    features: ["Mobile-ready design", "Contact or booking form", "On-page SEO setup", "Fast load times"],
  },
  {
    icon: Wrench,
    title: "Custom Apps",
    description: "Tools built around how your team actually works. Not templates - built from scratch.",
    features: ["Dashboards and automations", "Internal workflow tools", "Custom integrations", "Ongoing support"],
  },
  {
    icon: Star,
    title: "Review Funnel",
    description: "Automatic follow-up texts after every job. Happy customers get sent straight to Google.",
    features: ["Timed review requests", "Customers routed to Google", "Feedback captured privately", "Runs itself"],
  },
  {
    icon: LineChart,
    title: "Monthly SEO + Content",
    description: "Blog posts, Google Business updates, and local SEO so customers find you instead of your competition.",
    features: ["2 blog posts per month", "Google Business profile updates", "Local SEO optimization", "Monthly performance report"],
  },
];

export default function ServicesPageClient() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ReactLenis root>
      <main className="min-h-screen bg-[#0A0A0F]">
        <Navigation />

        <section className="pt-32 pb-20 mesh-bg">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-semibold mb-6"
              style={{ fontFamily: "var(--font-playfair), serif" }}
              variants={fadeUp}
              initial={prefersReducedMotion ? false : "hidden"}
              animate="visible"
            >
Tools for Local Businesses
            </motion.h1>
            <motion.p
              className="text-xl text-[#A1A1AA] max-w-2xl mx-auto"
              variants={fadeUp}
              initial={prefersReducedMotion ? false : "hidden"}
              animate="visible"
              transition={prefersReducedMotion ? undefined : { delay: 0.12 }}
            >
Answer every call, collect more reviews, and get found online - without the tech headache.
            </motion.p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-semibold mb-10" style={{ fontFamily: "var(--font-playfair), serif" }}>
What We Build
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="bg-[#12121A] border border-white/5 rounded-2xl p-8 hover:border-[#8B5CF6]/30 transition-all duration-300 group"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={prefersReducedMotion ? undefined : { y: -5 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="w-7 h-7 text-[#8B5CF6]" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-[#A1A1AA] mb-6 leading-relaxed">{service.description}</p>

                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                        <Check className="w-4 h-4 text-[#8B5CF6]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#12121A]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-semibold mb-8" style={{ fontFamily: "var(--font-playfair), serif" }}>
More Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  href: "/services/cadence",
                  title: "Cadence Voice Receptionist",
                  description: "AI receptionist that answers your calls 24/7, books appointments, and handles FAQs. Live in 5 minutes.",
                },
                {
                  href: "/services/seo-content",
                  title: "Local SEO Automation Services",
                  description: "Improve local rankings with optimized pages, citations, and conversion-focused local signals.",
                },
                {
                  href: "/services/review-funnel",
                  title: "Review Funnel",
                  description: "Automatic follow-up texts after every job to drive more Google reviews.",
                },
                {
                  href: "/services/websites",
                  title: "Websites",
                  description: "Professional websites that make your business look credible and easy to contact.",
                },
                {
                  href: "/services/custom-apps",
                  title: "Custom Apps",
                  description: "Tools built around how your team actually works, from dashboards to automations.",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-white/10 p-6 hover:border-[#8B5CF6]/40 transition-colors bg-[#0A0A0F]"
                >
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-[#A1A1AA]">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}>
              <h2 className="text-3xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Plan Your Build and Growth Timeline
              </h2>
              <p className="text-[#A1A1AA] text-lg mb-8">
                Visit our <Link href="/blog" className="text-[#8B5CF6] hover:text-[#A78BFA]">managed SEO and blog library</Link>, browse local pages in <Link href="/locations" className="text-[#8B5CF6] hover:text-[#A78BFA]">Phoenix metro</Link>, or return to the <Link href="/" className="text-[#8B5CF6] hover:text-[#A78BFA]">homepage</Link> for the full offer overview.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-block select-none rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-8 py-4 font-semibold text-white"
                >
                  Get a Free Quote
                </Link>
                <Link
                  href="/services/seo-content"
                  className="inline-block px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:border-[#8B5CF6]/60"
                >
                  View Growth Plan
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </ReactLenis>
  );
}
