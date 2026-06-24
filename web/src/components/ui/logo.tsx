import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function Logo({
  className,
  showWordmark = true,
  size = 36,
  variant = "dark",
}: {
  className?: string;
  showWordmark?: boolean;
  size?: number;
  variant?: "dark" | "light";
}) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)}>
      <Image
        src="/logo.svg"
        alt=""
        width={size}
        height={size}
        className="shrink-0 transition-transform group-hover:scale-105"
        priority
      />
      {showWordmark && (
        <span
          className={cn(
            "font-display text-lg font-semibold",
            variant === "light" ? "text-white" : "text-[var(--foreground)]"
          )}
        >
          RendezVous<span className="text-[var(--accent)]">.</span>
        </span>
      )}
    </Link>
  );
}