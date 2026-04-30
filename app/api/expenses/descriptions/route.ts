import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const rows = await prisma.expense.findMany({
      select: { descricao: true },
      distinct: ["descricao"],
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    const descricoes = rows
      .map((r) =>
        r.descricao
          ? r.descricao.charAt(0).toUpperCase() + r.descricao.slice(1)
          : r.descricao,
      )
      .filter((d): d is string => Boolean(d));

    return NextResponse.json(descricoes);
  } catch (error) {
    console.error("Erro ao buscar descrições:", error);
    return NextResponse.json(
      { error: "Erro ao buscar descrições" },
      { status: 500 },
    );
  }
}
