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
  { value: "newest", label: "Mais recentes" },
  { value: "price-asc", label: "Preço · ↑" },
  { value: "price-desc", label: "Preço · ↓" },
  { value: "popular", label: "Mais procurados" },
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
    <div className="sticky top-[68px] z-30 bg-bg/85 backdrop-blur-xl border-b border-line">
      <div className="container-edge py-4">
        <div className="flex flex-wrap items-center gap-3 md:gap-6">
          {/* Categories — horizontal scroll on mobile */}
          <div className="flex-1 -mx-4 px-4 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2">
              {categoryFilters.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  className={cn(
                    "shrink-0 h-9 px-4 font-mono text-[10px] uppercase tracking-[0.28em] transition-all duration-300",
                    "border",
                    category === c.value
                      ? "bg-blood-3 border-blood text-bone"
                      : "border-line-2 text-fg-muted hover:text-bone hover:border-line-3"
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-3 ml-auto">
            <span className="hidden md:inline-flex font-mono text-[10px] uppercase tracking-[0.28em] text-fg-muted">
              {String(total).padStart(2, "0")} {total === 1 ? "peça" : "peças"}
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-2 h-9 px-4 border border-line-2 font-mono text-[10px] uppercase tracking-[0.28em] text-fg-muted hover:text-bone hover:border-line-3 transition-colors outline-none">
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

            <div className="hidden md:inline-flex items-center border border-line-2">
              <button
                onClick={() => setDensity("compact")}
                aria-label="Grade densa"
                className={cn(
                  "h-9 w-9 inline-flex items-center justify-center transition-colors",
                  density === "compact" ? "bg-bone text-bg" : "text-fg-muted hover:text-bone"
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setDensity("spacious")}
                aria-label="Grade ampla"
                className={cn(
                  "h-9 w-9 inline-flex items-center justify-center transition-colors",
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
  );
}
