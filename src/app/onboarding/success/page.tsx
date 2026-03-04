import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Onboarding Complete | Autom8 Everything",
  description: "Your Cadence onboarding is complete.",
};

export default function OnboardingSuccessPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <section className="mesh-bg pb-20 pt-32">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-3 text-sm uppercase tracking-wide text-[#8B5CF6]">Cadence Onboarding</p>
          <h1 className="mb-4 text-4xl font-semibold md:text-5xl">You&apos;re live!</h1>
          <div className="rounded-2xl border border-white/10 bg-[#12121A] p-6 md:p-8">
            <p className="text-lg text-[#E4E4E7]">
              You&apos;re live! Your AI receptionist number is being set up. You&apos;ll receive a text within 2 minutes.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
