import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { sendWhatsApp } from "@/lib/twilio/whatsapp";

// Twilio sends webhook as form data
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const body = formData.get("Body") as string;
    const from = formData.get("From") as string;

    if (!body || !from) {
      return new NextResponse(
        '<Response><Message>Error: mensaje vacio</Message></Response>',
        { headers: { "Content-Type": "text/xml" } },
      );
    }

    // Strip "whatsapp:" prefix
    const phone = from.replace("whatsapp:", "").replace("+", "");
    const message = body.trim().toLowerCase();

    const supabase = await createServiceClient();

    // Look up guest
    const { data: guest } = await supabase
      .from("guests")
      .select("*, guest_sessions(*)")
      .eq("phone", phone)
      .single();

    let responseText: string;

    if (!guest) {
      // New guest
      responseText = `Hola! Bienvenido a Bethel Bellini Beach Club.

Para pedir, visita: ${process.env.NEXT_PUBLIC_APP_URL || "https://bethel-bellini.vercel.app"}/order

O puedes hacer tu reserva aqui. Escribe RESERVAR seguido de tu nombre.

---
Hello! Welcome to Bethel Bellini Beach Club.

To order, visit: ${process.env.NEXT_PUBLIC_APP_URL || "https://bethel-bellini.vercel.app"}/order

Or make a reservation here. Write RESERVE followed by your name.`;
    } else if (message.startsWith("reservar") || message.startsWith("reserve")) {
      const name = body.replace(/^(reservar|reserve)\s*/i, "").trim() || "Invitado";
      responseText = `Perfecto ${name}! Para completar tu reserva:

Nombre: ${name}
Fecha: (responde con la fecha, ej: 2026-05-15)
Hora: (ej: 14:00)
Personas: (ej: 4)

Escribe los 3 datos separados por coma.

---
Great ${name}! To complete your reservation, reply with: date, time, guests (e.g. 2026-05-15, 14:00, 4)`;
    } else if (message === "menu" || message === "carta") {
      responseText = `Nuestra carta completa:
${process.env.NEXT_PUBLIC_APP_URL || "https://bethel-bellini.vercel.app"}/#menu

Para pedir desde tu zona:
${process.env.NEXT_PUBLIC_APP_URL || "https://bethel-bellini.vercel.app"}/order

---
Our full menu:
${process.env.NEXT_PUBLIC_APP_URL || "https://bethel-bellini.vercel.app"}/#menu

To order from your zone:
${process.env.NEXT_PUBLIC_APP_URL || "https://bethel-bellini.vercel.app"}/order`;
    } else if (message === "saldo" || message === "balance") {
      const sessions = (guest as { guest_sessions: { active: boolean; balance: number; band_id: string }[] }).guest_sessions;
      const activeSession = sessions?.find((s) => s.active);
      if (activeSession) {
        const fmt = new Intl.NumberFormat("es-CO").format(activeSession.balance);
        responseText = `Tu saldo: $${fmt} COP
Banda: ${activeSession.band_id}

Para recargar, visita el muelle o la recepcion.

---
Your balance: $${fmt} COP
Wristband: ${activeSession.band_id}

To top up, visit the dock or reception.`;
      } else {
        responseText = `No tienes una sesion activa. Haz check-in en el muelle al llegar.

---
No active session found. Check in at the dock on arrival.`;
      }
    } else if (message === "ayuda" || message === "help") {
      responseText = `Comandos disponibles / Available commands:

MENU - Ver la carta / See the menu
SALDO - Consultar saldo / Check balance
RESERVAR [nombre] - Hacer reserva / Make reservation
AYUDA - Este mensaje / This message

Pedir: ${process.env.NEXT_PUBLIC_APP_URL || "https://bethel-bellini.vercel.app"}/order`;
    } else {
      // Default response
      responseText = `Hola! Soy el asistente de Bethel Bellini.

Escribe:
MENU - Ver carta
SALDO - Tu balance
RESERVAR - Hacer reserva
AYUDA - Mas opciones

Pedir online: ${process.env.NEXT_PUBLIC_APP_URL || "https://bethel-bellini.vercel.app"}/order

---
Hello! I'm the Bethel Bellini assistant.

Type:
MENU - See menu
BALANCE - Your balance
RESERVE - Make reservation
HELP - More options`;
    }

    // Send response via Twilio
    await sendWhatsApp({
      to: `+${phone}`,
      body: responseText,
    });

    // Return TwiML empty response (we already sent via API)
    return new NextResponse(
      '<Response></Response>',
      { headers: { "Content-Type": "text/xml" } },
    );
  } catch (error) {
    console.error("[WhatsApp Webhook] Error:", error);
    return new NextResponse(
      '<Response><Message>Error interno. Intenta de nuevo.</Message></Response>',
      { headers: { "Content-Type": "text/xml" } },
    );
  }
}

// Twilio webhook verification
export async function GET() {
  return NextResponse.json({ status: "WhatsApp webhook active" });
}
