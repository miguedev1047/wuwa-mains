import {
  resonatorSkillZodSchema,
  type ResonatorSkillZodSchema,
} from "@wuwa-mains/schemas/zod/resonator-schema";
import { useId, useState } from "react";
import { useTRPC } from "@/trpc/root";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { getDefaultResonatorSkillValues } from "@/helpers/defaut-values";
import { toast } from "sonner";
import { useAppForm } from "@/hooks/use-form";
import type { ResonatorSkillFormProps } from "@/routes/_protected/panel/resonators/-types";

export function useResonatorSkillForm(props: ResonatorSkillFormProps) {
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

  const DEFAULT_VALUES: ResonatorSkillZodSchema =
    getDefaultResonatorSkillValues(resonatorId, data);

  const resonatorQueryKey = trpc.resonators.unique.queryKey({
    id: resonatorId,
  });
  const invalidateQueryResonator = () => {
    queryClient.invalidateQueries({ queryKey: resonatorQueryKey });
  };

  const addSkillMutationOpts = trpc.skills.add.mutationOptions({
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
  const addSkillMutation = useMutation(addSkillMutationOpts);

  const updateResonatorMutationOpts = trpc.skills.update.mutationOptions({
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
  const updateSkillMutation = useMutation(updateResonatorMutationOpts);

  const form = useAppForm({
    defaultValues: DEFAULT_VALUES,
    validators: { onSubmit: resonatorSkillZodSchema },
    onSubmit: ({ value }) => {
      if (isEditing) {
        if (!itemId) {
          toast.error("Esta skill no tiene ID definido.");
          return;
        }

        updateSkillMutation.mutate({ id: itemId, ...value });
        return;
      }

      addSkillMutation.mutate({ ...value });
    },
  });

  const formClear = () => form.reset();

  const isPending = addSkillMutation.isPending || updateSkillMutation.isPending;

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
