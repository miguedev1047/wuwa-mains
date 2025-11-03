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
import { AddBonus } from "@panel/resonators/$id/-sections/resonator-bonus/-components/add-bonus";
import { EmptyBonus } from "@panel/resonators/$id/-sections/resonator-bonus/-components/empty-bonus";
import { EditBonus } from "@panel/resonators/$id/-sections/resonator-bonus/-components/edit-bonus";
import { DeleteBonus } from "@panel/resonators/$id/-sections/resonator-bonus/-components/delete-bonus";
import { useGetResonator } from "@panel/resonators/$id/-hooks/use-get-resonator";
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
