import { useTRPC } from "@/trpc/root";
import { useSuspenseQuery } from "@tanstack/react-query";
import { parseAsString, useQueryStates } from "nuqs";

export const searchParams = {
  name: parseAsString.withDefault(""),
  echo_class: parseAsString.withDefault(""),
  echo_cost: parseAsString.withDefault(""),
  echo_set: parseAsString.withDefault(""),
};

export function useEchoesList() {
  const trpc = useTRPC();
  const echoesQueryOpys = trpc.echoes.get.queryOptions();
  const { data: echoes } = useSuspenseQuery(echoesQueryOpys);

  const [{ name, echo_class, echo_cost, echo_set }] =
    useQueryStates(searchParams);

  const filteredEchoes = echoes.filter((i) => {
    const matcher = [
      name ? i.name.toLowerCase().includes(name.toLowerCase()) : true,
      echo_class
        ? i.class.toLowerCase().includes(echo_class.toLowerCase())
        : true,
      echo_cost ? i.cost.toLowerCase().includes(echo_cost.toLowerCase()) : true,
      echo_set
        ? i.sets.filter((set) =>
            set.value.toLowerCase().includes(echo_set.toLowerCase()),
          ).length > 0
        : true,
    ];
    return matcher.every((match) => match);
  });

  return { filteredEchoes };
}
