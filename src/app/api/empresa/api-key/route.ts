import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getPlanFeatures, planFeatureResponse } from "@/lib/plan-limits";
import { generateApiKey } from "@/lib/api-key";
import { checkRateLimit, RATE_LIMITS, rateLimitResponse } from "@/lib/rate-limit";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  if (!getPlanFeatures(session.plan).apiKeys) {
    return planFeatureResponse("apiKeys");
  }

  const user = await prisma.usuario.findUnique({
    where: { id: session.userId },
    select: { apiKeyPrefix: true, apiKeyCreatedAt: true },
  });

  return NextResponse.json({
    hasKey: !!user?.apiKeyPrefix,
    prefix: user?.apiKeyPrefix || null,
    createdAt: user?.apiKeyCreatedAt?.toISOString() || null,
  });
}

export async function POST() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  if (!getPlanFeatures(session.plan).apiKeys) {
    return planFeatureResponse("apiKeys");
  }

  const limit = checkRateLimit(`api-key-gen:${session.userId}`, RATE_LIMITS.apiKeyGenerate);
  if (!limit.allowed) return rateLimitResponse(limit.resetAt);

  const { raw, hash, prefix } = generateApiKey();

  await prisma.usuario.update({
    where: { id: session.userId },
    data: {
      apiKeyHash: hash,
      apiKeyPrefix: prefix,
      apiKeyCreatedAt: new Date(),
    },
  });

  return NextResponse.json({
    key: raw,
    prefix,
    createdAt: new Date().toISOString(),
  });
}

export async function DELETE() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  if (!getPlanFeatures(session.plan).apiKeys) {
    return planFeatureResponse("apiKeys");
  }

  await prisma.usuario.update({
    where: { id: session.userId },
    data: {
      apiKeyHash: null,
      apiKeyPrefix: null,
      apiKeyCreatedAt: null,
    },
  });

  return NextResponse.json({ success: true });
}
