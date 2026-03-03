"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Globe, Wrench, Star, TrendingUp, PhoneCall } from "lucide-react";
import { cardHover, reveal, revealReduced, revealStagger } from "@/lib/motion";

const products = [
  {
    title: "Never Miss Another Customer Call",
    description:
      "Your phone gets answered 24/7. Appointments get booked. You get a summary of every call. Live in 5 minutes.",
    icon: PhoneCall,
    badge: "NEW · FREE TRIAL",
    price: "$199/mo after free trial",
    primaryCta: { href: "/cadence/get-started", label: "Start Free Trial" },
    secondaryCta: { href: "/services/cadence", label: "Learn More" },
    featured: true,
  },
  {
    title: "Get More 5-Star Reviews on Autopilot",
    description:
      "After every job, we automatically ask happy customers to leave a Google review. Bad experiences get caught privately.",
    icon: Star,
    cta: { href: "/services/review-funnel", label: "Learn More" },
  },
  {
    title: "A Website That Actually Gets You Calls",
    description:
      "We build fast, clean websites designed to show up on Google and make it easy for customers to contact you.",
    icon: Globe,
    cta: { href: "/services/website-creation", label: "Learn More" },
  },
  {
    title: "Show Up on Google Every Month",
    description: "We write blog posts, improve your rankings, and help local customers find you before your competitors.",
    icon: TrendingUp,
    cta: { href: "/services/seo-content", label: "Learn More" },
  },
  {
    title: "Custom Tools Built Around How You Work",
    description:
      "Need something specific? We build dashboards, booking systems, and internal tools that fit your business.",
    icon: Wrench,
    cta: { href: "/contact", label: "Tell Us What You Need" },
  },
];

export default function ServicesBento() {
  const prefersReducedMotion = useReducedMotion();
  const revealPreset = prefersReducedMotion ? revealReduced : reveal;
  const featured = products[0];
  const rest = products.slice(1);
  const FeaturedIcon = featured.icon;

  return (
    <section className="py-32 bg-transparent relative" id="services">
      <div className="section-glow section-glow--purple top-8 right-0" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div className="text-center mb-20" {...revealPreset}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] font-semibold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Everything Your Business Needs to <span className="gradient-text">Grow</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg md:text-xl max-w-2xl mx-auto">
            Pick what you need now. Add more later. No long-term contracts on any of it.
          </p>
        </motion.div>

        <motion.div
          className="group relative bg-[#111118] border border-white/[0.04] rounded-3xl p-8 mb-8 hover:border-[#8B5CF6]/50 hover:shadow-[0_0_80px_rgba(139,92,246,0.08)] transition-all duration-300"
          {...revealStagger(0, prefersReducedMotion)}
          {...(prefersReducedMotion ? {} : cardHover)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 to-transparent" />
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs tracking-wide px-3 py-1 rounded-full border border-[#8B5CF6]/40 text-[#A78BFA]">{featured.badge}</span>
              <span className="text-sm text-[#A1A1AA]">{featured.price}</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/20 flex items-center justify-center mb-4">
              <FeaturedIcon className="w-6 h-6 text-[#8B5CF6]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-3">{featured.title}</h3>
            <p className="text-[#A1A1AA] text-[15px] leading-relaxed max-w-3xl mb-6">{featured.description}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={featured.primaryCta!.href} className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold">
                {featured.primaryCta!.label}
              </Link>
              <Link href={featured.secondaryCta!.href} className="inline-block px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:border-[#8B5CF6]/60 transition-colors">
                {featured.secondaryCta!.label}
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-[220px]">
          {rest.map((product, index) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.title}
                className="group relative bg-[#111118] border border-white/[0.04] rounded-3xl p-8 hover:border-[#8B5CF6]/50 hover:shadow-[0_0_80px_rgba(139,92,246,0.08)] transition-all duration-300 overflow-hidden"
                {...revealStagger(index + 1, prefersReducedMotion)}
                {...(prefersReducedMotion ? {} : cardHover)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/0 to-[#8B5CF6]/0 group-hover:from-[#8B5CF6]/5 group-hover:to-transparent transition-all duration-500" />
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-[#8B5CF6]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[#8B5CF6] transition-colors">{product.title}</h3>
                  <p className="text-[#A1A1AA] text-[15px] leading-relaxed mb-4">{product.description}</p>
                  <Link href={product.cta!.href} className="text-[#A78BFA] hover:text-[#8B5CF6] font-medium mt-auto">
                    {product.cta!.label} →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
