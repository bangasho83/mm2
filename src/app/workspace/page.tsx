import { WorkspaceClient } from "@/components/WorkspaceClient";
import { workspace } from "@/lib/data";

export default function WorkspacePage() {
  return <WorkspaceClient data={workspace} />;
}
