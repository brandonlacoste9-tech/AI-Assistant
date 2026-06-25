import { HeroSection } from "@/components/marketing/hero-section";
import { VerticalsSection } from "@/components/marketing/verticals-section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SocialProof } from "@/components/marketing/social-proof";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import {
  BarChart3,
  Calendar,
  Check,
  MessageSquare,
  Phone,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { VapiWebCallButton } from "@/components/vapi-web-call-button";

const featureIcons = [Phone, Calendar, MessageSquare, Users, BarChart3];

export default async function HomePage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const fr = locale === "fr";

  return (
    <>
      <HeroSection dict={t} locale={locale} />

      {/* Interactive AI Demo Section */}
      <section className="relative overflow-hidden bg-[var(--surface-elevated)] py-20 border-b border-[var(--border)]">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <SectionHeading
            label={fr ? "Démo en direct" : "Live Demo"}
            title={fr ? "Parlez à notre réceptionniste IA" : "Talk to our AI Receptionist"}
          />
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--muted-fg)]">
            {fr 
              ? "Essayez-le par vous-même ! Cliquez ci-dessous pour parler avec notre concierge IA. Posez des questions sur nos tarifs, ou demandez à réserver une consultation." 
              : "Try it for yourself! Click below to speak with our AI concierge. Ask about our pricing, or try to book a consultation."}
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-xl w-full max-w-md flex justify-center">
              <VapiWebCallButton 
                assistantOverrides={{
                  name: "JustBookMe Demo",
                  voiceGreeting: fr 
                    ? "Bonjour, merci d'appeler Just Book Me. Je suis votre réceptionniste IA. Comment puis-je vous aider aujourd'hui?"
                    : "Hi, thanks for calling Just Book Me! I am the demo AI receptionist. How can I help you today?",
                  voiceInstructions: fr 
                    ? "You are the demo AI for JustBookMe. Speak French. Explain that JustBookMe costs $29/month for unlimited AI calls. We integrate with any scheduling system."
                    : "You are the demo AI for JustBookMe. Speak English. Explain that JustBookMe costs $29/month for unlimited AI calls. We integrate with any scheduling system.",
                  services: [
                    { id: "sales_call", name: "Sales Consultation", duration_minutes: 30, price_cents: 0 },
                    { id: "support", name: "Technical Support", duration_minutes: 15, price_cents: 0 }
                  ]
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <SocialProof locale={locale} />

      <VerticalsSection dict={t} />

      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            label={fr ? "Processus" : "Process"}
            title={t.howItWorks.title}
          />
          <ol className="mt-12 grid gap-6 sm:grid-cols-3">
            {t.howItWorks.steps.map((step, i) => (
              <li key={step} className="card group relative p-7 transition-shadow hover:shadow-lg">
                <span className="font-display flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)] text-lg font-bold text-white">
                  {i + 1}
                </span>
                <p className="mt-5 leading-relaxed text-[var(--foreground)]">{step}</p>
                {i < 2 && (
                  <span className="absolute -right-3 top-1/2 hidden h-0.5 w-6 bg-[var(--border)] sm:block" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface-elevated)] py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            label={fr ? "Fonctionnalités" : "Features"}
            title={t.features.title}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.items.map((item, i) => {
              const Icon = featureIcons[i] ?? Phone;
              return (
                <div
                  key={item.title}
                  className="card p-6 transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-light)]">
                    <Icon className="h-5 w-5 text-[var(--primary)]" />
                  </div>
                  <h3 className="mt-4 font-semibold text-[var(--foreground)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted-fg)]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="card overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="bg-gradient-to-br from-[var(--primary)] to-[#2a5080] p-8 sm:p-10">
                <Sparkles className="h-6 w-6 text-[var(--accent)]" />
                <h2 className="font-display mt-4 text-2xl font-semibold text-white sm:text-3xl">
                  {t.builtForQuebec.title}
                </h2>
                <ul className="mt-8 space-y-4">
                  {t.builtForQuebec.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/90">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                      <span className="text-sm leading-relaxed sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[var(--surface)] p-8 sm:p-10">
                <SectionHeading title={t.roi.title} />
                <div className="mt-6 space-y-3">
                  {t.roi.rows.map((row, i) => (
                    <div
                      key={row.label}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                        i === t.roi.rows.length - 1
                          ? "bg-[var(--teal-light)] border border-[var(--teal)]/20"
                          : "bg-[var(--muted)]"
                      }`}
                    >
                      <span className="text-sm text-[var(--muted-fg)]">{row.label}</span>
                      <span
                        className={`font-display font-semibold ${
                          i === t.roi.rows.length - 1 ? "text-[var(--teal)]" : "text-[var(--foreground)]"
                        }`}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm font-medium text-[var(--primary)]">{t.roi.punchline}</p>
                <Link
                  href="/pricing"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent-hover)] hover:underline"
                >
                  {fr ? "Voir les forfaits" : "See plans"}
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading label="FAQ" title={t.faq.title} />
          <dl className="mt-10 space-y-4">
            {t.faq.items.map((item) => (
              <div key={item.q} className="card p-6">
                <dt className="font-semibold text-[var(--foreground)]">{item.q}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-[var(--muted-fg)]">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}