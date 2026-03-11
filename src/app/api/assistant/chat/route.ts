import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { toolDefinitions, executeToolCall, obtenerMemorias } from "@/lib/assistant-tools";
import { buildPageContext, buildSystemPrompt } from "@/lib/assistant-context";
import { routeMessage } from "@/lib/assistant-router";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, RATE_LIMITS, rateLimitResponse } from "@/lib/rate-limit";
import { assistantChatSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

// Modelo por plan: Sonnet para pago, Haiku para gratis
const MODEL_FREE = "claude-haiku-4-5-20251001";
const MODEL_PAID = "claude-sonnet-4-20250514";

function getModelForPlan(plan: string): string {
  // Starter = free = Haiku. Cualquier plan de pago = Sonnet.
  return plan === "starter" ? MODEL_FREE : MODEL_PAID;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  // Rate limit: 10 per minute per user
  const session = await getSession();
  if (session) {
    const limit = checkRateLimit(`assistant:${session.userId}`, RATE_LIMITS.assistant);
    if (!limit.allowed) return rateLimitResponse(limit.resetAt);
  }

  const body = await request.json();
  const { data, error } = validateBody(assistantChatSchema, body);
  if (error) return error;

  // ===== STEP 1: Try predefined responses (0 tokens) =====
  const routerResult = routeMessage(data.message);
  if (routerResult.handled) {
    return NextResponse.json({
      response: routerResult.response,
      suggestedActions: routerResult.suggestedActions || [],
      source: "predefined", // For debugging/analytics
    });
  }

  // ===== STEP 2: Forward to Claude API =====
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY no configurada. Anade tu API key al archivo .env" },
      { status: 500 }
    );
  }

  // Get user plan from DB (fresh, not from JWT which may be stale after upgrade)
  let userPlan = "starter";
  const userId = session?.userId;
  if (userId) {
    const dbUser = await prisma.usuario.findUnique({
      where: { id: userId },
      select: { plan: true },
    });
    userPlan = dbUser?.plan || "starter";
  }
  const model = getModelForPlan(userPlan);

  // Build context + load persistent memories
  const [pageContext, memorias] = await Promise.all([
    buildPageContext(data.context.pathname, data.context.entityId, userId),
    userId ? obtenerMemorias(userId) : Promise.resolve([]),
  ]);
  const systemPrompt = buildSystemPrompt(pageContext, memorias);

  // Build message history for Claude (keep last 20 messages = 10 exchanges)
  const messages: Anthropic.MessageParam[] = [];

  for (const msg of data.history.slice(-20)) {
    messages.push({
      role: msg.role,
      content: msg.content,
    });
  }

  // Add current user message
  messages.push({ role: "user", content: data.message });

  try {
    // Tool use loop - Claude may call multiple tools
    let response = await anthropic.messages.create({
      model,
      max_tokens: 800, // Reduced from 1024 - force concise responses
      system: systemPrompt,
      tools: toolDefinitions,
      messages,
    });

    // Process tool calls in a loop
    const allMessages = [...messages];
    let iterations = 0;
    const maxIterations = 5;

    while (response.stop_reason === "tool_use" && iterations < maxIterations) {
      iterations++;

      // Get all tool use blocks
      const toolUseBlocks = response.content.filter(
        (block): block is Anthropic.Messages.ToolUseBlock =>
          block.type === "tool_use"
      );

      // Add assistant response with tool calls
      allMessages.push({
        role: "assistant",
        content: response.content,
      });

      // Execute all tool calls and build tool results
      const toolResults: Anthropic.ToolResultBlockParam[] = [];
      for (const toolUse of toolUseBlocks) {
        const result = await executeToolCall(
          toolUse.name,
          toolUse.input as Record<string, unknown>,
          userId
        );
        toolResults.push({
          type: "tool_result",
          tool_use_id: toolUse.id,
          content: result,
        });
      }

      // Add tool results
      allMessages.push({
        role: "user",
        content: toolResults,
      });

      // Call Claude again with tool results
      response = await anthropic.messages.create({
        model,
        max_tokens: 800,
        system: systemPrompt,
        tools: toolDefinitions,
        messages: allMessages,
      });
    }

    // Extract text response
    const textBlocks = response.content.filter(
      (block): block is Anthropic.Messages.TextBlock => block.type === "text"
    );
    const fullResponse = textBlocks.map((b) => b.text).join("\n");

    // Parse suggested actions from response
    const actionRegex = /\[ACTION:(.+?)\|(.+?)\]/g;
    const suggestedActions: Array<{ label: string; href: string }> = [];
    let match;
    while ((match = actionRegex.exec(fullResponse)) !== null) {
      suggestedActions.push({ label: match[1], href: match[2] });
    }

    // Clean response text (remove action markers)
    const cleanResponse = fullResponse
      .replace(/\[ACTION:.+?\|.+?\]/g, "")
      .trim();

    return NextResponse.json({
      response: cleanResponse,
      suggestedActions,
      source: "claude", // For debugging/analytics
    });
  } catch (err: unknown) {
    console.error("Assistant error:", err);
    const errMessage =
      err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json(
      { error: `Error al comunicarse con el asistente: ${errMessage}` },
      { status: 500 }
    );
  }
}
