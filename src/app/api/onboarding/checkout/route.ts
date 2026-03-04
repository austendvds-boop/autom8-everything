import { NextResponse } from "next/server";

type OnboardingRequest = {
  business_name?: string;
  owner_name?: string;
  owner_email?: string;
  owner_phone?: string;
  hours?: string;
  business_description?: string;
  faqs?: string;
  area_code?: string;
  transfer_number?: string;
};

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeAreaCode(value: string): string {
  const digits = value.replace(/\D/g, "");
  return digits.length === 3 ? digits : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OnboardingRequest;

    const businessName = asTrimmedString(body.business_name);
    const ownerName = asTrimmedString(body.owner_name);
    const ownerEmail = asTrimmedString(body.owner_email).toLowerCase();
    const ownerPhone = asTrimmedString(body.owner_phone);
    const transferNumber = asTrimmedString(body.transfer_number);
    const areaCode = normalizeAreaCode(asTrimmedString(body.area_code));
    const hours = asTrimmedString(body.hours);
    const businessDescription = asTrimmedString(body.business_description);
    const faqs = asTrimmedString(body.faqs);

    if (!businessName || !ownerName || !ownerEmail || !ownerPhone || !hours || !businessDescription || !faqs || !areaCode || !transferNumber) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    const cadenceBaseUrl = process.env.CADENCE_API_URL || process.env.NEXT_PUBLIC_CADENCE_API_URL;
    if (!cadenceBaseUrl) {
      return NextResponse.json({ error: "Cadence API URL is not configured." }, { status: 500 });
    }

    const cadenceResponse = await fetch(`${cadenceBaseUrl}/api/stripe/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        email: ownerEmail,
        businessName,
        ownerName,
        ownerPhone,
        transferNumber,
        areaCode,
        hours,
        businessDescription,
        faqs,
        subscriptionStatus: "pending",
      }),
    });

    const payload = (await cadenceResponse.json().catch(() => ({}))) as { url?: string; error?: string };

    if (!cadenceResponse.ok || !payload.url) {
      return NextResponse.json(
        { error: payload.error || "Unable to create checkout link right now." },
        { status: cadenceResponse.status || 500 }
      );
    }

    return NextResponse.json({ url: payload.url });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
