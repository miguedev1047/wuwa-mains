import { SELECT_STARS, SELECT_WEAPON_TYPE } from "@/data/constants";
import { SearchQuery } from "@/components/shared-ui/search-query";
import { SelectQuery } from "@/components/shared-ui/select-query";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

export function WeaponHeader() {
  return (
    <header className="bg-card p-6 rounded-xl border shadow-lg space-y-6 @container/header">
      <div className="flex-1 flex items-center justify-between">
        <h2 className="text-xs sm:text-lg uppercase font-bold">
          Lista de armas
        </h2>
        <Button asChild variant="outline">
          <Link to="/panel/weapons/new">
            <PlusIcon />
            Agregar arma
          </Link>
        </Button>
      </div>
      <div className="grid @[720px]/header:grid-cols-4 gap-4">
        <SearchQuery
          className="@[720px]/header:col-span-4"
          queryParam="name"
          placeholder="Buscar arma..."
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
          placeholder="Filtrar por arma"
          items={SELECT_WEAPON_TYPE}
        />
      </div>
    </header>
  );
}
