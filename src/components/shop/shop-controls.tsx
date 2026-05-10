"use client";

import { LayoutGrid, Rows3, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const sortOptions = [
  { value: "newest", label: "Lançamentos" },
  { value: "price-asc", label: "Preço · ↑" },
  { value: "price-desc", label: "Preço · ↓" },
  { value: "popular", label: "Mais desejados" },
];

const categoryFilters = [
  { value: "all", label: "Tudo" },
  { value: "tee", label: "Camisetas" },
  { value: "long-sleeve", label: "Manga longa" },
  { value: "hoodie", label: "Moletons" },
  { value: "crewneck", label: "Crewneck" },
  { value: "pants", label: "Calças" },
  { value: "headwear", label: "Headwear" },
  { value: "accessory", label: "Acessórios" },
];

type Props = {
  total: number;
  category: string;
  setCategory: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
  density: "compact" | "spacious";
  setDensity: (v: "compact" | "spacious") => void;
};

export function ShopControls({
  total,
  category,
  setCategory,
  sort,
  setSort,
  density,
  setDensity,
}: Props) {
  return (
    <div className="sticky top-[68px] z-30 border-b border-white/8 bg-bg/75 backdrop-blur-2xl">
      <div className="container-edge py-4">
        <div className="panel-premium rounded-[28px] px-4 py-4 md:px-5">
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <div className="flex-1 -mx-2 overflow-x-auto px-2 scrollbar-hide">
              <div className="flex items-center gap-2">
                {categoryFilters.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setCategory(c.value)}
                    className={cn(
                      "shrink-0 rounded-full px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.28em] transition-all duration-300",
                      "border",
                      category === c.value
                        ? "bg-blood-3 border-blood text-bone shadow-[0_16px_48px_-28px_rgba(185,28,28,0.8)]"
                        : "border-white/8 bg-white/[0.03] text-fg-muted hover:text-bone hover:border-white/16"
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <span className="hidden rounded-full border border-white/8 bg-white/[0.03] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.28em] text-fg-muted md:inline-flex">
                {String(total).padStart(2, "0")} {total === 1 ? "peça" : "peças"}
              </span>

              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex h-10 items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-4 font-mono text-[10px] uppercase tracking-[0.28em] text-fg-muted transition-colors hover:border-white/16 hover:text-bone outline-none">
                  {sortOptions.find((s) => s.value === sort)?.label}
                  <ChevronDown className="h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[12rem]">
                  {sortOptions.map((s) => (
                    <DropdownMenuItem key={s.value} onClick={() => setSort(s.value)}>
                      {s.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="inline-flex items-center overflow-hidden rounded-full border border-white/8 bg-white/[0.03]">
                <button
                  onClick={() => setDensity("compact")}
                  aria-label="Grade densa"
                  className={cn(
                    "inline-flex h-10 w-10 items-center justify-center transition-colors",
                    density === "compact" ? "bg-bone text-bg" : "text-fg-muted hover:text-bone"
                  )}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setDensity("spacious")}
                  aria-label="Grade ampla"
                  className={cn(
                    "inline-flex h-10 w-10 items-center justify-center transition-colors",
                    density === "spacious" ? "bg-bone text-bg" : "text-fg-muted hover:text-bone"
                  )}
                >
                  <Rows3 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
