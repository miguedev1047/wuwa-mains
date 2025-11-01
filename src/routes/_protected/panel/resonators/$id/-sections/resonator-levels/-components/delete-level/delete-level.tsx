import type { LevelZodSchema } from "@/schemas/zod/resonator-schema";
import { useDeleteLevel } from "@/routes/_protected/panel/resonators/$id/-sections/resonator-levels/-hooks";
import { DestroyItem } from "@/components/shared-ui/destroy-item";

export function DeleteLevel(data: LevelZodSchema) {
  const { isPending, onDelete } = useDeleteLevel(data);

  return (
    <DestroyItem
      title="Eliminar cadena de resonancia"
      description="¿Estas seguro que quieres eliminar esta cadena de resonancia? Esta acción esirreversible."
      onDelete={onDelete}
      disabled={isPending}
    />
  );
}
