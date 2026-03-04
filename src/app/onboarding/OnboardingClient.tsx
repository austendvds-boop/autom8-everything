"use client";

import { useMemo, useState } from "react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

type FormState = {
  business_name: string;
  owner_name: string;
  owner_email: string;
  owner_phone: string;
  hours: string;
  business_description: string;
  faqs: string;
  area_code: string;
  transfer_number: string;
};

type FieldKey = keyof FormState;
type ErrorMap = Partial<Record<FieldKey, string>>;

const initialState: FormState = {
  business_name: "",
  owner_name: "",
  owner_email: "",
  owner_phone: "",
  hours: "",
  business_description: "",
  faqs: "",
  area_code: "",
  transfer_number: "",
};

const STEP_FIELDS: Record<number, FieldKey[]> = {
  1: ["business_name", "owner_name", "owner_email", "owner_phone"],
  2: ["hours", "business_description", "faqs"],
  3: ["area_code", "transfer_number"],
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
}

function normalizePhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return value.trim();
}

function validateField(field: FieldKey, value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "This field is required.";

  if (field === "owner_email" && !isValidEmail(trimmed)) {
    return "Please enter a valid email address.";
  }

  if ((field === "owner_phone" || field === "transfer_number") && !isValidPhone(trimmed)) {
    return "Please enter a valid US phone number.";
  }

  if (field === "area_code" && !/^\d{3}$/.test(trimmed)) {
    return "Area code should be 3 digits (example: 480).";
  }

  return null;
}

function validateStep(form: FormState, step: number): ErrorMap {
  const errors: ErrorMap = {};
  const fields = STEP_FIELDS[step] ?? [];

  for (const field of fields) {
    const message = validateField(field, form[field]);
    if (message) {
      errors[field] = message;
    }
  }

  return errors;
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return <p className="mt-2 text-sm text-red-300">{error}</p>;
}

export default function OnboardingClient() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<ErrorMap>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const stepErrors = useMemo(() => validateStep(form, step), [form, step]);
  const canContinue = useMemo(() => Object.keys(stepErrors).length === 0, [stepErrors]);

  const updateField = (field: FieldKey, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) ?? undefined }));
    }
  };

  const goNext = () => {
    const currentErrors = validateStep(form, step);
    setErrors((prev) => ({ ...prev, ...currentErrors }));

    if (Object.keys(currentErrors).length > 0) return;

    setSubmitError(null);
    setStep((prev) => Math.min(4, prev + 1));
  };

  const goBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
    setSubmitError(null);
  };

  const submit = async () => {
    const finalErrors = {
      ...validateStep(form, 1),
      ...validateStep(form, 2),
      ...validateStep(form, 3),
    };

    setErrors(finalErrors);
    if (Object.keys(finalErrors).length > 0) {
      setStep(1);
      return;
    }

    try {
      setLoading(true);
      setSubmitError(null);

      const response = await fetch("/api/onboarding/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          owner_phone: normalizePhone(form.owner_phone),
          transfer_number: normalizePhone(form.transfer_number),
        }),
      });

      const payload = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error || "Unable to start checkout right now. Please try again.");
      }

      window.location.href = payload.url;
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />
      <section className="mesh-bg pb-20 pt-32">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-3 text-sm uppercase tracking-wide text-[#8B5CF6]">Cadence Onboarding</p>
          <h1 className="mb-4 text-4xl font-semibold md:text-5xl">Set Up Your AI Receptionist in One Phone Call</h1>
          <p className="mb-6 text-[#A1A1AA] text-lg">
            Call (480) 631-3993 — Cadence will walk you through setup and have your number live in minutes.
          </p>

          <div className="mb-8 rounded-2xl border border-[#8B5CF6]/40 bg-[#12121A] p-6 md:p-8 text-center">
            <p className="text-sm uppercase tracking-wide text-[#A78BFA] mb-3">Phone-first setup</p>
            <a
              href="tel:+14806313993"
              className="inline-flex w-full md:w-auto items-center justify-center rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-8 py-4 text-lg md:text-2xl font-semibold text-white"
            >
              Call (480) 631-3993
            </a>
            <p className="mt-4 text-sm text-[#A1A1AA]">We’ll get your Cadence number live before you hang up.</p>
          </div>

          <p className="mb-4 text-[#D4D4D8] font-medium">Prefer to type? Fill out the form below.</p>

          <div className="space-y-5 rounded-2xl border border-white/8 bg-[#12121A]/90 p-6 md:p-8">
            <p className="text-sm text-[#8B5CF6]">Step {step} of 4</p>

            {step === 1 && (
              <>
                <div>
                  <label className="mb-2 block text-sm text-[#E4E4E7]">Business name</label>
                  <input
                    className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] p-3"
                    value={form.business_name}
                    onChange={(event) => updateField("business_name", event.target.value)}
                    placeholder="Acme Plumbing"
                  />
                  <FieldError error={errors.business_name} />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-[#E4E4E7]">Owner name</label>
                  <input
                    className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] p-3"
                    value={form.owner_name}
                    onChange={(event) => updateField("owner_name", event.target.value)}
                    placeholder="Jane Smith"
                  />
                  <FieldError error={errors.owner_name} />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-[#E4E4E7]">Email</label>
                  <input
                    className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] p-3"
                    value={form.owner_email}
                    onChange={(event) => updateField("owner_email", event.target.value)}
                    placeholder="you@business.com"
                  />
                  <FieldError error={errors.owner_email} />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-[#E4E4E7]">Phone number</label>
                  <input
                    className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] p-3"
                    value={form.owner_phone}
                    onChange={(event) => updateField("owner_phone", event.target.value)}
                    placeholder="(480) 555-1234"
                  />
                  <FieldError error={errors.owner_phone} />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="mb-2 block text-sm text-[#E4E4E7]">Business hours</label>
                  <textarea
                    className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] p-3"
                    rows={3}
                    value={form.hours}
                    onChange={(event) => updateField("hours", event.target.value)}
                    placeholder="Mon-Fri 8am-6pm, Sat 9am-2pm"
                  />
                  <FieldError error={errors.hours} />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-[#E4E4E7]">What does your business do?</label>
                  <textarea
                    className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] p-3"
                    rows={4}
                    value={form.business_description}
                    onChange={(event) => updateField("business_description", event.target.value)}
                    placeholder="We handle emergency plumbing repairs and water heater installs."
                  />
                  <FieldError error={errors.business_description} />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-[#E4E4E7]">Common caller questions (FAQs)</label>
                  <textarea
                    className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] p-3"
                    rows={4}
                    value={form.faqs}
                    onChange={(event) => updateField("faqs", event.target.value)}
                    placeholder="Example: Do you offer same-day service? What areas do you cover?"
                  />
                  <FieldError error={errors.faqs} />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <label className="mb-2 block text-sm text-[#E4E4E7]">Preferred area code for your Cadence number</label>
                  <input
                    className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] p-3"
                    value={form.area_code}
                    onChange={(event) => updateField("area_code", event.target.value)}
                    placeholder="480"
                  />
                  <FieldError error={errors.area_code} />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-[#E4E4E7]">Transfer number (for when callers want a human)</label>
                  <input
                    className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] p-3"
                    value={form.transfer_number}
                    onChange={(event) => updateField("transfer_number", event.target.value)}
                    placeholder="(480) 555-5678"
                  />
                  <FieldError error={errors.transfer_number} />
                </div>
              </>
            )}

            {step === 4 && (
              <div className="space-y-4 rounded-xl border border-white/10 bg-[#0A0A0F] p-4">
                <p className="text-sm text-[#A1A1AA]">Review your details, then continue to secure checkout.</p>
                <ul className="space-y-2 text-sm text-[#E4E4E7]">
                  <li><span className="text-[#A1A1AA]">Business:</span> {form.business_name}</li>
                  <li><span className="text-[#A1A1AA]">Owner:</span> {form.owner_name}</li>
                  <li><span className="text-[#A1A1AA]">Email:</span> {form.owner_email}</li>
                  <li><span className="text-[#A1A1AA]">Phone:</span> {form.owner_phone}</li>
                  <li><span className="text-[#A1A1AA]">Area code:</span> {form.area_code}</li>
                  <li><span className="text-[#A1A1AA]">Transfer number:</span> {form.transfer_number}</li>
                </ul>
              </div>
            )}

            {submitError && <p className="text-sm text-red-300">{submitError}</p>}

            <div className="flex gap-3 pt-2">
              <button
                onClick={goBack}
                disabled={step === 1 || loading}
                className="rounded-lg border border-white/20 px-5 py-3 disabled:opacity-40"
              >
                Back
              </button>

              {step < 4 ? (
                <button
                  onClick={goNext}
                  disabled={!canContinue || loading}
                  className="rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-5 py-3 disabled:opacity-40"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={loading}
                  className="rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-5 py-3 disabled:opacity-40"
                >
                  {loading ? "Opening checkout..." : "Continue to checkout"}
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
