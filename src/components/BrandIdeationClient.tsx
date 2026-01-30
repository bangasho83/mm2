"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDateRange } from "@/components/layout/DateRangeContext";
import type { Ideation } from "@/lib/schemas";
import { Calendar, RefreshCcw, Plus } from "lucide-react";

interface BrandIdeationClientProps {
  data: Ideation;
}

const typeStyles: Record<string, string> = {
  Social: "bg-sky-50 text-sky-700",
  "Ad Campaign": "bg-emerald-50 text-emerald-700",
  "Content Page": "bg-fuchsia-50 text-fuchsia-700",
  Newsletter: "bg-amber-50 text-amber-700"
};

export function BrandIdeationClient({ data }: BrandIdeationClientProps) {
  const { selectedRange } = useDateRange();

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900">
            {data.header.title}
          </h1>
          <p className="text-sm text-ink-500">
            {data.header.brand} | {data.header.website}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="neutral">{selectedRange}</Badge>
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Date Range</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">From Date</p>
            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-ink-100 bg-white px-3 py-2">
              <Input value={data.dateRange.from} readOnly className="border-0 p-0 text-sm" />
              <Calendar className="h-4 w-4 text-ink-400" />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">To Date</p>
            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-ink-100 bg-white px-3 py-2">
              <Input value={data.dateRange.to} readOnly className="border-0 p-0 text-sm" />
              <Calendar className="h-4 w-4 text-ink-400" />
            </div>
          </div>
          <Button className="mt-6 h-11 gap-2 rounded-2xl">
            <RefreshCcw className="h-4 w-4" />
            Refresh Calendar
          </Button>
        </CardContent>
      </Card>

      <section className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {data.filters.map((filter) => (
            <Badge key={filter.label} variant="neutral">
              {filter.label} {filter.count ? `(${filter.count})` : ""}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {data.summaryChips.map((chip) => (
            <Badge key={chip.label} variant="default">
              {chip.label}: {chip.value}
            </Badge>
          ))}
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </section>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <CardTitle>Post Distribution</CardTitle>
              <p className="text-xs text-ink-400">Content posts over time (Jan 1 - Jan 31)</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default">16 posts</Badge>
              <Badge variant="neutral">Type: Social: 10</Badge>
              <Badge variant="neutral">Ad Campaign: 4</Badge>
              <Badge variant="neutral">Content Page: 2</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4 text-xs text-ink-400">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="text-center font-semibold">
                {day}
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-4">
            {data.calendar.weeks.map((week, weekIndex) => (
              <div key={`week-${weekIndex}`} className="grid grid-cols-7 gap-4">
                {week.days.map((day, index) => (
                  <div key={`${day.month}-${day.date}-${index}`} className="min-h-[120px] rounded-2xl border border-ink-100 bg-white p-3">
                    <div className="flex items-center justify-between text-xs text-ink-400">
                      <span>{day.date}</span>
                      <button type="button" className="rounded-full bg-ink-50 p-1">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="mt-3 space-y-2">
                      {day.items.map((item) => (
                        <div key={item.title} className="rounded-xl border border-ink-100 bg-ink-50/60 p-2">
                          <div className="flex items-center justify-between">
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${typeStyles[item.type] || "bg-ink-100 text-ink-600"}`}>
                              {item.type}
                            </span>
                            <span className="text-[10px] text-ink-400">{item.label}</span>
                          </div>
                          <p className="mt-2 text-xs font-semibold text-ink-800">{item.title}</p>
                          <div className="mt-2 flex items-center justify-between text-[10px] text-ink-400">
                            <span>{item.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
