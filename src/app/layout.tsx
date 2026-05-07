import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Bethel Bellini Beach Club | Isla Tierra Bomba, Cartagena",
  description:
    "El Reino del Realismo Magico. Arquitectura hecha a mano, mar abierto al horizonte. Pide desde tu camastro con ISLA OS. | The Kingdom of Magical Realism. Order from your lounger with ISLA OS.",
  metadataBase: new URL("https://bethel-bellini.vercel.app"),
  keywords: [
    "beach club",
    "cartagena",
    "tierra bomba",
    "bethel bellini",
    "luxury",
    "playa",
    "reservaciones",
    "isla os",
    "pedir comida",
    "order food",
    "reservations",
  ],
  openGraph: {
    title: "Bethel Bellini Beach Club",
    description:
      "Isla Tierra Bomba · Cartagena de Indias. Pide sin esfuerzo desde tu zona. | Order effortlessly from your zone.",
    type: "website",
    locale: "es_CO",
    alternateLocale: "en_US",
    siteName: "Bethel Bellini Beach Club",
    images: ["/hero-bg.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bethel Bellini Beach Club",
    description: "El Reino del Realismo Magico en Isla Tierra Bomba",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  themeColor: "#0A0907",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
