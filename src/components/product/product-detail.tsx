"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, Minus, Plus, ShoppingBag, ShieldCheck, Truck, RotateCcw, Lock } from "lucide-react";
import { toast } from "sonner";
import { ImageGallery } from "./image-gallery";
import { SizeSelector } from "./size-selector";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Seal } from "@/components/brand/seal";
import { useCart } from "@/store/cart";
import { cn, formatBRL } from "@/lib/utils";
import type { Product } from "@/lib/types";

type Props = { product: Product };

export function ProductDetail({ product }: Props) {
  const router = useRouter();
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const addItem = useCart((s) => s.addItem);

  const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
  const isSoldOut = totalStock === 0;
  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId);

  const images = useMemo(() => {
    const base = [product.imageFront, product.imageBack];
    if (product.imageGallery) base.push(...product.imageGallery);
    return [...new Set(base)];
  }, [product]);

  const handleAdd = () => {
    if (!selectedVariant) {
      toast.error("Escolha um tamanho", { description: "A Ordem exige precisão." });
      return false;
    }
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      slug: product.slug,
      name: product.name,
      size: selectedVariant.size,
      priceCents: product.priceCents,
      image: product.imageFront,
      quantity: qty,
      maxStock: selectedVariant.stock,
      dropCode: product.drop?.code,
    });
    toast.success("Adicionado à sacola", {
      description: `${product.name} · Tamanho ${selectedVariant.size}`,
    });
    return true;
  };

  const handleBuyNow = () => {
    if (!handleAdd()) return;
    router.push("/checkout");
  };

  return (
    <div className="container-edge pt-8 pb-32">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-8 font-mono text-[10px] uppercase tracking-[0.32em] text-fg-muted">
        <Link href="/" className="hover:text-bone transition-colors">Home</Link>
        <span className="text-fg-faint">/</span>
        <Link href="/shop" className="hover:text-bone transition-colors">Catálogo</Link>
        {product.drop && (
          <>
            <span className="text-fg-faint">/</span>
            <Link href={`/drops/${product.dropId}`} className="hover:text-bone transition-colors">
              {product.drop.code}
            </Link>
          </>
        )}
      </nav>

      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        {/* Gallery */}
        <div>
          <ImageGallery images={images} alt={product.name} />
        </div>

        {/* Info */}
        <div className="lg:sticky lg:top-[120px] lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {product.drop && (
                <Badge variant="blood">{product.drop.code}</Badge>
              )}
              {product.badges?.map((b) => (
                <Badge key={b} variant={b === "limited" ? "outline" : "default"}>
                  {b === "limited"
                    ? "Edição Limitada"
                    : b === "new"
                    ? "Novo"
                    : b === "last-units"
                    ? "Últimas peças"
                    : b === "exclusive"
                    ? "Exclusivo"
                    : "Arquivo"}
                </Badge>
              ))}
              {isSoldOut && <Badge variant="soldout">Esgotado</Badge>}
            </div>

            <h1 className="display text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-bone">
              {product.name}
            </h1>
            {product.subtitle && (
              <p className="mt-2 text-fg-muted">{product.subtitle}</p>
            )}

            {/* Price */}
            <div className="mt-8 flex items-baseline gap-3">
              <span className="display text-4xl text-bone tabular-nums">
                {formatBRL(product.priceCents)}
              </span>
              {product.comparePriceCents && product.comparePriceCents > product.priceCents && (
                <span className="font-mono text-sm text-fg-faint line-through tabular-nums">
                  {formatBRL(product.comparePriceCents)}
                </span>
              )}
            </div>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.32em] text-fg-muted">
              Em até 6x de {formatBRL(Math.round(product.priceCents / 6))} sem juros
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-10 space-y-8"
          >
            {/* Description */}
            <p className="text-fg leading-relaxed text-pretty">
              {product.description}
            </p>

            {/* Size selector */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="label-tag">Tamanho</p>
                <button className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg-muted hover:text-bone underline-offset-4 hover:underline transition-colors">
                  Tabela de medidas
                </button>
              </div>
              <SizeSelector
                variants={product.variants}
                selected={selectedVariantId}
                onSelect={setSelectedVariantId}
              />
              {selectedVariant ? (
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.32em] text-blood">
                  {selectedVariant.stock} {selectedVariant.stock === 1 ? "unidade" : "unidades"} disponíveis
                </p>
              ) : (
                <p className="mt-3 text-sm text-bone">
                  Selecione um tamanho para liberar a compra.
                </p>
              )}
            </div>

            {/* Quantity + buy */}
            {!isSoldOut && (
              <div className="space-y-4">
                <div className="flex items-stretch gap-3">
                  <div className="inline-flex items-center border border-line-2">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="h-14 w-12 inline-flex items-center justify-center text-fg-muted hover:text-bone transition-colors"
                      aria-label="Diminuir"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-10 text-center font-mono text-sm text-bone tabular-nums">{qty}</span>
                    <button
                      onClick={() =>
                        setQty((q) =>
                          selectedVariant ? Math.min(selectedVariant.stock, q + 1) : q + 1
                        )
                      }
                      className="h-14 w-12 inline-flex items-center justify-center text-fg-muted hover:text-bone transition-colors"
                      aria-label="Aumentar"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <Button
                    onClick={handleAdd}
                    size="lg"
                    className="flex-1 h-14"
                    disabled={!selectedVariant}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    {selectedVariant ? "Adicionar ao carrinho" : "Escolha um tamanho"}
                  </Button>
                </div>
                <Button size="lg" variant="bone" className="w-full h-14" disabled={!selectedVariant} onClick={handleBuyNow}>
                  Comprar agora
                </Button>
              </div>
            )}

            {isSoldOut && (
              <div className="border border-line-2 bg-bg-2 p-6 text-center">
                <p className="seal text-3xl text-blood mb-2">完売</p>
                <p className="display text-2xl text-bone">Esta peça está esgotada</p>
                <p className="mt-2 text-fg-muted text-sm">
                  Sem reposições. Entre na lista de espera para o próximo capítulo.
                </p>
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 border-t border-line pt-8">
              <Trust icon={<Truck className="h-4 w-4" />} title="Frete grátis" desc="acima de R$ 599" />
              <Trust icon={<RotateCcw className="h-4 w-4" />} title="Trocas em 7 dias" desc="produto sem uso" />
              <Trust icon={<ShieldCheck className="h-4 w-4" />} title="Selo de autenticidade" desc="cada peça numerada" />
              <Trust icon={<Lock className="h-4 w-4" />} title="Pagamento seguro" desc="Pix, cartão, parcelado" />
            </div>

            {/* Accordions */}
            <div className="space-y-px border-t border-line bg-line">
              <Accordion title="Composição & cuidados" defaultOpen>
                <ul className="space-y-2 text-sm text-fg-muted">
                  {product.composition?.map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <span className="text-blood mt-1.5">◆</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </Accordion>

              {product.measurements && (
                <Accordion title="Tabela de medidas (cm)">
                  <div className="overflow-x-auto">
                    <table className="w-full font-mono text-[11px] uppercase tracking-[0.18em]">
                      <thead>
                        <tr className="border-b border-line text-fg-muted">
                          <th className="py-2 text-left">Tamanho</th>
                          <th className="py-2 text-right">Tórax</th>
                          <th className="py-2 text-right">Comp.</th>
                          <th className="py-2 text-right">Ombro</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(product.measurements).map(([sz, m]) => (
                          <tr key={sz} className="border-b border-line/60">
                            <td className="py-2 text-bone">{sz}</td>
                            <td className="py-2 text-right text-fg">{m.chest}cm</td>
                            <td className="py-2 text-right text-fg">{m.length}cm</td>
                            <td className="py-2 text-right text-fg">{m.shoulder}cm</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Accordion>
              )}

              {product.story && (
                <Accordion title="História da peça">
                  <p className="text-sm text-fg-muted leading-relaxed">{product.story}</p>
                </Accordion>
              )}

              <Accordion title="Frete & devolução">
                <ul className="space-y-2 text-sm text-fg-muted">
                  <li>• Frete calculado pelo CEP no checkout.</li>
                  <li>• Envio em até 3 dias úteis após confirmação do pagamento.</li>
                  <li>• Trocas e devoluções em até 7 dias.</li>
                  <li>• Entregas internacionais sob consulta.</li>
                </ul>
              </Accordion>
            </div>

            {/* Seal block */}
            <div className="flex items-center gap-4 border border-line p-6 bg-bg-2/50">
              <Seal variant="full" size={56} className="text-blood opacity-90" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg-muted">
                  Selo da Ordem · {product.drop?.code ?? "Coleção"}
                </p>
                <p className="font-mono text-sm text-bone">
                  Numerada individualmente · Lacrada com cera
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Trust({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-blood mt-0.5">{icon}</div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone">{title}</p>
        <p className="text-xs text-fg-muted mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

function Accordion({
  title,
  children,
  defaultOpen,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="bg-bg">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-5 px-1 text-left group"
        aria-expanded={open}
      >
        <span className="label-tag !text-bone">{title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-fg-muted group-hover:text-bone transition-all duration-300",
            open && "rotate-180 text-blood"
          )}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="pb-6 px-1">{children}</div>
      </motion.div>
    </div>
  );
}
