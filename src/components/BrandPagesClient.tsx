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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDateRange } from "@/components/layout/DateRangeContext";
import { formatNumber } from "@/lib/utils";
import type { BrandPages } from "@/lib/schemas";
import { Eye } from "lucide-react";

interface BrandPagesClientProps {
  data: BrandPages;
}

export function BrandPagesClient({ data }: BrandPagesClientProps) {
  const { selectedRange } = useDateRange();

  const renderTable = (rows: BrandPages["managedPages"]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Page Title</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Views</TableHead>
          <TableHead>Users</TableHead>
          <TableHead>Avg Duration</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((page, index) => (
          <TableRow key={`${page.url}-${index}`}>
            <TableCell className="font-semibold text-ink-800">{page.title}</TableCell>
            <TableCell className="text-xs text-brand-600">{page.url}</TableCell>
            <TableCell>{formatNumber(page.views)}</TableCell>
            <TableCell>{formatNumber(page.users)}</TableCell>
            <TableCell>{page.avgDuration}</TableCell>
            <TableCell>{page.created}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                  View
                </Button>
                <Button
                  size="sm"
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-semibold text-ink-900">
            {data.header.title}
          </h1>
          <p className="text-sm text-ink-500">
            Manage your website content pages and their performance · {data.header.website}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="neutral">{selectedRange}</Badge>
          <Button size="sm">Add New Page</Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {data.summary.map((item) => (
          <Card key={item.label}>
            <CardContent className="space-y-3 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                {item.label}
              </p>
              <p className="text-2xl font-display font-semibold text-ink-900">
                {formatNumber(item.value)}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Website Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="managed">
            <TabsList>
              <TabsTrigger value="managed">Managed Pages</TabsTrigger>
              <TabsTrigger value="top">Top Pages (Analytics)</TabsTrigger>
            </TabsList>
            <TabsContent value="managed">{renderTable(data.managedPages)}</TabsContent>
            <TabsContent value="top">{renderTable(data.topPages)}</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
