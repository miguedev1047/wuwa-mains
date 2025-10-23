import { useTRPC } from "@/trpc/root";
import { useSuspenseQuery } from "@tanstack/react-query";
import { parseAsString, useQueryStates } from "nuqs";

export const searchParams = {
  name: parseAsString.withDefault(""),
  stars: parseAsString.withDefault(""),
  material_type: parseAsString.withDefault(""),
};

export function useMaterialList() {
  const trpc = useTRPC();
  const materialsQueryOpts = trpc.materials.get.queryOptions();
  const { data: materials } = useSuspenseQuery(materialsQueryOpts);

  const [{ name, stars, material_type }] = useQueryStates(searchParams);

  const filteredMaterials = materials.filter((i) => {
    const matcher = [
      name ? i.name.toLowerCase().includes(name.toLowerCase()) : true,
      stars ? i.stars.toLowerCase().includes(stars.toLowerCase()) : true,
      material_type
        ? i.material_type.toLowerCase().includes(material_type.toLowerCase())
        : true,
    ];
    return matcher.every((match) => match);
  });

  return { filteredMaterials };
}
