interface StatsCardProps {
  title: string
  value: string
  subtitle?: string
}

export default function StatsCard({ title, value, subtitle }: StatsCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#12121A] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.22)]">
      <p className="text-xs uppercase tracking-[0.16em] text-[#8B5CF6]">{title}</p>
      <p className="mt-3 text-3xl font-semibold text-white" style={{ fontFamily: "var(--font-playfair), serif" }}>
        {value}
      </p>
      {subtitle ? <p className="mt-2 text-sm text-[#A1A1AA]">{subtitle}</p> : null}
    </article>
  )
}
