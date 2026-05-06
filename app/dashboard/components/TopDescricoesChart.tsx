"use client";

import { motion } from "motion/react";
import type { DescricaoPoint } from "../utils/aggregations";

interface TopDescricoesChartProps {
  data: DescricaoPoint[];
  monthLabel: string;
}

const eurFmt = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export default function TopDescricoesChart({
  data,
  monthLabel,
}: TopDescricoesChartProps) {
  const ariaLabel = `Top 5 descrições com maior gasto em ${monthLabel}`;

  if (data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center bg-surface border border-line rounded-2xl">
        <p className="text-ink-soft text-base">sem dados deste mês</p>
      </div>
    );
  }

  const max = Math.max(...data.map((d) => d.total), 1);

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className="bg-surface border border-line rounded-2xl p-4 md:p-6 shadow-sm"
    >
      <ul className="space-y-4">
        {data.map((d, i) => {
          const pct = (d.total / max) * 100;
          return (
            <li key={d.descricao}>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-ink font-medium truncate pr-3">
                  {d.descricao}
                </span>
                <span className="tabular-nums text-brand text-lg font-semibold">
                  {eurFmt.format(d.total)}
                </span>
              </div>
              <div className="relative h-1.5 bg-brand-tint rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{
                    duration: 1.2,
                    delay: 0.1 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-soft to-brand rounded-full"
                />
              </div>
              <p className="text-ink-soft text-xs mt-1">
                {d.count} {d.count === 1 ? "gasto" : "gastos"}
              </p>
            </li>
          );
        })}
      </ul>
      <div className="sr-only">
      <table>
        <caption>{ariaLabel}</caption>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Total EUR</th>
            <th>Nº de gastos</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.descricao}>
              <td>{d.descricao}</td>
              <td>{eurFmt.format(d.total)}</td>
              <td>{d.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
