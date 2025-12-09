import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";
import { Label } from "./label";

const formFieldVariants = cva("space-y-2", {
  variants: {
    layout: {
      vertical: "flex flex-col",
      horizontal: "flex flex-row items-center gap-4",
    },
  },
  defaultVariants: {
    layout: "vertical",
  },
});

export interface FormFieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formFieldVariants> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    { className, layout, label, description, error, required, htmlFor, children, ...props },
    ref
  ) => (
    <div ref={ref} className={cn(formFieldVariants({ layout, className }))} {...props}>
      {label && (
        <Label
          htmlFor={htmlFor}
          variant={required ? "required" : "default"}
          className={layout === "horizontal" ? "min-w-[120px]" : ""}
        >
          {label}
        </Label>
      )}
      <div className="flex-1 space-y-1">
        {children}
        {description && !error && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    </div>
  )
);
FormField.displayName = "FormField";

// Form wrapper component
const formVariants = cva("", {
  variants: {
    variant: {
      default: "space-y-6",
      compact: "space-y-4",
      relaxed: "space-y-8",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface FormProps
  extends React.FormHTMLAttributes<HTMLFormElement>,
    VariantProps<typeof formVariants> {}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, variant, ...props }, ref) => (
    <form ref={ref} className={cn(formVariants({ variant, className }))} {...props} />
  )
);
Form.displayName = "Form";

// Form Section for grouping
const FormSection = React.forwardRef<
  HTMLFieldSetElement,
  React.FieldsetHTMLAttributes<HTMLFieldSetElement> & {
    title?: string;
    description?: string;
  }
>(({ className, title, description, children, ...props }, ref) => (
  <fieldset ref={ref} className={cn("space-y-4", className)} {...props}>
    {(title || description) && (
      <div className="space-y-1">
        {title && <legend className="text-base font-semibold">{title}</legend>}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    )}
    {children}
  </fieldset>
));
FormSection.displayName = "FormSection";

// Form Actions container
const FormActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    align?: "left" | "center" | "right" | "between";
  }
>(({ className, align = "right", children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex gap-3 pt-4",
      {
        "justify-start": align === "left",
        "justify-center": align === "center",
        "justify-end": align === "right",
        "justify-between": align === "between",
      },
      className
    )}
    {...props}
  >
    {children}
  </div>
));
FormActions.displayName = "FormActions";

export { Form, FormField, FormSection, FormActions, formVariants, formFieldVariants };
