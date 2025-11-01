import { type MaterialDatabaseSchema } from "@/routes/_protected/panel/materials/-types";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type DialogMenu = "none" | "delete";

export function useMaterialActions(params: MaterialDatabaseSchema) {
  const navigate = useNavigate();
  const [dialogMenu, setDialogMenu] = useState<DialogMenu>("none");

  const itemId = params.id;

  const handleNavigate = () => {
    navigate({ to: "/panel/materials/$id", params: { id: itemId } });
  };

  const handleAction = (e: Event, action: DialogMenu) => {
    e.preventDefault();
    setDialogMenu(action);
  };

  return { handleNavigate, handleAction, dialogMenu };
}
