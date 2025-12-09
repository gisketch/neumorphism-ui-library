import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const separatorVariants = cva(
  [
    "shrink-0 rounded-full",
    "transition-all duration-200 ease-in-out",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-background",
          "shadow-[inset_-1px_-1px_2px_hsl(var(--shadow-light)),inset_1px_1px_2px_hsl(var(--shadow-dark))]",
        ].join(" "),
        flat: [
          "bg-border",
        ].join(" "),
      },
      orientation: {
        horizontal: "h-[2px] w-full",
        vertical: "h-full w-[2px]",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
    },
  }
);

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    { className, variant, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <div
      ref={ref}
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation ?? undefined}
      className={cn(separatorVariants({ variant, orientation, className }))}
      {...props}
    />
  )
);
Separator.displayName = "Separator";

export { Separator, separatorVariants };
