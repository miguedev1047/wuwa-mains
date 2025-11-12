import type { WeaponFullDatabaseSchema } from "@/services/db/types/weapon-types";

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
import { SELECT_STARS } from "@/data/constants";
import { useBuildEditorStore } from "@/services/store/build-editor-store";
import { useStore } from "zustand";
import { useGetWeapons } from "@/components/shared-ui/build/_hooks/use-get-weapons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { WeaponIcon } from "@/components/icons-ui/weapon-icon";
import { Suspense } from "react";
import { MousePointerIcon, UserIcon } from "lucide-react";
import { SearchQuery } from "@/components/shared-ui/search-query";
import { SelectQuery } from "@/components/shared-ui/select-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WeaponListSkeleton } from "@/components/shared-ui/build/_shared/skeletons";

export function BuildWeaponSelector() {
  const isOpenWeaponDialog = useStore(
    useBuildEditorStore,
    (state) => state.isOpenWeaponDialog,
  );

  const toggleWeaponDialog = useStore(
    useBuildEditorStore,
    (state) => state.toggleWeaponDialog,
  );

  return (
    <Dialog open={isOpenWeaponDialog} onOpenChange={toggleWeaponDialog}>
      <DialogTrigger asChild>
        <Button>
          <MousePointerIcon />
          Selecciona un arma
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1080px]">
        <DialogHeader>
          <DialogTitle>Selecciona un arma</DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          <div className="grid gap-4">
            <SearchQuery
              queryParam="weapon_name"
              placeholder="Buscar arma..."
            />
            <SelectQuery
              queryParam="weapon_stars"
              placeholder="Filtrar por estrellas"
              items={SELECT_STARS.slice(0, 4)}
            />
          </div>
          <ScrollArea className="w-full h-[600px]">
            <Suspense fallback={<WeaponListSkeleton />}>
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

export function BuildWeaponSelectorEmpty() {
  return (
    <Empty className="w-full h-ful border border-dashed">
      <EmptyHeader>
        <EmptyMedia>
          <UserIcon />
        </EmptyMedia>
        <EmptyTitle>No hay armas para mostar</EmptyTitle>
        <EmptyDescription>Aún no hay registros en esta lista.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

export function BuildResonatorSelectorList() {
  const weapons = useGetWeapons();

  if (!weapons.length) {
    return <BuildWeaponSelectorEmpty />;
  }

  return (
    <ul className="w-full grid grid-cols-3 md:grid-cols-7 gap-4">
      {weapons.map((weapon) => (
        <BuildWeaponSelectorItem key={weapon.id} {...weapon} />
      ))}
    </ul>
  );
}

export function BuildWeaponSelectorItem(props: WeaponFullDatabaseSchema) {
  const { id, avatar_image, name, weapon_type } = props;

  const setWeaponConfig = useStore(
    useBuildEditorStore,
    (state) => state.setWeaponConfig,
  );

  const weaponSelected = useStore(
    useBuildEditorStore,
    (state) => state.weaponConfig?.selected,
  );

  const toggleWeaponDialog = useStore(
    useBuildEditorStore,
    (state) => state.toggleWeaponDialog,
  );

  const handleSelectWeapon = (weapon: WeaponFullDatabaseSchema) => {
    setWeaponConfig({ selected: weapon });
    toggleWeaponDialog(false);
  };

  return (
    <li
      key={id}
      data-active={id === weaponSelected?.id}
      onClick={() => handleSelectWeapon(props)}
      className={cn(
        "bg-card border aspect-square rounded-(--radius)",
        "data-[active=true]:border-primary",
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <figure className="size-full relative overflow-hidden">
            <div className="flex items-center absolute top-1 right-1 z-10">
              <WeaponIcon className="size-8" weaponType={weapon_type} />
            </div>

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
