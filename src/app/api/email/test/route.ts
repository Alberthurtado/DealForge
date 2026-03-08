import { testSmtpConnection } from "@/lib/email";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await testSmtpConnection();
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
