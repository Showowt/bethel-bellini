import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import crypto from "crypto";

const WOMPI_EVENTS_SECRET = process.env.WOMPI_EVENTS_SECRET;
const WOMPI_PUBLIC_KEY = process.env.WOMPI_PUBLIC_KEY;

// Verify Wompi webhook signature
function verifyWompiSignature(
  body: string,
  signature: string,
  timestamp: string,
): boolean {
  if (!WOMPI_EVENTS_SECRET) return false;

  const expectedSignature = crypto
    .createHmac("sha256", WOMPI_EVENTS_SECRET)
    .update(`${timestamp}${body}`)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature),
  );
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-event-checksum") || "";
    const timestamp = request.headers.get("x-event-timestamp") || "";

    // Verify signature if secret is configured
    if (WOMPI_EVENTS_SECRET && !verifyWompiSignature(rawBody, signature, timestamp)) {
      console.error("[Wompi] Invalid signature");
      return NextResponse.json(
        { error: "Firma invalida" },
        { status: 401 },
      );
    }

    const event = JSON.parse(rawBody);
    const eventType = event?.event;
    const transaction = event?.data?.transaction;

    if (!transaction) {
      return NextResponse.json({ received: true });
    }

    const supabase = await createServiceClient();

    // Handle transaction status events
    if (eventType === "transaction.updated") {
      const { reference, status, amount_in_cents } = transaction;

      // Reference format: "topup-{session_id}" or "order-{order_id}"
      if (reference?.startsWith("topup-") && status === "APPROVED") {
        const sessionId = reference.replace("topup-", "");
        const amount = Math.floor(amount_in_cents / 100);

        // Get current session balance
        const { data: session } = await supabase
          .from("guest_sessions")
          .select("balance")
          .eq("id", sessionId)
          .single();

        if (session) {
          const newBalance = (session as { balance: number }).balance + amount;
          await supabase
            .from("guest_sessions")
            .update({ balance: newBalance } as never)
            .eq("id", sessionId);

          console.log(
            `[Wompi] Topup approved: session=${sessionId} amount=${amount} new_balance=${newBalance}`,
          );
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Wompi] Webhook error:", error);
    return NextResponse.json(
      { error: "Error procesando webhook" },
      { status: 500 },
    );
  }
}

// GET: Generate Wompi payment link config
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const session_id = searchParams.get("session_id");
    const amount = parseInt(searchParams.get("amount") || "0", 10);

    if (!session_id || amount < 10000) {
      return NextResponse.json(
        { error: "session_id y amount (min 10000) requeridos" },
        { status: 400 },
      );
    }

    if (!WOMPI_PUBLIC_KEY) {
      return NextResponse.json(
        { error: "Wompi no configurado" },
        { status: 503 },
      );
    }

    const reference = `topup-${session_id}`;
    const amountInCents = amount * 100;

    return NextResponse.json({
      public_key: WOMPI_PUBLIC_KEY,
      currency: "COP",
      amount_in_cents: amountInCents,
      reference,
      redirect_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://bethel-bellini.vercel.app"}/order?topup=success`,
    });
  } catch (error) {
    console.error("[Wompi] Config error:", error);
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 },
    );
  }
}
