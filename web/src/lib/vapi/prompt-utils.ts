export function displayBusinessName(name: string): string {
  return name.replace(/\s*test\s*$/i, "").trim() || name;
}

export function montrealTodayIso(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/Montreal" });
}

export function salonFirstMessage(businessName: string, locale: "fr" | "en" = "fr"): string {
  const name = displayBusinessName(businessName);
  if (locale === "en") {
    return `Thanks for calling ${name}. I can help you book, reschedule, or cancel an appointment. What would you like to do today?`;
  }
  return `Bonjour, bienvenue chez ${name}. Je peux vous aider à prendre, modifier ou annuler un rendez-vous. Comment puis-je vous aider?`;
}