import { BrandSidebar } from "@/components/layout/BrandSidebar";
import { AppShell } from "@/components/layout/AppShell";
import { agency, clients } from "@/lib/data";

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell agency={agency} sidebar={<BrandSidebar clients={clients} />}>
      {children}
    </AppShell>
  );
}
