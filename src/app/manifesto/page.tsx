import { Seal } from "@/components/brand/seal";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manifesto",
  description: site.manifesto,
};

export default function ManifestoPage() {
  return (
    <>
      <section className="relative min-h-[80svh] flex items-center justify-center overflow-hidden bg-bg">
        <div aria-hidden className="absolute inset-0 opacity-[0.04] flex items-center justify-center">
          <span className="seal text-[clamp(20rem,50vw,50rem)] leading-none text-blood select-none">正義</span>
        </div>
        <div className="container-edge relative z-10 py-32 md:py-48 text-center">
          <p className="label-tag mb-6 text-blood">Manifiesto · Ordem n° {site.ordemNumero}</p>
          <h1 className="display text-5xl md:text-7xl lg:text-9xl text-bone leading-[0.86] tracking-tight">
            A Ordem
            <br />
            <span className="italic text-fg-muted">não pede</span>
            <br />
            <span className="text-blood">licença.</span>
          </h1>
          <p className="mt-10 max-w-2xl mx-auto text-fg-muted text-lg md:text-xl leading-relaxed text-pretty">
            {site.manifesto}
          </p>
          <div className="mt-16">
            <Seal variant="full" size={96} className="mx-auto text-blood opacity-60" />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-bg-2 py-32 md:py-40">
        <div className="container-edge">
          <p className="label-tag mb-12 text-center">Os quatro juramentos</p>
          <div className="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
            {[
              { kanji: "忠", title: "Lealdade", text: "Sem lealdade não há Ordem. Toda peça é selada para quem honra o juramento. Não somos seguidores. Somos família." },
              { kanji: "力", title: "Domínio", text: "O que você veste é o que você comanda. Disciplina como uniforme, silêncio como estratégia. A Ordem começa de dentro." },
              { kanji: "影", title: "Sombra", text: "Quem entende, não fala. A presença pesa mais que qualquer ruído. O invisível é mais poderoso que o grito." },
              { kanji: "家", title: "Família", text: "Não somos uma marca. Somos uma família. Você não compra. Você jura. Cada peça carrega o selo e o número de quem a carrega." },
            ].map((p) => (
              <div key={p.kanji} className="group bg-bg-2 p-8 md:p-10 transition-colors duration-500 hover:bg-bg-3">
                <span className="seal text-5xl text-blood opacity-70 group-hover:opacity-100 transition-opacity">{p.kanji}</span>
                <h3 className="display text-3xl text-bone mt-4">{p.title}</h3>
                <p className="mt-4 text-fg-muted leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 md:py-40">
        <div className="container-edge max-w-3xl mx-auto text-center">
          <p className="label-tag mb-8 text-blood">O Código</p>
          <div className="space-y-12 text-left">
            {[
              { num: "001", text: "Numeração é individual. Nenhuma peça é igual. O selo carrega o número do dono." },
              { num: "002", text: "Drops são limitados. Não há reabastecimento. Quem perdeu, perdeu. A escassez é honesta." },
              { num: "003", text: "Qualidade é inegociável. Tecido pesado, costura reforçada, acabamento obsessivo." },
              { num: "004", text: "A Ordem não pede licença. Não pede desculpas. Não segue tendências. Cria capítulos." },
              { num: "005", text: "Quem veste, sabe. Quem sabe, não fala. O silêncio é a assinatura mais forte." },
              { num: "006", text: "Memória é tatuagem. Cada peça registra um momento. O arquivo é permanente." },
            ].map((rule) => (
              <div key={rule.num} className="flex gap-6 items-start">
                <span className="shrink-0 font-mono text-3xl text-blood opacity-40">{rule.num}</span>
                <p className="text-fg leading-relaxed text-lg">{rule.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-24 md:py-32 text-center">
        <Seal variant="full" size={120} className="mx-auto text-blood opacity-30" />
        <p className="mt-8 display text-2xl md:text-4xl text-bone italic">{site.tagline}</p>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.32em] text-fg-subtle">
          {site.kanji} · Ordem n° {site.ordemNumero} · Est. {site.founded}
        </p>
      </section>
    </>
  );
}