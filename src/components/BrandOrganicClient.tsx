"use client";

import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useDateRange } from "@/components/layout/DateRangeContext";
import { formatNumber } from "@/lib/utils";
import type { BrandOrganic } from "@/lib/schemas";

const OrganicUserTrendsChart = dynamic(
  () => import("@/components/charts/OrganicUserTrendsChart"),
  { ssr: false, loading: () => <div className="h-72 rounded-2xl bg-ink-50" /> }
);

const OrganicEventsChart = dynamic(
  () => import("@/components/charts/OrganicEventsChart"),
  { ssr: false, loading: () => <div className="h-72 rounded-2xl bg-ink-50" /> }
);

interface BrandOrganicClientProps {
  data: BrandOrganic;
}

const formatSummaryValue = (label: string, value: number) => {
  if (label.toLowerCase().includes("bounce")) {
    return `${value.toFixed(1)}%`;
  }
  return formatNumber(value);
};

export function BrandOrganicClient({ data }: BrandOrganicClientProps) {
  const { selectedRange } = useDateRange();
  const maxSessions = data.funnel[0]?.sessions ?? 1;
  const accentMap: Record<string, string> = {
    pink: "bg-pink-500",
    blue: "bg-blue-500",
    slate: "bg-slate-500",
    violet: "bg-violet-500",
    emerald: "bg-emerald-500",
    orange: "bg-orange-500",
    sky: "bg-sky-500",
    amber: "bg-amber-500",
    gray: "bg-gray-400",
    indigo: "bg-indigo-500"
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-semibold text-ink-900">
            {data.header.title}
          </h1>
          <p className="text-sm text-ink-500">
            {data.header.brand} · {data.header.website}
          </p>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
            Organic performance summary - {selectedRange}
          </p>
        </div>
        <Badge variant="neutral">{selectedRange}</Badge>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {data.summary.map((item) => (
          <Card key={item.label}>
            <CardContent className="space-y-3 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                {item.label}
              </p>
              <p className="text-2xl font-display font-semibold text-ink-900">
                {formatSummaryValue(item.label, item.value)}
              </p>
              <p className="text-xs text-ink-500">{item.note}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>User Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <OrganicUserTrendsChart data={data.userTrends} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Events by Date</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <OrganicEventsChart data={data.keyEvents} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Purchase Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-3">
          {data.funnel.map((stage, index) => (
            <div key={stage.label} className="space-y-3">
              <div className="flex items-center justify-between text-sm text-ink-500">
                <span className="font-semibold text-ink-800">{stage.label}</span>
                <Badge variant="neutral">Step {index + 1}</Badge>
              </div>
              <div className="text-2xl font-display font-semibold text-ink-900">
                {formatNumber(stage.sessions)}
              </div>
              <div className="text-xs text-ink-500">Avg time in step</div>
              <div className="text-sm font-semibold text-ink-800">{stage.avgTime}</div>
              <div className="text-xs text-ink-500">{stage.dropOff}</div>
              <Progress value={(stage.sessions / maxSessions) * 100} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Pages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-[1.2fr_2fr_repeat(3,minmax(0,1fr))] gap-3 text-xs font-semibold uppercase tracking-wide text-ink-400">
            <span>Page</span>
            <span>Title</span>
            <span>Views</span>
            <span>Users</span>
            <span>Avg. Duration</span>
          </div>
          {data.topPages.map((page) => (
            <div
              key={page.page}
              className="grid grid-cols-[1.2fr_2fr_repeat(3,minmax(0,1fr))] gap-3 rounded-2xl border border-ink-100 bg-white p-3 text-sm text-ink-700"
            >
              <span className="font-semibold text-ink-800">{page.page}</span>
              <span className="text-ink-500">{page.title}</span>
              <span>{formatNumber(page.views)}</span>
              <span>{formatNumber(page.users)}</span>
              <span>{page.avgDuration}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Traffic Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.traffic.map((row) => (
            <div key={row.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm text-ink-600">
                <span>{row.label}</span>
                <span>
                  {formatNumber(row.value)} ({row.percent.toFixed(1)}%)
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-ink-100">
                <div
                  className={`h-2 rounded-full ${accentMap[row.accent] ?? "bg-ink-300"}`}
                  style={{ width: `${row.percent}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
