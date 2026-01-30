import { BrandSidebar } from "@/components/layout/BrandSidebar";
import { AppShell } from "@/components/layout/AppShell";
import { agency, clients } from "@/lib/data";
import { Suspense } from "react";

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      agency={agency}
      sidebar={
        <Suspense fallback={null}>
          <BrandSidebar clients={clients} />
        </Suspense>
      }
    >
      {children}
    </AppShell>
  );
}
