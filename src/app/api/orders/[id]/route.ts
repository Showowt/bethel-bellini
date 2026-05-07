import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

const VALID_STATUSES = [
  "pending",
  "preparing",
  "ready",
  "delivered",
  "cancelled",
] as const;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: "Estado invalido / Invalid status" },
        { status: 400 },
      );
    }

    const supabase = await createServiceClient();

    // Get current order
    const { data: current, error: fetchError } = await supabase
      .from("orders")
      .select("*, guest_sessions(id, balance)")
      .eq("id", id)
      .single();

    if (fetchError || !current) {
      return NextResponse.json(
        { error: "Orden no encontrada / Order not found" },
        { status: 404 },
      );
    }

    const order = current as {
      id: string;
      status: string;
      total: number;
      session_id: string;
      guest_sessions: { id: string; balance: number };
    };

    // If cancelling, refund the balance
    if (status === "cancelled" && order.status !== "cancelled") {
      const refundBalance = order.guest_sessions.balance + order.total;
      await supabase
        .from("guest_sessions")
        .update({ balance: refundBalance } as never)
        .eq("id", order.session_id);
    }

    // Update order status
    const { data: updated, error: updateError } = await supabase
      .from("orders")
      .update({ status } as never)
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error("[Orders] Update error:", updateError);
      return NextResponse.json(
        { error: "Error actualizando orden" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error("[Orders] Error:", error);
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 },
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const supabase = await createServiceClient();

    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*), guest_sessions(band_id, zone, guests(name, phone))")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Orden no encontrada / Order not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ order: data });
  } catch (error) {
    console.error("[Orders] Error:", error);
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 },
    );
  }
}
