"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Seal } from "@/components/brand/seal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/store/auth";
import { site } from "@/lib/site";

export default function CadastroPage() {
  const router = useRouter();
  const { signUp, loading, user, init } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (user) router.push("/conta");
  }, [user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    const { error: err } = await signUp(email, password, name);
    if (err) {
      setError(err === "User already registered" ? "Este e-mail já está registrado." : err);
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-6"
        >
          <Seal variant="full" size={96} className="mx-auto text-blood" />
          <h1 className="display text-4xl mt-8 text-bone">Juramento aceito.</h1>
          <p className="mt-4 text-fg-muted max-w-sm mx-auto">
            Verifique seu e-mail para confirmar sua entrada na Ordem.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/login">
              <ArrowRight className="h-4 w-4" />
              Ir para login
            </Link>
          </Button>
        </motion.div>
      </div>
    );
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
          <h1 className="display text-4xl mt-6 text-bone">Jure fidelidade</h1>
          <p className="mt-3 text-fg-muted">Entre para a Ordem. Acesso aos drops exclusivos.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Nome completo</Label>
            <div className="relative mt-2">
              <User className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-fg-subtle" />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                required
                className="pl-7"
              />
            </div>
          </div>

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
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
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
            {loading ? "Criando conta…" : <>Criar conta <ArrowRight className="h-4 w-4" /></>}
          </Button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-fg-muted text-sm">
            Já é membro?{" "}
            <Link href="/login" className="text-blood hover:text-bone transition-colors underline underline-offset-4">
              Entrar
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