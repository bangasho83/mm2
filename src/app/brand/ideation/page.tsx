import { BrandIdeationClient } from "@/components/BrandIdeationClient";
import { ideation } from "@/lib/data";

export default function IdeationPage() {
  return <BrandIdeationClient data={ideation} />;
}
