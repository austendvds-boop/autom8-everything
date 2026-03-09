"use client"

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react"
import ReviewTable, { type DashboardReviewTableRow } from "@/components/review-funnel/ReviewTable"

interface ReviewsApiPayload {
  items: DashboardReviewTableRow[]
  pagination: {
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
  }
}

interface ReviewDetailPayload {
  review: {
    id: string
    customerName: string | null
    customerPhone: string | null
    customerEmail: string | null
    rating: number | null
    feedbackText: string | null
    smsStatus: string
    smsSentAt: string | null
    smsScheduledAt: string | null
    smsSid: string | null
    pageOpenedAt: string | null
    appointmentEnd: string
    promoShown: boolean
    promoRedeemed: boolean
    createdAt: string
    locationName: string | null
  }
}

interface ReviewFilters {
  dateFrom: string
  dateTo: string
  rating: string
  smsStatus: string
}

const DEFAULT_FILTERS: ReviewFilters = {
  dateFrom: "",
  dateTo: "",
  rating: "",
  smsStatus: "",
}

const SMS_STATUS_OPTIONS = [
  "pending",
  "sent",
  "sent_email",
  "delivered",
  "failed",
  "opted_out",
  "no_phone",
  "limit_reached",
] as const

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

function toLabel(value: string): string {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export default function ReviewsClient() {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<ReviewFilters>(DEFAULT_FILTERS)
  const [draftFilters, setDraftFilters] = useState<ReviewFilters>(DEFAULT_FILTERS)

  const [rows, setRows] = useState<DashboardReviewTableRow[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null)
  const [selectedReview, setSelectedReview] = useState<ReviewDetailPayload["review"] | null>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [isDetailLoading, setIsDetailLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const queryString = useMemo(() => {
    const params = new URLSearchParams()
    params.set("page", String(page))
    params.set("pageSize", "20")

    if (filters.dateFrom) params.set("dateFrom", filters.dateFrom)
    if (filters.dateTo) params.set("dateTo", filters.dateTo)
    if (filters.rating) params.set("rating", filters.rating)
    if (filters.smsStatus) params.set("smsStatus", filters.smsStatus)

    return params.toString()
  }, [page, filters])

  const loadReviews = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const response = await fetch(`/api/review-funnel/dashboard/reviews?${queryString}`, {
        cache: "no-store",
      })

      const payload = (await response.json().catch(() => null)) as ReviewsApiPayload | { error?: string } | null

      if (!response.ok || !payload || !("items" in payload)) {
        throw new Error((payload as { error?: string } | null)?.error || "Failed to load reviews")
      }

      setRows(payload.items)
      setTotalItems(payload.pagination.totalItems)
      setTotalPages(Math.max(1, payload.pagination.totalPages))

      if (selectedReviewId && !payload.items.some((item) => item.id === selectedReviewId)) {
        setSelectedReviewId(null)
        setSelectedReview(null)
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to load reviews")
      setRows([])
      setTotalItems(0)
      setTotalPages(1)
    } finally {
      setIsLoading(false)
    }
  }, [queryString, selectedReviewId])

  useEffect(() => {
    void loadReviews()
  }, [loadReviews])

  async function handleSelectReview(reviewId: string) {
    if (selectedReviewId === reviewId) {
      setSelectedReviewId(null)
      setSelectedReview(null)
      return
    }

    setSelectedReviewId(reviewId)
    setIsDetailLoading(true)
    setErrorMessage(null)

    try {
      const response = await fetch(`/api/review-funnel/dashboard/reviews/${reviewId}`, {
        cache: "no-store",
      })

      const payload = (await response.json().catch(() => null)) as ReviewDetailPayload | { error?: string } | null

      if (!response.ok || !payload || !("review" in payload)) {
        throw new Error((payload as { error?: string } | null)?.error || "Failed to load review details")
      }

      setSelectedReview(payload.review)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to load review details")
      setSelectedReviewId(null)
      setSelectedReview(null)
    } finally {
      setIsDetailLoading(false)
    }
  }

  function handleApplyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFilters(draftFilters)
    setPage(1)
  }

  function clearFilters() {
    setDraftFilters(DEFAULT_FILTERS)
    setFilters(DEFAULT_FILTERS)
    setPage(1)
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-playfair), serif" }}>
          Reviews
        </h2>
        <p className="mt-1 text-sm text-[#A1A1AA]">Filter and review every customer request sent from your review flow.</p>
      </section>

      <form onSubmit={handleApplyFilters} className="rounded-2xl border border-white/10 bg-[#12121A] p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-wide text-[#A1A1AA]">Date from</span>
            <input
              type="date"
              value={draftFilters.dateFrom}
              onChange={(event) => setDraftFilters((prev) => ({ ...prev, dateFrom: event.target.value }))}
              className="w-full rounded-lg border border-white/15 bg-[#0D0D13] px-3 py-2 text-sm text-white focus:border-[#8B5CF6] focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-wide text-[#A1A1AA]">Date to</span>
            <input
              type="date"
              value={draftFilters.dateTo}
              onChange={(event) => setDraftFilters((prev) => ({ ...prev, dateTo: event.target.value }))}
              className="w-full rounded-lg border border-white/15 bg-[#0D0D13] px-3 py-2 text-sm text-white focus:border-[#8B5CF6] focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-wide text-[#A1A1AA]">Rating</span>
            <select
              value={draftFilters.rating}
              onChange={(event) => setDraftFilters((prev) => ({ ...prev, rating: event.target.value }))}
              className="w-full rounded-lg border border-white/15 bg-[#0D0D13] px-3 py-2 text-sm text-white focus:border-[#8B5CF6] focus:outline-none"
            >
              <option value="">All ratings</option>
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {rating}★
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-xs uppercase tracking-wide text-[#A1A1AA]">Text message status</span>
            <select
              value={draftFilters.smsStatus}
              onChange={(event) => setDraftFilters((prev) => ({ ...prev, smsStatus: event.target.value }))}
              className="w-full rounded-lg border border-white/15 bg-[#0D0D13] px-3 py-2 text-sm text-white focus:border-[#8B5CF6] focus:outline-none"
            >
              <option value="">All statuses</option>
              {SMS_STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {toLabel(status)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="submit"
            className="rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-4 py-2 text-sm font-semibold text-white"
          >
            Apply filters
          </button>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:border-[#8B5CF6]/50"
          >
            Clear
          </button>
        </div>
      </form>

      {errorMessage ? (
        <p className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">{errorMessage}</p>
      ) : null}

      <ReviewTable
        rows={rows}
        isLoading={isLoading}
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={(nextPage) => setPage(Math.max(1, Math.min(totalPages, nextPage)))}
        onSelectReview={(reviewId) => void handleSelectReview(reviewId)}
        selectedReviewId={selectedReviewId}
      />

      {selectedReviewId ? (
        <section className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
          <h3 className="text-lg font-semibold text-white">Review detail</h3>

          {isDetailLoading || !selectedReview ? (
            <p className="mt-3 text-sm text-[#A1A1AA]">Loading review details...</p>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 xl:grid-cols-3">
              <p className="rounded-lg border border-white/10 bg-white/5 p-3 text-[#E4E4E7]">
                <span className="block text-xs uppercase tracking-wide text-[#A1A1AA]">Customer</span>
                {selectedReview.customerName?.trim() || "Unknown"}
              </p>
              <p className="rounded-lg border border-white/10 bg-white/5 p-3 text-[#E4E4E7]">
                <span className="block text-xs uppercase tracking-wide text-[#A1A1AA]">Phone</span>
                {selectedReview.customerPhone || "—"}
              </p>
              <p className="rounded-lg border border-white/10 bg-white/5 p-3 text-[#E4E4E7]">
                <span className="block text-xs uppercase tracking-wide text-[#A1A1AA]">Email</span>
                {selectedReview.customerEmail || "—"}
              </p>
              <p className="rounded-lg border border-white/10 bg-white/5 p-3 text-[#E4E4E7]">
                <span className="block text-xs uppercase tracking-wide text-[#A1A1AA]">Rating</span>
                {selectedReview.rating ? `${selectedReview.rating}★` : "—"}
              </p>
              <p className="rounded-lg border border-white/10 bg-white/5 p-3 text-[#E4E4E7]">
                <span className="block text-xs uppercase tracking-wide text-[#A1A1AA]">Text message status</span>
                {toLabel(selectedReview.smsStatus)}
              </p>
              <p className="rounded-lg border border-white/10 bg-white/5 p-3 text-[#E4E4E7]">
                <span className="block text-xs uppercase tracking-wide text-[#A1A1AA]">Page opened</span>
                {selectedReview.pageOpenedAt ? formatDate(selectedReview.pageOpenedAt) : "No"}
              </p>
              <p className="rounded-lg border border-white/10 bg-white/5 p-3 text-[#E4E4E7]">
                <span className="block text-xs uppercase tracking-wide text-[#A1A1AA]">Text message sent</span>
                {formatDate(selectedReview.smsSentAt)}
              </p>
              <p className="rounded-lg border border-white/10 bg-white/5 p-3 text-[#E4E4E7]">
                <span className="block text-xs uppercase tracking-wide text-[#A1A1AA]">Appointment end</span>
                {formatDate(selectedReview.appointmentEnd)}
              </p>
              <p className="rounded-lg border border-white/10 bg-white/5 p-3 text-[#E4E4E7]">
                <span className="block text-xs uppercase tracking-wide text-[#A1A1AA]">Location</span>
                {selectedReview.locationName || "Primary"}
              </p>

              {selectedReview.feedbackText ? (
                <p className="sm:col-span-2 xl:col-span-3 rounded-lg border border-white/10 bg-white/5 p-3 text-[#E4E4E7]">
                  <span className="block text-xs uppercase tracking-wide text-[#A1A1AA]">Feedback</span>
                  <span className="mt-1 block whitespace-pre-wrap">{selectedReview.feedbackText}</span>
                </p>
              ) : null}
            </div>
          )}
        </section>
      ) : null}
    </div>
  )
}
