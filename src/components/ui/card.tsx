import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const cardVariants = cva(
  [
    "rounded-xl bg-card text-card-foreground",
    "transition-all duration-200 ease-in-out",
  ].join(" "),
  {
    variants: {
      variant: {
        flat: [
          "shadow-[-6px_-6px_12px_hsl(var(--shadow-light)),6px_6px_12px_hsl(var(--shadow-dark))]",
        ].join(" "),
        pressed: [
          "shadow-[inset_-6px_-6px_12px_hsl(var(--shadow-light)),inset_6px_6px_12px_hsl(var(--shadow-dark))]",
        ].join(" "),
        convex: [
          "shadow-[-6px_-6px_12px_hsl(var(--shadow-light)),6px_6px_12px_hsl(var(--shadow-dark))]",
          "bg-gradient-to-br from-[hsl(var(--shadow-light)/0.5)] to-[hsl(var(--shadow-dark)/0.1)]",
        ].join(" "),
        interactive: [
          "shadow-[-6px_-6px_12px_hsl(var(--shadow-light)),6px_6px_12px_hsl(var(--shadow-dark))]",
          "hover:shadow-[-4px_-4px_8px_hsl(var(--shadow-light)),4px_4px_8px_hsl(var(--shadow-dark))]",
          "active:shadow-[inset_-4px_-4px_8px_hsl(var(--shadow-light)),inset_4px_4px_8px_hsl(var(--shadow-dark))]",
          "cursor-pointer",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "flat",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
};
