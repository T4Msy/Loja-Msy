"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: "cart", label: "Sacola" },
  { id: "shipping", label: "Endereço" },
  { id: "delivery", label: "Frete" },
  { id: "payment", label: "Pagamento" },
];

export function CheckoutStepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-3 md:gap-6">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s.id} className="flex items-center gap-3">
            <motion.div
              animate={{
                backgroundColor: done ? "var(--color-blood-3)" : active ? "var(--color-bg-2)" : "transparent",
                borderColor: done ? "var(--color-blood)" : active ? "var(--color-blood)" : "var(--color-line-2)",
              }}
              className={cn(
                "relative w-7 h-7 inline-flex items-center justify-center border font-mono text-[11px] tabular-nums",
                done ? "text-bone" : active ? "text-bone" : "text-fg-faint"
              )}
            >
              {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </motion.div>
            <span
              className={cn(
                "font-mono text-[10px] uppercase tracking-[0.32em]",
                done || active ? "text-bone" : "text-fg-faint"
              )}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <span
                className={cn(
                  "hidden md:block h-px w-12 transition-colors",
                  done ? "bg-blood" : "bg-line-2"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
