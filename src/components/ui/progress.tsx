import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const progressVariants = cva(
  [
    "relative h-3 w-full overflow-hidden rounded-full",
    "transition-all duration-200 ease-in-out",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-background",
          "shadow-[inset_-3px_-3px_6px_hsl(var(--shadow-light)),inset_3px_3px_6px_hsl(var(--shadow-dark))]",
        ].join(" "),
        flat: [
          "bg-muted",
          "shadow-[-3px_-3px_6px_hsl(var(--shadow-light)),3px_3px_6px_hsl(var(--shadow-dark))]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const progressIndicatorVariants = cva(
  [
    "h-full rounded-full transition-all duration-300 ease-in-out",
  ].join(" "),
  {
    variants: {
      indicatorVariant: {
        default: [
          "bg-primary",
          "shadow-[inset_1px_1px_2px_hsl(var(--primary-light)),inset_-1px_-1px_2px_hsl(var(--primary-dark)/0.5)]",
        ].join(" "),
        success: [
          "bg-success",
          "shadow-[inset_1px_1px_2px_hsl(var(--success-light)),inset_-1px_-1px_2px_hsl(var(--success-dark)/0.5)]",
        ].join(" "),
        warning: [
          "bg-warning",
          "shadow-[inset_1px_1px_2px_hsl(var(--warning-light)),inset_-1px_-1px_2px_hsl(var(--warning-dark)/0.5)]",
        ].join(" "),
        destructive: [
          "bg-destructive",
          "shadow-[inset_1px_1px_2px_hsl(var(--destructive-light)),inset_-1px_-1px_2px_hsl(var(--destructive-dark)/0.5)]",
        ].join(" "),
      },
    },
    defaultVariants: {
      indicatorVariant: "default",
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressIndicatorVariants> {
  value?: number;
  max?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      variant,
      indicatorVariant,
      value = 0,
      max = 100,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(progressVariants({ variant, className }))}
        {...props}
      >
        <div
          className={cn(progressIndicatorVariants({ indicatorVariant }))}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress, progressVariants, progressIndicatorVariants };
