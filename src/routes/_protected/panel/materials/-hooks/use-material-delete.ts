import { type MaterialDatabaseSchema } from "@/routes/_protected/panel/materials/-types";
import { useTRPC } from "@/trpc/root";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useMaterialDelete(params: MaterialDatabaseSchema) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const itemId = params.id;

  const materialsQueryKey = trpc.materials.get.queryKey();
  const invalidateQueryMaterials = () => {
    queryClient.invalidateQueries({ queryKey: materialsQueryKey });
  };

  const materialMutationOpts = trpc.materials.delete.mutationOptions({
    onSuccess: (ctx) => {
      const { message } = ctx;
      toast.success(message);
    },
    onError: (ctx) => {
      const { message } = ctx;
      toast.error(message);
    },
    onSettled: () => {
      invalidateQueryMaterials();
    },
  });
  const materialMutation = useMutation(materialMutationOpts);

  const handleDeleteMaterial = () => {
    materialMutation.mutate({ id: itemId });
  };

  return { handleDeleteMaterial };
}
