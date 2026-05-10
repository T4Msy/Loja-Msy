"use client";

import { motion } from "framer-motion";
import { Seal } from "@/components/brand/seal";

const pillars = [
  {
    title: "Lealdade",
    copy: "Toda peça nasce para representar vínculo, não volume. Quem veste MSY carrega posição.",
  },
  {
    title: "Presença",
    copy: "Malha pesada, silhueta firme e acabamento que sustenta a promessa da marca no corpo.",
  },
  {
    title: "Exclusividade",
    copy: "Drops curtos, tiragens reais e linguagem feita para poucos. A raridade não é efeito visual. É estrutura.",
  },
  {
    title: "Ascensão",
    copy: "A compra não termina no checkout. Ela redefine como você entra, é lido e permanece na memória.",
  },
];

export function Manifesto() {
  return (
    <section className="relative overflow-hidden bg-bg-2 py-28 md:py-40 border-y border-line">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,28,28,0.14),transparent_24%)]" />

      <div className="container-edge relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-8 border-b border-line pb-10 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:pb-14"
        >
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/4 px-4 py-2">
              <Seal variant="kanji" size={18} className="text-blood" />
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg-muted">Código da Ordem</span>
            </div>
            <h2 className="display mt-6 text-4xl leading-[0.95] text-bone md:text-6xl lg:text-7xl">
              Mais que roupa.
              <br />
              <span className="italic text-fg">Um uniforme de leitura imediata.</span>
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-fg-muted md:text-base lg:justify-self-end">
            A Masayoshi existe para transformar peça em símbolo. O produto precisa convencer no toque, no peso, no silêncio e no modo como a presença muda quando ele entra em cena.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.68, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="panel-premium surface-elev-1 rounded-[28px] p-6 md:p-7"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-blood">0{index + 1}</p>
              <h3 className="display mt-5 text-3xl text-bone">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-fg-muted">{item.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
