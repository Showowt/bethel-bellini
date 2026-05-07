import type { Metadata } from "next";

const SITE_URL = "https://bethel-bellini.vercel.app";

export const metadata: Metadata = {
  title: "Despedida de Solteros & Bachelorette en Isla Tierra Bomba | Bethel Bellini",
  description:
    "La mejor despedida de solteros y bachelorette party en Cartagena. Zona VIP privada, botella de champagne, DJ y vista al Caribe en Isla Tierra Bomba. Bachelor & bachelorette packages — Bethel Bellini Beach Club.",
  keywords: [
    "despedida de solteros cartagena",
    "despedida de soltera cartagena",
    "bachelorette cartagena",
    "bachelor party cartagena",
    "bachelorette party cartagena colombia",
    "despedida solteros isla tierra bomba",
    "bachelorette cartagena beach club",
    "bachelor cartagena colombia",
    "despedida de soltera beach club",
    "fiesta despedida cartagena playa",
    "best bachelorette cartagena",
    "bachelor bachelorette cartagena island",
    "bethel bellini despedida",
    "cartagena bachelorette island party",
  ],
  openGraph: {
    title: "Despedida de Solteros & Bachelorette | Bethel Bellini Cartagena",
    description:
      "La última fiesta antes del sí. Zona VIP, champagne, DJ y el Caribe de fondo en Isla Tierra Bomba — a 5 min de Bocagrande. Bachelor & bachelorette packages disponibles.",
    type: "website",
    locale: "es_CO",
    alternateLocale: ["en_US"],
    siteName: "Bethel Bellini Beach Club",
    url: `${SITE_URL}/despedida`,
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Bachelorette and bachelor party at Bethel Bellini Beach Club — Tierra Bomba Island, Cartagena",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Despedida de Solteros & Bachelorette en Cartagena | Bethel Bellini",
    description:
      "VIP zone, champagne, DJ and Caribbean views on Tierra Bomba Island. The #1 bachelorette & bachelor spot in Cartagena.",
    images: ["/hero-bg.jpg"],
  },
  alternates: {
    canonical: `${SITE_URL}/despedida`,
    languages: {
      "es-CO": `${SITE_URL}/despedida`,
      "en-US": `${SITE_URL}/despedida`,
    },
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export default function DespedidaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
