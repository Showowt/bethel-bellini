import { NextRequest, NextResponse } from "next/server";

const ADMIN_PIN = process.env.ADMIN_PIN || "8888";

export function verifyAdminPin(pin: string): boolean {
  return pin === ADMIN_PIN;
}

export function getAdminPinFromRequest(request: NextRequest): string | null {
  return request.headers.get("x-admin-pin");
}

export function requireAdmin(request: NextRequest): NextResponse | null {
  const pin = getAdminPinFromRequest(request);
  if (!pin || !verifyAdminPin(pin)) {
    return NextResponse.json(
      { error: "No autorizado / Unauthorized" },
      { status: 401 },
    );
  }
  return null;
}
