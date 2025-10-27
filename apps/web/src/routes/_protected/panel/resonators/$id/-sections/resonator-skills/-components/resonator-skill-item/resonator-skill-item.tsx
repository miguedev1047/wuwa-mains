import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResonatorSkillDelete,
  ResonatorSkillForm as ResonatorSkillEdit,
} from "@/routes/_protected/panel/resonators/$id/-sections/resonator-skills/-components";
import type { ResonatorSkillZodSchema } from "@wuwa-mains/schemas/zod/resonator-schema";
import { Separator } from "@/components/ui/separator";
import { TiptapPreview } from "@/components/shared-ui/editor";
import { SquareBox } from "@/components/shared-ui/square-box";
import { getResonatorSkillType } from "@/utils/general-utils";

export function ResonatorSkillItem(data: ResonatorSkillZodSchema) {
  const { name, skill_image, skill_type, description } = data;

  const { label: resonatorSkillType } = getResonatorSkillType(skill_type);

  return (
    <Card className="bg-input/30">
      <CardHeader className="gap-0">
        <div className="flex-1 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <SquareBox size="sm">
              <img src={skill_image} alt={name} />
            </SquareBox>
            <div className="space-y-2">
              <CardTitle>{name}</CardTitle>
              <CardDescription>{resonatorSkillType}</CardDescription>
            </div>
          </div>
          <div className="flex space-x-2">
            <ResonatorSkillEdit data={data} />
            <ResonatorSkillDelete data={data} />
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="flex-1">
          <TiptapPreview className="text-sm" content={description} />
        </div>
      </CardContent>
    </Card>
  );
}
