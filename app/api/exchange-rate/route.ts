import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://economia.awesomeapi.com.br/json/last/EUR-BRL",
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Falha ao obter cotação" },
        { status: 503 },
      );
    }

    const data = await response.json();
    const rate = parseFloat(data?.EURBRL?.bid);
    const timestamp = data?.EURBRL?.create_date;

    if (!Number.isFinite(rate) || rate <= 0) {
      return NextResponse.json(
        { error: "Cotação inválida" },
        { status: 503 },
      );
    }

    return NextResponse.json({ rate, timestamp });
  } catch (error) {
    console.error("Erro ao buscar cotação:", error);
    return NextResponse.json(
      { error: "Erro ao buscar cotação" },
      { status: 503 },
    );
  }
}
