import { Seal } from "@/components/brand/seal";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sobre" };

export default function SobrePage() {
  return (
    <div className="container-edge pt-16 md:pt-24 pb-32">
      <p className="label-tag mb-4 text-blood">Origem</p>
      <h1 className="display text-5xl md:text-7xl lg:text-9xl text-bone leading-[0.86] tracking-tight">
        Sobre a<br /><span className="text-blood">Ordem</span>
      </h1>

      <div className="mt-16 grid gap-16 md:grid-cols-2">
        <div className="space-y-8 text-fg-muted leading-relaxed">
          <p>{site.manifesto}</p>
          <p>Nascida em São Paulo, a MASAYOSHI é a materialização de um juramento. Cada peça é um capítulo, cada drop é uma cerimônia. Não somos uma marca de rua — somos a rua.</p>
          <p>O nome 正義 quer dizer justiça. Mas justiça, no nosso código, é lealdade. É disciplina. É domínio sobre si antes de dominar o espaço.</p>
          <p>Fundada em {site.founded}, a Ordem existe para quem veste com convicção. Quem entende, não precisa explicar. Quem veste, sabe.</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Seal variant="full" size={200} className="text-blood opacity-60" />
          <p className="mt-8 font-mono text-sm text-bone">Ordem n° {site.ordemNumero}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg-subtle">
            {site.kanji} · Est. {site.founded}
          </p>
        </div>
      </div>
    </div>
  );
}