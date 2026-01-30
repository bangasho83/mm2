"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Megaphone, BadgeDollarSign, Mail, FileText } from "lucide-react";

const items = [
  { label: "Workspace Home", to: "/workspace", icon: Briefcase },
  { label: "Social", to: "/workspace/social", icon: Megaphone },
  { label: "Ads", to: "/workspace/ads", icon: BadgeDollarSign },
  { label: "Newsletter", to: "/workspace/newsletter", icon: Mail },
  { label: "Content", to: "/workspace/content", icon: FileText }
];

export function WorkspaceSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-72 flex-col gap-6 border-r border-ink-100 bg-white/80 px-6 py-8">
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.to;
          return (
            <Link
              key={item.to}
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
      </div>
    </aside>
  );
}
