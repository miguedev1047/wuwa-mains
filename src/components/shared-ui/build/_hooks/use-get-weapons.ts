import { useBuildEditorStore } from "@/services/store/build-editor-store";
import { useTRPC } from "@/trpc/root";
import { useSuspenseQuery } from "@tanstack/react-query";
import { parseAsString, useQueryStates } from "nuqs";
import { useStore } from "zustand";

export const searchParams = {
  weapon_name: parseAsString.withDefault(""),
  weapon_stars: parseAsString.withDefault(""),
};

export function useGetWeapons() {
  const trpc = useTRPC();
  const weaponsQueryOpts = trpc.weapons.full.queryOptions();
  const { data: weapons } = useSuspenseQuery(weaponsQueryOpts);

  const weapon_type = useStore(
    useBuildEditorStore,
    (state) => state.resonatorConfig?.selected?.weapon_type,
  );

  const [{ weapon_name, weapon_stars }] = useQueryStates(searchParams);

  const filteredWeapons = weapons.filter((i) => {
    const matcher = [
      weapon_name
        ? i.name.toLowerCase().includes(weapon_name.toLowerCase())
        : true,
      weapon_stars
        ? i.stars.toLowerCase().includes(weapon_stars.toLowerCase())
        : true,
      weapon_type
        ? i.weapon_type.toLowerCase().includes(weapon_type.toLowerCase())
        : true,
    ];
    return matcher.every((match) => match);
  });

  return filteredWeapons;
}
