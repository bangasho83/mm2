"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { BrandMeta } from "@/lib/schemas";

const formatPercent = (value: number) => `${value.toFixed(1)}%`;

export default function MetaDailyTrendsChart({
  data
}: {
  data: BrandMeta["dailyTrends"];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ left: 8, right: 8, top: 12 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" tickFormatter={(value) => `Rs.${value}`} />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          formatter={(value, name) => {
            if (name === "CTR") {
              return [formatPercent(Number(value)), "CTR"];
            }
            if (name === "CPC") {
              return [`Rs.${Number(value).toFixed(1)}`, "CPC"];
            }
            return [`Rs.${Number(value).toFixed(0)}`, "Spend"];
          }}
        />
        <Line
          type="monotone"
          dataKey="spend"
          name="Spend"
          stroke="#2563eb"
          strokeWidth={2}
          yAxisId="left"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="ctr"
          name="CTR"
          stroke="#16a34a"
          strokeWidth={2}
          yAxisId="right"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="cpc"
          name="CPC"
          stroke="#f97316"
          strokeWidth={2}
          yAxisId="right"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
