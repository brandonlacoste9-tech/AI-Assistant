"use client";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function VoiceSettingsCard({
  dict,
  assistantId,
  phoneNumber,
  platformPhone,
}: {
  dict: Dictionary;
  assistantId: string | null;
  phoneNumber: string | null;
  platformPhone: string | null;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const line = phoneNumber || platformPhone;
  const ready = Boolean(assistantId);

  async function syncVoice() {
    setStatus("loading");
    setMessage(null);
    const res = await fetch("/api/voice/provision", { method: "POST" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus("error");
      setMessage(data.error ?? dict.dashboard.voice.syncError);
      return;
    }
    setStatus("done");
    setMessage(dict.dashboard.voice.syncDone);
    router.refresh();
  }

  return (
    <div className="card mt-8 p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-light)]">
          <Phone className="h-5 w-5 text-[var(--primary)]" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-[var(--foreground)]">{dict.dashboard.voice.title}</h2>
          <p className="mt-1 text-sm text-[var(--muted-fg)]">{dict.dashboard.voice.subtitle}</p>

          <dl className="mt-4 space-y-3 text-sm">
            <div className="grid gap-1 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-4">
              <dt className="text-[var(--muted-fg)]">{dict.dashboard.voice.status}</dt>
              <dd className="font-medium text-[var(--foreground)]">
                {ready ? dict.dashboard.voice.statusReady : dict.dashboard.voice.statusPending}
              </dd>
            </div>
            {line && (
              <div className="grid gap-1 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-4">
                <dt className="shrink-0 text-[var(--muted-fg)]">{dict.dashboard.voice.line}</dt>
                <dd className="font-medium text-[var(--foreground)]">{line}</dd>
              </div>
            )}
            {assistantId && (
              <div className="grid gap-1 sm:grid-cols-[auto_1fr] sm:gap-4">
                <dt className="text-[var(--muted-fg)]">{dict.dashboard.voice.agentId}</dt>
                <dd className="break-all font-mono text-xs text-[var(--muted-fg)]">{assistantId}</dd>
              </div>
            )}
          </dl>

          <p className="mt-4 text-xs text-[var(--muted-fg)]">{dict.dashboard.voice.sharedLineNote}</p>

          <Button
            type="button"
            variant="secondary"
            className="mt-4"
            onClick={syncVoice}
            disabled={status === "loading"}
          >
            {status === "loading" ? dict.dashboard.voice.syncing : dict.dashboard.voice.syncCta}
          </Button>

          {message && (
            <p className={`mt-3 text-sm ${status === "error" ? "text-red-600" : "text-[var(--teal)]"}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}