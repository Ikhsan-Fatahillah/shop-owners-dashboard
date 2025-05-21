
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-dashboard-secondary/70 bg-gradient-to-r from-dashboard-secondary/60 via-dashboard-secondary/80 to-dashboard-secondary/60 bg-[length:400%_100%]", 
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
