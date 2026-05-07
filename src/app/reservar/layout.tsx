import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservar | Pasadía, Cabañas VIP y Eventos Privados en Isla Tierra Bomba",
  description:
    "Reserva tu pasadía, cabaña VIP o fiesta privada en Bethel Bellini Beach Club. Piscina infinity, playa privada, gastronomía premium. Isla Tierra Bomba, Cartagena. Cumpleaños, despedidas de solteros, bachelorette y eventos corporativos.",
  openGraph: {
    title: "Reservar en Bethel Bellini — El Mejor Beach Club de Cartagena",
    description:
      "Pasadías desde $150.000. Cabañas VIP, fiestas privadas, cumpleaños en la playa. Isla Tierra Bomba, a 5 min de Bocagrande.",
  },
};

export default function ReservarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
