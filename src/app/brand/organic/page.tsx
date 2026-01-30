import { BrandOrganicClient } from "@/components/BrandOrganicClient";
import { organic } from "@/lib/data";

export default function Page() {
  return <BrandOrganicClient data={organic} />;
}
