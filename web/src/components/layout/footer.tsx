import { getDictionary } from "@/lib/i18n/dictionaries";
import { getContactEmail } from "@/lib/site-config";
import type { Locale } from "@/lib/i18n/types";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <footer className="border-t border-white/10 bg-[#0a0f1e] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
        {/* Top row */}
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-start">
          {/* Brand */}
          <div className="max-w-xs">
            <Logo showWordmark variant="light" />
            <p className="font-display mt-6 text-2xl font-semibold text-white leading-snug">
              {t.footer.cta}
            </p>
            <p className="mt-3 text-sm text-white/50">{t.footer.rights}</p>
          </div>

          {/* Nav columns */}
          <div className="flex flex-wrap gap-12 text-sm">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/30">Product</p>
              <Link href="/#features" className="text-white/60 transition-colors hover:text-white">Features</Link>
              <Link href="/#how-it-works" className="text-white/60 transition-colors hover:text-white">How it Works</Link>
              <Link href="/pricing" className="text-white/60 transition-colors hover:text-white">Pricing</Link>
              <Link href="/#faq" className="text-white/60 transition-colors hover:text-white">FAQ</Link>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/30">Company</p>
              <Link href="/privacy" className="text-white/60 transition-colors hover:text-white">{t.footer.privacy}</Link>
              <Link href="/terms" className="text-white/60 transition-colors hover:text-white">{t.footer.terms}</Link>
              <a href={`mailto:${getContactEmail()}`} className="text-white/60 transition-colors hover:text-white">
                {locale === "fr" ? "Questions? Écrivez-nous" : "Questions? Email us"}
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/30">Get Started</p>
              <Link href="/signup" className="btn-primary px-5 py-2.5 text-sm text-center">
                {locale === "fr" ? "Essai gratuit" : "Start free trial"}
              </Link>
              <Link href="/login" className="text-center text-sm text-white/50 hover:text-white transition-colors">
                {locale === "fr" ? "Connexion" : "Log in"}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/30">
          <p>© {new Date().getFullYear()} JustBookMe. {locale === "fr" ? "Tous droits réservés." : "All rights reserved."}</p>
          <p className="text-white/20">Built in Canada 🇨🇦 &middot; Serving businesses worldwide</p>
        </div>
      </div>
    </footer>
  );
}
