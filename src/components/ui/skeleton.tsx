
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted/80 bg-gradient-to-r from-muted/70 via-muted to-muted/70 bg-[length:400%_100%]", 
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
