import {
  weaponZodSchema,
  type WeaponZodSchema,
} from "@wuwa-mains/schemas/zod/weapon-schema";
import { type WeaponFormProps } from "@/routes/_protected/panel/weapons/-types";

import { getDefaultWeaponValues } from "@/lib/defaut-values";
import { useAppForm } from "@/hooks/use-form";
import { useTRPC } from "@/trpc/root";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useId, useState } from "react";
import { toast } from "sonner";

export function useWeaponForm(props: WeaponFormProps) {
  const { data, weaponId } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  const id = useId();
  const formId = `form-${id}`;

  const isEditing = !!data;

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const DEFAULT_VALUES: WeaponZodSchema = getDefaultWeaponValues(data);

  const addWeaponsQueryKey = trpc.weapons.get.queryKey();
  const invalidateQueryAddWeapons = () => {
    queryClient.invalidateQueries({ queryKey: addWeaponsQueryKey });
  };
  const addWeaponMutationOpts = trpc.weapons.add.mutationOptions({
    onSuccess: (ctx) => {
      const { message } = ctx;
      toast.success(message);
    },
    onError: (ctx) => {
      const { message } = ctx;
      toast.error(message);
    },
    onSettled: () => {
      invalidateQueryAddWeapons();
      navigate({ to: "/panel/weapons" });
    },
  });
  const addWeaponMutation = useMutation(addWeaponMutationOpts);

  const updateWeaponsQueryKey = trpc.weapons.unique.queryKey({
    id: weaponId,
  });
  const invalidateQueryUpdateWeapons = () => {
    queryClient.invalidateQueries({ queryKey: updateWeaponsQueryKey });
  };
  const updateWeaponMutationOpts = trpc.weapons.update.mutationOptions({
    onSuccess: (ctx) => {
      const { message } = ctx;
      toast.success(message);
    },
    onError: (ctx) => {
      const { message } = ctx;
      toast.error(message);
    },
    onSettled: () => {
      invalidateQueryUpdateWeapons();
      setDialogOpen(false);
    },
  });
  const updateWeaponMutation = useMutation(updateWeaponMutationOpts);

  const form = useAppForm({
    defaultValues: DEFAULT_VALUES,
    validators: { onSubmit: weaponZodSchema },
    onSubmit: ({ value }) => {
      if (isEditing) {
        if (!weaponId) {
          toast.error("Este arma no tiene ID definido.");
          return;
        }

        updateWeaponMutation.mutate({ id: weaponId, ...value });
        return;
      }

      addWeaponMutation.mutate(value);
    },
  });

  const isPending =
    updateWeaponMutation.isPending || addWeaponMutation.isPending;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return {
    form,
    formId,
    isEditing,
    onSubmit,
    dialogOpen,
    setDialogOpen,
    isPending,
  };
}
