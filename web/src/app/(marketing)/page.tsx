import { HeroSection } from "@/components/marketing/hero-section";
import { VerticalsSection } from "@/components/marketing/verticals-section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { CaseStudySection } from "@/components/marketing/case-study-section";
import { SocialProof } from "@/components/marketing/social-proof";
import { RoiCalculator } from "@/components/marketing/roi-calculator";
import { PricingSection } from "@/components/pricing/pricing-section";
import { FadeIn } from "@/components/ui/fade-in";
import { AiPhoneFrame } from "@/components/marketing/ai-phone-frame";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/get-locale";
import {
  BarChart3,
  Calendar,
  MessageSquare,
  Phone,
  Users,
} from "lucide-react";
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
      <section id="demo" className="relative overflow-hidden py-24">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--hero-from)] via-[var(--hero-to)] to-[var(--background)] opacity-95" />
        {/* Radial glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[var(--accent)] opacity-5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                {fr ? "Démo en direct" : "Live Demo — No account needed"}
              </span>
              <h2 className="font-display mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {fr ? "Parlez à l'IA" : "Talk to the AI."}
                <br />
                <span className="text-[var(--accent)]">
                  {fr ? "Maintenant. Gratuitement." : "Right now. For free."}
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">
                {fr
                  ? "Cliquez ci-dessous et parlez à notre réceptionniste IA. Aucun compte nécessaire."
                  : "Click below and speak to our AI receptionist. This is exactly what your clients will hear when they call your salon after hours."}
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 flex justify-center">
            <FadeIn delay={0.2} className="flex flex-col items-center justify-center w-full max-w-sm">
              <AiPhoneFrame
                name={fr ? "Marie — Réceptionniste IA" : "Sarah — AI Receptionist"}
                title={fr ? "JustBookMe · Démo en direct" : "JustBookMe · Live Demo"}
              >
                <VapiWebCallButton
                  assistantOverrides={{
                    name: "Salon Demo AI",
                    voiceGreeting: fr
                      ? "Bonjour, merci d'appeler notre salon ! Je suis votre réceptionniste IA. Comment puis-je vous aider aujourd'hui ?"
                      : "Hi, thanks for calling! I'm the AI receptionist for this salon. How can I help you today?",
                    voiceInstructions: fr
                      ? "Tu es la réceptionniste IA d'un salon de coiffure haut de gamme pour femmes. Tu parles français. Ce salon est EXCLUSIVEMENT pour les femmes — ne demande JAMAIS si c'est pour un homme ou une femme. Assume toujours que la cliente est une femme. Tes services sont: coupes, balayage, couleur, mèches, soins capillaires et coiffures événementielles. Sois chaleureuse, élégante et professionnelle. Si la cliente veut prendre rendez-vous, demande quel service, puis la date et l'heure souhaitées, puis son nom et numéro de téléphone. IMPORTANT : À la fin de la conversation, mentionne naturellement que ceci est une démo JustBookMe — et que lorsqu'un salon achète le service, il peut personnaliser ton nom, ta voix, tes services, ton horaire, et bien plus encore."
                      : "You are the AI receptionist for a high-end women's hair salon. This salon serves WOMEN ONLY — never ask if they are male or female, never offer men's services. Assume every caller is a woman. Your services are: women's haircuts and styling, balayage, highlights, hair color, keratin treatments, and blowouts. Be warm, elegant, and professional. If the caller wants to book, ask which service they want, then their preferred date and time, then their name and phone number. Prices start at $65 for a cut and style. IMPORTANT: At a natural point near the end of the conversation — or if they ask about the AI — mention that this is a JustBookMe demo. When a salon purchases the service, they can fully customize you: your name, your voice, your services, your hours, your personality, and even the language you speak. It's their AI, built exactly how they want it.",
                    services: [
                      { id: "cut_style", name: "Women's Cut & Blow Dry", duration_minutes: 60, price_cents: 7500 },
                      { id: "balayage", name: "Balayage / Highlights", duration_minutes: 120, price_cents: 18000 },
                      { id: "color", name: "Full Hair Color", duration_minutes: 90, price_cents: 13000 },
                      { id: "keratin", name: "Keratin Treatment", duration_minutes: 120, price_cents: 22000 },
                      { id: "blowout", name: "Blowout", duration_minutes: 30, price_cents: 4500 },
                    ],
                  }}
                />
              </AiPhoneFrame>
            </FadeIn>
          </div>

          <FadeIn delay={0.4}>
            <p className="mt-10 text-center text-sm text-white/30">
              {fr
                ? "Cette démo est alimentée par la même IA qui répondra aux appels de votre salon."
                : "This demo is powered by the same AI that will answer your salon's calls 24/7."}
            </p>
          </FadeIn>
        </div>
      </section>


      <FadeIn delay={0.1}>
        <CaseStudySection fr={fr} />
      </FadeIn>

      <FadeIn delay={0.2}>
        <SocialProof locale={locale} />
      </FadeIn>

      <FadeIn delay={0.3}>
        <VerticalsSection dict={t} />
      </FadeIn>

      <FadeIn>
        <section id="how-it-works" className="relative bg-[#0a0f1e] py-20">
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
      </FadeIn>

      <FadeIn>
        <section id="features" className="border-y border-white/10 bg-[#0d1117] py-20">
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
      </FadeIn>

      <FadeIn>
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <RoiCalculator fr={fr} />
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <div id="pricing">
          <PricingSection locale={locale} />
        </div>
      </FadeIn>


      <FadeIn>
        <section id="faq" className="bg-[#0a0f1e] py-20">
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
      </FadeIn>
    </>
  );
}