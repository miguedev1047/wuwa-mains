import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResonatorBonusForm,
  ResonatorBonusList,
} from "@/routes/_protected/panel/resonators/$id/-sections/resonator-bonus/-components";
import { Separator } from "@/components/ui/separator";

export function ResonatorBonus() {
  return (
    <Card>
      <CardHeader className="gap-0">
        <div className="flex-1 flex justify-between items-center">
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold">Bonus</CardTitle>
            <CardDescription>Bonus del resonador.</CardDescription>
          </div>
          <ResonatorBonusForm />
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <ResonatorBonusList />
      </CardContent>
    </Card>
  );
}
