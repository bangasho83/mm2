import { BrandKeywordsClient } from "@/components/BrandKeywordsClient";
import { keywords } from "@/lib/data";

export default function Page() {
  return <BrandKeywordsClient data={keywords} />;
}
