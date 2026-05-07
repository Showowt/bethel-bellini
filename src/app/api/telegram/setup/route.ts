import { NextRequest, NextResponse } from "next/server";
import { setWebhook, getWebhookInfo } from "@/lib/telegram/api";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://bethel-bellini.vercel.app";
const WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;

// ═══════════════════════════════════════════════════════════════════
// POST /api/telegram/setup — Register webhook with Telegram
// Call once after deployment to set up the webhook URL
// ═══════════════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  try {
    // Simple auth: require a secret header
    const authHeader = request.headers.get("x-setup-key");
    if (authHeader !== WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const webhookUrl = `${APP_URL}/api/telegram/webhook`;

    const result = await setWebhook(webhookUrl, WEBHOOK_SECRET);

    return NextResponse.json({
      success: true,
      webhook_url: webhookUrl,
      telegram_response: result,
    });
  } catch (error) {
    console.error("[Telegram Setup] Error:", error);
    return NextResponse.json(
      { error: "Error setting up webhook" },
      { status: 500 },
    );
  }
}

// ═══════════════════════════════════════════════════════════════════
// GET /api/telegram/setup — Check current webhook status
// ═══════════════════════════════════════════════════════════════════

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("x-setup-key");
    if (authHeader !== WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const info = await getWebhookInfo();
    return NextResponse.json({ webhook_info: info });
  } catch (error) {
    console.error("[Telegram Setup] Error:", error);
    return NextResponse.json(
      { error: "Error getting webhook info" },
      { status: 500 },
    );
  }
}
