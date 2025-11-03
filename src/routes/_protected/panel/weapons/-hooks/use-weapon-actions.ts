import { type WeaponDatabaseSchema } from "@panel/weapons/-types";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type DialogMenu = "none" | "delete";

export function useWeaponActions(params: WeaponDatabaseSchema) {
  const navigate = useNavigate();
  const [dialogMenu, setDialogMenu] = useState<DialogMenu>("none");

  const itemId = params.id;

  const handleNavigate = () => {
    navigate({ to: "/panel/weapons/$id", params: { id: itemId } });
  };

  const handleAction = (e: Event, action: DialogMenu) => {
    e.preventDefault();
    setDialogMenu(action);
  };

  return { handleNavigate, handleAction, dialogMenu };
}
