"use client";

import { Seal } from "@/components/brand/seal";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ContatoPage() {
  return (
    <div className="container-edge pt-16 md:pt-24 pb-32">
      <p className="label-tag mb-4 text-blood">Comunicação</p>
      <h1 className="display text-5xl md:text-7xl text-bone leading-[0.95]">Contato</h1>
      <p className="mt-6 max-w-xl text-fg-muted">
        A Ordem responde. Use os canais abaixo para falar com a família.
      </p>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <ContactBlock title="E-mail" value={site.contact.email} href={`mailto:${site.contact.email}`} />
          <ContactBlock title="Suporte" value={site.contact.support} href={`mailto:${site.contact.support}`} />
          <ContactBlock title="WhatsApp" value={site.contact.whatsapp} href={`https://wa.me/5511900000000`} />
        </div>
        <div className="border border-line bg-bg-2/30 p-8">
          <p className="label-tag mb-6">Enviar mensagem</p>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div><label className="label-tag block mb-2">Nome</label><input className="h-12 w-full bg-transparent border-b border-line-2 text-bone placeholder:text-fg-subtle focus:outline-none focus:border-blood" placeholder="Seu nome" /></div>
            <div><label className="label-tag block mb-2">E-mail</label><input type="email" className="h-12 w-full bg-transparent border-b border-line-2 text-bone placeholder:text-fg-subtle focus:outline-none focus:border-blood" placeholder="seu@email.com" /></div>
            <div><label className="label-tag block mb-2">Mensagem</label><textarea rows={4} className="w-full bg-transparent border-b border-line-2 text-bone placeholder:text-fg-subtle focus:outline-none focus:border-blood resize-none" placeholder="Escreva sua mensagem…" /></div>
            <Button type="submit" size="lg">Enviar <ArrowRight className="h-4 w-4" /></Button>
          </form>
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

function ContactBlock({ title, value, href }: { title: string; value: string; href: string }) {
  return (
    <div className="border-b border-line pb-6">
      <p className="label-tag mb-2">{title}</p>
      <a href={href} className="text-bone hover:text-blood transition-colors text-lg">{value}</a>
    </div>
  );
}