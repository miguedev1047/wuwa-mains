import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { useTRPC } from "@/trpc/root";

export function WeaponBreadcrumb() {
  const { id } = useParams({ from: "/_protected/panel/weapons/$id/" });
  const trpc = useTRPC();
  const weaponQueryOpts = trpc.weapons.unique.queryOptions({ id });
  const { data: weapon } = useSuspenseQuery(weaponQueryOpts);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/panel/weapons">Armas</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{weapon.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
