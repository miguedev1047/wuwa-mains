import { useTRPC } from "@/trpc/root";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export function useGetResonator() {
  const { id } = useParams({ from: "/_protected/panel/resonators/$id/" });
  const trpc = useTRPC();
  const resonatorQueryOpts = trpc.resonators.unique.queryOptions({ id });
  const { data: resonator } = useSuspenseQuery(resonatorQueryOpts);

  return resonator;
}
