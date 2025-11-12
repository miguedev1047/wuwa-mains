import {
  EditableBlock,
  EditableBlockList,
  EditableBlockItem,
  EditableBlockHeader,
  EditableBlockTitle,
  EditableBlockActions,
  EditableBlockGroup,
  EditableBlockActionItem,
} from "@/components/shared-ui/editable-block";
import { Badge } from "@/components/ui/badge";
import { AddLevel } from "@panel/weapons/$id/-sections/weapon-levels/-components/add-level";
import { EmptyLevel } from "@panel/weapons/$id/-sections/weapon-levels/-components/empty-level";
import { EditLevel } from "@panel/weapons/$id/-sections/weapon-levels/-components/edit-level";
import { DeleteLevel } from "@panel/weapons/$id/-sections/weapon-levels/-components/delete-level";
import { useGetWeapon } from "@panel/weapons/$id/-hooks/use-get-weapon";
import { getWeaponMainStat, getResonatorLevel } from "@/utils/general-utils";
import { sortWeaponLevels } from "@/helpers/sort-items";
import { StatIcon } from "@/components/icons-ui/stat-icon";

export function WeaponLevels() {
  const weapons = useGetWeapon();
  const levels = sortWeaponLevels(weapons.levels);

  return (
    <EditableBlock
      title="Niveles"
      description="Listado de los niveles del arma."
      addItem={<AddLevel />}
    >
      <EditableBlockList
        emptyContent={<EmptyLevel />}
        getKey={(key) => key.id}
        items={levels}
      >
        {(item) => (
          <EditableBlockItem>
            <EditableBlockGroup>
              <EditableBlockHeader>
                <EditableBlockTitle>
                  {getResonatorLevel(item.level).label}
                </EditableBlockTitle>
                <div className="flex items-center gap-2">
                  <Badge asChild>
                    <div className="flex items-center gap-2">
                      <StatIcon stat="atk" />
                      <p>Ataque: {item.atk}</p>
                    </div>
                  </Badge>
                  <Badge asChild>
                    <div className="flex items-center gap-2">
                      <StatIcon stat={weapons.main_stat} />
                      <p>
                        {getWeaponMainStat(weapons.main_stat).label}:{" "}
                        {item.stat_value}%
                      </p>
                    </div>
                  </Badge>
                </div>
              </EditableBlockHeader>
              <EditableBlockActions>
                <EditableBlockActionItem asChild>
                  <EditLevel {...item} />
                </EditableBlockActionItem>
                <EditableBlockActionItem asChild>
                  <DeleteLevel {...item} />
                </EditableBlockActionItem>
              </EditableBlockActions>
            </EditableBlockGroup>
          </EditableBlockItem>
        )}
      </EditableBlockList>
    </EditableBlock>
  );
}
