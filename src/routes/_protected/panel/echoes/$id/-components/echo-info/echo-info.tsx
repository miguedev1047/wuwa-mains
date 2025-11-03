import { EchoSetIcons } from "@panel/echoes/$id/-components/echo-set-icons";
import { EchoSetBadges } from "@panel/echoes/$id/-components/echo-set-badge";
import { EchoSetDetails } from "@panel/echoes/$id/-components/echo-set-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditEchoForm } from "@panel/echoes/-components/echo-form";
import { SquareBox } from "@/components/shared-ui/square-box";
import { Separator } from "@/components/ui/separator";
import { TiptapPreview } from "@/components/shared-ui/editor";
import { useGetEcho } from "@panel/echoes/$id/-hooks/use-get-echo";

export function EchoInfo() {
  const echo = useGetEcho();

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <figure className="w-full h-auto relative">
            <div className="absolute top-0 inset-x-0 flex flex-col gap-2">
              <h2 className="text-3xl font-bold uppercase">{echo.name}</h2>
              <EchoSetIcons />
            </div>
            <figure className="w-full h-[720px] grid place-items-center">
              <img
                className="mx-auto size-[280px]"
                loading="lazy"
                src={echo.avatar_image}
                alt={echo.name}
              />
            </figure>
          </figure>
          <Card>
            <CardHeader className="gap-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SquareBox>
                    <img
                      src={echo.skill_image}
                      alt={echo.name}
                      loading="lazy"
                      className="size-16"
                    />
                  </SquareBox>
                  <div className="space-y-2">
                    <CardTitle>{echo.name}</CardTitle>
                  </div>
                </div>
                <EditEchoForm data={echo} echoId={echo.id} />
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="h-full">
              <div className="space-y-6 flex flex-col justify-between h-full">
                <EchoSetBadges />
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">Descripción</h2>
                  <TiptapPreview content={echo.description} />
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
