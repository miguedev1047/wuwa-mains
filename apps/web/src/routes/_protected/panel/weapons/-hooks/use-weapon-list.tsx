import { useTRPC } from "@/trpc/root";
import { useSuspenseQuery } from "@tanstack/react-query";
import { parseAsString, useQueryStates } from "nuqs";

export const searchParams = {
  name: parseAsString.withDefault(""),
  stars: parseAsString.withDefault(""),
  weapon: parseAsString.withDefault(""),
};

export function useWeaponList() {
  const trpc = useTRPC();
  const weaponsQueryOpts = trpc.weapons.get.queryOptions();
  const { data: weapons } = useSuspenseQuery(weaponsQueryOpts);

  const [{ name, stars, weapon }] = useQueryStates(searchParams);

  const filteredWeapons = weapons.filter((i) => {
    const matcher = [
      name ? i.name.toLowerCase().includes(name.toLowerCase()) : true,
      stars ? i.stars.toLowerCase().includes(stars.toLowerCase()) : true,
      weapon
        ? i.weapon_type.toLowerCase().includes(weapon.toLowerCase())
        : true,
    ];
    return matcher.every((match) => match);
  });

  return { filteredWeapons };
}
