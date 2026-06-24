"use client";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Booking = {
  id: string;
  customer_name: string;
  customer_phone: string | null;
  starts_at: string;
  status: string;
  services: { name: string } | null;
};

export function BookingsList({
  dict,
  bookings,
  locale,
}: {
  dict: Dictionary;
  bookings: Booking[];
  locale: string;
}) {
  const router = useRouter();
  const [smsStatus, setSmsStatus] = useState<Record<string, "idle" | "loading" | "done" | "error">>(
    {}
  );

  async function sendConfirmation(id: string) {
    setSmsStatus((s) => ({ ...s, [id]: "loading" }));
    const res = await fetch("/api/sms/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ booking_id: id, template: "confirmation" }),
    });
    setSmsStatus((s) => ({ ...s, [id]: res.ok ? "done" : "error" }));
  }

  async function updateStatus(id: string, status: string) {
    await fetch("/api/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    router.refresh();
  }

  if (bookings.length === 0) {
    return (
      <p className="text-sm text-[var(--muted-fg)]">{dict.dashboard.bookings.empty}</p>
    );
  }

  return (
    <ul className="space-y-3">
      {bookings.map((b) => {
        const when = new Date(b.starts_at).toLocaleString(locale === "fr" ? "fr-CA" : "en-CA");
        return (
          <li key={b.id} className="card p-4">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="min-w-0">
                <p className="break-words font-medium text-[var(--foreground)]">{b.customer_name}</p>
                <p className="text-sm text-[var(--muted-fg)]">{when}</p>
                {b.services?.name && (
                  <p className="break-words text-sm text-[var(--muted-fg)]">{b.services.name}</p>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:justify-self-end">
                <span className="rounded-full bg-[var(--muted)] px-2.5 py-1 text-xs font-medium capitalize">
                  {b.status}
                </span>
                {b.customer_phone && b.status !== "cancelled" && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={smsStatus[b.id] === "loading"}
                    onClick={() => sendConfirmation(b.id)}
                  >
                    {smsStatus[b.id] === "done"
                      ? dict.dashboard.bookings.smsSent
                      : dict.dashboard.bookings.sendSms}
                  </Button>
                )}
                {b.status !== "cancelled" && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => updateStatus(b.id, "cancelled")}
                  >
                    {dict.dashboard.bookings.cancel}
                  </Button>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}