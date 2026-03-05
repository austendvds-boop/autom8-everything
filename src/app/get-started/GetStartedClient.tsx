"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ONBOARD_ENDPOINT = "https://cadence-v2-production.up.railway.app/api/onboard";

const STEP_TITLES = [
  "Business Basics",
  "Hours & Services",
  "Call Handling",
  "Common Questions",
  "Review & Submit",
] as const;

const BUSINESS_TYPES = [
  { value: "restaurant", label: "Restaurant" },
  { value: "medical_dental", label: "Medical/Dental" },
  { value: "legal", label: "Legal" },
  { value: "auto_service", label: "Auto/Service" },
  { value: "real_estate", label: "Real Estate" },
  { value: "salon_spa", label: "Salon/Spa" },
  { value: "general_other", label: "General/Other" },
] as const;

type BusinessType = (typeof BUSINESS_TYPES)[number]["value"];

type TemplateKey =
  | "general"
  | "medical_dental"
  | "restaurant"
  | "auto_service"
  | "legal"
  | "salon_spa"
  | "real_estate"
  | "custom";

const BUSINESS_TYPE_TO_TEMPLATE: Record<BusinessType, Exclude<TemplateKey, "custom">> = {
  restaurant: "restaurant",
  medical_dental: "medical_dental",
  legal: "legal",
  auto_service: "auto_service",
  real_estate: "real_estate",
  salon_spa: "salon_spa",
  general_other: "general",
};

const TEMPLATE_LABELS: Record<TemplateKey, string> = {
  general: "General",
  medical_dental: "Medical/Dental",
  restaurant: "Restaurant",
  auto_service: "Auto/Service",
  legal: "Legal",
  salon_spa: "Salon/Spa",
  real_estate: "Real Estate",
  custom: "Custom",
};

const TEMPLATE_OPTIONS: TemplateKey[] = [
  "general",
  "medical_dental",
  "restaurant",
  "auto_service",
  "legal",
  "salon_spa",
  "real_estate",
  "custom",
];

const GREETING_TEMPLATES: Record<Exclude<TemplateKey, "custom">, string> = {
  general: "Thanks for calling [Business Name], how can I help you today?",
  medical_dental:
    "Thank you for calling [Business Name]. For emergencies please call 911, otherwise how can I assist you?",
  restaurant: "Thanks for calling [Business Name]! Are you looking to place an order or make a reservation?",
  auto_service:
    "Thanks for calling [Business Name]. Are you calling about an existing service or looking to schedule something new?",
  legal: "Thank you for calling the offices of [Business Name]. How may I direct your call?",
  salon_spa: "Thanks for calling [Business Name]! Are you looking to book an appointment?",
  real_estate:
    "Thanks for calling [Business Name]. Are you looking to buy, sell, or have a question about a listing?",
};

const FAQ_EXAMPLES: Record<BusinessType, Array<{ question: string; answer: string }>> = {
  restaurant: [
    {
      question: "Do you take reservations?",
      answer: "Yes. We take reservations by phone and can help with same-day availability.",
    },
    {
      question: "Do you have takeout or delivery?",
      answer: "Yes. We can walk you through menu options and pickup or delivery timing.",
    },
  ],
  medical_dental: [
    {
      question: "Do you accept my insurance?",
      answer: "Please share your provider details and we can confirm accepted plans.",
    },
    {
      question: "Can I book an appointment this week?",
      answer: "Yes. We can check available time slots and schedule your visit.",
    },
  ],
  legal: [
    {
      question: "What type of cases do you handle?",
      answer: "We can outline practice areas and connect you with the right attorney.",
    },
    {
      question: "How do consultations work?",
      answer: "We can explain consultation options, timing, and what to prepare beforehand.",
    },
  ],
  auto_service: [
    {
      question: "Can I get a same-day service appointment?",
      answer: "We can check today’s schedule and place you in the earliest available slot.",
    },
    {
      question: "Do you work on my vehicle type?",
      answer: "Yes. Share your make and model and we can confirm available services.",
    },
  ],
  real_estate: [
    {
      question: "Can I schedule a showing?",
      answer: "Yes. We can collect your preferred times and coordinate with the listing agent.",
    },
    {
      question: "Do you help with buying and selling?",
      answer: "Yes. We can route your call based on whether you are buying, selling, or both.",
    },
  ],
  salon_spa: [
    {
      question: "How do I book an appointment?",
      answer: "We can help schedule by phone and confirm service duration and availability.",
    },
    {
      question: "Do you offer walk-ins?",
      answer: "We can check current availability and let you know if walk-ins are open.",
    },
  ],
  general_other: [
    {
      question: "What services do you provide?",
      answer: "We can explain your core services and help callers choose the right option.",
    },
    {
      question: "What are your business hours?",
      answer: "We can share your hours and help with next-step scheduling requests.",
    },
  ],
};

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
type DayName = (typeof DAYS_OF_WEEK)[number];

type OperatingHour = {
  day: DayName;
  open: string;
  close: string;
  isClosed: boolean;
};

type ServiceItem = {
  id: string;
  name: string;
  price: string;
};

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type FormState = {
  businessName: string;
  businessType: BusinessType | "";
  businessPhone: string;
  businessEmail: string;
  websiteUrl: string;
  operatingHours: OperatingHour[];
  services: ServiceItem[];
  greetingTemplate: TemplateKey;
  greetingText: string;
  transferNumber: string;
  faqs: FaqItem[];
};

type ErrorKey =
  | "businessName"
  | "businessType"
  | "businessPhone"
  | "businessEmail"
  | "websiteUrl"
  | "operatingHours"
  | "services"
  | "greetingText"
  | "transferNumber"
  | "faqs";

type FormErrors = Partial<Record<ErrorKey, string>>;

function makeId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function createServiceRow(): ServiceItem {
  return { id: makeId(), name: "", price: "" };
}

function createDefaultHours(): OperatingHour[] {
  return DAYS_OF_WEEK.map((day, index) => ({
    day,
    open: "09:00",
    close: "17:00",
    isClosed: index >= 5,
  }));
}

function createFaqRows(type: BusinessType): FaqItem[] {
  const examples = FAQ_EXAMPLES[type] ?? FAQ_EXAMPLES.general_other;
  return examples.map((item) => ({ id: makeId(), question: item.question, answer: item.answer }));
}

function applyBusinessName(template: string, businessName: string): string {
  const fallbackName = businessName.trim() || "Your Business";
  return template.replaceAll("[Business Name]", fallbackName);
}

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

function normalizeWebsite(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function isValidWebsite(value: string): boolean {
  try {
    const normalized = normalizeWebsite(value);
    if (!normalized) return true;
    const parsed = new URL(normalized);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function validateStep(form: FormState, step: number): FormErrors {
  const errors: FormErrors = {};

  if (step === 1) {
    if (!form.businessName.trim()) {
      errors.businessName = "Business name is required.";
    }
    if (!form.businessType) {
      errors.businessType = "Select your business type.";
    }
    if (!form.businessPhone.trim()) {
      errors.businessPhone = "Business phone number is required.";
    } else if (!isValidPhone(form.businessPhone)) {
      errors.businessPhone = "Enter a valid US phone number.";
    }
    if (!form.businessEmail.trim()) {
      errors.businessEmail = "Business email is required.";
    } else if (!isValidEmail(form.businessEmail)) {
      errors.businessEmail = "Enter a valid email address.";
    }
    if (form.websiteUrl.trim() && !isValidWebsite(form.websiteUrl)) {
      errors.websiteUrl = "Enter a valid website URL.";
    }
  }

  if (step === 2) {
    const openDays = form.operatingHours.filter((row) => !row.isClosed);
    if (openDays.length === 0) {
      errors.operatingHours = "Mark at least one day as open.";
    } else if (openDays.some((row) => !row.open || !row.close)) {
      errors.operatingHours = "Each open day needs both an open and close time.";
    }

    const hasPartialService = form.services.some(
      (service) => (service.name.trim() && !service.price.trim()) || (!service.name.trim() && service.price.trim()),
    );
    const completeServices = form.services.filter((service) => service.name.trim() && service.price.trim());

    if (hasPartialService) {
      errors.services = "Each service needs both a service name and price.";
    } else if (completeServices.length === 0) {
      errors.services = "Add at least one service with a name and price.";
    }
  }

  if (step === 3) {
    if (!form.greetingText.trim()) {
      errors.greetingText = "Greeting text is required.";
    }

    if (!form.transferNumber.trim()) {
      errors.transferNumber = "Transfer number is required.";
    } else if (!isValidPhone(form.transferNumber)) {
      errors.transferNumber = "Enter a valid US phone number.";
    }
  }

  if (step === 4) {
    const hasPartialFaq = form.faqs.some(
      (faq) => (faq.question.trim() && !faq.answer.trim()) || (!faq.question.trim() && faq.answer.trim()),
    );
    const completeFaqs = form.faqs.filter((faq) => faq.question.trim() && faq.answer.trim());

    if (hasPartialFaq) {
      errors.faqs = "Each FAQ needs both a question and an answer.";
    } else if (completeFaqs.length === 0) {
      errors.faqs = "Add at least one common question and answer.";
    }
  }

  return errors;
}

function getFirstInvalidStep(form: FormState): number | null {
  for (let step = 1; step <= 4; step += 1) {
    const stepErrors = validateStep(form, step);
    if (Object.keys(stepErrors).length > 0) return step;
  }
  return null;
}

function toMeridiemTime(value: string): string {
  if (!value) return "";
  const [hourText, minute] = value.split(":");
  const hour = Number(hourText);
  if (Number.isNaN(hour) || !minute) return value;
  const period = hour >= 12 ? "PM" : "AM";
  const normalizedHour = hour % 12 || 12;
  return `${normalizedHour}:${minute} ${period}`;
}

async function extractErrorMessage(response: Response): Promise<string> {
  const fallback = "We could not submit your onboarding form right now. Please try again.";

  try {
    const text = await response.text();
    if (!text) return fallback;

    try {
      const parsed = JSON.parse(text) as { error?: string; message?: string };
      if (typeof parsed.error === "string" && parsed.error.trim()) return parsed.error;
      if (typeof parsed.message === "string" && parsed.message.trim()) return parsed.message;
    } catch {
      if (text.length < 220) return text;
    }
  } catch {
    return fallback;
  }

  return fallback;
}

const initialState: FormState = {
  businessName: "",
  businessType: "",
  businessPhone: "",
  businessEmail: "",
  websiteUrl: "",
  operatingHours: createDefaultHours(),
  services: [createServiceRow()],
  greetingTemplate: "general",
  greetingText: applyBusinessName(GREETING_TEMPLATES.general, ""),
  transferNumber: "",
  faqs: createFaqRows("general_other"),
};

export default function GetStartedClient() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [greetingEdited, setGreetingEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const progressPercent = useMemo(() => (step / STEP_TITLES.length) * 100, [step]);
  const recommendedTemplate = useMemo<Exclude<TemplateKey, "custom">>(() => {
    if (!form.businessType) return "general";
    return BUSINESS_TYPE_TO_TEMPLATE[form.businessType];
  }, [form.businessType]);

  const completeServices = useMemo(
    () => form.services.filter((service) => service.name.trim() && service.price.trim()),
    [form.services],
  );

  const completeFaqs = useMemo(() => form.faqs.filter((faq) => faq.question.trim() && faq.answer.trim()), [form.faqs]);

  function clearError(key: ErrorKey): void {
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleBusinessNameChange(value: string): void {
    setForm((prev) => {
      const next: FormState = { ...prev, businessName: value };

      if (prev.greetingTemplate !== "custom" && !greetingEdited) {
        next.greetingText = applyBusinessName(GREETING_TEMPLATES[prev.greetingTemplate], value);
      }

      return next;
    });
    clearError("businessName");
  }

  function handleBusinessTypeChange(value: BusinessType): void {
    const templateKey = BUSINESS_TYPE_TO_TEMPLATE[value];

    setForm((prev) => ({
      ...prev,
      businessType: value,
      greetingTemplate: templateKey,
      greetingText: applyBusinessName(GREETING_TEMPLATES[templateKey], prev.businessName),
      faqs: createFaqRows(value),
    }));

    setGreetingEdited(false);
    clearError("businessType");
    clearError("greetingText");
    clearError("faqs");
  }

  function handleGreetingTemplateChange(template: TemplateKey): void {
    setForm((prev) => {
      if (template === "custom") {
        return {
          ...prev,
          greetingTemplate: template,
        };
      }

      return {
        ...prev,
        greetingTemplate: template,
        greetingText: applyBusinessName(GREETING_TEMPLATES[template], prev.businessName),
      };
    });

    setGreetingEdited(false);
    clearError("greetingText");
  }

  function updateHour(index: number, patch: Partial<OperatingHour>): void {
    setForm((prev) => ({
      ...prev,
      operatingHours: prev.operatingHours.map((row, rowIndex) => (rowIndex === index ? { ...row, ...patch } : row)),
    }));
    clearError("operatingHours");
  }

  function updateService(id: string, field: "name" | "price", value: string): void {
    setForm((prev) => ({
      ...prev,
      services: prev.services.map((service) => (service.id === id ? { ...service, [field]: value } : service)),
    }));
    clearError("services");
  }

  function addService(): void {
    setForm((prev) => ({ ...prev, services: [...prev.services, createServiceRow()] }));
  }

  function removeService(id: string): void {
    setForm((prev) => {
      const remaining = prev.services.filter((service) => service.id !== id);
      return {
        ...prev,
        services: remaining.length > 0 ? remaining : [createServiceRow()],
      };
    });
    clearError("services");
  }

  function updateFaq(id: string, field: "question" | "answer", value: string): void {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq)),
    }));
    clearError("faqs");
  }

  function addFaq(): void {
    setForm((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { id: makeId(), question: "", answer: "" }],
    }));
  }

  function removeFaq(id: string): void {
    setForm((prev) => {
      const remaining = prev.faqs.filter((faq) => faq.id !== id);
      return {
        ...prev,
        faqs: remaining.length > 0 ? remaining : [{ id: makeId(), question: "", answer: "" }],
      };
    });
    clearError("faqs");
  }

  function loadSuggestedFaqs(): void {
    if (!form.businessType) return;
    setForm((prev) => ({ ...prev, faqs: createFaqRows(form.businessType as BusinessType) }));
    clearError("faqs");
  }

  function goBack(): void {
    setSubmitError(null);
    setStep((prev) => Math.max(1, prev - 1));
  }

  function goNext(): void {
    const stepErrors = validateStep(form, step);
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length > 0) return;

    setSubmitError(null);
    setStep((prev) => Math.min(STEP_TITLES.length, prev + 1));
  }

  async function submit(): Promise<void> {
    const firstInvalidStep = getFirstInvalidStep(form);

    if (firstInvalidStep !== null) {
      setStep(firstInvalidStep);
      setErrors(validateStep(form, firstInvalidStep));
      return;
    }

    const payload = {
      business_name: form.businessName.trim(),
      business_type: form.businessType,
      business_phone: normalizePhone(form.businessPhone),
      business_email: form.businessEmail.trim(),
      website_url: normalizeWebsite(form.websiteUrl),
      operating_hours: form.operatingHours.map((row) => ({
        day: row.day,
        closed: row.isClosed,
        open: row.isClosed ? null : row.open,
        close: row.isClosed ? null : row.close,
      })),
      services: completeServices.map((service) => ({
        name: service.name.trim(),
        price: service.price.trim(),
      })),
      greeting_template: form.greetingTemplate,
      greeting_text: form.greetingText.trim(),
      transfer_number: normalizePhone(form.transferNumber),
      faqs: completeFaqs.map((faq) => ({
        question: faq.question.trim(),
        answer: faq.answer.trim(),
      })),
      source: "autom8everything.com/get-started",
    };

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const response = await fetch(ONBOARD_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const message = await extractErrorMessage(response);
        throw new Error(message);
      }

      router.push("/get-started/success");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong while submitting your onboarding form.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />

      <section className="mesh-bg pb-20 pt-32">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-3 text-sm uppercase tracking-wide text-[#8B5CF6]">Cadence Onboarding</p>
          <h1 className="mb-4 text-4xl font-semibold md:text-5xl">Get Started with Your AI Receptionist</h1>
          <p className="mb-8 max-w-3xl text-lg text-[#A1A1AA]">
            Complete this onboarding wizard and we will configure Cadence for your business.
          </p>

          <div className="rounded-2xl border border-white/10 bg-[#12121A]/90 p-6 md:p-8">
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between gap-3 text-xs uppercase tracking-wide text-[#A1A1AA]">
                <span>Step {step} of 5</span>
                <span>{STEP_TITLES[step - 1]}</span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <ol className="mt-4 grid grid-cols-5 gap-2 text-[11px] text-[#A1A1AA] md:text-xs">
                {STEP_TITLES.map((title, index) => {
                  const stepNumber = index + 1;
                  const isActive = stepNumber === step;
                  const isDone = stepNumber < step;

                  return (
                    <li key={title} className="flex min-w-0 flex-col gap-1 text-center">
                      <span
                        className={`mx-auto inline-flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold ${
                          isActive
                            ? "border-[#8B5CF6] bg-[#8B5CF6] text-white"
                            : isDone
                              ? "border-[#8B5CF6]/60 bg-[#8B5CF6]/20 text-[#DDD6FE]"
                              : "border-white/20 text-[#A1A1AA]"
                        }`}
                      >
                        {stepNumber}
                      </span>
                      <span className={`truncate ${isActive ? "text-white" : ""}`}>{title}</span>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="space-y-6">
              {step === 1 && (
                <>
                  <div>
                    <label className="mb-2 block text-sm text-[#E4E4E7]">Business name</label>
                    <input
                      value={form.businessName}
                      onChange={(event) => handleBusinessNameChange(event.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-4 py-3"
                      placeholder="Acme Plumbing"
                    />
                    {errors.businessName && <p className="mt-2 text-sm text-red-300">{errors.businessName}</p>}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-[#E4E4E7]">Business type</label>
                    <select
                      value={form.businessType}
                      onChange={(event) => handleBusinessTypeChange(event.target.value as BusinessType)}
                      className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-4 py-3"
                    >
                      <option value="">Select a business type</option>
                      {BUSINESS_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.businessType && <p className="mt-2 text-sm text-red-300">{errors.businessType}</p>}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-[#E4E4E7]">Business phone number</label>
                    <input
                      value={form.businessPhone}
                      onChange={(event) => {
                        setForm((prev) => ({ ...prev, businessPhone: event.target.value }));
                        clearError("businessPhone");
                      }}
                      className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-4 py-3"
                      placeholder="(480) 555-1234"
                    />
                    {errors.businessPhone && <p className="mt-2 text-sm text-red-300">{errors.businessPhone}</p>}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-[#E4E4E7]">Business email</label>
                    <input
                      value={form.businessEmail}
                      onChange={(event) => {
                        setForm((prev) => ({ ...prev, businessEmail: event.target.value }));
                        clearError("businessEmail");
                      }}
                      className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-4 py-3"
                      placeholder="hello@acme.com"
                    />
                    {errors.businessEmail && <p className="mt-2 text-sm text-red-300">{errors.businessEmail}</p>}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-[#E4E4E7]">Website URL (optional)</label>
                    <input
                      value={form.websiteUrl}
                      onChange={(event) => {
                        setForm((prev) => ({ ...prev, websiteUrl: event.target.value }));
                        clearError("websiteUrl");
                      }}
                      className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-4 py-3"
                      placeholder="https://yourbusiness.com"
                    />
                    {errors.websiteUrl && <p className="mt-2 text-sm text-red-300">{errors.websiteUrl}</p>}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <h2 className="mb-3 text-lg font-semibold">Operating hours</h2>
                    <div className="space-y-3">
                      {form.operatingHours.map((row, index) => (
                        <div key={row.day} className="rounded-xl border border-white/10 bg-[#0A0A0F] p-4">
                          <div className="flex items-center justify-between gap-4">
                            <p className="font-medium">{row.day}</p>
                            <label className="inline-flex items-center gap-2 text-sm text-[#D4D4D8]">
                              <input
                                type="checkbox"
                                checked={row.isClosed}
                                onChange={(event) =>
                                  updateHour(index, {
                                    isClosed: event.target.checked,
                                  })
                                }
                                className="h-4 w-4 accent-[#8B5CF6]"
                              />
                              Closed
                            </label>
                          </div>

                          {!row.isClosed && (
                            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                              <div>
                                <label className="mb-2 block text-xs uppercase tracking-wide text-[#A1A1AA]">Open</label>
                                <input
                                  type="time"
                                  value={row.open}
                                  onChange={(event) => updateHour(index, { open: event.target.value })}
                                  className="w-full rounded-lg border border-white/10 bg-[#12121A] px-3 py-2"
                                />
                              </div>
                              <div>
                                <label className="mb-2 block text-xs uppercase tracking-wide text-[#A1A1AA]">Close</label>
                                <input
                                  type="time"
                                  value={row.close}
                                  onChange={(event) => updateHour(index, { close: event.target.value })}
                                  className="w-full rounded-lg border border-white/10 bg-[#12121A] px-3 py-2"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {errors.operatingHours && <p className="mt-2 text-sm text-red-300">{errors.operatingHours}</p>}
                  </div>

                  <div>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h2 className="text-lg font-semibold">Services offered</h2>
                      <button
                        type="button"
                        onClick={addService}
                        className="rounded-lg border border-white/20 px-3 py-1.5 text-sm hover:border-[#8B5CF6]/60"
                      >
                        Add service
                      </button>
                    </div>

                    <div className="space-y-3">
                      {form.services.map((service, index) => (
                        <div key={service.id} className="rounded-xl border border-white/10 bg-[#0A0A0F] p-4">
                          <div className="mb-3 flex items-center justify-between">
                            <p className="text-xs uppercase tracking-wide text-[#A1A1AA]">Service {index + 1}</p>
                            <button
                              type="button"
                              onClick={() => removeService(service.id)}
                              className="text-sm text-[#A1A1AA] hover:text-white"
                            >
                              Remove
                            </button>
                          </div>

                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_180px]">
                            <input
                              value={service.name}
                              onChange={(event) => updateService(service.id, "name", event.target.value)}
                              className="w-full rounded-lg border border-white/10 bg-[#12121A] px-3 py-2"
                              placeholder="Service name"
                            />
                            <input
                              value={service.price}
                              onChange={(event) => updateService(service.id, "price", event.target.value)}
                              className="w-full rounded-lg border border-white/10 bg-[#12121A] px-3 py-2"
                              placeholder="$99"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    {errors.services && <p className="mt-2 text-sm text-red-300">{errors.services}</p>}
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div>
                    <h2 className="mb-3 text-lg font-semibold">Greeting template</h2>
                    <p className="mb-4 text-sm text-[#A1A1AA]">
                      Pick a template, then edit the text if you want to customize your greeting.
                    </p>

                    <div className="space-y-2">
                      {TEMPLATE_OPTIONS.map((option) => {
                        const templatePreview =
                          option === "custom"
                            ? "Write your own greeting text."
                            : applyBusinessName(GREETING_TEMPLATES[option], form.businessName);

                        const isRecommended = option !== "custom" && option === recommendedTemplate;

                        return (
                          <label
                            key={option}
                            className={`block cursor-pointer rounded-xl border p-3 transition-colors ${
                              form.greetingTemplate === option
                                ? "border-[#8B5CF6]/70 bg-[#8B5CF6]/10"
                                : "border-white/10 bg-[#0A0A0F] hover:border-white/20"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <input
                                type="radio"
                                checked={form.greetingTemplate === option}
                                onChange={() => handleGreetingTemplateChange(option)}
                                className="mt-1 h-4 w-4 accent-[#8B5CF6]"
                              />

                              <div>
                                <p className="text-sm font-medium text-[#E4E4E7]">
                                  {TEMPLATE_LABELS[option]}
                                  {isRecommended && (
                                    <span className="ml-2 rounded-full border border-[#8B5CF6]/60 px-2 py-0.5 text-[10px] uppercase tracking-wide text-[#C4B5FD]">
                                      Recommended
                                    </span>
                                  )}
                                </p>
                                <p className="mt-1 text-sm text-[#A1A1AA]">{templatePreview}</p>
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-[#E4E4E7]">Greeting text</label>
                    <textarea
                      rows={4}
                      value={form.greetingText}
                      onChange={(event) => {
                        setForm((prev) => ({ ...prev, greetingText: event.target.value }));
                        setGreetingEdited(true);
                        clearError("greetingText");
                      }}
                      className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-4 py-3"
                      placeholder="Enter the greeting callers will hear"
                    />
                    {errors.greetingText && <p className="mt-2 text-sm text-red-300">{errors.greetingText}</p>}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-[#E4E4E7]">Transfer number</label>
                    <input
                      value={form.transferNumber}
                      onChange={(event) => {
                        setForm((prev) => ({ ...prev, transferNumber: event.target.value }));
                        clearError("transferNumber");
                      }}
                      className="w-full rounded-lg border border-white/10 bg-[#0A0A0F] px-4 py-3"
                      placeholder="(480) 555-5678"
                    />
                    <p className="mt-2 text-xs text-[#A1A1AA]">This is the number that receives important transferred calls.</p>
                    {errors.transferNumber && <p className="mt-2 text-sm text-red-300">{errors.transferNumber}</p>}
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold">Common questions</h2>
                      <p className="mt-1 text-sm text-[#A1A1AA]">What questions do your callers usually ask?</p>
                    </div>

                    <button
                      type="button"
                      onClick={loadSuggestedFaqs}
                      disabled={!form.businessType}
                      className="rounded-lg border border-white/20 px-3 py-1.5 text-sm hover:border-[#8B5CF6]/60 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Reload examples
                    </button>
                  </div>

                  <div className="space-y-3">
                    {form.faqs.map((faq, index) => (
                      <div key={faq.id} className="rounded-xl border border-white/10 bg-[#0A0A0F] p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-xs uppercase tracking-wide text-[#A1A1AA]">FAQ {index + 1}</p>
                          <button
                            type="button"
                            onClick={() => removeFaq(faq.id)}
                            className="text-sm text-[#A1A1AA] hover:text-white"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="space-y-3">
                          <input
                            value={faq.question}
                            onChange={(event) => updateFaq(faq.id, "question", event.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-[#12121A] px-3 py-2"
                            placeholder="Question"
                          />
                          <textarea
                            rows={3}
                            value={faq.answer}
                            onChange={(event) => updateFaq(faq.id, "answer", event.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-[#12121A] px-3 py-2"
                            placeholder="Answer"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addFaq}
                    className="rounded-lg border border-white/20 px-3 py-2 text-sm hover:border-[#8B5CF6]/60"
                  >
                    Add question
                  </button>

                  {errors.faqs && <p className="text-sm text-red-300">{errors.faqs}</p>}
                </>
              )}

              {step === 5 && (
                <div className="space-y-5">
                  <div className="rounded-xl border border-white/10 bg-[#0A0A0F] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h2 className="font-semibold">Business Basics</h2>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-sm text-[#C4B5FD] hover:text-[#DDD6FE]"
                      >
                        Edit
                      </button>
                    </div>
                    <ul className="space-y-1 text-sm text-[#D4D4D8]">
                      <li>
                        <span className="text-[#A1A1AA]">Business name:</span> {form.businessName}
                      </li>
                      <li>
                        <span className="text-[#A1A1AA]">Business type:</span>{" "}
                        {BUSINESS_TYPES.find((type) => type.value === form.businessType)?.label ?? "Not selected"}
                      </li>
                      <li>
                        <span className="text-[#A1A1AA]">Business phone:</span> {form.businessPhone}
                      </li>
                      <li>
                        <span className="text-[#A1A1AA]">Business email:</span> {form.businessEmail}
                      </li>
                      <li>
                        <span className="text-[#A1A1AA]">Website:</span> {form.websiteUrl.trim() ? normalizeWebsite(form.websiteUrl) : "Not provided"}
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-[#0A0A0F] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h2 className="font-semibold">Hours & Services</h2>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-sm text-[#C4B5FD] hover:text-[#DDD6FE]"
                      >
                        Edit
                      </button>
                    </div>

                    <div className="space-y-2 text-sm text-[#D4D4D8]">
                      {form.operatingHours.map((row) => (
                        <p key={row.day}>
                          <span className="text-[#A1A1AA]">{row.day}:</span>{" "}
                          {row.isClosed ? "Closed" : `${toMeridiemTime(row.open)} - ${toMeridiemTime(row.close)}`}
                        </p>
                      ))}
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-[#D4D4D8]">
                      {completeServices.map((service) => (
                        <p key={service.id}>
                          <span className="text-[#A1A1AA]">Service:</span> {service.name} — {service.price}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-[#0A0A0F] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h2 className="font-semibold">Call Handling</h2>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="text-sm text-[#C4B5FD] hover:text-[#DDD6FE]"
                      >
                        Edit
                      </button>
                    </div>

                    <ul className="space-y-2 text-sm text-[#D4D4D8]">
                      <li>
                        <span className="text-[#A1A1AA]">Template:</span> {TEMPLATE_LABELS[form.greetingTemplate]}
                      </li>
                      <li>
                        <span className="text-[#A1A1AA]">Greeting:</span> {form.greetingText}
                      </li>
                      <li>
                        <span className="text-[#A1A1AA]">Transfer number:</span> {form.transferNumber}
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-[#0A0A0F] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h2 className="font-semibold">Common Questions</h2>
                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="text-sm text-[#C4B5FD] hover:text-[#DDD6FE]"
                      >
                        Edit
                      </button>
                    </div>

                    <div className="space-y-3 text-sm text-[#D4D4D8]">
                      {completeFaqs.map((faq) => (
                        <div key={faq.id}>
                          <p>
                            <span className="text-[#A1A1AA]">Q:</span> {faq.question}
                          </p>
                          <p>
                            <span className="text-[#A1A1AA]">A:</span> {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {submitError && <p className="mt-6 text-sm text-red-300">{submitError}</p>}

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1 || isSubmitting}
                className="rounded-lg border border-white/20 px-5 py-3 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>

              {step < 5 ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={isSubmitting}
                  className="rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={isSubmitting}
                  className="rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isSubmitting ? "Submitting..." : "Submit onboarding"}
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
