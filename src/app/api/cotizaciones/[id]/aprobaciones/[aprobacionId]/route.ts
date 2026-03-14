import { NextResponse } from "next/server";

// Approval responses can ONLY be made via the token-based endpoint (/api/aprobaciones/[token]).
// The quote creator cannot approve/reject from the dashboard — only the designated approver
// can respond through the unique link sent by email.

export async function PUT() {
  return NextResponse.json(
    { error: "Las aprobaciones solo pueden resolverse desde el enlace enviado por email al aprobador." },
    { status: 403 }
  );
}
