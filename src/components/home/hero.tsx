"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Seal } from "@/components/brand/seal";
import { currentDrop } from "@/lib/mock/drops";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-bg"
      aria-label="Masayoshi hero"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={currentDrop.cover}
          alt="Coleção Masayoshi"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(185,28,28,0.22),transparent_24%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-bg/55 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/35 to-bg/85" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <span className="seal text-[clamp(18rem,38vw,42rem)] leading-none text-blood/[0.08] select-none">
          正義
        </span>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.03),transparent)] [background-size:32rem_100%] opacity-40" />

      <div className="relative z-10 container-edge flex min-h-[100svh] flex-col justify-between py-8 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <div className="glass-1 surface-elev-1 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.32em] text-fg-muted">
            Drop ao vivo · {currentDrop.code}
          </div>
          <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/4 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-fg-muted md:inline-flex">
            <Sparkles className="h-3.5 w-3.5 text-blood" />
            peças numeradas · sem reposição
          </div>
        </motion.div>

        <div className="grid gap-12 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/4 px-4 py-2"
            >
              <Seal variant="mark" size={18} className="text-blood" />
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg-muted">
                Coleção limitada para quem carrega a MSY no peito
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="display mt-8 max-w-5xl text-[clamp(3.6rem,10vw,9rem)] leading-[0.84] tracking-[-0.05em] text-bone"
            >
              Vista o símbolo.
              <br />
              <span className="italic text-fg">Carregue a ordem.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="mt-8 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg"
            >
              A Masayoshi transforma camiseta em identidade, presença e ascensão. Peças pesadas, numeradas e lançadas em capítulos curtos para quem prefere ser reconhecido sem pedir espaço.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.75 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <Link href="/shop" className="btn-primary min-w-[220px]">
                Comprar coleção
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={`/drops/${currentDrop.id}`} className="btn-ghost min-w-[220px]">
                Entrar no {currentDrop.code}
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="panel-strong surface-elev-3 gradient-stroke rounded-[32px] p-6 md:p-8"
          >
            <p className="section-kicker">Convocação</p>
            <h2 className="display mt-5 text-3xl leading-[0.96] text-bone md:text-5xl">
              Mais que tecido.
              <br />
              Uma marca de pertencimento.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Meta label="Capítulo ativo" value={currentDrop.name} />
              <Meta label="Tiragem total" value={`${currentDrop.totalUnits} unidades`} />
              <Meta label="Assinatura" value="malha pesada · acabamento premium" />
              <Meta label="Código" value="lealdade · justiça · liberdade" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.75 }}
          className="grid gap-3 md:grid-cols-3"
        >
          {[
            "Drops curtos para aumentar desejo, não ruído.",
            "Peças construídas para parecer arquivo desde o primeiro uso.",
            "Uma loja para quem quer status sem estética genérica.",
          ].map((item) => (
            <div key={item} className="glass-1 rounded-[22px] px-5 py-4 text-sm leading-relaxed text-fg-muted">
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-fg-muted">{label}</p>
      <p className="mt-3 text-sm leading-relaxed text-bone">{value}</p>
    </div>
  );
}
