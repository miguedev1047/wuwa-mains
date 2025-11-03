import { MaterialItem } from "@panel/materials/-components/material-item";
import { MaterialEmpty } from "@panel/materials/-components/material-empty";
import { cn } from "@/lib/utils";
import { listGridClass } from "@/tw-class";
import { useMaterialList } from "@panel/materials/-hooks/use-material-list";

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

  return <ul className={cn(listGridClass)}>{MAPPED_MATERIALS}</ul>;
}
