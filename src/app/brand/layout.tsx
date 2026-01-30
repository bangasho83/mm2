import { DateRangeProvider } from "@/components/layout/DateRangeContext";
import { BrandSidebar } from "@/components/layout/BrandSidebar";
import { Topbar } from "@/components/layout/Topbar";
import { agency, clients } from "@/lib/data";

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return (
    <DateRangeProvider ranges={agency.dateRanges}>
      <div className="flex min-h-screen flex-col">
        <Topbar agency={agency} />
        <div className="flex min-h-screen">
          <BrandSidebar clients={clients} />
          <main className="flex-1 px-6 py-8">{children}</main>
        </div>
      </div>
    </DateRangeProvider>
  );
}
