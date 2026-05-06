import type { Expense } from "@/types";

export interface MonthBucket {
  totalEUR: number;
  totalBRL: number;
  count: number;
  maiorGasto: { valor: number; descricao: string } | null;
}

export interface DiaPoint {
  dia: number;
  eur: number;
  brl: number;
}

export interface MesPoint {
  label: string;
  year: number;
  month: number;
  eur: number;
  brl: number;
}

export interface DescricaoPoint {
  descricao: string;
  total: number;
  count: number;
}

export interface MesDisponivel {
  key: string;
  year: number;
  month: number;
  label: string;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

const getDate = (e: Expense) => new Date(e.data);

const isInMonth = (e: Expense, year: number, month: number) => {
  const d = getDate(e);
  return d.getFullYear() === year && d.getMonth() === month;
};

export function gastosDoMes(
  expenses: Expense[],
  year: number,
  month: number,
): MonthBucket {
  let totalEUR = 0;
  let totalBRL = 0;
  let count = 0;
  let maior: { valor: number; descricao: string } | null = null;

  for (const e of expenses) {
    if (!isInMonth(e, year, month)) continue;
    totalEUR += e.custoEUR ?? 0;
    totalBRL += e.custoBRL ?? 0;
    count += 1;
    const valor = e.custoEUR ?? 0;
    if (!maior || valor > maior.valor) {
      maior = { valor, descricao: e.descricao };
    }
  }

  return {
    totalEUR: round2(totalEUR),
    totalBRL: round2(totalBRL),
    count,
    maiorGasto: maior,
  };
}

export function gastosPorDiaDoMes(
  expenses: Expense[],
  year: number,
  month: number,
): DiaPoint[] {
  const diasNoMes = new Date(year, month + 1, 0).getDate();
  const map = new Map<number, { eur: number; brl: number }>();
  for (let d = 1; d <= diasNoMes; d++) map.set(d, { eur: 0, brl: 0 });

  for (const e of expenses) {
    if (!isInMonth(e, year, month)) continue;
    const dia = getDate(e).getDate();
    const slot = map.get(dia)!;
    slot.eur += e.custoEUR ?? 0;
    slot.brl += e.custoBRL ?? 0;
  }

  return Array.from(map.entries()).map(([dia, v]) => ({
    dia,
    eur: round2(v.eur),
    brl: round2(v.brl),
  }));
}

const MES_LABELS = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export function gastosPorMes(
  expenses: Expense[],
  ultimosN = 12,
  ref: Date = new Date(),
): MesPoint[] {
  const points: MesPoint[] = [];
  for (let i = ultimosN - 1; i >= 0; i--) {
    const d = new Date(ref.getFullYear(), ref.getMonth() - i, 1);
    const year = d.getFullYear();
    const month = d.getMonth();
    let eur = 0;
    let brl = 0;
    for (const e of expenses) {
      if (!isInMonth(e, year, month)) continue;
      eur += e.custoEUR ?? 0;
      brl += e.custoBRL ?? 0;
    }
    points.push({
      label:
        MES_LABELS[month] +
        (year !== ref.getFullYear() ? `/${String(year).slice(2)}` : ""),
      year,
      month,
      eur: round2(eur),
      brl: round2(brl),
    });
  }
  return points;
}

export function topDescricoes(
  expenses: Expense[],
  year: number,
  month: number,
  top = 5,
): DescricaoPoint[] {
  const map = new Map<string, { total: number; count: number }>();
  for (const e of expenses) {
    if (!isInMonth(e, year, month)) continue;
    const key = e.descricao.trim();
    const slot = map.get(key) ?? { total: 0, count: 0 };
    slot.total += e.custoEUR ?? 0;
    slot.count += 1;
    map.set(key, slot);
  }
  return Array.from(map.entries())
    .map(([descricao, v]) => ({
      descricao,
      total: round2(v.total),
      count: v.count,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, top);
}

export function mediaDiaria(
  expenses: Expense[],
  year: number,
  month: number,
): { eur: number; brl: number } {
  const { totalEUR, totalBRL } = gastosDoMes(expenses, year, month);
  const hoje = new Date();
  const isCurrentMonth =
    hoje.getFullYear() === year && hoje.getMonth() === month;
  const diasReferencia = isCurrentMonth
    ? hoje.getDate()
    : new Date(year, month + 1, 0).getDate();
  if (diasReferencia <= 0) return { eur: 0, brl: 0 };
  return {
    eur: round2(totalEUR / diasReferencia),
    brl: round2(totalBRL / diasReferencia),
  };
}

export function deltaVsMesAnterior(
  expenses: Expense[],
  year: number,
  month: number,
): { pctEUR: number | null; pctBRL: number | null } {
  const atual = gastosDoMes(expenses, year, month);
  const anteriorDate = new Date(year, month - 1, 1);
  const anterior = gastosDoMes(
    expenses,
    anteriorDate.getFullYear(),
    anteriorDate.getMonth(),
  );
  const pct = (now: number, prev: number) =>
    prev === 0 ? null : Math.round(((now - prev) / prev) * 1000) / 10;
  return {
    pctEUR: pct(atual.totalEUR, anterior.totalEUR),
    pctBRL: pct(atual.totalBRL, anterior.totalBRL),
  };
}

export function mesesDisponiveis(expenses: Expense[]): MesDisponivel[] {
  const map = new Map<string, MesDisponivel>();
  for (const e of expenses) {
    const d = getDate(e);
    const year = d.getFullYear();
    const month = d.getMonth();
    const key = `${year}-${month}`;
    if (!map.has(key)) {
      map.set(key, {
        key,
        year,
        month,
        label: `${MES_LABELS[month]} ${year}`,
      });
    }
  }
  return Array.from(map.values()).sort(
    (a, b) => b.year - a.year || b.month - a.month,
  );
}
