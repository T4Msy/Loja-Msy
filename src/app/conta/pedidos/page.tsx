"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Package } from "lucide-react";
import { Seal } from "@/components/brand/seal";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/store/auth";
import { formatBRL, formatDateBR } from "@/lib/utils";
import type { Order } from "@/lib/types";

const mockOrders: Order[] = [
  {
    id: "ord-001",
    number: "MSY-047-001",
    email: "membro@masayoshi.store",
    status: "delivered",
    items: [
      { productId: "p-001", variantId: "MSY003-OBS-M", name: "OBSIDIAN TEE — BLOOD SEAL", size: "M", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1400&auto=format&fit=crop", priceCents: 32900, quantity: 1 },
    ],
    subtotalCents: 32900,
    shippingCents: 0,
    discountCents: 3290,
    totalCents: 29610,
    shippingAddress: { fullName: "Membro da Ordem", phone: "11990000000", zipcode: "01001-000", street: "Rua da Ordem", number: "47", district: "Centro", city: "São Paulo", state: "SP", country: "BR" },
    shippingMethod: { id: "express", carrier: "Sedex", service: "Sedex 24h", priceCents: 0, etaDays: 1 },
    paymentMethod: "pix",
    trackingCode: "BR123456789SP",
    createdAt: "2026-04-25T14:30:00Z",
    paidAt: "2026-04-25T14:32:00Z",
  },
];

const statusLabels: Record<string, { label: string; variant: "live" | "default" | "soldout" | "outline" | "bone" | "blood" }> = {
  pending: { label: "Pendente", variant: "outline" },
  paid: { label: "Pago", variant: "live" },
  shipped: { label: "Enviado", variant: "blood" },
  delivered: { label: "Entregue", variant: "bone" },
  canceled: { label: "Cancelado", variant: "soldout" },
  refunded: { label: "Reembolsado", variant: "default" },
};

export default function PedidosPage() {
  const router = useRouter();
  const { user, initialized, init } = useAuth();

  useEffect(() => { init(); }, [init]);
  useEffect(() => {
    if (initialized && !user) router.push("/login");
  }, [initialized, user, router]);

  if (!initialized || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Seal variant="full" size={64} className="animate-pulse text-fg-faint" />
      </div>
    );
  }

  const orders = mockOrders;

  return (
    <div className="container-edge pt-16 pb-32">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Link href="/conta" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-fg-muted hover:text-bone transition-colors mb-8">
          <ArrowLeft className="h-3 w-3" />
          Voltar para conta
        </Link>

        <h1 className="display text-5xl md:text-7xl text-bone leading-[0.95] mb-12">Meus pedidos</h1>

        {orders.length === 0 ? (
          <div className="py-32 text-center">
            <Package className="h-16 w-16 mx-auto text-fg-faint mb-6" />
            <p className="display text-3xl text-bone">Nenhum pedido ainda.</p>
            <p className="mt-3 text-fg-muted">Faça seu primeiro juramento.</p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/shop">Ver coleção</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const st = statusLabels[order.status] || statusLabels.pending;
              return (
                <div key={order.id} className="border border-line bg-bg-2/30">
                  <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-line">
                    <div className="flex items-center gap-4">
                      <p className="font-mono text-sm text-bone">{order.number}</p>
                      <Badge variant={st.variant}>{st.label}</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fg-muted">
                        {formatDateBR(order.createdAt)}
                      </p>
                      <p className="font-mono text-sm text-bone">{formatBRL(order.totalCents)}</p>
                    </div>
                  </div>
                  <div className="px-6 py-4 space-y-3">
                    {order.items.map((item) => (
                      <div key={item.variantId} className="flex items-center gap-4">
                        <div className="h-12 w-10 shrink-0 bg-bg-2 border border-line overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-bone text-sm truncate">{item.name}</p>
                          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fg-muted">
                            Tam {item.size} · Qtd {item.quantity}
                          </p>
                        </div>
                        <p className="font-mono text-sm text-bone">{formatBRL(item.priceCents * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}

import { Button } from "@/components/ui/button";