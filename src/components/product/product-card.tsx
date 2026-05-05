"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { cn, formatBRL, padNumber } from "@/lib/utils";
import { Eye, ShoppingBag } from "lucide-react";

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

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.05, 0.4), ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group relative",
        size === "lg" && "lg:col-span-2"
      )}
    >
      <Link
        href={`/produto/${product.slug}`}
        className="block focus:outline-none focus-visible:ring-1 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        {/* Image */}
        <div className={cn(
          "relative aspect-[4/5] overflow-hidden bg-bg-2 border border-line",
          isSoldOut && "opacity-90"
        )}>
          {/* Front */}
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: hovered && !reduced ? 0 : 1,
              scale: hovered && !reduced ? 1.02 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={product.imageFront}
              alt={product.name}
              fill
              priority={priority}
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          {/* Back / Hover image */}
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: hovered && !reduced ? 1 : 0,
              scale: hovered && !reduced ? 1 : 1.04,
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={product.imageHover ?? product.imageBack}
              alt={`${product.name} — verso`}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          {/* Top tags */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
            {product.badges?.map((b) => (
              <BadgeTag key={b} type={b} />
            ))}
          </div>

          {/* Position number */}
          <p className="absolute right-3 top-3 z-10 font-mono text-[10px] uppercase tracking-[0.32em] text-fg-muted">
            № {padNumber(product.position ?? index + 1, 2)}
          </p>

          {/* Sold out overlay */}
          {isSoldOut && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-bg/70 backdrop-blur-[1px]">
              <div className="flex flex-col items-center gap-2 border border-line-2 px-6 py-3 bg-bg/90">
                <p className="seal text-blood text-3xl">完売</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-bone">
                  Sold Out
                </p>
              </div>
            </div>
          )}

          {/* Hover scrim + quick add */}
          {!isSoldOut && showQuickAdd && (
            <motion.div
              initial={false}
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-3 bottom-3 z-10"
            >
              <div className="flex items-center gap-2">
                <span className="flex-1 inline-flex items-center justify-center gap-2 h-11 bg-bg/85 border border-line-2 backdrop-blur-md font-mono text-[10px] uppercase tracking-[0.32em] text-bone group-hover:bg-blood-3 group-hover:border-blood transition-colors">
                  <Eye className="h-3.5 w-3.5" />
                  Ver peça
                </span>
              </div>
            </motion.div>
          )}

          {/* Bottom hairline animation */}
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px bg-blood transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] origin-left scale-x-0 group-hover:scale-x-100"
          />
        </div>

        {/* Meta */}
        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            {product.drop && (
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-blood">
                {product.drop.code}
              </p>
            )}
            <h3 className="mt-1 text-[13px] uppercase tracking-wide text-bone group-hover:text-blood transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="mt-1 text-xs text-fg-muted line-clamp-1">{product.subtitle}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-mono text-sm text-bone tabular-nums">
              {formatBRL(product.priceCents)}
            </p>
            {hasDiscount && (
              <p className="font-mono text-[10px] text-fg-faint line-through tabular-nums">
                {formatBRL(product.comparePriceCents!)}
              </p>
            )}
            {isLowStock && (
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.32em] text-blood">
                Últimas peças
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
    limited: { label: "Limited", cls: "bg-bg/85 border border-line-2 text-bone" },
    new: { label: "New", cls: "bg-blood-3 border border-blood-2 text-bone" },
    "last-units": { label: "Últimas", cls: "bg-bg/85 border border-blood-2 text-blood" },
    exclusive: { label: "Exclusive", cls: "bg-bone text-bg border border-bone" },
    archive: { label: "Archive", cls: "bg-bg/85 border border-line-2 text-fg-muted" },
  };
  const meta = labels[type];
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-1 font-mono text-[9px] uppercase tracking-[0.32em] backdrop-blur-md",
      meta.cls
    )}>
      {meta.label}
    </span>
  );
}
