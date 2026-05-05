"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Seal } from "@/components/brand/seal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/store/auth";
import { useState } from "react";
import { toast } from "sonner";

export default function EnderecosPage() {
  const router = useRouter();
  const { user, initialized, init } = useAuth();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { init(); }, [init]);
  useEffect(() => {
    if (initialized && !user) router.push("/login");
  }, [initialized, user, router]);

  if (!initialized || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Seal variant="full" size={64} className="animate-pulse text-fg-faint" />
      </div>
    );
  }

  return (
    <div className="container-edge pt-16 pb-32">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Link href="/conta" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-fg-muted hover:text-bone transition-colors mb-8">
          <ArrowLeft className="h-3 w-3" />
          Voltar para conta
        </Link>

        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="display text-5xl md:text-7xl text-bone leading-[0.95]">Endereços</h1>
            <p className="mt-3 text-fg-muted">Gerencie seus endereços de entrega.</p>
          </div>
          <Button variant="ghost" onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4" />
            Novo endereço
          </Button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-8 border border-line bg-bg-2/30 p-6">
            <p className="label-tag mb-6">Novo endereço</p>
            <div className="grid gap-6 md:grid-cols-2">
              <div><Label>Nome completo</Label><Input placeholder="Nome para entrega" className="mt-2" /></div>
              <div><Label>CEP</Label><Input placeholder="00000-000" inputMode="numeric" className="mt-2" /></div>
              <div><Label>Rua</Label><Input placeholder="Nome da rua" className="mt-2" /></div>
              <div><Label>Número</Label><Input placeholder="123" inputMode="numeric" className="mt-2" /></div>
              <div><Label>Complemento</Label><Input placeholder="Apto, casa…" className="mt-2" /></div>
              <div><Label>Bairro</Label><Input placeholder="Bairro" className="mt-2" /></div>
              <div><Label>Cidade</Label><Input placeholder="Cidade" className="mt-2" /></div>
              <div><Label>UF</Label><Input placeholder="SP" maxLength={2} className="mt-2" /></div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={() => { toast.success("Endereço salvo"); setShowForm(false); }}>Salvar endereço</Button>
              <Button variant="ghost" onClick={() => setShowForm(false)}>Cancelar</Button>
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          <AddressCard
            name="Casa"
            address="Rua da Ordem, 47 — Centro, São Paulo · SP"
            cep="01001-000"
            isDefault
          />
        </div>
      </motion.div>
    </div>
  );
}

function AddressCard({ name, address, cep, isDefault }: { name: string; address: string; cep: string; isDefault?: boolean }) {
  return (
    <div className="border border-line bg-bg-2/30 p-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <p className="text-bone font-medium">{name}</p>
          {isDefault && <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-blood border border-blood-3 px-2 py-0.5">Principal</span>}
        </div>
        <p className="text-fg-muted text-sm">{address}</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fg-subtle mt-1">CEP {cep}</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="font-mono text-[10px] uppercase tracking-[0.24em] text-fg-muted hover:text-bone transition-colors">Editar</button>
        <button className="text-fg-subtle hover:text-blood transition-colors"><Trash2 className="h-4 w-4" /></button>
      </div>
    </div>
  );
}