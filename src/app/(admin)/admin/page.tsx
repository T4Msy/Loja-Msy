"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Layers, Package, TrendingUp, Users, DollarSign } from "lucide-react";
import { Seal } from "@/components/brand/seal";
import { mockProducts } from "@/lib/mock/products";
import { mockDrops } from "@/lib/mock/drops";
import { formatBRL } from "@/lib/utils";

const stats = [
  { label: "Produtos ativos", value: String(mockProducts.filter((p) => p.status === "active").length), icon: ShoppingBag, accent: "blood" as const },
  { label: "Drops ao vivo", value: String(mockDrops.filter((d) => d.status === "live").length), icon: Layers, accent: "gold" as const },
  { label: "Pedidos hoje", value: "12", icon: Package, accent: "fg" as const },
  { label: "Receita do mês", value: formatBRL(784500), icon: DollarSign, accent: "blood" as const },
  { label: "Visitantes hoje", value: "847", icon: Users, accent: "fg" as const },
  { label: "Conversão", value: "3.2%", icon: TrendingUp, accent: "gold" as const },
];

const accentClasses = { blood: "text-blood", gold: "text-gold", fg: "text-bone" };

export default function AdminDashboard() {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="label-tag mb-3 text-blood">Painel da Ordem</p>
            <h1 className="display text-4xl md:text-6xl text-bone leading-[0.95]">Dashboard</h1>
          </div>
          <Seal variant="full" size={48} className="text-blood opacity-60 hidden md:block" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="border border-line bg-bg-2/40 p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="label-tag">{s.label}</p>
                  <Icon className={`h-4 w-4 ${accentClasses[s.accent]}`} />
                </div>
                <p className={`display text-3xl ${accentClasses[s.accent]}`}>
                  {s.value}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 border-t border-line pt-10">
          <p className="label-tag mb-6">Atividade recente</p>
          <div className="space-y-3">
            {[
              { text: "Pedido #MSY-047-012 — R$ 799,00 — Pix aprovado", time: "Agora", dot: "bg-blood" },
              { text: "Pedido #MSY-047-011 — R$ 329,00 — Em envio", time: "14m atrás", dot: "bg-gold" },
              { text: "Produto OBSIDIAN TEE — Estoque baixo (3 un.)", time: "1h atrás", dot: "bg-gold" },
              { text: "DROP 004 — Publicação agendada para 21/06", time: "3h atrás", dot: "bg-fg-muted" },
              { text: "Pedido #MSY-047-010 — R$ 149,00 — Entregue", time: "5h atrás", dot: "bg-green-500" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
                className="flex items-center gap-3 py-2 border-b border-line/50"
              >
                <span className={`h-2 w-2 shrink-0 rounded-full ${item.dot}`} />
                <p className="flex-1 text-sm text-bone">{item.text}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fg-subtle">{item.time}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}