import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SquareBox } from "@/components/shared-ui/square-box";
import { EditWeaponForm } from "@/routes/_protected/panel/weapons/-components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { TiptapPreview } from "@/components/shared-ui/editor";
import { StarsList } from "@/components/shared-ui/stars-list";
import { getMainStat } from "@/utils/general-utils";
import { useTRPC } from "@/trpc/root";

export function WeaponInfo() {
  const { id } = useParams({ from: "/_protected/panel/weapons/$id/" });
  const trpc = useTRPC();
  const weaponQueryOpts = trpc.weapons.unique.queryOptions({ id });
  const { data: weapon } = useSuspenseQuery(weaponQueryOpts);

  const { label: mainStat } = getMainStat(weapon.main_stat);

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <figure className="w-full h-auto relative">
            <div className="absolute top-0 inset-x-0 flex flex-col gap-2">
              <h2 className="text-3xl font-bold uppercase">{weapon.name}</h2>
              <StarsList stars={weapon.stars} />
            </div>
            <figure className="w-full h-[720px] grid place-items-center">
              <img
                className="mx-auto size-[280px]"
                loading="lazy"
                src={weapon.avatar_image}
                alt={weapon.name}
              />
            </figure>
          </figure>
          <Card>
            <CardHeader className="gap-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SquareBox>
                    <img
                      src={weapon.avatar_image}
                      alt={weapon.name}
                      loading="lazy"
                      className="size-16"
                    />
                  </SquareBox>
                  <div className="space-y-2">
                    <CardTitle>{weapon.name}</CardTitle>
                    <Badge>{mainStat}</Badge>
                  </div>
                </div>
                <EditWeaponForm data={weapon} weaponId={weapon.id} />
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="h-full">
              <div className="space-y-6 flex flex-col justify-end h-full">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold">Pasiva</h2>
                    <TiptapPreview content={weapon.passive} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold">Descripción</h2>
                    <TiptapPreview content={weapon.description} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
