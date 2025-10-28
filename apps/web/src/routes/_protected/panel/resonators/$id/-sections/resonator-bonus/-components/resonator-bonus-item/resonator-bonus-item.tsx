import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  ResonatorBonusDelete,
  ResonatorBonusForm as ResonatorBonusEdit,
} from "@/routes/_protected/panel/resonators/$id/-sections/resonator-bonus/-components";
import { SquareBox } from "@/components/shared-ui/square-box";
import { StatIcon } from "@/components/icons-ui/stat-icon";
import type { ResonatorBonusZodSchema } from "@wuwa-mains/schemas/zod/resonator-schema";
import { getResonatorBonusType } from "@/utils/general-utils";

export function ResonatorBonusItem(data: ResonatorBonusZodSchema) {
  const { stat_type, bonus_value } = data;

  const { label: bonusType } = getResonatorBonusType(stat_type);

  return (
    <Card className="bg-input/30">
      <CardContent>
        <div className="flex-1 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <SquareBox size="sm">
              <StatIcon stat={stat_type} />
            </SquareBox>
            <div className="space-y-2">
              <CardTitle className="capitalize">{bonusType}</CardTitle>
              <CardDescription>{bonus_value}0%</CardDescription>
            </div>
          </div>
          <div className="flex space-x-2">
            <ResonatorBonusEdit data={data} />
            <ResonatorBonusDelete data={data} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
