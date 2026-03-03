"use client";

import Link from "next/link";
import { useState } from "react";
import { ReactLenis } from "lenis/react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send, Check, Phone } from "lucide-react";
import { businessProfile } from "@/lib/business";

const helpOptions = ["Phone Answering", "Website", "Reviews", "SEO", "Not Sure Yet"];

export default function ContactPageClient() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    helpWith: [] as string[],
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleHelp = (option: string) => {
    setFormState((prev) => ({
      ...prev,
      helpWith: prev.helpWith.includes(option) ? prev.helpWith.filter((item) => item !== option) : [...prev.helpWith, option],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <ReactLenis root>
      <main className="min-h-screen bg-[#0A0A0F]">
        <Navigation />

        <section className="pt-32 pb-20 mesh-bg">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h1 className="text-5xl md:text-7xl font-semibold mb-6" style={{ fontFamily: "var(--font-playfair), serif" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              Tell Us About <span className="gradient-text">Your Business</span>
            </motion.h1>
            <motion.p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              Fill out this quick intake form and we&apos;ll recommend the best next step.
            </motion.p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-[#12121A] border border-white/5 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Quick Intake Form</h2>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                      <Check className="w-8 h-8 text-[#10B981]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Thanks — we got it</h3>
                    <p className="text-[#A1A1AA]">We&apos;ll follow up within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <input required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="w-full px-4 py-3 bg-[#1A1A23] border border-white/10 rounded-lg" placeholder="Name *" />
                    <input type="email" required value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} className="w-full px-4 py-3 bg-[#1A1A23] border border-white/10 rounded-lg" placeholder="Email *" />
                    <input value={formState.company} onChange={(e) => setFormState({ ...formState, company: e.target.value })} className="w-full px-4 py-3 bg-[#1A1A23] border border-white/10 rounded-lg" placeholder="Business name" />
                    <input value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })} className="w-full px-4 py-3 bg-[#1A1A23] border border-white/10 rounded-lg" placeholder="Phone number (optional)" />

                    <div>
                      <p className="text-sm text-[#A1A1AA] mb-2">What do you need help with?</p>
                      <div className="flex flex-wrap gap-2">
                        {helpOptions.map((option) => (
                          <button
                            type="button"
                            key={option}
                            onClick={() => toggleHelp(option)}
                            className={`px-3 py-2 rounded-full border text-sm ${
                              formState.helpWith.includes(option)
                                ? "border-[#8B5CF6] bg-[#8B5CF6]/20 text-white"
                                : "border-white/15 text-[#A1A1AA]"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea required rows={5} value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} className="w-full px-4 py-3 bg-[#1A1A23] border border-white/10 rounded-lg resize-none" placeholder="Anything else we should know? *" />

                    <motion.button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      {isSubmitting ? "Sending..." : <><Send className="w-5 h-5" /> Send Intake</>}
                    </motion.button>
                  </form>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-[#12121A] border border-white/5 rounded-2xl p-8">
                  <h3 className="text-xl font-semibold mb-4">Prefer to try something first?</h3>
                  <p className="text-[#A1A1AA] mb-6">Start Cadence free and see live phone answering in minutes.</p>
                  <Link href="/cadence/get-started" className="inline-block px-6 py-3 rounded-lg border border-[#8B5CF6] text-[#8B5CF6] font-semibold hover:bg-[#8B5CF6]/10 transition-colors">Start Free Trial</Link>
                </div>

                <div className="bg-[#12121A] border border-white/5 rounded-2xl p-8">
                  <h2 className="text-2xl font-semibold mb-6">Business Info</h2>
                  <div className="space-y-5 text-[#A1A1AA]">
                    <p className="flex items-center gap-3"><Mail className="w-5 h-5 text-[#8B5CF6]" />{businessProfile.email}</p>
                    {businessProfile.phoneDisplay && <p className="flex items-center gap-3"><Phone className="w-5 h-5 text-[#8B5CF6]" />{businessProfile.phoneDisplay}</p>}
                    <p className="flex items-center gap-3"><MapPin className="w-5 h-5 text-[#8B5CF6]" />{businessProfile.city}, {businessProfile.state}</p>
                    <p className="flex items-center gap-3"><Clock className="w-5 h-5 text-[#8B5CF6]" />Response within 24 hours</p>
                  </div>
                  <Link href={`mailto:${businessProfile.email}?subject=Book%20a%2015-minute%20call`} className="inline-block mt-6 px-6 py-3 rounded-lg border border-white/20 text-white font-semibold hover:border-[#8B5CF6]/60 transition-colors">Book a 15-Minute Call</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </ReactLenis>
  );
}
