"use client";

import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDateRange } from "@/components/layout/DateRangeContext";
import { formatNumber, formatRupees } from "@/lib/utils";
import type { BrandMeta } from "@/lib/schemas";

const MetaDailyTrendsChart = dynamic(
  () => import("@/components/charts/MetaDailyTrendsChart"),
  { ssr: false, loading: () => <div className="h-72 rounded-2xl bg-ink-50" /> }
);

const MetaRadarChart = dynamic(
  () => import("@/components/charts/MetaRadarChart"),
  { ssr: false, loading: () => <div className="h-72 rounded-2xl bg-ink-50" /> }
);

interface BrandMetaClientProps {
  data: BrandMeta;
}

const formatSummaryValue = (label: string, value: number) => {
  if (label.toLowerCase().includes("ctr")) {
    return `${(value * 100).toFixed(2)}%`;
  }
  if (label.toLowerCase().includes("cpc")) {
    return formatRupees(value, 2);
  }
  if (label.toLowerCase().includes("amount")) {
    return formatRupees(value, 2);
  }
  if (label.toLowerCase().includes("roas")) {
    return value.toFixed(2);
  }
  return formatNumber(value);
};

export function BrandMetaClient({ data }: BrandMetaClientProps) {
  const { selectedRange } = useDateRange();

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
            Meta performance summary - {selectedRange}
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
              <Badge variant="success">{item.delta}</Badge>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="border-emerald-100 bg-emerald-50/60">
        <CardContent className="flex items-center gap-3 pt-6">
          <Badge variant="success">Trend</Badge>
          <p className="text-sm font-medium text-emerald-900">{data.alert}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daily Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <MetaDailyTrendsChart data={data.dailyTrends} />
          </div>
        </CardContent>
      </Card>

      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-ink-900">Meta Ads Performance</h2>
          <p className="text-sm text-ink-500">
            Campaign snapshots, creative highlights, and conversion outcomes.
          </p>
        </div>

        <div className="grid gap-6">
          {data.campaigns.map((campaign) => (
            <Card key={campaign.name}>
              <CardHeader className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <CardTitle className="text-base">{campaign.name}</CardTitle>
                  <Badge variant="success">{campaign.status}</Badge>
                </div>
                <div className="grid gap-3 text-sm text-ink-500 sm:grid-cols-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-ink-400">Reach</p>
                    <p className="font-semibold text-ink-800">
                      {formatNumber(campaign.metrics.reach)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-ink-400">CTR</p>
                    <p className="font-semibold text-ink-800">
                      {(campaign.metrics.ctr * 100).toFixed(2)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-ink-400">CPC</p>
                    <p className="font-semibold text-ink-800">
                      {formatRupees(campaign.metrics.cpc, 2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-ink-400">ROAS</p>
                    <p className="font-semibold text-ink-800">
                      {campaign.metrics.roas.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {campaign.creative.map((creative) => (
                    <div
                      key={creative.title}
                      className="flex gap-4 rounded-2xl border border-ink-100 bg-ink-50/40 p-4"
                    >
                      <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-brand-100 via-white to-emerald-50" />
                      <div className="flex-1 space-y-2">
                        <p className="text-sm font-semibold text-ink-800">
                          {creative.title}
                        </p>
                        <div className="grid gap-2 text-xs text-ink-500 sm:grid-cols-4">
                          <div>
                            <p className="uppercase tracking-wide text-ink-400">Spend</p>
                            <p className="font-semibold text-ink-800">
                              {formatRupees(creative.spend, 0)}
                            </p>
                          </div>
                          <div>
                            <p className="uppercase tracking-wide text-ink-400">CTR</p>
                            <p className="font-semibold text-ink-800">
                              {creative.ctr.toFixed(1)}%
                            </p>
                          </div>
                          <div>
                            <p className="uppercase tracking-wide text-ink-400">CPC</p>
                            <p className="font-semibold text-ink-800">
                              {formatRupees(creative.cpc, 1)}
                            </p>
                          </div>
                          <div>
                            <p className="uppercase tracking-wide text-ink-400">ROAS</p>
                            <p className="font-semibold text-ink-800">
                              {creative.roas.toFixed(1)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <MetaRadarChart data={data.radar} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
