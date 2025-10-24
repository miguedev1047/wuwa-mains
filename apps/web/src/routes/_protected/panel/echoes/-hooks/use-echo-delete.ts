import { type EchoesDatabaseSchema } from "@/routes/_protected/panel/echoes/-types";
import { useTRPC } from "@/trpc/root";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useEchoDelete(params: EchoesDatabaseSchema) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const itemId = params.id;

  const echoesQueryKey = trpc.echoes.get.queryKey();
  const invalidateEchoesMaterials = () => {
    queryClient.invalidateQueries({ queryKey: echoesQueryKey });
  };

  const echoMutationOpts = trpc.echoes.delete.mutationOptions({
    onSuccess: (ctx) => {
      const { message } = ctx;
      toast.success(message);
    },
    onError: (ctx) => {
      const { message } = ctx;
      toast.error(message);
    },
    onSettled: () => {
      invalidateEchoesMaterials();
    },
  });
  const echoMutation = useMutation(echoMutationOpts);

  const handleDeleteEcho = () => {
    echoMutation.mutate({ id: itemId });
  };

  return { handleDeleteEcho };
}
