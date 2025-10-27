import {
  ResonatorSkillEmpty,
  ResonatorSkillItem,
} from "@/routes/_protected/panel/resonators/$id/-sections/resonator-skills/-components";
import { sortSkillsByOrder } from "@/helpers/skills-order";
import { useGetResonator } from "@/routes/_protected/panel/resonators/$id/-hooks";

export function ResonatorSkillList() {
  const { skills } = useGetResonator();
  const orderedSkills = sortSkillsByOrder(skills);

  if (!orderedSkills.length) {
    return <ResonatorSkillEmpty />;
  }

  const MAPPED_SKILLS = orderedSkills.map((skill) => (
    <ResonatorSkillItem key={skill.id} {...skill} />
  ));

  return <ul className="flex-1 grid gap-4">{MAPPED_SKILLS}</ul>;
}
