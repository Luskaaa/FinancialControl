"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DiaPoint } from "../utils/aggregations";

interface MonthlyAreaChartProps {
  data: DiaPoint[];
  monthLabel: string;
}

const eurFmt = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

interface TooltipPayloadItem {
  value?: number;
  payload?: DiaPoint;
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}) => {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0];
  const dia = item.payload?.dia;
  return (
    <div className="bg-surface border border-line rounded-lg p-3 shadow-lg">
      <p className="text-ink-soft text-xs font-medium tracking-wide uppercase">
        Dia {dia}
      </p>
      <p className="text-lg font-semibold tabular-nums text-ink mt-1">
        {eurFmt.format(item.value ?? 0)}
      </p>
    </div>
  );
};

export default function MonthlyAreaChart({
  data,
  monthLabel,
}: MonthlyAreaChartProps) {
  const totalMes = data.reduce((s, d) => s + d.eur, 0);
  const ariaLabel = `Gastos diários de ${monthLabel}: total ${eurFmt.format(totalMes)}`;

  if (totalMes === 0) {
    return (
      <div className="h-72 flex items-center justify-center bg-surface border border-line rounded-2xl">
        <p className="text-ink-soft text-base">sem dados deste mês</p>
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className="bg-surface border border-line rounded-2xl p-4 md:p-6 shadow-sm"
    >
      <div className="h-72 md:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="areaBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.32} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#cbd5e1"
              opacity={0.5}
              vertical={false}
            />
            <XAxis
              dataKey="dia"
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              minTickGap={16}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                v === 0 ? "" : `€${Math.round(v as number)}`
              }
              width={48}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#2563eb", strokeOpacity: 0.3, strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="eur"
              stroke="#2563eb"
              strokeWidth={2}
              fill="url(#areaBlue)"
              animationDuration={1200}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="sr-only">
      <table>
        <caption>{ariaLabel}</caption>
        <thead>
          <tr>
            <th>Dia</th>
            <th>EUR</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.dia}>
              <td>{d.dia}</td>
              <td>{eurFmt.format(d.eur)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
