import type { WeaponLevelZodSchema } from "@/schemas/zod/weapon-schema";

import { useDeleteLevel } from "@panel/weapons/$id/-sections/weapon-levels/-hooks/use-delete-level";
import { DestroyItem } from "@/components/shared-ui/destroy-item";

export function DeleteLevel(data: WeaponLevelZodSchema) {
  const { isPending, onDelete } = useDeleteLevel(data);

  return (
    <DestroyItem
      title="Eliminar nivel del arma"
      description="¿Estas seguro que quieres eliminar esta nivel del arma? Esta acción esirreversible."
      onDelete={onDelete}
      disabled={isPending}
    />
  );
}
