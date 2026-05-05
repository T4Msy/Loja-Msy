"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { DropCard } from "@/components/drop/drop-card";
import { mockDrops } from "@/lib/mock/drops";
import { cn } from "@/lib/utils";

const filters = [
  { value: "all", label: "Todos" },
  { value: "live", label: "Ao vivo" },
  { value: "scheduled", label: "Em breve" },
  { value: "archived", label: "Arquivo" },
];

export default function DropsPage() {
  const [filter, setFilter] = useState<string>("all");
  const drops =
    filter === "all"
      ? mockDrops
      : filter === "archived"
      ? mockDrops.filter((d) => d.status === "archived" || d.status === "sold-out")
      : mockDrops.filter((d) => d.status === filter);

  const live = drops.find((d) => d.status === "live");
  const others = drops.filter((d) => d.id !== live?.id);

  return (
    <>
      {/* Header */}
      <header className="container-edge pt-16 md:pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="label-tag mb-4">Capítulos · {mockDrops.length} drops registrados</p>
          <h1 className="display text-5xl md:text-7xl lg:text-8xl text-bone leading-[0.95] tracking-tight">
            Os capítulos da Ordem
          </h1>
          <p className="mt-6 max-w-xl text-fg-muted">
            Cada drop é um capítulo. Cada peça é um juramento. Numeração limitada,
            lacre individual, zero reposição. Histórias contadas em pano e linha.
          </p>
        </motion.div>
      </header>

      {/* Filter pills */}
      <div className="container-edge sticky top-[68px] z-30 bg-bg/85 backdrop-blur-xl border-y border-line py-4">
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "h-9 px-4 font-mono text-[10px] uppercase tracking-[0.28em] transition-all border",
                filter === f.value
                  ? "bg-blood-3 border-blood text-bone"
                  : "border-line-2 text-fg-muted hover:text-bone hover:border-line-3"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Live drop highlighted */}
      {live && (filter === "all" || filter === "live") && (
        <section className="container-edge pt-12">
          <DropCard drop={live} index={0} large />
        </section>
      )}

      {/* Grid */}
      <section className="container-edge pt-12 pb-32">
        <div className="grid gap-x-4 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {others.map((d, i) => (
            <DropCard key={d.id} drop={d} index={i} />
          ))}
        </div>

        {drops.length === 0 && (
          <div className="py-32 text-center">
            <p className="display text-3xl text-bone">Nenhum capítulo aqui.</p>
            <p className="mt-2 text-fg-muted text-sm">Tente outro filtro.</p>
          </div>
        )}
      </section>
    </>
  );
}
