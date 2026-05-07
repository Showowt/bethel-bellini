import type { Metadata } from "next";

const SITE_URL = "https://bethel-bellini.vercel.app";

export const metadata: Metadata = {
  title: "Cumpleaños en el Beach Club #1 de Cartagena | Bethel Bellini",
  description:
    "Celebra tu cumpleaños en el mejor beach club de Cartagena. Cabañas VIP, DJ, menú personalizado, pastel y decoración en Isla Tierra Bomba. A solo 5 minutos de Bocagrande. ¡Reserva tu fiesta de cumpleaños hoy!",
  keywords: [
    "cumpleaños en playa cartagena",
    "cumpleaños beach club cartagena",
    "birthday cartagena",
    "cumpleaños isla tierra bomba",
    "fiesta de cumpleaños cartagena",
    "celebracion cumpleaños cartagena playa",
    "cumpleaños cartagena de indias",
    "party birthday cartagena colombia",
    "birthday beach club colombia",
    "fiesta privada cumpleaños cartagena",
    "cabaña vip cumpleaños cartagena",
    "bethel bellini cumpleaños",
  ],
  openGraph: {
    title: "Cumpleaños en el Beach Club #1 de Cartagena | Bethel Bellini",
    description:
      "Tu cumpleaños en Isla Tierra Bomba: cabaña VIP, DJ, menú a medida, pastel y decoración personalizada. El mejor beach club de Cartagena, a 5 min de Bocagrande. Reserva ahora.",
    type: "website",
    locale: "es_CO",
    alternateLocale: ["en_US"],
    siteName: "Bethel Bellini Beach Club",
    url: `${SITE_URL}/cumpleanos`,
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Fiesta de cumpleaños en la playa — Bethel Bellini Beach Club, Isla Tierra Bomba, Cartagena",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cumpleaños en el Mejor Beach Club de Cartagena | Bethel Bellini",
    description:
      "Cabañas VIP, DJ, menú personalizado y pastel en Isla Tierra Bomba. El beach club #1 de Cartagena para cumpleaños.",
    images: ["/hero-bg.jpg"],
  },
  alternates: {
    canonical: `${SITE_URL}/cumpleanos`,
    languages: {
      "es-CO": `${SITE_URL}/cumpleanos`,
      "en-US": `${SITE_URL}/cumpleanos`,
    },
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export default function CumpleanosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
