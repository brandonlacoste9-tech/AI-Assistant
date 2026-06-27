import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { BRAND_NAME, getSiteUrl } from "@/lib/site-config";
import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
import "./globals.css";

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const siteUrl = getSiteUrl();
  const fr = locale === "fr";

  const title = fr
    ? "JustBookMe — Réceptionniste IA bilingue pour salons & barbershops au Québec"
    : "JustBookMe — Bilingual AI Receptionist for Salons & Barbershops in Quebec";

  const description = fr
    ? "JustBookMe répond à vos appels manqués 24h/24, prend les rendez-vous et envoie des rappels SMS — en français et en anglais. Conçu pour les salons de coiffure, barbershops et entreprises de services au Québec. Essai gratuit 14 jours."
    : "JustBookMe answers missed calls 24/7, books appointments, and sends SMS reminders — in French and English. Built for hair salons, barbershops, and service businesses in Quebec. 14-day free trial, no credit card required.";

  const keywords = fr
    ? [
        "réceptionniste IA Québec",
        "réceptionniste virtuelle salon coiffure",
        "logiciel réservation salon Québec",
        "IA bilingue entreprise service",
        "appels manqués salon coiffure",
        "rappels SMS rendez-vous",
        "barbershop IA Montréal",
        "réceptionniste virtuelle bilingue",
        "prise de rendez-vous automatique",
        "logiciel salon esthétique Québec",
        "JustBookMe",
        "Loi 25 conforme",
        "IA pour PME Québec",
      ]
    : [
        "AI receptionist Quebec",
        "bilingual AI receptionist Canada",
        "salon booking software Quebec",
        "AI phone answering salon",
        "missed calls AI barbershop",
        "SMS appointment reminders Canada",
        "AI receptionist Montreal",
        "24/7 virtual receptionist hair salon",
        "French English AI receptionist",
        "Law 25 compliant AI",
        "appointment booking automation Quebec",
        "JustBookMe",
        "AI for service businesses Canada",
      ];

  return {
    title,
    description,
    keywords,
    authors: [{ name: BRAND_NAME }],
    creator: BRAND_NAME,
    publisher: BRAND_NAME,
    icons: { icon: "/logo.svg", apple: "/logo.svg" },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: siteUrl,
      languages: {
        "fr-CA": `${siteUrl}?lang=fr`,
        "en-CA": `${siteUrl}?lang=en`,
      },
    },
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: BRAND_NAME,
      locale: fr ? "fr_CA" : "en_CA",
      alternateLocale: fr ? "en_CA" : "fr_CA",
      type: "website",
      images: [
        {
          url: fr ? "/og-image-fr.png" : "/og-image.png",
          width: 1200,
          height: 630,
          alt: fr
            ? "JustBookMe — Réceptionniste IA bilingue pour le Québec"
            : "JustBookMe — Bilingual AI Receptionist for Quebec",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fr ? "/og-image-fr.png" : "/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    // Removed duplicate twitter block
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const siteUrl = getSiteUrl();
  const fr = locale === "fr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "JustBookMe",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: siteUrl,
        offers: {
          "@type": "Offer",
          price: "49",
          priceCurrency: "CAD",
          priceValidUntil: "2027-12-31",
        },
        description: fr
          ? "Réceptionniste IA bilingue pour salons de coiffure, barbershops et entreprises de services au Québec."
          : "Bilingual AI receptionist for hair salons, barbershops, and service businesses in Quebec.",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "38",
        },
      },
      {
        "@type": "Organization",
        name: "JustBookMe",
        url: siteUrl,
        logo: `${siteUrl}/logo.svg`,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          availableLanguage: ["French", "English"],
          areaServed: "CA",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Quebec, Canada",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: fr ? "Est-ce que ça ressemble à un robot?" : "Does it sound like a robot?",
            acceptedAnswer: {
              "@type": "Answer",
              text: fr
                ? "Non — voix naturelle entraînée sur des conversations réelles."
                : "No — it uses a voice LLM trained on natural conversation. Call our demo line to hear it.",
            },
          },
          {
            "@type": "Question",
            name: fr ? "Compatible avec mon agenda?" : "Will it integrate with my calendar?",
            acceptedAnswer: {
              "@type": "Answer",
              text: fr
                ? "Oui — Google Calendar et iCal dès le jour 1."
                : "Yes — Google Calendar and iCal on day one.",
            },
          },
          {
            "@type": "Question",
            name: fr ? "Mes données sont-elles sécurisées?" : "Is my data safe?",
            acceptedAnswer: {
              "@type": "Answer",
              text: fr
                ? "Hébergées au Canada, conformes à la Loi 25."
                : "Hosted in Canada, compliant with Quebec's Law 25 privacy legislation.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang={locale === "fr" ? "fr-CA" : "en-CA"} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Meta Pixel — base code */}
        {FB_PIXEL_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${FB_PIXEL_ID}');
fbq('track','PageView');
              `,
            }}
          />
        )}
        {/* Pixel noscript fallback */}
        {FB_PIXEL_ID && (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
      </head>
      <body className={`${dmSans.variable} ${playfair.variable} min-h-screen antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* Faded Global Background Image */}
          <div
            className="pointer-events-none fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat opacity-[0.04] dark:opacity-[0.06]"
            style={{ backgroundImage: "url('/bg-barbershop.jpg')" }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}