import { DateRangeProvider } from "@/components/layout/DateRangeContext";
import { Topbar } from "@/components/layout/Topbar";
import type { Agency } from "@/lib/schemas";

interface AppShellProps {
  agency: Agency;
  children: React.ReactNode;
}

export function AppShell({ agency, children }: AppShellProps) {
  return (
    <DateRangeProvider ranges={agency.dateRanges}>
      <div className="flex min-h-screen flex-col">
        <Topbar agency={agency} />
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </DateRangeProvider>
  );
}
