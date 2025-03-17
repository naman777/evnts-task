import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative  overflow-hidden bg-gray-300 rounded-md before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-gray-200 before:to-transparent before:animate-shimmer",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };

