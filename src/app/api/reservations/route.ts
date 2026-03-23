import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import {
  sendWhatsApp,
  formatReservationNotification,
} from "@/lib/twilio/whatsapp";
import { z } from "zod";
import type { Reservation, ReservationInsert } from "@/lib/supabase/types";

const reservationSchema = z.object({
  name: z.string().min(2, "Nombre muy corto"),
  email: z.string().email("Email inválido").nullable().optional(),
  phone: z.string().min(7, "Teléfono inválido"),
  country_code: z.string().default("+57"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Hora inválida"),
  guests: z.number().int().min(1).max(20),
});

const ADMIN_WHATSAPP = process.env.ADMIN_WHATSAPP || "+573XXXXXXXXX";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = reservationSchema.parse(body);

    const supabase = await createServiceClient();

    const insertData: ReservationInsert = {
      name: validatedData.name,
      email: validatedData.email || null,
      phone: validatedData.phone,
      country_code: validatedData.country_code,
      date: validatedData.date,
      time: validatedData.time,
      guests: validatedData.guests,
      status: "pending",
    };

    // Insert reservation
    const { data, error: dbError } = await supabase
      .from("reservations")
      .insert(insertData as never)
      .select()
      .single();

    if (dbError) {
      console.error("[Reservations] DB Error:", dbError);
      return NextResponse.json(
        { error: "Error al guardar reservación" },
        { status: 500 },
      );
    }

    const reservation = data as unknown as Reservation;

    // Send WhatsApp notification to admin
    const fullPhone = `${validatedData.country_code}${validatedData.phone.replace(/\D/g, "")}`;

    const notificationResult = await sendWhatsApp({
      to: ADMIN_WHATSAPP,
      body: formatReservationNotification({
        name: validatedData.name,
        phone: fullPhone,
        date: validatedData.date,
        time: validatedData.time,
        guests: validatedData.guests,
      }),
    });

    // Update notification status
    if (notificationResult.success) {
      await supabase
        .from("reservations")
        .update({ whatsapp_notified: true } as never)
        .eq("id", reservation.id);
    }

    return NextResponse.json({
      success: true,
      reservation: {
        id: reservation.id,
        date: reservation.date,
        time: reservation.time,
        guests: reservation.guests,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      );
    }

    console.error("[Reservations] Error:", error);
    return NextResponse.json(
      { error: "Error al procesar reservación" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const date = searchParams.get("date");

    const supabase = await createServiceClient();

    let query = supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    if (date) {
      query = query.eq("date", date);
    }

    const { data, error } = await query.limit(100);

    if (error) {
      console.error("[Reservations] Fetch Error:", error);
      return NextResponse.json(
        { error: "Error al obtener reservaciones" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      reservations: data as unknown as Reservation[],
    });
  } catch (error) {
    console.error("[Reservations] Error:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
