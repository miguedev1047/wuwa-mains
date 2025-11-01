import {
  SELECT_ELEMENT_TYPE,
  SELECT_STARS,
  SELECT_WEAPON_TYPE,
} from "@/constants";
import { SearchQuery } from "@/components/shared-ui/search-query";
import { SelectQuery } from "@/components/shared-ui/select-query";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

export function ResonatorHeader() {
  return (
    <header className="bg-card p-6 rounded-xl border shadow-lg space-y-6 @container/header">
      <div className="flex-1 flex items-center justify-between">
        <h2 className="text-xs sm:text-lg uppercase font-bold">
          Lista de resonadores
        </h2>
        <Button asChild variant="outline">
          <Link to="/panel/resonators/new">
            <PlusIcon />
            Agregar resonador
          </Link>
        </Button>
      </div>
      <div className="grid @[720px]/header:grid-cols-3 gap-4">
        <SearchQuery
          className="@[720px]/header:col-span-3"
          queryParam="name"
          placeholder="Buscar resonador..."
        />
        <SelectQuery
          queryParam="stars"
          placeholder="Filtrar por estrellas"
          items={SELECT_STARS.slice(0, 3)}
        />
        <SelectQuery
          queryParam="weapon"
          placeholder="Filtrar por arma"
          items={SELECT_WEAPON_TYPE}
        />
        <SelectQuery
          queryParam="element"
          placeholder="Filtrar por elemento"
          items={SELECT_ELEMENT_TYPE}
        />
      </div>
    </header>
  );
}
