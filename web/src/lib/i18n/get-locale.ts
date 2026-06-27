import { cookies, headers } from "next/headers";
import { LOCALE_COOKIE, type Locale } from "./types";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  if (cookieLocale === "fr" || cookieLocale === "en") return cookieLocale;

  const headerStore = await headers();
  const accept = headerStore.get("accept-language") ?? "";
  // Prefer French only for FR-primary browsers; default to EN for worldwide visitors
  const primaryLang = accept.split(",")[0]?.split(";")[0]?.trim().toLowerCase() ?? "";
  if (primaryLang.startsWith("fr")) return "fr";

  return "en";
}