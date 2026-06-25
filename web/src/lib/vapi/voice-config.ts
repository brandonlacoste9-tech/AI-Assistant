export function getReceptionistVoice(defaultLanguage: "fr" | "en") {
  // ElevenLabs voices are natively multilingual, so Sarah can speak both English and French fluently.
  return { provider: "11labs" as const, voiceId: "rachel" }; // Using Rachel/Sarah equivalent
}

export function endCallMessage(defaultLanguage: "fr" | "en"): string {
  if (defaultLanguage === "en") {
    return "Thanks for calling. Have a wonderful day!";
  }
  return "Merci d'avoir appelé. Bonne journée!";
}

export function transferMessage(defaultLanguage: "fr" | "en"): string {
  if (defaultLanguage === "en") {
    return "I'll connect you with the team — one moment please.";
  }
  return "Je vous transfère à l'équipe — un instant.";
}