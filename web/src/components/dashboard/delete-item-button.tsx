"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";

export function DeleteItemButton({
  label,
  confirmMessage,
  onDelete,
}: {
  label: string;
  confirmMessage: string;
  onDelete: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!window.confirm(confirmMessage)) return;
    setLoading(true);
    try {
      await onDelete();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      aria-label={label}
      title={label}
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[var(--muted-fg)] transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}