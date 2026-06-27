"use client";

import { useState } from "react";
import { Phone, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function PhoneSetupFlow({
  initialPhoneNumber,
  hasAssistant,
}: {
  initialPhoneNumber: string | null;
  hasAssistant: boolean;
}) {
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"idle" | "buying">("idle");
  const [areaCode, setAreaCode] = useState("514");

  const handleProvision = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/twilio/provision", {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to provision number");
      }

      if (data.phoneNumber) {
        setPhoneNumber(data.phoneNumber);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Provisioning failed";
      // If the shared number flow fails, offer the dedicated number flow
      if (hasAssistant) {
        setStep("buying");
      } else {
        setError(msg + " — Complete onboarding first to set up your AI voice agent.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNumber = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/settings/buy-number", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ areaCode }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to buy number");
      }

      if (data.phone_number) {
        setPhoneNumber(data.phone_number);
        setStep("idle");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Purchase failed";
      setError(msg);
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
            Keep your existing number and forward missed calls to your AI.
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-[var(--border)] pt-6">
        {!phoneNumber ? (
          <div className="rounded-lg border border-[var(--border)] bg-[var(--background-alt)] p-5">
            {step === "idle" ? (
              <>
                <h3 className="font-medium text-[var(--foreground)]">Step 1: Get your AI Number</h3>
                <p className="mt-1 text-sm text-[var(--muted-fg)] mb-4">
                  We&apos;ll assign a local phone number for your AI receptionist.
                </p>
                <button
                  onClick={handleProvision}
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generate Phone Number
                </button>
              </>
            ) : (
              <>
                <h3 className="font-medium text-[var(--foreground)]">Get a Dedicated Number</h3>
                <p className="mt-1 text-sm text-[var(--muted-fg)] mb-4">
                  Choose your preferred area code and we&apos;ll provision a dedicated local number for your business.
                </p>
                <div className="flex items-end gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-[var(--muted-fg)]">
                      Area Code
                    </label>
                    <select
                      value={areaCode}
                      onChange={(e) => setAreaCode(e.target.value)}
                      className="select-field w-24"
                    >
                      <option value="514">514</option>
                      <option value="438">438</option>
                      <option value="450">450</option>
                      <option value="418">418</option>
                      <option value="819">819</option>
                      <option value="581">581</option>
                      <option value="873">873</option>
                      <option value="367">367</option>
                    </select>
                  </div>
                  <button
                    onClick={handleBuyNumber}
                    disabled={loading}
                    className="btn-primary"
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Get Number
                  </button>
                </div>
              </>
            )}
            {error && (
              <div className="mt-3 flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
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
                Dial the following code on your business phone to forward unanswered calls to the AI:
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
