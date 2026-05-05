"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.32em] transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 overflow-hidden",
  {
    variants: {
      variant: {
        primary:
          "bg-blood-3 text-bone border border-blood-2 hover:bg-blood-2 hover:border-blood",
        secondary:
          "bg-bg-2 text-bone border border-line-2 hover:border-blood",
        ghost:
          "bg-transparent text-bone border border-line-2 hover:border-blood",
        outline:
          "bg-transparent text-fg border border-line-3 hover:text-bone hover:border-bone",
        link: "text-bone underline-offset-4 hover:underline",
        blood:
          "bg-blood text-bone border border-blood hover:bg-blood-2",
        bone:
          "bg-bone text-bg border border-bone hover:bg-fg-muted",
      },
      size: {
        sm: "h-9 px-4 text-[10px]",
        md: "h-12 px-6 text-[11px]",
        lg: "h-14 px-8 text-[12px]",
        xl: "h-16 px-10 text-[13px]",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  shimmer?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, shimmer = true, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), "group", className)}
        ref={ref}
        {...props}
      >
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
        {shimmer && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-full"
          />
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
