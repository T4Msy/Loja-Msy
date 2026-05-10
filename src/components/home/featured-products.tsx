"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/product/product-grid";
import type { Product } from "@/lib/types";

type Props = { products: Product[] };

export function FeaturedProducts({ products }: Props) {
  return (
    <section className="bg-bg py-28 md:py-36">
      <div className="container-edge">
        <div className="grid gap-8 border-b border-line pb-10 md:grid-cols-[1fr_auto] md:items-end md:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <span className="section-kicker">Seleção da Ordem · {products.length} peças</span>
            <h2 className="display mt-5 text-4xl leading-[0.95] text-bone md:text-6xl">
              O capítulo começa
              <br />
              <span className="italic text-fg">pelas peças certas.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="max-w-md"
          >
            <p className="text-sm leading-relaxed text-fg-muted md:text-base">
              Curadoria pensada para entrada imediata: camisetas pesadas, silhuetas fortes e produtos com leitura instantânea de valor.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-bone hover:text-blood transition-colors"
            >
              Explorar catálogo completo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <div className="mt-12 md:mt-16">
          <ProductGrid products={products} columns={4} />
        </div>
      </div>
    </section>
  );
}
