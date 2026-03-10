"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { businessProfile } from "@/lib/business";
import { fadeUp, viewportOnce } from "@/lib/motion";

const productLinks = [
  { label: "Cadence", href: "/services/cadence" },
  { label: "Review Funnel", href: "/services/review-funnel" },
  { label: "Web + Monthly SEO", href: "/services/websites" },
  { label: "Custom Apps", href: "/services/custom-apps" },
  { label: "Pricing", href: "/pricing" },
];

const startHereLinks = [
  { label: "Try Cadence Free", href: "tel:+14806313993" },
  { label: "See Our Products", href: "/#services" },
  { label: "Get a Free Quote", href: "/contact" },
  { label: "Book a Demo", href: "/contact" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Client Login", href: "https://cadence-m48n.onrender.com/login" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Security", href: "/security" },
];

const socialLinks = [
  { icon: Twitter, href: businessProfile.social.twitter, label: "Twitter" },
  { icon: Github, href: businessProfile.social.github, label: "GitHub" },
  { icon: Linkedin, href: businessProfile.social.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${businessProfile.email}`, label: "Email" },
].filter((social) => Boolean(social.href));

export default function Footer() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <footer className="py-16 bg-[#0A0A0F] border-t border-white/5">
      <motion.div
        className="max-w-7xl mx-auto px-6 will-change-transform"
        variants={fadeUp}
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          <div className="md:col-span-2">
            <BrandLogo size="md" className="mb-4" />
            <a href="tel:+14806313993" className="block text-xl font-semibold text-white hover:text-[#8B5CF6] transition-colors mb-3">
              (480) 631-3993
            </a>
            <p className="text-[#A1A1AA] mb-3 max-w-sm">
              Answer every call, collect more reviews, and get found online - we handle the tech so you don't have to.
            </p>
            <p className="text-sm text-[#A1A1AA] mb-6 max-w-sm leading-relaxed">
              {businessProfile.name} • {businessProfile.city}, {businessProfile.state}
              {businessProfile.phoneDisplay ? ` • ${businessProfile.phoneDisplay}` : ""} • {businessProfile.email}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-[#1A1A23] border border-white/5 flex items-center justify-center text-[#A1A1AA] hover:text-[#8B5CF6] hover:border-[#8B5CF6]/50 transition-colors"
                    aria-label={social.label}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Products</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[#A1A1AA] hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Start Here</h4>
            <ul className="space-y-3">
              {startHereLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("tel:") ? (
                    <a href={link.href} className="text-[#A1A1AA] hover:text-white transition-colors">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-[#A1A1AA] hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[#A1A1AA] hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link href="/portal/login" className="text-xs text-[#71717A] hover:text-[#A1A1AA] transition-colors">
                Client Portal
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#52525B] text-sm flex flex-wrap items-center gap-1.5 justify-center md:justify-start">
            <span>© {new Date().getFullYear()}</span>
            <BrandLogo as="span" size="xs" showMark={false} className="align-[-0.02em]" screenReaderText="Autom8 Everything" />
            <span>All rights reserved.</span>
          </p>
          <p className="text-[#52525B] text-sm">Built in Phoenix, AZ</p>
        </div>
      </motion.div>
    </footer>
  );
}
