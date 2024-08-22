import { FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React from "react";

interface Prop {
  children: React.ReactNode
  className?: string
  required?: boolean
}

const SimpleLabel: React.FC<Prop> = ({ children, className, required }) => (
  <FormLabel className={cn("font-bold", className)}>
    {children} {required && <span className="text-destructive">*</span>}
  </FormLabel>
)

export default SimpleLabel