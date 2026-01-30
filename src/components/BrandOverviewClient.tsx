"use client";

import { ArrowLeft, ArrowUpRight, CalendarDays } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useDateRange } from "@/components/layout/DateRangeContext";
import { formatNumber, formatPercent, formatRupees } from "@/lib/utils";
import type { Client, ClientDetail } from "@/lib/schemas";

const PerformanceAreaChart = dynamic(
  () => import("@/components/charts/PerformanceAreaChart"),
  {
    ssr: false,
    loading: () => <div className="h-80 rounded-2xl border border-ink-100 bg-white" />
  }
);

interface BrandOverviewClientProps {
  client: Client;
  detail: ClientDetail;
}

export function BrandOverviewClient({ client, detail }: BrandOverviewClientProps) {
  const { selectedRange } = useDateRange();
  const funnelMax = Math.max(...detail.funnel.map((stage) => stage.value));
  const formatPercentExact = (value: number) => `${(value * 100).toFixed(2)}%`;

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-3">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-500">
            <ArrowLeft className="h-4 w-4" />
            Back to overview
          </Link>
          <div>
            <h1 className="font-display text-3xl font-semibold text-ink-900">
              {client.name}
            </h1>
            <p className="mt-2 text-sm text-ink-500">
              {client.industry} - {client.region} - Managed by {client.manager}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-ink-400">
              Brand performance dashboard - {selectedRange}
            </p>
            <p className="mt-1 text-xs text-ink-400">
              Brand performance dashboard | 2025-12-01 to 2025-12-29 vs 2025-11-02 to 2025-11-30
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {client.tags.map((tag) => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
          <Button variant="outline" size="sm">
            <CalendarDays className="h-4 w-4" />
            Schedule report
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Card>
          <CardContent className="space-y-3 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Visitors</p>
            <p className="text-2xl font-display font-semibold text-ink-900">
              {formatNumber(detail.overview.visitors)}
            </p>
            <Badge variant="success">{client.deltas.impressions} vs last week</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-3 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Organic Search</p>
            <p className="text-2xl font-display font-semibold text-ink-900">
              {formatNumber(detail.overview.organicSearch)}
            </p>
            <Badge variant="success">{client.deltas.engagement} vs last week</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-3 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Ad Spend</p>
            <p className="text-2xl font-display font-semibold text-ink-900">
              {formatRupees(detail.overview.adSpend)}
            </p>
            <Badge variant="neutral">{client.deltas.spend}</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-3 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Revenue</p>
            <p className="text-2xl font-display font-semibold text-ink-900">
              {formatRupees(detail.overview.revenue)}
            </p>
            <Badge variant="success">
              {client.deltas.revenue} - ROAS {client.summary.roas.toFixed(1)}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-3 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">CTR</p>
            <p className="text-2xl font-display font-semibold text-ink-900">
              {formatPercentExact(detail.overview.ctr)}
            </p>
            <Badge variant="success">+4% vs last week</Badge>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2.2fr_1fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Daily performance trends</CardTitle>
              <Button variant="ghost" size="sm">
                View insights
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="h-80">
            <PerformanceAreaChart data={client.performance} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Channel mix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {client.channels.map((channel) => (
              <div key={channel.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-ink-700">{channel.name}</span>
                  <span className="text-ink-500">{channel.share}%</span>
                </div>
                <Progress value={channel.share} />
                <div className="flex items-center justify-between text-xs text-ink-400">
                  <span>{formatNumber(channel.followers)} followers</span>
                  <span>{formatPercent(channel.engagementRate)} engagement</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {detail.trafficSources.map((source) => (
              <div key={source.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-ink-800">{source.label}</span>
                  <span className="text-ink-500">{source.share}%</span>
                </div>
                <Progress value={source.share} />
                <div className="flex items-center justify-between text-xs text-ink-400">
                  <span>{formatNumber(source.value)} visits</span>
                  <span>{source.delta}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meta Ads</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-ink-600">
            <div className="flex items-center justify-between">
              <span>Spend</span>
              <span className="font-semibold text-ink-800">{formatRupees(detail.metaAds.spend)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Impressions</span>
              <span className="font-semibold text-ink-800">{formatNumber(detail.metaAds.impressions)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Clicks</span>
              <span className="font-semibold text-ink-800">{formatNumber(detail.metaAds.clicks)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Reach</span>
              <span className="font-semibold text-ink-800">{formatNumber(detail.metaAds.reach)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>CTR</span>
              <span className="font-semibold text-ink-800">{formatPercentExact(detail.metaAds.ctr)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>CPC</span>
              <span className="font-semibold text-ink-800">{formatRupees(detail.metaAds.cpc)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>CPM</span>
              <span className="font-semibold text-ink-800">{formatRupees(detail.metaAds.cpm)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meta Campaigns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {detail.metaCampaigns.map((campaign) => (
              <div
                key={campaign.name}
                className="rounded-2xl border border-ink-100 bg-ink-50/60 px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink-800">{campaign.name}</p>
                  <Badge variant={campaign.status === "Active" ? "success" : "neutral"}>
                    {campaign.status}
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-ink-500">{campaign.type}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-ink-400">
                  <span>{formatRupees(campaign.spend)}</span>
                  <span>{formatNumber(campaign.results)} results</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-ink-100 bg-white p-4">
              <p className="text-xs uppercase tracking-wide text-ink-400">Transactions</p>
              <p className="mt-2 text-2xl font-display font-semibold text-ink-900">
                {formatNumber(detail.sales.transactions)}
              </p>
            </div>
            <div className="rounded-2xl border border-ink-100 bg-white p-4">
              <p className="text-xs uppercase tracking-wide text-ink-400">Avg Order Value</p>
              <p className="mt-2 text-2xl font-display font-semibold text-ink-900">
                {formatRupees(detail.sales.avgOrderValue)}
              </p>
            </div>
            <div className="space-y-2 text-sm text-ink-600">
              {detail.sales.topProducts.map((product) => (
                <div key={product.name} className="flex items-center justify-between">
                  <span className="text-ink-700">{product.name}</span>
                  <span className="font-semibold text-ink-800">
                    {formatRupees(product.revenue)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr_1.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Locations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-3xl font-display font-semibold text-ink-900">
                {detail.locations.rating.toFixed(1)}
              </p>
              <p className="text-xs text-ink-500">Average rating</p>
            </div>
            <div className="space-y-2">
              {detail.locations.distribution.map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-ink-400">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <Progress value={item.value} />
                </div>
              ))}
            </div>
            <p className="text-xs text-ink-500">Total ratings: {detail.locations.totalRatings}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {detail.funnel.map((stage) => (
              <div
                key={stage.label}
                className="rounded-2xl border border-ink-100 bg-ink-50/60 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink-800">{stage.label}</p>
                  <span className="text-xs text-ink-500">{stage.delta}</span>
                </div>
                <p className="mt-2 text-2xl font-display font-semibold text-ink-900">
                  {formatNumber(stage.value)}
                </p>
                <Progress value={(stage.value / funnelMax) * 100} className="mt-3" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-ink-100 bg-ink-50/60 p-4">
                <p className="text-xs uppercase tracking-wide text-ink-400">Facebook Posts</p>
                <p className="mt-2 text-2xl font-display font-semibold text-ink-900">
                  {detail.social.facebook.posts}
                </p>
                <p className="text-xs text-ink-500">
                  {formatNumber(detail.social.facebook.followers)} followers
                </p>
              </div>
              <div className="rounded-2xl border border-ink-100 bg-ink-50/60 p-4">
                <p className="text-xs uppercase tracking-wide text-ink-400">Instagram Posts</p>
                <p className="mt-2 text-2xl font-display font-semibold text-ink-900">
                  {detail.social.instagram.posts}
                </p>
                <p className="text-xs text-ink-500">
                  {formatNumber(detail.social.instagram.followers)} followers
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {detail.social.recentPosts.map((post) => (
                <div
                  key={post.title}
                  className={`flex h-28 flex-col justify-between rounded-2xl border border-ink-100 bg-gradient-to-br ${post.accent} p-4 shadow-soft`}
                >
                  <p className="text-sm font-semibold text-ink-800">{post.title}</p>
                  <Button variant="ghost" size="sm" className="mt-2 w-full">
                    View post
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1.6fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Starred Keywords</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {detail.starredKeywords.map((keyword) => (
              <Badge key={keyword} variant="neutral">
                {keyword}
              </Badge>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tracked Pages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {detail.trackedPages.map((page) => (
              <div
                key={page.title}
                className="rounded-2xl border border-ink-100 bg-white px-4 py-3"
              >
                <p className="text-sm font-semibold text-ink-800">{page.title}</p>
                <div className="mt-2 flex items-center justify-between text-xs text-ink-400">
                  <span>{formatNumber(page.views)} views</span>
                  <span>{page.avgTime} avg</span>
                  <span>{page.conversions} conversions</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Backlinks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {detail.backlinks.map((link) => (
              <div
                key={link.url}
                className="rounded-2xl border border-ink-100 bg-white px-4 py-3"
              >
                <p className="text-sm font-semibold text-ink-800">{link.domain}</p>
                <p className="mt-1 text-xs text-brand-600">{link.url}</p>
                <Badge variant={link.status === "Valid" ? "success" : "neutral"}>
                  {link.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

    </div>
  );
}
