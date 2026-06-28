"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

type VideoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
};

export function VideoModal({ isOpen, onClose, videoUrl, title = "Walkthrough Video" }: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-sky-500/5 transition-all duration-300 sm:p-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Aspect Ratio Container (16:9) */}
        <div className="aspect-video w-full">
          <iframe
            src={videoUrl}
            title={title}
            className="h-full w-full rounded-xl border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 sm:top-4 sm:right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 border border-white/15 text-white/80 hover:text-white hover:bg-black/80 transition-colors shadow-lg"
          aria-label="Close video"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
