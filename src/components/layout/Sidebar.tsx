"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Users2,
  Layers,
  Sparkles,
  PieChart,
  ShieldCheck,
  Settings
} from "lucide-react";
import type { Agency } from "@/lib/schemas";

const navItems = [
  { label: "Overview", icon: BarChart3, to: "/" },
  { label: "Brands", icon: Users2, to: "/#brands" },
  { label: "Campaigns", icon: Layers, to: "/#campaigns" },
  { label: "Social Pulse", icon: Sparkles, to: "/#pulse" },
  { label: "Attribution", icon: PieChart, to: "/#attribution" },
  { label: "Compliance", icon: ShieldCheck, to: "/#compliance" }
];

const extraItems = [{ label: "Settings", icon: Settings, to: "/" }];

interface SidebarProps {
  agency: Agency;
}

export function Sidebar({ agency }: SidebarProps) {
  const pathname = usePathname();
  const safePathname = pathname ?? "";

  return (
    <aside className="hidden lg:flex w-72 flex-col gap-6 border-r border-ink-100 bg-white/70 px-6 py-8">
      <div className="flex flex-col gap-1">
        <p className="font-display text-lg font-semibold text-ink-900">MetrixMate</p>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Beta</p>
      </div>

        <div className="rounded-2xl border border-ink-100 bg-white px-4 py-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Workspace</p>
          <p className="mt-2 text-base font-semibold text-ink-800">{agency.workspace.name}</p>
          <p className="text-xs text-ink-400">
            {agency.workspace.activeClients} brands active
          </p>
        </div>

      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.to === "/" ? safePathname === "/" || safePathname.startsWith("/brand") : false;
          return (
            <Link
              key={item.label}
              href={item.to}
              className={[
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
              ].join(" ")}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-2">
        {extraItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.to}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-ink-600 transition hover:bg-ink-50 hover:text-ink-900"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
