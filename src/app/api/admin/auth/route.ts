import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPin } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pin } = body;

    if (!pin || typeof pin !== "string") {
      return NextResponse.json(
        { error: "PIN requerido" },
        { status: 400 },
      );
    }

    if (!verifyAdminPin(pin)) {
      return NextResponse.json(
        { error: "PIN incorrecto / Incorrect PIN" },
        { status: 401 },
      );
    }

    return NextResponse.json({ success: true, authenticated: true });
  } catch (error) {
    console.error("[AdminAuth] Error:", error);
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 },
    );
  }
}
