import {
  EchoSetIcons,
  EchoSetBadges,
  EchoSetDetails,
} from "@/routes/_protected/panel/echoes/$id/-components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTRPC } from "@/trpc/root";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { EditEchoForm } from "@/routes/_protected/panel/echoes/-components";
import { SquareBox } from "@/components/shared-ui/square-box";
import { Separator } from "@/components/ui/separator";
import { TiptapPreview } from "@/components/shared-ui/tiptap-preview";

export function EchoInfo() {
  const { id } = useParams({ from: "/_protected/panel/echoes/$id/" });
  const trpc = useTRPC();
  const echoQueryOpts = trpc.echoes.unique.queryOptions({ id });
  const { data: echoes } = useSuspenseQuery(echoQueryOpts);

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <figure className="w-full h-auto relative">
            <div className="absolute top-0 inset-x-0 flex flex-col gap-2">
              <h2 className="text-3xl font-bold uppercase">{echoes.name}</h2>
              <EchoSetIcons />
            </div>
            <figure className="w-full h-[720px] grid place-items-center">
              <img
                className="mx-auto size-[280px]"
                loading="lazy"
                src={echoes.avatar_image}
                alt={echoes.name}
              />
            </figure>
          </figure>
          <Card>
            <CardHeader className="gap-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SquareBox>
                    <img
                      src={echoes.skill_image}
                      alt={echoes.name}
                      loading="lazy"
                      className="size-16"
                    />
                  </SquareBox>
                  <div className="space-y-2">
                    <CardTitle>{echoes.name}</CardTitle>
                  </div>
                </div>
                <EditEchoForm data={echoes} echoId={echoes.id} />
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="h-full">
              <div className="space-y-6 flex flex-col justify-between h-full">
                <EchoSetBadges />
                <div>
                  <h2 className="text-xl font-bold">Descripción</h2>
                  <TiptapPreview
                    content={echoes.description}
                    className="text-muted-foreground"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
      <CardContent>
        <EchoSetDetails />
      </CardContent>
    </Card>
  );
}
