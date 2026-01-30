import { ToolsShell } from "@/components/layout/ToolsShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
export default function KeywordPlannerPage() {
  return (
    <ToolsShell>
      <div className="flex w-full flex-col gap-6">
        <header className="text-center">
          <h1 className="font-display text-3xl font-semibold text-ink-900">Keyword Planner</h1>
          <p className="text-sm text-ink-500">Generate targeted keywords for your brand and website</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Brand Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Brand Name</p>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amaltaas">Amaltaas</SelectItem>
                    <SelectItem value="aurora">Aurora Bikes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Website</p>
                <Input placeholder="https://example.com" />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Products</p>
                <textarea
                  className="min-h-[90px] w-full rounded-2xl border border-ink-100 px-4 py-3 text-sm"
                  placeholder="Enter menu/catalogue URL or comma-separated list of products (e.g., Chicken Shawarma, Beef Kebab, Falafel Wrap)"
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Brand Brief</p>
                <textarea
                  className="min-h-[80px] w-full rounded-2xl border border-ink-100 px-4 py-3 text-sm"
                  placeholder="Brief description of your brand, products, or services..."
                />
              </div>
              <Button className="w-full" variant="secondary">
                Generate Keywords
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Keyword Results</CardTitle>
            </CardHeader>
            <CardContent className="flex min-h-[240px] items-center justify-center text-center text-sm text-ink-500">
              Select a brand and click "Generate Keywords" to see results here.
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolsShell>
  );
}
