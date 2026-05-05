"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    kanji: "忠",
    label: "Lealdade",
    desc: "Sem lealdade não há Ordem. Toda peça é selada para quem honra o juramento.",
  },
  {
    kanji: "力",
    label: "Domínio",
    desc: "O que você veste é o que você comanda. Disciplina como uniforme.",
  },
  {
    kanji: "影",
    label: "Sombra",
    desc: "Quem entende, não fala. A presença pesa mais que qualquer ruído.",
  },
  {
    kanji: "家",
    label: "Família",
    desc: "Não somos uma marca. Somos uma família. Você não compra. Você jura.",
  },
];

export function Pillars() {
  return (
    <section className="bg-bg-2 py-32 md:py-40 border-y border-line">
      <div className="container-edge">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between gap-6 pb-12 md:pb-16 border-b border-line"
        >
          <div>
            <p className="label-tag mb-3">Pilares da Ordem</p>
            <h2 className="display text-4xl md:text-6xl text-bone leading-[0.95]">
              Quatro juramentos.
              <br />
              <span className="italic text-fg">Um único caminho.</span>
            </h2>
          </div>
        </motion.div>

        <div className="grid gap-px bg-line mt-12 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <motion.article
              key={p.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative bg-bg-2 p-8 md:p-10 transition-colors duration-500 hover:bg-bg-3 cursor-default"
            >
              <span className="seal absolute top-4 right-4 text-[clamp(4rem,10vw,8rem)] leading-none text-blood/[0.08] group-hover:text-blood/20 transition-colors duration-700">
                {p.kanji}
              </span>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg-muted">
                0{i + 1}
              </p>
              <h3 className="mt-6 display text-3xl md:text-4xl text-bone">
                {p.label}
              </h3>
              <p className="mt-4 max-w-xs text-sm text-fg-muted leading-relaxed">
                {p.desc}
              </p>
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-0 bg-blood transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:w-full"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
