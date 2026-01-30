import { WorkspaceSidebar } from "@/components/layout/WorkspaceSidebar";
import { AppShell } from "@/components/layout/AppShell";
import { agency } from "@/lib/data";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell agency={agency} sidebar={<WorkspaceSidebar />}>
      {children}
    </AppShell>
  );
}
