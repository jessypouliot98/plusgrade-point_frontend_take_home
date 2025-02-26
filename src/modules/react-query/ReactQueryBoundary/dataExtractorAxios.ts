import { AxiosResponse } from "axios";

export function dataExtractorAxios<TData>(res: AxiosResponse<TData>): TData {
  return res.data;
}