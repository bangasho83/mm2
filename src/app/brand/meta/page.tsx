import { BrandMetaClient } from "@/components/BrandMetaClient";
import { meta } from "@/lib/data";

export default function Page() {
  return <BrandMetaClient data={meta} />;
}
