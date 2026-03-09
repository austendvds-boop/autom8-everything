import { NextResponse } from "next/server";
import { z } from "zod";
import { createPortalCheckoutSession } from "@/lib/platform/services/stripe-portal";

const onboardingCheckoutSchema = z.object({
  business_name: z.string().trim().min(1),
  owner_name: z.string().trim().min(1),
  owner_email: z.string().trim().email(),
  owner_phone: z.string().trim().min(1),
  hours: z.string().trim().min(1),
  business_description: z.string().trim().min(1),
  faqs: z.string().trim().min(1),
  area_code: z.string().trim().regex(/^\d{3}$/),
  transfer_number: z.string().trim().min(1),
});

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getAllowedOrigin(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!siteUrl) {
    return "https://autom8everything.com";
  }

  try {
    return new URL(siteUrl).origin;
  } catch {
    return "https://autom8everything.com";
  }
}

function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": getAllowedOrigin(),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(),
  });
}

export async function POST(request: Request) {
  let rawBody: unknown;

  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400, headers: getCorsHeaders() });
  }

  const parsed = onboardingCheckoutSchema.safeParse(rawBody);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please complete all required fields." },
      { status: 400, headers: getCorsHeaders() },
    );
  }

  const payload = parsed.data;

  try {
    const session = await createPortalCheckoutSession({
      product: "cadence",
      email: payload.owner_email,
      businessName: payload.business_name,
      phone: payload.owner_phone,
      areaCode: payload.area_code,
    });

    return NextResponse.json({ url: session.url }, { headers: getCorsHeaders() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create checkout link right now.";

    return NextResponse.json({ error: message }, { status: 500, headers: getCorsHeaders() });
  }
}
