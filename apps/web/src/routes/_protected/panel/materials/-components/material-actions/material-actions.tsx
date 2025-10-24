import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MaterialDeleteDialog } from "@/routes/_protected/panel/materials/-components";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LinkIcon, SettingsIcon, TrashIcon } from "lucide-react";
import { type MaterialDatabaseSchema } from "@/routes/_protected/panel/materials/-types";
import { useMaterialActions } from "@/routes/_protected/panel/materials/-hooks";

export function MaterialActions(data: MaterialDatabaseSchema) {
  const { handleNavigate, handleAction, dialogMenu } = useMaterialActions(data);

  const DialogMenu = () => {
    switch (dialogMenu) {
      case "delete":
        return <MaterialDeleteDialog {...data} />;
      default:
        return null;
    }
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="absolute bottom-1 right-1">
            <SettingsIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleNavigate}>
            <LinkIcon />
            Ver material
          </DropdownMenuItem>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => handleAction(e, "delete")}
              variant="destructive"
            >
              <TrashIcon />
              Eliminar material
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogMenu />
    </AlertDialog>
  );
}
