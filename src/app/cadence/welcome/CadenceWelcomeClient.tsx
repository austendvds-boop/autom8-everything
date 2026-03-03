"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const API_BASE = process.env.NEXT_PUBLIC_CADENCE_API_URL || "";

type StatusResponse = {
  session_id: string;
  status: "pending_checkout" | "checkout_complete" | "provisioning" | "provisioned" | "failed";
  phone_number: string | null;
  business_name: string;
  provision_error?: string | null;
};

export default function CadenceWelcomeClient() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sessionId = searchParams.get("session_id") || (typeof window !== "undefined" ? window.localStorage.getItem("cadence_onboarding_session_id") : null);

  useEffect(() => {
    if (!sessionId) {
      setError("Missing onboarding session. Please restart onboarding.");
      return;
    }

    let cancelled = false;
    const poll = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/onboarding/status/${sessionId}`);
        if (!response.ok) throw new Error("Status unavailable");
        const data = (await response.json()) as StatusResponse;
        if (cancelled) return;
        setStatus(data);
        if (data.status === "provisioned" || data.status === "failed") return;
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load status");
      }

      if (!cancelled) {
        window.setTimeout(poll, 3000);
      }
    };

    poll();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-3">Cadence Setup</p>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">We&apos;re Setting Up Your Line</h1>

          <div className="rounded-2xl border border-white/10 bg-[#12121A] p-8 space-y-4">
            {error && <p className="text-red-400">{error}</p>}
            {!status && !error && <p className="text-[#A1A1AA]">Checking your provisioning status...</p>}

            {status && (
              <>
                <p><span className="text-[#A1A1AA]">Business:</span> {status.business_name}</p>
                <p><span className="text-[#A1A1AA]">Status:</span> {status.status}</p>
                {status.phone_number && <p><span className="text-[#A1A1AA]">Assigned number:</span> {status.phone_number}</p>}
                {status.status === "failed" && status.provision_error && (
                  <p className="text-red-400">Provisioning error: {status.provision_error}</p>
                )}
                {status.status !== "provisioned" && status.status !== "failed" && (
                  <p className="text-[#A1A1AA]">This page refreshes automatically.</p>
                )}
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
