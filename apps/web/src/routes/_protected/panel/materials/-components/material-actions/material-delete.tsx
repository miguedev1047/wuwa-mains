import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { type MaterialDatabaseSchema } from "@/routes/_protected/panel/materials/-types";
import { useMaterialDelete } from "@/routes/_protected/panel/materials/-hooks";

export function MaterialDeleteDialog(data: MaterialDatabaseSchema) {
  const { handleDeleteMaterial } = useMaterialDelete(data);

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Eliminar material</AlertDialogTitle>
        <AlertDialogDescription>
          ¿Estas seguro que quieres eliminar este material? Esta acción es
          irreversoble.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteMaterial}>
          Eliminar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
