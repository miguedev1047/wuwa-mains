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
import {
  AddLevel,
  DeleteLevel,
  EditLevel,
  EmptyLevel,
} from "@/routes/_protected/panel/resonators/$id/-sections/resonator-levels/-components";
import { useGetResonator } from "@/routes/_protected/panel/resonators/$id/-hooks";
import { getResonatorLevel } from "@/utils/general-utils";
import { Badge } from "@/components/ui/badge";

export function ResonatorLevels() {
  const resonator = useGetResonator();
  const levels = resonator.level;

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
                  <Badge>Vida: {item.hp}</Badge>
                  <Badge>Ataque: {item.atq}</Badge>
                  <Badge>Defensa: {item.def}</Badge>
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
