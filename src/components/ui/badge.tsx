
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-dashboard-primary text-white",
        secondary:
          "border-transparent bg-dashboard-secondary text-dashboard-primary",
        destructive:
          "border-transparent bg-status-error text-white",
        outline: "text-dashboard-text-primary border-gray-200",
        success: "border-transparent bg-status-success/10 text-status-success",
        warning: "border-transparent bg-status-warning/10 text-status-warning",
        error: "border-transparent bg-status-error/10 text-status-error",
        purple: "border-transparent bg-dashboard-primary/10 text-dashboard-primary",
        lime: "border-transparent bg-dashboard-accent-lime/20 text-green-700",
        yellow: "border-transparent bg-dashboard-accent-yellow/20 text-amber-700",
        pink: "border-transparent bg-dashboard-accent-pink/20 text-pink-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
