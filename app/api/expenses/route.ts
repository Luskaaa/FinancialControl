import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: { data: "desc" },
    });
    return NextResponse.json(expenses);
  } catch (error) {
    console.error("Erro ao buscar gastos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar gastos" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const expense = await prisma.expense.create({
      data: {
        custoEUR: body.custoEUR,
        custoBRL: body.custoBRL,
        data: new Date(body.data),
        descricao: body.descricao,
      },
    });

    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar gasto:", error);
    return NextResponse.json({ error: "Erro ao criar gasto" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID é obrigatório" },
        { status: 400 },
      );
    }

    await prisma.expense.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Erro ao excluir gasto:", error);
    return NextResponse.json(
      { error: "Erro ao excluir gasto" },
      { status: 500 },
    );
  }
}
