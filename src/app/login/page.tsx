"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Seal } from "@/components/brand/seal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/store/auth";
import { site } from "@/lib/site";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { signIn, loading, user, init } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (user) {
      const redirect = params.get("redirect") || "/conta";
      router.push(redirect);
    }
  }, [user, router, params]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const { error: err } = await signIn(email, password);
    if (err) {
      setError(err === "Invalid login credentials" ? "E-mail ou senha incorretos." : err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] flex items-center justify-center">
        <span className="seal text-[clamp(16rem,40vw,40rem)] leading-none text-blood select-none">正義</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="text-center mb-12">
          <Seal variant="full" size={80} className="mx-auto text-blood" />
          <h1 className="display text-4xl mt-6 text-bone">Entrar na Ordem</h1>
          <p className="mt-3 text-fg-muted">Acesso exclusivo para membros.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>E-mail</Label>
            <div className="relative mt-2">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-fg-subtle" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="pl-7"
              />
            </div>
          </div>

          <div>
            <Label>Senha</Label>
            <div className="relative mt-2">
              <Lock className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-fg-subtle" />
              <Input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="pl-7 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-fg-subtle hover:text-bone transition-colors"
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-blood text-sm font-mono"
            >
              {error}
            </motion.p>
          )}

          <Button type="submit" size="xl" className="w-full" disabled={loading}>
            {loading ? "Entrando…" : <>Entrar <ArrowRight className="h-4 w-4" /></>}
          </Button>
        </form>

        <div className="mt-10 text-center space-y-3">
          <p className="text-fg-muted text-sm">
            Ainda não é membro?{" "}
            <Link href="/cadastro" className="text-blood hover:text-bone transition-colors underline underline-offset-4">
              Jure fidelidade
            </Link>
          </p>
        </div>

        <p className="mt-8 text-center font-mono text-[9px] uppercase tracking-[0.32em] text-fg-faint">
          {site.kanji} · {site.name}
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-bg"><Seal variant="full" size={64} className="animate-pulse text-fg-faint" /></div>}>
      <LoginForm />
    </Suspense>
  );
}