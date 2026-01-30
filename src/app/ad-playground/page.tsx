import { ToolsShell } from "@/components/layout/ToolsShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function AdPlaygroundPage() {
  return (
    <ToolsShell>
      <div className="flex w-full flex-col gap-6">
        <header className="text-center">
          <h1 className="font-display text-3xl font-semibold text-ink-900">Ad Playground</h1>
          <p className="text-sm text-ink-500">Generate AI-powered ad campaigns</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Generator</CardTitle>
              <p className="text-sm text-ink-500">Fill in the details to generate your ad campaign</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Brand</p>
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
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Client Brief</p>
                <textarea
                  className="min-h-[80px] w-full rounded-2xl border border-ink-100 px-4 py-3 text-sm"
                  placeholder="Brief about the client/brand (auto-populated when brand is selected)"
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Campaign Objective</p>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select campaign objective" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="traffic">Traffic</SelectItem>
                    <SelectItem value="conversions">Conversions</SelectItem>
                    <SelectItem value="awareness">Awareness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Age</p>
                  <Input placeholder="e.g., 25-35" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Gender</p>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Location</p>
                <Input placeholder="e.g., New York, USA or Toronto, Canada" />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Budget</p>
                  <Input placeholder="e.g., $5,000" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Campaign Duration</p>
                  <Input placeholder="e.g., 30 days" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Call to Action</p>
                <Input placeholder="e.g., Shop Now, Learn More, Sign Up" />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Landing Page URL</p>
                <Input placeholder="e.g., https://yourwebsite.com/landing-page" />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Campaign Brief</p>
                <textarea
                  className="min-h-[90px] w-full rounded-2xl border border-ink-100 px-4 py-3 text-sm"
                  placeholder="Specific details about this campaign..."
                />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Number of Ad Sets</p>
                  <Input placeholder="2" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Ads per Ad Set</p>
                  <Input placeholder="3" />
                </div>
              </div>
              <Button className="w-full">Generate Campaign</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Campaign</CardTitle>
              <p className="text-sm text-ink-500">AI-generated campaign strategy and content</p>
            </CardHeader>
            <CardContent className="flex min-h-[520px] items-center justify-center text-center text-sm text-ink-500">
              Fill out the form and click "Generate Campaign" to see results
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolsShell>
  );
}
