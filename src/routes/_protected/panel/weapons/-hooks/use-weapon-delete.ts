import { type WeaponDatabaseSchema } from "@/routes/_protected/panel/weapons/-types";
import { useTRPC } from "@/trpc/root";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useWeaponDelete(params: WeaponDatabaseSchema) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const itemId = params.id;

  const weaponsQueryKey = trpc.weapons.get.queryKey();
  const invalidateQueryWeapons = () => {
    queryClient.invalidateQueries({ queryKey: weaponsQueryKey });
  };

  const weaponMutationOpts = trpc.weapons.delete.mutationOptions({
    onSuccess: (ctx) => {
      const { message } = ctx;
      toast.success(message);
    },
    onError: (ctx) => {
      const { message } = ctx;
      toast.error(message);
    },
    onSettled: () => {
      invalidateQueryWeapons();
    },
  });
  const weaponMutation = useMutation(weaponMutationOpts);

  const handleDeleteWeapon = () => {
    weaponMutation.mutate({ id: itemId });
  };

  return { handleDeleteWeapon };
}
