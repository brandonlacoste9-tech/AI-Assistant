export type BusinessType = "salon" | "trade" | "office";

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
  if (type === "trade") {
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
  if (type === "office") {
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
  return fr
    ? [
        { name: "Coupe", duration_minutes: 45, price_cents: 4500 },
        { name: "Couleur", duration_minutes: 90, price_cents: 12000 },
        { name: "Barbe", duration_minutes: 30, price_cents: 2500 },
      ]
    : [
        { name: "Haircut", duration_minutes: 45, price_cents: 4500 },
        { name: "Color", duration_minutes: 90, price_cents: 12000 },
        { name: "Beard trim", duration_minutes: 30, price_cents: 2500 },
      ];
}

export function defaultVoiceInstructions(
  type: BusinessType,
  locale: "fr" | "en"
): string {
  const fr = locale === "fr";
  if (type === "trade") {
    return fr
      ? "Soyez confiant et très détendu. Agissez comme le barbier en chef. Mettez de l'avant notre expertise pour les dégradés et la taille de barbe."
      : "Be confident and laid-back. Act as the head barber. Emphasize our expertise in skin fades and precise beard trims.";
  }
  if (type === "office") {
    return fr
      ? "Soyez élégant, poli et accueillant. Recommandez toujours un soin supplémentaire (ex: pédicure avec une manucure)."
      : "Be elegant, polite, and welcoming. Soft-upsell complementary services (e.g., recommend a pedicure with a manicure).";
  }
  return fr
    ? "Soyez chaleureux et détendu. Proposez coupe, couleur ou barbe selon la demande."
    : "Be warm and relaxed. Offer haircut, color, or beard services based on what they need.";
}