import {
  MaterialEmpty,
  MaterialItem,
} from "@/routes/_protected/panel/materials/-components";
import { cn } from "@/lib/utils";
import { listGridClass } from "@/tw-class";
import { useMaterialList } from "@/routes/_protected/panel/materials/-hooks";
import { TooltipProvider } from "@/components/ui/tooltip";

export function MaterialList() {
  const { filteredMaterials } = useMaterialList();

  if (!filteredMaterials.length) {
    return <MaterialEmpty />;
  }

  const MAPPED_MATERIALS = filteredMaterials.map((material) => (
    <li key={material.id}>
      <MaterialItem {...material} />
    </li>
  ));

  return (
    <TooltipProvider>
      <ul className={cn(listGridClass)}>{MAPPED_MATERIALS}</ul>
    </TooltipProvider>
  );
}
