import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  getResonatorBonusType,
  getResonatorSkillType,
} from "@/utils/general-utils";
import { useStore } from "zustand";
import { cn } from "@/lib/utils";
import { useBuildEditorStore } from "@/services/store/build-editor-store";
import { sortResonatorSkills } from "@/helpers/sort-items";
import { StatIcon } from "@/components/icons-ui/stat-icon";
import { Card, CardContent } from "@/components/ui/card";
import { SquareBox } from "@/components/shared-ui/square-box";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { ResonatorSkillZodSchema } from "@/schemas/zod";
import { Fragment } from "react";

export function BuildResonatorSequences() {
  return (
    <Card className="bg-input/30">
      <CardContent>
        <div className="space-y-6">
          <BuildBonusStats />
          <BuildToggleSequences />
          <BuildSkillList />
        </div>
      </CardContent>
    </Card>
  );
}

export function BuildBonusStats() {
  const resonatorBonusSelected = useStore(
    useBuildEditorStore,
    (state) => state.resonatorConfig?.selected?.bonus ?? [],
  );

  if (!resonatorBonusSelected.length) {
    return null;
  }

  const groupedStats = resonatorBonusSelected.reduce(
    (acc, bonus) => {
      const existingStat = acc.find(
        (item) => item.stat_type === bonus.stat_type,
      );

      if (existingStat) {
        existingStat.bonus_value += bonus.bonus_value;
      } else {
        acc.push({
          stat_type: bonus.stat_type,
          bonus_value: bonus.bonus_value,
        });
      }

      return acc;
    },
    [] as Array<{ stat_type: string; bonus_value: number }>,
  );

  return (
    <div className="flex items-center gap-4">
      {groupedStats.map((stat) => (
        <div
          key={stat.stat_type}
          className="flex items-center gap-2 font-bold text-lg"
        >
          <StatIcon stat={stat.stat_type} />
          <div>
            <span>{getResonatorBonusType(stat.stat_type).label}: </span>
            <span>{stat.bonus_value.toFixed(0)}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function BuildToggleSequences() {
  const resonatorBonusSelected = useStore(
    useBuildEditorStore,
    (state) => state.resonatorConfig?.selected?.bonus ?? [],
  );

  const inherentSkillsSelected = useStore(
    useBuildEditorStore,
    (state) => state.resonatorConfig?.selected?.skills ?? [],
  );

  const sequenceStates = useStore(
    useBuildEditorStore,
    (state) => state.resonatorConfig?.sequenceStates ?? [],
  );

  const toggleSequence = useStore(
    useBuildEditorStore,
    (state) => state.toggleSequence,
  );

  if (!resonatorBonusSelected.length || !inherentSkillsSelected.length) {
    return null;
  }

  const inherentSkills = inherentSkillsSelected.filter(
    (skill) => skill.skill_type === "inherent_skill",
  );

  const bonusRowData = [
    { type: "bonus", data: resonatorBonusSelected[4] },
    { type: "bonus", data: resonatorBonusSelected[5] },
    { type: "skill", data: inherentSkills[0] },
    { type: "bonus", data: resonatorBonusSelected[7] },
    { type: "bonus", data: resonatorBonusSelected[6] },
    { type: "bonus", data: resonatorBonusSelected[0] },
    { type: "bonus", data: resonatorBonusSelected[1] },
    { type: "skill", data: inherentSkills[1] },
    { type: "bonus", data: resonatorBonusSelected[3] },
    { type: "bonus", data: resonatorBonusSelected[2] },
  ] as const;

  const allDataDefined = bonusRowData.every((item) => item.data !== undefined);

  if (!allDataDefined) {
    return null;
  }

  const MAPPED_SKILLS_ITEMS = bonusRowData.map((bonus, index) => {
    if (!bonus.data || !sequenceStates.length) return null;
    const isBonusActived = sequenceStates[index].isActive;

    return (
      <Fragment key={index}>
        {bonus.type === "bonus" && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Card
                data-active={isBonusActived}
                className={cn(
                  "bg-input/30 border aspect-square size-full mx-auto",
                  "data-[active=true]:border-primary",
                )}
                onClick={() => toggleSequence(index)}
              >
                <CardContent className="flex items-center justify-center">
                  <SquareBox size="full">
                    <StatIcon stat={bonus.data.stat_type} />
                  </SquareBox>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              {getResonatorBonusType(bonus.data.stat_type).label}
            </TooltipContent>
          </Tooltip>
        )}
        {bonus.type === "skill" && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Card
                data-active={isBonusActived}
                className={cn(
                  "bg-input/30 border aspect-square mx-auto",
                  "data-[active=true]:border-primary",
                )}
                onClick={() => toggleSequence(index)}
              >
                <CardContent className="flex items-center justify-center">
                  <SquareBox size="full">
                    <img
                      src={bonus.data.skill_image}
                      alt={bonus.data.name}
                      loading="lazy"
                    />
                  </SquareBox>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>{bonus.data.name}</TooltipContent>
          </Tooltip>
        )}
      </Fragment>
    );
  });

  return <div className="grid grid-cols-5 gap-8">{MAPPED_SKILLS_ITEMS}</div>;
}

export function BuildSkillList() {
  const MIN_SKILLS = 5;

  const resonatorSkillsSelected = useStore(
    useBuildEditorStore,
    (state) => state.resonatorConfig?.selected?.skills ?? [],
  );

  const sortedSkills = sortResonatorSkills(resonatorSkillsSelected);

  if (resonatorSkillsSelected.length <= MIN_SKILLS) {
    return (
      <Alert>
        <AlertCircle />
        <AlertTitle>Habilidades no disponibles</AlertTitle>
        <AlertDescription>
          Este resonador aun no tiene habilidades establecidas.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ul className="grid grid-cols-5 gap-4 pt-5">
      {sortedSkills.slice(0, 5).map((item, index) => (
        <BuildSkillItem key={item.id} skill={item} skillIndex={index} />
      ))}
    </ul>
  );
}

export function BuildSkillItem(props: {
  skill: ResonatorSkillZodSchema;
  skillIndex: number;
}) {
  const { skill, skillIndex } = props;

  const skillLevels = useStore(
    useBuildEditorStore,
    (state) => state.resonatorConfig?.skillLevels ?? [],
  );

  const updateSkillLevel = useStore(
    useBuildEditorStore,
    (state) => state.updateSkillLevel,
  );

  const handleChangeSkillLevel = (value: number[]) => {
    const level = value[0];
    updateSkillLevel(skillIndex, level);
  };

  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="space-y-4 w-full">
          <SquareBox size="full" className="p-2">
            <img
              className="size-20 object-cover"
              src={skill.skill_image}
              alt={skill.name}
            />
          </SquareBox>

          <p className="text-center">
            Nivel: {skillLevels[skillIndex].level || 1}
          </p>

          <Slider
            defaultValue={[skillLevels[skillIndex].level || 1]}
            onValueChange={handleChangeSkillLevel}
            min={1}
            max={10}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <span>{getResonatorSkillType(skill.skill_type).label}</span>
      </TooltipContent>
    </Tooltip>
  );
}
