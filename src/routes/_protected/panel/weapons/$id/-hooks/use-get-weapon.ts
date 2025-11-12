import { useTRPC } from "@/trpc/root";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export function useGetWeapon() {
  const { id } = useParams({ from: "/_protected/panel/weapons/$id/" });
  const trpc = useTRPC();
  const weaponQueryOpts = trpc.weapons.unique.queryOptions({ id });
  const { data: weapon } = useSuspenseQuery(weaponQueryOpts);

  return weapon;
}
