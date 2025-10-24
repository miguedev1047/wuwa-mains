import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { type EchoesDatabaseSchema } from "@/routes/_protected/panel/echoes/-types";
import { useEchoDelete } from "@/routes/_protected/panel/echoes/-hooks";

export function EchoDeleteDialog(echo: EchoesDatabaseSchema) {
  const { handleDeleteEcho } = useEchoDelete(echo);

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Eliminar eco</AlertDialogTitle>
        <AlertDialogDescription>
          ¿Estas seguro que quieres eliminar este eco? Esta acción es
          irreversoble.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteEcho}>
          Eliminar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
