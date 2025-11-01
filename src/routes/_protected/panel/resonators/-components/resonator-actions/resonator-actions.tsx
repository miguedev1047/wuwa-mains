import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResonatorDeleteDialog } from "@/routes/_protected/panel/resonators/-components/resonator-actions";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LinkIcon, SettingsIcon, TrashIcon } from "lucide-react";
import { type ResonatorDatabaseSchema } from "@/routes/_protected/panel/resonators/-types";
import { useResonatorActions } from "@/routes/_protected/panel/resonators/-hooks";

export function ResonatorActions(resonator: ResonatorDatabaseSchema) {
  const { handleNavigate, handleAction, dialogMenu } =
    useResonatorActions(resonator);

  const DialogMenu = () => {
    switch (dialogMenu) {
      case "delete":
        return <ResonatorDeleteDialog {...resonator} />;
      default:
        return null;
    }
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="resonator-actions"
            size="icon"
            className="absolute bottom-1 right-1"
          >
            <SettingsIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleNavigate}>
            <LinkIcon />
            Ver resonador
          </DropdownMenuItem>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => handleAction(e, "delete")}
              variant="destructive"
            >
              <TrashIcon />
              Eliminar resonador
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogMenu />
    </AlertDialog>
  );
}
