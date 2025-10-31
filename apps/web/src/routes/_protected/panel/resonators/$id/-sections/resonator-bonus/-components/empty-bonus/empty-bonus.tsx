import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { GalleryVerticalEnd } from "lucide-react";

export function EmptyBonus() {
  return (
    <Empty className="w-full border border-dashed">
      <EmptyHeader>
        <EmptyMedia>
          <GalleryVerticalEnd />
        </EmptyMedia>
        <EmptyTitle>No hay bonus para mostrar</EmptyTitle>
        <EmptyDescription>
          Aún no hay registros en esta lista. Añade un bonus y se mostrará aquí.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
