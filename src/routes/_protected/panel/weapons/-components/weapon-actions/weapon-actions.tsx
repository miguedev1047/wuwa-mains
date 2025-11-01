import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WeaponDeleteDialog } from "@/routes/_protected/panel/weapons/-components";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LinkIcon, SettingsIcon, TrashIcon } from "lucide-react";
import { type WeaponDatabaseSchema } from "@/routes/_protected/panel/weapons/-types";
import { useWeaponActions } from "@/routes/_protected/panel/weapons/-hooks";

export function WeaponActions(data: WeaponDatabaseSchema) {
  const { handleNavigate, handleAction, dialogMenu } = useWeaponActions(data);

  const DialogMenu = () => {
    switch (dialogMenu) {
      case "delete":
        return <WeaponDeleteDialog {...data} />;
      default:
        return null;
    }
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="weapon-actions"
            size="icon"
            className="absolute bottom-1 right-1"
          >
            <SettingsIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleNavigate}>
            <LinkIcon />
            Ver arma
          </DropdownMenuItem>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => handleAction(e, "delete")}
              variant="destructive"
            >
              <TrashIcon />
              Eliminar arma
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogMenu />
    </AlertDialog>
  );
}
