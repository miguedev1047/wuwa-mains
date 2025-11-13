import { useTRPC } from "@/trpc/root";
import { useSuspenseQuery } from "@tanstack/react-query";
import { parseAsString, useQueryStates } from "nuqs";

export const searchParams = {
  echo_name: parseAsString.withDefault(""),
  echo_class: parseAsString.withDefault(""),
  echo_cost: parseAsString.withDefault(""),
  echo_set: parseAsString.withDefault(""),
};

export function useGetEchoes() {
  const trpc = useTRPC();
  const echoesQueryOpts = trpc.echoes.get.queryOptions();
  const { data: echoes } = useSuspenseQuery(echoesQueryOpts);

  const [{ echo_class, echo_cost, echo_name, echo_set }] =
    useQueryStates(searchParams);

  const filteredEchoes = echoes.filter((i) => {
    const matcher = [
      echo_name ? i.name.toLowerCase().includes(echo_name.toLowerCase()) : true,
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

  return filteredEchoes;
}
