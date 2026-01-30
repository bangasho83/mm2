import { ToolsShell } from "@/components/layout/ToolsShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function CalendarIdeationPage() {
  return (
    <ToolsShell>
      <div className="flex w-full flex-col gap-6">
        <header className="text-center">
          <h1 className="font-display text-3xl font-semibold text-ink-900">Content Calendar</h1>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Brand Information</CardTitle>
            <p className="text-sm text-ink-500">
              Create a personalized content calendar for your brand with scheduled posts and campaigns.
            </p>
          </CardHeader>
          <CardContent className="grid gap-6 lg:grid-cols-[1.1fr_1.3fr_1fr]">
            <div className="space-y-4">
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
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Starting Date</p>
                  <Input placeholder="30/01/2026" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">End Date</p>
                  <Input placeholder="01/03/2026" />
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">No of Posts</p>
                  <Input placeholder="12" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Posts per Week</p>
                  <Input placeholder="3" />
                </div>
              </div>
              <p className="text-xs text-ink-400">Configure posting frequency for this brand</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Products in Focus</p>
                <textarea
                  className="min-h-[90px] w-full rounded-2xl border border-ink-100 px-4 py-3 text-sm"
                  placeholder="Enter menu/catalogue URL or comma-separated list of products (e.g., Chicken Shawarma, Beef Kebab, Falafel Wrap)"
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Events</p>
                <textarea
                  className="min-h-[90px] w-full rounded-2xl border border-ink-100 px-4 py-3 text-sm"
                  placeholder="Enter upcoming events, holidays, special occasions, or seasonal campaigns to consider."
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Brand Brief</p>
                <textarea
                  className="min-h-[90px] w-full rounded-2xl border border-ink-100 px-4 py-3 text-sm"
                  placeholder="Describe your brand's voice, style, target audience, and key messaging..."
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Content Type Distribution</p>
                <div className="space-y-3">
                  {[
                    { label: "Product", value: "33%" },
                    { label: "Engagement", value: "33%" },
                    { label: "Sale", value: "34%" }
                  ].map((row) => (
                    <div key={row.label} className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-ink-500">
                        <span>{row.label}</span>
                        <span>{row.value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-ink-100">
                        <div className="h-2 w-2/3 rounded-full bg-ink-900" />
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between text-xs text-ink-500">
                    <span>Total:</span>
                    <span className="text-emerald-600">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardContent>
            <Button className="w-full" variant="secondary">
              Generate Content Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </ToolsShell>
  );
}
