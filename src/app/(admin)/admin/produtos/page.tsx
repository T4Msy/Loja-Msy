"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Package, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { mockProducts } from "@/lib/mock/products";
import { formatBRL } from "@/lib/utils";
import type { Product, ProductStatus } from "@/lib/types";

const statusLabels: Record<ProductStatus, { label: string; variant: "live" | "default" | "soldout" | "outline" }> = {
  active: { label: "Ativo", variant: "live" },
  draft: { label: "Rascunho", variant: "outline" },
  "sold-out": { label: "Esgotado", variant: "soldout" },
  scheduled: { label: "Agendado", variant: "default" },
  archived: { label: "Arquivo", variant: "default" },
};

export default function AdminProdutos() {
  const [products, setProducts] = useState<Product[]>([...mockProducts]);
  const [search, setSearch] = useState("");
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  function toggleStatus(id: string) {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "active" ? "draft" : p.status === "draft" ? "active" : "active" }
          : p
      )
    );
  }

  function handleSave(form: Product) {
    if (isNew) {
      setProducts((prev) => [...prev, form]);
    } else {
      setProducts((prev) => prev.map((p) => (p.id === form.id ? form : p)));
    }
    setEditProduct(null);
    setIsNew(false);
  }

  function handleDelete(id: string) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  const defaultProduct: Product = {
    id: `p-${Date.now()}`,
    slug: "",
    name: "",
    subtitle: "",
    category: "tee",
    description: "",
    priceCents: 0,
    imageFront: "",
    imageBack: "",
    variants: [],
    status: "draft",
    createdAt: new Date().toISOString(),
    position: products.length + 1,
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="label-tag mb-3 text-blood">Gestão</p>
            <h1 className="display text-4xl md:text-6xl text-bone leading-[0.95]">Produtos</h1>
            <p className="mt-3 text-fg-muted">{products.length} produtos · {products.filter((p) => p.status === "active").length} ativos</p>
          </div>
          <Button onClick={() => { setIsNew(true); setEditProduct(defaultProduct); }}>
            <Plus className="h-4 w-4" />
            Novo produto
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-fg-subtle" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nome ou categoria…" className="pl-7" />
          </div>
        </div>

        <div className="border border-line">
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_80px] gap-4 px-6 py-3 border-b border-line bg-bg-2/40">
            <p className="label-tag">Produto</p>
            <p className="label-tag">Categoria</p>
            <p className="label-tag">Preço</p>
            <p className="label-tag">Status</p>
            <p className="label-tag">Estoque</p>
          </div>
          <AnimatePresence>
            {filtered.map((p) => {
              const totalStock = p.variants.reduce((s, v) => s + v.stock, 0);
              const st = statusLabels[p.status] || statusLabels.draft;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_80px] gap-2 md:gap-4 px-6 py-4 border-b border-line/50 hover:bg-bg-2/30 transition-colors items-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-10 shrink-0 bg-bg-2 border border-line overflow-hidden">
                      {p.imageFront && <img src={p.imageFront} alt={p.name} className="h-full w-full object-cover" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-bone text-sm truncate">{p.name}</p>
                      <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-fg-subtle">{p.slug}</p>
                    </div>
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-muted">{p.category}</p>
                  <p className="font-mono text-sm text-bone">{formatBRL(p.priceCents)}</p>
                  <button onClick={() => toggleStatus(p.id)}>
                    <Badge variant={st.variant}>{st.label}</Badge>
                  </button>
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-sm ${totalStock < 5 ? "text-gold" : "text-fg-muted"}`}>{totalStock}</span>
                    <button onClick={() => setEditProduct(p)} className="text-fg-subtle hover:text-bone transition-colors"><Pencil className="h-3.5 w-3.5" /></button>
                    <button onClick={() => handleDelete(p.id)} className="text-fg-subtle hover:text-blood transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      <Dialog open={!!editProduct} onOpenChange={(o) => { if (!o) { setEditProduct(null); setIsNew(false); } }}>
        <DialogContent side="right" className="max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNew ? "Novo produto" : "Editar produto"}</DialogTitle>
          </DialogHeader>
          {editProduct && <ProductForm product={editProduct} isNew={isNew} onSave={handleSave} onClose={() => { setEditProduct(null); setIsNew(false); }} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProductForm({ product, isNew, onSave, onClose }: { product: Product; isNew: boolean; onSave: (p: Product) => void; onClose: () => void }) {
  const [form, setForm] = useState(product);

  return (
    <div className="space-y-6 mt-4">
      <div className="grid gap-6 md:grid-cols-2">
        <div><Label>Nome</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="NOME DO PRODUTO" className="mt-2" /></div>
        <div><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="nome-do-produto" className="mt-2" /></div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div><Label>Subtítulo</Label><Input value={form.subtitle || ""} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} placeholder="Camiseta pesada · 280gsm" className="mt-2" /></div>
        <div>
          <Label>Categoria</Label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Product["category"] })} className="mt-2 h-12 w-full bg-transparent border-b border-line-2 text-bone focus:outline-none focus:border-blood font-sans">
            {["tee", "long-sleeve", "hoodie", "crewneck", "outerwear", "pants", "shorts", "headwear", "accessory"].map((c) => (
              <option key={c} value={c} className="bg-bg-2">{c}</option>
            ))}
          </select>
        </div>
      </div>
      <div><Label>Descrição</Label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="mt-2 w-full bg-transparent border-b border-line-2 text-bone focus:outline-none focus:border-blood resize-none" /></div>
      <div className="grid gap-6 md:grid-cols-2">
        <div><Label>Preço (cents)</Label><Input type="number" value={form.priceCents} onChange={(e) => setForm({ ...form, priceCents: Number(e.target.value) })} placeholder="32900" className="mt-2" /></div>
        <div>
          <Label>Status</Label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as ProductStatus })} className="mt-2 h-12 w-full bg-transparent border-b border-line-2 text-bone focus:outline-none focus:border-blood font-sans">
            {(["active", "draft", "sold-out", "scheduled", "archived"] as ProductStatus[]).map((s) => (
              <option key={s} value={s} className="bg-bg-2">{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div><Label>Imagem frontal (URL)</Label><Input value={form.imageFront} onChange={(e) => setForm({ ...form, imageFront: e.target.value })} placeholder="https://…" className="mt-2" /></div>
        <div><Label>Imagem costas (URL)</Label><Input value={form.imageBack} onChange={(e) => setForm({ ...form, imageBack: e.target.value })} placeholder="https://…" className="mt-2" /></div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="label-tag">Estoque por tamanho</p>
          <Button size="sm" variant="ghost" onClick={() => {
            setForm({ ...form, variants: [...form.variants, { id: `${form.id}-${Date.now()}`, size: "M" as const, sku: `${form.id}-${Date.now()}`, stock: 0 }] });
          }}>
            <Plus className="h-3 w-3" /> Tamanho
          </Button>
        </div>
        {form.variants.length > 0 ? (
          <div className="space-y-2">
            {form.variants.map((v, i) => (
              <div key={v.id} className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fg-muted w-12">{v.size}</span>
                <Input type="number" value={v.stock} onChange={(e) => {
                  const variants = [...form.variants];
                  variants[i] = { ...variants[i], stock: Number(e.target.value) };
                  setForm({ ...form, variants });
                }} className="h-9 w-24" placeholder="0" />
                <button onClick={() => setForm({ ...form, variants: form.variants.filter((_, j) => j !== i) })} className="text-fg-subtle hover:text-blood transition-colors">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <Package className="h-12 w-12 mx-auto text-fg-faint" />
        )}
      </div>

      <DialogFooter>
        <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        <Button onClick={() => onSave(form)}>
          {isNew ? "Criar produto" : "Salvar alterações"}
        </Button>
      </DialogFooter>
    </div>
  );
}