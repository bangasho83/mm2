import { ToolsShell } from "@/components/layout/ToolsShell";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
export default function SiteAuditPage() {
  return (
    <ToolsShell>
      <div className="flex w-full flex-col gap-6">
        <PageHeader
          title="Site Audit"
          subtitle="View and manage your website audit tasks and results (Last 7 days)"
        />

        <Card>
          <CardHeader>
            <CardTitle>Create New Audit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Website URL</p>
              <Input placeholder="Enter website URL (e.g., example.com or https://example.com)" />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-36 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Pages</p>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="mt-6">Audit Website</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Audit Tasks</CardTitle>
            <span className="text-xs text-ink-400">1 task found</span>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Target URL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Completed</TableHead>
                  <TableHead>Max Pages</TableHead>
                  <TableHead>Tag</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-brand-600">https://www.halalhub.com</TableCell>
                  <TableCell>
                    <Badge variant="warning">Ready</Badge>
                  </TableCell>
                  <TableCell>Jan 29, 2026, 01:03 AM</TableCell>
                  <TableCell>Jan 29, 2026, 01:16 AM</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>metrix-mate</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View Report</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </ToolsShell>
  );
}
