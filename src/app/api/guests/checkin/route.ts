import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { z } from "zod";

// ═══════════════════════════════════════════════════════════════════
// POST /api/guests/checkin — Check in a guest (web + telegram)
// Creates or finds guest, creates active session with band
// ═══════════════════════════════════════════════════════════════════

const checkinSchema = z.object({
  phone: z.string().min(7).optional(),
  telegram_id: z.number().optional(),
  name: z.string().optional(),
  initial_balance: z.number().min(0).default(0),
  zone: z.string().optional(),
}).refine((data) => data.phone || data.telegram_id, {
  message: "Phone or telegram_id is required",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = checkinSchema.parse(body);

    const supabase = await createServiceClient();

    // Find or create guest
    let guestId: string;

    if (validated.telegram_id) {
      const { data: existing } = await supabase
        .from("guests")
        .select("id")
        .eq("telegram_id", validated.telegram_id)
        .single();

      if (existing) {
        guestId = (existing as { id: string }).id;
      } else {
        const { data: newGuest, error } = await supabase
          .from("guests")
          .insert({
            phone: validated.phone || `tg:${validated.telegram_id}`,
            name: validated.name || "Invitado",
            telegram_id: validated.telegram_id,
          } as never)
          .select("id")
          .single();

        if (error || !newGuest) {
          return NextResponse.json(
            { error: "Error al crear invitado" },
            { status: 500 },
          );
        }
        guestId = (newGuest as { id: string }).id;
      }
    } else {
      // Find by phone
      const cleanPhone = validated.phone!.replace(/\D/g, "");
      const { data: existing } = await supabase
        .from("guests")
        .select("id")
        .eq("phone", cleanPhone)
        .single();

      if (existing) {
        guestId = (existing as { id: string }).id;
      } else {
        const { data: newGuest, error } = await supabase
          .from("guests")
          .insert({
            phone: cleanPhone,
            name: validated.name || "Invitado",
          } as never)
          .select("id")
          .single();

        if (error || !newGuest) {
          return NextResponse.json(
            { error: "Error al crear invitado" },
            { status: 500 },
          );
        }
        guestId = (newGuest as { id: string }).id;
      }
    }

    // Deactivate any existing active sessions for this guest
    await supabase
      .from("guest_sessions")
      .update({
        active: false,
        checked_out_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as never)
      .eq("guest_id", guestId)
      .eq("active", true);

    // Create new session with band
    const bandId = `BB-${Math.floor(Math.random() * 9000 + 1000)}`;

    const { data: session, error: sessionError } = await supabase
      .from("guest_sessions")
      .insert({
        guest_id: guestId,
        band_id: bandId,
        balance: validated.initial_balance,
        zone: validated.zone || null,
        active: true,
        cart: [],
      } as never)
      .select()
      .single();

    if (sessionError || !session) {
      console.error("[Checkin] Session error:", sessionError);
      return NextResponse.json(
        { error: "Error al crear sesión" },
        { status: 500 },
      );
    }

    // Increment visit count
    await supabase
      .from("guests")
      .update({
        total_visits: (await supabase
          .from("guests")
          .select("total_visits")
          .eq("id", guestId)
          .single()
          .then((r) => ((r.data as { total_visits: number } | null)?.total_visits || 0) + 1)),
        updated_at: new Date().toISOString(),
      } as never)
      .eq("id", guestId);

    const s = session as {
      id: string;
      band_id: string;
      balance: number;
      zone: string | null;
    };

    return NextResponse.json({
      success: true,
      session: {
        id: s.id,
        band_id: s.band_id,
        balance: s.balance,
        zone: s.zone,
        guest_id: guestId,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      );
    }
    console.error("[Checkin] Error:", error);
    return NextResponse.json(
      { error: "Error al procesar check-in" },
      { status: 500 },
    );
  }
}
