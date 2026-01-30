import { BrandGmbClient } from "@/components/BrandGmbClient";
import { gmb } from "@/lib/data";

export default function Page() {
  return <BrandGmbClient data={gmb} />;
}
