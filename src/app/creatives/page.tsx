import { ToolsShell } from "@/components/layout/ToolsShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
const imageTiles = [
  "Nano Banana Edit",
  "MetrixMate Guide",
  "Nano Banana Edit",
  "Nano Banana Pro Edit",
  "Nano Banana Edit",
  "Nano Banana Edit"
];

export default function CreativesPage() {
  return (
    <ToolsShell>
      <div className="flex flex-col gap-6">
        <header className="text-center">
          <h1 className="font-display text-3xl font-semibold text-ink-900">Creatives</h1>
          <p className="text-sm text-ink-500">Generate AI-powered creative assets</p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <Card>
            <CardHeader>
              <CardTitle>Creative Generator</CardTitle>
              <p className="text-sm text-ink-500">Fill in the details to generate your creative assets</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Brand</p>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amaltaas">Amaltaas</SelectItem>
                    <SelectItem value="aurora">Aurora Bikes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Model</p>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Imagen4" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="imagen4">Imagen4</SelectItem>
                    <SelectItem value="nano">Nano Banana</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Creative Guideline</p>
                <textarea
                  className="min-h-[100px] w-full rounded-2xl border border-ink-100 px-4 py-3 text-sm"
                  placeholder="Design visually rich product visuals for social ads focusing on artisan baking..."
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Brand Guideline (Optional)</p>
                <textarea
                  className="min-h-[90px] w-full rounded-2xl border border-ink-100 px-4 py-3 text-sm"
                  placeholder="Keep it clean and premium. Neutral warm palette..."
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Aspect Ratio</p>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Landscape (16:9)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16-9">Landscape (16:9)</SelectItem>
                    <SelectItem value="1-1">Square (1:1)</SelectItem>
                    <SelectItem value="9-16">Portrait (9:16)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Generate Creative</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Images</CardTitle>
              <p className="text-sm text-ink-500">AI-generated creative assets</p>
            </CardHeader>
            <CardContent className="flex min-h-[420px] items-center justify-center">
              <div className="text-center text-sm text-ink-500">
                <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-brand-50" />
                <p className="font-semibold text-ink-800">Ready to Generate</p>
                <p className="mt-1 text-xs">
                  Fill out the form on the left and click &quot;Generate Creative&quot; to create AI-powered images tailored to your specifications.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Previously Generated Images</CardTitle>
              <p className="text-sm text-ink-500">Your organization&apos;s creative history</p>
            </div>
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="All Users" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="me">Only me</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">Refresh</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {imageTiles.map((label, index) => (
                <div key={`${label}-${index}`} className="space-y-2">
                  <div className="h-32 rounded-2xl bg-gradient-to-br from-ink-50 via-white to-brand-50" />
                  <Badge variant="neutral">{label}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolsShell>
  );
}
