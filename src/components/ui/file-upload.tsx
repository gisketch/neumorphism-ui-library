import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const fileUploadVariants = cva(
  [
    "relative flex flex-col items-center justify-center w-full rounded-xl",
    "border-2 border-dashed border-muted-foreground/30",
    "transition-all duration-200 ease-in-out cursor-pointer",
    "bg-background",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "shadow-[inset_-4px_-4px_8px_hsl(var(--shadow-light)),inset_4px_4px_8px_hsl(var(--shadow-dark))]",
          "hover:border-primary/50 hover:shadow-[inset_-6px_-6px_12px_hsl(var(--shadow-light)),inset_6px_6px_12px_hsl(var(--shadow-dark))]",
        ].join(" "),
        flat: [
          "shadow-[-4px_-4px_8px_hsl(var(--shadow-light)),4px_4px_8px_hsl(var(--shadow-dark))]",
          "hover:border-primary/50 hover:shadow-[-6px_-6px_12px_hsl(var(--shadow-light)),6px_6px_12px_hsl(var(--shadow-dark))]",
        ].join(" "),
      },
      size: {
        default: "min-h-[160px] p-6",
        sm: "min-h-[120px] p-4",
        lg: "min-h-[200px] p-8",
      },
      isDragActive: {
        true: "border-primary bg-primary/5",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      isDragActive: false,
    },
  }
);

export interface FileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof fileUploadVariants> {
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  maxSize?: number; // in bytes
  onFilesSelected?: (files: File[]) => void;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      variant,
      size,
      accept,
      multiple = false,
      disabled = false,
      maxSize,
      onFilesSelected,
      icon,
      title = "Drop files here or click to upload",
      description = "Supports all file types",
      ...props
    },
    ref
  ) => {
    const [isDragActive, setIsDragActive] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleDragEnter = React.useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
          setIsDragActive(true);
        }
      },
      [disabled]
    );

    const handleDragLeave = React.useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
    }, []);

    const handleDragOver = React.useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const validateFiles = React.useCallback(
      (files: File[]): File[] => {
        setError(null);
        
        if (maxSize) {
          const oversizedFiles = files.filter((file) => file.size > maxSize);
          if (oversizedFiles.length > 0) {
            const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
            setError(`File size must be less than ${maxSizeMB}MB`);
            return files.filter((file) => file.size <= maxSize);
          }
        }

        return files;
      },
      [maxSize]
    );

    const handleDrop = React.useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        if (disabled) return;

        const droppedFiles = Array.from(e.dataTransfer.files);
        const validFiles = validateFiles(droppedFiles);

        if (validFiles.length > 0) {
          onFilesSelected?.(multiple ? validFiles : [validFiles[0]]);
        }
      },
      [disabled, multiple, onFilesSelected, validateFiles]
    );

    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        const validFiles = validateFiles(selectedFiles);

        if (validFiles.length > 0) {
          onFilesSelected?.(validFiles);
        }

        // Reset input value to allow selecting the same file again
        e.target.value = "";
      },
      [onFilesSelected, validateFiles]
    );

    const handleClick = React.useCallback(() => {
      if (!disabled) {
        inputRef.current?.click();
      }
    }, [disabled]);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if ((e.key === "Enter" || e.key === " ") && !disabled) {
          e.preventDefault();
          inputRef.current?.click();
        }
      },
      [disabled]
    );

    return (
      <div
        ref={ref}
        className={cn(
          fileUploadVariants({ variant, size, isDragActive, className }),
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-label={title}
        aria-disabled={disabled}
        {...props}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
          className="sr-only"
          tabIndex={-1}
        />

        {/* Icon */}
        <div
          className={cn(
            "mb-3 p-3 rounded-xl",
            "shadow-[-3px_-3px_6px_hsl(var(--shadow-light)),3px_3px_6px_hsl(var(--shadow-dark))]",
            isDragActive && "shadow-[inset_-3px_-3px_6px_hsl(var(--shadow-light)),inset_3px_3px_6px_hsl(var(--shadow-dark))]"
          )}
        >
          {icon || (
            <svg
              className={cn(
                "w-8 h-8 text-muted-foreground",
                isDragActive && "text-primary"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          )}
        </div>

        {/* Title */}
        <p
          className={cn(
            "text-sm font-medium text-foreground",
            isDragActive && "text-primary"
          )}
        >
          {isDragActive ? "Drop files here" : title}
        </p>

        {/* Description */}
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>

        {/* Error Message */}
        {error && (
          <p className="mt-2 text-xs text-destructive font-medium">{error}</p>
        )}
      </div>
    );
  }
);
FileUpload.displayName = "FileUpload";

// File Preview Component
const filePreviewVariants = cva(
  [
    "flex items-center gap-3 p-3 rounded-lg",
    "transition-all duration-200",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-background",
          "shadow-[-3px_-3px_6px_hsl(var(--shadow-light)),3px_3px_6px_hsl(var(--shadow-dark))]",
        ].join(" "),
        pressed: [
          "bg-background",
          "shadow-[inset_-2px_-2px_4px_hsl(var(--shadow-light)),inset_2px_2px_4px_hsl(var(--shadow-dark))]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface FilePreviewProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof filePreviewVariants> {
  file: File;
  onRemove?: () => void;
  showSize?: boolean;
}

const FilePreview = React.forwardRef<HTMLDivElement, FilePreviewProps>(
  ({ className, variant, file, onRemove, showSize = true, ...props }, ref) => {
    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    };

    const getFileIcon = (type: string) => {
      if (type.startsWith("image/")) {
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      }
      if (type.startsWith("video/")) {
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      }
      if (type === "application/pdf") {
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      }
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(filePreviewVariants({ variant, className }))}
        {...props}
      >
        {/* File Icon */}
        <div className="flex-shrink-0 p-2 rounded-lg bg-muted/50 text-muted-foreground">
          {getFileIcon(file.type)}
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{file.name}</p>
          {showSize && (
            <p className="text-xs text-muted-foreground">
              {formatFileSize(file.size)}
            </p>
          )}
        </div>

        {/* Remove Button */}
        {onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className={cn(
              "flex-shrink-0 p-1.5 rounded-lg text-muted-foreground",
              "hover:text-destructive transition-colors",
              "shadow-[-2px_-2px_4px_hsl(var(--shadow-light)),2px_2px_4px_hsl(var(--shadow-dark))]",
              "hover:shadow-[inset_-2px_-2px_4px_hsl(var(--shadow-light)),inset_2px_2px_4px_hsl(var(--shadow-dark))]"
            )}
            aria-label={`Remove ${file.name}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);
FilePreview.displayName = "FilePreview";

export { FileUpload, FilePreview, fileUploadVariants, filePreviewVariants };
