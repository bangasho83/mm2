"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Globe2,
  Star,
  StarHalf,
  StarOff
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { useDateRange } from "@/components/layout/DateRangeContext";
import type { Client, ClientDetail } from "@/lib/schemas";

const PerformanceAreaChart = dynamic(
  () => import("@/components/charts/PerformanceAreaChart"),
  {
    ssr: false,
    loading: () => <div className="h-80 rounded-2xl border border-ink-100 bg-white" />
  }
);

const ClickRevenueChart = dynamic(
  () => import("@/components/charts/ClickRevenueChart"),
  {
    ssr: false,
    loading: () => <div className="h-72 rounded-2xl border border-ink-100 bg-white" />
  }
);

interface ClientDetailClientProps {
  client: Client;
  detail: ClientDetail;
}

function RatingStars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex items-center gap-1 text-amber-400">
      {Array.from({ length: full }).map((_, idx) => (
        <Star key={`full-${idx}`} className="h-4 w-4 fill-current" />
      ))}
      {half ? <StarHalf className="h-4 w-4 fill-current" /> : null}
      {Array.from({ length: empty }).map((_, idx) => (
        <StarOff key={`empty-${idx}`} className="h-4 w-4" />
      ))}
    </div>
  );
}

export function ClientDetailClient({ client, detail }: ClientDetailClientProps) {
  const { selectedRange } = useDateRange();
  const funnelMax = Math.max(...detail.funnel.map((stage) => stage.value));

  return (
    <div className="flex flex-col gap-8">
      <section id="overview" className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-3">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to overview
            </Link>
          </Button>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-3xl font-semibold text-ink-900">
                {client.name}
              </h1>
              <Badge variant="success">{client.status}</Badge>
              <Badge variant="neutral">{client.tier}</Badge>
            </div>
            <p className="mt-2 text-sm text-ink-500">
              {client.industry} - {client.region} - Managed by {client.manager}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-ink-400">
              Brand performance dashboard - {selectedRange}
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
        <Card className="xl:col-span-1">
          <CardContent className="space-y-3 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Visitors</p>
            <p className="text-2xl font-display font-semibold text-ink-900">
              {formatNumber(detail.overview.visitors)}
            </p>
            <Badge variant="success">{client.deltas.impressions} vs last week</Badge>
          </CardContent>
        </Card>
        <Card className="xl:col-span-1">
          <CardContent className="space-y-3 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
              Organic search
            </p>
            <p className="text-2xl font-display font-semibold text-ink-900">
              {formatNumber(detail.overview.organicSearch)}
            </p>
            <Badge variant="success">{client.deltas.engagement} vs last week</Badge>
          </CardContent>
        </Card>
        <Card className="xl:col-span-1">
          <CardContent className="space-y-3 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
              Ad spend
            </p>
            <p className="text-2xl font-display font-semibold text-ink-900">
              {formatCurrency(detail.overview.adSpend)}
            </p>
            <Badge variant="neutral">{client.deltas.spend}</Badge>
          </CardContent>
        </Card>
        <Card className="xl:col-span-1">
          <CardContent className="space-y-3 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Revenue</p>
            <p className="text-2xl font-display font-semibold text-ink-900">
              {formatCurrency(detail.overview.revenue)}
            </p>
            <Badge variant="success">
              {client.deltas.revenue} - ROAS {client.summary.roas.toFixed(1)}
            </Badge>
          </CardContent>
        </Card>
        <Card className="xl:col-span-1">
          <CardContent className="space-y-3 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">CTR</p>
            <p className="text-2xl font-display font-semibold text-ink-900">
              {formatPercent(detail.overview.ctr)}
            </p>
            <Badge variant="success">+4% vs last week</Badge>
          </CardContent>
        </Card>
      </section>

      <Tabs defaultValue="performance">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
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

          <section className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Click and revenue velocity</CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ClickRevenueChart data={client.performance} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional momentum</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {client.audience.map((segment) => (
                  <div
                    key={segment.label}
                    className="rounded-2xl border border-ink-100 bg-ink-50/60 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-ink-800">{segment.label}</p>
                      <span className="text-xs font-semibold text-brand-600">
                        {segment.value}%
                      </span>
                    </div>
                    <Progress value={segment.value} className="mt-3" />
                  </div>
                ))}
                <div className="flex items-center gap-2 text-xs text-ink-500">
                  <Globe2 className="h-4 w-4" />
                  Weighted by engagement heatmap.
                </div>
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="content">
          <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Top performing content</CardTitle>
                  <Button variant="secondary" size="sm">
                    Schedule next sprint
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {client.topPosts.map((post) => (
                  <div
                    key={post.title}
                    className={`flex flex-col justify-between rounded-2xl border border-ink-100 bg-gradient-to-br ${post.accent} p-4 shadow-soft`}
                  >
                    <div className="space-y-2">
                      <Badge variant="neutral">{post.type}</Badge>
                      <p className="text-lg font-semibold text-ink-800">{post.title}</p>
                    </div>
                    <div className="mt-6 space-y-2 text-xs text-ink-600">
                      <div className="flex items-center justify-between">
                        <span>Impressions</span>
                        <span className="font-semibold text-ink-800">
                          {formatNumber(post.impressions)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Engagement</span>
                        <span className="font-semibold text-ink-800">
                          {formatNumber(post.engagement)}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" className="mt-2 w-full">
                        {post.cta}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content cadence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-ink-100 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Weekly output</p>
                  <p className="mt-2 text-2xl font-display font-semibold text-ink-900">
                    {formatNumber(client.cadence.weeklyPosts)} posts
                  </p>
                </div>
                <div className="rounded-2xl border border-ink-100 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Best time to post</p>
                  <p className="mt-2 text-2xl font-display font-semibold text-ink-900">
                    {client.cadence.bestTime}
                  </p>
                </div>
                <div className="rounded-2xl border border-ink-100 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Top hashtags</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {client.cadence.hashtags.map((tag) => (
                      <Badge key={tag} variant="default">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="campaigns">
          <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Active campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Goal</TableHead>
                      <TableHead>Spend</TableHead>
                      <TableHead>ROI</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {client.campaigns.map((campaign) => (
                      <TableRow key={campaign.name}>
                        <TableCell className="font-semibold text-ink-800">
                          {campaign.name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={campaign.status === "Active" ? "success" : "neutral"}
                          >
                            {campaign.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{campaign.goal}</TableCell>
                        <TableCell>{formatCurrency(campaign.spend)}</TableCell>
                        <TableCell>{campaign.roi.toFixed(1)}x</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget pacing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-ink-100 bg-ink-50/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Monthly spend</p>
                  <p className="mt-2 text-2xl font-display font-semibold text-ink-900">
                    {formatCurrency(client.summary.adSpend)}
                  </p>
                  <p className="mt-1 text-xs text-ink-500">
                    {client.budget.pacing}% of allocated budget used
                  </p>
                  <Progress value={client.budget.pacing} className="mt-3" />
                </div>
                <div className="rounded-2xl border border-ink-100 bg-ink-50/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Next optimization</p>
                  <p className="mt-2 text-sm font-semibold text-ink-800">
                    {client.budget.nextOptimization}
                  </p>
                  <Button variant="secondary" size="sm" className="mt-3 w-full">
                    Apply recommendation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </TabsContent>
      </Tabs>

      <section id="traffic" className="grid gap-6 lg:grid-cols-[1.1fr_1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Traffic sources</CardTitle>
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
            <CardTitle>Meta ads</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-ink-600">
            <div className="flex items-center justify-between">
              <span>Spend</span>
              <span className="font-semibold text-ink-800">{formatCurrency(detail.metaAds.spend)}</span>
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
              <span className="font-semibold text-ink-800">{formatPercent(detail.metaAds.ctr)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>CPC</span>
              <span className="font-semibold text-ink-800">{formatCurrency(detail.metaAds.cpc)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>CPM</span>
              <span className="font-semibold text-ink-800">{formatCurrency(detail.metaAds.cpm)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meta campaigns</CardTitle>
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
                  <span>{formatCurrency(campaign.spend)}</span>
                  <span>{formatNumber(campaign.results)} results</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Engagement highlights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-ink-100 bg-ink-50/60 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-ink-800">Top post saves</p>
                <p className="text-xs text-ink-500">{detail.social.instagram.posts} high-performing reels</p>
              </div>
              <Badge variant="success">+18%</Badge>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-ink-100 bg-ink-50/60 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-ink-800">Paid efficiency</p>
                <p className="text-xs text-ink-500">CTR above average across Meta placements</p>
              </div>
              <Badge variant="success">{formatPercent(detail.metaAds.ctr)}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-ink-100 bg-white px-4 py-3">
              <p className="text-sm font-semibold text-ink-800">Creative refresh</p>
              <p className="text-xs text-ink-500">Ship 4 new variations for top-performing ads</p>
            </div>
            <div className="rounded-2xl border border-ink-100 bg-white px-4 py-3">
              <p className="text-sm font-semibold text-ink-800">Landing page review</p>
              <p className="text-xs text-ink-500">Optimize tracked pages with highest drop-off</p>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Open action plan
            </Button>
          </CardContent>
        </Card>
      </section>

      <section id="sales" className="grid gap-6 lg:grid-cols-[1fr_1fr_1.4fr]">
        <Card>
          <CardHeader>
            <CardTitle>Sales snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-ink-100 bg-white p-4">
              <p className="text-xs uppercase tracking-wide text-ink-400">Transactions</p>
              <p className="mt-2 text-2xl font-display font-semibold text-ink-900">
                {formatNumber(detail.sales.transactions)}
              </p>
            </div>
            <div className="rounded-2xl border border-ink-100 bg-white p-4">
              <p className="text-xs uppercase tracking-wide text-ink-400">Avg order value</p>
              <p className="mt-2 text-2xl font-display font-semibold text-ink-900">
                {formatCurrency(detail.sales.avgOrderValue)}
              </p>
            </div>
            <div className="rounded-2xl border border-ink-100 bg-white p-4">
              <p className="text-xs uppercase tracking-wide text-ink-400">Top products</p>
              <div className="mt-3 space-y-2 text-sm text-ink-600">
                {detail.sales.topProducts.map((product) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <span className="text-ink-700">{product.name}</span>
                    <span className="font-semibold text-ink-800">
                      {formatCurrency(product.revenue)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Locations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-display font-semibold text-ink-900">
                  {detail.locations.rating.toFixed(1)}
                </p>
                <p className="text-xs text-ink-500">Average rating</p>
              </div>
              <RatingStars rating={detail.locations.rating} />
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
            <CardTitle>Conversion funnel</CardTitle>
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
      </section>

      <section id="social" className="grid gap-6 lg:grid-cols-[1.2fr_1.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Social media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-ink-100 bg-ink-50/60 p-4">
              <p className="text-xs uppercase tracking-wide text-ink-400">Facebook posts</p>
              <p className="mt-2 text-2xl font-display font-semibold text-ink-900">
                {detail.social.facebook.posts}
              </p>
              <p className="text-xs text-ink-500">
                {formatNumber(detail.social.facebook.followers)} followers
              </p>
            </div>
            <div className="rounded-2xl border border-ink-100 bg-ink-50/60 p-4">
              <p className="text-xs uppercase tracking-wide text-ink-400">Instagram posts</p>
              <p className="mt-2 text-2xl font-display font-semibold text-ink-900">
                {detail.social.instagram.posts}
              </p>
              <p className="text-xs text-ink-500">
                {formatNumber(detail.social.instagram.followers)} followers
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent social posts</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {detail.social.recentPosts.map((post) => (
              <div
                key={post.title}
                className={`flex h-32 flex-col justify-between rounded-2xl border border-ink-100 bg-gradient-to-br ${post.accent} p-4 shadow-soft`}
              >
                <p className="text-sm font-semibold text-ink-800">{post.title}</p>
                <Button variant="ghost" size="sm" className="mt-2 w-full">
                  View post
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section id="seo" className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
        <Card id="backlinks">
          <CardHeader>
            <CardTitle>Starred keywords</CardTitle>
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
            <CardTitle>Tracked pages</CardTitle>
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
            <CardTitle>Recent backlinks</CardTitle>
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

      <section id="planning" className="hidden" />
      <section id="planning-calendar" className="hidden" />
      <section id="sales-trends" className="hidden" />
      <section id="app" className="hidden" />
      <section id="citations" className="hidden" />
      <section id="settings" className="hidden" />
    </div>
  );
}
