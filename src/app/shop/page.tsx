"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShopControls } from "@/components/shop/shop-controls";
import { ProductCard } from "@/components/product/product-card";
import { mockProducts } from "@/lib/mock/products";
import { cn } from "@/lib/utils";

export default function ShopPage() {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [density, setDensity] = useState<"compact" | "spacious">("spacious");

  const products = useMemo(() => {
    let list = [...mockProducts];
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (sort === "price-asc") list.sort((a, b) => a.priceCents - b.priceCents);
    if (sort === "price-desc") list.sort((a, b) => b.priceCents - a.priceCents);
    if (sort === "newest")
      list.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    return list;
  }, [category, sort]);

  return (
    <>
      {/* Page header */}
      <header className="container-edge pt-16 md:pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="label-tag mb-4">Catálogo · Coleção atual</p>
          <h1 className="display text-5xl md:text-7xl lg:text-8xl text-bone leading-[0.95] tracking-tight">
            Toda a coleção
          </h1>
          <p className="mt-6 max-w-xl text-fg-muted">
            Explore os capítulos vivos da Ordem. Cada peça vem numerada,
            lacrada, e acompanhada do selo individual. Sem reposições.
          </p>
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

      <section className="container-edge pt-12 pb-32">
        {products.length === 0 ? (
          <div className="py-32 text-center">
            <p className="display text-3xl text-bone">Nada encontrado.</p>
            <p className="mt-2 text-fg-muted text-sm">Tente outra categoria ou volte para o catálogo completo.</p>
          </div>
        ) : (
          <div
            className={cn(
              "grid gap-x-3 gap-y-12 md:gap-x-4 md:gap-y-16",
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
