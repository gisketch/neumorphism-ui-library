import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// Heading variants
const headingVariants = cva("font-bold tracking-tight text-foreground", {
  variants: {
    size: {
      h1: "text-4xl lg:text-5xl",
      h2: "text-3xl lg:text-4xl",
      h3: "text-2xl lg:text-3xl",
      h4: "text-xl lg:text-2xl",
      h5: "text-lg lg:text-xl",
      h6: "text-base lg:text-lg",
    },
  },
  defaultVariants: {
    size: "h1",
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, as, children, ...props }, ref) => {
    const Component = as || size || "h1";
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ size: size || as, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Heading.displayName = "Heading";

// Text/Paragraph variants
const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      default: "text-base",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      subtle: "text-sm text-muted-foreground/80",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "default",
    weight: "normal",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, weight, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(textVariants({ variant, weight, className }))}
      {...props}
    />
  )
);
Text.displayName = "Text";

// Code component
const codeVariants = cva(
  [
    "relative rounded-md px-[0.4rem] py-[0.2rem] font-mono text-sm",
    "transition-all duration-200",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-muted",
          "shadow-[inset_-2px_-2px_4px_hsl(var(--shadow-light)),inset_2px_2px_4px_hsl(var(--shadow-dark)/0.3)]",
        ].join(" "),
        flat: [
          "bg-muted",
          "shadow-[-2px_-2px_4px_hsl(var(--shadow-light)),2px_2px_4px_hsl(var(--shadow-dark))]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CodeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof codeVariants> {}

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, variant, ...props }, ref) => (
    <code
      ref={ref}
      className={cn(codeVariants({ variant, className }))}
      {...props}
    />
  )
);
Code.displayName = "Code";

// Blockquote component
const blockquoteVariants = cva(
  [
    "border-l-4 pl-4 py-2 italic text-muted-foreground",
    "transition-all duration-200",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-primary",
        muted: "border-muted-foreground/30",
        accent: "border-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BlockquoteProps
  extends React.HTMLAttributes<HTMLQuoteElement>,
    VariantProps<typeof blockquoteVariants> {}

const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, variant, ...props }, ref) => (
    <blockquote
      ref={ref}
      className={cn(blockquoteVariants({ variant, className }))}
      {...props}
    />
  )
);
Blockquote.displayName = "Blockquote";

// List component
const listVariants = cva("my-4 ml-6", {
  variants: {
    variant: {
      unordered: "list-disc [&>li]:mt-2",
      ordered: "list-decimal [&>li]:mt-2",
    },
  },
  defaultVariants: {
    variant: "unordered",
  },
});

export interface ListProps
  extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement>,
    VariantProps<typeof listVariants> {}

const List = React.forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  ({ className, variant, ...props }, ref) => {
    const Component = variant === "ordered" ? "ol" : "ul";
    return (
      <Component
        ref={ref as React.Ref<HTMLUListElement> & React.Ref<HTMLOListElement>}
        className={cn(listVariants({ variant, className }))}
        {...props}
      />
    );
  }
);
List.displayName = "List";

export {
  Heading,
  Text,
  Code,
  Blockquote,
  List,
  headingVariants,
  textVariants,
  codeVariants,
  blockquoteVariants,
  listVariants,
};
