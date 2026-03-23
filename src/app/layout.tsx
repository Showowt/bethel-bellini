import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bethel Bellini Beach Club | Isla Tierra Bomba, Cartagena",
  description:
    "El Reino del Realismo Mágico. Experiencia exclusiva de playa en Isla Tierra Bomba, a 5 minutos de Cartagena. Reserva tu mesa ahora.",
  keywords: [
    "beach club",
    "cartagena",
    "tierra bomba",
    "bethel bellini",
    "luxury",
    "playa",
    "reservaciones",
  ],
  openGraph: {
    title: "Bethel Bellini Beach Club",
    description: "El Reino del Realismo Mágico en Isla Tierra Bomba",
    type: "website",
    locale: "es_CO",
    siteName: "Bethel Bellini Beach Club",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="min-h-screen bg-bethel-black text-white font-montserrat antialiased">
        {children}
      </body>
    </html>
  );
}
