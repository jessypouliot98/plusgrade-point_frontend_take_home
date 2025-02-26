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
      className={clsx("[--color:theme(colors.gray.200)] animate-pulse bg-[var(--color)]", className)}
    />
  )
}