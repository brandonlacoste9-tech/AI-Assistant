"use client";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import { useRouter } from "next/navigation";

type Lead = {
  id: string;
  contact_name: string;
  contact_phone: string | null;
  source: string;
  pipeline_stage: string;
  captured_at: string;
};

const STAGES = ["new", "contacted", "booked", "lost"] as const;

export function LeadsList({
  dict,
  leads,
  locale,
}: {
  dict: Dictionary;
  leads: Lead[];
  locale: string;
}) {
  const router = useRouter();

  async function updateStage(id: string, pipeline_stage: string) {
    await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, pipeline_stage }),
    });
    router.refresh();
  }

  if (leads.length === 0) {
    return <p className="text-sm text-[var(--muted-fg)]">{dict.dashboard.leads.empty}</p>;
  }

  const stageLabels: Record<string, string> = {
    new: dict.dashboard.leads.stages.new,
    contacted: dict.dashboard.leads.stages.contacted,
    booked: dict.dashboard.leads.stages.booked,
    lost: dict.dashboard.leads.stages.lost,
  };

  return (
    <ul className="space-y-3">
      {leads.map((lead) => {
        const when = new Date(lead.captured_at).toLocaleDateString(
          locale === "fr" ? "fr-CA" : "en-CA"
        );
        return (
          <li key={lead.id} className="card p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium text-[var(--foreground)]">{lead.contact_name}</p>
                {lead.contact_phone && (
                  <p className="text-sm text-[var(--muted-fg)]">{lead.contact_phone}</p>
                )}
                <p className="mt-1 text-xs text-[var(--muted-fg)]">
                  {lead.source} · {when}
                </p>
              </div>
              <select
                className="select-field w-auto min-w-[140px]"
                value={lead.pipeline_stage}
                onChange={(e) => updateStage(lead.id, e.target.value)}
              >
                {STAGES.map((s) => (
                  <option key={s} value={s}>
                    {stageLabels[s]}
                  </option>
                ))}
              </select>
            </div>
          </li>
        );
      })}
    </ul>
  );
}