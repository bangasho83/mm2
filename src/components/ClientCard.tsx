import Link from "next/link";
import { Sparkline } from "@/components/Sparkline";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import type { Client } from "@/lib/schemas";

interface ClientCardProps {
  client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
  return (
    <Link href={`/brand/${client.id}`} className="group">
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
            <p className="font-semibold text-ink-900">
              {formatNumber(client.summary.followers)}
            </p>
            <p>Followers</p>
          </div>
          <div>
            <p className="font-semibold text-ink-900">
              {formatPercent(client.summary.engagementRate)}
            </p>
            <p>Engagement</p>
          </div>
          <div>
            <p className="font-semibold text-ink-900">
              {formatCurrency(client.summary.adSpend)}
            </p>
            <p>Ad spend</p>
          </div>
        </div>
        <Sparkline data={client.trend} className="mt-auto" />
        <div className="flex items-center justify-between text-xs font-semibold text-ink-400">
          <span>Weekly pulse</span>
          <span className="text-brand-600">View dashboard</span>
        </div>
      </Card>
    </Link>
  );
}
