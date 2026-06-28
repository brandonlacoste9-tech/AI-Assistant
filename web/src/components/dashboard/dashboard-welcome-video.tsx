"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { VideoModal } from "@/components/ui/video-modal";
import { DEMO_VIDEO_URL } from "@/lib/site-config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function DashboardWelcomeVideo({ dict }: { dict: Dictionary }) {
  const [isOpen, setIsOpen] = useState(false);

  // Automatically trigger modal on mount if localstorage key doesn't exist
  useEffect(() => {
    const walkthroughSeen = localStorage.getItem("justbookme_walkthrough_seen");
    if (walkthroughSeen !== "true") {
      setIsOpen(true);
    }
  }, []);

  function handleClose() {
    setIsOpen(false);
    localStorage.setItem("justbookme_walkthrough_seen", "true");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--primary)]/20 bg-[var(--primary-light)] px-3 py-1 text-xs font-medium text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors duration-200"
      >
        <Play className="h-3 w-3 fill-current" />
        {dict.dashboard.watchWalkthrough}
      </button>

      <VideoModal
        isOpen={isOpen}
        onClose={handleClose}
        videoUrl={DEMO_VIDEO_URL}
        title={dict.dashboard.watchWalkthrough}
      />
    </>
  );
}
