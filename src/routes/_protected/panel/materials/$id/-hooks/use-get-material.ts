import { useTRPC } from "@/trpc/root";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export function useGetMaterial() {
  const { id } = useParams({ from: "/_protected/panel/materials/$id/" });
  const trpc = useTRPC();
  const materialQueryOpts = trpc.materials.unique.queryOptions({ id });
  const { data: material } = useSuspenseQuery(materialQueryOpts);

  return material;
}
