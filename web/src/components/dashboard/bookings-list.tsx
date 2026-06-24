"use client";

import { DeleteItemButton } from "@/components/dashboard/delete-item-button";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Booking = {
  id: string;
  customer_name: string;
  customer_phone: string | null;
  starts_at: string;
  status: string;
  services: { name: string } | null;
};

const STATUSES = ["booked", "confirmed", "cancelled", "no_show", "completed"] as const;
type Filter = "upcoming" | "past" | "all";

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
  const [filter, setFilter] = useState<Filter>("upcoming");
  const [smsStatus, setSmsStatus] = useState<Record<string, "idle" | "loading" | "done" | "error">>(
    {}
  );

  const statusLabels: Record<string, string> = {
    booked: dict.dashboard.bookings.statuses.booked,
    confirmed: dict.dashboard.bookings.statuses.confirmed,
    cancelled: dict.dashboard.bookings.statuses.cancelled,
    no_show: dict.dashboard.bookings.statuses.noShow,
    completed: dict.dashboard.bookings.statuses.completed,
  };

  const filtered = useMemo(() => {
    const now = Date.now();
    return bookings.filter((b) => {
      const t = new Date(b.starts_at).getTime();
      if (filter === "upcoming") return t >= now && b.status !== "cancelled";
      if (filter === "past") return t < now || b.status === "cancelled";
      return true;
    });
  }, [bookings, filter]);

  async function sendSms(id: string, template: "confirmation" | "reminder") {
    setSmsStatus((s) => ({ ...s, [id]: "loading" }));
    const res = await fetch("/api/sms/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ booking_id: id, template }),
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

  async function deleteBooking(id: string) {
    const res = await fetch(`/api/bookings?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (!res.ok) return false;
    router.refresh();
    return true;
  }

  const filters: { key: Filter; label: string }[] = [
    { key: "upcoming", label: dict.dashboard.bookings.filterUpcoming },
    { key: "past", label: dict.dashboard.bookings.filterPast },
    { key: "all", label: dict.dashboard.bookings.filterAll },
  ];

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              filter === f.key
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--muted)] text-[var(--muted-fg)] hover:text-[var(--foreground)]"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-[var(--muted-fg)]">{dict.dashboard.bookings.empty}</p>
      ) : (
        <ul className="space-y-3">
          {filtered.map((b) => {
            const when = new Date(b.starts_at).toLocaleString(locale === "fr" ? "fr-CA" : "en-CA");
            const sms = smsStatus[b.id];
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
                    <select
                      className="select-field min-w-[120px] text-sm"
                      value={b.status}
                      onChange={(e) => updateStatus(b.id, e.target.value)}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {statusLabels[s]}
                        </option>
                      ))}
                    </select>
                    {b.customer_phone && b.status !== "cancelled" && (
                      <>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          disabled={sms === "loading"}
                          onClick={() => sendSms(b.id, "confirmation")}
                        >
                          {sms === "done" ? dict.dashboard.bookings.smsSent : dict.dashboard.bookings.sendSms}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          disabled={sms === "loading"}
                          onClick={() => sendSms(b.id, "reminder")}
                        >
                          {dict.dashboard.bookings.sendReminder}
                        </Button>
                      </>
                    )}
                    {sms === "error" && (
                      <span className="text-xs text-red-600">{dict.dashboard.bookings.smsError}</span>
                    )}
                    <DeleteItemButton
                      label={dict.dashboard.common.delete}
                      confirmMessage={dict.dashboard.common.deleteConfirmBooking}
                      errorMessage={dict.dashboard.common.deleteError}
                      onDelete={() => deleteBooking(b.id)}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}