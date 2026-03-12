export function PortalCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-white/[0.06] bg-[#161920]/90 p-6">
      <div className="h-4 w-1/3 rounded bg-white/10" />
      <div className="mt-4 h-3 w-full rounded bg-white/5" />
      <div className="mt-2 h-3 w-2/3 rounded bg-white/5" />
    </div>
  )
}

export function PortalPageSkeleton({ cards = 2 }: { cards?: number }) {
  return (
    <main className="min-h-screen bg-[#0E1015] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {Array.from({ length: cards }).map((_, i) => (
          <PortalCardSkeleton key={i} />
        ))}
      </div>
    </main>
  )
}
