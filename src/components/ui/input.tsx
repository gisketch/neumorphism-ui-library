import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const inputVariants = cva(
  [
    "flex w-full rounded-lg bg-background px-4 py-2 text-sm",
    "transition-all duration-200 ease-in-out",
    "placeholder:text-muted-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "shadow-[inset_-4px_-4px_8px_hsl(var(--shadow-light)),inset_4px_4px_8px_hsl(var(--shadow-dark))]",
          "focus:shadow-[inset_-2px_-2px_4px_hsl(var(--shadow-light)),inset_2px_2px_4px_hsl(var(--shadow-dark)),0_0_0_2px_hsl(var(--ring))]",
        ].join(" "),
        flat: [
          "shadow-[-4px_-4px_8px_hsl(var(--shadow-light)),4px_4px_8px_hsl(var(--shadow-dark))]",
          "focus:shadow-[-2px_-2px_4px_hsl(var(--shadow-light)),2px_2px_4px_hsl(var(--shadow-dark)),0_0_0_2px_hsl(var(--ring))]",
        ].join(" "),
        minimal: [
          "shadow-[inset_-2px_-2px_4px_hsl(var(--shadow-light)),inset_2px_2px_4px_hsl(var(--shadow-dark))]",
          "focus:shadow-[inset_-1px_-1px_2px_hsl(var(--shadow-light)),inset_1px_1px_2px_hsl(var(--shadow-dark)),0_0_0_2px_hsl(var(--ring))]",
        ].join(" "),
      },
      inputSize: {
        default: "h-10",
        sm: "h-8 text-xs px-3",
        lg: "h-12 text-base px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
