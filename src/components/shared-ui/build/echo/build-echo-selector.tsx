import type { EchoesFullDatabaseSchema } from "@/services/db/types/echoes-types";
import type { EchoSlotIndexProps } from "@/components/shared-ui/build/_types";

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
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  SELECT_ECHO_CLASS,
  SELECT_ECHO_COST,
  SELECT_ECHO_SET,
} from "@/data/constants";
import { useBuildEditorStore } from "@/services/store/build-editor-store";
import { useStore } from "zustand";
import { useGetEchoes } from "@/components/shared-ui/build/_hooks/use-get-echoes";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { MousePointerIcon, UserIcon } from "lucide-react";
import { SearchQuery } from "@/components/shared-ui/search-query";
import { SelectQuery } from "@/components/shared-ui/select-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WeaponListSkeleton } from "@/components/shared-ui/build/_shared/skeletons";
import { cn } from "@/lib/utils";

export function BuildEchoSelector(props: EchoSlotIndexProps) {
  const { echoSlotIndex } = props;

  const isOpenEchoDialog = useStore(
    useBuildEditorStore,
    (state) =>
      state.isOpenEchoDialog.activeSlot === echoSlotIndex &&
      state.isOpenEchoDialog.isActive,
  );

  const toggleEchoDialog = useStore(
    useBuildEditorStore,
    (state) => state.toggleEchoDialog,
  );

  const echoSelected = useStore(
    useBuildEditorStore,
    (state) => state.echoLoadout[echoSlotIndex].selected,
  );

  return (
    <Dialog
      open={isOpenEchoDialog}
      onOpenChange={(open) => toggleEchoDialog(open, echoSlotIndex)}
    >
      <DialogTrigger asChild>
        <Button className="w-full">
          <MousePointerIcon />
          {echoSelected ? "Cambiar eco" : "Seleccionar eco"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1080px]">
        <DialogHeader>
          <DialogTitle>Selecciona un eco</DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-4">
            <SearchQuery
              queryParam="echo_name"
              placeholder="Buscar eco..."
              className="col-span-3"
            />
            <SelectQuery
              queryParam="echo_class"
              placeholder="Filtrar por clase"
              items={SELECT_ECHO_CLASS}
            />
            <SelectQuery
              queryParam="echo_cost"
              placeholder="Filtrar por coste"
              items={SELECT_ECHO_COST}
            />
            <SelectQuery
              queryParam="echo_set"
              placeholder="Filtrar por conjunto"
              items={SELECT_ECHO_SET}
            />
          </div>
          <ScrollArea className="w-full h-[600px]">
            <Suspense fallback={<WeaponListSkeleton />}>
              <BuildEchoSelectorList echoSlotIndex={echoSlotIndex} />
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

export function BuildEchoSelectorEmpty() {
  return (
    <Empty className="w-full h-ful border border-dashed">
      <EmptyHeader>
        <EmptyMedia>
          <UserIcon />
        </EmptyMedia>
        <EmptyTitle>No hay ecos para mostar</EmptyTitle>
        <EmptyDescription>Aún no hay registros en esta lista.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

interface BuildEchoSelectorListProps {
  echoSlotIndex: number;
}

export function BuildEchoSelectorList(props: BuildEchoSelectorListProps) {
  const { echoSlotIndex } = props;
  const echoes = useGetEchoes();

  if (!echoes.length) {
    return <BuildEchoSelectorEmpty />;
  }

  return (
    <ul className="w-full grid grid-cols-3 md:grid-cols-7 gap-4">
      {echoes.map((echo) => (
        <BuildEchoSelectorItem
          key={echo.id}
          echo={echo}
          echoSlotIndex={echoSlotIndex}
        />
      ))}
    </ul>
  );
}

interface BuildEchoSelectorItemProps {
  echo: EchoesFullDatabaseSchema;
  echoSlotIndex: number;
}

export function BuildEchoSelectorItem(props: BuildEchoSelectorItemProps) {
  const { echo, echoSlotIndex } = props;
  const { id, avatar_image, name } = echo;

  const echoesSelected = useStore(
    useBuildEditorStore,
    (state) => state.echoLoadout,
  );

  const toggleEchoDialog = useStore(
    useBuildEditorStore,
    (state) => state.toggleEchoDialog,
  );

  const updateEchoSlot = useStore(
    useBuildEditorStore,
    (state) => state.updateEchoSlot,
  );

  const isSelectedEcho = echoesSelected.some(
    (item) => item.selected?.id === id,
  );

  const handleSelectEcho = () => {
    if (isSelectedEcho) return;

    updateEchoSlot(echoSlotIndex, { selected: echo, mainStat: "" });
    toggleEchoDialog(false, null);
  };

  return (
    <li
      onClick={handleSelectEcho}
      data-active={isSelectedEcho}
      className={cn(
        "bg-card border aspect-square rounded-(--radius) ",
        "data-[active=true]:border-primary data-[active=true]:opacity-50",
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <figure
            onClick={handleSelectEcho}
            className="size-full relative overflow-hidden"
          >
            <img
              className="size-full object-cover absolute inset-0"
              src={avatar_image}
              alt={name}
            />
          </figure>
        </TooltipTrigger>
        <TooltipContent side="bottom">{name}</TooltipContent>
      </Tooltip>
    </li>
  );
}
