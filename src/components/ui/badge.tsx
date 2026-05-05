import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-mono text-[9px] uppercase tracking-[0.32em] px-2 py-1 border",
  {
    variants: {
      variant: {
        default: "border-line-2 text-fg-muted bg-bg-2/60",
        blood: "border-blood-3 bg-blood-4/40 text-bone",
        live: "border-blood bg-blood/15 text-bone",
        outline: "border-line-2 text-fg-muted",
        bone: "border-bone bg-bone text-bg",
        soldout: "border-fg-faint bg-bg text-fg-subtle",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
