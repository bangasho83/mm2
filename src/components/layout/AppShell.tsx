import { DateRangeProvider } from "@/components/layout/DateRangeContext";
import { Topbar } from "@/components/layout/Topbar";
import type { Agency } from "@/lib/schemas";

interface AppShellProps {
  agency: Agency;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}

export function AppShell({ agency, sidebar, children }: AppShellProps) {
  return (
    <DateRangeProvider ranges={agency.dateRanges}>
      <div className="flex min-h-screen flex-col">
        <Topbar agency={agency} />
        {sidebar ? (
          <div className="flex min-h-screen">
            {sidebar}
            <main className="flex-1 px-6 py-8">{children}</main>
          </div>
        ) : (
          <main className="flex-1 px-6 py-8">{children}</main>
        )}
      </div>
    </DateRangeProvider>
  );
}
