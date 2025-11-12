import {
  resonatorLevelsZodSchema,
  type ResonatorLevelZodSchema,
} from "@/schemas/zod/resonator-schema";

import { useTRPC } from "@/trpc/root";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useId, useState } from "react";
import { toast } from "sonner";
import { useAppForm } from "@/hooks/use-form";

export function useAddLevel() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const id = useId();
  const formId = `form-${id}`;

  const { id: resonatorId } = useParams({
    from: "/_protected/panel/resonators/$id/",
  });

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const DEFAULT_VALUES: ResonatorLevelZodSchema = {
    atq: 0,
    def: 0,
    hp: 0,
    level: "none",
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

  const addMutationOpts = trpc.resonators.levels.add.mutationOptions({
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
  const addMutation = useMutation(addMutationOpts);

  const form = useAppForm({
    defaultValues: DEFAULT_VALUES,
    validators: { onSubmit: resonatorLevelsZodSchema },
    onSubmit: ({ value }) => {
      addMutation.mutate({ ...value });
    },
  });

  const formClear = () => form.reset();

  const isPending = addMutation.isPending;

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
