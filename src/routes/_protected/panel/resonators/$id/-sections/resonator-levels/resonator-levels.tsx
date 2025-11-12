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
import { AddLevel } from "@panel/resonators/$id/-sections/resonator-levels/-components/add-level";
import { EmptyLevel } from "@panel/resonators/$id/-sections/resonator-levels/-components/empty-level";
import { EditLevel } from "@panel/resonators/$id/-sections/resonator-levels/-components/edit-level";
import { DeleteLevel } from "@panel/resonators/$id/-sections/resonator-levels/-components/delete-level";
import { Badge } from "@/components/ui/badge";
import { StatIcon } from "@/components/icons-ui/stat-icon";
import { useGetResonator } from "@panel/resonators/$id/-hooks/use-get-resonator";
import { getResonatorLevel } from "@/utils/general-utils";
import { sortResonatorLevels } from "@/helpers/sort-items";

export function ResonatorLevels() {
  const resonator = useGetResonator();
  const levels = sortResonatorLevels(resonator.level);

  return (
    <EditableBlock
      title="Niveles"
      description="Listado de los niveles del resonador."
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
                      <StatIcon stat="hp" />
                      <span>Vida: {item.hp}</span>
                    </div>
                  </Badge>
                  <Badge asChild>
                    <div className="flex items-center gap-2">
                      <StatIcon stat="atk" />
                      <span>Ataque: {item.atq}</span>
                    </div>
                  </Badge>
                  <Badge asChild>
                    <div className="flex items-center gap-2">
                      <StatIcon stat="def" />
                      <span>Defensa: {item.def}</span>
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
