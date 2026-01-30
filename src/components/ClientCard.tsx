import Link from "next/link";
import { memo } from "react";
import { Sparkline } from "@/components/Sparkline";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import type { Client } from "@/lib/schemas";
import type { BrandOverview } from "@/lib/types/brand-overview";

interface ClientCardProps {
  client: Client;
  href?: string;
  overview?: BrandOverview;
}

function ClientCardBase({ client, href, overview }: ClientCardProps) {
  const visitorsValue = overview?.visitors ?? 0;
  const organicValue =
    overview && visitorsValue > 0 ? overview.organic / visitorsValue : 0;
  const adSpendValue = overview?.adSpend ?? 0;
  const trend = overview?.trend ?? [];
  return (
    <Link href={href ?? `/brand/${client.id}`} className="group">
      <Card className="flex h-full flex-col gap-4 border-ink-100 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-glass">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
              {client.industry}
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-ink-900">
              {client.name}
            </p>
          </div>
          <Badge variant={client.status === "Active" ? "success" : "neutral"}>
            {client.status}
          </Badge>
        </div>
        <div className="grid grid-cols-3 gap-3 text-xs text-ink-500">
          <div>
            <p className="font-semibold text-ink-900">{formatNumber(visitorsValue)}</p>
            <p>Visitors</p>
          </div>
          <div>
            <p className="font-semibold text-ink-900">{formatPercent(organicValue)}</p>
            <p>Organic</p>
          </div>
          <div>
            <p className="font-semibold text-ink-900">{formatCurrency(adSpendValue)}</p>
            <p>Ad spend</p>
          </div>
        </div>
        {trend.length > 0 ? (
          <Sparkline data={trend} className="mt-auto" />
        ) : (
          <div className="mt-auto h-10" />
        )}
        <div className="flex items-center justify-end text-xs font-semibold text-ink-400">
          <span className="text-brand-600">View dashboard</span>
        </div>
      </Card>
    </Link>
  );
}

export const ClientCard = memo(ClientCardBase);
