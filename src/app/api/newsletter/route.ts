import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "E-mail inválido." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Inscrição recebida. A Ordem aguarda." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Erro interno." },
      { status: 500 }
    );
  }
}