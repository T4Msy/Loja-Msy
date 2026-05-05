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
    <footer className="relative mt-32 border-t border-line bg-bg overflow-hidden">
      {/* Giant kanji background */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.04 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-x-0 -top-12 flex justify-center"
        aria-hidden
      >
        <span className="seal text-[clamp(12rem,30vw,30rem)] leading-none text-blood">
          正義
        </span>
      </motion.div>

      <div className="container-edge relative z-10 pt-24 pb-12">
        {/* Top — newsletter */}
        <div className="grid gap-12 lg:grid-cols-2 pb-16 border-b border-line">
          <div>
            <p className="label-tag mb-4">Manifesto · Comunicado da Ordem</p>
            <h3 className="display text-4xl md:text-5xl text-bone leading-[1.05] tracking-tight max-w-xl">
              Receba os drops antes de qualquer um.
            </h3>
            <p className="mt-4 max-w-md text-fg-muted">
              Membros da Ordem têm acesso 24h antes ao próximo capítulo. Sem spam. Sem ruído.
            </p>
          </div>
          <form className="flex flex-col justify-center gap-4 lg:items-end" onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const email = fd.get("email") as string;
            if (!email) return;
            try {
              await fetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email }), headers: { "Content-Type": "application/json" } });
            } catch {}
          }}>
            <div className="flex w-full max-w-lg items-end gap-3">
              <div className="flex-1">
                <Input name="email" placeholder="seu@email.com" type="email" required className="h-14 text-lg" />
              </div>
              <Button type="submit" size="lg" className="h-14">
                <span>Jurar</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fg-faint">
              Ao se inscrever, você jura discrição.
            </p>
          </form>
        </div>

        {/* Columns */}
        <div className="grid gap-12 py-16 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Wordmark className="text-bone" />
            <p className="mt-6 max-w-xs text-sm text-fg-muted leading-relaxed">
              {site.manifesto}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <SocialIcon href={site.social.instagram} label="Instagram"><Instagram className="h-4 w-4" /></SocialIcon>
              <SocialIcon href={site.social.tiktok} label="TikTok"><Music2 className="h-4 w-4" /></SocialIcon>
              <SocialIcon href={site.social.youtube} label="YouTube"><Youtube className="h-4 w-4" /></SocialIcon>
              <SocialIcon href={site.social.twitter} label="Twitter"><Twitter className="h-4 w-4" /></SocialIcon>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <p className="label-tag mb-5">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-2 text-sm text-fg-muted hover:text-bone transition-colors"
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

        {/* Bottom */}
        <div className="grid gap-6 border-t border-line pt-8 lg:grid-cols-3 items-center">
          <div className="flex items-center gap-4">
            <Seal variant="full" size={56} className="text-blood opacity-90" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg-muted">
                Selo da Ordem
              </p>
              <p className="font-mono text-sm text-bone">N° {site.ordemNumero} / {new Date().getFullYear()}</p>
            </div>
          </div>
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.32em] text-fg-subtle">
            Crafted in São Paulo · Worn in silence
          </p>
          <p className="text-right font-mono text-[10px] uppercase tracking-[0.32em] text-fg-subtle">
            © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Massive bottom mark */}
      <div className="relative overflow-hidden border-t border-line">
        <p
          aria-hidden
          className="display select-none whitespace-nowrap text-center text-[clamp(4rem,16vw,16rem)] leading-[0.9] py-2 text-bg-3"
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
      className="inline-flex h-9 w-9 items-center justify-center border border-line-2 text-fg-muted hover:text-bone hover:border-blood transition-colors"
    >
      {children}
    </a>
  );
}
