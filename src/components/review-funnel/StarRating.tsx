"use client"

import { useMemo, useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  value: number | null
  onChange: (rating: number) => void
  disabled?: boolean
  primaryColor?: string
  accentColor?: string
  ariaLabel?: string
}

function sanitizeHexColor(color: string | undefined, fallback: string): string {
  return /^#[0-9a-fA-F]{6}$/.test(color ?? "") ? (color as string) : fallback
}

export default function StarRating({
  value,
  onChange,
  disabled = false,
  primaryColor,
  accentColor,
  ariaLabel = "Rate your experience",
}: StarRatingProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)

  const primary = useMemo(() => sanitizeHexColor(primaryColor, "#8B5CF6"), [primaryColor])
  const accent = useMemo(() => sanitizeHexColor(accentColor, "#06B6D4"), [accentColor])
  const previewValue = hoveredRating ?? value ?? 0

  function nextRatingFromArrow(current: number | null, direction: "next" | "prev") {
    if (direction === "next") {
      return Math.min(5, (current ?? 0) + 1)
    }

    return Math.max(1, (current ?? 1) - 1)
  }

  function handleArrowInput(direction: "next" | "prev") {
    if (disabled) {
      return
    }

    onChange(nextRatingFromArrow(value, direction))
  }

  return (
    <div className="w-full" role="radiogroup" aria-label={ariaLabel}>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {Array.from({ length: 5 }, (_, index) => {
          const star = index + 1
          const isSelected = value === star
          const isFilled = star <= previewValue

          return (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`${star} star${star === 1 ? "" : "s"}`}
              disabled={disabled}
              onClick={() => onChange(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(null)}
              onFocus={() => setHoveredRating(star)}
              onBlur={() => setHoveredRating(null)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowUp") {
                  event.preventDefault()
                  handleArrowInput("next")
                }

                if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
                  event.preventDefault()
                  handleArrowInput("prev")
                }
              }}
              className="group flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F] disabled:cursor-not-allowed disabled:opacity-60 sm:h-16 sm:w-16"
              style={{
                borderColor: isFilled ? `${primary}55` : "rgba(255,255,255,0.12)",
                background: isFilled ? `linear-gradient(135deg, ${primary}20, ${accent}20)` : "rgba(255,255,255,0.04)",
                transform: isFilled ? "scale(1.04)" : "scale(1)",
                boxShadow: isFilled ? `0 10px 28px ${primary}44` : "none",
              }}
            >
              <Star
                className="h-8 w-8 transition-all duration-200 sm:h-9 sm:w-9"
                style={{
                  stroke: isFilled ? "#FBBF24" : "#71717A",
                  fill: isFilled ? "#FBBF24" : "transparent",
                  filter: isFilled ? "drop-shadow(0 0 8px rgba(251, 191, 36, 0.35))" : "none",
                }}
              />
            </button>
          )
        })}
      </div>
      <p className="mt-4 text-center text-sm text-[#A1A1AA]">Tap a star to rate your experience</p>
    </div>
  )
}
