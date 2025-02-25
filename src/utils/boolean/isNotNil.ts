import { isNil } from "./isNil";

export function isNotNil<V>(v: V | undefined | null): v is V {
  return !isNil(v);
}