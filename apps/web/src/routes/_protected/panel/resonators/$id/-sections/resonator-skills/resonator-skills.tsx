import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResonatorSkillForm as AddResonatorSkill,
  ResonatorSkillList,
} from "@/routes/_protected/panel/resonators/$id/-sections/resonator-skills/-components";
import { Separator } from "@/components/ui/separator";

export function ResonatorSkills() {
  return (
    <Card>
      <CardHeader className="gap-0">
        <div className="flex-1 flex justify-between items-center">
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold">Habilidades</CardTitle>
            <CardDescription>
              Habilidades detalladas del resonador.
            </CardDescription>
          </div>
          <AddResonatorSkill />
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <ResonatorSkillList />
      </CardContent>
    </Card>
  );
}
