"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { cn, formatBRL, padNumber } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type Props = {
  product: Product;
  index?: number;
  priority?: boolean;
  size?: "default" | "lg";
  showQuickAdd?: boolean;
};

export function ProductCard({
  product,
  index = 0,
  priority = false,
  size = "default",
  showQuickAdd = true,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
  const isSoldOut = product.status === "sold-out" || totalStock === 0;
  const isLowStock = !isSoldOut && totalStock <= 8;
  const hasDiscount = product.comparePriceCents && product.comparePriceCents > product.priceCents;
  const previewImage = hovered && !reduced ? product.imageHover ?? product.imageBack : product.imageFront;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.05, 0.4), ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn("group relative", size === "lg" && "lg:col-span-2")}
    >
      <Link
        href={`/produto/${product.slug}`}
        className="block focus:outline-none focus-visible:ring-1 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <div className={cn(
          "panel-premium surface-elev-2 relative aspect-[4/5] overflow-hidden rounded-[30px] border border-white/8",
          isSoldOut && "opacity-90"
        )}>
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ scale: hovered && !reduced ? 1.03 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={previewImage}
              alt={product.name}
              fill
              priority={priority}
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />

          <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
            {product.badges?.map((b) => (
              <BadgeTag key={b} type={b} />
            ))}
          </div>

          <p className="absolute right-4 top-4 z-10 rounded-full border border-white/8 bg-black/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-fg-muted backdrop-blur-md">
            Nº {padNumber(product.position ?? index + 1, 2)}
          </p>

          {isSoldOut && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-bg/72 backdrop-blur-sm">
              <div className="rounded-[22px] border border-white/10 bg-black/45 px-6 py-4 text-center">
                <p className="seal text-3xl text-blood">完売</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.4em] text-bone">Sold out</p>
              </div>
            </div>
          )}

          {!isSoldOut && showQuickAdd && (
            <motion.div
              initial={false}
              animate={{ opacity: hovered || reduced ? 1 : 0, y: hovered || reduced ? 0 : 12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-4 bottom-4 z-10"
            >
              <div className="glass-blood rounded-full px-4 py-3 text-bone shadow-blood">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.32em]">Ver produto</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            {product.drop && (
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-blood">
                {product.drop.code}
              </p>
            )}
            <h3 className="mt-2 text-sm uppercase tracking-[0.12em] text-bone transition-colors group-hover:text-blood md:text-[15px]">
              {product.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{product.subtitle}</p>
            {isLowStock && (
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.32em] text-blood">
                Últimas peças disponíveis
              </p>
            )}
          </div>
          <div className="shrink-0 text-right">
            <p className="font-mono text-base text-bone tabular-nums md:text-lg">
              {formatBRL(product.priceCents)}
            </p>
            {hasDiscount && (
              <p className="mt-1 font-mono text-[11px] text-fg-faint line-through tabular-nums">
                {formatBRL(product.comparePriceCents!)}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function BadgeTag({ type }: { type: NonNullable<Product["badges"]>[number] }) {
  const labels: Record<typeof type, { label: string; cls: string }> = {
    limited: { label: "Limited", cls: "bg-black/35 border border-white/10 text-bone" },
    new: { label: "Novo", cls: "bg-blood-3 border border-blood text-bone" },
    "last-units": { label: "Últimas", cls: "bg-black/35 border border-blood/50 text-blood" },
    exclusive: { label: "Exclusive", cls: "bg-bone text-bg border border-bone" },
    archive: { label: "Archive", cls: "bg-black/35 border border-white/10 text-fg-muted" },
  };
  const meta = labels[type];
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] backdrop-blur-md",
      meta.cls
    )}>
      {meta.label}
    </span>
  );
}
