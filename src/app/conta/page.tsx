"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, MapPin, Package, LogOut, ArrowRight } from "lucide-react";
import { Seal } from "@/components/brand/seal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/auth";
import { useCart } from "@/store/cart";
import { formatDateBR } from "@/lib/utils";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default function ContaPage() {
  const router = useRouter();
  const { user, profile, loading, initialized, init, signOut } = useAuth();
  const cartItems = useCart((s) => s.items);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (initialized && !user && isSupabaseConfigured) {
      router.push("/login");
    }
  }, [initialized, user, router]);

  if (loading || !initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Seal variant="full" size={64} className="animate-pulse text-fg-faint" />
      </div>
    );
  }

  if (!user && isSupabaseConfigured) return null;

  // Demo mode: show account page even without real auth
  const demoUser = user || { email: "demo@masayoshi.store", created_at: new Date().toISOString() };
  const demoProfile = profile || { fullName: "Membro da Ordem", phone: null, role: "user", createdAt: new Date().toISOString() };

  const initials = (demoProfile.fullName || demoUser.email || "M")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="container-edge pt-16 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {!isSupabaseConfigured && (
            <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold border border-gold/30 bg-gold/5 p-4">
              Modo demonstração — Dados de exemplo. Configure o Supabase para autenticação real.
            </div>
          )}
          <div className="flex items-start justify-between gap-6 flex-wrap mb-12">
          <div>
            <p className="label-tag mb-4 text-blood">Membro da Ordem</p>
            <h1 className="display text-5xl md:text-7xl text-bone leading-[0.95]">
              Minha conta
            </h1>
            <p className="mt-4 text-fg-muted">
              {demoProfile.fullName || (demoUser as any).email}
            </p>
          </div>

          <div className="flex items-center gap-4 border border-line p-4">
            <div className="h-16 w-16 flex items-center justify-center bg-blood-4 text-bone font-mono text-lg">
              {initials}
            </div>
            <div>
              <p className="text-bone font-medium">{demoProfile.fullName}</p>
<p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fg-muted">{(demoUser as any).email}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fg-subtle mt-1">
                  Membro desde {formatDateBR(demoProfile.createdAt || (demoUser as any).created_at)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <QuickLink href="/conta/pedidos" icon={<Package className="h-5 w-5" />} title="Meus pedidos" desc="Acompanhe seus juramentos." />
          <QuickLink href="/conta/enderecos" icon={<MapPin className="h-5 w-5" />} title="Endereços" desc="Gerencie seus endereços." />
          <QuickLink href="/shop" icon={<ShoppingBag className="h-5 w-5" />} title="Continuar comprando" desc={`${cartItems.length} item${cartItems.length !== 1 ? "s" : ""} na sacola.`} />
        </div>

        <div className="mt-12 border-t border-line pt-8">
          <p className="label-tag mb-6">Dados da conta</p>
          <div className="grid gap-4 md:grid-cols-2">
            <InfoRow label="Nome" value={demoProfile.fullName || "—"} />
            <InfoRow label="E-mail" value={(demoUser as any).email || "—"} />
            <InfoRow label="Telefone" value={demoProfile.phone || "—"} />
            <InfoRow label="Cargo" value={demoProfile.role === "admin" ? "Administrador" : "Membro"} />
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Button
            variant="ghost"
            onClick={async () => {
              await signOut();
              router.push("/");
            }}
          >
            <LogOut className="h-4 w-4" />
            Sair da conta
          </Button>
          {demoProfile.role === "admin" && (
            <Button asChild variant="secondary">
              <Link href="/admin">
                <ArrowRight className="h-4 w-4" />
                Painel admin
              </Link>
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function QuickLink({ href, icon, title, desc }: { href: string; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Link
      href={href}
      className="group border border-line p-6 hover:border-blood transition-colors duration-300"
    >
      <div className="text-blood mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-bone display text-xl">{title}</h3>
      <p className="mt-1 text-sm text-fg-muted">{desc}</p>
      <ArrowRight className="mt-4 h-4 w-4 text-fg-subtle group-hover:text-blood group-hover:translate-x-1 transition-all" />
    </Link>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-line pb-3">
      <p className="label-tag mb-1">{label}</p>
      <p className="text-bone">{value}</p>
    </div>
  );
}