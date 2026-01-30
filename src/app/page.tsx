import { HomeClient } from "@/components/HomeClient";
import { AppShell } from "@/components/layout/AppShell";
import { agency, clients } from "@/lib/data";

export default function HomePage() {
  return (
    <AppShell agency={agency}>
      <HomeClient clients={clients} agency={agency} />
    </AppShell>
  );
}
