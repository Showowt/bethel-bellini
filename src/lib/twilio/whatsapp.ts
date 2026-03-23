const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM;

interface WhatsAppMessage {
  to: string;
  body: string;
}

export async function sendWhatsApp({ to, body }: WhatsAppMessage) {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_FROM) {
    console.error("[Twilio] Missing credentials");
    return { success: false, error: "Missing Twilio credentials" };
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;

  const formData = new URLSearchParams();
  formData.append("From", TWILIO_WHATSAPP_FROM);
  formData.append("To", `whatsapp:${to}`);
  formData.append("Body", body);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString(
            "base64",
          ),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[Twilio] Error:", data);
      return { success: false, error: data.message || "Failed to send" };
    }

    return { success: true, sid: data.sid };
  } catch (error) {
    console.error("[Twilio] Exception:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export function formatReservationNotification(reservation: {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
}) {
  return `🌴 *NUEVA RESERVACIÓN - BETHEL BELLINI*

👤 *${reservation.name}*
📱 ${reservation.phone}
📅 ${reservation.date}
🕐 ${reservation.time}
👥 ${reservation.guests} personas

_Responde CONFIRMAR para aprobar_`;
}

export function formatGuestConfirmation(reservation: {
  name: string;
  date: string;
  time: string;
  guests: number;
}) {
  return `🌴 *¡Hola ${reservation.name}!*

Tu reservación en *Bethel Bellini Beach Club* está confirmada:

📅 *Fecha:* ${reservation.date}
🕐 *Hora:* ${reservation.time}
👥 *Personas:* ${reservation.guests}

📍 *Ubicación:* Isla Tierra Bomba
🚤 Muelle La Bodeguita - 5 min en lancha

_El Reino del Realismo Mágico te espera._

¿Preguntas? Responde a este mensaje.`;
}
