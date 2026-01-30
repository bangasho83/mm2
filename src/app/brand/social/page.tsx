import { BrandSocialClient } from "@/components/BrandSocialClient";
import { social } from "@/lib/data";

export default function SocialPage() {
  return <BrandSocialClient data={social} />;
}
