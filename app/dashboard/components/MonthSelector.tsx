"use client";

import { motion } from "motion/react";
import type { MesDisponivel } from "../utils/aggregations";

interface MonthSelectorProps {
  meses: MesDisponivel[];
  selectedKey: string | null;
  onChange: (key: string) => void;
}

export default function MonthSelector({
  meses,
  selectedKey,
  onChange,
}: MonthSelectorProps) {
  return (
    <div
      role="tablist"
      aria-label="Selecionar mês"
      className="flex flex-wrap gap-2"
    >
      {meses.map((m) => {
        const active = m.key === selectedKey;
        return (
          <motion.button
            key={m.key}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(m.key)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className={`relative px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-full border transition-colors ${
              active
                ? "border-brand bg-brand text-white shadow-sm"
                : "border-line bg-surface text-ink-soft hover:text-ink hover:border-brand/40"
            }`}
          >
            {m.label}
          </motion.button>
        );
      })}
    </div>
  );
}
