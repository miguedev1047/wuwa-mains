import { createFileRoute } from "@tanstack/react-router";
import { BuildResonatorInformation } from "@/components/shared-ui/build/resonator/build-resonator-information";
import { Separator } from "@/components/ui/separator";
import { BuildWeaponInformation } from "@/components/shared-ui/build/weapon/build-weapon-information";

export const Route = createFileRoute("/_protected/panel/my-resonators/create/")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  return (
    <main className="space-y-8 px-4">
      <BuildResonatorInformation />
      <Separator />
      <BuildWeaponInformation />
    </main>
  );
}
