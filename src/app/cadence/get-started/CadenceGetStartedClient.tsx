"use client";

import { useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const API_BASE = process.env.NEXT_PUBLIC_CADENCE_API_URL || "";

type FormState = {
  business_name: string;
  business_description: string;
  phone_number: string;
  website: string;
  hours: string;
  services: string;
  faqs: string;
  booking_instructions: string;
  transfer_number: string;
  booking_url: string;
  greeting: string;
  owner_name: string;
  owner_email: string;
  owner_phone: string;
  preferred_area_code: string;
};

const initialState: FormState = {
  business_name: "",
  business_description: "",
  phone_number: "",
  website: "",
  hours: "",
  services: "",
  faqs: "",
  booking_instructions: "",
  transfer_number: "",
  booking_url: "",
  greeting: "",
  owner_name: "",
  owner_email: "",
  owner_phone: "",
  preferred_area_code: ""
};

function parseJsonSafe<T>(text: string): T | null {
  try {
    return text ? (JSON.parse(text) as T) : null;
  } catch {
    return null;
  }
}

export default function CadenceGetStartedClient() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canContinue = useMemo(() => {
    if (step === 1) return !!(form.business_name && form.business_description && form.phone_number && form.website);
    if (step === 2) return !!(form.hours && form.services && form.faqs && form.booking_instructions);
    if (step === 3) return !!(form.greeting && form.owner_name && form.owner_email && form.owner_phone);
    if (step === 4) return /^\d{3}$/.test(form.preferred_area_code);
    return false;
  }, [form, step]);

  const update = (key: keyof FormState, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  async function submit(): Promise<void> {
    try {
      setLoading(true);
      setError(null);

      const startRes = await fetch(`${API_BASE}/api/onboarding/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const startText = await startRes.text();
      const startJson = parseJsonSafe<{ session_id?: string; error?: string }>(startText);
      if (!startRes.ok || !startJson?.session_id) {
        throw new Error(startJson?.error || `Failed to save onboarding details (${startRes.status})`);
      }
      const startData = startJson as { session_id: string };

      const checkoutRes = await fetch(`${API_BASE}/api/onboarding/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: startData.session_id })
      });
      const checkoutText = await checkoutRes.text();
      const checkoutJson = parseJsonSafe<{ checkout_url?: string; error?: string }>(checkoutText);
      if (!checkoutRes.ok || !checkoutJson?.checkout_url) {
        throw new Error(checkoutJson?.error || `Failed to create checkout (${checkoutRes.status})`);
      }
      const checkoutData = checkoutJson as { checkout_url: string };

      window.localStorage.setItem("cadence_onboarding_session_id", startData.session_id);
      window.location.href = checkoutData.checkout_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-[#8B5CF6] mb-3">Cadence Onboarding</p>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">Get Your AI Receptionist Live</h1>
          <p className="text-[#A1A1AA] mb-8">Takes about 5 minutes. After checkout, we provision your number automatically.</p>

          <div className="rounded-2xl border border-white/10 bg-[#12121A] p-6 md:p-8 space-y-4">
            <p className="text-sm text-[#8B5CF6]">Step {step} of 4</p>

            {step === 1 && (
              <>
                <input className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10" placeholder="Business name" value={form.business_name} onChange={(e) => update("business_name", e.target.value)} />
                <textarea className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10" placeholder="Business description" value={form.business_description} onChange={(e) => update("business_description", e.target.value)} />
                <input className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10" placeholder="Business phone (E.164)" value={form.phone_number} onChange={(e) => update("phone_number", e.target.value)} />
                <input className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10" placeholder="Website URL" value={form.website} onChange={(e) => update("website", e.target.value)} />
              </>
            )}

            {step === 2 && (
              <>
                <textarea className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10" placeholder="Hours of operation" value={form.hours} onChange={(e) => update("hours", e.target.value)} />
                <textarea className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10" placeholder="Services" value={form.services} onChange={(e) => update("services", e.target.value)} />
                <textarea className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10" placeholder="FAQs" value={form.faqs} onChange={(e) => update("faqs", e.target.value)} />
                <textarea className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10" placeholder="Booking instructions" value={form.booking_instructions} onChange={(e) => update("booking_instructions", e.target.value)} />
              </>
            )}

            {step === 3 && (
              <>
                <input className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10" placeholder="Call greeting" value={form.greeting} onChange={(e) => update("greeting", e.target.value)} />
                <input className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10" placeholder="Transfer number (optional)" value={form.transfer_number} onChange={(e) => update("transfer_number", e.target.value)} />
                <input className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10" placeholder="Booking URL (optional)" value={form.booking_url} onChange={(e) => update("booking_url", e.target.value)} />
                <input className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10" placeholder="Owner name" value={form.owner_name} onChange={(e) => update("owner_name", e.target.value)} />
                <input className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10" placeholder="Owner email" value={form.owner_email} onChange={(e) => update("owner_email", e.target.value)} />
                <input className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10" placeholder="Owner phone (E.164)" value={form.owner_phone} onChange={(e) => update("owner_phone", e.target.value)} />
              </>
            )}

            {step === 4 && (
              <>
                <input className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10" placeholder="Preferred area code (e.g. 602)" value={form.preferred_area_code} onChange={(e) => update("preferred_area_code", e.target.value)} />
                <p className="text-sm text-[#A1A1AA]">You&apos;ll start a 7-day free trial, then $199/month.</p>
              </>
            )}

            {error && <p className="text-sm text-red-400">{error}</p>}

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1 || loading}
                className="px-5 py-3 rounded-lg border border-white/20 disabled:opacity-40"
              >
                Back
              </button>
              {step < 4 ? (
                <button
                  onClick={() => setStep((s) => Math.min(4, s + 1))}
                  disabled={!canContinue || loading}
                  className="px-5 py-3 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] disabled:opacity-40"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={!canContinue || loading}
                  className="px-5 py-3 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] disabled:opacity-40"
                >
                  {loading ? "Creating checkout..." : "Start 7-Day Trial"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
