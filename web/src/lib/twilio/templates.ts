type BookingSmsParams = {
  businessName: string;
  customerName: string;
  startsAt: Date;
  serviceName?: string | null;
  locale: "fr" | "en";
};

export function bookingConfirmationSms(p: BookingSmsParams): string {
  const when = p.startsAt.toLocaleString(p.locale === "fr" ? "fr-CA" : "en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Montreal",
  });

  if (p.locale === "fr") {
    const svc = p.serviceName ? ` (${p.serviceName})` : "";
    return `${p.businessName}: Bonjour ${p.customerName}, votre rendez-vous${svc} est confirmé pour ${when}. Répondez ANNULER pour annuler.`;
  }

  const svc = p.serviceName ? ` (${p.serviceName})` : "";
  return `${p.businessName}: Hi ${p.customerName}, your appointment${svc} is confirmed for ${when}. Reply CANCEL to cancel.`;
}

export function bookingReminderSms(p: BookingSmsParams): string {
  const time = p.startsAt.toLocaleString(p.locale === "fr" ? "fr-CA" : "en-CA", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Montreal",
  });

  if (p.locale === "fr") {
    return `${p.businessName}: Rappel — rendez-vous demain à ${time}. Répondez OUI pour confirmer ou ANNULER.`;
  }

  return `${p.businessName}: Reminder — appointment tomorrow at ${time}. Reply YES to confirm or CANCEL.`;
}