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
    <section className="relative overflow-hidden bg-bg py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(185,28,28,0.14),transparent_20%)]" />
      <p
        aria-hidden
        className="pointer-events-none absolute right-[-4rem] top-1/2 -translate-y-1/2 seal text-[clamp(18rem,34vw,34rem)] leading-none text-blood/[0.05] select-none"
      >
        正
      </p>

      <div className="container-edge relative">
        <div className="grid gap-8 border-b border-line pb-10 md:grid-cols-[1fr_auto] md:items-end md:pb-14">
          <div>
            <span className="section-kicker">Capítulo em evidência</span>
            <h2 className="display mt-5 text-4xl leading-[0.95] text-bone md:text-6xl">
              {drop.name}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-fg-muted md:text-base">
              Uma cápsula criada para quem sabe que exclusividade não se explica. Se veste. Tiragem curta, acabamento pesado e linguagem feita para ser reconhecida por poucos.
            </p>
          </div>
          <Link href={`/drops/${drop.id}`} className="btn-ghost md:self-end">
            Ver capítulo completo
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="panel-strong surface-elev-3 rounded-[32px] overflow-hidden"
          >
            <div className="relative aspect-[5/6] lg:aspect-[5/4]">
              <Image
                src={drop.cover}
                alt={drop.name}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/18 to-transparent" />
              <div className="absolute left-6 top-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/35 px-4 py-2 backdrop-blur-md">
                <Seal variant="full" size={42} className="text-bone" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone">{drop.code}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-fg-muted">capítulo ao vivo</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="display max-w-2xl text-2xl italic leading-tight text-bone md:text-4xl">
                  “{drop.tagline}”
                </p>
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5"
          >
            <div className="panel-premium surface-elev-2 rounded-[28px] p-6 md:p-7">
              <p className="label-tag mb-4">Contagem até o lacre</p>
              <Countdown target={drop.endsAt ?? drop.releaseAt} />
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <Stat label="Peças" value={String(drop.productCount).padStart(2, "0")} />
              <Stat label="Unidades" value={String(drop.totalUnits).padStart(3, "0")} />
              <Stat label="Ordem" value={drop.ordemNumero} />
            </div>

            <div className="panel-premium surface-elev-1 rounded-[28px] p-6 md:p-7">
              <p className="text-sm leading-relaxed text-fg-muted">
                Esta coleção existe para marcar presença rápida: entrar, escolher e sair antes do ruído. Sem reposição, sem diluição, sem excesso.
              </p>
              <Link href={`/drops/${drop.id}`} className="btn-primary mt-6 w-full">
                Entrar no {drop.code}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="panel-premium surface-elev-1 rounded-[24px] p-5">
      <p className="label-tag mb-2">{label}</p>
      <p className="font-mono text-2xl tabular-nums text-bone md:text-3xl">{value}</p>
    </div>
  );
}
