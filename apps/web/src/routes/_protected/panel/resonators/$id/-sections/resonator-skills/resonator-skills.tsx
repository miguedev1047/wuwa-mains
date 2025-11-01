import {
  EditableBlock,
  EditableBlockList,
  EditableBlockItem,
  EditableBlockHeader,
  EditableBlockTitle,
  EditableBlockMedia,
  EditableBlockActions,
  EditableBlockGroup,
  EditableBlockBody,
  EditableBlockActionItem,
  EditableBlockDescription,
} from "@/components/shared-ui/editable-block";
import {
  DeleteSkill,
  EditSkill,
  EmptySkill,
  AddSkill,
} from "@/routes/_protected/panel/resonators/$id/-sections/resonator-skills/-components";
import { useGetResonator } from "@/routes/_protected/panel/resonators/$id/-hooks";
import { TiptapPreview } from "@/components/shared-ui/editor";
import { Separator } from "@/components/ui/separator";
import { getResonatorSkillType } from "@/utils/general-utils";
import { Badge } from "@/components/ui/badge";

export function ResonatorSkills() {
  const resonator = useGetResonator();
  const skills = resonator.skills;

  return (
    <EditableBlock
      title="Habilidades"
      description="Enlistado de las habilidades del resonador."
      addItem={<AddSkill />}
    >
      <EditableBlockList
        emptyContent={<EmptySkill />}
        getKey={(key) => key.id}
        items={skills}
      >
        {(item) => (
          <EditableBlockItem>
            <EditableBlockGroup>
              <EditableBlockMedia>
                <img
                  src={item.skill_image}
                  alt={item.name}
                  loading="lazy"
                  className="size-full"
                />
              </EditableBlockMedia>
              <EditableBlockHeader>
                <EditableBlockTitle>{item.name}</EditableBlockTitle>
                <Badge>{getResonatorSkillType(item.skill_type).label}</Badge>
              </EditableBlockHeader>
              <EditableBlockActions>
                <EditableBlockActionItem asChild>
                  <EditSkill {...item} />
                </EditableBlockActionItem>
                <EditableBlockActionItem asChild>
                  <DeleteSkill {...item} />
                </EditableBlockActionItem>
              </EditableBlockActions>
            </EditableBlockGroup>
            <Separator />
            <EditableBlockBody>
              <TiptapPreview content={item.description} />
            </EditableBlockBody>
          </EditableBlockItem>
        )}
      </EditableBlockList>
    </EditableBlock>
  );
}
