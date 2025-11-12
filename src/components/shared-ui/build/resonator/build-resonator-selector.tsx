import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  SELECT_ELEMENT_TYPE,
  SELECT_STARS,
  SELECT_WEAPON_TYPE,
} from "@/data/constants";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";
import { useBuildEditorStore } from "@/services/store/build-editor-store";
import { useStore } from "zustand";
import { useGetResonators } from "@/components/shared-ui/build/_hooks/use-get-resonators";
import { SearchQuery } from "@/components/shared-ui/search-query";
import { SelectQuery } from "@/components/shared-ui/select-query";
import { ElementIcon } from "@/components/icons-ui/element-icon";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense } from "react";
import { ResonatorListSkeleton } from "@/components/shared-ui/build/_shared/skeletons";
import { MousePointerIcon, UserIcon } from "lucide-react";
import { ResonatorFullDatabaseSchema } from "@/services/db/types/resonator-types";

export function BuildResonatorSelector() {
  const isOpenResonatorDialog = useStore(
    useBuildEditorStore,
    (state) => state.isOpenResonatorDialog,
  );

  const toggleResonatorDialog = useStore(
    useBuildEditorStore,
    (state) => state.toggleResonatorDialog,
  );

  return (
    <Dialog open={isOpenResonatorDialog} onOpenChange={toggleResonatorDialog}>
      <DialogTrigger asChild>
        <Button>
          <MousePointerIcon />
          Selecciona un resonador
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1080px]">
        <DialogHeader>
          <DialogTitle>Selecciona un resonador</DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-4">
            <SearchQuery
              className="md:col-span-3"
              queryParam="resonator_name"
              placeholder="Buscar resonador..."
            />
            <SelectQuery
              queryParam="resonator_stars"
              placeholder="Filtrar por estrellas"
              items={SELECT_STARS.slice(0, 3)}
            />
            <SelectQuery
              queryParam="resonator_weapon_type"
              placeholder="Filtrar por arma"
              items={SELECT_WEAPON_TYPE}
            />
            <SelectQuery
              queryParam="resonator_element"
              placeholder="Filtrar por elemento"
              items={SELECT_ELEMENT_TYPE}
            />
          </div>
          <ScrollArea className="w-full h-[600px]">
            <Suspense fallback={<ResonatorListSkeleton />}>
              <BuildResonatorSelectorList />
            </Suspense>
          </ScrollArea>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function BuildResonatorSelectorEmpty() {
  return (
    <Empty className="w-full h-full border border-dashed">
      <EmptyHeader>
        <EmptyMedia>
          <UserIcon />
        </EmptyMedia>
        <EmptyTitle>No hay resonadores para mostar</EmptyTitle>
        <EmptyDescription>Aún no hay registros en esta lista.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

export function BuildResonatorSelectorList() {
  const resonators = useGetResonators();

  if (!resonators.length) {
    return <BuildResonatorSelectorEmpty />;
  }

  return (
    <ul className="w-full grid grid-cols-3 md:grid-cols-7 gap-4">
      {resonators.map((resonator) => (
        <BuildResonatorSelectorItem key={resonator.id} {...resonator} />
      ))}
    </ul>
  );
}

export function BuildResonatorSelectorItem(props: ResonatorFullDatabaseSchema) {
  const { id, splash_image, name, element_type } = props;

  const resonatorSelected = useStore(
    useBuildEditorStore,
    (state) => state.resonatorConfig?.selected,
  );

  const setResonatorConfig = useStore(
    useBuildEditorStore,
    (state) => state.setResonatorConfig,
  );

  const toggleResonatorDialog = useStore(
    useBuildEditorStore,
    (state) => state.toggleResonatorDialog,
  );

  const handleSelectResonator = (resonator: ResonatorFullDatabaseSchema) => {
    setResonatorConfig({ selected: resonator });
    toggleResonatorDialog(false);
  };

  return (
    <li
      key={id}
      data-active={id === resonatorSelected?.id}
      onClick={() => handleSelectResonator(props)}
      className={cn(
        "bg-card border aspect-2/3 rounded-(--radius)",
        "data-[active=true]:border-primary",
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <figure className="size-full relative overflow-hidden">
            <div className="flex items-center absolute top-1 right-1 z-10">
              <ElementIcon className="size-8" elementType={element_type} />
            </div>

            <img
              className="size-full object-cover absolute inset-0"
              src={splash_image}
              alt={name}
            />
          </figure>
        </TooltipTrigger>
        <TooltipContent side="bottom">{name}</TooltipContent>
      </Tooltip>
    </li>
  );
}
