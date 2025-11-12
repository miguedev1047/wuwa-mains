import { useTRPC } from "@/trpc/root";
import { useSuspenseQuery } from "@tanstack/react-query";
import { parseAsString, useQueryStates } from "nuqs";

export const searchParams = {
  resonator_name: parseAsString.withDefault(""),
  resonator_element: parseAsString.withDefault(""),
  resonator_stars: parseAsString.withDefault(""),
  resonator_weapon_type: parseAsString.withDefault(""),
};

export function useGetResonators() {
  const trpc = useTRPC();
  const resonatorsQueryOpts = trpc.resonators.full.queryOptions();
  const { data: resonators } = useSuspenseQuery(resonatorsQueryOpts);

  const [
    {
      resonator_element,
      resonator_name,
      resonator_stars,
      resonator_weapon_type,
    },
  ] = useQueryStates(searchParams);

  const filteredResonators = resonators.filter((i) => {
    const matcher = [
      resonator_element
        ? i.element_type.toLowerCase().includes(resonator_element.toLowerCase())
        : true,
      resonator_name
        ? i.name.toLowerCase().includes(resonator_name.toLowerCase())
        : true,
      resonator_stars
        ? i.stars.toLowerCase().includes(resonator_stars.toLowerCase())
        : true,
      resonator_weapon_type
        ? i.weapon_type
            .toLowerCase()
            .includes(resonator_weapon_type.toLowerCase())
        : true,
    ];
    return matcher.every((match) => match);
  });

  return filteredResonators;
}
