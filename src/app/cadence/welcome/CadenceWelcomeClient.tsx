"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function CadenceWelcomeClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const nextParams = new URLSearchParams();
    const sessionId = searchParams.get("session_id");
    const email = searchParams.get("email") || window.localStorage.getItem("cadence_checkout_email");

    nextParams.set("product", "cadence");

    if (sessionId) {
      nextParams.set("session_id", sessionId);
    }

    if (email) {
      nextParams.set("email", email);
    }

    router.replace(`/portal/checkout/success?${nextParams.toString()}`);
  }, [router, searchParams]);

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-3">Cadence Setup</p>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">Redirecting to Your Portal Setup</h1>

          <div className="rounded-2xl border border-white/10 bg-[#12121A] p-8 space-y-4">
            <p className="text-[#A1A1AA]">
              Provisioning happens after payment. Redirecting you to the portal checkout success page now.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
