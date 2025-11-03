import { type EchoesDatabaseSchema } from "@panel/echoes/-types";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type DialogMenu = "none" | "delete";

export function useEchoActions(params: EchoesDatabaseSchema) {
  const navigate = useNavigate();
  const [dialogMenu, setDialogMenu] = useState<DialogMenu>("none");

  const itemId = params.id;

  const handleNavigate = () => {
    navigate({ to: "/panel/echoes/$id", params: { id: itemId } });
  };

  const handleAction = (e: Event, action: DialogMenu) => {
    e.preventDefault();
    setDialogMenu(action);
  };

  return { handleNavigate, handleAction, dialogMenu };
}
