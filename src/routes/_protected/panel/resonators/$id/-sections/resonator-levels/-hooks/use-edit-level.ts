import {
  levelsZodSchema,
  type LevelZodSchema,
} from "@/schemas/zod/resonator-schema";

import { useAppForm } from "@/hooks/use-form";
import { useTRPC } from "@/trpc/root";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useId, useState } from "react";
import { toast } from "sonner";

export function useEditLevel(data: LevelZodSchema) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const id = useId();
  const formId = `form-${id}`;

  const { id: resonatorId } = useParams({
    from: "/_protected/panel/resonators/$id/",
  });

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const DEFAULT_VALUES: LevelZodSchema = {
    id: data.id,
    atq: data.atq,
    def: data.def,
    hp: data.hp,
    level: data.level,
    resonator_id: resonatorId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const queryKey = trpc.resonators.unique.queryKey({
    id: resonatorId,
  });
  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: queryKey });
  };

  const updateMutationOpts = trpc.levels.update.mutationOptions({
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
    validators: { onSubmit: levelsZodSchema },
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
