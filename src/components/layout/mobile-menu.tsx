"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Wordmark, Seal } from "@/components/brand/seal";
import { site } from "@/lib/site";

type Props = {
  open: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
};

export function MobileMenu({ open, onClose, links }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 bg-bg lg:hidden"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="flex h-[68px] items-center justify-between border-b border-line px-5"
          >
            <Wordmark className="text-bone" />
            <button onClick={onClose} aria-label="Fechar" className="text-bone">
              <X className="h-5 w-5" />
            </button>
          </motion.div>

          <div className="flex h-[calc(100vh-68px)] flex-col justify-between px-5 py-12">
            <nav className="flex flex-col gap-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={onClose}
                    className="display block text-5xl text-bone transition-colors hover:text-blood"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between border-t border-line pt-6">
                <Seal variant="full" size={48} className="text-blood opacity-80" />
                <div className="text-right">
                  <p className="label-tag">Ordem</p>
                  <p className="font-mono text-sm text-bone">N° {site.ordemNumero}</p>
                </div>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg-subtle">
                © {new Date().getFullYear()} Masayoshi · A Ordem
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
