import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
};

const sentryConfig = {
  // Suppresses source map upload logs during build
  silent: true,
  // Upload source maps for better stack traces
  widenClientFileUpload: true,
  // Hide source maps from client bundles
  hideSourceMaps: true,
  // Disable Sentry telemetry
  disableLogger: true,
};

// Only wrap with Sentry if DSN is configured
const hasSentry = Boolean(
  process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
);

export default hasSentry
  ? withSentryConfig(nextConfig, sentryConfig)
  : nextConfig;
