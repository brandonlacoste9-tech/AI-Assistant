export type BusinessType = "salon" | "barbershop" | "clinic" | "office" | "beauty";

export type ServicePreset = {
  name: string;
  duration_minutes: number;
  price_cents: number;
};

export function defaultServicesForType(
  type: BusinessType,
  locale: "fr" | "en"
): ServicePreset[] {
  const fr = locale === "fr";

  if (type === "barbershop") {
    return fr
      ? [
          { name: "Coupe homme", duration_minutes: 30, price_cents: 3500 },
          { name: "Dégradé (Fade)", duration_minutes: 45, price_cents: 4500 },
          { name: "Taille de barbe", duration_minutes: 30, price_cents: 2500 },
          { name: "Coupe + Barbe", duration_minutes: 60, price_cents: 5500 },
        ]
      : [
          { name: "Men's Haircut", duration_minutes: 30, price_cents: 3500 },
          { name: "Skin Fade", duration_minutes: 45, price_cents: 4500 },
          { name: "Beard Trim", duration_minutes: 30, price_cents: 2500 },
          { name: "Haircut & Beard", duration_minutes: 60, price_cents: 5500 },
        ];
  }

  if (type === "clinic") {
    return fr
      ? [
          { name: "Consultation générale", duration_minutes: 30, price_cents: 10000 },
          { name: "Examen de suivi", duration_minutes: 20, price_cents: 7500 },
          { name: "Nettoyage dentaire", duration_minutes: 60, price_cents: 15000 },
          { name: "Évaluation physiothérapie", duration_minutes: 45, price_cents: 12000 },
        ]
      : [
          { name: "General Consultation", duration_minutes: 30, price_cents: 10000 },
          { name: "Follow-up Appointment", duration_minutes: 20, price_cents: 7500 },
          { name: "Dental Cleaning", duration_minutes: 60, price_cents: 15000 },
          { name: "Physiotherapy Assessment", duration_minutes: 45, price_cents: 12000 },
        ];
  }

  if (type === "office") {
    return fr
      ? [
          { name: "Consultation initiale", duration_minutes: 60, price_cents: 25000 },
          { name: "Réunion de suivi", duration_minutes: 30, price_cents: 15000 },
          { name: "Révision de documents", duration_minutes: 45, price_cents: 20000 },
        ]
      : [
          { name: "Initial Consultation", duration_minutes: 60, price_cents: 25000 },
          { name: "Follow-up Meeting", duration_minutes: 30, price_cents: 15000 },
          { name: "Document Review", duration_minutes: 45, price_cents: 20000 },
        ];
  }

  if (type === "beauty") {
    return fr
      ? [
          { name: "Manucure", duration_minutes: 45, price_cents: 4500 },
          { name: "Pédicure", duration_minutes: 60, price_cents: 6500 },
          { name: "Pose de cils", duration_minutes: 90, price_cents: 12000 },
          { name: "Soin du visage", duration_minutes: 60, price_cents: 15000 },
        ]
      : [
          { name: "Manicure", duration_minutes: 45, price_cents: 4500 },
          { name: "Pedicure", duration_minutes: 60, price_cents: 6500 },
          { name: "Lash Extensions", duration_minutes: 90, price_cents: 12000 },
          { name: "Facial", duration_minutes: 60, price_cents: 15000 },
        ];
  }

  // salon (default)
  return fr
    ? [
        { name: "Coupe femme", duration_minutes: 45, price_cents: 6500 },
        { name: "Balayage", duration_minutes: 120, price_cents: 18000 },
        { name: "Couleur complète", duration_minutes: 90, price_cents: 13000 },
        { name: "Coupe + Brushing", duration_minutes: 60, price_cents: 8000 },
      ]
    : [
        { name: "Women's Cut & Style", duration_minutes: 45, price_cents: 6500 },
        { name: "Balayage", duration_minutes: 120, price_cents: 18000 },
        { name: "Full Color", duration_minutes: 90, price_cents: 13000 },
        { name: "Cut & Blowout", duration_minutes: 60, price_cents: 8000 },
      ];
}

export function defaultVoiceInstructions(
  type: BusinessType,
  locale: "fr" | "en"
): string {
  const fr = locale === "fr";

  if (type === "barbershop") {
    return fr
      ? "Soyez confiant et très détendu. Agissez comme le barbier en chef. Mettez de l'avant notre expertise pour les dégradés et la taille de barbe."
      : "Be confident and laid-back. Act as the head barber. Emphasize our expertise in skin fades and precise beard trims.";
  }
  if (type === "clinic") {
    return fr
      ? "Soyez professionnel, rassurant et précis. Aidez les patients à prendre rendez-vous rapidement. Ne donnez jamais de conseils médicaux."
      : "Be professional, reassuring, and precise. Help patients book appointments quickly. Never give medical advice.";
  }
  if (type === "office") {
    return fr
      ? "Soyez formel, efficace et professionnel. Aidez les clients à planifier des consultations et à laisser leurs coordonnées."
      : "Be formal, efficient, and professional. Help clients schedule consultations and leave their contact details.";
  }
  if (type === "beauty") {
    return fr
      ? "Soyez élégant, poli et accueillant. Recommandez toujours un soin complémentaire si approprié."
      : "Be elegant, polite, and welcoming. Soft-upsell complementary services when appropriate.";
  }
  // salon
  return fr
    ? "Soyez chaleureux et détendu. Proposez coupe, couleur ou balayage selon la demande."
    : "Be warm and relaxed. Offer haircuts, color, or balayage based on what they need.";
}
