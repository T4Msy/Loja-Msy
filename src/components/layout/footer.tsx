"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Youtube, Music2, Twitter, ArrowRight } from "lucide-react";
import { Wordmark, Seal } from "@/components/brand/seal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const cols = [
  {
    title: "Loja",
    links: [
      { label: "Drops", href: "/drops" },
      { label: "Catálogo", href: "/shop" },
      { label: "Lookbook", href: "/lookbook" },
      { label: "Lançamentos", href: "/shop?sort=new" },
      { label: "Arquivo", href: "/drops?status=archived" },
    ],
  },
  {
    title: "Conta",
    links: [
      { label: "Entrar", href: "/login" },
      { label: "Cadastro", href: "/cadastro" },
      { label: "Meus pedidos", href: "/conta/pedidos" },
      { label: "Endereços", href: "/conta/enderecos" },
      { label: "Sair", href: "/api/auth/logout" },
    ],
  },
  {
    title: "Ordem",
    links: [
      { label: "Manifesto", href: "/manifesto" },
      { label: "Sobre", href: "/sobre" },
      { label: "Programa de afiliados", href: "/afiliados" },
      { label: "Membros", href: "/membros" },
      { label: "Trabalhe conosco", href: "/carreiras" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { label: "Trocas e devoluções", href: "/ajuda/trocas" },
      { label: "Frete e entrega", href: "/ajuda/entrega" },
      { label: "Tabela de medidas", href: "/ajuda/medidas" },
      { label: "Termos de uso", href: "/legal/termos" },
      { label: "Privacidade", href: "/legal/privacidade" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line bg-bg">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(185,28,28,0.12),transparent_22%)]" />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
        aria-hidden
      >
        <span className="seal text-[clamp(10rem,26vw,28rem)] leading-none text-blood">正義</span>
      </motion.div>

      <div className="container-edge relative z-10 pt-24 pb-12">
        <div className="panel-strong surface-elev-3 gradient-stroke rounded-[34px] px-6 py-10 md:px-10 md:py-12 lg:px-12">
          <div className="grid gap-10 border-b border-white/8 pb-12 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div>
              <span className="section-kicker">Convocação privada</span>
              <h3 className="display mt-5 max-w-3xl text-4xl leading-[0.95] text-bone md:text-6xl">
                Receba o próximo capítulo
                <br />
                <span className="italic text-fg">antes do resto da rua.</span>
              </h3>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-fg-muted md:text-base">
                Quem entra na lista certa recebe acesso antecipado, sinais da próxima tiragem e o silêncio antes da abertura pública. Sem spam. Sem excesso. Só o que importa.
              </p>
            </div>

            <form
              className="flex flex-col gap-4 lg:items-end"
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const email = fd.get("email") as string;
                if (!email) return;
                try {
                  await fetch("/api/newsletter", {
                    method: "POST",
                    body: JSON.stringify({ email, website: "" }),
                    headers: { "Content-Type": "application/json" },
                  });
                } catch {}
              }}
            >
              <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-end">
                <div className="flex-1">
                  <Input name="email" placeholder="seu@email.com" type="email" required className="h-14 px-4 text-base md:text-lg" />
                </div>
                <Button type="submit" size="lg" className="h-14 min-w-[180px] rounded-full">
                  <span>Entrar</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fg-muted">
                Ao entrar, você aceita receber o chamado com antecedência.
              </p>
            </form>
          </div>

          <div className="grid gap-12 py-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <Wordmark className="text-bone" />
              <p className="mt-6 max-w-md text-sm leading-relaxed text-fg-muted md:text-base">
                {site.manifesto}
              </p>
              <div className="mt-8 flex items-center gap-3">
                <SocialIcon href={site.social.instagram} label="Instagram"><Instagram className="h-4 w-4" /></SocialIcon>
                <SocialIcon href={site.social.tiktok} label="TikTok"><Music2 className="h-4 w-4" /></SocialIcon>
                <SocialIcon href={site.social.youtube} label="YouTube"><Youtube className="h-4 w-4" /></SocialIcon>
                <SocialIcon href={site.social.twitter} label="Twitter"><Twitter className="h-4 w-4" /></SocialIcon>
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
              {cols.map((col) => (
                <div key={col.title}>
                  <p className="label-tag mb-5">{col.title}</p>
                  <ul className="space-y-3">
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-bone"
                        >
                          <span className="h-px w-0 bg-blood transition-all duration-500 group-hover:w-3" />
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 border-t border-white/8 pt-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <div className="flex items-center gap-4">
              <Seal variant="full" size={54} className="text-blood opacity-90" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg-muted">Selo da Ordem</p>
                <p className="mt-1 font-mono text-sm text-bone">N° {site.ordemNumero} / {new Date().getFullYear()}</p>
              </div>
            </div>
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.32em] text-fg-subtle">
              Crafted in São Paulo · Worn in silence · Built for belonging
            </p>
            <p className="text-left font-mono text-[10px] uppercase tracking-[0.32em] text-fg-subtle lg:text-right">
              © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-line/80">
        <p
          aria-hidden
          className="display select-none whitespace-nowrap py-2 text-center text-[clamp(4rem,15vw,15rem)] leading-[0.9] text-bg-3"
        >
          MASAYOSHI · MASAYOSHI · 正義
        </p>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-fg-muted transition-colors hover:border-blood hover:text-bone"
    >
      {children}
    </a>
  );
}
