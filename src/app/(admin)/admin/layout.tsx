"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Seal } from "@/components/brand/seal";
import { Package, Layers, ShoppingBag, LayoutDashboard, ArrowLeft } from "lucide-react";
import { useAuth } from "@/store/auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Produtos", href: "/admin/produtos", icon: ShoppingBag },
  { label: "Drops", href: "/admin/drops", icon: Layers },
  { label: "Pedidos", href: "/admin/pedidos", icon: Package },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, initialized, init } = useAuth();

  useEffect(() => { init(); }, [init]);

  useEffect(() => {
    if (!initialized) return;

    if (!isSupabaseConfigured) {
      router.push("/login");
      return;
    }

    if (!user) {
      router.push("/login?redirect=/admin");
      return;
    }

    if (profile?.role !== "admin") {
      router.push("/");
    }
  }, [initialized, user, profile, router]);

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <Seal variant="full" size={64} className="animate-pulse text-fg-faint" />
      </div>
    );
  }

  if (!isSupabaseConfigured || !user || profile?.role !== "admin") return null;

  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-line bg-bg-2 lg:flex flex-col">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-line">
          <Seal variant="mark" size={28} className="text-blood" />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone">Admin</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-fg-subtle">Painel da Ordem</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((n) => {
            const Icon = n.icon;
            const active = pathname === n.href || (n.href !== "/admin" && pathname.startsWith(n.href));
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-3 px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  active ? "bg-blood-4/40 text-bone border-l-2 border-blood" : "text-fg-muted hover:text-bone hover:bg-bg-3"
                }`}
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-line">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-fg-muted hover:text-bone transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            Voltar à loja
          </Link>
        </div>
      </aside>

      <div className="flex-1 lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-line bg-bg/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between lg:hidden">
          <Seal variant="mark" size={24} className="text-blood" />
          <div className="flex items-center gap-2">
            {nav.map((n) => {
              const Icon = n.icon;
              const active = pathname === n.href;
              return (
                <Link key={n.href} href={n.href} className={`inline-flex items-center justify-center h-9 w-9 ${active ? "text-blood" : "text-fg-muted"}`}>
                  <Icon className="h-4 w-4" />
                </Link>
              );
            })}
          </div>
          <Link href="/" className="text-fg-muted hover:text-bone">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </header>
        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}