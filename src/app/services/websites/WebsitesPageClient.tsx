"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BarChart3, FileText, Globe, MapPin, Search } from "lucide-react";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ShimmerButton from "@/components/ShimmerButton";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import TiltCard from "@/components/TiltCard";
import { fadeUp, scaleIn, slideInLeft, slideInRight, staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

const steps = [
  {
    title: "Quick kickoff",
    description: "We learn your services, goals, and what you want the site to do for your business.",
  },
  {
    title: "Build and review",
    description: "We design and build your pages, then review everything with you before launch.",
  },
  {
    title: "Launch and support",
    description: "We publish your site and help with updates so it stays sharp as your business grows.",
  },
];

const websiteTiers = [
  {
    name: "Launch",
    bestFor: "New businesses that need a professional site fast",
    description: "A clean, mobile-ready website that makes your business look credible and easy to contact.",
    price: "$499",
    priceNote: "one-time",
    highlights: ["Up to 5 pages", "Mobile-ready design", "Contact or booking form", "Basic on-page SEO"],
  },
  {
    name: "Enterprise",
    bestFor: "Businesses that need more pages and custom features",
    description: "Everything in Launch plus custom features, more pages, and room to grow.",
    price: "$999",
    priceNote: "one-time",
    highlights: ["Up to 10 pages", "Everything in Launch", "Custom features and functionality", "Built for your specific workflow"],
    recommended: true,
  },
];

const monthlyPlans = [
  {
    name: "Hosting",
    price: "$50",
    priceNote: "/mo",
    description: "Keep your site running smoothly after launch.",
    highlights: ["Hosting + uptime monitoring", "1 site edit per month"],
  },
  {
    name: "Growth",
    price: "$299",
    priceNote: "/mo",
    description: "Hosting plus blog content, local SEO, and monthly reports so customers find you on Google.",
    highlights: [
      "Everything in Hosting",
      "2 blog posts published per month",
      "Google Business profile updates",
      "Local SEO optimization",
      "Monthly performance report",
    ],
    recommended: true,
  },
];

const seoSteps = [
  {
    title: "Find what your customers search",
    description: "We map the local search terms that matter for your business.",
  },
  {
    title: "Publish useful content every month",
    description: "We post clear articles and service content that answer real customer questions.",
  },
  {
    title: "Improve rankings over time",
    description: "We keep refining pages and local SEO so your visibility keeps climbing.",
  },
];

const deliverables = [
  { title: "2 blog posts per month", description: "Targeting local search terms your customers already use.", icon: FileText },
  { title: "Google Business profile updates", description: "Keep your listing current so you show up in the map pack.", icon: MapPin },
  { title: "Local SEO optimization", description: "On-page improvements so your pages rank for local searches.", icon: Search },
  { title: "Monthly performance report", description: "Clear numbers on rankings, traffic, and what is working.", icon: BarChart3 },
  { title: "Hosting + 1 site edit per month", description: "Your site stays up, fast, and current.", icon: Globe },
];

export default function WebsitesPageClient() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-[#0A0A0F] pb-20 md:pb-0">
      <Navigation />

      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-4xl mx-auto px-6">
          <motion.p
            className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-4"
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            Websites + Monthly SEO
          </motion.p>
          <AnimatedHeadline
            as="h1"
            text="A Website That Gets Picked, Trusted, and Contacted."
            className="text-5xl md:text-6xl font-semibold mb-6"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          />
          <motion.p
            className="text-xl text-[#A1A1AA] max-w-3xl"
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            We build professional websites for local businesses. Your site will be mobile-ready, easy to find on Google, and designed to get you more calls.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-8"
            variants={fadeUp}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          >
            <ShimmerButton href="/contact" size="lg">Get a Free Quote</ShimmerButton>
            <ShimmerButton href="#pricing" variant="secondary" size="lg">See Pricing</ShimmerButton>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2 className="section-heading mb-10" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            Why Your Website Matters More Than You Think
          </motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={staggerContainer} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            {[
              { stat: "75%", text: "of consumers judge credibility by website design", source: "Stanford Research" },
              { stat: "88%", text: "of users won't return after a bad mobile experience", source: "Sweor" },
              { stat: "60%+", text: "of local search traffic comes from mobile devices", source: "Google" },
            ].map((item) => (
              <motion.div key={item.stat} variants={staggerItem} className="card-base p-8 text-center">
                <p className="text-4xl font-bold gradient-text mb-3">{item.stat}</p>
                <p className="text-[#A1A1AA] text-sm mb-2">{item.text}</p>
                <p className="text-xs text-[#52525B]">Source: {item.source}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2 className="section-heading mb-10" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="card-base p-6"
                variants={index % 2 === 0 ? slideInLeft : slideInRight}
                initial={prefersReducedMotion ? false : "hidden"}
                whileInView="visible"
                viewport={viewportOnce}
              >
                <p className="text-[#8B5CF6] font-semibold mb-3">Step {index + 1}</p>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-[#A1A1AA]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xl text-[#A1A1AA] mb-6">Know what you need? Let&apos;s get started.</p>
          <ShimmerButton href="/contact" size="lg">Get a Free Quote</ShimmerButton>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-[#12121A]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="section-heading mb-10 text-center" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            Pricing Tiers
          </motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={staggerContainer} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            {websiteTiers.map((tier) => {
              const card = (
                <motion.article
                  key={tier.name}
                  variants={scaleIn}
                  className={`card-base relative p-8 h-full flex flex-col ${tier.recommended ? "border-[#8B5CF6]/45 bg-[#0A0A0F]" : ""}`}
                >
                  {tier.recommended && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs uppercase tracking-wide font-semibold px-3 py-1 rounded-full bg-[#8B5CF6] text-white">
                      Recommended
                    </span>
                  )}
                  <h3 className="text-2xl font-semibold mb-2">{tier.name}</h3>
                  <p className="text-xs text-[#8B5CF6] uppercase tracking-wide mb-2">Best for: {tier.bestFor}</p>
                  <p className="text-[#A1A1AA] mb-4 min-h-[72px]">{tier.description}</p>
                  <div className="mb-5">
                    <p className="text-4xl font-bold">{tier.price}</p>
                    <p className="text-sm text-[#A1A1AA]">{tier.priceNote}</p>
                    <p className="text-xs text-[#71717A] mt-1">+ $50/mo hosting required</p>
                  </div>
                  <ul className="space-y-2 text-[#D4D4D8] text-sm mb-8 flex-1">
                    {tier.highlights.map((item) => (
                      <li key={item}>&bull; {item}</li>
                    ))}
                  </ul>
                  <ShimmerButton href="/contact" variant={tier.recommended ? "primary" : "secondary"} className="w-full">
                    Get a Free Quote
                  </ShimmerButton>
                </motion.article>
              );

              return prefersReducedMotion ? <div key={tier.name}>{card}</div> : <TiltCard key={tier.name}>{card}</TiltCard>;
            })}
          </motion.div>

          <motion.div className="h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/40 to-transparent my-16" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce} />

          <motion.h3 className="text-2xl font-semibold mb-10 text-center" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            Monthly SEO Plans
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {monthlyPlans.map((plan) => (
              <motion.article
                key={plan.name}
                className={`card-base relative p-8 h-full flex flex-col ${plan.recommended ? "border-[#8B5CF6]/45 bg-[#0A0A0F]" : ""}`}
                variants={scaleIn}
                initial={prefersReducedMotion ? false : "hidden"}
                whileInView="visible"
                viewport={viewportOnce}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs uppercase tracking-wide font-semibold px-3 py-1 rounded-full bg-[#8B5CF6] text-white">
                    Recommended
                  </span>
                )}
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-[#A1A1AA] mb-4 min-h-[72px]">{plan.description}</p>
                <div className="mb-5">
                  <p className="text-4xl font-bold">{plan.price}</p>
                  <p className="text-sm text-[#A1A1AA]">{plan.priceNote}</p>
                </div>
                <ul className="space-y-2 text-[#D4D4D8] text-sm mb-8 flex-1">
                  {plan.highlights.map((item) => (
                    <li key={item}>&bull; {item}</li>
                  ))}
                </ul>
                <ShimmerButton href="/contact" variant={plan.recommended ? "primary" : "secondary"} className="w-full">
                  Get a Free Quote
                </ShimmerButton>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2 className="section-heading mb-10" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            What We Deliver Every Month
          </motion.h2>
          <motion.div className="space-y-4" variants={staggerContainer} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            {deliverables.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} variants={staggerItem} className="card-base p-6 flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-[#A1A1AA]">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2 className="section-heading mb-10" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            Monthly SEO: How It Works
          </motion.h2>
          <div className="grid grid-cols-1 gap-8">
            {seoSteps.map((step, index) => (
              <motion.div
                key={step.title}
                className="card-base p-6"
                variants={index % 2 === 0 ? slideInLeft : slideInRight}
                initial={prefersReducedMotion ? false : "hidden"}
                whileInView="visible"
                viewport={viewportOnce}
              >
                <p className="text-[#8B5CF6] font-semibold mb-3">Step {index + 1}</p>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-[#A1A1AA]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2 className="section-heading mb-8" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            Frequently Asked Questions
          </motion.h2>
          <motion.div className="space-y-4" variants={staggerContainer} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            {[
              { question: "Can you rebuild my existing site?", answer: "Yes. We can migrate and rebuild older websites. Ask us for a quote." },
              { question: "Do I need to write all the content?", answer: "No. We handle the writing and structure. You just tell us about your business." },
              { question: "How long does a website take to build?", answer: "Most Launch sites are live in about a week. Enterprise projects take 2-3 weeks." },
              { question: "Can I start with Launch and add Growth later?", answer: "Yes. Many businesses start with a Launch site and Hosting, then add Growth when they are ready to invest in SEO." },
              { question: "What is the difference between Hosting and Growth?", answer: "Hosting keeps your site running and includes 1 edit per month. Growth adds blog posts, Google Business updates, local SEO, and a monthly report so you show up in more searches." },
              { question: "How long until I see SEO results?", answer: "Most businesses see traction in a few months, then results build over time with consistency." },
              { question: "Do you write the SEO content?", answer: "Yes. We write and publish content for you each month." },
            ].map((faq) => (
              <motion.div key={faq.question} variants={staggerItem} className="card-base p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-[#A1A1AA]">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#12121A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 className="section-heading mb-4" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            Your Website Should Work as Hard as You Do.
          </motion.h2>
          <motion.p className="text-[#A1A1AA] text-lg mb-8" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            We&apos;ll help you choose the right tier and timeline.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row justify-center gap-4" variants={fadeUp} initial={prefersReducedMotion ? false : "hidden"} whileInView="visible" viewport={viewportOnce}>
            <ShimmerButton href="tel:+14806313993" size="lg">Call (480) 631-3993</ShimmerButton>
            <ShimmerButton href="/contact" variant="secondary" size="lg">Fill Out the Form</ShimmerButton>
          </motion.div>
        </div>
      </section>

      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
