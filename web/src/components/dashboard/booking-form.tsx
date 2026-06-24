"use client";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Service = { id: string; name: string };

export function BookingForm({ dict, services }: { dict: Dictionary; services: Service[] }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: form.get("customer_name"),
        customer_phone: form.get("customer_phone"),
        service_id: form.get("service_id") || null,
        starts_at: form.get("starts_at"),
        notes: form.get("notes"),
      }),
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    e.currentTarget.reset();
    setStatus("idle");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="card w-full min-w-0 space-y-4 p-5">
      <h2 className="font-semibold text-[var(--foreground)]">{dict.dashboard.bookings.add}</h2>
      <Input name="customer_name" placeholder={dict.dashboard.bookings.customerName} required />
      <Input name="customer_phone" type="tel" placeholder={dict.dashboard.bookings.phone} />
      <select name="service_id" className="select-field" defaultValue="">
        <option value="">{dict.dashboard.bookings.serviceOptional}</option>
        {services.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
      <Input name="starts_at" type="datetime-local" required />
      <Input name="notes" placeholder={dict.dashboard.bookings.notes} />
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "…" : dict.dashboard.bookings.save}
      </Button>
      {status === "error" && (
        <p className="text-sm text-red-600">{dict.dashboard.bookings.error}</p>
      )}
    </form>
  );
}