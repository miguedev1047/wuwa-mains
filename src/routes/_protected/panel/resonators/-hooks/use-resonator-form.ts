import {
  resonatorZodSchema,
  type ResonatorZodSchema,
} from "@/schemas/zod/resonator-schema";
import { type ResonatorFormProps } from "@panel/resonators/-types";
import { getDefaultResonatorValues } from "@/helpers/defaut-values";
import { useAppForm } from "@/hooks/use-form";
import { useTRPC } from "@/trpc/root";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useId, useState } from "react";
import { toast } from "sonner";

export function useResonatorForm(props: ResonatorFormProps) {
  const { data, resonatorId } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  const id = useId();
  const formId = `form-${id}`;

  const isEditing = !!data;

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const DEFAULT_VALUES: ResonatorZodSchema = getDefaultResonatorValues(data);

  const addResonatorsQueryKey = trpc.resonators.get.queryKey();
  const invalidateQueryAddResonators = () => {
    queryClient.invalidateQueries({ queryKey: addResonatorsQueryKey });
  };
  const addResonatorMutationOpts = trpc.resonators.add.mutationOptions({
    onSuccess: (ctx) => {
      const { message } = ctx;
      toast.success(message);
    },
    onError: (ctx) => {
      const { message } = ctx;
      toast.error(message);
    },
    onSettled: () => {
      invalidateQueryAddResonators();
      navigate({ to: "/panel/resonators" });
    },
  });
  const addResonatorMutation = useMutation(addResonatorMutationOpts);

  const updateResonatorsQueryKey = trpc.resonators.unique.queryKey({
    id: resonatorId,
  });
  const invalidateQueryUpdateResonators = () => {
    queryClient.invalidateQueries({ queryKey: updateResonatorsQueryKey });
  };
  const updateResonatorMutationOpts = trpc.resonators.update.mutationOptions({
    onSuccess: (ctx) => {
      const { message } = ctx;
      toast.success(message);
    },
    onError: (ctx) => {
      const { message } = ctx;
      toast.error(message);
    },
    onSettled: () => {
      invalidateQueryUpdateResonators();
      setDialogOpen(false);
    },
  });
  const updateResonatorMutation = useMutation(updateResonatorMutationOpts);

  const form = useAppForm({
    defaultValues: DEFAULT_VALUES,
    validators: { onSubmit: resonatorZodSchema },
    onSubmit: ({ value }) => {
      if (isEditing) {
        if (!resonatorId) {
          toast.error("Este resonador no tiene ID definido.");
          return;
        }
        updateResonatorMutation.mutate({ id: resonatorId, ...value });
        return;
      }
      addResonatorMutation.mutate(value);
    },
  });

  const isPending =
    addResonatorMutation.isPending || updateResonatorMutation.isPending;

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
