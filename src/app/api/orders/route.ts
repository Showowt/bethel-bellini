import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { z } from "zod";

const orderItemSchema = z.object({
  item_name: z.string().min(1),
  item_price: z.number().int().min(0),
  quantity: z.number().int().min(1).default(1),
  notes: z.string().optional(),
});

const createOrderSchema = z.object({
  session_id: z.string().uuid("Session ID invalido"),
  zone: z.string().min(1, "Zona requerida"),
  items: z.array(orderItemSchema).min(1, "Al menos un item requerido"),
  notes: z.string().optional(),
});

function generateOrderNumber(): string {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const rand = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `BB-${h}${m}-${rand}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createOrderSchema.parse(body);

    const supabase = await createServiceClient();

    // Verify session exists and is active
    const { data: session, error: sessionError } = await supabase
      .from("guest_sessions")
      .select("*")
      .eq("id", data.session_id)
      .eq("active", true)
      .single();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: "Sesion no encontrada o inactiva / Session not found or inactive" },
        { status: 404 },
      );
    }

    // Calculate total
    const total = data.items.reduce(
      (sum, item) => sum + item.item_price * item.quantity,
      0,
    );

    const currentBalance = (session as { balance: number }).balance;

    // Check balance
    if (currentBalance < total) {
      return NextResponse.json(
        {
          error: "Saldo insuficiente / Insufficient balance",
          balance: currentBalance,
          total,
          deficit: total - currentBalance,
        },
        { status: 402 },
      );
    }

    // Create order
    const orderNumber = generateOrderNumber();
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        session_id: data.session_id,
        order_number: orderNumber,
        zone: data.zone,
        status: "pending",
        total,
        notes: data.notes || null,
      } as never)
      .select()
      .single();

    if (orderError || !order) {
      console.error("[Orders] Create error:", orderError);
      return NextResponse.json(
        { error: "Error creando orden" },
        { status: 500 },
      );
    }

    const orderId = (order as { id: string }).id;

    // Insert order items
    const items = data.items.map((item) => ({
      order_id: orderId,
      item_name: item.item_name,
      item_price: item.item_price,
      quantity: item.quantity,
      notes: item.notes || null,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(items as never[]);

    if (itemsError) {
      console.error("[Orders] Items insert error:", itemsError);
      // Rollback order
      await supabase.from("orders").delete().eq("id", orderId);
      return NextResponse.json(
        { error: "Error agregando items" },
        { status: 500 },
      );
    }

    // Deduct balance
    const newBalance = currentBalance - total;
    await supabase
      .from("guest_sessions")
      .update({ balance: newBalance } as never)
      .eq("id", data.session_id);

    // Update guest total_spent
    const guestId = (session as { guest_id: string }).guest_id;
    const { data: guest } = await supabase
      .from("guests")
      .select("total_spent")
      .eq("id", guestId)
      .single();

    if (guest) {
      await supabase
        .from("guests")
        .update({
          total_spent: ((guest as { total_spent: number }).total_spent || 0) + total,
        } as never)
        .eq("id", guestId);
    }

    return NextResponse.json({
      success: true,
      order: {
        ...(order as Record<string, unknown>),
        items: data.items,
      },
      new_balance: newBalance,
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
      { error: "Error del servidor" },
      { status: 500 },
    );
  }
}

// GET: List orders (for kitchen display or admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const zone = searchParams.get("zone");
    const session_id = searchParams.get("session_id");
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    const supabase = await createServiceClient();

    let query = supabase
      .from("orders")
      .select("*, order_items(*), guest_sessions(band_id, zone, guests(name, phone))")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (status) {
      query = query.eq("status", status);
    }
    if (zone) {
      query = query.eq("zone", zone);
    }
    if (session_id) {
      query = query.eq("session_id", session_id);
    }

    const { data, error } = await query;

    if (error) {
      console.error("[Orders] Fetch error:", error);
      return NextResponse.json(
        { error: "Error obteniendo ordenes" },
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
