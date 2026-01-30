"use client";

import { useMemo, useState } from "react";
import { useDateRange } from "@/components/layout/DateRangeContext";
import { ClientCard } from "@/components/ClientCard";
import { MetricCard } from "@/components/MetricCard";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";
import type { Agency, Client } from "@/lib/schemas";

interface HomeClientProps {
  clients: Client[];
  agency: Agency;
}

export function HomeClient({ clients, agency }: HomeClientProps) {
  const [activeTag, setActiveTag] = useState<string>("All brands");
  const { selectedRange } = useDateRange();

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    clients.forEach((client) => client.tags.forEach((tag) => tagSet.add(tag)));
    return ["All brands", ...Array.from(tagSet)];
  }, [clients]);

  const filteredClients = useMemo(() => {
    if (activeTag === "All brands") return clients;
    return clients.filter((client) => client.tags.includes(activeTag));
  }, [activeTag, clients]);

  const totals = useMemo(() => {
    return clients.reduce(
      (acc, client) => {
        acc.followers += client.summary.followers;
        acc.reach += client.summary.monthlyReach;
        acc.spend += client.summary.adSpend;
        acc.engagement += client.summary.engagementRate;
        return acc;
      },
      { followers: 0, reach: 0, spend: 0, engagement: 0 }
    );
  }, [clients]);

  const avgEngagement = totals.engagement / clients.length;

  return (
    <div className="flex flex-col gap-8">
      <section className="grid gap-6">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
              Agency overview
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">
              Social performance across every client, in one pulse.
            </h1>
            <p className="mt-2 text-sm text-ink-500">
              Monitor cross-channel momentum, surface standout campaigns, and move fast on what is working.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-400">
              Reporting window: {selectedRange || agency.dateRanges[0]}
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
        </div>
      </section>

      <section id="attribution" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total followers" value={totals.followers} />
        <MetricCard label="Monthly reach" value={totals.reach} />
        <MetricCard label="Ad spend" value={totals.spend} type="currency" />
        <MetricCard label="Avg. engagement" value={avgEngagement} type="percent" />
      </section>

      <section id="brands" className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink-900">
            Brand dashboards
          </h2>
          <p className="text-sm text-ink-500">
            {formatNumber(filteredClients.length)} active brand workspaces
          </p>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="secondary" size="sm">
            Sort by reach
          </Button>
          <Button variant="outline" size="sm">
            Export summary
          </Button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredClients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </section>

      <section id="campaigns" className="hidden">
        <div id="compliance" />
      </section>
    </div>
  );
}
