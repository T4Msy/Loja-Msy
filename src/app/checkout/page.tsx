"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, CreditCard, Lock, Truck, ShoppingBag } from "lucide-react";
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
] as const;

const paymentMethods = [
  { id: "pix", name: "Pix", desc: "Aprovação imediata · 5% off", icon: "◆" },
  { id: "credit", name: "Cartão de crédito", desc: "Em até 6x sem juros", icon: "▌" },
  { id: "apple", name: "Apple Pay", desc: "Pagamento em 1 toque", icon: "" },
  { id: "google", name: "Google Pay", desc: "Aprovação rápida", icon: "G" },
] as const;

type PaymentMethod = (typeof paymentMethods)[number]["id"];

type CheckoutForm = {
  email: string;
  fullName: string;
  cpf: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
  installments: string;
};

type CheckoutErrors = Partial<Record<keyof CheckoutForm, string>>;

const initialForm: CheckoutForm = {
  email: "",
  fullName: "",
  cpf: "",
  phone: "",
  cep: "",
  street: "",
  number: "",
  complement: "",
  district: "",
  city: "",
  state: "",
  cardNumber: "",
  cardName: "",
  cardExpiry: "",
  cardCvv: "",
  installments: "1",
};

const fieldStep: Record<keyof CheckoutForm, number> = {
  email: 1,
  fullName: 1,
  cpf: 1,
  phone: 1,
  cep: 2,
  street: 2,
  number: 2,
  complement: 2,
  district: 2,
  city: 2,
  state: 2,
  cardNumber: 4,
  cardName: 4,
  cardExpiry: 4,
  cardCvv: 4,
  installments: 4,
};

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateCheckout(form: CheckoutForm, payment: PaymentMethod) {
  const errors: CheckoutErrors = {};

  if (!isValidEmail(form.email.trim())) errors.email = "Digite um e-mail válido.";
  if (form.fullName.trim().length < 3) errors.fullName = "Informe nome e sobrenome.";
  if (onlyDigits(form.cpf).length !== 11) errors.cpf = "Digite um CPF com 11 números.";
  if (onlyDigits(form.phone).length < 10) errors.phone = "Digite um telefone válido.";
  if (onlyDigits(form.cep).length !== 8) errors.cep = "Digite um CEP com 8 números.";
  if (form.street.trim().length < 3) errors.street = "Informe a rua corretamente.";
  if (!form.number.trim()) errors.number = "Informe o número.";
  if (form.district.trim().length < 2) errors.district = "Informe o bairro.";
  if (form.city.trim().length < 2) errors.city = "Informe a cidade.";
  if (form.state.trim().length !== 2) errors.state = "Use a sigla do estado.";

  if (payment === "credit") {
    if (onlyDigits(form.cardNumber).length < 16) errors.cardNumber = "Digite um cartão válido.";
    if (form.cardName.trim().length < 3) errors.cardName = "Informe o nome impresso no cartão.";
    if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(form.cardExpiry.trim())) errors.cardExpiry = "Use o formato MM/AA.";
    if (onlyDigits(form.cardCvv).length < 3) errors.cardCvv = "Digite um CVV válido.";
  }

  return errors;
}

function getStepFromErrors(errors: CheckoutErrors) {
  const fields = Object.keys(errors) as (keyof CheckoutForm)[];
  if (fields.length === 0) return 4;
  return fieldStep[fields[0]];
}

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const couponCode = useCart((s) => s.couponCode);
  const subtotal = items.reduce((acc, x) => acc + x.priceCents * x.quantity, 0);

  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState("express");
  const [payment, setPayment] = useState<PaymentMethod>("pix");
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const shippingOpt = shippingOptions.find((o) => o.id === shipping)!;
  const discount = couponCode ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shippingOpt.priceCents - discount;

  function updateField(field: keyof CheckoutForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit() {
    const nextErrors = validateCheckout(form, payment);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setIsConfirmed(false);
      setStep(getStepFromErrors(nextErrors));
      toast.error("Revise os campos destacados.");
      return;
    }

    setErrors({});
    setStep(4);
    setIsSubmitting(true);
    setIsConfirmed(false);

    await new Promise((resolve) => setTimeout(resolve, 900));

    setIsSubmitting(false);
    setIsConfirmed(true);
    toast.success("Dados confirmados.", {
      description: payment === "pix"
        ? "O pedido está pronto para gerar o QR Code do Pix."
        : "O pedido está pronto para seguir para a autorização do pagamento.",
    });
  }

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
        <div className="space-y-12">
          <Section title="Identificação" current={step === 1} onFocusCapture={() => setStep(1)}>
            <div className="grid gap-6">
              <Field label="E-mail" error={errors.email}>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  className={errors.email ? "border-blood" : undefined}
                />
              </Field>
              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Nome completo" error={errors.fullName}>
                  <Input
                    placeholder="Nome e sobrenome"
                    value={form.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    aria-invalid={!!errors.fullName}
                    className={errors.fullName ? "border-blood" : undefined}
                  />
                </Field>
                <Field label="CPF" error={errors.cpf}>
                  <Input
                    placeholder="000.000.000-00"
                    inputMode="numeric"
                    value={form.cpf}
                    onChange={(e) => updateField("cpf", e.target.value)}
                    aria-invalid={!!errors.cpf}
                    className={errors.cpf ? "border-blood" : undefined}
                  />
                </Field>
              </div>
              <Field label="Telefone" error={errors.phone}>
                <Input
                  placeholder="(11) 90000-0000"
                  inputMode="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  aria-invalid={!!errors.phone}
                  className={errors.phone ? "border-blood" : undefined}
                />
              </Field>
            </div>
          </Section>

          <Section title="Endereço de entrega" current={step === 2} onFocusCapture={() => setStep(2)}>
            <div className="grid gap-6">
              <div className="grid gap-6 md:grid-cols-[160px_1fr]">
                <Field label="CEP" error={errors.cep}>
                  <Input
                    placeholder="00000-000"
                    inputMode="numeric"
                    value={form.cep}
                    onChange={(e) => updateField("cep", e.target.value)}
                    aria-invalid={!!errors.cep}
                    className={errors.cep ? "border-blood" : undefined}
                  />
                </Field>
                <Field label="Rua" error={errors.street}>
                  <Input
                    placeholder="Nome da rua"
                    value={form.street}
                    onChange={(e) => updateField("street", e.target.value)}
                    aria-invalid={!!errors.street}
                    className={errors.street ? "border-blood" : undefined}
                  />
                </Field>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                <Field label="Número" error={errors.number}>
                  <Input
                    placeholder="123"
                    inputMode="numeric"
                    value={form.number}
                    onChange={(e) => updateField("number", e.target.value)}
                    aria-invalid={!!errors.number}
                    className={errors.number ? "border-blood" : undefined}
                  />
                </Field>
                <Field label="Complemento">
                  <Input
                    placeholder="Apto, casa…"
                    value={form.complement}
                    onChange={(e) => updateField("complement", e.target.value)}
                  />
                </Field>
                <Field label="Bairro" error={errors.district}>
                  <Input
                    placeholder="Bairro"
                    value={form.district}
                    onChange={(e) => updateField("district", e.target.value)}
                    aria-invalid={!!errors.district}
                    className={errors.district ? "border-blood" : undefined}
                  />
                </Field>
              </div>
              <div className="grid gap-6 md:grid-cols-[1fr_120px]">
                <Field label="Cidade" error={errors.city}>
                  <Input
                    placeholder="Cidade"
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    aria-invalid={!!errors.city}
                    className={errors.city ? "border-blood" : undefined}
                  />
                </Field>
                <Field label="UF" error={errors.state}>
                  <Input
                    placeholder="SP"
                    maxLength={2}
                    value={form.state}
                    onChange={(e) => updateField("state", e.target.value.toUpperCase())}
                    aria-invalid={!!errors.state}
                    className={errors.state ? "border-blood" : undefined}
                  />
                </Field>
              </div>
            </div>
          </Section>

          <Section title="Forma de envio" current={step === 3} icon={<Truck className="h-4 w-4" />} onFocusCapture={() => setStep(3)}>
            <div className="grid gap-3">
              {shippingOptions.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => {
                    setShipping(o.id);
                    setStep(3);
                  }}
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
                      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-fg-muted">
                        {o.carrier} · {o.etaDays === 0 ? "Disponível imediatamente" : `${o.etaDays} dia${o.etaDays > 1 ? "s úteis" : " útil"}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {o.badge && (
                      <span className="block font-mono text-[10px] uppercase tracking-[0.32em] text-blood">
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

          <Section title="Pagamento" current={step === 4} icon={<CreditCard className="h-4 w-4" />} onFocusCapture={() => setStep(4)}>
            <div className="grid gap-3 sm:grid-cols-2">
              {paymentMethods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setPayment(m.id);
                    setStep(4);
                  }}
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
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-fg-muted">
                      {m.desc}
                    </p>
                  </div>
                  <span className="ml-auto font-display text-2xl text-blood opacity-70">{m.icon}</span>
                </button>
              ))}
            </div>

            {payment === "credit" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8 grid gap-6"
              >
                <Field label="Número do cartão" error={errors.cardNumber}>
                  <Input
                    placeholder="0000 0000 0000 0000"
                    inputMode="numeric"
                    value={form.cardNumber}
                    onChange={(e) => updateField("cardNumber", e.target.value)}
                    aria-invalid={!!errors.cardNumber}
                    className={errors.cardNumber ? "border-blood" : undefined}
                  />
                </Field>
                <Field label="Nome no cartão" error={errors.cardName}>
                  <Input
                    placeholder="Como aparece no cartão"
                    value={form.cardName}
                    onChange={(e) => updateField("cardName", e.target.value)}
                    aria-invalid={!!errors.cardName}
                    className={errors.cardName ? "border-blood" : undefined}
                  />
                </Field>
                <div className="grid gap-6 md:grid-cols-3">
                  <Field label="Validade" error={errors.cardExpiry}>
                    <Input
                      placeholder="MM/AA"
                      value={form.cardExpiry}
                      onChange={(e) => updateField("cardExpiry", e.target.value)}
                      aria-invalid={!!errors.cardExpiry}
                      className={errors.cardExpiry ? "border-blood" : undefined}
                    />
                  </Field>
                  <Field label="CVV" error={errors.cardCvv}>
                    <Input
                      placeholder="000"
                      maxLength={4}
                      value={form.cardCvv}
                      onChange={(e) => updateField("cardCvv", e.target.value)}
                      aria-invalid={!!errors.cardCvv}
                      className={errors.cardCvv ? "border-blood" : undefined}
                    />
                  </Field>
                  <Field label="Parcelas">
                    <select
                      value={form.installments}
                      onChange={(e) => updateField("installments", e.target.value)}
                      className="h-12 w-full bg-transparent border-b border-line-2 text-bone focus:outline-none focus:border-blood font-sans"
                    >
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
                <p className="text-sm text-fg">
                  Após confirmar, o pedido fica pronto para gerar o QR Code do Pix e seguir para envio.
                </p>
              </motion.div>
            )}
          </Section>
        </div>

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
                    <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-blood">
                      {it.dropCode}
                    </p>
                    <p className="text-[12px] uppercase tracking-wide text-bone line-clamp-2">
                      {it.name}
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-fg-muted">
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

              {isConfirmed && (
                <div className="flex items-start gap-3 border border-blood/40 bg-blood-4/20 p-4 text-sm text-bone">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blood" />
                  <p>
                    Dados validados com sucesso. O pedido está pronto para seguir para a autorização do pagamento.
                  </p>
                </div>
              )}

              <Button
                size="xl"
                className="w-full mt-3"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                <Lock className="h-4 w-4" />
                {isSubmitting ? "Validando dados…" : `Concluir compra · ${formatBRL(total)}`}
              </Button>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg-muted text-center">
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
  onFocusCapture,
}: {
  title: string;
  current: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onFocusCapture?: () => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onFocusCapture={onFocusCapture}
      className={cn("border-t border-line pt-8 transition-opacity", current ? "opacity-100" : "opacity-65")}
    >
      <header className="flex items-center gap-3 mb-6">
        {icon && <span className="text-blood">{icon}</span>}
        <h2 className="display text-2xl md:text-3xl text-bone">{title}</h2>
      </header>
      {children}
    </motion.section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
      {error && <p className="mt-2 text-sm text-blood">{error}</p>}
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
