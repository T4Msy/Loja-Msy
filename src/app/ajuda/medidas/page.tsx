import { Seal } from "@/components/brand/seal";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tabela de Medidas" };

const topsSizes = [
  { size: "PP", chest: "48–50", length: "66", shoulder: "42" },
  { size: "P", chest: "50–52", length: "69", shoulder: "44" },
  { size: "M", chest: "52–54", length: "72", shoulder: "46" },
  { size: "G", chest: "54–56", length: "75", shoulder: "48" },
  { size: "GG", chest: "56–58", length: "78", shoulder: "50" },
  { size: "XGG", chest: "58–62", length: "81", shoulder: "52" },
];

const pantsSizes = [
  { size: "PP", waist: "72–76", hip: "92–96", length: "98" },
  { size: "P", waist: "76–80", hip: "96–100", length: "100" },
  { size: "M", waist: "80–84", hip: "100–104", length: "102" },
  { size: "G", waist: "84–88", hip: "104–108", length: "104" },
  { size: "GG", waist: "88–92", hip: "108–112", length: "106" },
  { size: "XGG", waist: "92–98", hip: "112–116", length: "108" },
];

function SizeTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-line">
            {headers.map((h) => (
              <th key={h} className="label-tag py-3 pr-4 last:pr-0 text-blood">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-line/50">
              {row.map((cell, j) => (
                <td key={j} className={`py-3 pr-4 last:pr-0 text-sm ${j === 0 ? "text-bone font-mono" : "text-fg-muted"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MedidasPage() {
  return (
    <div className="container-edge pt-16 md:pt-24 pb-32">
      <p className="label-tag mb-4 text-blood">Ajuda</p>
      <h1 className="display text-5xl md:text-7xl text-bone leading-[0.95]">
        Tabela de<br /><span className="text-blood">Medidas</span>
      </h1>
      <p className="mt-6 max-w-xl text-fg-muted">
        Encontre o caimento perfeito. Todas as medidas em centímetros.
      </p>

      <div className="mt-16 border-t border-line py-10">
        <p className="label-tag mb-3 text-blood">Partes de cima</p>
        <h2 className="display text-2xl md:text-3xl text-bone mb-8">Tops &amp; Moletons</h2>
        <div className="max-w-2xl">
          <SizeTable
            headers={["Tamanho", "Peito (cm)", "Comprimento (cm)", "Ombro (cm)"]}
            rows={topsSizes.map((s) => [s.size, s.chest, s.length, s.shoulder])}
          />
        </div>
      </div>

      <div className="border-t border-line py-10">
        <p className="label-tag mb-3 text-blood">Partes de baixo</p>
        <h2 className="display text-2xl md:text-3xl text-bone mb-8">Calças &amp; Shorts</h2>
        <div className="max-w-2xl">
          <SizeTable
            headers={["Tamanho", "Cintura (cm)", "Quadril (cm)", "Comprimento (cm)"]}
            rows={pantsSizes.map((s) => [s.size, s.waist, s.hip, s.length])}
          />
        </div>
      </div>

      <div className="border-t border-line py-10">
        <p className="label-tag mb-3 text-blood">Como medir</p>
        <h2 className="display text-2xl md:text-3xl text-bone">Guia de medição</h2>
        <div className="mt-4 max-w-xl space-y-3 text-fg-muted leading-relaxed">
          <div className="flex gap-3"><span className="text-blood font-mono text-sm shrink-0">Peito</span> Circunferência na parte mais larga do tórax, com a fita paralela ao chão.</div>
          <div className="flex gap-3"><span className="text-blood font-mono text-sm shrink-0">Cintura</span> Circunferência natural da cintura, sem apertar.</div>
          <div className="flex gap-3"><span className="text-blood font-mono text-sm shrink-0">Quadril</span> Circunferência na parte mais larga do quadril.</div>
          <div className="flex gap-3"><span className="text-blood font-mono text-sm shrink-0">Comprimento</span> Da costura do ombro até a barra (tops) ou da cintura até a barra (calças).</div>
          <div className="flex gap-3"><span className="text-blood font-mono text-sm shrink-0">Ombro</span> De uma costura do ombro à outra, pelas costas.</div>
        </div>
      </div>

      <div className="border-t border-line py-10">
        <div className="border border-line bg-bg-2/30 p-8 max-w-xl">
          <p className="label-tag mb-3 text-blood">Atenção</p>
          <p className="text-fg-muted leading-relaxed">
            Nossas peças seguem o caimento <span className="text-bone">oversized</span>. Se estiver entre dois tamanhos, considere elegir o menor. Se prefere um ajuste mais solto, mantenha seu tamanho habitual.
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