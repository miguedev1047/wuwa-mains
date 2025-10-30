import {
  resonatorSkillZodSchema,
  type ResonatorSkillZodSchema,
} from "@wuwa-mains/schemas/zod/resonator-schema";
import { useId, useState } from "react";
import { useTRPC } from "@/trpc/root";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAppForm } from "@/hooks/use-form";

export function useEditSkill(data: ResonatorSkillZodSchema) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { id: resonatorId } = useParams({
    from: "/_protected/panel/resonators/$id/",
  });

  const id = useId();
  const formId = `form-${id}`;

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const DEFAULT_VALUES: ResonatorSkillZodSchema = {
    id: data.id,
    name: data.name,
    description: data.description,
    skill_image: data.skill_image,
    resonator_id: resonatorId,
    skill_type: data.skill_type,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const queryKey = trpc.resonators.unique.queryKey({
    id: resonatorId,
  });
  const invalidateQueryResonator = () => {
    queryClient.invalidateQueries({ queryKey: queryKey });
  };

  const updateMutationOpts = trpc.skills.update.mutationOptions({
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
  const updateMutation = useMutation(updateMutationOpts);

  const form = useAppForm({
    defaultValues: DEFAULT_VALUES,
    validators: { onSubmit: resonatorSkillZodSchema },
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
