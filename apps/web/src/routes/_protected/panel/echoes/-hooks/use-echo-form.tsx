import {
  echoZodSchema,
  type EchoZodSchema,
} from "@wuwa-mains/schemas/zod/echo-schema";
import { type EchoesFormProps } from "@/routes/_protected/panel/echoes/-types";

import { getDefaultEchoValues } from "@/helpers/defaut-values";
import { useAppForm } from "@/hooks/use-form";
import { useTRPC } from "@/trpc/root";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useId, useState } from "react";
import { toast } from "sonner";

export function useEchoForm(props: EchoesFormProps) {
  const { data, echoId } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  const id = useId();
  const formId = `form-${id}`;

  const isEditing = !!data;

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const DEFAULT_VALUES: EchoZodSchema = getDefaultEchoValues(data);

  const addEchoesQueryKey = trpc.echoes.get.queryKey();
  const invalidateQueryAddMaterials = () => {
    queryClient.invalidateQueries({ queryKey: addEchoesQueryKey });
  };
  const addEchoMutationOpts = trpc.echoes.add.mutationOptions({
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
      navigate({ to: "/panel/echoes" });
    },
  });
  const addEchoMutation = useMutation(addEchoMutationOpts);

  const updateEchoQueryKey = trpc.echoes.unique.queryKey({
    id: echoId,
  });
  const invalidateQueryUpdateEcho = () => {
    queryClient.invalidateQueries({ queryKey: updateEchoQueryKey });
  };
  const updateEchoMutationOpts = trpc.echoes.update.mutationOptions({
    onSuccess: (ctx) => {
      const { message } = ctx;
      toast.success(message);
    },
    onError: (ctx) => {
      const { message } = ctx;
      toast.error(message);
    },
    onSettled: () => {
      invalidateQueryUpdateEcho();
      setDialogOpen(false);
    },
  });
  const updateEchoMutation = useMutation(updateEchoMutationOpts);

  const form = useAppForm({
    defaultValues: DEFAULT_VALUES,
    validators: { onSubmit: echoZodSchema },
    onSubmit: ({ value }) => {
      if (isEditing) {
        if (!echoId) {
          toast.error("Este eco no tiene ID definido.");
          return;
        }

        updateEchoMutation.mutate({ id: echoId, ...value });
        return;
      }

      addEchoMutation.mutate(value);
    },
  });

  const isPending = updateEchoMutation.isPending || addEchoMutation.isPending;

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
