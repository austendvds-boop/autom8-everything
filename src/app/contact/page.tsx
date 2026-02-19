"use client";

import { useState } from "react";
import { ReactLenis } from "lenis/react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send, Check } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

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
              Get in <span className="gradient-text">Touch</span>
            </motion.h1>
            <motion.p
              className="text-xl text-[#A1A1AA] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready to transform your business? Let's talk about how automation can help.
            </motion.p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-[#12121A] border border-white/5 rounded-2xl p-8">
                  <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
                  
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                        <Check className="w-8 h-8 text-[#10B981]" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                      <p className="text-[#A1A1AA]">
                        We'll get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm text-[#A1A1AA] mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full px-4 py-3 bg-[#1A1A23] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm text-[#A1A1AA] mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full px-4 py-3 bg-[#1A1A23] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
                          placeholder="john@company.com"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="company" className="block text-sm text-[#A1A1AA] mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          value={formState.company}
                          onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                          className="w-full px-4 py-3 bg-[#1A1A23] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
                          placeholder="Your Company"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm text-[#A1A1AA] mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={5}
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          className="w-full px-4 py-3 bg-[#1A1A23] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#8B5CF6] transition-colors resize-none"
                          placeholder="Tell us about your automation needs..."
                        />
                      </div>
                      
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </form>
                  )}
                </div>
              </motion.div>
              
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-[#12121A] border border-white/5 rounded-2xl p-8">
                  <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-[#8B5CF6]" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a href="mailto:hello@autom8.com" className="text-[#A1A1AA] hover:text-[#8B5CF6] transition-colors">
                          hello@autom8.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-[#8B5CF6]" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Location</h3>
                        <p className="text-[#A1A1AA]">Phoenix, AZ</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-[#8B5CF6]" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Response Time</h3>
                        <p className="text-[#A1A1AA]">Within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#12121A] border border-white/5 rounded-2xl p-8">
                  <h3 className="text-xl font-semibold mb-4">Free Consultation</h3>
                  <p className="text-[#A1A1AA] mb-6">
                    Not sure where to start? Book a free 30-minute consultation to discuss your automation needs.
                  </p>
                  <a
                    href="mailto:hello@autom8.com?subject=Free%20Consultation%20Request"
                    className="inline-block px-6 py-3 rounded-lg border border-[#8B5CF6] text-[#8B5CF6] font-semibold hover:bg-[#8B5CF6]/10 transition-colors"
                  >
                    Schedule Call
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </ReactLenis>
  );
}
