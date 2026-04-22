import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const Accordion = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("space-y-4", className)}>{children}</div>
)

const AccordionItem = ({ children, className }: { children: React.ReactNode, className?: string, value?: string }) => {
  return (
    <div className={cn("border-b", className)}>
      {children}
    </div>
  )
}

const AccordionTrigger = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  // En la versión simplificada, el trigger es solo el encabezado
  return (
    <div className={cn("flex flex-1 items-center justify-between py-4 font-medium", className)}>
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </div>
  )
}

const AccordionContent = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("pb-4 pt-0 text-sm", className)}>
      {children}
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
