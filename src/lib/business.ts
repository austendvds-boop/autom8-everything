export const businessProfile = {
  name: process.env.NEXT_PUBLIC_BUSINESS_NAME || "Autom8 Everything",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "hello@autom8everything.com",
  phoneDisplay: process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || "",
  phoneE164: process.env.NEXT_PUBLIC_BUSINESS_PHONE_E164 || "",
  streetAddress: process.env.NEXT_PUBLIC_BUSINESS_STREET_ADDRESS || "",
  postalCode: process.env.NEXT_PUBLIC_BUSINESS_POSTAL_CODE || "",
  city: process.env.NEXT_PUBLIC_BUSINESS_CITY || "Phoenix",
  state: process.env.NEXT_PUBLIC_BUSINESS_STATE || "AZ",
  country: process.env.NEXT_PUBLIC_BUSINESS_COUNTRY || "US",
  serviceAreaLabel:
    process.env.NEXT_PUBLIC_BUSINESS_SERVICE_AREA_LABEL || "Serving Arizona and remote clients across the U.S.",
  social: {
    twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER || "",
    github: process.env.NEXT_PUBLIC_SOCIAL_GITHUB || "",
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "",
  },
};

export const businessSameAs = Object.values(businessProfile.social).filter(Boolean);
