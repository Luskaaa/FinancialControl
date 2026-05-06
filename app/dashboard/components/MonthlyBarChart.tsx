"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MesPoint } from "../utils/aggregations";

interface MonthlyBarChartProps {
  data: MesPoint[];
  selectedKey: string | null;
  onSelect?: (key: string) => void;
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

interface BarTooltipPayload {
  payload?: MesPoint;
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: BarTooltipPayload[];
}) => {
  if (!active || !payload || payload.length === 0) return null;
  const m = payload[0].payload;
  if (!m) return null;
  return (
    <div className="bg-surface border border-line rounded-lg p-3 shadow-lg min-w-40">
      <p className="text-ink-soft text-xs font-medium tracking-wide uppercase">
        {m.label}
      </p>
      <div className="mt-1 space-y-0.5">
        <p className="text-brand tabular-nums text-sm font-semibold">
          {eurFmt.format(m.eur)}
        </p>
        <p className="text-brand-soft tabular-nums text-sm font-semibold">
          {brlFmt.format(m.brl)}
        </p>
      </div>
    </div>
  );
};

export default function MonthlyBarChart({
  data,
  selectedKey,
  onSelect,
}: MonthlyBarChartProps) {
  const totalEUR = data.reduce((s, d) => s + d.eur, 0);
  const ariaLabel = `Comparação dos últimos 12 meses, total ${eurFmt.format(totalEUR)}`;

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className="bg-surface border border-line rounded-2xl p-4 md:p-6 shadow-sm"
    >
      <div className="h-72 md:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
            barCategoryGap="20%"
            onClick={(state) => {
              const payload = (
                state as { activePayload?: { payload?: MesPoint }[] }
              )?.activePayload?.[0]?.payload;
              if (payload && onSelect) {
                onSelect(`${payload.year}-${payload.month}`);
              }
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#cbd5e1"
              opacity={0.5}
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
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
              cursor={{ fill: "#2563eb", fillOpacity: 0.06 }}
            />
            <Bar
              dataKey="eur"
              fill="#2563eb"
              radius={[4, 4, 0, 0]}
              animationDuration={1200}
              animationEasing="ease-out"
            />
            <Bar
              dataKey="brl"
              fill="#93c5fd"
              radius={[4, 4, 0, 0]}
              animationDuration={1200}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-end gap-4 mt-2 text-xs text-ink-soft">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-brand" />
          EUR
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-brand-soft" />
          BRL
        </span>
      </div>
      <div className="sr-only">
      <table>
        <caption>{ariaLabel}</caption>
        <thead>
          <tr>
            <th>Mês</th>
            <th>EUR</th>
            <th>BRL</th>
          </tr>
        </thead>
        <tbody>
          {data.map((m) => (
            <tr
              key={`${m.year}-${m.month}`}
              aria-current={
                selectedKey === `${m.year}-${m.month}` ? "true" : undefined
              }
            >
              <td>{m.label}</td>
              <td>{eurFmt.format(m.eur)}</td>
              <td>{brlFmt.format(m.brl)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
