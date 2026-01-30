import { BrandBacklinksClient } from "@/components/BrandBacklinksClient";
import { backlinks } from "@/lib/data";

export default function Page() {
  return <BrandBacklinksClient data={backlinks} />;
}
