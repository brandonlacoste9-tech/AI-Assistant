import { PhoneCall, Sparkles, CalendarDays } from "lucide-react";
import { VapiWebCallButton } from "@/components/vapi-web-call-button";

export default function VicParkDemoPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#0a0a0a] text-[#ededed] font-sans">
      {/* Header */}
      <header className="flex h-20 items-center justify-between border-b border-white/10 px-6 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37] to-[#a38020]">
            <Sparkles className="h-5 w-5 text-black" />
          </div>
          <span className="text-xl font-bold tracking-widest text-[#d4af37] uppercase">Victoria Park Medispa</span>
        </div>
        <div className="hidden text-sm font-medium text-white/50 sm:block">
          AI Concierge Demo Environment
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden px-6 pb-24 pt-20 lg:px-12 lg:pb-32 lg:pt-28">
          {/* Subtle gold gradient background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#d4af37]/10 via-[#0a0a0a] to-[#0a0a0a]" />

          <div className="relative mx-auto max-w-5xl text-center">
            <h1 className="font-display text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Elevate the <span className="text-[#d4af37]">Aesthetic Journey.</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-white/70 sm:text-xl">
              What is the Westmount clinic losing to voicemail at 10 PM? Every missed call is a missed Fraxel or CoolSculpting consultation. 
              Meet your new digital concierge, trained specifically on Victoria Park&apos;s elite treatments.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
              {/* Web Call Button injected here */}
              <VapiWebCallButton 
                assistantOverrides={{
                  name: "Victoria Park Medispa",
                  services: [
                    { id: "vp_botox", name: "Botox & Dysport Injections", duration_minutes: 30, price_cents: 50000 },
                    { id: "vp_fraxel", name: "Fraxel Laser Skin Rejuvenation", duration_minutes: 60, price_cents: 80000 },
                    { id: "vp_coolsculpt", name: "CoolSculpting Body Contouring", duration_minutes: 90, price_cents: 120000 },
                    { id: "vp_prp", name: "PRP Hair Loss Consultation", duration_minutes: 45, price_cents: 40000 }
                  ],
                  voiceGreeting: "Welcome to Victoria Park Medispa, how can I elevate your aesthetic journey today?"
                }}
              />
            </div>

            <div className="mx-auto mt-16 max-w-3xl border border-white/10 bg-white/5 p-8 rounded-2xl backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white">How to test this concierge:</h3>
              <ul className="mt-6 space-y-4 text-left text-white/80">
                <li className="flex items-start gap-3">
                  <PhoneCall className="h-6 w-6 shrink-0 text-[#d4af37]" />
                  <span>Click the button above to start a live voice call directly from your browser.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="h-6 w-6 shrink-0 text-[#d4af37]" />
                  <span>Ask the AI about <strong>CoolSculpting</strong> or <strong>Fraxel Lasers</strong>. It already knows the treatments.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CalendarDays className="h-6 w-6 shrink-0 text-[#d4af37]" />
                  <span>Try to book a consultation. Notice how it asks qualifying questions first.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
