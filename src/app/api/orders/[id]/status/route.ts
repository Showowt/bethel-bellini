import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { sendMessage } from "@/lib/telegram/api";
import { orderStatusMessage } from "@/lib/telegram/formatters";
import { z } from "zod";

const statusSchema = z.object({
  status: z.enum(["pending", "preparing", "ready", "delivered", "cancelled"]),
});

// ═══════════════════════════════════════════════════════════════════
// PATCH /api/orders/[id]/status — Update order status
// Used by admin dashboard or staff actions
// ═══════════════════════════════════════════════════════════════════

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = statusSchema.parse(body);

    const supabase = await createServiceClient();

    // Update order
    const { data: order, error } = await supabase
      .from("orders")
      .update({
        status: validated.status,
        updated_at: new Date().toISOString(),
      } as never)
      .eq("id", id)
      .select("order_number, total, session_id, guest_id")
      .single();

    if (error || !order) {
      console.error("[Order Status] Update error:", error);
      return NextResponse.json(
        { error: "Pedido no encontrado" },
        { status: 404 },
      );
    }

    const orderData = order as {
      order_number: string;
      total: number;
      session_id: string;
      guest_id: string | null;
    };

    // If cancelled, refund balance
    if (validated.status === "cancelled") {
      await supabase.rpc("process_top_up" as never, {
        p_session_id: orderData.session_id,
        p_amount: orderData.total,
        p_description: `Refund: ${orderData.order_number} cancelled`,
      } as never);
    }

    // Notify guest via Telegram if they have telegram_id
    if (orderData.guest_id) {
      const { data: guest } = await supabase
        .from("guests")
        .select("telegram_id")
        .eq("id", orderData.guest_id)
        .single();

      const guestData = guest as { telegram_id: number | null } | null;
      if (guestData?.telegram_id) {
        await sendMessage({
          chat_id: guestData.telegram_id,
          text: orderStatusMessage(orderData.order_number, validated.status),
        });
      }
    }

    return NextResponse.json({
      success: true,
      order: {
        id,
        order_number: orderData.order_number,
        status: validated.status,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      );
    }
    console.error("[Order Status] Error:", error);
    return NextResponse.json(
      { error: "Error al actualizar pedido" },
      { status: 500 },
    );
  }
}
