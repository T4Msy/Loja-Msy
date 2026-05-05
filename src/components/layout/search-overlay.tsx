"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { mockProducts } from "@/lib/mock/products";
import { formatBRL } from "@/lib/utils";

type Props = { open: boolean; onClose: () => void };

export function SearchOverlay({ open, onClose }: Props) {
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = q.length > 1
    ? mockProducts
        .filter((p) =>
          (p.name + " " + p.subtitle + " " + p.category)
            .toLowerCase()
            .includes(q.toLowerCase())
        )
        .slice(0, 5)
    : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-bg/85 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="container-edge mx-auto pt-16 lg:pt-24"
          >
            <div className="flex items-center gap-4 border-b border-line-2 pb-4">
              <Search className="h-5 w-5 text-fg-muted" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar peças, drops, kanji…"
                className="flex-1 bg-transparent text-2xl text-bone placeholder:text-fg-faint focus:outline-none"
              />
              <button onClick={onClose} aria-label="Fechar" className="text-fg-muted hover:text-bone">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 grid gap-2">
              {results.length === 0 && q.length > 1 && (
                <p className="text-fg-muted text-sm">Nada encontrado para &ldquo;{q}&rdquo;.</p>
              )}
              {results.length === 0 && q.length <= 1 && (
                <div>
                  <p className="label-tag mb-4">Sugestões</p>
                  <div className="flex flex-wrap gap-2">
                    {["DROP 003", "Hoodie", "Cargo", "Tee", "Boné"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setQ(s)}
                        className="border border-line-2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-muted hover:border-blood hover:text-bone transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {results.map((p) => (
                <Link
                  key={p.id}
                  href={`/produto/${p.slug}`}
                  onClick={onClose}
                  className="group flex items-center gap-4 border-b border-line py-4 hover:bg-bg-2/50 transition-colors"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-bg-2">
                    <Image src={p.imageFront} alt={p.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fg-muted">
                      {p.drop?.code}
                    </p>
                    <p className="text-bone group-hover:text-blood transition-colors">{p.name}</p>
                  </div>
                  <p className="font-mono text-sm text-bone">{formatBRL(p.priceCents)}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
