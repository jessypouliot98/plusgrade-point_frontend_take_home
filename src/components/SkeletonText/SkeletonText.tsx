import clsx from "clsx";

export type SkeletonTextProps = {
  className?: string;
};

export function SkeletonText({ className }: SkeletonTextProps) {
  return (
    <div className={clsx("animate-pulse bg-gray-200 rounded-full scale-y-75", className)}>
      &nbsp;
    </div>
  );
}
