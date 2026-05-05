"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatBRL, formatDateBR } from "@/lib/utils";
import type { Order, OrderStatus } from "@/lib/types";

const mockOrders: Order[] = [
  {
    id: "ord-001", number: "MSY-047-001", email: "membro@masayoshi.store",
    status: "delivered",
    items: [{ productId: "p-001", variantId: "MSY003-OBS-M", name: "OBSIDIAN TEE — BLOOD SEAL", size: "M", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=200&auto=format&fit=crop", priceCents: 32900, quantity: 1 }],
    subtotalCents: 32900, shippingCents: 0, discountCents: 3290, totalCents: 29610,
    shippingAddress: { fullName: "Membro", phone: "11990000000", zipcode: "01001-000", street: "Rua da Ordem", number: "47", district: "Centro", city: "São Paulo", state: "SP", country: "BR" },
    shippingMethod: { id: "express", carrier: "Sedex", service: "Sedex 24h", priceCents: 0, etaDays: 1 },
    paymentMethod: "pix", trackingCode: "BR123456789SP",
    createdAt: "2026-04-25T14:30:00Z", paidAt: "2026-04-25T14:32:00Z",
  },
  {
    id: "ord-002", number: "MSY-047-002", email: "jurado@email.com",
    status: "paid",
    items: [{ productId: "p-002", variantId: "MSY003-RON-G", name: "RONIN HOODIE — ONYX", size: "G", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=200&auto=format&fit=crop", priceCents: 79900, quantity: 1 }],
    subtotalCents: 79900, shippingCents: 1990, discountCents: 0, totalCents: 81890,
    shippingAddress: { fullName: "Jurado Anônimo", phone: "21987654321", zipcode: "22010-000", street: "Av. Principal", number: "100", district: "Copacabana", city: "Rio de Janeiro", state: "RJ", country: "BR" },
    shippingMethod: { id: "standard", carrier: "PAC", service: "Entrega padrão", priceCents: 1990, etaDays: 7 },
    paymentMethod: "credit_card",
    createdAt: "2026-04-26T09:15:00Z", paidAt: "2026-04-26T09:17:00Z",
  },
];

const statusConfig: Record<OrderStatus, { label: string; variant: "live" | "default" | "soldout" | "outline" | "blood" }> = {
  pending: { label: "Pendente", variant: "outline" },
  paid: { label: "Pago", variant: "live" },
  shipped: { label: "Enviado", variant: "blood" },
  delivered: { label: "Entregue", variant: "default" },
  canceled: { label: "Cancelado", variant: "soldout" },
  refunded: { label: "Reembolsado", variant: "outline" },
};

export default function AdminPedidos() {
  const [orders] = useState<Order[]>(mockOrders);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  const filtered = orders.filter((o) => {
    const matchSearch = o.number.toLowerCase().includes(search.toLowerCase()) || o.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || o.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="label-tag mb-3 text-blood">Gestão</p>
            <h1 className="display text-4xl md:text-6xl text-bone leading-[0.95]">Pedidos</h1>
            <p className="mt-3 text-fg-muted">{orders.length} pedidos · Receita total {formatBRL(orders.reduce((s, o) => s + o.totalCents, 0))}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-fg-subtle" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nº ou e-mail…" className="pl-7" />
          </div>
          <div className="flex gap-1">
            {(["all", "pending", "paid", "shipped", "delivered"] as const).map((s) => (
              <button key={s} onClick={() => setFilter(s)} className={`px-3 py-2 font-mono text-[9px] uppercase tracking-[0.24em] border transition-colors ${filter === s ? "bg-blood-4 border-blood text-bone" : "border-line-2 text-fg-muted hover:text-bone"}`}>
                {s === "all" ? "Todos" : statusConfig[s]?.label || s}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((order, i) => {
            const st = statusConfig[order.status];
            return (
              <motion.div key={order.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="border border-line bg-bg-2/30">
                <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-line/50">
                  <div className="flex items-center gap-4">
                    <Package className="h-4 w-4 text-fg-muted" />
                    <p className="font-mono text-sm text-bone">{order.number}</p>
                    <Badge variant={st.variant}>{st.label}</Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fg-subtle">{order.email}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fg-subtle">{formatDateBR(order.createdAt)}</p>
                    <p className="font-mono text-sm text-bone">{formatBRL(order.totalCents)}</p>
                  </div>
                </div>
                <div className="px-6 py-3">
                  {order.items.map((item) => (
                    <div key={item.variantId} className="flex items-center gap-3 py-2">
                      <div className="h-10 w-8 shrink-0 bg-bg-3 overflow-hidden"><img src={item.image} alt={item.name} className="h-full w-full object-cover" /></div>
                      <p className="flex-1 text-sm text-bone truncate">{item.name}</p>
                      <p className="font-mono text-[10px] text-fg-muted">{item.size} × {item.quantity}</p>
                      <p className="font-mono text-sm text-bone">{formatBRL(item.priceCents * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="py-20 text-center"><Package className="h-12 w-12 mx-auto text-fg-faint mb-4" /><p className="text-fg-muted">Nenhum pedido encontrado.</p></div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
