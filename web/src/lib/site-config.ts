export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ||
    "https://resilient-khapse-ecd31c.netlify.app"
  );
}

export function getCalendlyUrl(): string {
  const url = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();
  if (url) return url;
  return "mailto:contact@rendezvousai.ca?subject=Demo%2015%20min%20%E2%80%94%20RendezVous%20AI";
}

export function isCalendlyExternal(): boolean {
  const url = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();
  return Boolean(url && url.startsWith("http"));
}