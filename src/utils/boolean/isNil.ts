export function isNil<V>(v: V | undefined | null): v is undefined | null {
  return v == undefined;
}