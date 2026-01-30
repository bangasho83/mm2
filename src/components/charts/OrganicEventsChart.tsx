"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { BrandOrganic } from "@/lib/schemas";

export default function OrganicEventsChart({
  data
}: {
  data: BrandOrganic["keyEvents"];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ left: 8, right: 8, top: 12 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="pageView" name="Page View" fill="#2563eb" radius={[6, 6, 0, 0]} />
        <Bar dataKey="formSubmit" name="Form Submit" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
        <Bar dataKey="purchase" name="Purchase" fill="#22c55e" radius={[6, 6, 0, 0]} />
        <Bar dataKey="addToCart" name="Add to Cart" fill="#a855f7" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
