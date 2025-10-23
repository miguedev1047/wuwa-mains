import {
  materialZodSchema,
  type MaterialZodSchema,
} from "@wuwa-mains/schemas/zod/material-schema";
import { type MaterialFormProps } from "@/routes/_protected/panel/materials/-types";

import { getDefaultMaterialValues } from "@/lib/defaut-values";
import { useAppForm } from "@/hooks/use-form";
import { useTRPC } from "@/trpc/root";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useId, useState } from "react";
import { toast } from "sonner";

export function useMaterialForm(props: MaterialFormProps) {
  const { data, materialId } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  const id = useId();
  const formId = `form-${id}`;

  const isEditing = !!data;

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const DEFAULT_VALUES: MaterialZodSchema = getDefaultMaterialValues(data);

  const addMaterialMutationOpts = trpc.materials.add.mutationOptions({
    onSuccess: (ctx) => {
      const { message } = ctx;
      toast.success(message);
    },
    onError: (ctx) => {
      const { message } = ctx;
      toast.error(message);
    },
    onSettled: () => {
      invalidateQueryAddMaterials();
      navigate({ to: "/panel/materials" });
    },
  });
  const addMaterialMutation = useMutation(addMaterialMutationOpts);

  const addMaterialsQueryKey = trpc.materials.get.queryKey();
  const invalidateQueryAddMaterials = () => {
    queryClient.invalidateQueries({ queryKey: addMaterialsQueryKey });
  };

  const updateMaterialMutationOpts = trpc.materials.update.mutationOptions({
    onSuccess: (ctx) => {
      const { message } = ctx;
      toast.success(message);
    },
    onError: (ctx) => {
      const { message } = ctx;
      toast.error(message);
    },
    onSettled: () => {
      invalidateQueryUpdateMaterials();
      setDialogOpen(false);
    },
  });
  const updateMaterialMutation = useMutation(updateMaterialMutationOpts);

  const updateMaterialsQueryKey = trpc.materials.unique.queryKey({
    id: materialId,
  });
  const invalidateQueryUpdateMaterials = () => {
    queryClient.invalidateQueries({ queryKey: updateMaterialsQueryKey });
  };

  const form = useAppForm({
    defaultValues: DEFAULT_VALUES,
    validators: { onSubmit: materialZodSchema },
    onSubmit: async ({ value }) => {
      if (isEditing) {
        if (!materialId) {
          toast.error("Este material no tiene ID definido.");
          return;
        }

        await updateMaterialMutation.mutateAsync({ id: materialId, ...value });
        return;
      }

      await addMaterialMutation.mutateAsync(value);
    },
  });

  console.log(form.state.errors);

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
  };
}
