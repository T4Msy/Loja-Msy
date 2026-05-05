"use client";

import { motion } from "framer-motion";
import type { Size, Variant } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  variants: Variant[];
  selected: string | null;
  onSelect: (variantId: string) => void;
};

const sizeOrder: Size[] = ["PP", "P", "M", "G", "GG", "XGG"];

export function SizeSelector({ variants, selected, onSelect }: Props) {
  const ordered = [...variants].sort(
    (a, b) => sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size)
  );

  return (
    <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
      {ordered.map((v) => {
        const isSelected = selected === v.id;
        const isOut = v.stock === 0;
        const isLow = !isOut && v.stock <= 3;
        return (
          <button
            key={v.id}
            onClick={() => !isOut && onSelect(v.id)}
            disabled={isOut}
            className={cn(
              "relative h-14 border font-mono text-[12px] uppercase tracking-[0.2em] transition-all duration-300",
              "flex flex-col items-center justify-center gap-0.5",
              isSelected && "bg-blood-3 border-blood text-bone",
              !isSelected && !isOut && "border-line-2 text-bone hover:border-blood",
              isOut && "border-line text-fg-faint cursor-not-allowed"
            )}
          >
            <span>{v.size}</span>
            {isOut && (
              <span className="font-mono text-[8px] uppercase tracking-[0.32em] text-fg-faint">
                ESGOT.
              </span>
            )}
            {isLow && !isSelected && (
              <span className="font-mono text-[8px] uppercase tracking-[0.32em] text-blood">
                {v.stock}
              </span>
            )}
            {isOut && (
              <span
                aria-hidden
                className="absolute inset-2 border-t border-line-3"
                style={{ transform: "rotate(-12deg)" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
