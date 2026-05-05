"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Seal } from "@/components/brand/seal";
import type { Drop } from "@/lib/types";
import { cn, formatDateBR } from "@/lib/utils";

type Props = {
  drop: Drop;
  index?: number;
  large?: boolean;
};

export function DropCard({ drop, index = 0, large = false }: Props) {
  const statusMap = {
    live: { label: "Ao vivo", variant: "live" as const },
    scheduled: { label: "Em breve", variant: "outline" as const },
    "sold-out": { label: "Esgotado", variant: "soldout" as const },
    archived: { label: "Arquivo", variant: "default" as const },
  };
  const status = statusMap[drop.status];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn("group", large && "md:col-span-2 lg:col-span-3")}
    >
      <Link href={`/drops/${drop.id}`} className="block">
        <div
          className={cn(
            "relative overflow-hidden bg-bg-2 border border-line",
            large ? "aspect-[16/9]" : "aspect-[4/5]"
          )}
        >
          <Image
            src={drop.cover}
            alt={drop.name}
            fill
            sizes={large ? "100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
          <div className="absolute inset-0 ring-1 ring-inset ring-line/0 group-hover:ring-blood/40 transition-all duration-500" />

          {/* Top row */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Seal variant="full" size={40} className="text-bone opacity-90" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone">
                  {drop.code}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone/60">
                  Ordem {drop.ordemNumero}
                </p>
              </div>
            </div>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>

          {/* Bottom name */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <p className={cn(
              "display text-bone leading-[0.95]",
              large ? "text-5xl md:text-7xl" : "text-3xl md:text-4xl"
            )}>
              {drop.name}
            </p>
            {large && (
              <p className="mt-3 italic text-fg-muted text-lg max-w-md">
                &ldquo;{drop.tagline}&rdquo;
              </p>
            )}
          </div>

          {/* Hover arrow */}
          <span
            aria-hidden
            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center bg-bg/85 border border-line-2 backdrop-blur-md text-bone opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        {/* Meta */}
        <div className="mt-4 grid grid-cols-3 gap-3 text-fg-muted">
          <Cell label="Lançamento" value={formatDateBR(drop.releaseAt)} />
          <Cell label="Peças" value={String(drop.productCount).padStart(2, "0")} />
          <Cell label="Unidades" value={String(drop.totalUnits ?? 0).padStart(3, "0")} />
        </div>
      </Link>
    </motion.article>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-line pt-3">
      <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-fg-muted">{label}</p>
      <p className="mt-1 font-mono text-sm text-bone tabular-nums">{value}</p>
    </div>
  );
}
