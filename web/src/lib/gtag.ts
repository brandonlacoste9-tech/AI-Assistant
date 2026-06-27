/**
 * gtag.ts
 * Google Ads (gtag.js) + GA4 helper — typed, SSR-safe, tree-shakeable.
 *
 * Supports two IDs from env:
 *   NEXT_PUBLIC_GA4_ID      — Google Analytics 4 (G-XXXXXXXXXX)
 *   NEXT_PUBLIC_GADS_ID     — Google Ads conversion tracking (AW-XXXXXXXXXX)
 *
 * Usage:
 *   import { gtagEvent, gtagConversion, gtagPageView } from "@/lib/gtag";
 *
 *   gtagPageView();                                          // manual page view
 *   gtagConversion("signup", { value: 0, currency: "CAD" }); // conversion
 *   gtagEvent("trial_started", { plan: "pro" });             // GA4 custom event
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";
export const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID ?? "";

// ---------------------------------------------------------------------------
// Conversion label mapping — fill these in from your Google Ads account
// After creating a conversion action in Google Ads, copy the label here.
// ---------------------------------------------------------------------------
export const CONVERSION_LABELS: Record<string, string> = {
  // Trial signup (most valuable — optimize campaigns to this)
  signup: process.env.NEXT_PUBLIC_GADS_LABEL_SIGNUP ?? "REPLACE_WITH_LABEL",
  // Pricing page CTA click (micro-conversion)
  initiate_checkout: process.env.NEXT_PUBLIC_GADS_LABEL_CHECKOUT ?? "REPLACE_WITH_LABEL",
  // Waitlist form submit
  lead: process.env.NEXT_PUBLIC_GADS_LABEL_LEAD ?? "REPLACE_WITH_LABEL",
  // Demo booking (if you add Calendly)
  demo_booked: process.env.NEXT_PUBLIC_GADS_LABEL_DEMO ?? "REPLACE_WITH_LABEL",
};

// ---------------------------------------------------------------------------
// Core helpers
// ---------------------------------------------------------------------------

/** Fire a GA4 page_view event (Next.js App Router handles most, but call
 *  this on soft navigations if needed). */
export function gtagPageView(url?: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: url ?? window.location.pathname,
    send_to: GA4_ID || undefined,
  });
}

/** Fire a GA4 custom event. */
export function gtagEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params ?? {});
}

/** Fire a Google Ads conversion. conversionKey must match a key in CONVERSION_LABELS. */
export function gtagConversion(
  conversionKey: keyof typeof CONVERSION_LABELS,
  params?: { value?: number; currency?: string; [key: string]: unknown }
) {
  if (typeof window === "undefined" || !window.gtag || !GADS_ID) return;
  const label = CONVERSION_LABELS[conversionKey];
  if (!label || label === "REPLACE_WITH_LABEL") {
    console.warn(`[gtag] Conversion label not set for key: ${conversionKey}`);
    return;
  }
  window.gtag("event", "conversion", {
    send_to: `${GADS_ID}/${label}`,
    value: params?.value ?? 0,
    currency: params?.currency ?? "CAD",
    ...params,
  });
}
