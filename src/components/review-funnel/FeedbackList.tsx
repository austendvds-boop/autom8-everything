export interface FeedbackListItem {
  id: string
  customerName: string | null
  rating: number
  feedbackText: string
  promoShown: boolean
  promoRedeemed: boolean
  ratedAt: string | null
}

interface FeedbackListProps {
  items: FeedbackListItem[]
  isLoading: boolean
}

function formatDate(value: string | null): string {
  if (!value) {
    return "—"
  }

  const parsed = new Date(value)

  if (Number.isNaN(parsed.getTime())) {
    return "—"
  }

  return parsed.toLocaleString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

function renderStars(rating: number): string {
  return "★".repeat(Math.max(1, Math.min(5, rating)))
}

export default function FeedbackList({ items, isLoading }: FeedbackListProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#12121A] p-4 sm:p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">Private feedback</h2>
        <p className="text-sm text-[#A1A1AA]">1–4★ feedback submitted through the funnel.</p>
      </div>

      {isLoading ? (
        <p className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-[#A1A1AA]">Loading feedback...</p>
      ) : items.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-[#A1A1AA]">No private feedback yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-xl border border-white/10 bg-[#0D0D13] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-white">{item.customerName?.trim() || "Unknown customer"}</p>
                <p className="text-xs uppercase tracking-wide text-[#8B5CF6]">{formatDate(item.ratedAt)}</p>
              </div>

              <p className="mt-2 text-sm font-medium text-amber-300">{renderStars(item.rating)} ({item.rating}/5)</p>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[#D4D4D8]">{item.feedbackText}</p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[#C4B5FD]">
                  Promo shown: {item.promoShown ? "Yes" : "No"}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[#C4B5FD]">
                  Promo redeemed: {item.promoRedeemed ? "Yes" : "No"}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
