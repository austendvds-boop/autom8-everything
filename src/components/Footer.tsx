"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { businessProfile } from "@/lib/business";

const footerLinks = {
  product: [
    { label: "Automation Services", href: "/services" },
    { label: "AI Automation", href: "/services/ai-automation" },
    { label: "CRM Automation", href: "/services/crm-automation" },
    { label: "Business Process Automation", href: "/services/business-process-automation" },
    { label: "GoHighLevel Setup", href: "/services/gohighlevel-setup" },
  ],
  company: [
    { label: "Locations", href: "/locations" },
    { label: "About", href: "/about" },
    { label: "Case Studies", href: "/automations" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security", href: "/security" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: businessProfile.social.twitter, label: "Twitter" },
  { icon: Github, href: businessProfile.social.github, label: "GitHub" },
  { icon: Linkedin, href: businessProfile.social.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${businessProfile.email}`, label: "Email" },
].filter((social) => Boolean(social.href));

export default function Footer() {
  return (
    <footer className="py-16 bg-[#0A0A0F] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          <div className="md:col-span-2">
            <BrandLogo size="md" className="mb-4" />
            <p className="text-[#A1A1AA] mb-3 max-w-xs">
              From chaos to autopilot. The automation system for modern businesses.
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
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[#A1A1AA] hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[#A1A1AA] hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[#A1A1AA] hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#52525B] text-sm flex flex-wrap items-center gap-1.5 justify-center md:justify-start">
            <span>© {new Date().getFullYear()}</span>
            <BrandLogo
              as="span"
              size="xs"
              showMark={false}
              className="align-[-0.02em]"
              screenReaderText="Autom8 Everything"
            />
            <span>All rights reserved.</span>
          </p>
          <p className="text-[#52525B] text-sm">Built in Phoenix, AZ</p>
        </div>
      </div>
    </footer>
  );
}
