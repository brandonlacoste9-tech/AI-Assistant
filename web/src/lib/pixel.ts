/**
 * pixel.ts
 * Meta Pixel (fbq) helper — typed, tree-shakeable, safe for SSR.
 *
 * Usage:
 *   import { pixelEvent, pixelPageView } from "@/lib/pixel";
 *   pixelPageView();
 *   pixelEvent("Lead", { content_name: "waitlist" });
 *   pixelEvent("CompleteRegistration", { value: 0, currency: "CAD" });
 *   pixelEvent("InitiateCheckout", { value: 149, currency: "CAD", content_name: "pro" });
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function pixelPageView() {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", "PageView");
}

export function pixelEvent(
  eventName: StandardEvent | string,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", eventName, params ?? {});
}

// All standard Meta events for autocomplete
type StandardEvent =
  | "PageView"
  | "Lead"
  | "CompleteRegistration"
  | "InitiateCheckout"
  | "Purchase"
  | "ViewContent"
  | "Search"
  | "AddToCart"
  | "Contact"
  | "SubmitApplication"
  | "StartTrial"
  | "Subscribe";
