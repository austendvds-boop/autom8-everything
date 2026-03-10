"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ScrollFade from "@/components/ScrollFade";
import SocialProofBar from "@/components/SocialProofBar";
import ProofBar from "@/components/ProofBar";
import ServicesBento from "@/components/ServicesBento";

const OfferLadder = dynamic(() => import("@/components/OfferLadder"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const WhoItsFor = dynamic(() => import("@/components/WhoItsFor"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const CTA = dynamic(() => import("@/components/CTA"));
const Footer = dynamic(() => import("@/components/Footer"));
const StickyMobileCTA = dynamic(() => import("@/components/StickyMobileCTA"));

const ReactLenis = dynamic(() => import("lenis/react").then((mod) => mod.ReactLenis), {
  ssr: false,
});

export default function HomePageClient() {
  return (
    <ReactLenis root>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#8B5CF6] focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      <main id="main-content" className="min-h-screen bg-[#0A0A0F] pb-20 md:pb-0">
        <Navigation />
        <Hero />
        <ScrollFade />
        <SocialProofBar />
        <ProofBar />
        <ServicesBento />
        <ScrollFade />
        <OfferLadder />
        <WhoItsFor />
        <HowItWorks />
        <ScrollFade />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
        <StickyMobileCTA />
      </main>
    </ReactLenis>
  );
}
