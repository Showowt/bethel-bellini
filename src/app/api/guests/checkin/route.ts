import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { z } from "zod";
import type { Guest, GuestSession } from "@/lib/supabase/types";

const checkinSchema = z.object({
  phone: z.string().min(7, "Telefono invalido"),
  country_code: z.string().default("+57"),
  name: z.string().min(1).default("Invitado"),
  band_id: z.string().min(1, "Band ID requerido"),
  initial_balance: z.number().int().min(0).default(0),
  zone: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = checkinSchema.parse(body);

    const supabase = await createServiceClient();

    // Find or create guest by phone
    const { data: existingGuestData } = await supabase
      .from("guests")
      .select("*")
      .eq("phone", data.phone)
      .single();

    const existingGuest = existingGuestData as unknown as Guest | null;
    let guestId: string;

    if (existingGuest) {
      guestId = existingGuest.id;
      // Increment visits
      await supabase
        .from("guests")
        .update({
          total_visits: (existingGuest.total_visits || 0) + 1,
          name: data.name !== "Invitado" ? data.name : existingGuest.name,
        } as never)
        .eq("id", guestId);
    } else {
      const { data: newGuestData, error: guestError } = await supabase
        .from("guests")
        .insert({
          phone: data.phone,
          country_code: data.country_code,
          name: data.name,
          total_visits: 1,
        } as never)
        .select()
        .single();

      const newGuest = newGuestData as unknown as Guest | null;
      if (guestError || !newGuest) {
        console.error("[Checkin] Guest create error:", guestError);
        return NextResponse.json(
          { error: "Error creando invitado" },
          { status: 500 },
        );
      }
      guestId = newGuest.id;
    }

    // Deactivate any existing active sessions for this guest
    await supabase
      .from("guest_sessions")
      .update({ active: false, checked_out_at: new Date().toISOString() } as never)
      .eq("guest_id", guestId)
      .eq("active", true);

    // Create new session
    const { data: session, error: sessionError } = await supabase
      .from("guest_sessions")
      .insert({
        guest_id: guestId,
        band_id: data.band_id,
        balance: data.initial_balance,
        zone: data.zone || null,
        active: true,
      } as never)
      .select()
      .single();

    if (sessionError) {
      console.error("[Checkin] Session create error:", sessionError);
      if (sessionError.code === "23505") {
        return NextResponse.json(
          { error: "Esta banda ya esta en uso / This wristband is already in use" },
          { status: 409 },
        );
      }
      return NextResponse.json(
        { error: "Error creando sesion" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      guest_id: guestId,
      session: session,
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
      { error: "Error del servidor" },
      { status: 500 },
    );
  }
}

// GET: Look up guest by phone or band_id
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");
    const band_id = searchParams.get("band_id");

    if (!phone && !band_id) {
      return NextResponse.json(
        { error: "phone or band_id required" },
        { status: 400 },
      );
    }

    const supabase = await createServiceClient();

    if (band_id) {
      const { data: sessionData, error } = await supabase
        .from("guest_sessions")
        .select("*, guests(*)")
        .eq("band_id", band_id)
        .eq("active", true)
        .single();

      if (error || !sessionData) {
        return NextResponse.json(
          { error: "Sesion no encontrada / Session not found" },
          { status: 404 },
        );
      }

      return NextResponse.json({ session: sessionData });
    }

    // Lookup by phone
    const { data: guestData, error } = await supabase
      .from("guests")
      .select("*")
      .eq("phone", phone!)
      .single();

    const guest = guestData as unknown as Guest | null;
    if (error || !guest) {
      return NextResponse.json(
        { error: "Invitado no encontrado / Guest not found" },
        { status: 404 },
      );
    }

    // Get active session
    const { data: sessionData } = await supabase
      .from("guest_sessions")
      .select("*")
      .eq("guest_id", guest.id)
      .eq("active", true)
      .single();

    return NextResponse.json({ guest, session: sessionData });
  } catch (error) {
    console.error("[Checkin] Error:", error);
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 },
    );
  }
}
