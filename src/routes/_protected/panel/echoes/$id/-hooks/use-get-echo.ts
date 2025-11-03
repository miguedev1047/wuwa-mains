import { useTRPC } from "@/trpc/root";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export function useGetEcho() {
  const { id } = useParams({ from: "/_protected/panel/echoes/$id/" });
  const trpc = useTRPC();
  const echoQueryOpts = trpc.echoes.unique.queryOptions({ id });
  const { data: echoes } = useSuspenseQuery(echoQueryOpts);

  return echoes;
}
