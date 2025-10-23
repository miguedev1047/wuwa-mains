import { useTRPC } from "@/trpc/root";
import { useSuspenseQuery } from "@tanstack/react-query";
import { parseAsString, useQueryStates } from "nuqs";
import type { ResonatorDatabaseSchema } from "@/routes/_protected/panel/resonators/-types";

export const searchParams = {
  name: parseAsString.withDefault(""),
  element: parseAsString.withDefault(""),
  stars: parseAsString.withDefault(""),
  weapon: parseAsString.withDefault(""),
};

export function useResonatorList() {
  const trpc = useTRPC();
  const resonatorsQueryOpts = trpc.resonators.get.queryOptions();
  const { data: resonators } = useSuspenseQuery(resonatorsQueryOpts);

  const [{ element, name, stars, weapon }] = useQueryStates(searchParams);

  const filteredResonators = resonators.filter((i) => {
    const matcher = [
      element ? i.element_type.toLowerCase().includes(element) : true,
      name ? i.name.toLowerCase().includes(name.toLowerCase()) : true,
      stars ? i.stars.toLowerCase().includes(stars.toLowerCase()) : true,
      weapon
        ? i.weapon_type.toLowerCase().includes(weapon.toLowerCase())
        : true,
    ];
    return matcher.every((match) => match);
  });

  return { filteredResonators };
}
