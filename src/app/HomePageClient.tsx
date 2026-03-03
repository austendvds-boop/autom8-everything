"use client";

import { ReactLenis } from "lenis/react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import SocialProofBar from "@/components/SocialProofBar";
import ServicesBento from "@/components/ServicesBento";
import HowItWorks from "@/components/HowItWorks";
import WhoItsFor from "@/components/WhoItsFor";
import Testimonials from "@/components/Testimonials";
import PricingOverview from "@/components/PricingOverview";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function HomePageClient() {
  return (
    <ReactLenis root>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#8B5CF6] focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      <main id="main-content" className="min-h-screen bg-[#0A0A0F]">
        <Navigation />
        <Hero />
        <SocialProofBar />
        <ServicesBento />
        <HowItWorks />
        <WhoItsFor />
        <Testimonials />
        <PricingOverview />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </ReactLenis>
  );
}
