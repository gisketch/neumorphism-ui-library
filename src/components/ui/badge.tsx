import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
    "transition-all duration-200 ease-in-out",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-background text-foreground",
          "shadow-[-2px_-2px_4px_hsl(var(--shadow-light)),2px_2px_4px_hsl(var(--shadow-dark))]",
        ].join(" "),
        primary: [
          "bg-primary text-primary-foreground",
          "shadow-[inset_1px_1px_2px_hsl(var(--primary-light)),inset_-1px_-1px_2px_hsl(var(--primary-dark)/0.5),-2px_-2px_4px_hsl(var(--shadow-light)),2px_2px_4px_hsl(var(--shadow-dark))]",
        ].join(" "),
        secondary: [
          "bg-secondary text-secondary-foreground",
          "shadow-[inset_1px_1px_2px_hsl(var(--shadow-light)),inset_-1px_-1px_2px_hsl(var(--shadow-dark)/0.3),-2px_-2px_4px_hsl(var(--shadow-light)),2px_2px_4px_hsl(var(--shadow-dark))]",
        ].join(" "),
        destructive: [
          "bg-destructive text-destructive-foreground",
          "shadow-[inset_1px_1px_2px_hsl(var(--destructive-light)),inset_-1px_-1px_2px_hsl(var(--destructive-dark)/0.5),-2px_-2px_4px_hsl(var(--shadow-light)),2px_2px_4px_hsl(var(--shadow-dark))]",
        ].join(" "),
        success: [
          "bg-success text-success-foreground",
          "shadow-[inset_1px_1px_2px_hsl(var(--success-light)),inset_-1px_-1px_2px_hsl(var(--success-dark)/0.5),-2px_-2px_4px_hsl(var(--shadow-light)),2px_2px_4px_hsl(var(--shadow-dark))]",
        ].join(" "),
        warning: [
          "bg-warning text-warning-foreground",
          "shadow-[inset_1px_1px_2px_hsl(var(--warning-light)),inset_-1px_-1px_2px_hsl(var(--warning-dark)/0.5),-2px_-2px_4px_hsl(var(--shadow-light)),2px_2px_4px_hsl(var(--shadow-dark))]",
        ].join(" "),
        outline: [
          "bg-background text-foreground border border-border",
          "shadow-[-2px_-2px_4px_hsl(var(--shadow-light)),2px_2px_4px_hsl(var(--shadow-dark))]",
        ].join(" "),
        pressed: [
          "bg-background text-foreground",
          "shadow-[inset_-2px_-2px_4px_hsl(var(--shadow-light)),inset_2px_2px_4px_hsl(var(--shadow-dark))]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, className }))}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
