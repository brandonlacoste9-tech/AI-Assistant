"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/tailwind";

export function Logo({
  className,
}: {
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn("group relative z-50 inline-flex items-center", className)}
      aria-label="JustBookMe home"
    >
      <img
        src="/logo-new.png"
        alt="JustBookMe"
        className="pointer-events-none h-12 w-auto shrink-0 rounded-xl transition-transform group-hover:scale-105"
      />
    </Link>
  );
}