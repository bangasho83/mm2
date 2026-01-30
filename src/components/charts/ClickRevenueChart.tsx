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
import { formatNumber } from "@/lib/utils";
import type { Performance } from "@/lib/schemas";

export default function ClickRevenueChart({ data }: { data: Performance[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ left: 8, right: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="date" tickFormatter={(value) => value.slice(5)} />
        <YAxis />
        <Tooltip formatter={(value) => formatNumber(Number(value))} />
        <Line type="monotone" dataKey="clicks" stroke="#f97316" strokeWidth={2} />
        <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
