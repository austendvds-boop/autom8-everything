"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check, PhoneCall, MessageSquareHeart, Globe, Wrench, LucideIcon } from "lucide-react";
import { reveal, revealReduced, revealStagger } from "@/lib/motion";

type Tier = {
  name: string;
  product: string;
  price: string;
  valueProp: string;
  features: string[];
  cta: { label: string; href: string };
  icon: LucideIcon;
  featured?: boolean;
  badge?: string;
};

const tiers: Tier[] = [
  {
    name: "Start",
    product: "Cadence",
    price: "$199/mo",
    valueProp: "Answer every call, day and night",
    features: ["AI voice receptionist", "Call summaries to your phone", "After-hours coverage", "7-day free trial"],
    cta: { label: "Try Cadence Free", href: "tel:+14806313993" },
    icon: PhoneCall,
  },
  {
    name: "Grow",
    product: "Cadence + Review Funnel",
    price: "$278/mo",
    valueProp: "Answer calls + collect 5-star reviews",
    features: ["Everything in Start", "Automatic review requests", "Google review page integration", "Reputation tracking"],
    cta: { label: "Get Started", href: "/contact" },
    icon: MessageSquareHeart,
    featured: true,
    badge: "Most Popular",
  },
  {
    name: "Expand",
    product: "Growth Stack",
    price: "Get a Quote",
    valueProp: "Website + SEO + calls + reviews",
    features: ["Everything in Grow", "Professional website", "Monthly SEO & content", "Full lead generation stack"],
    cta: { label: "Get a Quote", href: "/contact" },
    icon: Globe,
  },
  {
    name: "Custom",
    product: "Full Stack",
    price: "Get a Quote",
    valueProp: "Custom tools built for your workflow",
    features: ["Everything in Expand", "Custom app development", "Workflow automations", "Dedicated support"],
    cta: { label: "Book a Consultation", href: "/contact" },
    icon: Wrench,
  },
];

export default function OfferLadder() {
  const prefersReducedMotion = useReducedMotion();
  const revealPreset = prefersReducedMotion ? revealReduced : reveal;

  return (
    <section id="offer-ladder" className="py-16 md:py-20 bg-[#0A0A0F]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div className="text-center max-w-3xl mx-auto mb-10 md:mb-12" {...revealPreset}>
          <h2 className="section-heading mb-4">One Platform. Pick Your Starting Point.</h2>
          <p className="section-subheading">Start with what you need today. Add more when you&apos;re ready.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;

            return (
              <motion.article
                key={tier.name}
                className={`relative card-elevated rounded-2xl p-6 h-full flex flex-col ${
                  tier.featured ? "border-[#8B5CF6]/40 bg-gradient-to-b from-[#8B5CF6]/10 via-[#12121A] to-[#12121A]" : ""
                }`}
                {...revealStagger(index, prefersReducedMotion)}
              >
                {tier.featured ? (
                  <span className="absolute -top-3 right-4 rounded-full border border-[#8B5CF6]/40 bg-[#8B5CF6]/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#E9D5FF]">
                    {tier.badge}
                  </span>
                ) : null}

                <div className="mb-5">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#8B5CF6]/15 text-[#C4B5FD]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-[#A1A1AA] mb-1">{tier.name}</p>
                  <h3 className="text-xl font-semibold mb-2">{tier.product}</h3>
                  <p className="text-2xl font-bold gradient-text mb-2">{tier.price}</p>
                  <p className="text-sm text-[#A1A1AA]">{tier.valueProp}</p>
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-[#D4D4D8]">
                      <Check className="h-4 w-4 text-[#8B5CF6] mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={tier.cta.href} className="btn-primary w-full justify-center text-center">
                  {tier.cta.label}
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
