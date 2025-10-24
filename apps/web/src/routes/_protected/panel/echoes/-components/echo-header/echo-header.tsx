import {
  SELECT_ECHO_CLASS,
  SELECT_ECHO_COST,
  SELECT_ECHO_SET,
} from "@wuwa-mains/constants";
import { SearchQuery } from "@/components/shared-ui/search-query";
import { SelectQuery } from "@/components/shared-ui/select-query";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

export function EchoHeader() {
  return (
    <header className="bg-card p-6 rounded-xl border shadow-lg space-y-6 @container/header">
      <div className="flex-1 flex items-center justify-between">
        <h2 className="text-xs sm:text-lg uppercase font-bold">
          Lista de ecos
        </h2>
        <Button asChild variant="outline">
          <Link to="/panel/echoes/new">
            <PlusIcon />
            Agregar eco
          </Link>
        </Button>
      </div>
      <div className="grid @[720px]/header:grid-cols-3 gap-4">
        <SearchQuery
          className="@[720px]/header:col-span-3"
          queryParam="name"
          placeholder="Buscar eco..."
        />
        <SelectQuery
          queryParam="echo_class"
          placeholder="Filtrar por clase"
          items={SELECT_ECHO_CLASS}
        />
        <SelectQuery
          queryParam="echo_cost"
          placeholder="Filtrar por coste"
          items={SELECT_ECHO_COST}
        />
        <SelectQuery
          queryParam="echo_set"
          placeholder="Filtrar por conjunto"
          items={SELECT_ECHO_SET}
        />
      </div>
    </header>
  );
}
