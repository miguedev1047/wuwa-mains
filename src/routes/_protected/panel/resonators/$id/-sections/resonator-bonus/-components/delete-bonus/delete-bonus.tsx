import type { ResonatorBonusZodSchema } from "@/schemas/zod/resonator-schema";

import { DestroyItem } from "@/components/shared-ui/destroy-item";
import { useDeleteBonus } from "@panel/resonators/$id/-sections/resonator-bonus/-hooks/use-delete-bonus";

export function DeleteBonus(data: ResonatorBonusZodSchema) {
  const { isPending, onDelete } = useDeleteBonus(data);

  return (
    <DestroyItem
      title="Eliminar bonus"
      description="¿Estas seguro que quieres eliminar este bonus? Esta acción es irreversible."
      onDelete={onDelete}
      disabled={isPending}
    />
  );
}
