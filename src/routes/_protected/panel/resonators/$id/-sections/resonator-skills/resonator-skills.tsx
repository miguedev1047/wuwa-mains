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
} from "@/components/shared-ui/editable-block";
import { DeleteSkill } from "@panel/resonators/$id/-sections/resonator-skills/-components/delete-skill";
import { EditSkill } from "@panel/resonators/$id/-sections/resonator-skills/-components/edit-skill";
import { EmptySkill } from "@panel/resonators/$id/-sections/resonator-skills/-components/empty-skill";
import { AddSkill } from "@panel/resonators/$id/-sections/resonator-skills/-components/add-skill";
import { useGetResonator } from "@panel/resonators/$id/-hooks/use-get-resonator";
import { getResonatorSkillType } from "@/utils/general-utils";
import { TiptapPreview } from "@/components/shared-ui/editor";
import { Separator } from "@/components/ui/separator";
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
