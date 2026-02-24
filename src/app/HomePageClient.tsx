"use client";

import { ReactLenis } from "lenis/react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import SocialProofBar from "@/components/SocialProofBar";
import ServicesBento from "@/components/ServicesBento";
import WhoItsFor from "@/components/WhoItsFor";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function HomePageClient() {
  return (
    <ReactLenis root>
      <main className="min-h-screen bg-[#0A0A0F]">
        <Navigation />
        <Hero />
        <SocialProofBar />
        <ServicesBento />
        <WhoItsFor />
        <Testimonials />
        <HowItWorks />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </ReactLenis>
  );
}
