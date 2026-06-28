"use client";

import { useState, useEffect } from "react";

type CalendarProvider = "google" | "outlook" | "ics_only" | "none";

type Props = {
  googleConnected: boolean;
  outlookConnected: boolean;
  currentProvider: CalendarProvider;
};

export function CalendarSyncCard({ googleConnected, outlookConnected, currentProvider }: Props) {
  const [feedUrl, setFeedUrl] = useState<string | null>(null);
  const [feedLoading, setFeedLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [disconnecting, setDisconnecting] = useState<string | null>(null);

  useEffect(() => {
    // Fetch existing feed URL
    fetch("/api/calendar/feed-token")
      .then((res) => res.json())
      .then((data) => setFeedUrl(data.feedUrl ?? null))
      .catch(() => {});
  }, []);

  const generateFeed = async () => {
    setFeedLoading(true);
    try {
      const res = await fetch("/api/calendar/feed-token", { method: "POST" });
      const data = await res.json();
      setFeedUrl(data.feedUrl ?? null);
    } catch {
      // ignore
    } finally {
      setFeedLoading(false);
    }
  };

  const copyFeedUrl = () => {
    if (feedUrl) {
      navigator.clipboard.writeText(feedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const disconnectProvider = async (provider: "google" | "outlook") => {
    setDisconnecting(provider);
    try {
      await fetch(`/api/${provider}/disconnect`, { method: "POST" });
      window.location.reload();
    } catch {
      // ignore
    } finally {
      setDisconnecting(null);
    }
  };

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-stone-900 mb-1">Calendar Sync</h3>
      <p className="text-sm text-stone-500 mb-6">
        Connect your calendar so the AI never double-books. All bookings will appear in your calendar automatically.
      </p>

      {/* Provider Options */}
      <div className="space-y-3 mb-6">
        {/* Google Calendar */}
        <div className="flex items-center justify-between rounded-lg border border-stone-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.5 3h-3V1.5h-1.5V3h-6V1.5H7.5V3h-3C3.675 3 3 3.675 3 4.5v15c0 .825.675 1.5 1.5 1.5h15c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5zm0 16.5h-15V8.25h15v11.25z"/>
              </svg>
            </div>
            <div>
              <p className="font-medium text-stone-900">Google Calendar</p>
              <p className="text-xs text-stone-500">
                {googleConnected ? "Connected — syncing both ways" : "Two-way sync with Google Calendar"}
              </p>
            </div>
          </div>
          {googleConnected ? (
            <button
              onClick={() => disconnectProvider("google")}
              disabled={disconnecting === "google"}
              className="text-sm text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
            >
              {disconnecting === "google" ? "..." : "Disconnect"}
            </button>
          ) : (
            <a
              href="/api/google/connect"
              className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Connect
            </a>
          )}
        </div>

        {/* Microsoft Outlook */}
        <div className="flex items-center justify-between rounded-lg border border-stone-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-sky-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <div>
              <p className="font-medium text-stone-900">Microsoft Outlook / 365</p>
              <p className="text-xs text-stone-500">
                {outlookConnected ? "Connected — syncing both ways" : "Two-way sync with Outlook Calendar"}
              </p>
            </div>
          </div>
          {outlookConnected ? (
            <button
              onClick={() => disconnectProvider("outlook")}
              disabled={disconnecting === "outlook"}
              className="text-sm text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
            >
              {disconnecting === "outlook" ? "..." : "Disconnect"}
            </button>
          ) : (
            <a
              href="/api/outlook/connect"
              className="inline-flex items-center gap-1 rounded-lg bg-sky-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-700 transition-colors"
            >
              Connect
            </a>
          )}
        </div>

        {/* iCal Subscription Feed */}
        <div className="rounded-lg border border-stone-200 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.94 2c.416 0 .753.324.753.724v1.46c.668-.012 1.417-.012 2.26-.012h4.015c.842 0 1.591 0 2.259.013v-1.46c0-.4.337-.725.753-.725s.753.324.753.724V4.25c1.445.111 2.394.384 3.09 1.055.698.67.982 1.582 1.097 2.972L22 9H2l.076-.724c.116-1.39.4-2.302 1.097-2.972.697-.67 1.645-.944 3.09-1.055V2.724c0-.4.337-.724.753-.724zM2 12c0-.839 0-1.585.013-2.25h19.974C22 10.415 22 11.161 22 12v2c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14v-2z"/>
              </svg>
            </div>
            <div>
              <p className="font-medium text-stone-900">iCal Subscription (Any Calendar)</p>
              <p className="text-xs text-stone-500">
                Works with Apple Calendar, Thunderbird, or any app that supports .ics feeds
              </p>
            </div>
          </div>

          {feedUrl ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={feedUrl}
                className="flex-1 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-600 font-mono"
              />
              <button
                onClick={copyFeedUrl}
                className="rounded-lg bg-stone-100 px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-200 transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={generateFeed}
                className="rounded-lg bg-stone-100 px-3 py-2 text-xs font-medium text-stone-500 hover:bg-stone-200 transition-colors"
                title="Regenerate URL (invalidates old one)"
              >
                Reset
              </button>
            </div>
          ) : (
            <button
              onClick={generateFeed}
              disabled={feedLoading}
              className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 transition-colors disabled:opacity-50"
            >
              {feedLoading ? "Generating..." : "Generate Feed URL"}
            </button>
          )}

          {feedUrl && (
            <div className="mt-3 text-xs text-stone-500 space-y-1">
              <p><strong>Google Calendar:</strong> Settings → Add calendar → From URL → Paste the link</p>
              <p><strong>Apple Calendar:</strong> File → New Calendar Subscription → Paste the link</p>
              <p><strong>Outlook:</strong> Add calendar → Subscribe from web → Paste the link</p>
            </div>
          )}
        </div>
      </div>

      {/* Status indicator */}
      <div className="rounded-lg bg-stone-50 p-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            googleConnected || outlookConnected ? "bg-green-500" : feedUrl ? "bg-yellow-500" : "bg-stone-300"
          }`} />
          <span className="text-xs text-stone-600">
            {googleConnected
              ? "Full two-way sync active (Google Calendar)"
              : outlookConnected
                ? "Full two-way sync active (Microsoft Outlook)"
                : feedUrl
                  ? "One-way feed active — connect Google or Outlook for two-way sync"
                  : "No calendar connected — bookings only appear in JustBookMe dashboard"}
          </span>
        </div>
      </div>
    </div>
  );
}
