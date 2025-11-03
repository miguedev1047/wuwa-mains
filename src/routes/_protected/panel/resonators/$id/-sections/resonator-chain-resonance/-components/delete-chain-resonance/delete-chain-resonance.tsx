import type { ChainResonanceZodSchema } from "@/schemas/zod/resonator-schema";
import { useDeleteChainResonance } from "@panel/resonators/$id/-sections/resonator-chain-resonance/-hooks/use-delete-chain-resonance";
import { DestroyItem } from "@/components/shared-ui/destroy-item";

export function DeleteChainResonance(data: ChainResonanceZodSchema) {
  const { isPending, onDelete } = useDeleteChainResonance(data);

  return (
    <DestroyItem
      title="Eliminar cadena de resonancia"
      description="¿Estas seguro que quieres eliminar esta cadena de resonancia? Esta acción esirreversible."
      onDelete={onDelete}
      disabled={isPending}
    />
  );
}
