import { Seal } from "@/components/brand/seal";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Frete e Entrega" };

export default function EntregaPage() {
  return (
    <div className="container-edge pt-16 md:pt-24 pb-32">
      <p className="label-tag mb-4 text-blood">Ajuda</p>
      <h1 className="display text-5xl md:text-7xl text-bone leading-[0.95]">
        Frete e<br /><span className="text-blood">Entrega</span>
      </h1>
      <p className="mt-6 max-w-xl text-fg-muted">
        Informações sobre prazos, frete e acompanhamento dos seus pedidos.
      </p>

      <div className="mt-16 grid gap-px bg-line md:grid-cols-3">
        {[
          { label: "Sedex", time: "24h", price: "R$ 49,90", desc: "Entrega expressa para todo o Brasil" },
          { label: "PAC", time: "5–7 dias", price: "R$ 19,90", desc: "Entrega econômica para todo o Brasil" },
          { label: "Retirada", time: "2–3 dias", price: "Grátis", desc: "Retirada em São Paulo — SP" },
        ].map((opt) => (
          <div key={opt.label} className="bg-bg-2 p-8 md:p-10">
            <p className="label-tag mb-2 text-blood">{opt.label}</p>
            <p className="display text-3xl md:text-4xl text-bone">{opt.price}</p>
            <p className="mt-2 font-mono text-sm text-fg-subtle">{opt.time}</p>
            <p className="mt-4 text-fg-muted text-sm leading-relaxed">{opt.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 space-y-0">
        <div className="border-t border-line py-10">
          <p className="label-tag mb-3 text-blood">Frete grátis</p>
          <h2 className="display text-2xl md:text-3xl text-bone">Pedidos acima de R$ 599</h2>
          <p className="mt-4 max-w-xl text-fg-muted leading-relaxed">
            Frete grátis via PAC para todo o Brasil em pedidos acima de <span className="text-bone">R$ 599,00</span>. Para Sedex grátis, o mínimo é R$ 899,00.
          </p>
        </div>

        <div className="border-t border-line py-10">
          <p className="label-tag mb-3 text-blood">Rastreamento</p>
          <h2 className="display text-2xl md:text-3xl text-bone">Acompanhe seu pedido</h2>
          <div className="mt-4 max-w-xl space-y-3 text-fg-muted leading-relaxed">
            <p>Após a postagem, você receberá o código de rastreio por e-mail.</p>
            <ol className="space-y-2 pl-4">
              <li className="flex gap-3"><span className="text-blood font-mono text-sm">01</span> Confirmação do pagamento</li>
              <li className="flex gap-3"><span className="text-blood font-mono text-sm">02</span> Separação e conferência do pedido</li>
              <li className="flex gap-3"><span className="text-blood font-mono text-sm">03</span> Envio do código de rastreio</li>
              <li className="flex gap-3"><span className="text-blood font-mono text-sm">04</span> Entrega no endereço cadastrado</li>
            </ol>
          </div>
        </div>

        <div className="border-t border-line py-10">
          <p className="label-tag mb-3 text-blood">Prazos</p>
          <h2 className="display text-2xl md:text-3xl text-bone">Tempo de processamento</h2>
          <p className="mt-4 max-w-xl text-fg-muted leading-relaxed">
            Pedidos são processados em até <span className="text-bone">2 dias úteis</span>. O prazo de entrega conta a partir da postagem. Em períodos de drops e promoções, o processamento pode levar até 5 dias úteis.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <Seal variant="full" size={64} className="mx-auto text-blood opacity-40" />
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.32em] text-fg-subtle">
          {site.kanji} · {site.name} · Est. {site.founded}
        </p>
      </div>
    </div>
  );
}