"use client";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Booking = {
  id: string;
  customer_name: string;
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
          <li key={b.id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-medium text-[var(--foreground)]">{b.customer_name}</p>
              <p className="text-sm text-[var(--muted-fg)]">{when}</p>
              {b.services?.name && (
                <p className="text-sm text-[var(--muted-fg)]">{b.services.name}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[var(--muted)] px-2.5 py-1 text-xs font-medium capitalize">
                {b.status}
              </span>
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
          </li>
        );
      })}
    </ul>
  );
}