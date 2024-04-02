"use client"
/**
 * @name Label
 * @description A label component
 * @param {string} className - The class name
 * @param {React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>} props - The props
 * @param {React.ElementRef<typeof LabelPrimitive.Root>} ref - The reference
 * @param {VariantProps<typeof labelVariants>} - The variant props
 * @param {JSX.Element} - React component
 * @returns {JSX.Element} - React component
 
*/
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
