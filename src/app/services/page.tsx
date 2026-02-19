"use client";

import { ReactLenis } from "lenis/react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Zap, ArrowLeftRight, Mail, Calendar, BarChart3, MessageCircle, 
  Workflow, Database, Bot, Clock, FileText, Globe
} from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "Lead Generation",
    description: "Automate your entire lead generation process from outreach to conversion. Set up intelligent sequences that nurture prospects while you focus on closing deals.",
    features: ["Automated outreach campaigns", "Lead scoring & qualification", "Follow-up sequences", "CRM integration"],
  },
  {
    icon: ArrowLeftRight,
    title: "CRM Sync",
    description: "Keep all your business data in perfect harmony. Eliminate manual data entry and ensure every team member has access to the latest information.",
    features: ["Two-way sync", "Real-time updates", "Custom field mapping", "Conflict resolution"],
  },
  {
    icon: Mail,
    title: "Email Automation",
    description: "Send personalized, targeted emails at scale. Create sophisticated sequences that adapt to subscriber behavior and maximize engagement.",
    features: ["Behavioral triggers", "A/B testing", "Personalization tokens", "Analytics & reporting"],
  },
  {
    icon: Calendar,
    title: "Booking & Scheduling",
    description: "Let clients book meetings without the back-and-forth. Smart scheduling that works across time zones and integrates with your existing tools.",
    features: ["Calendar sync", "Buffer times", "Custom booking pages", "Automated reminders"],
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Get real-time insights into your automation performance. Track KPIs, identify bottlenecks, and make data-driven decisions.",
    features: ["Custom dashboards", "Real-time metrics", "Export capabilities", "Goal tracking"],
  },
  {
    icon: MessageCircle,
    title: "AI Chatbots & Support",
    description: "Provide 24/7 customer support with AI-powered chatbots. Handle common questions, qualify leads, and escalate complex issues to your team.",
    features: ["Natural language processing", "Knowledge base integration", "Lead qualification", "Escalation workflows"],
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Connect your entire tech stack and automate complex business processes from end to end.",
    features: ["Visual workflow builder", "Conditional logic", "Multi-step processes", "Approval workflows"],
  },
  {
    icon: Database,
    title: "Data Management",
    description: "Centralize and organize your business data. Automate data cleaning, deduplication, and enrichment.",
    features: ["Data cleaning", "Deduplication", "Enrichment", "Backup & recovery"],
  },
  {
    icon: Bot,
    title: "AI Agents",
    description: "Deploy intelligent AI agents to handle complex tasks like research, content creation, and data analysis.",
    features: ["Custom training", "Task automation", "Continuous learning", "Integration APIs"],
  },
];

export default function Services() {
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
              Our <span className="gradient-text">Services</span>
            </motion.h1>
            <motion.p
              className="text-xl text-[#A1A1AA] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Comprehensive automation solutions tailored to your business needs.
            </motion.p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <p className="text-[#A1A1AA] mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-[#52525B]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-[#12121A]">
          <div className="max-w-4xl mx-auto px-6">
            <motion.h2
              className="text-3xl font-semibold mb-12 text-center"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our <span className="gradient-text">Process</span>
            </motion.h2>
            
            <div className="space-y-6">
              {[
                { step: "01", title: "Discovery", description: "We analyze your current workflows and identify opportunities for automation." },
                { step: "02", title: "Strategy", description: "We create a detailed automation roadmap tailored to your business goals." },
                { step: "03", title: "Implementation", description: "Our team builds and integrates the automations into your existing systems." },
                { step: "04", title: "Optimization", description: "We continuously monitor and refine your automations for maximum efficiency." },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  className="flex gap-6 items-start"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] font-mono flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-[#A1A1AA]">{item.description}</p>
                  </div>
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
            >
              <h2 className="text-3xl font-semibold mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Ready to <span className="gradient-text">Automate</span>?
              </h2>
              <p className="text-[#A1A1AA] text-lg mb-8">
                Get a free consultation and discover how automation can transform your business.
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold"
              >
                Get Started
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </ReactLenis>
  );
}
