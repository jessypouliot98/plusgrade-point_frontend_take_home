import { taxApiClient } from "../client";
import { z } from "zod";
import { AxiosResponse } from "axios";
import { getLogger } from "../../../utils/logging/getLogger";

export type Params = {
  taxYear: number;
}

export type Options = {
  signal: AbortSignal;
}

const zTaxBracket = z.object({
  min: z.number().int().min(0),
  max: z.number().int().min(0).optional(),
  rate: z.number().min(0).max(1),
})

const zResponseData = z.object({
  tax_brackets: z.array(zTaxBracket).min(1),
});

type ResponseData = z.infer<typeof zResponseData>;

export function buildPath(params: Params) {
  return `tax-calculator/tax-year/${params.taxYear}`;
}

export function queryKeys(params: Params) {
  return buildPath(params).split("/");
}

export async function fetchTaxBracketList(params: Params, opts: Options): Promise<AxiosResponse<ResponseData>> {
  const response = await taxApiClient.get(buildPath(params), {
    signal: opts.signal,
  });

  const safeData = zResponseData.safeParse(response.data)

  if (!safeData.success) {
    getLogger().error("Invalid response format", { cause: safeData.error });
    // Return non-parsed data, break less in case it's a minor issue in our validator.
    return response;
  }

  return Object.assign(response, {
    data: safeData.data,
  })
}
