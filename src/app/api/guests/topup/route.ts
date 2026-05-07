import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { z } from "zod";

const topupSchema = z.object({
  session_id: z.string().uuid("Session ID invalido"),
  amount: z.number().int().min(10000, "Minimo $10,000 COP"),
  method: z.enum(["nequi", "daviplata", "card", "cash", "wompi"]),
  reference: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = topupSchema.parse(body);

    const supabase = await createServiceClient();

    // Get current session
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

    const currentBalance = (session as { balance: number }).balance;
    const newBalance = currentBalance + data.amount;

    // Update balance
    const { data: updated, error: updateError } = await supabase
      .from("guest_sessions")
      .update({ balance: newBalance } as never)
      .eq("id", data.session_id)
      .select()
      .single();

    if (updateError) {
      console.error("[Topup] Update error:", updateError);
      return NextResponse.json(
        { error: "Error actualizando saldo" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      previous_balance: currentBalance,
      amount_added: data.amount,
      new_balance: newBalance,
      session: updated,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      );
    }
    console.error("[Topup] Error:", error);
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 },
    );
  }
}
