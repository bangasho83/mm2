import { BrandPagesClient } from "@/components/BrandPagesClient";
import { pages } from "@/lib/data";

export default function Page() {
  return <BrandPagesClient data={pages} />;
}
