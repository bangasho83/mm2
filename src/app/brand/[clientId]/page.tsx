import { notFound } from "next/navigation";
import { ClientDetailClient } from "@/components/ClientDetailClient";
import { clientDetails, clients } from "@/lib/data";

export default function ClientPage({
  params
}: {
  params: { clientId: string };
}) {
  const client = clients.find((item) => item.id === params.clientId);
  const detail = clientDetails[params.clientId];
  if (!client || !detail) {
    notFound();
  }

  return <ClientDetailClient client={client} detail={detail} />;
}
