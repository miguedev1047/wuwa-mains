import {
  resonatorBonusZodSchema,
  type ResonatorBonusZodSchema,
} from "@wuwa-mains/schemas/zod/resonator-schema";
import { useId, useState } from "react";
import { useTRPC } from "@/trpc/root";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { getDefaultResonatorBonusValues } from "@/helpers/defaut-values";
import { toast } from "sonner";
import { useAppForm } from "@/hooks/use-form";
import type { ResonatorBonusFormProps } from "@/routes/_protected/panel/resonators/-types";

export function useResonatorBonusForm(props: ResonatorBonusFormProps) {
  const { data } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  const { id: resonatorId } = useParams({
    from: "/_protected/panel/resonators/$id/",
  });

  const id = useId();
  const formId = `form-${id}`;

  const itemId = data?.id;
  const isEditing = !!data && !!itemId;

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const DEFAULT_VALUES: ResonatorBonusZodSchema =
    getDefaultResonatorBonusValues(resonatorId, data);

  const resonatorQueryKey = trpc.resonators.unique.queryKey({
    id: resonatorId,
  });
  const invalidateQueryResonator = () => {
    queryClient.invalidateQueries({ queryKey: resonatorQueryKey });
  };

  const addBonusMutationOpts = trpc.bonus.add.mutationOptions({
    onSuccess: (ctx) => {
      const { message } = ctx;
      toast.success(message);
    },
    onError: (ctx) => {
      const { message } = ctx;
      toast.error(message);
    },
    onSettled: () => {
      invalidateQueryResonator();
      setDialogOpen(false);
      formClear();
    },
  });
  const addBonusMutation = useMutation(addBonusMutationOpts);

  const updateBonusMutationOpts = trpc.bonus.update.mutationOptions({
    onSuccess: (ctx) => {
      const { message } = ctx;
      toast.success(message);
    },
    onError: (ctx) => {
      const { message } = ctx;
      toast.error(message);
    },
    onSettled: () => {
      invalidateQueryResonator();
      setDialogOpen(false);
    },
  });
  const updateBonuslMutation = useMutation(updateBonusMutationOpts);

  const form = useAppForm({
    defaultValues: DEFAULT_VALUES,
    validators: { onSubmit: resonatorBonusZodSchema },
    onSubmit: ({ value }) => {
      console.log(value);

      if (isEditing) {
        if (!itemId) {
          toast.error("Este bonus no tiene ID definido.");
          return;
        }

        updateBonuslMutation.mutate({ id: itemId, ...value });
        return;
      }

      addBonusMutation.mutate({ ...value });
    },
  });

  const formClear = () => form.reset();

  const isPending =
    addBonusMutation.isPending || updateBonuslMutation.isPending;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return {
    form,
    isEditing,
    isPending,
    onSubmit,
    formId,
    dialogOpen,
    setDialogOpen,
  };
}
