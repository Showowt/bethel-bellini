import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { sendWhatsApp, formatGuestConfirmation } from "@/lib/twilio/whatsapp";
import type { Reservation, ReservationUpdate } from "@/lib/supabase/types";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, notes } = body;

    if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
      return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
    }

    const supabase = await createServiceClient();

    // Get current reservation
    const { data: currentData, error: fetchError } = await supabase
      .from("reservations")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !currentData) {
      return NextResponse.json(
        { error: "Reservación no encontrada" },
        { status: 404 },
      );
    }

    const current = currentData as unknown as Reservation;

    const updateData: ReservationUpdate = {
      status,
      notes: notes || current.notes,
      updated_at: new Date().toISOString(),
    };

    // Update reservation
    const { data: updatedData, error: updateError } = await supabase
      .from("reservations")
      .update(updateData as never)
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error("[Reservations] Update Error:", updateError);
      return NextResponse.json(
        { error: "Error al actualizar" },
        { status: 500 },
      );
    }

    const updated = updatedData as unknown as Reservation;

    // Send confirmation to guest if status changed to confirmed
    if (status === "confirmed" && current.status !== "confirmed") {
      const guestPhone = `${current.country_code}${current.phone.replace(/\D/g, "")}`;

      await sendWhatsApp({
        to: guestPhone,
        body: formatGuestConfirmation({
          name: current.name,
          date: current.date,
          time: current.time,
          guests: current.guests,
        }),
      });
    }

    return NextResponse.json({ success: true, reservation: updated });
  } catch (error) {
    console.error("[Reservations] Error:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const supabase = await createServiceClient();

    const { error } = await supabase.from("reservations").delete().eq("id", id);

    if (error) {
      console.error("[Reservations] Delete Error:", error);
      return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Reservations] Error:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
