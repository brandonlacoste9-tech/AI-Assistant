import { SignupForm } from "@/components/signup/signup-form";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import { Suspense } from "react";

export default async function SignupPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-md px-4 sm:px-6">
        <h1 className="text-2xl font-bold">{t.signup.title}</h1>
        <p className="mt-2 text-[var(--muted-fg)]">{t.signup.subtitle}</p>
        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
          <Suspense fallback={<p className="text-sm text-[var(--muted-fg)]">Loading…</p>}>
            <SignupForm dict={t} locale={locale} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}