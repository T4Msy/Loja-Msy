"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShopControls } from "@/components/shop/shop-controls";
import { ProductCard } from "@/components/product/product-card";
import { mockProducts } from "@/lib/mock/products";
import { cn } from "@/lib/utils";

const popularityOrder = [
  "p-002",
  "p-001",
  "p-004",
  "p-006",
  "p-005",
  "p-007",
  "p-003",
  "p-008",
];

export default function ShopPage() {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [density, setDensity] = useState<"compact" | "spacious">("spacious");

  const products = useMemo(() => {
    let list = [...mockProducts];
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (sort === "price-asc") list.sort((a, b) => a.priceCents - b.priceCents);
    if (sort === "price-desc") list.sort((a, b) => b.priceCents - a.priceCents);
    if (sort === "newest") list.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    if (sort === "popular") {
      const rank = new Map(popularityOrder.map((id, index) => [id, index]));
      list.sort((a, b) => (rank.get(a.id) ?? 999) - (rank.get(b.id) ?? 999));
    }
    return list;
  }, [category, sort]);

  const activeCategoryLabel = {
    all: "Coleção completa",
    tee: "Camisetas",
    "long-sleeve": "Manga longa",
    hoodie: "Moletons",
    crewneck: "Crewneck",
    pants: "Calças",
    headwear: "Headwear",
    accessory: "Acessórios",
  }[category] ?? "Coleção completa";

  return (
    <>
      <header className="container-edge pt-16 pb-12 md:pt-24 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end"
        >
          <div>
            <span className="section-kicker">Loja MSY</span>
            <h1 className="display mt-5 text-5xl leading-[0.92] text-bone md:text-7xl lg:text-8xl">
              Símbolos para quem
              <br />
              <span className="italic text-fg">não veste o comum.</span>
            </h1>
          </div>
          <div className="panel-premium surface-elev-1 rounded-[28px] p-6 md:p-7 lg:justify-self-end lg:max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-blood">{activeCategoryLabel}</p>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted md:text-base">
              Explore uma coleção feita para entregar presença imediata: peso visual, acabamento premium e escassez real. Cada peça entra para ser lembrada, não só comprada.
            </p>
          </div>
        </motion.div>
      </header>

      <ShopControls
        total={products.length}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        density={density}
        setDensity={setDensity}
      />

      <section className="container-edge pt-10 pb-32 md:pt-12">
        {products.length === 0 ? (
          <div className="panel-premium rounded-[32px] py-24 text-center">
            <p className="display text-3xl text-bone">Nada encontrado.</p>
            <p className="mt-3 text-sm text-fg-muted">Mude a categoria e recupere a trilha da coleção.</p>
          </div>
        ) : (
          <div
            className={cn(
              "grid gap-x-4 gap-y-10 md:gap-x-5 md:gap-y-14",
              density === "compact"
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            )}
          >
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} priority={i < 4} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
