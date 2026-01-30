"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDateRange } from "@/components/layout/DateRangeContext";
import type { BrandSocial } from "@/lib/schemas";
import { CalendarDays, Facebook, Instagram } from "lucide-react";

interface BrandSocialClientProps {
  data: BrandSocial;
}

export function BrandSocialClient({ data }: BrandSocialClientProps) {
  const { selectedRange } = useDateRange();

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900">
            {data.header.title}
          </h1>
          <p className="text-sm text-ink-500">{data.header.subtitle}</p>
        </div>
        <Badge variant="neutral">{selectedRange}</Badge>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {data.stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="space-y-3 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                {stat.label}
              </p>
              <p className="text-2xl font-display font-semibold text-ink-900">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Content Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-xs text-ink-400">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {data.calendar.monthLabel}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="neutral">Facebook</Badge>
              <Badge variant="neutral">Instagram</Badge>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-4 text-xs text-ink-400">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-semibold">
                {day}
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-4">
            {data.calendar.weeks.map((week, weekIndex) => (
              <div key={`week-${weekIndex}`} className="grid grid-cols-7 gap-4">
                {week.days.map((day, index) => (
                  <div
                    key={`${day.month}-${day.date}-${index}`}
                    className="min-h-[90px] rounded-2xl border border-ink-100 bg-white p-3"
                  >
                    <div className="text-xs text-ink-400">{day.date}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {day.icons.map((icon, iconIndex) => (
                        <span
                          key={`${day.date}-${icon}-${iconIndex}`}
                          className="flex h-6 w-6 items-center justify-center rounded-full border border-ink-100 bg-ink-50"
                        >
                          {icon === "facebook" ? (
                            <Facebook className="h-3 w-3 text-blue-500" />
                          ) : (
                            <Instagram className="h-3 w-3 text-pink-500" />
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{data.facebook.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="link" className="px-0 text-brand-600">
              {data.facebook.cta}
            </Button>
            {data.facebook.posts.map((post) => (
              <div key={post.title} className="rounded-2xl border border-ink-100 bg-white p-4">
                <div className="flex items-center justify-between text-xs text-ink-400">
                  <span>{post.date}</span>
                  <Badge variant="neutral">{post.type}</Badge>
                </div>
                <p className="mt-2 text-sm font-semibold text-ink-800">{post.title}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-ink-400">
                  <span>0</span>
                  <Button variant="link" className="px-0 text-brand-600">
                    View Post
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{data.instagram.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="link" className="px-0 text-brand-600">
              {data.instagram.cta}
            </Button>
            {data.instagram.posts.map((post) => (
              <div key={post.title} className="rounded-2xl border border-ink-100 bg-white p-4">
                <div className="flex items-center justify-between text-xs text-ink-400">
                  <span>{post.date}</span>
                  <Badge variant="neutral">{post.type}</Badge>
                </div>
                <p className="mt-2 text-sm font-semibold text-ink-800">{post.title}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-ink-400">
                  <span>0</span>
                  <Button variant="link" className="px-0 text-brand-600">
                    View Post
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
