import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://bethel-bellini.vercel.app";

async function sendTelegramMessage(chatId: number, text: string) {
  if (!TELEGRAM_BOT_TOKEN) {
    console.error("[Telegram] Missing bot token");
    return;
  }

  await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      }),
    },
  );
}

export async function POST(request: NextRequest) {
  try {
    const update = await request.json();
    const message = update?.message;

    if (!message?.text || !message?.chat?.id) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    const text = message.text.trim().toLowerCase();
    const firstName = message.from?.first_name || "Invitado";

    const supabase = await createServiceClient();

    if (text === "/start") {
      await sendTelegramMessage(
        chatId,
        `*Bienvenido a Bethel Bellini Beach Club* 🌴

Hola ${firstName}! Soy tu asistente digital.

*Comandos:*
/menu - Ver nuestra carta
/reservar - Hacer una reserva
/saldo - Consultar tu saldo
/pedir - Pedir desde tu zona
/ayuda - Mas opciones

---
*Welcome to Bethel Bellini Beach Club* 🌴

Hello ${firstName}! I'm your digital assistant.

*Commands:*
/menu - See our menu
/reserve - Make a reservation
/balance - Check your balance
/order - Order from your zone
/help - More options`,
      );
    } else if (text === "/menu" || text === "/carta") {
      await sendTelegramMessage(
        chatId,
        `*Nuestra Carta / Our Menu* 🍽

Ver menu completo: ${APP_URL}/#menu

Pedir online: ${APP_URL}/order`,
      );
    } else if (text === "/pedir" || text === "/order") {
      await sendTelegramMessage(
        chatId,
        `*Pedir desde tu Zona / Order from Your Zone* 📱

Abre ISLA OS para pedir:
${APP_URL}/order

Escanea el QR en tu camastro o usa el link.`,
      );
    } else if (text === "/reservar" || text === "/reserve") {
      await sendTelegramMessage(
        chatId,
        `*Reservar Mesa / Reserve a Table* 📅

Haz tu reserva aqui:
${APP_URL}/#reservar

O escribenos por WhatsApp: +57 315 113 4606`,
      );
    } else if (text === "/saldo" || text === "/balance") {
      await sendTelegramMessage(
        chatId,
        `Para consultar tu saldo, visita:
${APP_URL}/order

O escribe SALDO por WhatsApp: +57 315 113 4606`,
      );
    } else if (text === "/ayuda" || text === "/help") {
      await sendTelegramMessage(
        chatId,
        `*Bethel Bellini — Ayuda / Help*

/menu - Carta / Menu
/pedir - Pedir / Order
/reservar - Reservar / Reserve
/saldo - Saldo / Balance

📍 Isla Tierra Bomba, 5 min desde Cartagena
📱 WhatsApp: +57 315 113 4606
🌐 ${APP_URL}`,
      );
    } else {
      // Notify admin of new orders/messages via Telegram
      const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
      if (adminChatId) {
        // Forward to admin
        await sendTelegramMessage(
          parseInt(adminChatId, 10),
          `*Nuevo mensaje Telegram:*\n${firstName}: ${message.text}`,
        );
      }

      await sendTelegramMessage(
        chatId,
        `Hola ${firstName}! No entendi tu mensaje.

Escribe /ayuda para ver comandos disponibles.
O visita ${APP_URL} para mas informacion.

---
Hello ${firstName}! I didn't understand your message.

Type /help to see available commands.
Or visit ${APP_URL} for more info.`,
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Telegram] Webhook error:", error);
    return NextResponse.json({ ok: true });
  }
}

// Verify webhook
export async function GET() {
  return NextResponse.json({ status: "Telegram webhook active" });
}
