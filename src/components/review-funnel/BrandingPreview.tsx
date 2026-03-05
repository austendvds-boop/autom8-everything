interface BrandingPreviewProps {
  businessName: string
  promoOffer: string
  promoCode?: string | null
  primaryColor: string
  accentColor: string
}

function sanitizeHexColor(color: string | null | undefined, fallback: string): string {
  return /^#[0-9a-fA-F]{6}$/.test(color ?? "") ? (color as string) : fallback
}

export default function BrandingPreview({
  businessName,
  promoOffer,
  promoCode,
  primaryColor,
  accentColor,
}: BrandingPreviewProps) {
  const safePrimaryColor = sanitizeHexColor(primaryColor, "#8B5CF6")
  const safeAccentColor = sanitizeHexColor(accentColor, "#06B6D4")

  return (
    <section className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-[#8B5CF6]">Funnel preview</p>
      <h3 className="mt-2 text-lg font-semibold text-white">Live branding snapshot</h3>

      <div className="mt-4 rounded-2xl border border-white/10 bg-[#0A0A0F] p-4">
        <div
          className="rounded-xl p-4"
          style={{
            background: `linear-gradient(135deg, ${safePrimaryColor}2A 0%, ${safeAccentColor}24 100%)`,
            border: `1px solid ${safePrimaryColor}55`,
          }}
        >
          <p className="text-xs uppercase tracking-wide text-[#D4D4D8]">{businessName || "Your Business"}</p>
          <p className="mt-2 text-base font-semibold text-white">How was your experience today?</p>
          <p className="mt-3 rounded-lg bg-[#0A0A0F]/60 p-3 text-sm text-[#E4E4E7]">{promoOffer || "10% off your next visit"}</p>
          {promoCode?.trim() ? (
            <p className="mt-2 text-xs text-[#C4B5FD]">
              Promo code: <span className="font-semibold tracking-wide text-white">{promoCode.trim()}</span>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
