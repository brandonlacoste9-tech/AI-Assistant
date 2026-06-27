"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export function GoogleCalendarButton({
  connected,
  configured,
}: {
  connected: boolean;
  configured: boolean;
}) {
  const [disconnecting, setDisconnecting] = useState(false);

  if (!configured) {
    return (
      <button
        type="button"
        disabled
        className="w-full rounded-md bg-[var(--muted)] px-3 py-2 text-sm font-medium text-[var(--muted-fg)] cursor-not-allowed"
      >
        Not configured
      </button>
    );
  }

  if (connected) {
    return (
      <button
        type="button"
        onClick={async () => {
          setDisconnecting(true);
          try {
            await fetch("/api/google/disconnect", { method: "POST" });
            window.location.reload();
          } catch {
            setDisconnecting(false);
          }
        }}
        disabled={disconnecting}
        className="w-full rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100"
      >
        {disconnecting ? (
          <Loader2 className="mx-auto h-4 w-4 animate-spin" />
        ) : (
          "Disconnect"
        )}
      </button>
    );
  }

  return (
    <a
      href="/api/google/connect"
      className="block w-full rounded-md bg-[var(--primary)] px-3 py-2 text-center text-sm font-medium text-[var(--background)] transition-colors hover:bg-[var(--primary-hover)]"
    >
      Connect Google
    </a>
  );
}
