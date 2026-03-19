import { NextResponse } from "next/server";

// IndexNow key verification file
export async function GET() {
  return new NextResponse("e3e045fe-7ce8-4b36-97b3-9c3e6de4a85f", {
    headers: { "Content-Type": "text/plain" },
  });
}
