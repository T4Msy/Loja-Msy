"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/product/product-grid";
import type { Product } from "@/lib/types";

type Props = { products: Product[] };

export function FeaturedProducts({ products }: Props) {
  return (
    <section className="bg-bg py-32 md:py-40">
      <div className="container-edge">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between gap-6 pb-10 md:pb-14 border-b border-line"
        >
          <div>
            <p className="label-tag mb-3">Em destaque · {products.length} peças</p>
            <h2 className="display text-4xl md:text-6xl text-bone leading-[0.95]">
              Peças do capítulo
            </h2>
          </div>
          <Link
            href="/shop"
            className="group hidden md:inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-bone hover:text-blood transition-colors"
          >
            Ver tudo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="mt-12 md:mt-16">
          <ProductGrid products={products} columns={4} />
        </div>

        <div className="mt-12 md:mt-16 text-center md:hidden">
          <Link
            href="/shop"
            className="btn-ghost"
          >
            Ver tudo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
