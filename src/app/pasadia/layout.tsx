import type { Metadata } from "next";

const SITE_URL = "https://bethel-bellini.vercel.app";

export const metadata: Metadata = {
  title: "Pasadía en el Mejor Beach Club de Cartagena | Bethel Bellini",
  description:
    "Disfruta el mejor pasadía de Cartagena en Isla Tierra Bomba. Piscina infinity, playa privada, gastronomía premium y cócteles artesanales. Day pass desde $150.000. A 5 minutos de Bocagrande. Cartagena day trip & day pass.",
  keywords: [
    "pasadía cartagena",
    "pasadia cartagena",
    "pasadía isla tierra bomba",
    "day trip cartagena",
    "cartagena day pass",
    "day pass cartagena beach club",
    "pasadia playa cartagena",
    "que hacer en cartagena",
    "planes cartagena de indias",
    "isla tierra bomba pasadia",
    "beach club cartagena pasadia",
    "mejor pasadía cartagena colombia",
    "cartagena day trip island",
    "things to do cartagena colombia",
    "cartagena beach day",
    "bethel bellini pasadia",
    "tierra bomba day pass",
  ],
  openGraph: {
    title: "Pasadía en el Mejor Beach Club de Cartagena | Bethel Bellini",
    description:
      "El pasadía definitivo en Cartagena: piscina infinity, playa privada, gastronomía premium y cócteles sobre el Caribe. Isla Tierra Bomba, 5 min de Bocagrande. Day pass desde $150.000.",
    type: "website",
    locale: "es_CO",
    alternateLocale: ["en_US"],
    siteName: "Bethel Bellini Beach Club",
    url: `${SITE_URL}/pasadia`,
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Pasadía en Bethel Bellini Beach Club — Piscina infinity y playa privada en Isla Tierra Bomba, Cartagena",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pasadía & Day Pass en Isla Tierra Bomba | Bethel Bellini Cartagena",
    description:
      "El mejor pasadía de Cartagena: piscina infinity, playa privada y gastronomía premium. 5 min de Bocagrande. Reserva ahora.",
    images: ["/hero-bg.jpg"],
  },
  alternates: {
    canonical: `${SITE_URL}/pasadia`,
    languages: {
      "es-CO": `${SITE_URL}/pasadia`,
      "en-US": `${SITE_URL}/pasadia`,
    },
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export default function PasadiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
