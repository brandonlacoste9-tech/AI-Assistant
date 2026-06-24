"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({
  className,
  showWordmark = true,
  size = 36,
  variant = "dark",
  href = "/",
}: {
  className?: string;
  showWordmark?: boolean;
  size?: number;
  variant?: "dark" | "light";
  href?: string;
}) {
  return (
    <a
      href={href}
      className={cn("group relative z-50 inline-flex items-center gap-2.5", className)}
      aria-label="JustBookMe home"
    >
      <Image
        src="/logo.svg"
        alt=""
        width={size}
        height={size}
        className="pointer-events-none shrink-0 transition-transform group-hover:scale-105"
        priority
      />
      {showWordmark && (
        <span
          className={cn(
            "pointer-events-none font-display text-lg font-semibold",
            variant === "light" ? "text-white" : "text-[var(--foreground)]"
          )}
        >
          JustBook<span className="text-[var(--accent)]">Me</span>
        </span>
      )}
    </a>
  );
}