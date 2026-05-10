"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "A modelagem não pede atenção. Ela impõe presença. É a peça que muda o jeito como você entra em qualquer lugar.",
    author: "R. Kuroda",
    role: "membro desde DROP 001",
  },
  {
    quote: "Não comprei só uma camiseta. Comprei um sinal. O acabamento, o peso e o silêncio visual fazem parecer algo de arquivo.",
    author: "L. Sato",
    role: "coleção privada",
  },
  {
    quote: "MSY acerta onde a maioria falha: escassez real, direção forte e produto que sustenta a promessa no corpo.",
    author: "M. Duarte",
    role: "cliente recorrente",
  },
];

export function Testimonials() {
  return (
    <section className="bg-bg py-28 md:py-36">
      <div className="container-edge">
        <div className="flex flex-col gap-5 border-b border-line pb-10 md:flex-row md:items-end md:justify-between md:pb-14">
          <div>
            <span className="section-kicker">Reconhecimento</span>
            <h2 className="display mt-5 text-4xl leading-[0.96] text-bone md:text-6xl">
              Reconhecida por quem
              <br />
              <span className="italic text-fg">entende o peso do símbolo.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-fg-muted md:text-base">
            A Masayoshi não precisa falar alto. O valor aparece no tecido, no silêncio da peça e na reação de quem veste.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.author}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="panel-premium surface-elev-1 rounded-[28px] p-7 md:p-8"
            >
              <p className="display text-3xl leading-none text-blood">“</p>
              <p className="mt-5 text-base leading-relaxed text-bone md:text-lg">{item.quote}</p>
              <div className="mt-8 border-t border-line pt-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-bone">{item.author}</p>
                <p className="mt-2 text-sm text-fg-muted">{item.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
