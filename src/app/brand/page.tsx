import { BrandOverviewClient } from "@/components/BrandOverviewClient";
import { clientDetails, clients } from "@/lib/data";

export default function BrandOverviewPage() {
  const client = clients[0];
  const detail = client ? clientDetails[client.id] : undefined;

  if (!client || !detail) {
    return null;
  }

  return <BrandOverviewClient client={client} detail={detail} />;
}
