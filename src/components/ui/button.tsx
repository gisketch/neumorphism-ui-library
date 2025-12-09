import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold",
    "ring-offset-background transition-all duration-200 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-background text-foreground",
          "shadow-[inset_2px_2px_4px_hsl(var(--shadow-light)),inset_-2px_-2px_4px_hsl(var(--shadow-dark)/0.5),-4px_-4px_8px_hsl(var(--shadow-light)),4px_4px_8px_hsl(var(--shadow-dark))]",
          "hover:shadow-[-2px_-2px_6px_hsl(var(--shadow-light)),2px_2px_6px_hsl(var(--shadow-dark))]",
          "active:shadow-[inset_-4px_-4px_8px_hsl(var(--shadow-light)),inset_4px_4px_8px_hsl(var(--shadow-dark))]",
        ].join(" "),
        primary: [
          "bg-primary text-primary-foreground",
          "shadow-[inset_2px_2px_4px_hsl(var(--primary-light)),inset_-2px_-2px_4px_hsl(var(--primary-dark)/0.5),-4px_-4px_8px_hsl(var(--shadow-light)),4px_4px_8px_hsl(var(--shadow-dark))]",
          "hover:shadow-[inset_1px_1px_2px_hsl(var(--primary-light)),inset_-1px_-1px_2px_hsl(var(--primary-dark)/0.5),-2px_-2px_6px_hsl(var(--shadow-light)),2px_2px_6px_hsl(var(--shadow-dark))]",
          "active:shadow-[inset_-3px_-3px_6px_hsl(var(--primary-light)/0.5),inset_3px_3px_6px_hsl(var(--primary-dark))]",
        ].join(" "),
        secondary: [
          "bg-secondary text-secondary-foreground",
          "shadow-[inset_2px_2px_4px_hsl(var(--shadow-light)),inset_-2px_-2px_4px_hsl(var(--shadow-dark)/0.3),-4px_-4px_8px_hsl(var(--shadow-light)),4px_4px_8px_hsl(var(--shadow-dark))]",
          "hover:shadow-[inset_1px_1px_2px_hsl(var(--shadow-light)),inset_-1px_-1px_2px_hsl(var(--shadow-dark)/0.3),-2px_-2px_6px_hsl(var(--shadow-light)),2px_2px_6px_hsl(var(--shadow-dark))]",
          "active:shadow-[inset_-4px_-4px_8px_hsl(var(--shadow-light)),inset_4px_4px_8px_hsl(var(--shadow-dark))]",
        ].join(" "),
        destructive: [
          "bg-destructive text-destructive-foreground",
          "shadow-[inset_2px_2px_4px_hsl(var(--destructive-light)),inset_-2px_-2px_4px_hsl(var(--destructive-dark)/0.5),-4px_-4px_8px_hsl(var(--shadow-light)),4px_4px_8px_hsl(var(--shadow-dark))]",
          "hover:shadow-[inset_1px_1px_2px_hsl(var(--destructive-light)),inset_-1px_-1px_2px_hsl(var(--destructive-dark)/0.5),-2px_-2px_6px_hsl(var(--shadow-light)),2px_2px_6px_hsl(var(--shadow-dark))]",
          "active:shadow-[inset_-3px_-3px_6px_hsl(var(--destructive-light)/0.5),inset_3px_3px_6px_hsl(var(--destructive-dark))]",
        ].join(" "),
        success: [
          "bg-success text-success-foreground",
          "shadow-[inset_2px_2px_4px_hsl(var(--success-light)),inset_-2px_-2px_4px_hsl(var(--success-dark)/0.5),-4px_-4px_8px_hsl(var(--shadow-light)),4px_4px_8px_hsl(var(--shadow-dark))]",
          "hover:shadow-[inset_1px_1px_2px_hsl(var(--success-light)),inset_-1px_-1px_2px_hsl(var(--success-dark)/0.5),-2px_-2px_6px_hsl(var(--shadow-light)),2px_2px_6px_hsl(var(--shadow-dark))]",
          "active:shadow-[inset_-3px_-3px_6px_hsl(var(--success-light)/0.5),inset_3px_3px_6px_hsl(var(--success-dark))]",
        ].join(" "),
        warning: [
          "bg-warning text-warning-foreground",
          "shadow-[inset_2px_2px_4px_hsl(var(--warning-light)),inset_-2px_-2px_4px_hsl(var(--warning-dark)/0.5),-4px_-4px_8px_hsl(var(--shadow-light)),4px_4px_8px_hsl(var(--shadow-dark))]",
          "hover:shadow-[inset_1px_1px_2px_hsl(var(--warning-light)),inset_-1px_-1px_2px_hsl(var(--warning-dark)/0.5),-2px_-2px_6px_hsl(var(--shadow-light)),2px_2px_6px_hsl(var(--shadow-dark))]",
          "active:shadow-[inset_-3px_-3px_6px_hsl(var(--warning-light)/0.5),inset_3px_3px_6px_hsl(var(--warning-dark))]",
        ].join(" "),
        outline: [
          "bg-background border border-border text-foreground",
          "shadow-[-4px_-4px_8px_hsl(var(--shadow-light)),4px_4px_8px_hsl(var(--shadow-dark))]",
          "hover:shadow-[-2px_-2px_6px_hsl(var(--shadow-light)),2px_2px_6px_hsl(var(--shadow-dark))]",
          "active:shadow-[inset_-4px_-4px_8px_hsl(var(--shadow-light)),inset_4px_4px_8px_hsl(var(--shadow-dark))]",
        ].join(" "),
        ghost: [
          "bg-transparent text-foreground",
          "hover:bg-muted",
          "hover:shadow-[-2px_-2px_6px_hsl(var(--shadow-light)),2px_2px_6px_hsl(var(--shadow-dark))]",
          "active:shadow-[inset_-4px_-4px_8px_hsl(var(--shadow-light)),inset_4px_4px_8px_hsl(var(--shadow-dark))]",
        ].join(" "),
        link: "bg-transparent text-primary underline-offset-4 hover:underline shadow-none",
        flat: [
          "bg-background text-foreground",
          "shadow-[-4px_-4px_8px_hsl(var(--shadow-light)),4px_4px_8px_hsl(var(--shadow-dark))]",
          "hover:shadow-[-2px_-2px_6px_hsl(var(--shadow-light)),2px_2px_6px_hsl(var(--shadow-dark))]",
          "active:shadow-[inset_-4px_-4px_8px_hsl(var(--shadow-light)),inset_4px_4px_8px_hsl(var(--shadow-dark))]",
        ].join(" "),
        pressed: [
          "bg-background text-foreground",
          "shadow-[inset_-4px_-4px_8px_hsl(var(--shadow-light)),inset_4px_4px_8px_hsl(var(--shadow-dark))]",
          "hover:shadow-[inset_-2px_-2px_6px_hsl(var(--shadow-light)),inset_2px_2px_6px_hsl(var(--shadow-dark))]",
          "active:shadow-[-4px_-4px_8px_hsl(var(--shadow-light)),4px_4px_8px_hsl(var(--shadow-dark))]",
        ].join(" "),
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-md px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
