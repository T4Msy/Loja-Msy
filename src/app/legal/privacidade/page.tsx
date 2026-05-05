import { Seal } from "@/components/brand/seal";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Política de Privacidade" };

export default function PrivacidadePage() {
  return (
    <div className="container-edge pt-16 md:pt-24 pb-32">
      <p className="label-tag mb-4 text-blood">Legal</p>
      <h1 className="display text-5xl md:text-7xl text-bone leading-[0.95]">
        Política de<br /><span className="text-blood">Privacidade</span>
      </h1>
      <p className="mt-6 max-w-xl text-fg-muted">
        Sua privacidade importa. Saiba como a {site.name} trata seus dados.
      </p>

      <div className="mt-16 space-y-0">
        <div className="border-t border-line py-10">
          <p className="label-tag mb-3 text-blood">01</p>
          <h2 className="display text-2xl md:text-3xl text-bone">DADOS COLETADOS</h2>
          <p className="mt-4 max-w-xl text-fg-muted leading-relaxed">
            Coletamos dados fornecidos por você: nome, e-mail, endereço de entrega, CPF e dados de pagamento. Também coletamos dados de navegação como endereço IP, cookies e páginas visitadas para melhorar a experiência.
          </p>
        </div>

        <div className="border-t border-line py-10">
          <p className="label-tag mb-3 text-blood">02</p>
          <h2 className="display text-2xl md:text-3xl text-bone">USO DOS DADOS</h2>
          <div className="mt-4 max-w-xl space-y-3 text-fg-muted leading-relaxed">
            <p>Os dados são utilizados exclusivamente para:</p>
            <ul className="space-y-2 pl-4">
              <li className="flex gap-3"><span className="text-blood">—</span> Processamento e entrega de pedidos</li>
              <li className="flex gap-3"><span className="text-blood">—</span> Comunicação sobre seu pedido</li>
              <li className="flex gap-3"><span className="text-blood">—</span> Envio de novidades e drops com seu consentimento</li>
              <li className="flex gap-3"><span className="text-blood">—</span> Melhoria contínua do site e dos produtos</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-line py-10">
          <p className="label-tag mb-3 text-blood">03</p>
          <h2 className="display text-2xl md:text-3xl text-bone">COMPARTILHAMENTO</h2>
          <p className="mt-4 max-w-xl text-fg-muted leading-relaxed">
            Não vendemos nem compartilhamos seus dados pessoais com terceiros para fins publicitários. Dados podem ser compartilhados com prestadores de serviço essenciais (meios de pagamento, transportadoras) estritamente para cumprir pedidos.
          </p>
        </div>

        <div className="border-t border-line py-10">
          <p className="label-tag mb-3 text-blood">04</p>
          <h2 className="display text-2xl md:text-3xl text-bone">COOKIES</h2>
          <p className="mt-4 max-w-xl text-fg-muted leading-relaxed">
            Utilizamos cookies para garantir o funcionamento do site, analisar o tráfego e personalizar Conteúdo. Você pode gerenciar suas preferências de cookies nas configurações do navegador. A desativação de cookies pode afetar a funcionalidade do site.
          </p>
        </div>

        <div className="border-t border-line py-10">
          <p className="label-tag mb-3 text-blood">05</p>
          <h2 className="display text-2xl md:text-3xl text-bone">SEGURANÇA</h2>
          <p className="mt-4 max-w-xl text-fg-muted leading-relaxed">
            Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, destruição ou alteração. Nenhum sistema é completamente imune, mas trabalhamos continuamente para manter o mais alto nível de segurança.
          </p>
        </div>

        <div className="border-t border-line py-10">
          <p className="label-tag mb-3 text-blood">06</p>
          <h2 className="display text-2xl md:text-3xl text-bone">DIREITOS DO TITULAR</h2>
          <p className="mt-4 max-w-xl text-fg-muted leading-relaxed">
            Em conformidade com a LGPD, você pode solicitar a qualquer momento: acesso, correção, exclusão ou portabilidade dos seus dados. Entre em contato pelo e-mail <span className="text-bone">{site.contact.email}</span>.
          </p>
        </div>

        <div className="border-t border-line py-10">
          <p className="label-tag mb-3 text-blood">07</p>
          <h2 className="display text-2xl md:text-3xl text-bone">ALTERAÇÕES</h2>
          <p className="mt-4 max-w-xl text-fg-muted leading-relaxed">
            Esta política pode ser atualizada periodicamente. Alterações significativas serão comunicadas por e-mail ou aviso no site. O uso continuado do site após alterações constitui aceitação.
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