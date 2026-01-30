"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useDateRange } from "@/components/layout/DateRangeContext";
import type { BrandBacklinks } from "@/lib/schemas";
import { Eye, Trash2 } from "lucide-react";

interface BrandBacklinksClientProps {
  data: BrandBacklinks;
}

export function BrandBacklinksClient({ data }: BrandBacklinksClientProps) {
  const { selectedRange } = useDateRange();

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-semibold text-ink-900">
            {data.header.title}
          </h1>
          <p className="text-sm text-ink-500">
            {data.header.brand} backlink monitoring and analysis · {data.header.website}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="neutral">{selectedRange}</Badge>
          <Button size="sm">Add Backlink</Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {data.summary.map((item) => (
          <Card key={item.label}>
            <CardContent className="space-y-3 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                {item.label}
              </p>
              <p className="text-2xl font-display font-semibold text-ink-900">{item.value}</p>
              <p className="text-xs text-ink-500">{item.note}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Backlinks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Added</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.backlinks.map((link) => (
                <TableRow key={link.url}>
                  <TableCell className="text-sm text-brand-600">{link.url}</TableCell>
                  <TableCell>
                    <Badge variant="default" className="bg-ink-900 text-white">
                      {link.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{link.added}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" aria-label="View">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" aria-label="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
