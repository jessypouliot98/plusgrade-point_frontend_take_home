import { UseQueryResult } from "@tanstack/react-query";
import { JSX } from "react";
import { isNil } from "../../../utils/boolean/isNil";

type DataExtractor<TIn = unknown, TOut = unknown> = (input: TIn) => TOut;

export type ReactQueryBoundaryProps<
  TDataIn,
  TError,
  TDataOut,
> = {
  query: UseQueryResult<TDataIn, TError>;
  dataExtractor: DataExtractor<TDataIn, TDataOut>;
  emptyExtractor?: (data: TDataOut) => boolean;
  renderError: (error: TError) => JSX.Element;
  renderLoading: () => JSX.Element;
  renderEmpty: () => JSX.Element;
  renderContent: (data: TDataOut) => JSX.Element;
}

export function ReactQueryBoundary<
  TDataIn,
  TError,
  TDataOut,
>({
  query,
  dataExtractor,
  emptyExtractor,
  renderError,
  renderLoading,
  renderEmpty,
  renderContent,
}: ReactQueryBoundaryProps<TDataIn, TError, TDataOut>) {
  if (query.isLoading) {
    return renderLoading();
  }

  if (query.error) {
    return renderError(query.error);
  }

  const ensureData = (data: TDataIn | undefined): TDataOut => {
    if (isNil(data)) {
      throw new Error("data is required")
    }
    return (typeof dataExtractor === "function" ? dataExtractor(data) : data) as TDataOut;
  }

  if (
    isNil(query.data) ||
    (typeof emptyExtractor === "function" && emptyExtractor(ensureData(query.data)))
  ) {
    return renderEmpty();
  }

  return renderContent(ensureData(query.data))
}