"use client";

import { useEffect } from "react";
import { trackGetStartedCompletion } from "@/lib/analytics";

const TRACK_KEY = "get-started-success-tracked";

export default function GetStartedSuccessTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.sessionStorage.getItem(TRACK_KEY) === "1") return;

    trackGetStartedCompletion({
      page_type: "get_started_success",
      lead_type: "cadence_onboarding",
    });

    window.sessionStorage.setItem(TRACK_KEY, "1");
  }, []);

  return null;
}
