"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { currentDrop } from "@/lib/mock/drops";
import { featuredProducts } from "@/lib/mock/products";

const shots = featuredProducts.slice(0, 3).map((product, index) => ({
  src: product.imageGallery?.[0] ?? product.imageFront,
  label: ["Editorial privado", "Silhueta em movimento", "Detalhe de construção"][index] ?? "Frame MSY",
  name: product.name,
}));

export function LookbookTeaser() {
  return (
    <section className="bg-bg py-24 md:py-32">
      <div className="container-edge">
        <div className="grid gap-8 border-b border-line pb-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <span className="section-kicker">Editorial da coleção</span>
            <h2 className="display mt-5 text-4xl leading-[0.95] text-bone md:text-6xl">
              Produto visto como símbolo.
            </h2>
          </div>
          <div className="lg:justify-self-end lg:text-right">
            <p className="max-w-xl text-sm leading-relaxed text-fg-muted md:text-base">
              O editorial da MSY não existe para preencher espaço. Ele existe para ampliar desejo, textura, postura e leitura de presença da coleção atual.
            </p>
            <Link
              href={`/drops/${currentDrop.id}`}
              className="mt-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-bone hover:text-blood transition-colors"
            >
              Ver capítulo
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
          {shots.map((shot, index) => (
            <motion.figure
              key={shot.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`panel-premium group rounded-[28px] overflow-hidden ${index === 0 ? "lg:row-span-2 min-h-[460px]" : "min-h-[220px]"}`}
            >
              <div className="relative h-full min-h-[220px]">
                <Image
                  src={shot.src}
                  alt={shot.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-blood">{shot.label}</p>
                  <p className="mt-3 text-lg text-bone md:text-xl">{shot.name}</p>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
