"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { useDateRange } from "@/components/layout/DateRangeContext";
import { ClientCard } from "@/components/ClientCard";
import { MetricCard } from "@/components/MetricCard";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";
import type { Agency, Client } from "@/lib/schemas";
import type { BrandOverview } from "@/lib/types/brand-overview";
import { useUser } from "@/components/auth/UserContext";

interface HomeClientProps {
  clients: Client[];
  agency: Agency;
}

const API_BASE_URL = "https://social-apis-two.vercel.app/api";

export function HomeClient({ clients, agency }: HomeClientProps) {
  const { profile } = useUser();
  const organizationId = (profile?.organization as { id?: string } | undefined)?.id;
  const [apiClients, setApiClients] = useState<Client[]>(clients);
  const [apiTags, setApiTags] = useState<string[]>([]);
  const [brandOverviews, setBrandOverviews] = useState<Record<string, BrandOverview>>({});
  const [activeTag, setActiveTag] = useState<string>("All brands");
  const { selectedRange, range } = useDateRange();
  const fromParam = range?.from ? format(range.from, "yyyy-MM-dd") : "2025-12-01";
  const toParam = range?.to ? format(range.to, "yyyy-MM-dd") : fromParam;

  const tagSetFromClients = useMemo(() => {
    const tagSet = new Set<string>();
    apiClients.forEach((client) => client.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
  }, [apiClients]);

  const fallbackClient = clients[0]!;
  const coerceNumber = (value: unknown) => {
    if (typeof value === "number") return value;
    if (typeof value === "string") {
      const parsed = Number(value);
      return Number.isNaN(parsed) ? null : parsed;
    }
    return null;
  };

  const getNumber = (value: unknown, fallback: number) => {
    const normalized = coerceNumber(value);
    return normalized ?? fallback;
  };

  useEffect(() => {
    if (!organizationId) return;
    if (!clients.length) return;
    let cancelled = false;

    const fetchBrands = async () => {
      const curl = `curl "${API_BASE_URL}/brands?organizationId=${organizationId}"`;
      console.log("BRAND LIST CURL:", curl);
      try {
        const response = await fetch(`${API_BASE_URL}/brands?organizationId=${organizationId}`);
        const data = await response.json().catch(() => ({}));
        console.log("BRAND LIST RESPONSE:", data);
        if (cancelled) return;
        const brandsFromApi = Array.isArray(data.brands) ? data.brands : [];
        if (brandsFromApi.length > 0) {
          const normalized = brandsFromApi.map((brand, index) => {
            const match =
              clients.find(
                (client) =>
                  client.id === brand.id ||
                  client.id === brand.brandId ||
                  client.id === brand.client_id ||
                  client.name === brand.client_name ||
                  client.name === brand.clientName
              ) ?? fallbackClient;
            const baseSummary = match?.summary ?? {
              followers: 0,
              engagementRate: 0,
              monthlyReach: 0,
              adSpend: 0,
              roas: 0
            };
            return {
              ...match,
              id: brand.client_id ?? brand.id ?? brand.brandId ?? `brand-${index}`,
              name: brand.client_name ?? brand.clientName ?? brand.name ?? match?.name ?? "Brand",
              industry: brand.industry ?? match?.industry ?? "Brand",
              tier: brand.tier ?? match?.tier ?? "Tier 1",
              region: brand.region ?? match?.region ?? "Global",
              status: brand.status ?? match?.status ?? "Active",
              manager: brand.manager ?? match?.manager ?? "Agency",
              tags:
                brand.tags ??
                brand.tagCloud ??
                brand.tag_cloud ??
                brand.tags_cloud ??
                match?.tags ??
                [],
              summary: {
                followers: getNumber(
                  brand.followers ?? brand.summary?.followers,
                  baseSummary.followers
                ),
                monthlyReach: getNumber(
                  brand.monthlyReach ?? brand.summary?.monthlyReach,
                  baseSummary.monthlyReach
                ),
                adSpend: getNumber(
                  brand.adSpend ?? brand.summary?.adSpend,
                  baseSummary.adSpend
                ),
                engagementRate: getNumber(
                  brand.engagementRate ?? brand.summary?.engagementRate,
                  baseSummary.engagementRate
                ),
                roas: getNumber(brand.roas ?? brand.summary?.roas, baseSummary.roas)
              },
              trend: Array.isArray(brand.trend) ? brand.trend : match?.trend ?? [],
              performance: match?.performance ?? [],
              channels: match?.channels ?? [],
              topPosts: match?.topPosts ?? [],
              campaigns: match?.campaigns ?? [],
              audience: match?.audience ?? [],
              cadence:
                match?.cadence ?? { weeklyPosts: 0, bestTime: "", hashtags: [] },
              budget: match?.budget ?? { pacing: 0, nextOptimization: "" },
              deltas:
                match?.deltas ?? {
                  impressions: "",
                  engagement: "",
                  clicks: "",
                  spend: "",
                  revenue: ""
                }
            } as Client;
          });
          setApiClients(normalized);
        }
        const candidateTags =
          data.tags ??
          data.tagsCloud ??
          data.tagCloud ??
          data.tag_cloud ??
          data.tags_cloud ??
          [];
        if (Array.isArray(candidateTags)) {
          setApiTags([...candidateTags].sort((a, b) => a.localeCompare(b)));
        }
      } catch (error) {
        console.error("Unable to fetch brands", error);
      }
    };

    fetchBrands();
    return () => {
      cancelled = true;
    };
  }, [organizationId, clients]);

  useEffect(() => {
    if (!apiClients.length) return;
    let cancelled = false;

    const fetchOverviews = async () => {
    const results = await Promise.allSettled(
      apiClients.map(async (client) => {
        const url = `${API_BASE_URL}/overview?brandId=${client.id}&from=${fromParam}&to=${toParam}`;
        const response = await fetch(url);
        const data = await response.json().catch(() => ({}));
        console.log("OVERVIEW RESPONSE:", client.id, data);
        return { clientId: client.id, data };
      })
    );
      if (cancelled) return;
      const next: Record<string, BrandOverview> = {};
      results.forEach((entry) => {
        if (entry.status !== "fulfilled") return;
        const { clientId, data } = entry.value;
        const totals = data?.totals?.visitors ?? {};
        const organic =
          (typeof totals.organic_search === "number" ? totals.organic_search : 0) +
          (typeof totals.organic_social === "number" ? totals.organic_social : 0);
        next[clientId] = {
          visitors: typeof totals.total === "number" ? totals.total : 0,
          organic,
          adSpend: typeof data?.totals?.meta_ads?.spend === "number" ? data.totals.meta_ads.spend : 0,
          trend: Array.isArray(data?.dailyData)
            ? data.dailyData.map((day: any) =>
                typeof day?.visitors?.total === "number" ? day.visitors.total : 0
              )
            : []
        };
      });
      setBrandOverviews(next);
    };

    fetchOverviews();
    return () => {
      cancelled = true;
    };
  }, [apiClients, fromParam, toParam]);

  const tags = useMemo(() => {
    if (apiTags.length > 0) {
      return ["All brands", ...apiTags];
    }
    return ["All brands", ...tagSetFromClients];
  }, [apiTags, tagSetFromClients]);

  const filteredClients = useMemo(() => {
    if (activeTag === "All brands") return apiClients;
    return apiClients.filter((client) => client.tags.includes(activeTag));
  }, [activeTag, apiClients]);

  const sortedClients = useMemo(() => {
    return [...filteredClients].sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredClients]);

  const totals = useMemo(() => {
    return apiClients.reduce(
      (acc, client) => {
        const summary = client.summary ?? {};
        acc.followers += typeof summary.followers === "number" ? summary.followers : 0;
        acc.reach += typeof summary.monthlyReach === "number" ? summary.monthlyReach : 0;
        acc.spend += typeof summary.adSpend === "number" ? summary.adSpend : 0;
        acc.engagement += typeof summary.engagementRate === "number" ? summary.engagementRate : 0;
        return acc;
      },
      { followers: 0, reach: 0, spend: 0, engagement: 0 }
    );
  }, [apiClients]);

  const avgEngagement = filteredClients.length
    ? totals.engagement / filteredClients.length
    : 0;

  return (
    <div className="flex flex-col gap-8">
      <section id="brands" className="flex flex-col gap-4 rounded-3xl bg-white/40 p-6 shadow-sm">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink-900">
            Brand dashboards
          </h2>
          <p className="text-sm text-ink-500">
            {formatNumber(filteredClients.length)} active brand workspaces
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Button
              key={tag}
              size="sm"
              variant={activeTag === tag ? "default" : "secondary"}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {sortedClients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            overview={brandOverviews[client.id]}
            href={`/brand?id=${client.id}&from=${fromParam}&to=${toParam}`}
          />
        ))}
      </section>

      <section id="campaigns" className="hidden">
        <div id="compliance" />
      </section>
    </div>
  );
}
