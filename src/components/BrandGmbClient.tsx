"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatNumber } from "@/lib/utils";
import type { BrandGmb } from "@/lib/schemas";
import { Star, Trash2 } from "lucide-react";

interface BrandGmbClientProps {
  data: BrandGmb;
}

export function BrandGmbClient({ data }: BrandGmbClientProps) {
  const locationsCount = data.locations.length;

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-semibold text-ink-900">
            {data.header.title}
          </h1>
          <p className="text-sm text-ink-500">{data.header.subtitle}</p>
        </div>
        <Badge variant="neutral">{locationsCount} locations</Badge>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-ink-900">Business Locations</h2>
        <p className="text-sm text-ink-500">
          Monitor and manage your Google My Business listings
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {data.summary.map((item) => (
          <Card key={item.label}>
            <CardContent className="space-y-3 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                {item.label}
              </p>
              <p className="text-2xl font-display font-semibold text-ink-900">
                {item.label === "Average Rating"
                  ? item.value.toFixed(1)
                  : formatNumber(item.value)}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Add New Location</CardTitle>
          <p className="text-sm text-ink-500">
            Search for your business location using Google Places
          </p>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Input placeholder="Search for a business location..." className="min-w-[220px] flex-1" />
          <Button size="sm">Search</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Locations</CardTitle>
          <p className="text-sm text-ink-500">{locationsCount} locations</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.locations.map((location) => (
            <div
              key={location.name}
              className="rounded-2xl border border-ink-100 bg-white p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-ink-900">{location.name}</h3>
                  <div className="text-sm text-ink-500">{location.address}</div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-ink-400">
                    <span>{location.phone}</span>
                    <span>{location.website}</span>
                    <span>{location.updated}</span>
                    <span className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-amber-400" />
                      {location.rating.toFixed(1)} ({location.reviews} reviews)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Delete">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
