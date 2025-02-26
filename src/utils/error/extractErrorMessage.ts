import { AxiosError } from "axios";
import { ZodError } from "zod";
import { isNotNil } from "../boolean/isNotNil";

// Could add i18n support and more user friendly error mapping for better UX

export function extractErrorMessage(error: unknown) {
  console.log({error})
  let msg: string;

  if (error instanceof AxiosError) {
    msg = `[${error.status ?? "unknown"}] Request error: ${error.code ?? "unknown"}`;
  } else if (error instanceof ZodError) {
    msg = error.message;
  } else if (error instanceof Error) {
    msg = error.message;
  } else if (typeof error === "object" && isNotNil(error) && "message" in error && typeof error.message === "string") {
    msg = error.message;
  } else if (typeof error === "string") {
    msg = error;
  } else {
    msg = "An unknown error has occurred";
  }

  return msg;
}