"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Seal } from "@/components/brand/seal";

const lines = [
  "Nascida do silêncio das ruas",
  "e da disciplina dos antigos.",
  "MASAYOSHI é família.",
  "MASAYOSHI é lealdade.",
  "MASAYOSHI é domínio.",
];

export function Manifesto() {
  return (
    <section className="relative bg-bg py-32 md:py-48 overflow-hidden border-y border-line">
      {/* Background scan effect */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, transparent 0%, transparent 49%, #fff 50%, transparent 51%, transparent 100%)",
          backgroundSize: "100% 4px",
        }}
      />

      <div className="container-edge relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-12"
        >
          <Seal variant="kanji" size={32} className="text-blood" />
          <p className="label-tag">Manifesto · Capítulo 01</p>
          <div className="flex-1 hairline" />
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            {lines.map((l, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="display text-[clamp(2rem,6vw,5.5rem)] leading-[1] tracking-[-0.03em] text-bone"
              >
                {i === lines.length - 1 ? (
                  <span>
                    MASAYOSHI é <span className="italic text-blood">domínio.</span>
                  </span>
                ) : (
                  l
                )}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="lg:max-w-sm space-y-6"
          >
            <p className="text-fg-muted leading-relaxed">
              Cada peça é um juramento. Cada drop é um capítulo da Ordem.
              Quem veste, carrega o peso da própria coroa.
            </p>
            <Link
              href="/manifesto"
              className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-bone hover:text-blood transition-colors"
            >
              Ler manifesto completo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
