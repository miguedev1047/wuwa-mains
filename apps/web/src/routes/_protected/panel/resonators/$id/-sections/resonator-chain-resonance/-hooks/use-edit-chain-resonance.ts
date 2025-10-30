import {
  type ChainResonanceZodSchema,
  chainResonanceZodSchema,
} from "@wuwa-mains/schemas/zod/resonator-schema";
import { useAppForm } from "@/hooks/use-form";
import { useTRPC } from "@/trpc/root";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useId, useState } from "react";
import { toast } from "sonner";

export function useEditChainResonance(data: ChainResonanceZodSchema) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const id = useId();
  const formId = `form-${id}`;

  const { id: resonatorId } = useParams({
    from: "/_protected/panel/resonators/$id/",
  });

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const DEFAULT_VALUES: ChainResonanceZodSchema = {
    chain_resonance_image: data.chain_resonance_image,
    resonator_id: resonatorId,
    description: data.description,
    name: data.name,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };

  const queryKey = trpc.resonators.unique.queryKey({
    id: resonatorId,
  });
  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: queryKey });
  };

  const addMutationOpts = trpc.chains.update.mutationOptions({
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
    validators: { onSubmit: chainResonanceZodSchema },
    onSubmit: ({ value }) => {
      if (!data) {
        return toast.error("No hay datos para actualizar.");
      }
      addMutation.mutate({ id: data.id, ...value });
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
