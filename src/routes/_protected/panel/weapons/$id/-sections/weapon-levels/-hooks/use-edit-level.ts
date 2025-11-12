import {
  weaponLevelsZodSchema,
  type WeaponLevelZodSchema,
} from "@/schemas/zod/weapon-schema";

import { useAppForm } from "@/hooks/use-form";
import { useTRPC } from "@/trpc/root";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useId, useState } from "react";
import { toast } from "sonner";

export function useEditLevel(data: WeaponLevelZodSchema) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const id = useId();
  const formId = `form-${id}`;

  const { id: weaponId } = useParams({
    from: "/_protected/panel/weapons/$id/",
  });

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const DEFAULT_VALUES: WeaponLevelZodSchema = {
    id: data.id,
    atk: data.atk,
    stat_value: data.stat_value,
    level: data.level,
    weapon_id: weaponId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const queryKey = trpc.weapons.unique.queryKey({
    id: weaponId,
  });
  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: queryKey });
  };

  const updateMutationOpts = trpc.weapons.levels.update.mutationOptions({
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
      setDialogOpen(false);
      formClear();
    },
  });
  const updateMutation = useMutation(updateMutationOpts);

  const form = useAppForm({
    defaultValues: DEFAULT_VALUES,
    validators: { onSubmit: weaponLevelsZodSchema },
    onSubmit: ({ value }) => {
      updateMutation.mutate({ ...value });
    },
  });

  const formClear = () => form.reset();

  const isPending = updateMutation.isPending;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return {
    form,
    isPending,
    onSubmit,
    formId,
    dialogOpen,
    setDialogOpen,
  };
}
