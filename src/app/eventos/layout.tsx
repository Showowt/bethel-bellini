import type { Metadata } from "next";

const SITE_URL = "https://bethel-bellini.vercel.app";

export const metadata: Metadata = {
  title: "Eventos Privados y Corporativos en Cartagena | Bethel Bellini",
  description:
    "Organiza tu evento privado, corporativo o social en Bethel Bellini Beach Club, Isla Tierra Bomba. Lanzamientos de producto, bodas, cenas privadas, team buildings y celebraciones exclusivas. Capacidad hasta 200 personas. Cartagena de Indias.",
  keywords: [
    "eventos privados cartagena",
    "eventos corporativos cartagena",
    "private events cartagena",
    "corporate events cartagena",
    "eventos isla tierra bomba",
    "salón de eventos cartagena playa",
    "lanzamiento producto cartagena",
    "bodas cartagena beach club",
    "cena privada cartagena",
    "team building cartagena",
    "eventos exclusivos cartagena",
    "alquiler beach club cartagena",
    "bethel bellini eventos",
    "venue cartagena private event",
    "event venue cartagena colombia",
  ],
  openGraph: {
    title: "Eventos Privados y Corporativos | Bethel Bellini Beach Club Cartagena",
    description:
      "El venue más exclusivo de Cartagena para eventos privados y corporativos. Isla Tierra Bomba: piscina infinity, capacidad 200+, catering premium y producción audiovisual. A 5 min de Bocagrande.",
    type: "website",
    locale: "es_CO",
    alternateLocale: ["en_US"],
    siteName: "Bethel Bellini Beach Club",
    url: `${SITE_URL}/eventos`,
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Eventos privados y corporativos en Bethel Bellini Beach Club — Isla Tierra Bomba, Cartagena",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eventos Privados y Corporativos en Cartagena | Bethel Bellini",
    description:
      "El venue ideal para eventos exclusivos en Cartagena. Isla Tierra Bomba, capacidad 200+, catering premium. 5 min desde Bocagrande.",
    images: ["/hero-bg.jpg"],
  },
  alternates: {
    canonical: `${SITE_URL}/eventos`,
    languages: {
      "es-CO": `${SITE_URL}/eventos`,
      "en-US": `${SITE_URL}/eventos`,
    },
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export default function EventosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
