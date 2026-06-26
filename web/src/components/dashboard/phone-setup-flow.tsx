"use client";

import { useState } from "react";
import { Phone, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function PhoneSetupFlow({
  dict,
  initialPhoneNumber,
}: {
  dict: Dictionary;
  initialPhoneNumber: string | null;
}) {
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProvision = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/twilio/provision", {
        method: "POST",
      });
      
      if (!res.ok) {
        throw new Error("Failed to provision number");
      }
      
      const data = await res.json();
      if (data.phoneNumber) {
        setPhoneNumber(data.phoneNumber);
      }
    } catch (err: any) {
      setError("Number provisioning is not yet available in the backend. Please contact support to manually assign a number.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mt-8 p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
          <Phone className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-semibold text-[var(--foreground)]">Call Forwarding Setup</h2>
          <p className="text-sm text-[var(--muted-fg)]">
            Keep your existing salon number and forward missed calls to your AI.
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-[var(--border)] pt-6">
        {!phoneNumber ? (
          <div className="rounded-lg border border-[var(--border)] bg-[var(--background-alt)] p-5">
            <h3 className="font-medium text-[var(--foreground)]">Step 1: Get your AI Number</h3>
            <p className="mt-1 text-sm text-[var(--muted-fg)] mb-4">
              We will generate a unique local phone number for your AI receptionist.
            </p>
            <button
              onClick={handleProvision}
              disabled={loading}
              className="btn-primary"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Phone Number
            </button>
            {error && (
              <div className="mt-3 flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-start gap-4 rounded-lg border border-green-200 bg-green-50 p-5 dark:border-green-900/30 dark:bg-green-900/10">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600 dark:text-green-500" />
              <div>
                <h3 className="font-medium text-green-900 dark:text-green-300">Your AI Number is Ready</h3>
                <p className="mt-1 text-2xl font-bold text-green-700 dark:text-green-400">
                  {phoneNumber}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-[var(--border)] bg-[var(--background-alt)] p-5">
              <h3 className="font-medium text-[var(--foreground)]">Step 2: Forward Missed Calls</h3>
              <p className="mt-1 text-sm text-[var(--muted-fg)]">
                Dial the following code on your salon's phone (the one you currently use) to forward unanswered calls to the AI:
              </p>
              
              <div className="mt-4 space-y-3">
                <div className="rounded bg-[var(--background)] p-3 flex justify-between items-center border border-[var(--border)]">
                  <span className="text-sm font-medium">Bell / Telus / Rogers</span>
                  <code className="bg-[var(--muted)] px-2 py-1 rounded text-[var(--accent)] font-bold">
                    *71 {phoneNumber.replace("+1", "")}
                  </code>
                </div>
                <div className="rounded bg-[var(--background)] p-3 flex justify-between items-center border border-[var(--border)]">
                  <span className="text-sm font-medium">Videotron</span>
                  <code className="bg-[var(--muted)] px-2 py-1 rounded text-[var(--accent)] font-bold">
                    *92 {phoneNumber.replace("+1", "")}
                  </code>
                </div>
              </div>
              
              <p className="mt-4 text-xs text-[var(--muted-fg)]">
                To disable call forwarding at any time, dial *73.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
