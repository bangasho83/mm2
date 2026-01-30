import { AppShell } from "@/components/layout/AppShell";
import { WorkspaceClient } from "@/components/WorkspaceClient";
import { agency, workspace } from "@/lib/data";

export default function WorkspacePage() {
  return (
    <AppShell agency={agency}>
      <WorkspaceClient data={workspace} />
    </AppShell>
  );
}
