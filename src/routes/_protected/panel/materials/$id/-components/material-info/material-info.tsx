import { StarsList } from "@/components/shared-ui/stars-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMaterialType } from "@/utils/general-utils";
import { EditMaterialForm } from "@panel/materials/-components/material-form";
import { SquareBox } from "@/components/shared-ui/square-box";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TiptapPreview } from "@/components/shared-ui/editor";
import { useGetMaterial } from "@panel/materials/$id/-hooks/use-get-material";

export function MaterialInfo() {
  const material = useGetMaterial();
  const { label: materialType } = getMaterialType(material.material_type);

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <figure className="w-full h-auto relative">
            <div className="absolute top-0 inset-x-0 flex flex-col gap-2">
              <h2 className="text-3xl font-bold uppercase">{material.name}</h2>
              <StarsList stars={material.stars} />
            </div>
            <figure className="w-full h-[720px] grid place-items-center">
              <img
                className="mx-auto size-[280px]"
                loading="lazy"
                src={material.avatar_image}
                alt={material.name}
              />
            </figure>
          </figure>
          <Card>
            <CardHeader className="gap-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SquareBox>
                    <img
                      src={material.avatar_image}
                      alt={material.name}
                      loading="lazy"
                      className="size-16"
                    />
                  </SquareBox>
                  <div className="space-y-2">
                    <CardTitle>{material.name}</CardTitle>
                    <Badge>{materialType}</Badge>
                  </div>
                </div>
                <EditMaterialForm data={material} materialId={material.id} />
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="h-full">
              <div className="space-y-6 flex flex-col justify-end h-full">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">Descripción</h2>
                  <TiptapPreview content={material.description} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
