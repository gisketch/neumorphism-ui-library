import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const switchVariants = cva(
  [
    "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
    "transition-all duration-200 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-background",
          "shadow-[inset_-3px_-3px_6px_hsl(var(--shadow-light)),inset_3px_3px_6px_hsl(var(--shadow-dark))]",
          "data-[state=checked]:bg-primary",
          "data-[state=checked]:shadow-[inset_-3px_-3px_6px_hsl(var(--primary)/0.8),inset_3px_3px_6px_hsl(var(--primary)/0.4)]",
        ].join(" "),
      },
      size: {
        default: "h-6 w-11",
        sm: "h-5 w-9",
        lg: "h-7 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const switchThumbVariants = cva(
  [
    "pointer-events-none block rounded-full bg-background",
    "transition-all duration-200 ease-in-out",
    "shadow-[-2px_-2px_4px_hsl(var(--shadow-light)),2px_2px_4px_hsl(var(--shadow-dark))]",
    "data-[state=checked]:shadow-[-1px_-1px_2px_rgba(255,255,255,0.3),1px_1px_2px_rgba(0,0,0,0.2)]",
  ].join(" "),
  {
    variants: {
      size: {
        default: "h-5 w-5 data-[state=checked]:translate-x-5",
        sm: "h-4 w-4 data-[state=checked]:translate-x-4",
        lg: "h-6 w-6 data-[state=checked]:translate-x-7",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof switchVariants> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    { className, variant, size, checked = false, onCheckedChange, ...props },
    ref
  ) => {
    const handleClick = () => {
      onCheckedChange?.(!checked);
    };

    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        data-state={checked ? "checked" : "unchecked"}
        onClick={handleClick}
        ref={ref}
        className={cn(switchVariants({ variant, size, className }))}
        {...props}
      >
        <span
          data-state={checked ? "checked" : "unchecked"}
          className={cn(switchThumbVariants({ size }))}
        />
      </button>
    );
  }
);
Switch.displayName = "Switch";

export { Switch, switchVariants };
