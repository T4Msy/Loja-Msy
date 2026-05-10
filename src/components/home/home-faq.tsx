"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const faqs = [
  {
    question: "As peças voltam depois que esgotam?",
    answer: "Não. Quando um capítulo fecha, ele vira arquivo. A ordem trabalha com tiragens limitadas e sem reposição padrão.",
    href: "/drops",
    label: "Ver capítulos",
  },
  {
    question: "Como sei o tamanho certo?",
    answer: "Cada produto traz tabela detalhada, fit e medidas da peça. Se ainda houver dúvida, a tabela geral continua acessível no suporte.",
    href: "/ajuda/medidas",
    label: "Abrir medidas",
  },
  {
    question: "Quanto tempo leva para enviar?",
    answer: "Pedidos seguem para preparação logo após confirmação. O prazo de despacho e entrega continua claro antes do fechamento da compra.",
    href: "/ajuda/entrega",
    label: "Ver entrega",
  },
  {
    question: "Posso trocar se o fit não ficar certo?",
    answer: "Sim. A política de troca existe para proteger a experiência, desde que a peça siga sem uso e dentro do prazo informado.",
    href: "/ajuda/trocas",
    label: "Ler política",
  },
];

export function HomeFAQ() {
  return (
    <section className="bg-bg-2 py-28 md:py-36 border-y border-line">
      <div className="container-edge grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-kicker">FAQ da Ordem</span>
          <h2 className="display mt-5 text-4xl leading-[0.96] text-bone md:text-6xl">
            Menos dúvida.
            <br />
            <span className="italic text-fg">Mais decisão.</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-fg-muted md:text-base">
            O objetivo da página é desejo. O objetivo desta seção é remover a última fricção antes da compra.
          </p>
        </motion.div>

        <div className="grid gap-4">
          {faqs.map((item, index) => (
            <motion.article
              key={item.question}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="panel-premium rounded-[24px] p-6 md:p-7"
            >
              <h3 className="text-lg text-bone md:text-xl">{item.question}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted md:text-base">{item.answer}</p>
              <Link
                href={item.href}
                className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-bone hover:text-blood transition-colors"
              >
                {item.label}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
