import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const fieldVariants = cva(
  "flex flex-col gap-2",
  {
    variants: {
      orientation: {
        default: "flex-col",
        horizontal: "flex-row items-center gap-4",
      },
    },
    defaultVariants: {
      orientation: "default",
    },
  }
)

interface FieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fieldVariants> {
  asChild?: boolean
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, orientation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        className={cn(fieldVariants({ orientation, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Field.displayName = "Field"

const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
})
FieldLabel.displayName = "FieldLabel"

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FieldDescription.displayName = "FieldDescription"

interface FieldErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  errors?: Array<{ message?: string }>
}

const FieldError = React.forwardRef<HTMLDivElement, FieldErrorProps>(
  ({ className, errors, ...props }, ref) => {
    if (!errors?.length) return null
    return (
      <div
        ref={ref}
        className={cn("text-sm font-medium text-destructive", className)}
        {...props}
      >
        {errors.map((error, i) => (
          <span key={i}>{error.message}</span>
        ))}
      </div>
    )
  }
)
FieldError.displayName = "FieldError"

const FieldGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex flex-col gap-6", className)} {...props} />
  )
})
FieldGroup.displayName = "FieldGroup"

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  fieldVariants,
}
