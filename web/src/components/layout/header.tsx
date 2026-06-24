import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";
import { DemoNavLink } from "@/components/ui/demo-link";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";

export function Header({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)]/80 bg-[var(--background)]/90 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--muted-fg)] md:flex">
          <Link href="/pricing" className="transition-colors hover:text-[var(--primary)]">
            {t.nav.pricing}
          </Link>
          <DemoNavLink>{t.nav.demo}</DemoNavLink>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle locale={locale} />
          <Link href="/#waitlist" className="btn-primary hidden px-4 py-2 text-sm sm:inline-flex">
            {t.nav.trial}
          </Link>
        </div>
      </div>
    </header>
  );
}