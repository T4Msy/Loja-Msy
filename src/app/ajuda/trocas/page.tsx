import { Seal } from "@/components/brand/seal";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Trocas e Devoluções" };

export default function TrocasPage() {
  return (
    <div className="container-edge pt-16 md:pt-24 pb-32">
      <p className="label-tag mb-4 text-blood">Ajuda</p>
      <h1 className="display text-5xl md:text-7xl text-bone leading-[0.95]">
        Trocas e<br /><span className="text-blood">Devoluções</span>
      </h1>
      <p className="mt-6 max-w-xl text-fg-muted">
        A Ordem honra quem honra. Aqui estão as regras para trocas e devoluções.
      </p>

      <div className="mt-16 space-y-0">
        <div className="border-t border-line py-10">
          <p className="label-tag mb-3 text-blood">Política</p>
          <h2 className="display text-2xl md:text-3xl text-bone">Prazo de 30 dias</h2>
          <p className="mt-4 max-w-xl text-fg-muted leading-relaxed">
            Você tem até 30 dias corridos após o recebimento para solicitar troca ou devolução. O produto deve estar nas mesmas condições em que foi recebido.
          </p>
        </div>

        <div className="border-t border-line py-10">
          <p className="label-tag mb-3 text-blood">Condições</p>
          <h2 className="display text-2xl md:text-3xl text-bone">Estado do produto</h2>
          <ul className="mt-4 max-w-xl space-y-3 text-fg-muted leading-relaxed">
            <li className="flex gap-3"><span className="text-blood">—</span> Produto sem uso, sem marcas ou odor</li>
            <li className="flex gap-3"><span className="text-blood">—</span> Embalagem original intacta</li>
            <li className="flex gap-3"><span className="text-blood">—</span> Todas as etiquetas e selos preservados</li>
            <li className="flex gap-3"><span className="text-blood">—</span> Nota fiscal ou comprovante de compra</li>
          </ul>
        </div>

        <div className="border-t border-line py-10">
          <p className="label-tag mb-3 text-blood">Processo</p>
          <h2 className="display text-2xl md:text-3xl text-bone">Como solicitar</h2>
          <div className="mt-4 max-w-xl space-y-4 text-fg-muted leading-relaxed">
            <p>Envie um e-mail para <span className="text-bone">{site.contact.email}</span> com:</p>
            <ol className="space-y-2 pl-4">
              <li className="flex gap-3"><span className="text-blood font-mono text-sm">01</span> Número do pedido</li>
              <li className="flex gap-3"><span className="text-blood font-mono text-sm">02</span> Motivo da troca ou devolução</li>
              <li className="flex gap-3"><span className="text-blood font-mono text-sm">03</span> Fotos do produto (se aplicável)</li>
            </ol>
            <p className="text-fg-subtle text-sm">Após a aprovação, enviaremos as instruções de envio. O frete de retorno é por nossa conta em caso de defeito ou erro nosso.</p>
          </div>
        </div>

        <div className="border-t border-line py-10">
          <p className="label-tag mb-3 text-blood">Reembolso</p>
          <h2 className="display text-2xl md:text-3xl text-bone">Prazo de estorno</h2>
          <p className="mt-4 max-w-xl text-fg-muted leading-relaxed">
            O reembolso é processado em até <span className="text-bone">5 a 10 dias úteis</span> após o recebimento e análise do produto devolvido. O valor será estornado no mesmo meio de pagamento utilizado na compra.
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