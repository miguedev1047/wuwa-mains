import type { ResonatorSkillZodSchema } from "@/schemas/zod/resonator-schema";
import { useTRPC } from "@/trpc/root";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { toast } from "sonner";

export function useDeleteSkill(data: ResonatorSkillZodSchema) {
  const { id: resonatorId } = useParams({
    from: "/_protected/panel/resonators/$id/",
  });

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const queryKey = trpc.resonators.unique.queryKey({
    id: resonatorId,
  });
  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: queryKey });
  };

  const deleteMutationOpts = trpc.chains.delete.mutationOptions({
    onSuccess: (ctx) => {
      const { message } = ctx;
      toast.success(message);
    },
    onError: (ctx) => {
      const { message } = ctx;
      toast.error(message);
    },
    onSettled: () => {
      invalidateQuery();
    },
  });
  const deleteMutation = useMutation(deleteMutationOpts);

  const isPending = deleteMutation.isPending;

  const onDelete = () => {
    if (!data.id) {
      return toast.error("Habilidad no encontrada.");
    }
    deleteMutation.mutate({ id: data.id });
  };

  return { isPending, onDelete };
}
