import { Seal } from "@/components/brand/seal";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Termos de Uso" };

export default function TermosPage() {
  return (
    <div className="container-edge pt-16 md:pt-24 pb-32">
      <p className="label-tag mb-4 text-blood">Legal</p>
      <h1 className="display text-5xl md:text-7xl text-bone leading-[0.95]">
        Termos de<br /><span className="text-blood">Uso</span>
      </h1>
      <p className="mt-6 max-w-xl text-fg-muted">
        Ao acessar e utilizar o site {site.url}, você concorda com os termos abaixo.
      </p>

      <div className="mt-16 space-y-0">
        <div className="border-t border-line py-10">
          <p className="label-tag mb-3 text-blood">01</p>
          <h2 className="display text-2xl md:text-3xl text-bone">ACESSO E USO</h2>
          <p className="mt-4 max-w-xl text-fg-muted leading-relaxed">
            O site {site.name} é destinado à venda de produtos de streetwear premium. Ao navegar e realizar compras, você afirma ter pelo menos 18 anos ou estar acompanhado de um responsável legal. É proibido o uso do site para fins ilícitos ou que violem estes termos.
          </p>
        </div>

        <div className="border-t border-line py-10">
          <p className="label-tag mb-3 text-blood">02</p>
          <h2 className="display text-2xl md:text-3xl text-bone">PRODUTOS E PREÇOS</h2>
          <p className="mt-4 max-w-xl text-fg-muted leading-relaxed">
            Os preços e condições estão sujeitos a alteração sem aviso prévio. Em caso de erro de preço, reservamo-nos o direito de cancelar o pedido e realizar o estorno integral. As imagens dos produtos são meramente ilustrativas e podem apresentar variações de cor.
          </p>
        </div>

        <div className="border-t border-line py-10">
          <p className="label-tag mb-3 text-blood">03</p>
          <h2 className="display text-2xl md:text-3xl text-bone">PROPRIEDADE INTELECTUAL</h2>
          <p className="mt-4 max-w-xl text-fg-muted leading-relaxed">
            Todo conteúdo do site — incluindo logotipos, marcas, textos, fotografias e design — é propriedade exclusiva de {site.name}. A reprodução, distribuição ou modificação sem autorização é estritamente proibida.
          </p>
        </div>

        <div className="border-t border-line py-10">
          <p className="label-tag mb-3 text-blood">04</p>
          <h2 className="display text-2xl md:text-3xl text-bone">COMPRAS E PAGAMENTOS</h2>
          <p className="mt-4 max-w-xl text-fg-muted leading-relaxed">
            Ao finalizar uma compra, você declara que as informações fornecidas são verdadeiras. O pedido é confirmado apenas após a aprovação do pagamento. Meios de pagamento e parcelamento estão sujeitos a disponibilidade.
          </p>
        </div>

        <div className="border-t border-line py-10">
          <p className="label-tag mb-3 text-blood">05</p>
          <h2 className="display text-2xl md:text-3xl text-bone">LIMITAÇÃO DE RESPONSABILIDADE</h2>
          <p className="mt-4 max-w-xl text-fg-muted leading-relaxed">
            A {site.name} não se responsabiliza por danos indiretos, incidentais ou consequenciais decorrentes do uso do site ou de seus produtos, nos limites permitidos pela legislação brasileira.
          </p>
        </div>

        <div className="border-t border-line py-10">
          <p className="label-tag mb-3 text-blood">06</p>
          <h2 className="display text-2xl md:text-3xl text-bone">ALTERAÇÕES</h2>
          <p className="mt-4 max-w-xl text-fg-muted leading-relaxed">
            Reservamo-nos o direito de alterar estes termos a qualquer momento. O uso continuado do site após alterações constitui aceitação dos novos termos.
          </p>
        </div>

        <div className="border-t border-line py-10">
          <p className="label-tag mb-3 text-blood">07</p>
          <h2 className="display text-2xl md:text-3xl text-bone">LEGISLAÇÃO</h2>
          <p className="mt-4 max-w-xl text-fg-muted leading-relaxed">
            Estes termos são regidos pela legislação brasileira. Qualquer disputa será submetida ao foro da Comarca de São Paulo — SP.
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