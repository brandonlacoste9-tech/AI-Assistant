import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDictionary(locale);
  return {
    title: t.meta.title,
    description: t.meta.description,
    icons: {
      icon: "/logo.svg",
      apple: "/logo.svg",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <html lang={locale === "fr" ? "fr-CA" : "en-CA"}>
      <body className={`${dmSans.variable} ${fraunces.variable} min-h-screen antialiased`}>
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}