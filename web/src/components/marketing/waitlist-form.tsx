"use client";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function WaitlistForm({ dict, locale }: { dict: Dictionary; locale: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const body = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, locale }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
        {dict.waitlist.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <Input name="business_name" placeholder={dict.waitlist.fields.businessName} required />
      <Input name="contact_name" placeholder={dict.waitlist.fields.contactName} required />
      <Input name="email" type="email" placeholder={dict.waitlist.fields.email} required />
      <Input name="phone" type="tel" placeholder={dict.waitlist.fields.phone} />
      <Input name="city" placeholder={dict.waitlist.fields.city} required />
      <select
        name="staff_count"
        className="h-11 rounded-lg border border-[var(--border)] bg-white px-3 text-sm"
        defaultValue="1-3"
      >
        <option value="1-3">1–3</option>
        <option value="4-8">4–8</option>
        <option value="9+">9+</option>
      </select>
      <select
        name="primary_pain"
        className="h-11 rounded-lg border border-[var(--border)] bg-white px-3 text-sm sm:col-span-2"
        required
      >
        <option value="">{dict.waitlist.fields.pain}</option>
        {dict.waitlist.pains.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "loading"}>
          {status === "loading" ? "…" : dict.waitlist.submit}
        </Button>
        {status === "error" && (
          <p className="mt-2 text-sm text-red-600">Error — please try again.</p>
        )}
      </div>
    </form>
  );
}