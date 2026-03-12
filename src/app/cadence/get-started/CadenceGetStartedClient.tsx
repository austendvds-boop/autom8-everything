"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
type Errors = Partial<Record<FieldKey, string>>;
type Touched = Partial<Record<FieldKey, boolean>>;

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
  1: ["business_name", "business_description"],
  2: ["hours", "faqs"],
  3: ["owner_name", "owner_email", "owner_phone", "transfer_number"],
  4: ["area_code"],
};

const REQUIRED_FIELDS: Record<number, FieldKey[]> = { ...STEP_FIELDS };

function parseJsonSafe<T>(text: string): T | null {
  try {
    return text ? (JSON.parse(text) as T) : null;
  } catch {
    return null;
  }
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidUsE164Phone(value: string): boolean {
  return /^\+1\d{10}$/.test(value);
}

function validateField(field: FieldKey, value: string): string | null {
  const trimmed = value.trim();

  if (!trimmed) {
    if (field === "area_code") return "Area code is required.";
    return "This field is required.";
  }

  switch (field) {
    case "owner_email":
      return isValidEmail(trimmed) ? null : "Owner email must be a valid email address.";
    case "owner_phone":
      return isValidUsE164Phone(trimmed) ? null : "Owner phone must be in +1XXXXXXXXXX format.";
    case "transfer_number":
      return isValidUsE164Phone(trimmed) ? null : "Transfer number must be in +1XXXXXXXXXX format.";
    case "area_code":
      return /^\d{3}$/.test(trimmed) ? null : "Area code must be exactly 3 digits (example: 602).";
    default:
      return null;
  }
}

function validateStep(form: FormState, step: number): Errors {
  const stepFields = STEP_FIELDS[step] ?? [];
  const requiredFields = new Set(REQUIRED_FIELDS[step] ?? []);
  const nextErrors: Errors = {};

  for (const field of stepFields) {
    const value = form[field];

    if (!requiredFields.has(field) && !value.trim()) {
      continue;
    }

    const message = validateField(field, value);

    if (message) {
      nextErrors[field] = message;
    }
  }

  return nextErrors;
}

function validateAllSteps(form: FormState): Errors {
  return [1, 2, 3, 4].reduce<Errors>((acc, step) => ({ ...acc, ...validateStep(form, step) }), {});
}

function mapBackendError(errorMessage: string): string {
  const normalized = errorMessage.toLowerCase().replace(/[\s-]+/g, "_");

  if (normalized.includes("owner_email")) return "Owner email must be a valid email address.";
  if (normalized.includes("owner_phone")) return "Owner phone must be in +1XXXXXXXXXX format.";
  if (normalized.includes("transfer_number")) return "Transfer number must be in +1XXXXXXXXXX format.";
  if (normalized.includes("area_code")) return "Area code must be exactly 3 digits (example: 602).";
  if (normalized.includes("required")) return "Please complete all required fields before continuing.";

  return "We couldn't submit your onboarding details. Please review the form and try again.";
}

function FieldError({ field, error }: { field: FieldKey; error?: string }) {
  if (!error) return null;

  return (
    <p id={`${field}-error`} className="mt-2 text-sm text-red-300">
      {error}
    </p>
  );
}

export default function CadenceGetStartedClient() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stepErrors = useMemo(() => validateStep(form, step), [form, step]);
  const canContinue = useMemo(() => Object.keys(stepErrors).length === 0, [stepErrors]);

  const update = (key: FieldKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    if (touched[key]) {
      const message = validateField(key, value);
      setErrors((prev) => ({ ...prev, [key]: message ?? undefined }));
    }
  };

  const touchField = (key: FieldKey) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const message = validateField(key, form[key]);
    setErrors((prev) => ({ ...prev, [key]: message ?? undefined }));
  };

  const markStepTouchedAndValidate = (targetStep: number): Errors => {
    const fields = STEP_FIELDS[targetStep] ?? [];
    const nextTouched = { ...touched };
    const nextErrors = { ...errors };

    for (const field of fields) {
      nextTouched[field] = true;
      nextErrors[field] = validateField(field, form[field]) ?? undefined;
    }

    setTouched(nextTouched);
    setErrors(nextErrors);

    return nextErrors;
  };

  async function submit(): Promise<void> {
    try {
      setLoading(true);
      setError(null);

      const nextErrors = validateAllSteps(form);

      if (Object.keys(nextErrors).length > 0) {
        const nextTouched = Object.keys(form).reduce<Touched>((acc, key) => {
          acc[key as FieldKey] = true;
          return acc;
        }, {});

        setTouched(nextTouched);
        setErrors(nextErrors);
        setLoading(false);
        return;
      }

      const checkoutRes = await fetch("/api/onboarding/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const checkoutText = await checkoutRes.text();
      const checkoutJson = parseJsonSafe<{ url?: string; error?: string }>(checkoutText);

      if (!checkoutRes.ok || !checkoutJson?.url) {
        throw new Error(mapBackendError(checkoutJson?.error || `Failed to create checkout (${checkoutRes.status})`));
      }

      window.localStorage.setItem("cadence_checkout_email", form.owner_email.trim().toLowerCase());
      window.location.href = checkoutJson.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleContinue(): void {
    const nextErrors = markStepTouchedAndValidate(step);
    const currentStepFields = STEP_FIELDS[step] ?? [];
    const hasCurrentStepErrors = currentStepFields.some((field) => Boolean(nextErrors[field]));

    if (hasCurrentStepErrors) return;

    setError(null);
    setStep((currentStep) => Math.min(4, currentStep + 1));
  }

  return (
    <main className="min-h-screen bg-[#0E1015]">
      <Navigation />
      <section className="pt-32 pb-20 mesh-bg">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-[#D4A030] mb-3">Cadence Onboarding</p>
          <h1 className="mb-4 text-4xl font-semibold text-[#EDEBE8] md:text-5xl">Get Your AI Receptionist Live</h1>
          <p className="text-[#9B978F] mb-8">
            Takes about 5 minutes. After checkout, sign in to the portal to finish setup and launch your AI receptionist.
          </p>

          <div className="mb-8 rounded-2xl border border-[#D4A030]/20 bg-[#161920] px-5 py-4">
            <p className="text-sm text-[#EDEBE8]">
              Looking for the quick signup?{" "}
              <Link href="/portal/checkout?product=cadence" className="font-semibold text-[#D4A030] hover:text-[#E5B544]">
                Start your free trial →
              </Link>
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#161920] p-6 md:p-8 space-y-4">
            <p className="text-sm text-[#D4A030]">Step {step} of 4</p>

            {step === 1 && (
              <>
                <div>
                  <input
                    aria-invalid={Boolean(errors.business_name)}
                    aria-describedby={errors.business_name ? "business_name-error" : undefined}
                    className="w-full rounded-lg border border-white/[0.06] bg-[#0E1015] p-3 text-[#EDEBE8] placeholder:text-[#5E5B56] focus:border-[#D4A030] focus:outline-none"
                    placeholder="Business name"
                    value={form.business_name}
                    onChange={(event) => update("business_name", event.target.value)}
                    onBlur={() => touchField("business_name")}
                  />
                  <FieldError field="business_name" error={errors.business_name} />
                </div>

                <div>
                  <textarea
                    aria-invalid={Boolean(errors.business_description)}
                    aria-describedby={errors.business_description ? "business_description-error" : undefined}
                    className="w-full rounded-lg border border-white/[0.06] bg-[#0E1015] p-3 text-[#EDEBE8] placeholder:text-[#5E5B56] focus:border-[#D4A030] focus:outline-none"
                    placeholder="Business description"
                    value={form.business_description}
                    onChange={(event) => update("business_description", event.target.value)}
                    onBlur={() => touchField("business_description")}
                  />
                  <FieldError field="business_description" error={errors.business_description} />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <textarea
                    aria-invalid={Boolean(errors.hours)}
                    aria-describedby={errors.hours ? "hours-error" : undefined}
                    className="w-full rounded-lg border border-white/[0.06] bg-[#0E1015] p-3 text-[#EDEBE8] placeholder:text-[#5E5B56] focus:border-[#D4A030] focus:outline-none"
                    placeholder="Hours of operation"
                    value={form.hours}
                    onChange={(event) => update("hours", event.target.value)}
                    onBlur={() => touchField("hours")}
                  />
                  <FieldError field="hours" error={errors.hours} />
                </div>

                <div>
                  <textarea
                    aria-invalid={Boolean(errors.faqs)}
                    aria-describedby={errors.faqs ? "faqs-error" : undefined}
                    className="w-full rounded-lg border border-white/[0.06] bg-[#0E1015] p-3 text-[#EDEBE8] placeholder:text-[#5E5B56] focus:border-[#D4A030] focus:outline-none"
                    placeholder="FAQs"
                    value={form.faqs}
                    onChange={(event) => update("faqs", event.target.value)}
                    onBlur={() => touchField("faqs")}
                  />
                  <FieldError field="faqs" error={errors.faqs} />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <input
                    aria-invalid={Boolean(errors.owner_name)}
                    aria-describedby={errors.owner_name ? "owner_name-error" : undefined}
                    className="w-full rounded-lg border border-white/[0.06] bg-[#0E1015] p-3 text-[#EDEBE8] placeholder:text-[#5E5B56] focus:border-[#D4A030] focus:outline-none"
                    placeholder="Owner name"
                    value={form.owner_name}
                    onChange={(event) => update("owner_name", event.target.value)}
                    onBlur={() => touchField("owner_name")}
                  />
                  <FieldError field="owner_name" error={errors.owner_name} />
                </div>

                <div>
                  <input
                    aria-invalid={Boolean(errors.owner_email)}
                    aria-describedby={errors.owner_email ? "owner_email-error" : undefined}
                    className="w-full rounded-lg border border-white/[0.06] bg-[#0E1015] p-3 text-[#EDEBE8] placeholder:text-[#5E5B56] focus:border-[#D4A030] focus:outline-none"
                    placeholder="Owner email"
                    value={form.owner_email}
                    onChange={(event) => update("owner_email", event.target.value)}
                    onBlur={() => touchField("owner_email")}
                  />
                  <FieldError field="owner_email" error={errors.owner_email} />
                </div>

                <div>
                  <input
                    aria-invalid={Boolean(errors.owner_phone)}
                    aria-describedby={errors.owner_phone ? "owner_phone-error" : undefined}
                    className="w-full rounded-lg border border-white/[0.06] bg-[#0E1015] p-3 text-[#EDEBE8] placeholder:text-[#5E5B56] focus:border-[#D4A030] focus:outline-none"
                    placeholder="Owner phone (+1XXXXXXXXXX)"
                    value={form.owner_phone}
                    onChange={(event) => update("owner_phone", event.target.value)}
                    onBlur={() => touchField("owner_phone")}
                  />
                  <FieldError field="owner_phone" error={errors.owner_phone} />
                </div>

                <div>
                  <input
                    aria-invalid={Boolean(errors.transfer_number)}
                    aria-describedby={errors.transfer_number ? "transfer_number-error" : undefined}
                    className="w-full rounded-lg border border-white/[0.06] bg-[#0E1015] p-3 text-[#EDEBE8] placeholder:text-[#5E5B56] focus:border-[#D4A030] focus:outline-none"
                    placeholder="Transfer number (+1XXXXXXXXXX)"
                    value={form.transfer_number}
                    onChange={(event) => update("transfer_number", event.target.value)}
                    onBlur={() => touchField("transfer_number")}
                  />
                  <FieldError field="transfer_number" error={errors.transfer_number} />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div>
                  <input
                    aria-invalid={Boolean(errors.area_code)}
                    aria-describedby={errors.area_code ? "area_code-error" : undefined}
                    className="w-full rounded-lg border border-white/[0.06] bg-[#0E1015] p-3 text-[#EDEBE8] placeholder:text-[#5E5B56] focus:border-[#D4A030] focus:outline-none"
                    placeholder="Preferred area code (e.g. 602)"
                    value={form.area_code}
                    onChange={(event) => update("area_code", event.target.value)}
                    onBlur={() => touchField("area_code")}
                  />
                  <FieldError field="area_code" error={errors.area_code} />
                </div>
                <p className="text-sm text-[#9B978F]">You&apos;ll start a 7-day free trial, then $199/month.</p>
              </>
            )}

            {error && <p className="text-sm text-red-300">{error}</p>}

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep((currentStep) => Math.max(1, currentStep - 1))}
                disabled={step === 1 || loading}
                className="rounded-lg border border-white/[0.06] px-5 py-3 text-[#EDEBE8] transition hover:border-[#D4A030]/30 disabled:opacity-40"
              >
                Back
              </button>
              {step < 4 ? (
                <button
                  onClick={handleContinue}
                  disabled={!canContinue || loading}
                  className="rounded-lg bg-[linear-gradient(135deg,#D4A030,#E8C068)] px-5 py-3 font-semibold text-[#0E1015] transition hover:shadow-[0_0_30px_rgba(212,160,48,0.2)] disabled:opacity-40"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={!canContinue || loading}
                  className="rounded-lg bg-[linear-gradient(135deg,#D4A030,#E8C068)] px-5 py-3 font-semibold text-[#0E1015] transition hover:shadow-[0_0_30px_rgba(212,160,48,0.2)] disabled:opacity-40"
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
