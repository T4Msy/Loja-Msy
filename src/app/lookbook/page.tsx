"use client";

import { motion } from "framer-motion";
import { Seal } from "@/components/brand/seal";
import { site } from "@/lib/site";

const looks = [
  { image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1600&auto=format&fit=crop", title: "RONIN HOODIE — ONYX" },
  { image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1600&auto=format&fit=crop", title: "OBSIDIAN TEE — BLOOD SEAL" },
  { image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1600&auto=format&fit=crop", title: "ORDEM L/S — ONYX" },
  { image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1600&auto=format&fit=crop", title: "VOID CARGO PANTS" },
  { image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1600&auto=format&fit=crop", title: "KANJI CAP — BLOOD" },
  { image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop", title: "BLOOD RITUAL TEE" },
];

export default function LookbookPage() {
  return (
    <>
      <header className="container-edge pt-16 md:pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="label-tag mb-4">Visual · {site.kanji}</p>
          <h1 className="display text-5xl md:text-7xl lg:text-8xl text-bone leading-[0.95] tracking-tight">
            Lookbook
          </h1>
          <p className="mt-6 max-w-xl text-fg-muted">
            O silêncio veste melhor. Cada peça é um capítulo visual da Ordem.
          </p>
        </motion.div>
      </header>

      <section className="container-edge pb-32">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {looks.map((look, i) => (
            <motion.div
              key={look.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group relative aspect-[3/4] overflow-hidden bg-bg-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={look.image}
                alt={look.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 inset-x-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-blood mb-1">{site.shortName}</p>
                <p className="text-bone text-lg">{look.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-24 md:py-32 text-center">
        <Seal variant="full" size={80} className="mx-auto text-blood opacity-40" />
        <p className="mt-6 display text-2xl md:text-4xl text-bone italic">{site.tagline}</p>
      </section>
    </>
  );
}