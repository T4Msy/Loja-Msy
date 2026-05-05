"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Seal } from "@/components/brand/seal";
import { site } from "@/lib/site";
import { currentDrop } from "@/lib/mock/drops";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-bg"
      aria-label="Apresentação Masayoshi"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={currentDrop.cover}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/30 via-bg/55 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-transparent to-bg/70" />
      </motion.div>

      {/* Grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Massive kanji */}
      <motion.div
        style={{ opacity }}
        className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center"
        aria-hidden
      >
        <span className="seal text-[clamp(20rem,42vw,44rem)] leading-none text-blood/[0.07] select-none">
          正義
        </span>
      </motion.div>

      {/* Vertical lines */}
      <div aria-hidden className="absolute inset-y-0 left-8 w-px bg-line-2 z-[2] hidden md:block" />
      <div aria-hidden className="absolute inset-y-0 right-8 w-px bg-line-2 z-[2] hidden md:block" />

      {/* Top frame info */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 container-edge pt-12 md:pt-16 flex items-start justify-between gap-6"
      >
        <div className="flex items-center gap-3">
          <Seal variant="full" size={56} className="text-bone opacity-90" />
          <div>
            <p className="label-tag">Capítulo</p>
            <p className="font-mono text-sm text-bone">{currentDrop.code}</p>
          </div>
        </div>
        <div className="hidden md:block text-right">
          <p className="label-tag">Latitude</p>
          <p className="font-mono text-sm text-bone">23°33′S · 46°38′W</p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container-edge flex min-h-[calc(100svh-200px)] flex-col justify-end pb-24 md:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="label-tag text-blood"
        >
          Drop ao vivo · Numeração limitada
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="display mt-4 text-[clamp(3rem,11vw,12rem)] leading-[0.86] tracking-[-0.04em] text-bone"
        >
          A ordem
          <br />
          <span className="italic font-light text-fg">não pede</span>
          <br />
          <span className="text-blood">licença.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-10 grid gap-8 md:grid-cols-[1.2fr_auto] md:items-end"
        >
          <p className="max-w-xl text-pretty text-base md:text-lg text-fg-muted leading-relaxed">
            Drops limitados, costuras juradas. <span className="text-bone">{currentDrop.name}</span> está ao vivo —
            cada peça vem numerada, lacrada com selo da Ordem. Quem entende, não fala. Veste.
          </p>

          <div className="flex flex-col items-start gap-4 md:items-end">
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/drops/${currentDrop.id}`}
                className="btn-primary"
              >
                Entrar no drop <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/manifesto"
                className="btn-ghost"
              >
                Ler o manifesto
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 inset-x-0 z-10 container-edge flex items-end justify-between text-fg-muted"
      >
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping bg-blood opacity-75" />
            <span className="relative inline-flex h-2 w-2 bg-blood" />
          </span>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]">
            Ao vivo · {currentDrop.totalUnits} unidades
          </p>
        </div>
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          className="hidden md:inline-flex flex-col items-center gap-2 group"
          aria-label="Rolar para ver mais"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] group-hover:text-bone transition-colors">
            Descer
          </span>
          <ArrowDown className="h-4 w-4 group-hover:translate-y-1 group-hover:text-bone transition-all" />
        </button>
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-right">
          {site.kanji} · Ordem n° {site.ordemNumero}
        </p>
      </motion.div>
    </section>
  );
}
