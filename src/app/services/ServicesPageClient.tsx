"use client";

import Link from "next/link";
import { ReactLenis } from "lenis/react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Globe, Wrench, Star, LineChart, Check } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Creation",
    description:
      "Revenue-focused website builds designed to increase booked calls, lead quality, and conversion rates.",
    features: ["Conversion-focused page architecture", "Offer-first messaging", "SEO-ready technical setup", "Fast mobile performance"],
  },
  {
    icon: Wrench,
    title: "Custom Tools",
    description:
      "We build custom tools that connect your website, CRM, and team workflows so operations run cleanly.",
    features: ["Lead routing logic", "Internal workflow dashboards", "Custom integrations", "Operational automations"],
  },
  {
    icon: Star,
    title: "Review Funnel System",
    description:
      "Turn completed service moments into a consistent review acquisition flow that strengthens local trust.",
    features: ["Timed review request sequences", "Public review routing", "Private issue capture", "Reputation tracking"],
  },
  {
    icon: LineChart,
    title: "Managed SEO + Blog Content",
    description:
      "Monthly SEO execution and blog publishing that compounds search visibility and qualified inbound traffic.",
    features: ["Keyword and content planning", "Monthly blog production", "On-page SEO optimization", "Reporting and iteration"],
  },
];

export default function ServicesPageClient() {
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
Website + Growth <span className="gradient-text">Services</span>
            </motion.h1>
            <motion.p
              className="text-xl text-[#A1A1AA] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
Our offer combines revenue-focused website creation, custom tools, and a monthly growth layer with managed SEO plus blog content.
            </motion.p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-semibold mb-10" style={{ fontFamily: "var(--font-playfair), serif" }}>
Primary Service Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="bg-[#12121A] border border-white/5 rounded-2xl p-8 hover:border-[#8B5CF6]/30 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
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
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-semibold mb-8" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Packages: Build and Growth
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/10 bg-[#0A0A0F] p-8">
                <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">Build</p>
                <h3 className="text-2xl font-semibold mb-3">One-Time Implementation</h3>
                <p className="text-[#A1A1AA] mb-5">Complete website creation, custom tools, and review funnel setup delivered as a defined project scope.</p>
                <ul className="space-y-2 text-[#A1A1AA] text-sm">
                  <li>Revenue-focused site build</li>
                  <li>Custom workflow tooling</li>
                  <li>Review funnel launch setup</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-[#8B5CF6]/40 bg-[#0A0A0F] p-8">
                <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-2">Growth</p>
                <h3 className="text-2xl font-semibold mb-3">Monthly Managed Retainer</h3>
                <p className="text-[#A1A1AA] mb-5">Ongoing managed SEO and monthly blog content to compound rankings, traffic quality, and lead volume.</p>
                <ul className="space-y-2 text-[#A1A1AA] text-sm">
                  <li>Managed on-page and technical SEO</li>
                  <li>Monthly blog content publishing</li>
                  <li>Performance reporting and iteration</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#12121A]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-semibold mb-8" style={{ fontFamily: "var(--font-playfair), serif" }}>
Supporting Service Pages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  href: "/services/ai-automation",
                  title: "AI Automation Services",
                  description: "Deploy practical AI agents and AI-assisted workflows inside your existing stack.",
                },
                {
                  href: "/services/crm-automation",
                  title: "CRM Automation Services",
                  description: "Automate lead routing, pipeline updates, and follow-up sequences across your CRM.",
                },
                {
                  href: "/services/local-seo-automation",
                  title: "Local SEO Automation Services",
                  description: "Improve local rankings with optimized pages, citations, and conversion-focused local signals.",
                },
                {
                  href: "/services/business-process-automation",
                  title: "Business Process Automation",
                  description: "Systemize internal operations with clear handoff logic and exception-safe workflows.",
                },
                {
                  href: "/services/email-automation-services",
                  title: "Email Automation Services",
                  description: "Run lifecycle campaigns that increase response rates and reduce manual follow-up.",
                },
                {
                  href: "/services/zapier-consulting",
                  title: "Zapier Consulting",
                  description: "Design and optimize Zapier workflows for lead flow, CRM sync, and daily operations.",
                },
                {
                  href: "/services/gohighlevel-setup",
                  title: "GoHighLevel Setup",
                  description: "Implement pipelines, automations, and conversion tracking in a clean GoHighLevel build.",
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
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Plan Your Build and Growth Timeline
              </h2>
              <p className="text-[#A1A1AA] text-lg mb-8">
                Visit our <Link href="/blog" className="text-[#8B5CF6] hover:text-[#A78BFA]">managed SEO and blog library</Link>, browse local pages in <Link href="/locations" className="text-[#8B5CF6] hover:text-[#A78BFA]">Phoenix metro</Link>, or return to the <Link href="/" className="text-[#8B5CF6] hover:text-[#A78BFA]">homepage</Link> for the full offer overview.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
                >
                  Build Strategy Call
                </Link>
                <Link
                  href="/services/local-seo-automation"
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
