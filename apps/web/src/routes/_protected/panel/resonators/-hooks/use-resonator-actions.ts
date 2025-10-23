import { type ResonatorDatabaseSchema } from "@/routes/_protected/panel/resonators/-types";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type DialogMenu = "none" | "delete";

export function useResonatorActions(params: ResonatorDatabaseSchema) {
  const navigate = useNavigate();
  const [dialogMenu, setDialogMenu] = useState<DialogMenu>("none");

  const resonatorId = params.id;

  const handleNavigate = () => {
    navigate({ to: "/panel/resonators/$id", params: { id: resonatorId } });
  };

  const handleAction = (e: Event, action: DialogMenu) => {
    e.preventDefault();
    setDialogMenu(action);
  };

  return { handleNavigate, handleAction, dialogMenu };
}
