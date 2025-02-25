import { clsx } from "clsx";
import { extractErrorMessage } from "../../utils/error/extractErrorMessage";

export type ErrorMessageProps = {
  className?: string;
  error: unknown;
}

export function ErrorBanner({ className, error }: ErrorMessageProps) {
  return (
    <div className={clsx("px-4 py-2 rounded border border-red-200 bg-red-100 text-red-700", className)}>
      {extractErrorMessage(error)}
    </div>
  )
}