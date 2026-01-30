"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import type { BrandMeta } from "@/lib/schemas";

export default function MetaRadarChart({ data }: { data: BrandMeta["radar"] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="metric" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Radar
          name="Campaign A"
          dataKey="campaignA"
          stroke="#2563eb"
          fill="#2563eb"
          fillOpacity={0.18}
        />
        <Radar
          name="Campaign B"
          dataKey="campaignB"
          stroke="#16a34a"
          fill="#16a34a"
          fillOpacity={0.14}
        />
        <Radar
          name="Campaign C"
          dataKey="campaignC"
          stroke="#f97316"
          fill="#f97316"
          fillOpacity={0.12}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
