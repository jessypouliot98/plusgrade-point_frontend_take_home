import { clsx } from "clsx";
import React from "react";

export type SkeletonBoxProps = {
  className?: string;
  style?: React.CSSProperties;
}

export function SkeletonBox({ className, style }: SkeletonBoxProps) {
  return (
    <div
      style={style}
      className={clsx("animate-pulse bg-(--color)", className)}
    />
  )
}