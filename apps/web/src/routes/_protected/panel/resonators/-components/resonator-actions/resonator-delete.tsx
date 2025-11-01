import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { type ResonatorDatabaseSchema } from "@/routes/_protected/panel/resonators/-types";
import { useResonatorDelete } from "@/routes/_protected/panel/resonators/-hooks";

export function ResonatorDeleteDialog(resonator: ResonatorDatabaseSchema) {
  const { handleDeleteResonator } = useResonatorDelete(resonator);

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Eliminar resonador</AlertDialogTitle>
        <AlertDialogDescription>
          ¿Estas seguro que quieres eliminar este resonador? Esta acción es
          irreversoble.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteResonator}>
          Eliminar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
