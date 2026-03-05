"use client"

import { useCallback, useEffect, useState } from "react"
import FeedbackList, { type FeedbackListItem } from "@/components/review-funnel/FeedbackList"

interface FeedbackApiPayload {
  items: FeedbackListItem[]
  totalItems: number
}

export default function FeedbackClient() {
  const [items, setItems] = useState<FeedbackListItem[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const loadFeedback = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const response = await fetch("/api/review-funnel/dashboard/feedback", {
        cache: "no-store",
      })

      const payload = (await response.json().catch(() => null)) as FeedbackApiPayload | { error?: string } | null

      if (!response.ok || !payload || !("items" in payload)) {
        throw new Error((payload as { error?: string } | null)?.error || "Failed to load feedback")
      }

      setItems(payload.items)
      setTotalItems(payload.totalItems)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to load feedback")
      setItems([])
      setTotalItems(0)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadFeedback()
  }, [loadFeedback])

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-playfair), serif" }}>
          Feedback
        </h2>
        <p className="mt-1 text-sm text-[#A1A1AA]">
          See private 1–4★ feedback so your team can follow up quickly and improve experiences.
        </p>
      </section>

      <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#12121A] px-4 py-3">
        <p className="text-sm text-[#D4D4D8]">
          {isLoading ? "Loading feedback..." : `${totalItems.toLocaleString()} feedback entries`}
        </p>

        <button
          type="button"
          onClick={() => void loadFeedback()}
          disabled={isLoading}
          className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-[#8B5CF6]/50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Refresh
        </button>
      </div>

      {errorMessage ? (
        <p className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">{errorMessage}</p>
      ) : null}

      <FeedbackList items={items} isLoading={isLoading} />
    </div>
  )
}
