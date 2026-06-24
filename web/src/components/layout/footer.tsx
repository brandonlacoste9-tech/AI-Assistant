import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";
import Link from "next/link";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-lg font-semibold text-[var(--foreground)]">{t.footer.cta}</p>
            <p className="mt-1 text-sm text-[var(--muted-fg)]">{t.footer.rights}</p>
          </div>
          <Link
            href="/signup?plan=pro"
            className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--primary-hover)]"
          >
            {locale === "fr" ? "Commencer l'essai" : "Start trial"}
          </Link>
        </div>
        <div className="mt-8 flex gap-6 text-sm text-[var(--muted-fg)]">
          <span>{t.footer.privacy}</span>
          <span>{t.footer.terms}</span>
          <a href="mailto:contact@rendezvousai.ca" className="hover:text-[var(--foreground)]">
            contact@rendezvousai.ca
          </a>
        </div>
      </div>
    </footer>
  );
}