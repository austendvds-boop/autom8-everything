"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LucideIcon, Globe, Wrench, Star, LineChart } from "lucide-react";

type ServiceCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  size: "large" | "medium" | "small";
  gridArea?: string;
};

const services: ServiceCard[] = [
  {
    title: "Website Creation",
    description: "We build clear, fast websites that help turn visitors into calls and booked jobs.",
    icon: Globe,
    size: "large",
    gridArea: "span 2 / span 2",
  },
  {
    title: "Custom Tools",
    description: "We set up simple tools so leads are tracked, followed up, and never forgotten.",
    icon: Wrench,
    size: "medium",
    gridArea: "span 1 / span 1",
  },
  {
    title: "Review Funnel System",
    description: "We help you ask happy customers for reviews so your business stands out online.",
    icon: Star,
    size: "medium",
    gridArea: "span 1 / span 1",
  },
  {
    title: "Managed SEO + Blog Content",
    description: "Every month, we improve your Google visibility and publish helpful content to bring in new leads.",
    icon: LineChart,
    size: "large",
    gridArea: "span 1 / span 2",
  },
];

export default function ServicesBento() {
  return (
    <section className="py-24 bg-[#12121A]" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-4" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            The 4 Core Services That <span className="gradient-text">Drive Growth</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            Start with the basics that drive results: a better website, fast lead follow-up, stronger reviews, and steady Google growth.
          </p>
          <p className="text-sm text-[#A1A1AA] mt-4">
            See full details on our <Link href="/services" className="text-[#8B5CF6] hover:text-[#A78BFA]">services page</Link> and simple tips on our <Link href="/blog" className="text-[#8B5CF6] hover:text-[#A78BFA]">blog</Link>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                className={`
                  group relative bg-[#1A1A23] border border-white/5 rounded-2xl p-6
                  hover:border-[#8B5CF6]/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]
                  transition-all duration-400 cursor-pointer overflow-hidden
                  ${service.size === "large" ? "md:col-span-2" : ""}
                `}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/0 to-[#8B5CF6]/0 group-hover:from-[#8B5CF6]/5 group-hover:to-transparent transition-all duration-500" />

                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-[#8B5CF6]" />
                  </div>

                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[#8B5CF6] transition-colors">{service.title}</h3>

                  {service.description && <p className="text-[#A1A1AA] text-sm leading-relaxed">{service.description}</p>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
