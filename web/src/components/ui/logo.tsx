"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showWordmark = true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  size = 36,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <Link
      href={href}
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