import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import { StarsList } from "@/components/shared-ui/stars-list";
import { TiptapPreview } from "@/components/shared-ui/tiptap-preview";
import { ElementIcon } from "@/components/icons-ui/element-icon";
import { WeaponIcon } from "@/components/icons-ui/weapon-icon";
import { SquareBox } from "@/components/shared-ui/square-box";
import { EditResonatorForm } from "@/routes/_protected/panel/resonators/-components";
import { Badge } from "@/components/ui/badge";
import { useTRPC } from "@/trpc/root";

export function ResonatorInfo() {
  const { id } = useParams({ from: "/_protected/panel/resonators/$id/" });
  const trpc = useTRPC();
  const resonatorQueryOpts = trpc.resonators.unique.queryOptions({ id });
  const { data: resonator } = useSuspenseQuery(resonatorQueryOpts);

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <figure className="w-full h-auto relative">
            <div className="absolute top-0 inset-x-0 flex justify-between items-center">
              <div className="flex flex-col space-y-1">
                <h2 className="text-3xl font-bold">{resonator.name}</h2>
                <h4 className="text-lg text-muted-foreground">
                  {resonator.title}
                </h4>
              </div>
              <StarsList stars={resonator.stars} />
            </div>
            <img
              className="w-full h-auto"
              loading="lazy"
              src={resonator.avatar_image}
              alt={resonator.name}
            />
            <div className="absolute bottom-0 inset-x-0 flex justify-between items-center">
              <div className="flex items-center">
                <ElementIcon elementType={resonator.element_type} />
                <WeaponIcon weaponType={resonator.weapon_type} />
              </div>
            </div>
          </figure>
          <Card>
            <CardHeader className="gap-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SquareBox>
                    <img
                      src={resonator.avatar_image}
                      alt={resonator.name}
                      loading="lazy"
                      className="size-16"
                    />
                  </SquareBox>
                  <div className="space-y-1">
                    <CardTitle>{resonator.name}</CardTitle>
                    <CardDescription>{resonator.title}</CardDescription>
                  </div>
                </div>
                <EditResonatorForm
                  data={resonator}
                  resonatorId={resonator.id}
                />
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="h-full">
              <div className="space-y-6 flex flex-col justify-between h-full">
                <ol className="flex flex-wrap gap-2">
                  {resonator.combat_styles.map((item) => (
                    <li key={item.value}>
                      <Badge>{item.label}</Badge>
                    </li>
                  ))}
                </ol>
                <div>
                  <h2 className="text-xl font-bold">Descripción</h2>
                  <TiptapPreview
                    content={resonator.description}
                    className="text-muted-foreground italic text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
