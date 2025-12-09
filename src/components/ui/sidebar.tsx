import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const sidebarVariants = cva(
  [
    "flex flex-col h-full bg-background",
    "transition-all duration-300 ease-in-out",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "shadow-[4px_0_12px_hsl(var(--shadow-dark)/0.3)]",
        ].join(" "),
        flat: [
          "shadow-[-6px_-6px_12px_hsl(var(--shadow-light)),6px_6px_12px_hsl(var(--shadow-dark))]",
        ].join(" "),
        pressed: [
          "shadow-[inset_-4px_-4px_8px_hsl(var(--shadow-light)),inset_4px_4px_8px_hsl(var(--shadow-dark))]",
        ].join(" "),
      },
      size: {
        default: "w-64",
        sm: "w-20",
        lg: "w-80",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  collapsed?: boolean;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, variant, size, collapsed, ...props }, ref) => (
    <aside
      ref={ref}
      className={cn(
        sidebarVariants({ variant, size: collapsed ? "sm" : size, className })
      )}
      data-collapsed={collapsed}
      {...props}
    />
  )
);
Sidebar.displayName = "Sidebar";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center px-4 py-4 border-b border-border", className)}
    {...props}
  />
));
SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-y-auto px-3 py-4", className)}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-4 py-4 border-t border-border mt-auto", className)}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-4", className)} {...props} />
));
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
      className
    )}
    {...props}
  />
));
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const sidebarItemVariants = cva(
  [
    "flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap",
    "transition-all duration-200 ease-in-out cursor-pointer",
    "text-foreground/80",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "hover:bg-background hover:shadow-[-3px_-3px_6px_hsl(var(--shadow-light)),3px_3px_6px_hsl(var(--shadow-dark))]",
          "active:shadow-[inset_-3px_-3px_6px_hsl(var(--shadow-light)),inset_3px_3px_6px_hsl(var(--shadow-dark))]",
        ].join(" "),
        active: [
          "bg-primary text-primary-foreground font-semibold",
          "shadow-[-3px_-3px_6px_hsl(var(--shadow-light)),3px_3px_6px_hsl(var(--shadow-dark)),inset_2px_2px_4px_hsl(var(--primary-light)),inset_-2px_-2px_4px_hsl(var(--primary-dark)/0.5)]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SidebarItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarItemVariants> {
  active?: boolean;
  icon?: React.ReactNode;
}

const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(
  ({ className, variant, active, icon, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        sidebarItemVariants({ variant: active ? "active" : variant, className })
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </div>
  )
);
SidebarItem.displayName = "SidebarItem";

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
  sidebarVariants,
  sidebarItemVariants,
};
