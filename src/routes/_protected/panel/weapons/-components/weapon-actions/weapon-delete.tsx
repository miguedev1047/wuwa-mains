import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { type WeaponDatabaseSchema } from "@panel/weapons/-types";
import { useWeaponDelete } from "@panel/weapons/-hooks/use-weapon-delete";

export function WeaponDeleteDialog(data: WeaponDatabaseSchema) {
  const { handleDeleteWeapon } = useWeaponDelete(data);

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Eliminar arma</AlertDialogTitle>
        <AlertDialogDescription>
          ¿Estas seguro que quieres eliminar esta arma? Esta acción es
          irreversoble.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteWeapon}>
          Eliminar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
