import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { z } from "zod";

// ═══════════════════════════════════════════════════════════════════
// POST /api/orders — Create a new order
// Used by the web frontend order page
// ═══════════════════════════════════════════════════════════════════

const createOrderSchema = z.object({
  session_id: z.string().uuid(),
  zone: z.string().min(1),
  items: z.array(
    z.object({
      name: z.string().min(1),
      price: z.number().positive(),
      qty: z.number().int().positive(),
    }),
  ).min(1),
  notes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createOrderSchema.parse(body);

    const supabase = await createServiceClient();

    const total = validated.items.reduce(
      (s, item) => s + item.price * item.qty,
      0,
    );

    // Generate order number
    const { data: orderNumber } = await supabase.rpc("generate_order_number" as never);
    const orderNum = (orderNumber as unknown as string) || `BB-${Date.now().toString(36).toUpperCase()}`;

    // Get guest_id from session
    const { data: session } = await supabase
      .from("guest_sessions")
      .select("guest_id")
      .eq("id", validated.session_id)
      .eq("active", true)
      .single();

    if (!session) {
      return NextResponse.json(
        { error: "Sesión no encontrada o inactiva" },
        { status: 404 },
      );
    }

    const guestId = (session as { guest_id: string }).guest_id;

    // Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        session_id: validated.session_id,
        guest_id: guestId,
        order_number: orderNum,
        zone: validated.zone,
        total,
        notes: validated.notes || null,
        status: "pending",
      } as never)
      .select()
      .single();

    if (orderError || !order) {
      console.error("[Orders] Create error:", orderError);
      return NextResponse.json(
        { error: "Error al crear pedido" },
        { status: 500 },
      );
    }

    const orderId = (order as { id: string }).id;

    // Insert order items
    const itemInserts = validated.items.map((item) => ({
      order_id: orderId,
      item_name: item.name,
      item_price: item.price,
      quantity: item.qty,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(itemInserts as never);

    if (itemsError) {
      console.error("[Orders] Items error:", itemsError);
    }

    // Process payment
    const { data: paymentResult } = await supabase.rpc(
      "process_order_payment" as never,
      {
        p_session_id: validated.session_id,
        p_order_id: orderId,
        p_amount: total,
      } as never,
    );

    const payment = paymentResult as {
      success: boolean;
      balance_after?: number;
      error?: string;
    } | null;

    if (!payment || !payment.success) {
      // Cancel the order if payment fails
      await supabase
        .from("orders")
        .update({ status: "cancelled" } as never)
        .eq("id", orderId);

      return NextResponse.json(
        { error: payment?.error || "Error al procesar pago" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        id: orderId,
        order_number: orderNum,
        total,
        balance_after: payment.balance_after,
        status: "pending",
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      );
    }
    console.error("[Orders] Error:", error);
    return NextResponse.json(
      { error: "Error al procesar pedido" },
      { status: 500 },
    );
  }
}

// ═══════════════════════════════════════════════════════════════════
// GET /api/orders — List orders (for admin/staff)
// ═══════════════════════════════════════════════════════════════════

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const sessionId = searchParams.get("session_id");
    const guestId = searchParams.get("guest_id");

    const supabase = await createServiceClient();

    let query = supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false });

    if (status) query = query.eq("status", status);
    if (sessionId) query = query.eq("session_id", sessionId);
    if (guestId) query = query.eq("guest_id", guestId);

    const { data, error } = await query.limit(50);

    if (error) {
      console.error("[Orders] Fetch error:", error);
      return NextResponse.json(
        { error: "Error al obtener pedidos" },
        { status: 500 },
      );
    }

    return NextResponse.json({ orders: data });
  } catch (error) {
    console.error("[Orders] Error:", error);
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 },
    );
  }
}
