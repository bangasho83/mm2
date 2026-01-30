"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { formatNumber } from "@/lib/utils";
import type { BrandKeywords } from "@/lib/schemas";
import { RefreshCcw, Star, Trash2 } from "lucide-react";

interface BrandKeywordsClientProps {
  data: BrandKeywords;
}

export function BrandKeywordsClient({ data }: BrandKeywordsClientProps) {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-semibold text-ink-900">
            {data.header.title}
          </h1>
          <p className="text-sm text-ink-500">{data.header.subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm">
            <Star className="h-4 w-4 text-amber-500" />
            Starred ({data.totals.starred})
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </Button>
          <Badge variant="neutral">{data.totals.tracked}</Badge>
        </div>
      </section>

      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 pt-6">
          <Input placeholder="Enter a new keyword..." className="min-w-[220px] flex-1" />
          <Button size="sm">Add</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keywords Overview</CardTitle>
          <p className="text-sm text-ink-500">
            {data.totals.tracked} keywords tracked with real search volume data from Google
            Ads (Location: Pakistan, Code: 2586)
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keywords</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Competition</TableHead>
                <TableHead>CPC</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.keywords.map((keyword) => (
                <TableRow key={keyword.keyword}>
                  <TableCell className="flex items-center gap-2 font-semibold text-ink-800">
                    <Star
                      className={`h-4 w-4 ${
                        keyword.starred ? "fill-amber-400 text-amber-400" : "text-ink-300"
                      }`}
                    />
                    {keyword.keyword}
                  </TableCell>
                  <TableCell>{formatNumber(keyword.volume)}</TableCell>
                  <TableCell>{keyword.competition}</TableCell>
                  <TableCell>{keyword.cpc}</TableCell>
                  <TableCell>
                    <div className="text-sm font-semibold text-ink-800">
                      {keyword.location}
                    </div>
                    <div className="text-xs text-ink-400">Code: {keyword.locationCode}</div>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="icon" aria-label="Delete">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
