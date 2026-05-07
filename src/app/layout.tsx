import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://bethel-bellini.vercel.app";
const SITE_NAME = "Bethel Bellini Beach Club";

export const viewport: Viewport = {
  themeColor: "#0A0907",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // ─── Primary SEO ─────────────────────────────────────────
  title: {
    default:
      "Bethel Bellini Beach Club | El Mejor Beach Club en Cartagena | Isla Tierra Bomba",
    template: "%s | Bethel Bellini Beach Club Cartagena",
  },
  description:
    "El mejor beach club de Cartagena en Isla Tierra Bomba. Fiestas, pool party, gastronomía premium, cócteles artesanales y la mejor vista al mar Caribe. A solo 5 minutos de Bocagrande. Reserva tu pasadía, fiesta privada o celebración.",
  keywords: [
    // Spanish — Primary
    "beach club cartagena",
    "beach club cartagena de indias",
    "club de playa cartagena",
    "mejor beach club cartagena",
    "fiesta cartagena",
    "fiesta isla tierra bomba",
    "pool party cartagena",
    "pasadia cartagena",
    "pasadia isla tierra bomba",
    "restaurante isla tierra bomba",
    "isla tierra bomba planes",
    "isla tierra bomba que hacer",
    "fiesta en isla cartagena",
    "nightlife cartagena",
    "rumba cartagena",
    "donde comer isla tierra bomba",
    "beach party cartagena",
    "party cartagena colombia",
    "celebraciones cartagena",
    "eventos privados cartagena",
    "cumpleaños cartagena playa",
    "despedida de solteros cartagena",
    "bachelorette cartagena",
    // English — Tourist traffic
    "best beach club cartagena",
    "cartagena beach club",
    "island party cartagena",
    "cartagena party",
    "cartagena nightlife",
    "cartagena beach party",
    "best things to do in cartagena",
    "cartagena day trip",
    "tierra bomba island",
    "cartagena pool party",
    "luxury beach club colombia",
    "cartagena bachelor party",
    "cartagena bachelorette",
    // Brand
    "bethel bellini",
    "bethel bellini beach club",
    "bethel bellini cartagena",
    "bethel bellini tierra bomba",
  ],

  // ─── Open Graph ──────────────────────────────────────────
  openGraph: {
    title:
      "Bethel Bellini Beach Club | Fiestas, Pool Party & Gastronomía en Isla Tierra Bomba",
    description:
      "El beach club más exclusivo de Cartagena. Piscina infinity, playa privada, DJ sets, cortes Angus, cócteles premium. Isla Tierra Bomba — a 5 min de Bocagrande. Reserva ahora.",
    type: "website",
    locale: "es_CO",
    alternateLocale: ["en_US"],
    siteName: SITE_NAME,
    url: SITE_URL,
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Bethel Bellini Beach Club — Vista aérea del mejor beach club en Isla Tierra Bomba, Cartagena",
      },
    ],
  },

  // ─── Twitter Card ────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title:
      "Bethel Bellini Beach Club | El Mejor Beach Club en Cartagena",
    description:
      "Fiestas, pool party, gastronomía premium y la mejor vista al mar Caribe. Isla Tierra Bomba, a 5 min de Cartagena.",
    images: ["/hero-bg.jpg"],
  },

  // ─── Indexing ────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // ─── Verification ────────────────────────────────────────
  // Add Google Search Console verification when available
  // verification: {
  //   google: "your-verification-code",
  // },

  // ─── Alternate Languages ─────────────────────────────────
  alternates: {
    canonical: SITE_URL,
    languages: {
      "es-CO": SITE_URL,
      "en-US": SITE_URL,
    },
  },

  // ─── App ─────────────────────────────────────────────────
  manifest: "/manifest.json",
  category: "restaurant",
  creator: "MachineMind",
  publisher: "Bethel Bellini Beach Club",

  // ─── Icons ───────────────────────────────────────────────
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },

  // ─── Other ───────────────────────────────────────────────
  other: {
    "geo.region": "CO-BOL",
    "geo.placename": "Cartagena de Indias, Bolívar, Colombia",
    "geo.position": "10.3627;-75.5690",
    ICBM: "10.3627, -75.5690",
  },
};

// ─── JSON-LD Structured Data ─────────────────────────────────

function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "BarOrPub", "TouristAttraction", "BeachResort"],
    "@id": `${SITE_URL}/#organization`,
    name: "Bethel Bellini Beach Club",
    alternateName: ["Bethel Bellini", "Bethel Bellini Cartagena", "Bethel Bellini Tierra Bomba"],
    description:
      "El mejor beach club de Cartagena de Indias ubicado en Isla Tierra Bomba. Beach club con piscina infinity, playa privada, restaurante de cocina caribeña premium, bar de cócteles artesanales, fiestas, pool parties, DJ sets y eventos privados. A solo 5 minutos en lancha desde Bocagrande.",
    url: SITE_URL,
    telephone: "+573151134606",
    image: [
      `${SITE_URL}/hero-bg.jpg`,
      `${SITE_URL}/gallery/venue-1.jpg`,
      `${SITE_URL}/gallery/venue-2.jpg`,
      `${SITE_URL}/gallery/venue-3.jpg`,
    ],
    logo: `${SITE_URL}/logo.svg`,
    priceRange: "$$$",
    servesCuisine: [
      "Caribbean",
      "Mediterranean",
      "Seafood",
      "Steakhouse",
      "Cocktail Bar",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Isla Tierra Bomba",
      addressLocality: "Cartagena de Indias",
      addressRegion: "Bolívar",
      postalCode: "130001",
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 10.3627,
      longitude: -75.569,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "10:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday"],
        opens: "10:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "20:00",
      },
    ],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Piscina Infinity", value: true },
      { "@type": "LocationFeatureSpecification", name: "Playa Privada", value: true },
      { "@type": "LocationFeatureSpecification", name: "Restaurante", value: true },
      { "@type": "LocationFeatureSpecification", name: "Bar de Cócteles", value: true },
      { "@type": "LocationFeatureSpecification", name: "DJ & Música en Vivo", value: true },
      { "@type": "LocationFeatureSpecification", name: "Camastros", value: true },
      { "@type": "LocationFeatureSpecification", name: "Cabañas VIP", value: true },
      { "@type": "LocationFeatureSpecification", name: "Eventos Privados", value: true },
      { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
    ],
    hasMenu: {
      "@type": "Menu",
      url: `${SITE_URL}/#menu`,
      hasMenuSection: [
        {
          "@type": "MenuSection",
          name: "Entradas",
          hasMenuItem: [
            { "@type": "MenuItem", name: "Pulpo Rostizado", offers: { "@type": "Offer", price: "65000", priceCurrency: "COP" } },
            { "@type": "MenuItem", name: "Ceviche de Pescado Blanco", offers: { "@type": "Offer", price: "65000", priceCurrency: "COP" } },
            { "@type": "MenuItem", name: "Tartar de Res", offers: { "@type": "Offer", price: "65000", priceCurrency: "COP" } },
          ],
        },
        {
          "@type": "MenuSection",
          name: "Cortes Angus Premium",
          hasMenuItem: [
            { "@type": "MenuItem", name: "Rib Eye 350g", offers: { "@type": "Offer", price: "285000", priceCurrency: "COP" } },
            { "@type": "MenuItem", name: "Cowboy 1 kg", offers: { "@type": "Offer", price: "650000", priceCurrency: "COP" } },
          ],
        },
        {
          "@type": "MenuSection",
          name: "Del Mar",
          hasMenuItem: [
            { "@type": "MenuItem", name: "Risotto Negro", offers: { "@type": "Offer", price: "135000", priceCurrency: "COP" } },
            { "@type": "MenuItem", name: "Arroz Meloso de Mariscos", offers: { "@type": "Offer", price: "80000", priceCurrency: "COP" } },
          ],
        },
        {
          "@type": "MenuSection",
          name: "Cócteles",
          hasMenuItem: [
            { "@type": "MenuItem", name: "Aperol Spritz", offers: { "@type": "Offer", price: "65000", priceCurrency: "COP" } },
            { "@type": "MenuItem", name: "Mojito", offers: { "@type": "Offer", price: "65000", priceCurrency: "COP" } },
          ],
        },
      ],
    },
    sameAs: [
      "https://instagram.com/bethel_bellini_cartagena",
      "https://wa.me/573151134606",
    ],
    potentialAction: [
      {
        "@type": "ReserveAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/#reservar`,
          actionPlatform: "http://schema.org/DesktopWebPlatform",
        },
        result: {
          "@type": "Reservation",
          name: "Reservar Mesa",
        },
      },
      {
        "@type": "OrderAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/order`,
        },
      },
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cómo llegar a Bethel Bellini en Isla Tierra Bomba?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bethel Bellini está en Isla Tierra Bomba, a solo 5 minutos en lancha desde el muelle de Bocagrande, Cartagena. Ofrecemos servicio de transporte en lancha. Contacta al +57 315 113 4606 para coordinar tu llegada.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto cuesta la entrada al beach club?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bethel Bellini funciona con sistema de consumo. Al llegar cargas tu saldo en tu banda inteligente y todo se descuenta automáticamente. No hay cover. Tu saldo cubre comida, bebidas y servicios.",
        },
      },
      {
        "@type": "Question",
        name: "¿Bethel Bellini tiene piscina?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Bethel Bellini cuenta con una piscina infinity con vista al mar Caribe, además de acceso directo a playa privada con camastros, cabañas VIP y servicio de bar en la piscina.",
        },
      },
      {
        "@type": "Question",
        name: "¿Se puede hacer una fiesta privada o evento en Bethel Bellini?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Organizamos fiestas privadas, cumpleaños, despedidas de solteros, bachelorette parties, eventos corporativos y celebraciones exclusivas con DJ, decoración personalizada y menú a medida. Contacta al +57 315 113 4606.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best beach club in Cartagena?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bethel Bellini Beach Club on Tierra Bomba Island is considered the best beach club in Cartagena. Just 5 minutes by boat from Bocagrande, it features an infinity pool, private beach, premium gastronomy, craft cocktails, and DJ sets with stunning Caribbean sea views.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuál es el horario de Bethel Bellini?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Lunes a jueves de 10:00 a 18:00. Viernes y sábado de 10:00 a 22:00. Domingos de 10:00 a 20:00. Los horarios pueden extenderse en fiestas y eventos especiales.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué tipo de comida sirven en Bethel Bellini?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cocina de autor con raíces caribeñas y toques mediterráneos. Ceviches, mariscos frescos, pulpo rostizado, cortes Angus premium (Rib Eye, Cowboy 1kg), pastas artesanales, pizzas, hamburguesas gourmet y más de 40 platos. Bar con cócteles artesanales, champagne y tragos premium.",
        },
      },
      {
        "@type": "Question",
        name: "Is Bethel Bellini good for a bachelor or bachelorette party?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Bethel Bellini is the top venue in Cartagena for bachelor and bachelorette parties. Private cabanas, VIP bottle service with Dom Pérignon and Veuve Clicquot, DJ sets, and a stunning island setting make it the perfect celebration venue. Contact +57 315 113 4606 to plan your event.",
        },
      },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["es", "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/#menu`,
      },
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Menú",
        item: `${SITE_URL}/#menu`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Reservar",
        item: `${SITE_URL}/#reservar`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Pedir",
        item: `${SITE_URL}/order`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusiness),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPage),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(website),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb),
        }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" dir="ltr">
      <head>
        <JsonLd />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
