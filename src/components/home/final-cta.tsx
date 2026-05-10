"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Seal } from "@/components/brand/seal";

export function FinalCTA() {
  return (
    <section className="bg-bg py-28 md:py-40">
      <div className="container-edge">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="panel-strong surface-elev-3 gradient-stroke rounded-[36px] px-6 py-12 md:px-12 md:py-16 lg:px-16"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/4 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.32em] text-fg-muted">
                <Seal variant="mark" size={18} className="text-blood" />
                Vista o símbolo. Carregue a ordem.
              </div>
              <h2 className="display mt-6 text-4xl leading-[0.94] text-bone md:text-6xl lg:text-7xl">
                Criada para poucos.
                <br />
                <span className="italic text-fg">Reconhecida por quem entende.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-fg-muted md:text-lg">
                Mais que tecido. Uma marca de pertencimento. Entre na coleção atual e escolha a peça que confirma quem você é antes de dizer qualquer palavra.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/shop" className="btn-primary min-w-[220px]">
                Comprar coleção
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/drops" className="btn-ghost min-w-[220px]">
                Ver capítulos
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
