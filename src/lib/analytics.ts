"use client";

type AnalyticsValue = string | number | boolean | null | undefined;

type AnalyticsParams = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, AnalyticsValue>>;
    gtag?: (...args: unknown[]) => void;
  }
}

function pushToDataLayer(event: string, params: AnalyticsParams): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

function pushToGtag(event: string, params: AnalyticsParams): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", event, params);
}

export function trackEvent(event: string, params: AnalyticsParams = {}): void {
  pushToDataLayer(event, params);
  pushToGtag(event, params);
}

export function trackCallClick(params: {
  cta_location: string;
  page_type: string;
}): void {
  trackEvent("book_strategy_call", params);
}

export function trackContactFormSubmit(params: {
  page_type: string;
  lead_type: string;
}): void {
  trackEvent("submit_contact_form", params);
  trackEvent("generate_lead", {
    lead_type: params.lead_type,
    source_page: params.page_type,
  });
}

export function trackGetStartedCompletion(params: {
  page_type: string;
  lead_type: string;
}): void {
  trackEvent("complete_get_started", params);
  trackEvent("generate_lead", {
    lead_type: params.lead_type,
    source_page: params.page_type,
  });
}
