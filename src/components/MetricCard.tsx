import { Card } from "@/components/ui/card";
import { cn, formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: number;
  type?: "number" | "currency" | "percent";
  delta?: string;
  accent?: string;
}

export function MetricCard({ label, value, type = "number", delta, accent }: MetricCardProps) {
  const formatted =
    type === "currency"
      ? formatCurrency(value)
      : type === "percent"
        ? formatPercent(value)
        : formatNumber(value);

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-ink-100 p-5 shadow-soft",
        accent || ""
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
          {label}
        </p>
        {delta ? (
          <span className="rounded-full bg-mint-50 px-2 py-1 text-xs font-semibold text-mint-700">
            {delta}
          </span>
        ) : null}
      </div>
      <p className="mt-4 font-display text-2xl font-semibold text-ink-900">
        {formatted}
      </p>
    </Card>
  );
}
