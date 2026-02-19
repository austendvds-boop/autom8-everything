"use client";

import { motion } from "framer-motion";
import { LucideIcon, Zap, ArrowLeftRight, Mail, Calendar, BarChart3, MessageCircle } from "lucide-react";

type ServiceCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  size: "large" | "medium" | "small";
  gridArea?: string;
};

const services: ServiceCard[] = [
  {
    title: "Lead Generation",
    description: "Automated outreach, follow-ups, and nurturing that converts.",
    icon: Zap,
    size: "large",
    gridArea: "span 2 / span 2",
  },
  {
    title: "CRM Sync",
    description: "Keep all your data in perfect harmony.",
    icon: ArrowLeftRight,
    size: "medium",
    gridArea: "span 1 / span 1",
  },
  {
    title: "Email Automation",
    description: "Personalized emails that convert.",
    icon: Mail,
    size: "medium",
    gridArea: "span 1 / span 1",
  },
  {
    title: "Bookings",
    description: "Smart scheduling that never misses a beat.",
    icon: Calendar,
    size: "small",
    gridArea: "span 1 / span 1",
  },
  {
    title: "Analytics",
    description: "Real-time insights into your automation performance.",
    icon: BarChart3,
    size: "small",
    gridArea: "span 1 / span 1",
  },
  {
    title: "24/7 Support",
    description: "AI-powered customer support that never sleeps.",
    icon: MessageCircle,
    size: "large",
    gridArea: "span 1 / span 2",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

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
            What We <span className="gradient-text">Automate</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            From repetitive tasks to complex workflows — we handle it all so you can focus on growing your business.
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
                  ${service.size === "medium" ? "md:row-span-2" : ""}
                `}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/0 to-[#8B5CF6]/0 group-hover:from-[#8B5CF6]/5 group-hover:to-transparent transition-all duration-500" />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-[#8B5CF6]" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[#8B5CF6] transition-colors">
                    {service.title}
                  </h3>
                  
                  {service.description && (
                    <p className="text-[#A1A1AA] text-sm leading-relaxed">
                      {service.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
