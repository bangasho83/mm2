"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  LayoutList,
  CalendarRange,
  TrendingUp,
  Network,
  Megaphone,
  Search,
  Link2,
  Settings,
  AppWindow,
  MapPin
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useEffect } from "react";
import { useDateRange } from "@/components/layout/DateRangeContext";
import { format, parseISO, isValid } from "date-fns";
import type { Client } from "@/lib/schemas";

const groups = [
  {
    title: "Overview",
    items: [{ label: "Overview", icon: LayoutDashboard, to: "/brand" }]
  },
  {
    title: "Planning",
    items: [
      { label: "Mood Board", icon: LayoutList, to: "/brand/mood" },
      { label: "Calendar Ideation", icon: CalendarRange, to: "/brand/ideation" }
    ]
  },
  {
    title: "Sales",
    items: [
      { label: "Sales", icon: TrendingUp, to: "/brand/sales" },
      { label: "Sale Trends", icon: TrendingUp, to: "/brand/sales_trends" }
    ]
  },
  {
    title: "Traffic",
    items: [
      { label: "Social", icon: Megaphone, to: "/brand/social" },
      { label: "Meta Ads", icon: Network, to: "/brand/meta" },
      { label: "Organic", icon: Network, to: "/brand/organic" }
    ]
  },
  {
    title: "SEO",
    items: [
      { label: "Content Pages", icon: Search, to: "/brand/pages" },
      { label: "Backlinks", icon: Link2, to: "/brand/backlinks" },
      { label: "Keywords", icon: Search, to: "/brand/keywords" }
    ]
  },
  {
    title: "App",
    items: [{ label: "App", icon: AppWindow, to: "/brand/app" }]
  },
  {
    title: "Citations",
    items: [{ label: "Google Places", icon: MapPin, to: "/brand/gmb" }]
  }
];

const staticRoutes = new Set([
  "mood",
  "ideation",
  "sales",
  "sales_trends",
  "social",
  "meta",
  "organic",
  "pages",
  "backlinks",
  "keywords",
  "app",
  "gmb",
  "settings"
]);

export function BrandSidebar({ clients }: { clients: Client[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { range, setRange } = useDateRange();
  const activeClientId = searchParams.get("id") ?? clients[0]?.id ?? "";
  const fromParam = range?.from ? format(range.from, "yyyy-MM-dd") : "2025-12-01";
  const toParam = range?.to ? format(range.to, "yyyy-MM-dd") : fromParam;
  const buildQuery = (id: string) =>
    `?id=${encodeURIComponent(id)}&from=${encodeURIComponent(fromParam)}&to=${encodeURIComponent(
      toParam
    )}`;

  useEffect(() => {
    const fromValue = searchParams.get("from");
    if (!fromValue) return;
    const toValue = searchParams.get("to") ?? fromValue;
    const fromDate = parseISO(fromValue);
    const toDate = parseISO(toValue);
    if (!isValid(fromDate) || !isValid(toDate)) return;
    const currentFrom = range?.from?.getTime();
    const currentTo = range?.to?.getTime();
    if (currentFrom === fromDate.getTime() && currentTo === toDate.getTime()) return;
    setRange({ from: fromDate, to: toDate });
  }, [searchParams, range, setRange]);

  return (
    <aside className="hidden lg:flex w-72 flex-col gap-6 border-r border-ink-100 bg-white/80 px-6 py-8">
      <div className="space-y-3">
        <Select
          value={activeClientId}
          onValueChange={(value) => {
            router.push(`${pathname}${buildQuery(value)}`);
          }}
        >
          <SelectTrigger className="w-full justify-between rounded-2xl border-ink-100 bg-white">
            <SelectValue placeholder={clients[0]?.name ?? "Select brand"} />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <nav className="flex flex-1 flex-col gap-4">
        {groups.map((group) => (
          <div key={group.title} className="space-y-2">
            <p className="px-2 text-xs font-semibold uppercase tracking-wide text-ink-400">
              {group.title}
            </p>
            {group.items.map((item) => {
              const Icon = item.icon;
              const href = `${item.to}${buildQuery(activeClientId)}`;
              return (
                <Link
                  key={item.label}
                  href={href}
                  className={[
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                    pathname === href
                      ? "bg-brand-50 text-brand-700"
                      : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <Link
        href="/brand/settings"
        className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-ink-600 transition hover:bg-ink-50 hover:text-ink-900"
      >
        <Settings className="h-4 w-4" />
        Settings
      </Link>
    </aside>
  );
}
