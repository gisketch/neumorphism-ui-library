import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const radioGroupVariants = cva("flex gap-3", {
  variants: {
    orientation: {
      horizontal: "flex-row flex-wrap",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof radioGroupVariants> {
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
}

const RadioGroupContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
}>({});

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    { className, orientation, value, onValueChange, name, children, ...props },
    ref
  ) => (
    <RadioGroupContext.Provider value={{ value, onValueChange, name }}>
      <div
        ref={ref}
        role="radiogroup"
        className={cn(radioGroupVariants({ orientation, className }))}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
);
RadioGroup.displayName = "RadioGroup";

const radioVariants = cva(
  [
    "aspect-square h-5 w-5 rounded-full",
    "transition-all duration-200 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "cursor-pointer",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-background",
          "shadow-[inset_-3px_-3px_6px_hsl(var(--shadow-light)),inset_3px_3px_6px_hsl(var(--shadow-dark))]",
          "data-[state=checked]:shadow-[-3px_-3px_6px_hsl(var(--shadow-light)),3px_3px_6px_hsl(var(--shadow-dark))]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface RadioGroupItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof radioVariants> {
  value: string;
}

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, variant, value, ...props }, ref) => {
    const context = React.useContext(RadioGroupContext);
    const checked = context.value === value;

    const handleClick = () => {
      context.onValueChange?.(value);
    };

    return (
      <button
        type="button"
        role="radio"
        ref={ref}
        aria-checked={checked}
        data-state={checked ? "checked" : "unchecked"}
        onClick={handleClick}
        className={cn(radioVariants({ variant, className }))}
        {...props}
      >
        {checked && (
          <span className="flex items-center justify-center h-full w-full">
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full bg-primary",
                "shadow-[inset_1px_1px_2px_hsl(var(--primary-light)),inset_-1px_-1px_2px_hsl(var(--primary-dark)/0.5)]"
              )}
            />
          </span>
        )}
      </button>
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem, radioGroupVariants, radioVariants };
