"use client";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function SignupForm({ dict, locale }: { dict: Dictionary; locale: string }) {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") ?? "pro";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const form = new FormData(e.currentTarget);
    const body = {
      email: form.get("email"),
      password: form.get("password"),
      business_name: form.get("business_name"),
      city: form.get("city"),
      phone: form.get("phone"),
      default_language: form.get("default_language"),
      plan,
      locale,
    };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Signup failed");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Signup failed");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="font-medium text-green-800">{dict.signup.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="hidden" name="plan" value={plan} />
      <div>
        <label className="mb-1.5 block text-sm font-medium">{dict.signup.fields.email}</label>
        <Input name="email" type="email" required autoComplete="email" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">{dict.signup.fields.password}</label>
        <Input name="password" type="password" required minLength={8} autoComplete="new-password" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">{dict.signup.fields.businessName}</label>
        <Input name="business_name" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">{dict.signup.fields.city}</label>
          <Input name="city" required />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">{dict.signup.fields.phone}</label>
          <Input name="phone" type="tel" />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">{dict.signup.fields.language}</label>
        <select
          name="default_language"
          defaultValue={locale === "en" ? "en" : "fr"}
          className="h-11 w-full rounded-lg border border-[var(--border)] bg-white px-3 text-sm"
        >
          <option value="fr">{dict.signup.langOptions.fr}</option>
          <option value="en">{dict.signup.langOptions.en}</option>
        </select>
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "…" : dict.signup.submit}
      </Button>
      {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}
    </form>
  );
}