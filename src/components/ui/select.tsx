import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "../../lib/utils";

const selectTriggerVariants = cva(
  [
    "flex h-10 w-full items-center justify-between rounded-lg px-4 py-2 text-sm",
    "bg-background",
    "transition-all duration-200 ease-in-out",
    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "cursor-pointer",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "shadow-[-4px_-4px_8px_hsl(var(--shadow-light)),4px_4px_8px_hsl(var(--shadow-dark))]",
          "hover:shadow-[-2px_-2px_6px_hsl(var(--shadow-light)),2px_2px_6px_hsl(var(--shadow-dark))]",
          "data-[state=open]:shadow-[inset_-4px_-4px_8px_hsl(var(--shadow-light)),inset_4px_4px_8px_hsl(var(--shadow-dark))]",
        ].join(" "),
        pressed: [
          "shadow-[inset_-4px_-4px_8px_hsl(var(--shadow-light)),inset_4px_4px_8px_hsl(var(--shadow-dark))]",
          "hover:shadow-[inset_-2px_-2px_6px_hsl(var(--shadow-light)),inset_2px_2px_6px_hsl(var(--shadow-dark))]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const selectContentVariants = cva(
  [
    "relative z-50 max-h-60 min-w-[8rem] overflow-hidden rounded-xl",
    "bg-background p-1",
    "transition-all duration-200 ease-in-out",
    "shadow-[-6px_-6px_12px_hsl(var(--shadow-light)),6px_6px_12px_hsl(var(--shadow-dark))]",
    "animate-in fade-in-0 zoom-in-95",
  ].join(" ")
);

const selectItemVariants = cva(
  [
    "relative flex w-full cursor-pointer select-none items-center rounded-lg py-2 px-3 text-sm outline-none",
    "transition-all duration-150 ease-in-out",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "hover:bg-muted",
          "hover:shadow-[inset_-2px_-2px_4px_hsl(var(--shadow-light)),inset_2px_2px_4px_hsl(var(--shadow-dark)/0.3)]",
          "focus:bg-muted",
          "data-[state=checked]:bg-primary/10 data-[state=checked]:text-primary data-[state=checked]:font-medium",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface SelectContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  value?: string;
  onValueChange?: (value: string) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within a Select");
  }
  return context;
};

export interface SelectProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
}

const Select: React.FC<SelectProps> = ({
  children,
  value: controlledValue,
  onValueChange,
  defaultValue,
}) => {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const value = controlledValue ?? internalValue;

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (onValueChange) {
        onValueChange(newValue);
      } else {
        setInternalValue(newValue);
      }
      setOpen(false);
    },
    [onValueChange]
  );

  // Close on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        value,
        onValueChange: handleValueChange,
        triggerRef: triggerRef as React.RefObject<HTMLButtonElement>,
      }}
    >
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
};
Select.displayName = "Select";

export interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof selectTriggerVariants> {
  placeholder?: string;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, variant, children, placeholder, ...props }, ref) => {
    const { open, setOpen, triggerRef } = useSelectContext();

    return (
      <button
        type="button"
        ref={(node) => {
          (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        onClick={() => setOpen(!open)}
        data-state={open ? "open" : "closed"}
        className={cn(selectTriggerVariants({ variant, className }))}
        {...props}
      >
        <span className="truncate">{children || placeholder}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 opacity-50 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

export interface SelectValueProps {
  placeholder?: string;
}

const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
  const { value } = useSelectContext();
  return <>{value || placeholder}</>;
};
SelectValue.displayName = "SelectValue";

export interface SelectContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open } = useSelectContext();

    if (!open) return null;

    return (
      <div
        ref={ref}
        className={cn(selectContentVariants(), "absolute top-full left-0 right-0 mt-2", className)}
        {...props}
      >
        <div className="overflow-y-auto max-h-60">{children}</div>
      </div>
    );
  }
);
SelectContent.displayName = "SelectContent";

export interface SelectItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof selectItemVariants> {
  value: string;
  disabled?: boolean;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, variant, children, value, disabled, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = useSelectContext();
    const isSelected = selectedValue === value;

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        data-state={isSelected ? "checked" : "unchecked"}
        data-disabled={disabled}
        onClick={() => !disabled && onValueChange?.(value)}
        className={cn(selectItemVariants({ variant, className }))}
        {...props}
      >
        {children}
        {isSelected && (
          <span className="absolute right-3">
            <svg
              className="h-4 w-4 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
        )}
      </div>
    );
  }
);
SelectItem.displayName = "SelectItem";

const SelectSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("my-1 h-px bg-border", className)}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";

const SelectLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("py-1.5 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider", className)}
    {...props}
  />
));
SelectLabel.displayName = "SelectLabel";

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectLabel,
  selectTriggerVariants,
  selectContentVariants,
  selectItemVariants,
};
