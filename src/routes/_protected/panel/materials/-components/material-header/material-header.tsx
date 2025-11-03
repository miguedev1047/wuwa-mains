import { SELECT_MATERIAL_TYPE, SELECT_STARS } from "@/data/constants";
import { SearchQuery } from "@/components/shared-ui/search-query";
import { SelectQuery } from "@/components/shared-ui/select-query";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

export function MaterialHeader() {
  return (
    <header className="bg-card p-6 rounded-xl border shadow-lg space-y-6 @container/header">
      <div className="flex-1 flex items-center justify-between">
        <h2 className="text-xs sm:text-lg uppercase font-bold">
          Lista de materiales
        </h2>
        <Button asChild variant="outline">
          <Link to="/panel/materials/new">
            <PlusIcon />
            Agregar material
          </Link>
        </Button>
      </div>
      <div className="grid @[720px]/header:grid-cols-4 gap-4">
        <SearchQuery
          className="@[720px]/header:col-span-4"
          queryParam="name"
          placeholder="Buscar material..."
        />
        <SelectQuery
          className="@[720px]/header:col-span-2"
          queryParam="stars"
          placeholder="Filtrar por estrellas"
          items={SELECT_STARS.slice(0, 4)}
        />
        <SelectQuery
          className="@[720px]/header:col-span-2"
          queryParam="weapon"
          placeholder="Filtrar por tipo"
          items={SELECT_MATERIAL_TYPE}
        />
      </div>
    </header>
  );
}
