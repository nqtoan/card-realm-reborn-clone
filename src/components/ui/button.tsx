import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 rounded-lg border-2 border-white cursor-pointer [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-neo-yellow text-neo-black hover:bg-[#E09D05] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.4)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] font-semibold",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.4)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] font-semibold",
        outline:
          "border-2 border-white bg-transparent text-neo-beige hover:bg-neo-beige hover:text-neo-black hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.4)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] font-semibold",
        secondary:
          "bg-neo-purple text-neo-black hover:bg-[#B89BC0] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.4)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] font-semibold",
        ghost: "hover:bg-neo-beige/20 hover:text-neo-beige font-medium border-2 border-transparent",
        link: "text-neo-yellow underline-offset-4 hover:underline hover:text-[#E09D05] font-medium",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
