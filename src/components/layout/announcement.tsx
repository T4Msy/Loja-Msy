"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const messages = [
  "FRETE GRÁTIS ACIMA DE R$ 599",
  "DROP 003 — OBSIDIAN ORDER · AO VIVO",
  "PARCELE EM ATÉ 6X SEM JUROS",
  "DROP LIMITADO · NUMERAÇÃO INDIVIDUAL",
  "JURE FIDELIDADE À ORDEM · MEMBROS GANHAM 10%",
];

export function Announcement() {
  return (
    <div className="relative z-50 overflow-hidden border-b border-line bg-bg">
      <div className="flex items-center gap-12 py-2.5 whitespace-nowrap animate-[marquee_28s_linear_infinite]">
        {[...messages, ...messages, ...messages].map((m, i) => (
          <motion.span
            key={i}
            className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-fg-muted"
          >
            <span className="text-blood">◆</span>
            {m}
            <ChevronRight className="h-3 w-3 text-fg-faint" />
          </motion.span>
        ))}
      </div>
    </div>
  );
}
