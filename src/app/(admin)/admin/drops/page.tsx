"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { mockDrops } from "@/lib/mock/drops";
import { formatDateBR } from "@/lib/utils";
import type { Drop } from "@/lib/types";

const dropStatusLabels: Record<Drop["status"], { label: string; variant: "live" | "default" | "soldout" | "outline" }> = {
  live: { label: "Ao vivo", variant: "live" },
  scheduled: { label: "Agendado", variant: "outline" },
  "sold-out": { label: "Esgotado", variant: "soldout" },
  archived: { label: "Arquivo", variant: "default" },
};

export default function AdminDrops() {
  const [drops, setDrops] = useState<Drop[]>([...mockDrops]);
  const [search, setSearch] = useState("");
  const [editDrop, setEditDrop] = useState<Drop | null>(null);
  const [isNew, setIsNew] = useState(false);

  const filtered = drops.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.code.toLowerCase().includes(search.toLowerCase())
  );

  function handleSave(form: Drop) {
    if (isNew) {
      setDrops((prev) => [...prev, form]);
    } else {
      setDrops((prev) => prev.map((d) => (d.id === form.id ? form : d)));
    }
    setEditDrop(null);
    setIsNew(false);
  }

  const defaultDrop: Drop = {
    id: `drop-${Date.now()}`,
    code: "",
    name: "",
    tagline: "",
    story: "",
    cover: "",
    status: "scheduled",
    releaseAt: new Date().toISOString(),
    productCount: 0,
    totalUnits: 0,
    ordemNumero: String(drops.length + 45).padStart(3, "0"),
    createdAt: new Date().toISOString(),
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="label-tag mb-3 text-blood">Capítulos</p>
            <h1 className="display text-4xl md:text-6xl text-bone leading-[0.95]">Drops</h1>
            <p className="mt-3 text-fg-muted">{drops.length} drops · {drops.filter((d) => d.status === "live").length} ao vivo</p>
          </div>
          <Button onClick={() => { setIsNew(true); setEditDrop(defaultDrop); }}>
            <Plus className="h-4 w-4" />
            Novo drop
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-fg-subtle" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar drops…" className="pl-7" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((drop) => {
            const st = dropStatusLabels[drop.status] || dropStatusLabels.archived;
            return (
              <motion.div
                key={drop.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="group border border-line bg-bg-2/30 hover:border-blood/30 transition-colors"
              >
                <div className="relative h-40 overflow-hidden bg-bg-3">
                  {drop.cover && <img src={drop.cover} alt={drop.name} className="h-full w-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-2/80" />
                  <div className="absolute top-3 left-3">
                    <Badge variant={st.variant}>{st.label}</Badge>
                  </div>
                </div>
                <div className="p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-blood">{drop.code}</p>
                  <h3 className="display text-xl text-bone mt-1">{drop.name}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fg-subtle mt-1">
                    Ordem n° {drop.ordemNumero} · {formatDateBR(drop.releaseAt)}
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <span className="font-mono text-[10px] text-fg-muted">{drop.productCount} peças</span>
                    <span className="font-mono text-[10px] text-fg-muted">{drop.totalUnits} un.</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="ghost" onClick={() => setEditDrop(drop)}>
                      <Pencil className="h-3.5 w-3.5" /> Editar
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setDrops((prev) => prev.filter((d) => d.id !== drop.id))}>
                      <Trash2 className="h-3.5 w-3.5" /> Excluir
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <Dialog open={!!editDrop} onOpenChange={(o) => { if (!o) { setEditDrop(null); setIsNew(false); } }}>
        <DialogContent side="right" className="max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNew ? "Novo drop" : "Editar drop"}</DialogTitle>
          </DialogHeader>
          {editDrop && <DropForm drop={editDrop} isNew={isNew} onSave={handleSave} onClose={() => { setEditDrop(null); setIsNew(false); }} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DropForm({ drop, isNew, onSave, onClose }: { drop: Drop; isNew: boolean; onSave: (d: Drop) => void; onClose: () => void }) {
  const [form, setForm] = useState(drop);

  return (
    <div className="space-y-6 mt-4">
      <div className="grid gap-6 md:grid-cols-2">
        <div><Label>Código</Label><Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="DROP 004" className="mt-2" /></div>
        <div><Label>Nome</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="WHITE LOTUS" className="mt-2" /></div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div><Label>Tagline</Label><Input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} placeholder="A pureza nasce do barro." className="mt-2" /></div>
        <div><Label>Ordem n°</Label><Input value={form.ordemNumero} onChange={(e) => setForm({ ...form, ordemNumero: e.target.value })} className="mt-2" /></div>
      </div>
      <div><Label>História</Label><textarea value={form.story} onChange={(e) => setForm({ ...form, story: e.target.value })} rows={4} className="mt-2 w-full bg-transparent border-b border-line-2 text-bone focus:outline-none focus:border-blood resize-none" /></div>
      <div><Label>Cover (URL)</Label><Input value={form.cover} onChange={(e) => setForm({ ...form, cover: e.target.value })} placeholder="https://…" className="mt-2" /></div>
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <Label>Status</Label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Drop["status"] })} className="mt-2 h-12 w-full bg-transparent border-b border-line-2 text-bone focus:outline-none focus:border-blood font-sans">
            {(["live", "scheduled", "sold-out", "archived"] as Drop["status"][]).map((s) => (
              <option key={s} value={s} className="bg-bg-2">{s}</option>
            ))}
          </select>
        </div>
        <div><Label>Data de lançamento</Label><Input type="datetime-local" value={form.releaseAt?.slice(0, 16) || ""} onChange={(e) => setForm({ ...form, releaseAt: new Date(e.target.value).toISOString() })} className="mt-2" /></div>
        <div><Label>Data de encerramento</Label><Input type="datetime-local" value={form.endsAt?.slice(0, 16) || ""} onChange={(e) => setForm({ ...form, endsAt: e.target.value ? new Date(e.target.value).toISOString() : undefined })} className="mt-2" /></div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div><Label>Nº de peças</Label><Input type="number" value={form.productCount} onChange={(e) => setForm({ ...form, productCount: Number(e.target.value) })} className="mt-2" /></div>
        <div><Label>Total de unidades</Label><Input type="number" value={form.totalUnits || 0} onChange={(e) => setForm({ ...form, totalUnits: Number(e.target.value) })} className="mt-2" /></div>
      </div>
      <DialogFooter>
        <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        <Button onClick={() => onSave(form)}>{isNew ? "Criar drop" : "Salvar"}</Button>
      </DialogFooter>
    </div>
  );
}
