import { DestroyItem } from "@/components/shared-ui/destroy-item";
import { useTRPC } from "@/trpc/root";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import type { ResonatorBonusZodSchema } from "@wuwa-mains/schemas/zod/resonator-schema";
import { toast } from "sonner";

interface ResonatorBonusDeleteProps {
  data: ResonatorBonusZodSchema;
}

export function ResonatorBonusDelete(props: ResonatorBonusDeleteProps) {
  const { data } = props;

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { id: resonatorId } = useParams({
    from: "/_protected/panel/resonators/$id/",
  });

  const itemId = data.id;

  const resonatorBonusQueryKey = trpc.resonators.unique.queryKey({
    id: resonatorId,
  });
  const invalidateQueryResonatorBonus = () => {
    queryClient.invalidateQueries({ queryKey: resonatorBonusQueryKey });
  };

  const resonatorBonusMutationOpts = trpc.bonus.delete.mutationOptions({
    onSuccess: (ctx) => {
      const { message } = ctx;
      toast.success(message);
    },
    onError: (ctx) => {
      const { message } = ctx;
      toast.error(message);
    },
    onSettled: () => {
      invalidateQueryResonatorBonus();
    },
  });
  const resonatorBonusMutation = useMutation(resonatorBonusMutationOpts);

  const isPending = resonatorBonusMutation.isPending;

  const onResonatorBonusDelete = () => {
    if (!itemId) {
      return toast.error("Este bonus no existe.");
    }
    resonatorBonusMutation.mutate({ id: itemId });
  };

  return (
    <DestroyItem
      title="Eliminar bonus"
      description="¿Estas seguro que quieres eliminar este bonus? Esta acción es irreversible."
      onDelete={onResonatorBonusDelete}
      disabled={isPending}
    />
  );
}
