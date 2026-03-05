"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

const STEPS = [
  { id: 1, title: "Business Basics" },
  { id: 2, title: "Hours & Services" },
  { id: 3, title: "Call Handling" },
  { id: 4, title: "Common Questions" },
  { id: 5, title: "Review & Submit" },
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

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

const GREETING_TEMPLATES = {
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
} as const;

const TEMPLATE_ORDER: Array<{ key: GreetingTemplateKey; label: string }> = [
  { key: "general", label: "General" },
  { key: "medical_dental", label: "Medical/Dental" },
  { key: "restaurant", label: "Restaurant" },
  { key: "auto_service", label: "Auto/Service" },
  { key: "legal", label: "Legal" },
  { key: "salon_spa", label: "Salon/Spa" },
  { key: "real_estate", label: "Real Estate" },
];

const BUSINESS_TYPE_TO_TEMPLATE: Record<BusinessType, GreetingTemplateKey> = {
  restaurant: "restaurant",
  medical_dental: "medical_dental",
  legal: "legal",
  auto_service: "auto_service",
  real_estate: "real_estate",
  salon_spa: "salon_spa",
  general_other: "general",
};

const FAQ_EXAMPLES: Record<BusinessType, FAQItem[]> = {
  restaurant: [
    {
      question: "What are your hours today?",
      answer: "We are open Monday through Saturday from 11:00 AM to 9:00 PM.",
    },
    {
      question: "Do you take reservations?",
      answer: "Yes. We accept reservations by phone for parties of all sizes.",
    },
  ],
  medical_dental: [
    {
      question: "Do you accept my insurance?",
      answer: "Please share your provider and plan details and we can confirm coverage for you.",
    },
    {
      question: "How do I schedule an appointment?",
      answer: "We can help schedule your next available appointment now.",
    },
  ],
  legal: [
    {
      question: "Do you offer consultations?",
      answer: "Yes. We offer consultations and can help you book the next available time.",
    },
    {
      question: "What practice areas do you handle?",
      answer: "We assist clients with matters related to our listed practice areas.",
    },
  ],
  auto_service: [
    {
      question: "Can I get same-day service?",
      answer: "Same-day service is often available depending on technician scheduling.",
    },
    {
      question: "Do you provide free estimates?",
      answer: "Yes. We can provide an estimate after a quick description of the issue.",
    },
  ],
  real_estate: [
    {
      question: "Can I book a showing?",
      answer: "Yes. We can schedule showings based on your preferred date and time.",
    },
    {
      question: "How quickly can my home be listed?",
      answer: "Most listings can be prepared and published within a few business days.",
    },
  ],
  salon_spa: [
    {
      question: "What services do you offer?",
      answer: "We offer a full range of salon and spa services. We can share details for each service.",
    },
    {
      question: "Can I book multiple services at once?",
      answer: "Yes. We can book multiple services in one appointment when availability allows.",
    },
  ],
  general_other: [
    {
      question: "What are your business hours?",
      answer: "Our team is available during regular business hours listed on our profile.",
    },
    {
      question: "How quickly can someone follow up with me?",
      answer: "Most follow-up requests are handled within one business day.",
    },
  ],
};

type Step = (typeof STEPS)[number]["id"];
type BusinessType = (typeof BUSINESS_TYPES)[number]["value"];
type DayOfWeek = (typeof DAYS_OF_WEEK)[number];
type GreetingTemplateKey = keyof typeof GREETING_TEMPLATES;
type GreetingChoice = GreetingTemplateKey | "custom";

type HoursRow = {
  day: DayOfWeek;
  open: string;
  close: string;
  closed: boolean;
};

type ServiceItem = {
  name: string;
  price: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

type FormState = {
  businessName: string;
  businessType: BusinessType;
  businessPhone: string;
  businessEmail: string;
  websiteUrl: string;
  hours: HoursRow[];
  services: ServiceItem[];
  greetingTemplate: GreetingChoice;
  greetingText: string;
  transferNumber: string;
  faqs: FAQItem[];
};

type FormErrors = Partial<
  Record<
    | "businessName"
    | "businessType"
    | "businessPhone"
    | "businessEmail"
    | "websiteUrl"
    | "hours"
    | "services"
    | "greetingText"
    | "transferNumber"
    | "faqs",
    string
  >
>;

function cloneFaqItems(items: FAQItem[]): FAQItem[] {
  return items.map((item) => ({ ...item }));
}

function createInitialHours(): HoursRow[] {
  return DAYS_OF_WEEK.map((day) => ({
    day,
    open: "09:00",
    close: "17:00",
    closed: day === "Sunday",
  }));
}

function fillBusinessName(template: string, businessName: string): string {
  const fallbackName = businessName.trim() || "[Business Name]";
  return template.replaceAll("[Business Name]", fallbackName);
}

function getBusinessTypeLabel(type: BusinessType): string {
  return BUSINESS_TYPES.find((entry) => entry.value === type)?.label ?? "General/Other";
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

function isValidHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function validateStep(step: Step, form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (step === 1) {
    if (!form.businessName.trim()) errors.businessName = "Business name is required.";
    if (!form.businessType) errors.businessType = "Business type is required.";

    if (!form.businessPhone.trim()) {
      errors.businessPhone = "Business phone number is required.";
    } else if (!isValidPhone(form.businessPhone)) {
      errors.businessPhone = "Please enter a valid US phone number.";
    }

    if (!form.businessEmail.trim()) {
      errors.businessEmail = "Business email is required.";
    } else if (!isValidEmail(form.businessEmail)) {
      errors.businessEmail = "Please enter a valid email address.";
    }

    if (form.websiteUrl.trim() && !isValidHttpUrl(form.websiteUrl.trim())) {
      errors.websiteUrl = "Website URL must start with http:// or https://.";
    }
  }

  if (step === 2) {
    const invalidHours = form.hours.some(
      (item) => !item.closed && (!item.open || !item.close || item.open >= item.close),
    );

    if (invalidHours) {
      errors.hours = "Set valid open and close times for each open day.";
    }

    const cleanedServices = form.services.map((service) => ({
      name: service.name.trim(),
      price: service.price.trim(),
    }));

    const completeServices = cleanedServices.filter((service) => service.name && service.price);
    const hasPartialService = cleanedServices.some(
      (service) => (service.name && !service.price) || (!service.name && service.price),
    );

    if (completeServices.length === 0 || hasPartialService) {
      errors.services = "Add at least one service with both a name and price.";
    }
  }

  if (step === 3) {
    if (!form.greetingText.trim()) {
      errors.greetingText = "Greeting text is required.";
    }

    if (!form.transferNumber.trim()) {
      errors.transferNumber = "Transfer number is required.";
    } else if (!isValidPhone(form.transferNumber)) {
      errors.transferNumber = "Please enter a valid US phone number.";
    }
  }

  if (step === 4) {
    const cleanedFaqs = form.faqs.map((item) => ({
      question: item.question.trim(),
      answer: item.answer.trim(),
    }));

    const completeFaqs = cleanedFaqs.filter((item) => item.question && item.answer);
    const hasPartialFaq = cleanedFaqs.some(
      (item) => (item.question && !item.answer) || (!item.question && item.answer),
    );

    if (completeFaqs.length === 0 || hasPartialFaq) {
      errors.faqs = "Add at least one complete question and answer pair.";
    }
  }

  return errors;
}

function StepError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-sm text-red-300">{message}</p>;
}

export default function GetStartedClient() {
  const router = useRouter();

  const defaultType: BusinessType = "general_other";
  const defaultTemplate = BUSINESS_TYPE_TO_TEMPLATE[defaultType];

  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>({
    businessName: "",
    businessType: defaultType,
    businessPhone: "",
    businessEmail: "",
    websiteUrl: "",
    hours: createInitialHours(),
    services: [{ name: "", price: "" }],
    greetingTemplate: defaultTemplate,
    greetingText: fillBusinessName(GREETING_TEMPLATES[defaultTemplate], ""),
    transferNumber: "",
    faqs: cloneFaqItems(FAQ_EXAMPLES[defaultType]),
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [greetingManuallyEdited, setGreetingManuallyEdited] = useState(false);
  const [faqManuallyEdited, setFaqManuallyEdited] = useState(false);

  const currentStepErrors = useMemo(() => validateStep(step, form), [step, form]);
  const canContinue = useMemo(() => Object.keys(currentStepErrors).length === 0, [currentStepErrors]);

  const updateBusinessName = (value: string) => {
    setForm((prev) => {
      const next = { ...prev, businessName: value };

      if (!greetingManuallyEdited && prev.greetingTemplate !== "custom") {
        const template = GREETING_TEMPLATES[prev.greetingTemplate];
        next.greetingText = fillBusinessName(template, value);
      }

      return next;
    });
  };

  const updateBusinessType = (value: BusinessType) => {
    setForm((prev) => {
      const next = { ...prev, businessType: value };

      if (!greetingManuallyEdited) {
        const recommendedTemplate = BUSINESS_TYPE_TO_TEMPLATE[value];
        next.greetingTemplate = recommendedTemplate;
        next.greetingText = fillBusinessName(GREETING_TEMPLATES[recommendedTemplate], prev.businessName);
      }

      if (!faqManuallyEdited) {
        next.faqs = cloneFaqItems(FAQ_EXAMPLES[value]);
      }

      return next;
    });
  };

  const updateHours = (index: number, field: keyof Omit<HoursRow, "day">, value: string | boolean) => {
    setForm((prev) => {
      const nextHours = [...prev.hours];
      const current = nextHours[index];

      if (!current) return prev;

      nextHours[index] = {
        ...current,
        [field]: value,
      } as HoursRow;

      return { ...prev, hours: nextHours };
    });
  };

  const updateService = (index: number, field: keyof ServiceItem, value: string) => {
    setForm((prev) => {
      const nextServices = [...prev.services];
      const current = nextServices[index];
      if (!current) return prev;

      nextServices[index] = {
        ...current,
        [field]: value,
      };

      return { ...prev, services: nextServices };
    });
  };

  const addService = () => {
    setForm((prev) => ({
      ...prev,
      services: [...prev.services, { name: "", price: "" }],
    }));
  };

  const removeService = (index: number) => {
    setForm((prev) => {
      if (prev.services.length === 1) {
        return {
          ...prev,
          services: [{ name: "", price: "" }],
        };
      }

      return {
        ...prev,
        services: prev.services.filter((_, serviceIndex) => serviceIndex !== index),
      };
    });
  };

  const selectGreetingTemplate = (choice: GreetingChoice) => {
    setForm((prev) => {
      if (choice === "custom") {
        return {
          ...prev,
          greetingTemplate: "custom",
          greetingText: prev.greetingTemplate === "custom" ? prev.greetingText : "",
        };
      }

      return {
        ...prev,
        greetingTemplate: choice,
        greetingText: fillBusinessName(GREETING_TEMPLATES[choice], prev.businessName),
      };
    });

    setGreetingManuallyEdited(choice === "custom");
  };

  const updateFaq = (index: number, field: keyof FAQItem, value: string) => {
    setFaqManuallyEdited(true);

    setForm((prev) => {
      const nextFaqs = [...prev.faqs];
      const current = nextFaqs[index];
      if (!current) return prev;

      nextFaqs[index] = {
        ...current,
        [field]: value,
      };

      return {
        ...prev,
        faqs: nextFaqs,
      };
    });
  };

  const addFaq = () => {
    setFaqManuallyEdited(true);

    setForm((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  const removeFaq = (index: number) => {
    setFaqManuallyEdited(true);

    setForm((prev) => {
      if (prev.faqs.length === 1) {
        return {
          ...prev,
          faqs: [{ question: "", answer: "" }],
        };
      }

      return {
        ...prev,
        faqs: prev.faqs.filter((_, faqIndex) => faqIndex !== index),
      };
    });
  };

  const goToStep = (targetStep: Step) => {
    setStep(targetStep);
    setErrors({});
    setSubmitError(null);
  };

  const goNext = () => {
    const nextErrors = validateStep(step, form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setStep((prev) => (prev < 5 ? ((prev + 1) as Step) : prev));
  };

  const goBack = () => {
    setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev));
    setErrors({});
    setSubmitError(null);
  };

  const submit = async () => {
    const validationByStep: Record<Exclude<Step, 5>, FormErrors> = {
      1: validateStep(1, form),
      2: validateStep(2, form),
      3: validateStep(3, form),
      4: validateStep(4, form),
    };

    const firstInvalidStep = (Object.entries(validationByStep).find(
      ([, value]) => Object.keys(value).length > 0,
    )?.[0] ?? null) as keyof typeof validationByStep | null;

    if (firstInvalidStep) {
      setErrors(validationByStep[firstInvalidStep]);
      setStep(Number(firstInvalidStep) as Step);
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);

      const services = form.services
        .map((service) => ({
          name: service.name.trim(),
          price: service.price.trim(),
        }))
        .filter((service) => service.name && service.price);

      const faqs = form.faqs
        .map((faq) => ({
          question: faq.question.trim(),
          answer: faq.answer.trim(),
        }))
        .filter((faq) => faq.question && faq.answer);

      const payload = {
        business_name: form.businessName.trim(),
        business_type: getBusinessTypeLabel(form.businessType),
        business_phone: normalizePhone(form.businessPhone),
        business_email: form.businessEmail.trim(),
        website_url: form.websiteUrl.trim() || null,
        operating_hours: form.hours.map((hour) => ({
          day: hour.day,
          closed: hour.closed,
          open: hour.closed ? null : hour.open,
          close: hour.closed ? null : hour.close,
        })),
        services,
        greeting_template: form.greetingTemplate,
        greeting_text: form.greetingText.trim(),
        transfer_number: normalizePhone(form.transferNumber),
        faqs,
      };

      const response = await fetch("https://cadence-v2-production.up.railway.app/api/onboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(responseText || "Unable to submit your onboarding details right now.");
      }

      router.push("/get-started/success");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to submit your onboarding details right now.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const recommendedTemplate = BUSINESS_TYPE_TO_TEMPLATE[form.businessType];

  const fieldClasses =
    "w-full rounded-lg border border-white/12 bg-[#0A0A0F] px-3 py-2.5 text-sm text-white placeholder:text-[#6B7280] focus:border-[#8B5CF6] focus:outline-none";

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />

      <section className="mesh-bg pb-20 pt-32">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <p className="mb-3 text-sm uppercase tracking-wide text-[#8B5CF6]">Cadence Setup</p>
          <h1 className="mb-4 text-3xl font-semibold sm:text-4xl">Get started with your AI call assistant</h1>
          <p className="mb-8 max-w-2xl text-sm text-[#A1A1AA] sm:text-base">
            Complete this onboarding wizard and we will configure your Cadence workflow based on your business
            details.
          </p>

          <div className="mb-6 rounded-2xl border border-white/10 bg-[#12121A]/90 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-[#E4E4E7]">Step {step} of {STEPS.length}</p>
              <p className="text-sm text-[#A1A1AA]">{STEPS[step - 1]?.title}</p>
            </div>

            <div className="flex items-center gap-2">
              {STEPS.map((item) => (
                <div key={item.id} className="flex min-w-0 flex-1 items-center gap-2">
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                      step >= item.id
                        ? "border-[#8B5CF6] bg-[#8B5CF6]/20 text-[#D8B4FE]"
                        : "border-white/15 bg-[#0A0A0F] text-[#71717A]"
                    }`}
                  >
                    {item.id}
                  </div>
                  {item.id < STEPS.length ? (
                    <div className={`h-[3px] flex-1 rounded-full ${step > item.id ? "bg-[#8B5CF6]" : "bg-white/10"}`} />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 rounded-2xl border border-white/10 bg-[#12121A]/90 p-4 sm:p-6 md:p-8">
            {step === 1 ? (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold">Business Basics</h2>

                <div>
                  <label htmlFor="businessName" className="mb-2 block text-sm text-[#E4E4E7]">
                    Business name
                  </label>
                  <input
                    id="businessName"
                    className={fieldClasses}
                    value={form.businessName}
                    onChange={(event) => updateBusinessName(event.target.value)}
                    placeholder="Acme Services"
                  />
                  <StepError message={errors.businessName} />
                </div>

                <div>
                  <label htmlFor="businessType" className="mb-2 block text-sm text-[#E4E4E7]">
                    Business type
                  </label>
                  <select
                    id="businessType"
                    className={fieldClasses}
                    value={form.businessType}
                    onChange={(event) => updateBusinessType(event.target.value as BusinessType)}
                  >
                    {BUSINESS_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <StepError message={errors.businessType} />
                </div>

                <div>
                  <label htmlFor="businessPhone" className="mb-2 block text-sm text-[#E4E4E7]">
                    Business phone number
                  </label>
                  <input
                    id="businessPhone"
                    className={fieldClasses}
                    value={form.businessPhone}
                    onChange={(event) => setForm((prev) => ({ ...prev, businessPhone: event.target.value }))}
                    placeholder="(480) 555-1234"
                  />
                  <StepError message={errors.businessPhone} />
                </div>

                <div>
                  <label htmlFor="businessEmail" className="mb-2 block text-sm text-[#E4E4E7]">
                    Business email
                  </label>
                  <input
                    id="businessEmail"
                    className={fieldClasses}
                    value={form.businessEmail}
                    onChange={(event) => setForm((prev) => ({ ...prev, businessEmail: event.target.value }))}
                    placeholder="hello@acmeservices.com"
                  />
                  <StepError message={errors.businessEmail} />
                </div>

                <div>
                  <label htmlFor="websiteUrl" className="mb-2 block text-sm text-[#E4E4E7]">
                    Website URL (optional)
                  </label>
                  <input
                    id="websiteUrl"
                    className={fieldClasses}
                    value={form.websiteUrl}
                    onChange={(event) => setForm((prev) => ({ ...prev, websiteUrl: event.target.value }))}
                    placeholder="https://example.com"
                  />
                  <StepError message={errors.websiteUrl} />
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Hours & Services</h2>

                <div>
                  <p className="mb-3 text-sm text-[#E4E4E7]">Operating hours</p>
                  <div className="space-y-2">
                    {form.hours.map((row, index) => (
                      <div
                        key={row.day}
                        className="rounded-lg border border-white/10 bg-[#0A0A0F]/80 p-3 sm:grid sm:grid-cols-[130px,1fr,1fr] sm:items-center sm:gap-3"
                      >
                        <div className="mb-2 flex items-center justify-between sm:mb-0">
                          <p className="text-sm text-[#E4E4E7]">{row.day}</p>
                          <label className="flex items-center gap-2 text-xs text-[#A1A1AA] sm:hidden">
                            <input
                              type="checkbox"
                              checked={row.closed}
                              onChange={(event) => updateHours(index, "closed", event.target.checked)}
                            />
                            Closed
                          </label>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="time"
                            className={`${fieldClasses} ${row.closed ? "opacity-40" : ""}`}
                            value={row.open}
                            disabled={row.closed}
                            onChange={(event) => updateHours(index, "open", event.target.value)}
                          />
                          <input
                            type="time"
                            className={`${fieldClasses} ${row.closed ? "opacity-40" : ""}`}
                            value={row.close}
                            disabled={row.closed}
                            onChange={(event) => updateHours(index, "close", event.target.value)}
                          />
                        </div>

                        <label className="hidden items-center justify-end gap-2 text-xs text-[#A1A1AA] sm:flex">
                          <input
                            type="checkbox"
                            checked={row.closed}
                            onChange={(event) => updateHours(index, "closed", event.target.checked)}
                          />
                          Closed
                        </label>
                      </div>
                    ))}
                  </div>
                  <StepError message={errors.hours} />
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm text-[#E4E4E7]">Services offered</p>
                    <button
                      type="button"
                      className="rounded-md border border-white/20 px-3 py-1.5 text-xs text-[#D4D4D8] hover:border-[#8B5CF6]/70"
                      onClick={addService}
                    >
                      Add service
                    </button>
                  </div>

                  <div className="space-y-2">
                    {form.services.map((service, index) => (
                      <div key={`${index}-${service.name}`} className="rounded-lg border border-white/10 bg-[#0A0A0F]/80 p-3">
                        <div className="grid gap-2 sm:grid-cols-[1fr,180px,auto]">
                          <input
                            className={fieldClasses}
                            value={service.name}
                            onChange={(event) => updateService(index, "name", event.target.value)}
                            placeholder="Service name"
                          />
                          <input
                            className={fieldClasses}
                            value={service.price}
                            onChange={(event) => updateService(index, "price", event.target.value)}
                            placeholder="Price"
                          />
                          <button
                            type="button"
                            className="rounded-md border border-white/20 px-3 py-2 text-xs text-[#D4D4D8] hover:border-red-300/70 hover:text-red-200"
                            onClick={() => removeService(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <StepError message={errors.services} />
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Call Handling</h2>

                <div>
                  <p className="mb-3 text-sm text-[#E4E4E7]">Greeting template</p>
                  <p className="mb-3 text-xs text-[#A1A1AA]">
                    Recommended template for {getBusinessTypeLabel(form.businessType)} selected automatically.
                  </p>

                  <div className="space-y-2">
                    {TEMPLATE_ORDER.map((template) => (
                      <label
                        key={template.key}
                        className={`block cursor-pointer rounded-lg border p-3 transition-colors ${
                          form.greetingTemplate === template.key
                            ? "border-[#8B5CF6]/80 bg-[#8B5CF6]/10"
                            : "border-white/10 bg-[#0A0A0F]/80 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="greetingTemplate"
                            checked={form.greetingTemplate === template.key}
                            onChange={() => selectGreetingTemplate(template.key)}
                            className="mt-1"
                          />
                          <div>
                            <p className="text-sm font-medium text-[#E4E4E7]">
                              {template.label}
                              {template.key === recommendedTemplate ? (
                                <span className="ml-2 text-xs text-[#A78BFA]">Recommended</span>
                              ) : null}
                            </p>
                            <p className="mt-1 text-xs text-[#A1A1AA]">
                              {fillBusinessName(GREETING_TEMPLATES[template.key], form.businessName)}
                            </p>
                          </div>
                        </div>
                      </label>
                    ))}

                    <label
                      className={`block cursor-pointer rounded-lg border p-3 transition-colors ${
                        form.greetingTemplate === "custom"
                          ? "border-[#8B5CF6]/80 bg-[#8B5CF6]/10"
                          : "border-white/10 bg-[#0A0A0F]/80 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="greetingTemplate"
                          checked={form.greetingTemplate === "custom"}
                          onChange={() => selectGreetingTemplate("custom")}
                          className="mt-1"
                        />
                        <div>
                          <p className="text-sm font-medium text-[#E4E4E7]">Custom</p>
                          <p className="mt-1 text-xs text-[#A1A1AA]">Write your own greeting.</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="greetingText" className="mb-2 block text-sm text-[#E4E4E7]">
                    Greeting preview and editor
                  </label>
                  <textarea
                    id="greetingText"
                    rows={4}
                    className={fieldClasses}
                    value={form.greetingText}
                    onChange={(event) => {
                      setGreetingManuallyEdited(true);
                      setForm((prev) => ({ ...prev, greetingText: event.target.value }));
                    }}
                    placeholder="Greeting script"
                  />
                  <StepError message={errors.greetingText} />
                </div>

                <div>
                  <label htmlFor="transferNumber" className="mb-2 block text-sm text-[#E4E4E7]">
                    Transfer number
                  </label>
                  <input
                    id="transferNumber"
                    className={fieldClasses}
                    value={form.transferNumber}
                    onChange={(event) => setForm((prev) => ({ ...prev, transferNumber: event.target.value }))}
                    placeholder="(480) 555-5678"
                  />
                  <StepError message={errors.transferNumber} />
                </div>
              </div>
            ) : null}

            {step === 4 ? (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Common Questions</h2>
                <p className="text-sm text-[#A1A1AA]">What questions do your callers usually ask?</p>

                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm text-[#E4E4E7]">FAQ list</p>
                  <button
                    type="button"
                    className="rounded-md border border-white/20 px-3 py-1.5 text-xs text-[#D4D4D8] hover:border-[#8B5CF6]/70"
                    onClick={addFaq}
                  >
                    Add question
                  </button>
                </div>

                <div className="space-y-3">
                  {form.faqs.map((faq, index) => (
                    <div key={`${index}-${faq.question}`} className="rounded-lg border border-white/10 bg-[#0A0A0F]/80 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-xs uppercase tracking-wide text-[#A1A1AA]">Question {index + 1}</p>
                        <button
                          type="button"
                          className="text-xs text-[#D4D4D8] hover:text-red-200"
                          onClick={() => removeFaq(index)}
                        >
                          Remove
                        </button>
                      </div>

                      <div className="space-y-2">
                        <input
                          className={fieldClasses}
                          value={faq.question}
                          onChange={(event) => updateFaq(index, "question", event.target.value)}
                          placeholder="Question"
                        />
                        <textarea
                          rows={3}
                          className={fieldClasses}
                          value={faq.answer}
                          onChange={(event) => updateFaq(index, "answer", event.target.value)}
                          placeholder="Answer"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <StepError message={errors.faqs} />
              </div>
            ) : null}

            {step === 5 ? (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Review & Submit</h2>

                <div className="space-y-4">
                  <div className="rounded-lg border border-white/10 bg-[#0A0A0F]/80 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-[#E4E4E7]">Business Basics</h3>
                      <button
                        type="button"
                        className="text-xs text-[#A78BFA] hover:text-[#C4B5FD]"
                        onClick={() => goToStep(1)}
                      >
                        Edit
                      </button>
                    </div>
                    <ul className="space-y-1 text-sm text-[#D4D4D8]">
                      <li>
                        <span className="text-[#A1A1AA]">Business:</span> {form.businessName}
                      </li>
                      <li>
                        <span className="text-[#A1A1AA]">Type:</span> {getBusinessTypeLabel(form.businessType)}
                      </li>
                      <li>
                        <span className="text-[#A1A1AA]">Phone:</span> {form.businessPhone}
                      </li>
                      <li>
                        <span className="text-[#A1A1AA]">Email:</span> {form.businessEmail}
                      </li>
                      <li>
                        <span className="text-[#A1A1AA]">Website:</span> {form.websiteUrl || "Not provided"}
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-[#0A0A0F]/80 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-[#E4E4E7]">Hours & Services</h3>
                      <button
                        type="button"
                        className="text-xs text-[#A78BFA] hover:text-[#C4B5FD]"
                        onClick={() => goToStep(2)}
                      >
                        Edit
                      </button>
                    </div>

                    <p className="mb-2 text-xs uppercase tracking-wide text-[#A1A1AA]">Operating Hours</p>
                    <ul className="mb-4 space-y-1 text-sm text-[#D4D4D8]">
                      {form.hours.map((hour) => (
                        <li key={`review-hours-${hour.day}`}>
                          <span className="text-[#A1A1AA]">{hour.day}:</span>{" "}
                          {hour.closed ? "Closed" : `${hour.open} - ${hour.close}`}
                        </li>
                      ))}
                    </ul>

                    <p className="mb-2 text-xs uppercase tracking-wide text-[#A1A1AA]">Services</p>
                    <ul className="space-y-1 text-sm text-[#D4D4D8]">
                      {form.services
                        .filter((service) => service.name.trim() && service.price.trim())
                        .map((service, index) => (
                          <li key={`review-service-${index}`}>
                            <span className="text-[#A1A1AA]">{service.name.trim()}:</span> {service.price.trim()}
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-[#0A0A0F]/80 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-[#E4E4E7]">Call Handling</h3>
                      <button
                        type="button"
                        className="text-xs text-[#A78BFA] hover:text-[#C4B5FD]"
                        onClick={() => goToStep(3)}
                      >
                        Edit
                      </button>
                    </div>
                    <p className="mb-2 text-sm text-[#D4D4D8]">{form.greetingText}</p>
                    <p className="text-sm text-[#D4D4D8]">
                      <span className="text-[#A1A1AA]">Transfer number:</span> {form.transferNumber}
                    </p>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-[#0A0A0F]/80 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-[#E4E4E7]">Common Questions</h3>
                      <button
                        type="button"
                        className="text-xs text-[#A78BFA] hover:text-[#C4B5FD]"
                        onClick={() => goToStep(4)}
                      >
                        Edit
                      </button>
                    </div>
                    <ul className="space-y-3">
                      {form.faqs
                        .filter((faq) => faq.question.trim() && faq.answer.trim())
                        .map((faq, index) => (
                          <li key={`review-faq-${index}`} className="text-sm text-[#D4D4D8]">
                            <p className="font-medium text-[#E4E4E7]">{faq.question.trim()}</p>
                            <p className="text-[#A1A1AA]">{faq.answer.trim()}</p>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : null}

            {submitError ? <p className="text-sm text-red-300">{submitError}</p> : null}

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1 || submitting}
                className="rounded-lg border border-white/20 px-5 py-2.5 text-sm text-[#E4E4E7] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>

              {step < 5 ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canContinue || submitting}
                  className="rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-5 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className="rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-5 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting ? "Submitting..." : "Submit onboarding"}
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
