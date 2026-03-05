import Link from "next/link";
import { Check } from "lucide-react";

type PlanCardProps = {
  name: string;
  price: string;
  priceSuffix?: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
  badge?: string;
  ctaStyle?: "solid" | "outline";
};

export default function PlanCard({
  name,
  price,
  priceSuffix,
  description,
  features,
  ctaLabel,
  ctaHref,
  featured = false,
  badge,
  ctaStyle = "solid",
}: PlanCardProps) {
  return (
    <article
      className={`relative h-full rounded-2xl border p-6 md:p-8 flex flex-col ${
        featured
          ? "border-[#8B5CF6]/45 bg-[linear-gradient(160deg,rgba(26,20,45,0.95),rgba(18,18,26,0.95))] shadow-[0_0_0_1px_rgba(139,92,246,0.22),0_0_70px_rgba(139,92,246,0.14)]"
          : "border-white/10 bg-[#12121A]"
      }`}
    >
      {badge && (
        <span className="absolute right-5 top-5 rounded-full border border-[#DDD6FE]/60 bg-[#8B5CF6]/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#DDD6FE]">
          {badge}
        </span>
      )}

      <p className="text-sm uppercase tracking-wide text-[#8B5CF6]">{name}</p>
      <p className="mt-3 text-4xl font-bold text-white leading-none">
        {price}
        {priceSuffix ? <span className="text-base font-medium text-[#A1A1AA]">{priceSuffix}</span> : null}
      </p>
      <p className="mt-4 text-[#A1A1AA] leading-relaxed">{description}</p>

      <ul className="mt-6 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-[#D4D4D8]">
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8B5CF6]/15 text-[#C4B5FD]">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        className={`mt-8 inline-flex min-h-11 w-fit items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
          ctaStyle === "outline"
            ? "border border-white/20 text-white hover:border-[#8B5CF6]/60"
            : "bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white"
        }`}
      >
        {ctaLabel}
      </Link>
    </article>
  );
}
