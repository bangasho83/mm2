"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import type { Workspace } from "@/lib/schemas";
import { useDateRange } from "@/components/layout/DateRangeContext";
import { formatNumber } from "@/lib/utils";
import {
  CalendarCheck,
  ClipboardList,
  FileText,
  LayoutGrid,
  Megaphone,
  PenTool
} from "lucide-react";

interface WorkspaceClientProps {
  data: Workspace;
}

const channelIcons: Record<string, React.ReactNode> = {
  "Social Posts": <Megaphone className="h-4 w-4 text-ink-500" />,
  "Reels / Shorts": <LayoutGrid className="h-4 w-4 text-ink-500" />,
  "Blog Articles": <PenTool className="h-4 w-4 text-ink-500" />,
  "Email Campaigns": <ClipboardList className="h-4 w-4 text-ink-500" />,
  "Ad Creative Sets": <FileText className="h-4 w-4 text-ink-500" />,
  "Landing Pages": <CalendarCheck className="h-4 w-4 text-ink-500" />
};

export function WorkspaceClient({ data }: WorkspaceClientProps) {
  const { selectedRange } = useDateRange();

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-semibold text-ink-900">
            {data.header.title}
          </h1>
          <p className="text-sm text-ink-500">{data.header.subtitle}</p>
        </div>
        <Badge variant="neutral">{selectedRange}</Badge>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {data.summary.map((item) => (
          <Card key={item.label}>
            <CardContent className="space-y-3 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                {item.label}
              </p>
              <p className="text-2xl font-display font-semibold text-ink-900">{item.value}</p>
              <Badge variant="success">{item.delta}</Badge>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Production Targets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.monthlyPlan.map((channel) => {
              const progress = channel.target
                ? Math.min((channel.completed / channel.target) * 100, 100)
                : 0;
              return (
                <div key={channel.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-ink-600">
                    <div className="flex items-center gap-2 font-semibold text-ink-800">
                      {channelIcons[channel.label]}
                      {channel.label}
                    </div>
                    <span>
                      {formatNumber(channel.completed)} / {formatNumber(channel.target)}
                    </span>
                  </div>
                  <Progress value={progress} />
                  <div className="flex items-center justify-between text-xs text-ink-400">
                    <span>Planned: {formatNumber(channel.planned)}</span>
                    <span>{progress.toFixed(0)}% complete</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Priority Queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.priorities.map((priority) => (
              <div
                key={priority.title}
                className="rounded-2xl border border-ink-100 bg-white p-4"
              >
                <div className="flex items-center justify-between text-xs text-ink-400">
                  <span>{priority.brand}</span>
                  <Badge variant="neutral">{priority.type}</Badge>
                </div>
                <p className="mt-2 text-sm font-semibold text-ink-800">
                  {priority.title}
                </p>
                <p className="mt-2 text-xs text-ink-500">Due {priority.due}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Brand Workstreams</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand</TableHead>
                <TableHead>Focus</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Next Deliverable</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pace</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.brandWorkstreams.map((workstream) => (
                <TableRow key={workstream.brand}>
                  <TableCell className="font-semibold text-ink-800">
                    {workstream.brand}
                  </TableCell>
                  <TableCell>{workstream.focus}</TableCell>
                  <TableCell>{workstream.owner}</TableCell>
                  <TableCell>{workstream.nextDeliverable}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        workstream.status === "Ahead"
                          ? "success"
                          : workstream.status === "At Risk"
                          ? "warning"
                          : "neutral"
                      }
                    >
                      {workstream.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{workstream.pace}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
