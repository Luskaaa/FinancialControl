"use client";

import dayjs from "dayjs";
import { formatCurrency } from "@/utils";

interface ExchangeRateBannerProps {
  rate: number | null;
  timestamp: string | null;
  error: boolean;
  loading: boolean;
}

export default function ExchangeRateBanner({
  rate,
  timestamp,
  error,
  loading,
}: ExchangeRateBannerProps) {
  if (loading) {
    return (
      <div className="text-ink-soft text-xs mb-3 text-center">
        💱 A carregar cotação...
      </div>
    );
  }

  if (error || rate === null) {
    return (
      <div className="text-amber-600 text-xs mb-3 text-center">
        💱 Cotação indisponível — preencha manualmente
      </div>
    );
  }

  const formattedTime = timestamp
    ? dayjs(timestamp).format("DD/MM HH:mm")
    : "";

  return (
    <div className="text-ink-soft text-xs mb-3 text-center">
      💱 1 € = {formatCurrency(rate, "BRL")}
      {formattedTime && ` · ${formattedTime}`}
    </div>
  );
}
