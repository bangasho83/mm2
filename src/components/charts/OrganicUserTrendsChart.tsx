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
import type { BrandOrganic } from "@/lib/schemas";

export default function OrganicUserTrendsChart({
  data
}: {
  data: BrandOrganic["userTrends"];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ left: 8, right: 8, top: 12 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="totalUsers"
          name="Total"
          stroke="#2563eb"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="engagedSessions"
          name="Engaged Sessions"
          stroke="#0ea5e9"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="organicSearch"
          name="Organic Search"
          stroke="#22c55e"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="paidSearch"
          name="Paid Search"
          stroke="#f97316"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="referral"
          name="Referral"
          stroke="#a855f7"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
