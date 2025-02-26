import clsx from "clsx";

export type SkeletonTextProps = {
  className?: string;
};

export function SkeletonText({ className }: SkeletonTextProps) {
  return (
    <div className={clsx("[--color:theme(colors.gray.200)] animate-pulse bg-[var(--color)] rounded-full scale-y-75", className)}>
      &nbsp;
    </div>
  );
}
