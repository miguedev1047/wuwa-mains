import {
  EditableBlock,
  EditableBlockList,
  EditableBlockItem,
  EditableBlockHeader,
  EditableBlockTitle,
  EditableBlockActions,
  EditableBlockGroup,
  EditableBlockActionItem,
  EditableBlockDescription,
  EditableBlockMedia,
} from "@/components/shared-ui/editable-block";
import {
  AddBonus,
  DeleteBonus,
  EditBonus,
  EmptyBonus,
} from "@/routes/_protected/panel/resonators/$id/-sections/resonator-bonus/-components";
import { useGetResonator } from "@/routes/_protected/panel/resonators/$id/-hooks";
import { getResonatorBonusType } from "@/utils/general-utils";
import { StatIcon } from "@/components/icons-ui/stat-icon";

export function ResonatorBonus() {
  const resonator = useGetResonator();
  const bonus = resonator.bonus;

  return (
    <EditableBlock
      title="Bonus"
      description="Listado de los bonus del resonador."
      addItem={<AddBonus />}
    >
      <EditableBlockList
        emptyContent={<EmptyBonus />}
        getKey={(key) => key.id}
        items={bonus}
        className="@[640px]:grid-cols-2"
      >
        {(item) => (
          <EditableBlockItem>
            <EditableBlockGroup>
              <EditableBlockMedia>
                <StatIcon stat={item.stat_type} />
              </EditableBlockMedia>
              <EditableBlockHeader>
                <EditableBlockTitle>
                  {getResonatorBonusType(item.stat_type).label}
                </EditableBlockTitle>
                <EditableBlockDescription>
                  {item.bonus_value}0%
                </EditableBlockDescription>
              </EditableBlockHeader>
              <EditableBlockActions>
                <EditableBlockActionItem asChild>
                  <EditBonus {...item} />
                </EditableBlockActionItem>
                <EditableBlockActionItem asChild>
                  <DeleteBonus {...item} />
                </EditableBlockActionItem>
              </EditableBlockActions>
            </EditableBlockGroup>
          </EditableBlockItem>
        )}
      </EditableBlockList>
    </EditableBlock>
  );
}
