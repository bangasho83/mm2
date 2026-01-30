import { BrandOverviewClient } from "@/components/BrandOverviewClient";
import { clientDetails, clients } from "@/lib/data";

export default function BrandOverviewPage({
  searchParams
}: {
  searchParams?: { id?: string };
}) {
  const client = searchParams?.id
    ? clients.find((item) => item.id === searchParams.id) ?? clients[0]
    : clients[0];
  const detail = client ? clientDetails[client.id] : undefined;

  if (!client || !detail) {
    return null;
  }

  return <BrandOverviewClient client={client} detail={detail} />;
}
