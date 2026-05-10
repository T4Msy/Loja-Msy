"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ShoppingBag, Tag, Trash2, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/store/cart";
import { formatBRL } from "@/lib/utils";
import { Seal } from "@/components/brand/seal";

const FREE_SHIPPING_THRESHOLD = 59900;

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const items = useCart((s) => s.items);
  const removeItem = useCart((s) => s.removeItem);
  const updateQty = useCart((s) => s.updateQty);
  const couponCode = useCart((s) => s.couponCode);
  const applyCoupon = useCart((s) => s.applyCoupon);

  const subtotalLive = items.reduce((acc, x) => acc + x.priceCents * x.quantity, 0);
  const itemCount = items.reduce((acc, x) => acc + x.quantity, 0);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalLive);
  const progress = Math.min(100, (subtotalLive / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && close()}>
      <SheetContent
        side="right"
        showClose={false}
        className="grain border-l-line p-0 flex flex-col"
      >
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-5 border-b border-line">
          <div className="flex items-center gap-3">
            <Seal variant="mark" size={24} className="text-blood" />
            <SheetTitle className="font-mono text-[11px] uppercase tracking-[0.32em] text-bone">
              Sacola · {itemCount}
            </SheetTitle>
          </div>
          <button
            onClick={close}
            aria-label="Fechar carrinho"
            className="text-fg-muted hover:text-bone transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* Free shipping bar */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-b border-line bg-bg-2/40">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fg-muted mb-2">
              {remaining > 0 ? (
                <>
                  Faltam <span className="text-bone">{formatBRL(remaining)}</span> para frete grátis
                </>
              ) : (
                <span className="text-blood">FRETE GRÁTIS DESBLOQUEADO</span>
              )}
            </p>
            <div className="relative h-px w-full bg-line-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-y-0 left-0 bg-blood"
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <EmptyState onClose={close} />
          ) : (
            <ul className="divide-y divide-line">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.li
                    key={item.variantId}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex gap-4 p-6"
                  >
                    <Link
                      href={`/produto/${item.slug}`}
                      onClick={close}
                      className="relative h-28 w-24 shrink-0 overflow-hidden bg-bg-2 border border-line"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        {item.dropCode && (
                          <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-blood">
                            {item.dropCode}
                          </p>
                        )}
                        <Link
                          href={`/produto/${item.slug}`}
                          onClick={close}
                          className="block mt-1 text-[13px] uppercase tracking-wide text-bone hover:text-blood transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-fg-muted">
                          Tamanho · {item.size}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <QtyStepper
                          qty={item.quantity}
                          max={item.maxStock}
                          onMinus={() => updateQty(item.variantId, item.quantity - 1)}
                          onPlus={() => updateQty(item.variantId, item.quantity + 1)}
                        />
                        <p className="font-mono text-sm text-bone">
                          {formatBRL(item.priceCents * item.quantity)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.variantId)}
                      aria-label="Remover item"
                      className="self-start text-fg-muted hover:text-blood transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <footer className="border-t border-line bg-bg-2/40 backdrop-blur-md">
            <div className="px-6 py-4 space-y-3">
              <CouponInput value={couponCode} onApply={applyCoupon} />
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.24em] text-fg-muted">
                <span>Subtotal</span>
                <span className="text-bone">{formatBRL(subtotalLive)}</span>
              </div>
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.24em] text-fg-muted">
                <span>Frete</span>
                <span className="text-fg-muted">Calculado no checkout</span>
              </div>
            </div>
            <div className="px-6 pb-6 space-y-3">
              <Button asChild size="lg" className="w-full">
                <Link href="/checkout" onClick={close}>
                  Finalizar · {formatBRL(subtotalLive)}
                </Link>
              </Button>
              <button
                onClick={close}
                className="w-full font-mono text-[10px] uppercase tracking-[0.32em] text-fg-muted hover:text-bone transition-colors"
              >
                Continuar comprando
              </button>
            </div>
          </footer>
        )}
      </SheetContent>
    </Sheet>
  );
}

function QtyStepper({
  qty,
  max,
  onMinus,
  onPlus,
}: {
  qty: number;
  max: number;
  onMinus: () => void;
  onPlus: () => void;
}) {
  return (
    <div className="inline-flex items-center border border-line">
      <button
        onClick={onMinus}
        disabled={qty <= 1}
        className="h-8 w-8 inline-flex items-center justify-center text-fg-muted hover:text-bone disabled:opacity-30 transition-colors"
        aria-label="Diminuir quantidade"
      >
        <Minus className="h-3 w-3" />
      </button>
      <span className="w-8 text-center font-mono text-xs text-bone tabular-nums">{qty}</span>
      <button
        onClick={onPlus}
        disabled={qty >= max}
        className="h-8 w-8 inline-flex items-center justify-center text-fg-muted hover:text-bone disabled:opacity-30 transition-colors"
        aria-label="Aumentar quantidade"
      >
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
}

function CouponInput({ value, onApply }: { value: string | null; onApply: (c: string | null) => void }) {
  return (
    <details className="group">
      <summary className="cursor-pointer list-none flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-fg-muted hover:text-bone transition-colors">
        <Tag className="h-3 w-3" />
        {value ? `Cupom: ${value}` : "Aplicar cupom"}
      </summary>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          onApply((fd.get("c") as string) || null);
        }}
        className="mt-3 flex gap-2"
      >
        <Input
          name="c"
          defaultValue={value ?? ""}
          placeholder="ORDEM10"
          className="h-9 border px-3 text-xs"
        />
        <button
          type="submit"
          className="h-9 px-4 border border-line-2 font-mono text-[10px] uppercase tracking-[0.32em] text-fg hover:text-bone hover:border-blood transition-colors"
        >
          Aplicar
        </button>
      </form>
    </details>
  );
}

function EmptyState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-6 py-20 text-center">
      <Seal variant="full" size={80} className="text-fg-faint" />
      <div>
        <p className="display text-2xl text-bone">A sacola está vazia.</p>
        <p className="mt-2 text-sm text-fg-muted max-w-xs">
          A Ordem aguarda. Comece pelo último drop e leve um juramento para casa.
        </p>
      </div>
      <Button asChild size="md">
        <Link href="/shop" onClick={onClose}>
          <ShoppingBag className="h-4 w-4" />
          Ver coleção
        </Link>
      </Button>
    </div>
  );
}
