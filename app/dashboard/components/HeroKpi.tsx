"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

interface HeroKpiProps {
  totalEUR: number;
  totalBRL: number;
  deltaEUR: number | null;
  monthLabel: string;
}

const eurFmt = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const brlFmt = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export default function HeroKpi({
  totalEUR,
  totalBRL,
  deltaEUR,
  monthLabel,
}: HeroKpiProps) {
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => eurFmt.format(v));

  useEffect(() => {
    const controls = animate(mv, totalEUR, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [mv, totalEUR]);

  const deltaSign = deltaEUR == null ? null : deltaEUR > 0 ? "+" : "";
  const deltaColor =
    deltaEUR == null
      ? "text-ink-soft"
      : deltaEUR > 0
        ? "text-rose-600"
        : "text-emerald-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative bg-surface border border-line rounded-2xl p-6 md:p-8 shadow-sm"
    >
      <p className="text-brand text-xs font-semibold tracking-widest uppercase mb-3">
        Total · {monthLabel}
      </p>
      <motion.h1 className="text-[clamp(2.75rem,9vw,6.5rem)] font-semibold tabular-nums leading-[0.95] tracking-tight text-ink">
        {display}
      </motion.h1>
      <div className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <span className="text-brand-soft text-xl tabular-nums font-medium">
          {brlFmt.format(totalBRL)}
        </span>
        {deltaEUR !== null && (
          <span className={`text-sm tabular-nums font-medium ${deltaColor}`}>
            {deltaSign}
            {deltaEUR.toFixed(1).replace(".", ",")}% vs mês anterior
          </span>
        )}
        {deltaEUR === null && (
          <span className="text-sm text-ink-soft">— sem mês anterior</span>
        )}
      </div>
    </motion.div>
  );
}
