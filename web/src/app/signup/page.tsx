import { SectionHeading } from "@/components/marketing/section-heading";
import { SignupForm } from "@/components/signup/signup-form";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import Link from "next/link";
import { Suspense } from "react";

export default async function SignupPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-md px-4 sm:px-6">
        <SectionHeading title={t.signup.title} description={t.signup.subtitle} />
        <p className="mt-4 text-center text-sm text-[var(--muted-fg)]">
          {locale === "fr" ? (
            <>
              Accès anticipé —{" "}
              <Link href="/#waitlist" className="font-semibold text-[var(--primary)] hover:underline">
                rejoignez la liste d&apos;attente
              </Link>{" "}
              pour une place fondateur (recommandé).
            </>
          ) : (
            <>
              Early access —{" "}
              <Link href="/#waitlist" className="font-semibold text-[var(--primary)] hover:underline">
                join the waitlist
              </Link>{" "}
              for a founder spot (recommended).
            </>
          )}
        </p>
        <div className="card mt-8 p-6 sm:p-8">
          <Suspense fallback={<p className="text-sm text-[var(--muted-fg)]">Loading…</p>}>
            <SignupForm dict={t} locale={locale} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}