import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const avatarVariants = cva(
  [
    "relative flex shrink-0 overflow-hidden rounded-full",
    "transition-all duration-200 ease-in-out",
  ].join(" "),
  {
    variants: {
      variant: {
        flat: [
          "shadow-[-4px_-4px_8px_hsl(var(--shadow-light)),4px_4px_8px_hsl(var(--shadow-dark))]",
        ].join(" "),
        pressed: [
          "shadow-[inset_-4px_-4px_8px_hsl(var(--shadow-light)),inset_4px_4px_8px_hsl(var(--shadow-dark))]",
        ].join(" "),
        ring: [
          "shadow-[-4px_-4px_8px_hsl(var(--shadow-light)),4px_4px_8px_hsl(var(--shadow-dark))]",
          "ring-2 ring-primary ring-offset-2 ring-offset-background",
        ].join(" "),
      },
      size: {
        default: "h-10 w-10",
        sm: "h-8 w-8",
        lg: "h-14 w-14",
        xl: "h-20 w-20",
      },
    },
    defaultVariants: {
      variant: "flat",
      size: "default",
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, variant, size, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(avatarVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center bg-muted text-sm font-medium",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback, avatarVariants };
