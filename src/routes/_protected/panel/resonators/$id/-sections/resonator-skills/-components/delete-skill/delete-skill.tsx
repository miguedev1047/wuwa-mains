import type { ResonatorSkillZodSchema } from "@/schemas/zod/resonator-schema";
import { useDeleteSkill } from "@panel/resonators/$id/-sections/resonator-skills/-hooks/use-delete-skill";
import { DestroyItem } from "@/components/shared-ui/destroy-item";

export function DeleteSkill(data: ResonatorSkillZodSchema) {
  const { isPending, onDelete } = useDeleteSkill(data);

  return (
    <DestroyItem
      title="Eliminar habilidad"
      description="¿Estas seguro que quieres eliminar esta habilidad? Esta acción es irreversible."
      onDelete={onDelete}
      disabled={isPending}
    />
  );
}
