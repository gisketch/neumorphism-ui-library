import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const textareaVariants = cva(
  [
    "flex min-h-[100px] w-full rounded-lg bg-background px-4 py-3 text-sm",
    "transition-all duration-200 ease-in-out",
    "placeholder:text-muted-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "resize-none",
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
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
