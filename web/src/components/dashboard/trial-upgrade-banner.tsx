"use client";

import { useState } from "react";
import { Sparkles, X } from "lucide-react";

export function TrialUpgradeBanner({
  daysLeft,
  locale,
}: {
  daysLeft: number;
  locale: string;
}) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || daysLeft > 7) return null;

  const fr = locale === "fr";
  const urgent = daysLeft <= 3;

  const message = fr
    ? daysLeft <= 0
      ? "Votre essai est terminé. Abonnez-vous pour continuer à utiliser votre réceptionniste IA."
      : `Il vous reste ${daysLeft} jour${daysLeft > 1 ? "s" : ""} d'essai. Abonnez-vous maintenant pour ne rien perdre.`
    : daysLeft <= 0
      ? "Your trial has ended. Subscribe now to keep your AI receptionist active."
      : `${daysLeft} day${daysLeft > 1 ? "s" : ""} left in your trial. Subscribe now to keep everything running.`;

  const ctaText = fr ? "Voir les forfaits" : "View Plans";

  return (
    <div
      className={`relative mb-6 flex items-center gap-3 rounded-xl border px-4 py-3 ${
        urgent
          ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30"
          : "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30"
      }`}
    >
      <Sparkles
        className={`h-5 w-5 shrink-0 ${urgent ? "text-red-600" : "text-amber-600"}`}
      />
      <p
        className={`flex-1 text-sm font-medium ${
          urgent ? "text-red-800 dark:text-red-200" : "text-amber-800 dark:text-amber-200"
        }`}
      >
        {message}
      </p>
      <a
        href="/dashboard/settings?subscribe=starter&interval=month#billing"
        className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium text-white transition-colors ${
          urgent
            ? "bg-red-600 hover:bg-red-700"
            : "bg-amber-600 hover:bg-amber-700"
        }`}
      >
        {ctaText}
      </a>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="shrink-0 rounded p-1 text-[var(--muted-fg)] hover:text-[var(--foreground)]"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
