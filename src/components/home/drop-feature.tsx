"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Seal } from "@/components/brand/seal";
import { Countdown } from "@/components/drop/countdown";
import { currentDrop } from "@/lib/mock/drops";

export function DropFeature() {
  const drop = currentDrop;

  return (
    <section className="relative bg-bg py-32 md:py-40 overflow-hidden">
      {/* Background giant kanji */}
      <p
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 seal text-[clamp(20rem,40vw,40rem)] leading-none text-blood/[0.04] select-none"
      >
        正
      </p>

      <div className="container-edge relative">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-6 md:grid-cols-[auto_1fr] md:items-end pb-12 md:pb-16 border-b border-line"
        >
          <div>
            <p className="label-tag mb-3">Capítulo Ativo</p>
            <h2 className="display text-5xl md:text-7xl leading-[0.95] text-bone">
              {drop.name}
            </h2>
          </div>
          <p className="md:max-w-md md:justify-self-end text-fg-muted leading-relaxed">
            {drop.story}
          </p>
        </motion.div>

        {/* Hero image + meta */}
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] mt-16">
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[5/6] lg:aspect-[4/5] overflow-hidden border border-line bg-bg-2 group"
          >
            <Image
              src={drop.cover}
              alt={drop.name}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />

            {/* Top-left meta */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <Seal variant="full" size={56} className="text-bone" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone">
                  {drop.code}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone/70">
                  {drop.productCount} peças · {drop.totalUnits} unidades
                </p>
              </div>
            </div>

            {/* Bottom-right tagline */}
            <p className="absolute bottom-6 left-6 right-6 display italic text-2xl md:text-3xl text-bone leading-tight">
              "{drop.tagline}"
            </p>

            <Link
              href={`/drops/${drop.id}`}
              className="absolute top-6 right-6 inline-flex h-10 w-10 items-center justify-center bg-bg/80 border border-line-2 text-bone hover:bg-blood-3 hover:border-blood transition-all"
              aria-label="Ver drop"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8"
          >
            {/* Countdown */}
            <div className="border border-line bg-bg-2/50 p-6 md:p-8">
              <p className="label-tag mb-4">Tempo restante até o lacre</p>
              <Countdown target={drop.endsAt ?? drop.releaseAt} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 border border-line p-6 md:p-8">
              <Stat label="Peças" value={String(drop.productCount).padStart(2, "0")} />
              <Stat label="Unidades" value={String(drop.totalUnits).padStart(3, "0")} />
              <Stat label="Ordem" value={drop.ordemNumero} />
            </div>

            {/* CTA */}
            <Link
              href={`/drops/${drop.id}`}
              className="btn-primary h-16 text-[12px]"
            >
              Entrar no {drop.code}
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg-subtle">
              Estoque limitado. Sem reposição. Sem perdão.
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="label-tag mb-1">{label}</p>
      <p className="font-mono text-2xl md:text-3xl text-bone tabular-nums">{value}</p>
    </div>
  );
}
