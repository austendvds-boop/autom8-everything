"use client";

import { useEffect } from "react";
import { trackCallClick } from "@/lib/analytics";

export default function AnalyticsClickTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href^='tel:']") as HTMLAnchorElement | null;
      if (!anchor) return;

      const locationHint = anchor.dataset.ctaLocation?.trim();
      const ctaLocation =
        locationHint && locationHint.length > 0
          ? locationHint
          : typeof window !== "undefined"
            ? window.location.pathname || "unknown"
            : "unknown";

      trackCallClick({
        cta_location: ctaLocation,
        page_type: typeof window !== "undefined" ? window.location.pathname || "unknown" : "unknown",
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
