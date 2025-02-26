import { fetchTaxBracketList, Params, queryKeys } from "./query";
import { useQuery } from "@tanstack/react-query";

export function useFetchTaxBracketListQuery(params: Params) {
  return useQuery({
    queryKey: queryKeys(params),
    queryFn: (opts) => fetchTaxBracketList(params, opts),
  })
}