import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";
import { LanguageToggle } from "@/components/ui/language-toggle";
import Link from "next/link";

export function Header({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-[var(--foreground)]">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)] text-sm text-white">
            RV
          </span>
          <span>RendezVous AI</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--muted-fg)] md:flex">
          <Link href="/pricing" className="hover:text-[var(--foreground)]">
            {t.nav.pricing}
          </Link>
          <Link href="/#waitlist" className="hover:text-[var(--foreground)]">
            {t.nav.demo}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle locale={locale} />
          <Link
            href="/signup?plan=pro"
            className="hidden rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--primary-hover)] sm:inline-flex"
          >
            {t.nav.trial}
          </Link>
        </div>
      </div>
    </header>
  );
}