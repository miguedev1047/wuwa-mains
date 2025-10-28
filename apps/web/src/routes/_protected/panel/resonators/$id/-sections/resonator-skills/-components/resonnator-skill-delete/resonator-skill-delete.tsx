import type { ResonatorSkillZodSchema } from "@wuwa-mains/schemas/zod/resonator-schema";
import { DestroyItem } from "@/components/shared-ui/destroy-item";
import { useTRPC } from "@/trpc/root";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useParams } from "@tanstack/react-router";

interface ResonatorSkillDeleteProps {
  data: ResonatorSkillZodSchema;
}

export function ResonatorSkillDelete(props: ResonatorSkillDeleteProps) {
  const { data } = props;

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { id: resonatorId } = useParams({
    from: "/_protected/panel/resonators/$id/",
  });

  const itemId = data.id;

  const resonatorSkillQueryKey = trpc.resonators.unique.queryKey({
    id: resonatorId,
  });
  const invalidateQueryResonatorSkill = () => {
    queryClient.invalidateQueries({ queryKey: resonatorSkillQueryKey });
  };

  const resonatorSkillMutationOpts = trpc.skills.delete.mutationOptions({
    onSuccess: (ctx) => {
      const { message } = ctx;
      toast.success(message);
    },
    onError: (ctx) => {
      const { message } = ctx;
      toast.error(message);
    },
    onSettled: () => {
      invalidateQueryResonatorSkill();
    },
  });
  const resonatorSkillMutation = useMutation(resonatorSkillMutationOpts);

  const isPending = resonatorSkillMutation.isPending;

  const onResonatorSkillDelete = () => {
    if (!itemId) {
      return toast.error("Esta habilidad no existe.");
    }
    resonatorSkillMutation.mutate({ id: itemId });
  };

  return (
    <DestroyItem
      title="Eliminar habilidad"
      description="¿Estas seguro que quieres eliminar esta habilidad? Esta acción es
    irreversible."
      onDelete={onResonatorSkillDelete}
      disabled={isPending}
    />
  );
}
