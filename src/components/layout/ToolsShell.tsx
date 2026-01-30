import { AppShell } from "@/components/layout/AppShell";
import { agency } from "@/lib/data";

export function ToolsShell({ children }: { children: React.ReactNode }) {
  return (
    <AppShell agency={agency}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </AppShell>
  );
}
