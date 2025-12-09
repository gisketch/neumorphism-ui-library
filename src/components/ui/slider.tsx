import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

const sliderTrackVariants = cva(
  [
    "relative h-2 w-full grow overflow-hidden rounded-full",
    "transition-all duration-200 ease-in-out",
    "bg-background",
    "shadow-[inset_-3px_-3px_6px_hsl(var(--shadow-light)),inset_3px_3px_6px_hsl(var(--shadow-dark))]",
  ].join(" ")
);

const sliderRangeVariants = cva(
  [
    "absolute h-full rounded-full",
    "bg-primary",
    "shadow-[-1px_-1px_2px_hsl(var(--primary)/0.8),1px_1px_2px_hsl(var(--primary)/0.4)]",
  ].join(" ")
);

const sliderThumbVariants = cva(
  [
    "block h-5 w-5 rounded-full bg-background",
    "transition-all duration-200 ease-in-out",
    "shadow-[-3px_-3px_6px_hsl(var(--shadow-light)),3px_3px_6px_hsl(var(--shadow-dark))]",
    "hover:shadow-[-2px_-2px_4px_hsl(var(--shadow-light)),2px_2px_4px_hsl(var(--shadow-dark))]",
    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-grab active:cursor-grabbing",
    "active:shadow-[inset_-2px_-2px_4px_hsl(var(--shadow-light)),inset_2px_2px_4px_hsl(var(--shadow-dark))]",
  ].join(" ")
);

export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      value = 0,
      min = 0,
      max = 100,
      step = 1,
      onValueChange,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const trackRef = React.useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = React.useState(false);

    const percentage = ((value - min) / (max - min)) * 100;

    const updateValue = React.useCallback(
      (clientX: number) => {
        if (!trackRef.current || disabled) return;

        const rect = trackRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const width = rect.width;
        const rawPercentage = Math.max(0, Math.min(1, x / width));
        const rawValue = min + rawPercentage * (max - min);
        const steppedValue = Math.round(rawValue / step) * step;
        const clampedValue = Math.max(min, Math.min(max, steppedValue));

        onValueChange?.(clampedValue);
      },
      [min, max, step, onValueChange, disabled]
    );

    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      setIsDragging(true);
      updateValue(e.clientX);
    };

    React.useEffect(() => {
      if (!isDragging) return;

      const handleMouseMove = (e: MouseEvent) => {
        updateValue(e.clientX);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isDragging, updateValue]);

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          disabled && "opacity-50",
          className
        )}
        {...props}
      >
        <div
          ref={trackRef}
          className={cn(sliderTrackVariants())}
          onMouseDown={handleMouseDown}
        >
          <div
            className={cn(sliderRangeVariants())}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          tabIndex={disabled ? -1 : 0}
          className={cn(sliderThumbVariants(), "absolute -translate-x-1/2")}
          style={{ left: `${percentage}%` }}
          onMouseDown={handleMouseDown}
        />
      </div>
    );
  }
);
Slider.displayName = "Slider";

export { Slider, sliderTrackVariants, sliderRangeVariants, sliderThumbVariants };
