"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CreditCard, Lock, Truck, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Seal } from "@/components/brand/seal";
import { CheckoutStepper } from "@/components/checkout/checkout-stepper";
import { formatBRL, cn } from "@/lib/utils";
import { toast } from "sonner";

const shippingOptions = [
  { id: "express", carrier: "Sedex", service: "Sedex 24h", priceCents: 4990, etaDays: 1, badge: "Mais rápido" },
  { id: "standard", carrier: "PAC", service: "Entrega padrão", priceCents: 1990, etaDays: 7, badge: null },
  { id: "store", carrier: "MSY", service: "Retirar na casa", priceCents: 0, etaDays: 0, badge: "Grátis · SP" },
];

const paymentMethods = [
  { id: "pix", name: "Pix", desc: "Aprovação imediata · 5% off", icon: "◆" },
  { id: "credit", name: "Cartão de crédito", desc: "Em até 6x sem juros", icon: "▌" },
  { id: "apple", name: "Apple Pay", desc: "Pagamento em 1 toque", icon: "" },
  { id: "google", name: "Google Pay", desc: "Aprovação rápida", icon: "G" },
];

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const couponCode = useCart((s) => s.couponCode);
  const subtotal = items.reduce((acc, x) => acc + x.priceCents * x.quantity, 0);

  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState("express");
  const [payment, setPayment] = useState("pix");

  const shippingOpt = shippingOptions.find((o) => o.id === shipping)!;
  const discount = couponCode ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shippingOpt.priceCents - discount;

  if (items.length === 0) {
    return (
      <div className="container-edge py-32 text-center">
        <Seal variant="full" size={80} className="mx-auto mb-6 text-fg-faint" />
        <h1 className="display text-4xl text-bone">A sacola está vazia.</h1>
        <p className="mt-3 text-fg-muted">A Ordem aguarda. Comece pelo capítulo atual.</p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/shop">
            <ShoppingBag className="h-4 w-4" />
            Ver coleção
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-edge pt-12 pb-24">
      {/* Top */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-fg-muted hover:text-bone transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Continuar comprando
        </Link>
        <CheckoutStepper current={step} />
      </div>

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        {/* Left — Forms */}
        <div className="space-y-12">
          {/* Step: identification */}
          <Section title="Identificação" current={step >= 1}>
            <div className="grid gap-6">
              <Field label="E-mail">
                <Input type="email" placeholder="seu@email.com" required />
              </Field>
              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Nome completo">
                  <Input placeholder="Nome e sobrenome" />
                </Field>
                <Field label="CPF">
                  <Input placeholder="000.000.000-00" inputMode="numeric" />
                </Field>
              </div>
              <Field label="Telefone">
                <Input placeholder="(11) 90000-0000" inputMode="tel" />
              </Field>
            </div>
          </Section>

          {/* Step: address */}
          <Section title="Endereço de entrega" current={step >= 1}>
            <div className="grid gap-6">
              <div className="grid gap-6 md:grid-cols-[160px_1fr]">
                <Field label="CEP">
                  <Input placeholder="00000-000" inputMode="numeric" />
                </Field>
                <Field label="Rua">
                  <Input placeholder="Nome da rua" />
                </Field>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                <Field label="Número">
                  <Input placeholder="123" inputMode="numeric" />
                </Field>
                <Field label="Complemento">
                  <Input placeholder="Apto, casa…" />
                </Field>
                <Field label="Bairro">
                  <Input placeholder="Bairro" />
                </Field>
              </div>
              <div className="grid gap-6 md:grid-cols-[1fr_120px]">
                <Field label="Cidade">
                  <Input placeholder="Cidade" />
                </Field>
                <Field label="UF">
                  <Input placeholder="SP" maxLength={2} />
                </Field>
              </div>
            </div>
          </Section>

          {/* Step: shipping */}
          <Section title="Forma de envio" current={step >= 1} icon={<Truck className="h-4 w-4" />}>
            <div className="grid gap-3">
              {shippingOptions.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setShipping(o.id)}
                  className={cn(
                    "flex items-center justify-between gap-3 border p-4 text-left transition-all",
                    shipping === o.id
                      ? "border-blood bg-blood-4/30"
                      : "border-line-2 hover:border-line-3"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "h-5 w-5 inline-flex items-center justify-center border-2 transition-colors",
                        shipping === o.id ? "border-blood" : "border-line-3"
                      )}
                    >
                      {shipping === o.id && <span className="h-2 w-2 bg-blood" />}
                    </span>
                    <div>
                      <p className="text-bone">{o.service}</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fg-muted">
                        {o.carrier} · {o.etaDays === 0 ? "Disponível imediatamente" : `${o.etaDays} dia${o.etaDays > 1 ? "s úteis" : " útil"}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {o.badge && (
                      <span className="block font-mono text-[9px] uppercase tracking-[0.32em] text-blood">
                        {o.badge}
                      </span>
                    )}
                    <span className="font-mono text-sm text-bone tabular-nums">
                      {o.priceCents === 0 ? "Grátis" : formatBRL(o.priceCents)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </Section>

          {/* Step: payment */}
          <Section title="Pagamento" current={step >= 1} icon={<CreditCard className="h-4 w-4" />}>
            <div className="grid gap-3 sm:grid-cols-2">
              {paymentMethods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPayment(m.id)}
                  className={cn(
                    "flex items-center gap-3 border p-4 text-left transition-all",
                    payment === m.id
                      ? "border-blood bg-blood-4/30"
                      : "border-line-2 hover:border-line-3"
                  )}
                >
                  <span
                    className={cn(
                      "h-5 w-5 inline-flex items-center justify-center border-2 transition-colors shrink-0",
                      payment === m.id ? "border-blood" : "border-line-3"
                    )}
                  >
                    {payment === m.id && <span className="h-2 w-2 bg-blood" />}
                  </span>
                  <div className="min-w-0">
                    <p className="text-bone">{m.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fg-muted">
                      {m.desc}
                    </p>
                  </div>
                  <span className="ml-auto font-display text-2xl text-blood opacity-70">{m.icon}</span>
                </button>
              ))}
            </div>

            {/* Card form */}
            {payment === "credit" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8 grid gap-6"
              >
                <Field label="Número do cartão">
                  <Input placeholder="0000 0000 0000 0000" inputMode="numeric" />
                </Field>
                <Field label="Nome no cartão">
                  <Input placeholder="Como aparece no cartão" />
                </Field>
                <div className="grid gap-6 md:grid-cols-3">
                  <Field label="Validade">
                    <Input placeholder="MM/AA" />
                  </Field>
                  <Field label="CVV">
                    <Input placeholder="000" maxLength={4} />
                  </Field>
                  <Field label="Parcelas">
                    <select className="h-12 w-full bg-transparent border-b border-line-2 text-bone focus:outline-none focus:border-blood font-sans">
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n}x de {formatBRL(Math.round(total / n))}
                          {n === 1 ? " à vista" : " sem juros"}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
              </motion.div>
            )}

            {/* PIX */}
            {payment === "pix" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8 border border-line p-6 bg-bg-2/40"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-blood mb-2">
                  5% de desconto à vista
                </p>
                <p className="text-fg-muted text-sm">
                  Após confirmar, você receberá o QR Code do Pix. Aprovação imediata e
                  pedido lacrado para envio em até 3 dias úteis.
                </p>
              </motion.div>
            )}
          </Section>
        </div>

        {/* Right — Summary */}
        <aside className="lg:sticky lg:top-[120px] lg:self-start">
          <div className="border border-line bg-bg-2/40 backdrop-blur-md">
            <div className="px-6 py-5 border-b border-line flex items-center gap-3">
              <Seal variant="mark" size={22} className="text-blood" />
              <p className="label-tag !text-bone">Resumo do pedido</p>
            </div>

            <ul className="divide-y divide-line max-h-[360px] overflow-y-auto">
              {items.map((it) => (
                <li key={it.variantId} className="flex gap-3 p-4">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-bg border border-line">
                    <Image
                      src={it.image}
                      alt={it.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                    <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center bg-bone text-bg font-mono text-[10px]">
                      {it.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-blood">
                      {it.dropCode}
                    </p>
                    <p className="text-[12px] uppercase tracking-wide text-bone line-clamp-2">
                      {it.name}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fg-muted">
                      Tam · {it.size}
                    </p>
                  </div>
                  <p className="font-mono text-sm text-bone shrink-0">
                    {formatBRL(it.priceCents * it.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="border-t border-line px-6 py-5 space-y-3">
              <Row label="Subtotal" value={formatBRL(subtotal)} />
              <Row
                label="Frete"
                value={shippingOpt.priceCents === 0 ? "Grátis" : formatBRL(shippingOpt.priceCents)}
              />
              {discount > 0 && (
                <Row label={`Cupom · ${couponCode}`} value={`- ${formatBRL(discount)}`} accent />
              )}
              <Separator />
              <div className="flex items-baseline justify-between">
                <span className="label-tag !text-bone">Total</span>
                <span className="display text-2xl text-bone tabular-nums">{formatBRL(total)}</span>
              </div>

              <Button
                size="xl"
                className="w-full mt-3"
                onClick={() => {
                  setStep(4);
                  toast.success("Pedido enviado para análise", {
                    description: "Você receberá um e-mail com o QR Code do Pix.",
                  });
                }}
              >
                <Lock className="h-4 w-4" />
                Concluir compra · {formatBRL(total)}
              </Button>
              <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-fg-faint text-center">
                Pagamento seguro · TLS / 256
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({
  title,
  current,
  icon,
  children,
}: {
  title: string;
  current: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("border-t border-line pt-8", !current && "opacity-50")}
    >
      <header className="flex items-center gap-3 mb-6">
        {icon && <span className="text-blood">{icon}</span>}
        <h2 className="display text-2xl md:text-3xl text-bone">{title}</h2>
      </header>
      {children}
    </motion.section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.24em]">
      <span className="text-fg-muted">{label}</span>
      <span className={cn("tabular-nums", accent ? "text-blood" : "text-bone")}>{value}</span>
    </div>
  );
}
