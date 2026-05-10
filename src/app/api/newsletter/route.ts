import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_REQUESTS_PER_WINDOW = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;

const requestsByIp = new Map<string, number[]>();

function jsonResponse(body: Record<string, string>, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = requestsByIp.get(ip) ?? [];
  const recent = timestamps.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    requestsByIp.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestsByIp.set(ip, recent);
  return false;
}

export function GET() {
  return jsonResponse({ error: "Método não permitido." }, 405);
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return jsonResponse({ error: "Formato de requisição inválido." }, 415);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return jsonResponse({ error: "Muitas tentativas. Tente novamente em instantes." }, 429);
  }

  try {
    const body = (await request.json()) as { email?: unknown; website?: unknown };
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const website = typeof body.website === "string" ? body.website.trim() : "";

    if (website) {
      return jsonResponse({ error: "Requisição inválida." }, 400);
    }

    if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
      return jsonResponse({ error: "E-mail inválido." }, 422);
    }

    return jsonResponse({ message: "Inscrição recebida. A Ordem aguarda." }, 200);
  } catch {
    return jsonResponse({ error: "Não foi possível processar sua inscrição." }, 400);
  }
}
