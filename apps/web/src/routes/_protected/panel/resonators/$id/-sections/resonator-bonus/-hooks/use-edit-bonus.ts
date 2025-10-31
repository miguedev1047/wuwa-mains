import {
  resonatorBonusZodSchema,
  type ResonatorBonusZodSchema,
} from "@wuwa-mains/schemas/zod/resonator-schema";
import { useTRPC } from "@/trpc/root";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useId, useState } from "react";
import { toast } from "sonner";
import { useAppForm } from "@/hooks/use-form";

export function useEditBonus(data: ResonatorBonusZodSchema) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { id: resonatorId } = useParams({
    from: "/_protected/panel/resonators/$id/",
  });

  const id = useId();
  const formId = `form-${id}`;

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const DEFAULT_VALUES: ResonatorBonusZodSchema = {
    bonus_value: data.bonus_value,
    id: data.id,
    resonator_id: resonatorId,
    stat_type: data.stat_type,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };

  const queryKey = trpc.resonators.unique.queryKey({
    id: resonatorId,
  });
  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: queryKey });
  };

  const updateMutationOpts = trpc.bonus.update.mutationOptions({
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
    },
  });
  const updateMutation = useMutation(updateMutationOpts);

  const form = useAppForm({
    defaultValues: DEFAULT_VALUES,
    validators: { onSubmit: resonatorBonusZodSchema },
    onSubmit: ({ value }) => {
      updateMutation.mutate({ ...value });
    },
  });

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
