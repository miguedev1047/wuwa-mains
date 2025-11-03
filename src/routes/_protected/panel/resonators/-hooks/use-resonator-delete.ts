import { type ResonatorDatabaseSchema } from "@panel/resonators/-types";
import { useTRPC } from "@/trpc/root";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useResonatorDelete(data: ResonatorDatabaseSchema) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const resonatorId = data.id;

  const resonatorMutationOpts = trpc.resonators.delete.mutationOptions({
    onSuccess: (ctx) => {
      const { message } = ctx;
      toast.success(message);
    },
    onError: (ctx) => {
      const { message } = ctx;
      toast.error(message);
    },
    onSettled: () => {
      invalidateQueryResonators();
    },
  });
  const resonatorMutation = useMutation(resonatorMutationOpts);

  const resonatorsQueryKey = trpc.resonators.get.queryKey();
  const invalidateQueryResonators = () => {
    queryClient.invalidateQueries({ queryKey: resonatorsQueryKey });
  };

  const handleDeleteResonator = () => {
    resonatorMutation.mutate({ id: resonatorId });
  };

  return { handleDeleteResonator };
}
