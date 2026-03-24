import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bethel Bellini Beach Club | Isla Tierra Bomba, Cartagena",
  description:
    "El Reino del Realismo Mágico. Arquitectura hecha a mano, mar abierto al horizonte. Pide desde tu camastro con ISLA OS.",
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
  ],
  openGraph: {
    title: "Bethel Bellini Beach Club",
    description:
      "Isla Tierra Bomba · Cartagena de Indias. Pide sin esfuerzo desde tu zona.",
    type: "website",
    locale: "es_CO",
    siteName: "Bethel Bellini Beach Club",
    images: ["/hero-bg.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bethel Bellini Beach Club",
    description: "El Reino del Realismo Mágico en Isla Tierra Bomba",
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
      <body>{children}</body>
    </html>
  );
}
