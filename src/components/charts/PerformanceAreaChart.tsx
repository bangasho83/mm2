"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { formatNumber } from "@/lib/utils";
import type { Performance } from "@/lib/schemas";

export default function PerformanceAreaChart({ data }: { data: Performance[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ left: 8, right: 8 }}>
        <defs>
          <linearGradient id="impressions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2f7bff" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#2f7bff" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="engagement" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="date" tickFormatter={(value) => value.slice(5)} />
        <YAxis />
        <Tooltip formatter={(value) => formatNumber(Number(value))} />
        <Area
          type="monotone"
          dataKey="impressions"
          stroke="#2f7bff"
          fill="url(#impressions)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="engagement"
          stroke="#10b981"
          fill="url(#engagement)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
