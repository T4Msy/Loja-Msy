"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-12 w-full bg-transparent border-b border-line-2 px-0 py-2",
        "font-sans text-[15px] text-bone placeholder:text-fg-subtle",
        "transition-colors duration-300",
        "focus:outline-none focus:border-blood",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "autofill:!bg-transparent",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
