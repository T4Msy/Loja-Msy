import { notFound } from "next/navigation";
import Image from "next/image";
import { mockDrops } from "@/lib/mock/drops";
import { getProductsByDrop } from "@/lib/mock/products";
import { ProductGrid } from "@/components/product/product-grid";
import { Seal } from "@/components/brand/seal";
import { Countdown } from "@/components/drop/countdown";
import { Badge } from "@/components/ui/badge";
import { formatDateBR } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return mockDrops.map((d) => ({ id: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const drop = mockDrops.find((d) => d.id === id);
  if (!drop) return { title: "Drop não encontrado" };
  return {
    title: `${drop.code} · ${drop.name}`,
    description: drop.story,
  };
}

export default async function DropPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const drop = mockDrops.find((d) => d.id === id);
  if (!drop) notFound();

  const products = getProductsByDrop(drop.id);
  const statusMap = {
    live: { label: "Ao vivo", variant: "live" as const },
    scheduled: { label: "Em breve", variant: "outline" as const },
    "sold-out": { label: "Esgotado", variant: "soldout" as const },
    archived: { label: "Arquivo", variant: "default" as const },
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80svh] overflow-hidden bg-bg flex items-end">
        <div className="absolute inset-0">
          <Image
            src={drop.cover}
            alt={drop.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/40 to-bg" />
        </div>

        <div className="container-edge relative z-10 pt-24 pb-12 grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Seal variant="full" size={56} className="text-bone" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone">
                  {drop.code}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone/60">
                  Ordem {drop.ordemNumero} · {formatDateBR(drop.releaseAt)}
                </p>
              </div>
            </div>

            <Badge variant={statusMap[drop.status].variant} className="mb-4">
              {statusMap[drop.status].label}
            </Badge>

            <h1 className="display text-5xl md:text-7xl lg:text-9xl text-bone leading-[0.86] tracking-tight">
              {drop.name}
            </h1>
            <p className="mt-6 italic display text-2xl md:text-3xl text-fg max-w-xl">
              "{drop.tagline}"
            </p>
          </div>

          <div className="space-y-6 lg:max-w-md lg:justify-self-end">
            <p className="text-fg-muted leading-relaxed">{drop.story}</p>

            {drop.status === "live" && drop.endsAt && (
              <div className="border border-line bg-bg-2/60 backdrop-blur-md p-6">
                <p className="label-tag mb-4">Encerra em</p>
                <Countdown target={drop.endsAt} />
              </div>
            )}

            {drop.status === "scheduled" && (
              <div className="border border-line bg-bg-2/60 backdrop-blur-md p-6">
                <p className="label-tag mb-4">Lançamento em</p>
                <Countdown target={drop.releaseAt} />
              </div>
            )}

            <div className="grid grid-cols-3 gap-3 border border-line p-6">
              <Stat label="Peças" value={String(drop.productCount).padStart(2, "0")} />
              <Stat label="Unidades" value={String(drop.totalUnits ?? 0).padStart(3, "0")} />
              <Stat label="Ordem" value={drop.ordemNumero} />
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="container-edge py-24 md:py-32">
        <div className="flex items-end justify-between gap-6 pb-10 border-b border-line">
          <div>
            <p className="label-tag mb-3">Coleção · {products.length} peças</p>
            <h2 className="display text-3xl md:text-5xl text-bone leading-[0.95]">
              As peças do capítulo
            </h2>
          </div>
        </div>
        <div className="mt-12">
          {products.length > 0 ? (
            <ProductGrid products={products} columns={4} />
          ) : (
            <p className="text-fg-muted text-center py-20">
              As peças deste capítulo serão reveladas no lançamento.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="label-tag mb-1">{label}</p>
      <p className="font-mono text-2xl text-bone tabular-nums">{value}</p>
    </div>
  );
}
