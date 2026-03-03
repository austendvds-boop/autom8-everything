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

type FieldKey = keyof FormState;
type Errors = Partial<Record<FieldKey, string>>;
type Touched = Partial<Record<FieldKey, boolean>>;

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

const STEP_FIELDS: Record<number, FieldKey[]> = {
  1: ["business_name", "business_description", "phone_number", "website"],
  2: ["hours", "services", "faqs", "booking_instructions"],
  3: ["greeting", "transfer_number", "booking_url", "owner_name", "owner_email", "owner_phone"],
  4: ["preferred_area_code"]
};

const REQUIRED_FIELDS: Record<number, FieldKey[]> = {
  1: ["business_name", "business_description", "phone_number", "website"],
  2: ["hours", "services", "faqs", "booking_instructions"],
  3: ["greeting", "owner_name", "owner_email", "owner_phone"],
  4: ["preferred_area_code"]
};

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

function isValidHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function validateField(field: FieldKey, value: string): string | null {
  const trimmed = value.trim();

  if (field === "transfer_number") {
    if (!trimmed) return null;
    if (!isValidUsE164Phone(trimmed)) {
      return "Transfer number must be in +1XXXXXXXXXX format.";
    }
    return null;
  }

  if (field === "booking_url") {
    if (!trimmed) return null;
    if (!isValidHttpUrl(trimmed)) {
      return "Booking URL must be a valid http:// or https:// link.";
    }
    return null;
  }

  if (!trimmed) {
    if (field === "preferred_area_code") return "Area code is required.";
    return "This field is required.";
  }

  switch (field) {
    case "phone_number":
      return isValidUsE164Phone(trimmed) ? null : "Business phone must be in +1XXXXXXXXXX format.";
    case "website":
      return isValidHttpUrl(trimmed) ? null : "Website must be a valid http:// or https:// link.";
    case "owner_email":
      return isValidEmail(trimmed) ? null : "Owner email must be a valid email address.";
    case "owner_phone":
      return isValidUsE164Phone(trimmed) ? null : "Owner phone must be in +1XXXXXXXXXX format.";
    case "preferred_area_code":
      return /^\d{3}$/.test(trimmed) ? null : "Area code must be exactly 3 digits (example: 602).";
    default:
      return null;
  }
}

function validateStep(form: FormState, step: number): Errors {
  const errors: Errors = {};
  const stepFields = STEP_FIELDS[step] ?? [];
  const requiredFields = new Set(REQUIRED_FIELDS[step] ?? []);

  for (const field of stepFields) {
    const value = form[field];
    if (!requiredFields.has(field) && !value.trim()) {
      continue;
    }

    const message = validateField(field, value);
    if (message) errors[field] = message;
  }

  return errors;
}

function mapBackendError(errorMessage: string): string {
  const normalized = errorMessage.toLowerCase().replace(/[\s-]+/g, "_");

  const byField: Record<string, string> = {
    invalid_owner_phone: "Owner phone must be in +1XXXXXXXXXX format.",
    invalid_phone_number: "Business phone must be in +1XXXXXXXXXX format.",
    invalid_transfer_number: "Transfer number must be in +1XXXXXXXXXX format.",
    invalid_owner_email: "Owner email must be a valid email address.",
    invalid_booking_url: "Booking URL must be a valid http:// or https:// link.",
    invalid_website: "Website must be a valid http:// or https:// link.",
    invalid_preferred_area_code: "Area code must be exactly 3 digits (example: 602).",
    missing_required_fields: "Please complete all required fields before continuing."
  };

  for (const [key, text] of Object.entries(byField)) {
    if (normalized.includes(key)) return text;
  }

  return "We couldn’t submit your onboarding details. Please review the form and try again.";
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
      const requiredForStep = REQUIRED_FIELDS[targetStep]?.includes(field) ?? false;
      if (!requiredForStep && !form[field].trim()) {
        nextErrors[field] = undefined;
      } else {
        nextErrors[field] = validateField(field, form[field]) ?? undefined;
      }
    }

    setTouched(nextTouched);
    setErrors(nextErrors);

    return nextErrors;
  };

  async function submit(): Promise<void> {
    try {
      setLoading(true);
      setError(null);

      const areaCodeErrors = validateStep(form, 4);
      if (Object.keys(areaCodeErrors).length > 0) {
        setErrors((prev) => ({ ...prev, ...areaCodeErrors }));
        setTouched((prev) => ({ ...prev, preferred_area_code: true }));
        setLoading(false);
        return;
      }

      const startRes = await fetch(`${API_BASE}/api/onboarding/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const startText = await startRes.text();
      const startJson = parseJsonSafe<{ session_id?: string; error?: string }>(startText);
      if (!startRes.ok || !startJson?.session_id) {
        throw new Error(mapBackendError(startJson?.error || `Failed to save onboarding details (${startRes.status})`));
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
        throw new Error(mapBackendError(checkoutJson?.error || `Failed to create checkout (${checkoutRes.status})`));
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

  function handleContinue(): void {
    const nextErrors = markStepTouchedAndValidate(step);
    const currentStepFields = STEP_FIELDS[step] ?? [];
    const hasCurrentStepErrors = currentStepFields.some((field) => Boolean(nextErrors[field]));

    if (hasCurrentStepErrors) return;

    setError(null);
    setStep((s) => Math.min(4, s + 1));
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
                <div>
                  <input
                    aria-invalid={Boolean(errors.business_name)}
                    aria-describedby={errors.business_name ? "business_name-error" : undefined}
                    className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10"
                    placeholder="Business name"
                    value={form.business_name}
                    onChange={(e) => update("business_name", e.target.value)}
                    onBlur={() => touchField("business_name")}
                  />
                  <FieldError field="business_name" error={errors.business_name} />
                </div>

                <div>
                  <textarea
                    aria-invalid={Boolean(errors.business_description)}
                    aria-describedby={errors.business_description ? "business_description-error" : undefined}
                    className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10"
                    placeholder="Business description"
                    value={form.business_description}
                    onChange={(e) => update("business_description", e.target.value)}
                    onBlur={() => touchField("business_description")}
                  />
                  <FieldError field="business_description" error={errors.business_description} />
                </div>

                <div>
                  <input
                    aria-invalid={Boolean(errors.phone_number)}
                    aria-describedby={errors.phone_number ? "phone_number-error" : undefined}
                    className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10"
                    placeholder="Business phone (+1XXXXXXXXXX)"
                    value={form.phone_number}
                    onChange={(e) => update("phone_number", e.target.value)}
                    onBlur={() => touchField("phone_number")}
                  />
                  <FieldError field="phone_number" error={errors.phone_number} />
                </div>

                <div>
                  <input
                    aria-invalid={Boolean(errors.website)}
                    aria-describedby={errors.website ? "website-error" : undefined}
                    className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10"
                    placeholder="Website URL"
                    value={form.website}
                    onChange={(e) => update("website", e.target.value)}
                    onBlur={() => touchField("website")}
                  />
                  <FieldError field="website" error={errors.website} />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <textarea
                    aria-invalid={Boolean(errors.hours)}
                    aria-describedby={errors.hours ? "hours-error" : undefined}
                    className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10"
                    placeholder="Hours of operation"
                    value={form.hours}
                    onChange={(e) => update("hours", e.target.value)}
                    onBlur={() => touchField("hours")}
                  />
                  <FieldError field="hours" error={errors.hours} />
                </div>

                <div>
                  <textarea
                    aria-invalid={Boolean(errors.services)}
                    aria-describedby={errors.services ? "services-error" : undefined}
                    className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10"
                    placeholder="Services"
                    value={form.services}
                    onChange={(e) => update("services", e.target.value)}
                    onBlur={() => touchField("services")}
                  />
                  <FieldError field="services" error={errors.services} />
                </div>

                <div>
                  <textarea
                    aria-invalid={Boolean(errors.faqs)}
                    aria-describedby={errors.faqs ? "faqs-error" : undefined}
                    className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10"
                    placeholder="FAQs"
                    value={form.faqs}
                    onChange={(e) => update("faqs", e.target.value)}
                    onBlur={() => touchField("faqs")}
                  />
                  <FieldError field="faqs" error={errors.faqs} />
                </div>

                <div>
                  <textarea
                    aria-invalid={Boolean(errors.booking_instructions)}
                    aria-describedby={errors.booking_instructions ? "booking_instructions-error" : undefined}
                    className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10"
                    placeholder="Booking instructions"
                    value={form.booking_instructions}
                    onChange={(e) => update("booking_instructions", e.target.value)}
                    onBlur={() => touchField("booking_instructions")}
                  />
                  <FieldError field="booking_instructions" error={errors.booking_instructions} />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <input
                    aria-invalid={Boolean(errors.greeting)}
                    aria-describedby={errors.greeting ? "greeting-error" : undefined}
                    className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10"
                    placeholder="Call greeting"
                    value={form.greeting}
                    onChange={(e) => update("greeting", e.target.value)}
                    onBlur={() => touchField("greeting")}
                  />
                  <FieldError field="greeting" error={errors.greeting} />
                </div>

                <div>
                  <input
                    aria-invalid={Boolean(errors.transfer_number)}
                    aria-describedby={errors.transfer_number ? "transfer_number-error" : undefined}
                    className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10"
                    placeholder="Transfer number (optional)"
                    value={form.transfer_number}
                    onChange={(e) => update("transfer_number", e.target.value)}
                    onBlur={() => touchField("transfer_number")}
                  />
                  <FieldError field="transfer_number" error={errors.transfer_number} />
                </div>

                <div>
                  <input
                    aria-invalid={Boolean(errors.booking_url)}
                    aria-describedby={errors.booking_url ? "booking_url-error" : undefined}
                    className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10"
                    placeholder="Booking URL (optional)"
                    value={form.booking_url}
                    onChange={(e) => update("booking_url", e.target.value)}
                    onBlur={() => touchField("booking_url")}
                  />
                  <FieldError field="booking_url" error={errors.booking_url} />
                </div>

                <div>
                  <input
                    aria-invalid={Boolean(errors.owner_name)}
                    aria-describedby={errors.owner_name ? "owner_name-error" : undefined}
                    className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10"
                    placeholder="Owner name"
                    value={form.owner_name}
                    onChange={(e) => update("owner_name", e.target.value)}
                    onBlur={() => touchField("owner_name")}
                  />
                  <FieldError field="owner_name" error={errors.owner_name} />
                </div>

                <div>
                  <input
                    aria-invalid={Boolean(errors.owner_email)}
                    aria-describedby={errors.owner_email ? "owner_email-error" : undefined}
                    className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10"
                    placeholder="Owner email"
                    value={form.owner_email}
                    onChange={(e) => update("owner_email", e.target.value)}
                    onBlur={() => touchField("owner_email")}
                  />
                  <FieldError field="owner_email" error={errors.owner_email} />
                </div>

                <div>
                  <input
                    aria-invalid={Boolean(errors.owner_phone)}
                    aria-describedby={errors.owner_phone ? "owner_phone-error" : undefined}
                    className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10"
                    placeholder="Owner phone (+1XXXXXXXXXX)"
                    value={form.owner_phone}
                    onChange={(e) => update("owner_phone", e.target.value)}
                    onBlur={() => touchField("owner_phone")}
                  />
                  <FieldError field="owner_phone" error={errors.owner_phone} />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div>
                  <input
                    aria-invalid={Boolean(errors.preferred_area_code)}
                    aria-describedby={errors.preferred_area_code ? "preferred_area_code-error" : undefined}
                    className="w-full p-3 rounded-lg bg-[#0A0A0F] border border-white/10"
                    placeholder="Preferred area code (e.g. 602)"
                    value={form.preferred_area_code}
                    onChange={(e) => update("preferred_area_code", e.target.value)}
                    onBlur={() => touchField("preferred_area_code")}
                  />
                  <FieldError field="preferred_area_code" error={errors.preferred_area_code} />
                </div>
                <p className="text-sm text-[#A1A1AA]">You&apos;ll start a 7-day free trial, then $199/month.</p>
              </>
            )}

            {error && <p className="text-sm text-red-300">{error}</p>}

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
                  onClick={handleContinue}
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
