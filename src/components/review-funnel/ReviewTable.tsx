export interface DashboardReviewTableRow {
  id: string
  customerName: string | null
  appointmentEnd: string
  createdAt: string
  rating: number | null
  smsStatus: string
  pageOpenedAt: string | null
}

interface ReviewTableProps {
  rows: DashboardReviewTableRow[]
  isLoading: boolean
  page: number
  totalPages: number
  totalItems: number
  onPageChange: (nextPage: number) => void
  onSelectReview?: (reviewId: string) => void
  selectedReviewId?: string | null
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

function renderRating(rating: number | null): string {
  if (!rating) {
    return "—"
  }

  return `${rating}★`
}

function prettySmsStatus(status: string): string {
  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export default function ReviewTable({
  rows,
  isLoading,
  page,
  totalPages,
  totalItems,
  onPageChange,
  onSelectReview,
  selectedReviewId,
}: ReviewTableProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#12121A] p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">All review requests</h2>
          <p className="text-sm text-[#A1A1AA]">{totalItems} total records</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-[#A1A1AA]">
              <th className="px-3 py-2 font-medium">Customer</th>
              <th className="px-3 py-2 font-medium">Date</th>
              <th className="px-3 py-2 font-medium">Rating</th>
              <th className="px-3 py-2 font-medium">SMS Status</th>
              <th className="px-3 py-2 font-medium">Page Opened</th>
              <th className="px-3 py-2 font-medium" aria-label="Details" />
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-[#A1A1AA]">
                  Loading reviews...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-[#A1A1AA]">
                  No reviews match these filters yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="text-[#E4E4E7]">
                  <td className="px-3 py-3">{row.customerName?.trim() || "Unknown"}</td>
                  <td className="px-3 py-3">{formatDate(row.appointmentEnd || row.createdAt)}</td>
                  <td className="px-3 py-3">{renderRating(row.rating)}</td>
                  <td className="px-3 py-3">
                    <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs">
                      {prettySmsStatus(row.smsStatus)}
                    </span>
                  </td>
                  <td className="px-3 py-3">{row.pageOpenedAt ? formatDate(row.pageOpenedAt) : "No"}</td>
                  <td className="px-3 py-3 text-right">
                    {onSelectReview ? (
                      <button
                        type="button"
                        onClick={() => onSelectReview(row.id)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                          selectedReviewId === row.id
                            ? "border-[#8B5CF6]/50 bg-[#8B5CF6]/20 text-white"
                            : "border-white/15 text-[#D4D4D8] hover:border-[#8B5CF6]/40 hover:text-white"
                        }`}
                      >
                        {selectedReviewId === row.id ? "Selected" : "Details"}
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
        <p className="text-xs text-[#A1A1AA]">
          Page {Math.max(1, page)} of {Math.max(1, totalPages)}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1 || isLoading}
            className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-[#8B5CF6]/50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={isLoading || page >= totalPages}
            className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-[#8B5CF6]/50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}
