"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

type CurrencyCode = "EUR" | "BRL";

interface KpiCardProps {
  label: string;
  value: number;
  currency?: CurrencyCode;
  fractionDigits?: number;
  hint?: string;
  delay?: number;
}

const formatter = (currency: CurrencyCode | undefined, fractionDigits = 0) =>
  currency
    ? new Intl.NumberFormat(currency === "EUR" ? "pt-PT" : "pt-BR", {
        style: "currency",
        currency,
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      })
    : new Intl.NumberFormat("pt-PT", {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      });

export default function KpiCard({
  label,
  value,
  currency,
  fractionDigits = 0,
  hint,
  delay = 0,
}: KpiCardProps) {
  const mv = useMotionValue(0);
  const fmt = formatter(currency, fractionDigits);
  const display = useTransform(mv, (v) => fmt.format(v));

  useEffect(() => {
    const controls = animate(mv, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      delay,
    });
    return () => controls.stop();
  }, [mv, value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      className="bg-surface border border-line rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-brand/30 transition"
    >
      <p className="text-ink-soft text-xs font-medium tracking-wide uppercase">
        {label}
      </p>
      <motion.p className="text-3xl md:text-4xl font-semibold tabular-nums mt-3 text-ink leading-none">
        {display}
      </motion.p>
      {hint && (
        <p className="text-ink-soft text-xs mt-3 truncate">{hint}</p>
      )}
    </motion.div>
  );
}
