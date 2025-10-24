import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EchoDeleteDialog } from "@/routes/_protected/panel/echoes/-components";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LinkIcon, SettingsIcon, TrashIcon } from "lucide-react";
import { type EchoesDatabaseSchema } from "@/routes/_protected/panel/echoes/-types";
import { useEchoActions } from "@/routes/_protected/panel/echoes/-hooks";

export function EchoActions(echo: EchoesDatabaseSchema) {
  const { handleNavigate, handleAction, dialogMenu } = useEchoActions(echo);

  const DialogMenu = () => {
    switch (dialogMenu) {
      case "delete":
        return <EchoDeleteDialog {...echo} />;
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
            Ver eco
          </DropdownMenuItem>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => handleAction(e, "delete")}
              variant="destructive"
            >
              <TrashIcon />
              Eliminar eco
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogMenu />
    </AlertDialog>
  );
}
