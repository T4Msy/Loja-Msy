"use client";

import { motion } from "framer-motion";

const proof = [
  { value: "320", label: "unidades no drop ativo", copy: "Tiragem controlada. Sem reposição anunciada." },
  { value: "04", label: "capítulos lançados", copy: "Cada drop reforça o código e fecha rápido." },
  { value: "24h", label: "acesso antecipado", copy: "Quem entra na lista recebe a convocação antes do público." },
  { value: "280gsm+", label: "peso das peças-chave", copy: "Malha pesada, presença tátil e estrutura premium." },
];

export function SocialProof() {
  return (
    <section className="bg-bg py-10 md:py-14">
      <div className="container-edge">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {proof.map((item, index) => (
            <motion.article
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="panel-premium surface-elev-1 gradient-stroke rounded-[28px] p-6 md:p-7"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-blood">{item.value}</p>
              <h3 className="mt-4 text-lg text-bone">{item.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{item.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
