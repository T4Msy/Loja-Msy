import type { Product, Size, Variant } from "@/lib/types";

const sizes: Size[] = ["P", "M", "G", "GG"];

function makeVariants(sku: string, stockMap: Record<Size, number>): Variant[] {
  return sizes.map((size) => ({
    id: `${sku}-${size}`,
    size,
    sku: `${sku}-${size}`,
    stock: stockMap[size] ?? 0,
  })).concat([
    { id: `${sku}-PP`, size: "PP" as Size, sku: `${sku}-PP`, stock: 0 },
    { id: `${sku}-XGG`, size: "XGG" as Size, sku: `${sku}-XGG`, stock: 0 },
  ]);
}

const baseMeasurements = {
  PP: { chest: 50, length: 68, shoulder: 44 },
  P: { chest: 53, length: 70, shoulder: 46 },
  M: { chest: 56, length: 72, shoulder: 48 },
  G: { chest: 59, length: 74, shoulder: 50 },
  GG: { chest: 62, length: 76, shoulder: 52 },
  XGG: { chest: 65, length: 78, shoulder: 54 },
};

export const mockProducts: Product[] = [
  {
    id: "p-001",
    slug: "obsidian-tee-blood-seal",
    name: "OBSIDIAN TEE — BLOOD SEAL",
    subtitle: "Camiseta pesada · 280gsm",
    category: "tee",
    dropId: "drop-003",
    drop: { id: "drop-003", code: "DROP 003", name: "OBSIDIAN ORDER" },
    description:
      "Camiseta cortada em algodão pesado de fibra longa. Estampa serigráfica em vermelho profundo, gravada como cicatriz. Selo da Ordem bordado na barra.",
    story:
      "Inspirada nos rituais de iniciação. Cada peça carrega numeração e selo individual.",
    composition: ["100% Algodão Pima 280gsm", "Costura reforçada", "Pré-encolhido"],
    measurements: baseMeasurements,
    priceCents: 32900,
    comparePriceCents: null,
    imageFront:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1400&auto=format&fit=crop",
    imageBack:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1400&auto=format&fit=crop",
    imageGallery: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1600&auto=format&fit=crop",
    ],
    variants: makeVariants("MSY003-OBS", { PP: 0, P: 8, M: 12, G: 6, GG: 3, XGG: 0 }),
    badges: ["limited", "new"],
    status: "active",
    releaseAt: "2026-04-21T21:00:00Z",
    createdAt: "2026-04-21T21:00:00Z",
    position: 1,
  },
  {
    id: "p-002",
    slug: "ronin-hoodie-onyx",
    name: "RONIN HOODIE — ONYX",
    subtitle: "Moletom 480gsm · forro escovado",
    category: "hoodie",
    dropId: "drop-003",
    drop: { id: "drop-003", code: "DROP 003", name: "OBSIDIAN ORDER" },
    description:
      "Moletom sobreposto em algodão escovado. Capuz duplo, cordão metálico. Bordado kanji 正義 no peito esquerdo.",
    composition: ["80% Algodão · 20% Poliéster 480gsm", "Forro escovado", "Cordão metálico"],
    measurements: baseMeasurements,
    priceCents: 79900,
    imageFront:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1400&auto=format&fit=crop",
    imageBack:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1400&auto=format&fit=crop",
    imageGallery: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1600&auto=format&fit=crop",
    ],
    variants: makeVariants("MSY003-RON", { PP: 0, P: 4, M: 6, G: 2, GG: 1, XGG: 0 }),
    badges: ["limited", "last-units"],
    status: "active",
    createdAt: "2026-04-21T21:00:00Z",
    position: 2,
  },
  {
    id: "p-003",
    slug: "shadow-crewneck-blood",
    name: "SHADOW CREWNECK — BLOOD",
    subtitle: "Crewneck pesado · 420gsm",
    category: "crewneck",
    dropId: "drop-003",
    drop: { id: "drop-003", code: "DROP 003", name: "OBSIDIAN ORDER" },
    description:
      "Crewneck oversized em moletom pesado. Estampa puff-print no peito, manga com etiqueta tecida da Ordem.",
    composition: ["100% Algodão 420gsm", "Puff print", "Etiqueta tecida"],
    measurements: baseMeasurements,
    priceCents: 64900,
    imageFront:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1400&auto=format&fit=crop",
    imageBack:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1400&auto=format&fit=crop",
    variants: makeVariants("MSY003-SHD", { PP: 0, P: 0, M: 0, G: 0, GG: 0, XGG: 0 }),
    badges: ["limited"],
    status: "sold-out",
    createdAt: "2026-04-21T21:00:00Z",
    position: 3,
  },
  {
    id: "p-004",
    slug: "ordem-long-sleeve-onyx",
    name: "ORDEM L/S — ONYX",
    subtitle: "Manga longa pesada · 240gsm",
    category: "long-sleeve",
    dropId: "drop-003",
    drop: { id: "drop-003", code: "DROP 003", name: "OBSIDIAN ORDER" },
    description:
      "Manga longa em algodão pesado. Estampa lateral discreta nas mangas. Etiqueta numerada.",
    composition: ["100% Algodão Pima 240gsm", "Costura francesa"],
    measurements: baseMeasurements,
    priceCents: 39900,
    imageFront:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1400&auto=format&fit=crop",
    imageBack:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1400&auto=format&fit=crop",
    variants: makeVariants("MSY003-LS", { PP: 0, P: 10, M: 14, G: 8, GG: 5, XGG: 2 }),
    badges: ["new"],
    status: "active",
    createdAt: "2026-04-21T21:00:00Z",
    position: 4,
  },
  {
    id: "p-005",
    slug: "kanji-cap-blood",
    name: "KANJI CAP — BLOOD",
    subtitle: "Boné estruturado · 6 painéis",
    category: "headwear",
    dropId: "drop-003",
    drop: { id: "drop-003", code: "DROP 003", name: "OBSIDIAN ORDER" },
    description:
      "Boné estruturado com kanji 正義 bordado em alto-relevo. Aba curva, fivela metálica.",
    composition: ["100% Algodão sarja", "Bordado 3D", "Fivela metálica"],
    measurements: baseMeasurements,
    priceCents: 24900,
    imageFront:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1400&auto=format&fit=crop",
    imageBack:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1400&auto=format&fit=crop",
    variants: [
      { id: "MSY003-CAP-U", size: "M" as Size, sku: "MSY003-CAP-U", stock: 24 },
    ],
    badges: ["new"],
    status: "active",
    createdAt: "2026-04-21T21:00:00Z",
    position: 5,
  },
  {
    id: "p-006",
    slug: "void-cargo-pants",
    name: "VOID CARGO PANTS",
    subtitle: "Calça cargo técnica",
    category: "pants",
    dropId: "drop-003",
    drop: { id: "drop-003", code: "DROP 003", name: "OBSIDIAN ORDER" },
    description:
      "Calça cargo em sarja pesada com bolsos laterais articulados. Cordão de ajuste no tornozelo.",
    composition: ["97% Algodão · 3% Elastano", "Bolsos articulados", "Reflexivo discreto"],
    measurements: baseMeasurements,
    priceCents: 89900,
    imageFront:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1400&auto=format&fit=crop",
    imageBack:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1400&auto=format&fit=crop",
    variants: makeVariants("MSY003-CRG", { PP: 0, P: 3, M: 5, G: 4, GG: 2, XGG: 0 }),
    badges: ["limited"],
    status: "active",
    createdAt: "2026-04-21T21:00:00Z",
    position: 6,
  },
  {
    id: "p-007",
    slug: "seal-tote-bag",
    name: "SEAL TOTE",
    subtitle: "Tote bag canvas pesado",
    category: "accessory",
    dropId: "drop-003",
    drop: { id: "drop-003", code: "DROP 003", name: "OBSIDIAN ORDER" },
    description:
      "Tote bag em canvas pesado com selo da Ordem em silk vermelho profundo. Alça reforçada.",
    composition: ["100% Canvas 18oz", "Alça reforçada"],
    measurements: baseMeasurements,
    priceCents: 14900,
    imageFront:
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1400&auto=format&fit=crop",
    imageBack:
      "https://images.unsplash.com/photo-1622445275576-721325763afe?q=80&w=1400&auto=format&fit=crop",
    variants: [
      { id: "MSY003-TOTE-U", size: "M" as Size, sku: "MSY003-TOTE-U", stock: 40 },
    ],
    badges: ["new"],
    status: "active",
    createdAt: "2026-04-21T21:00:00Z",
    position: 7,
  },
  {
    id: "p-008",
    slug: "blood-ritual-tee",
    name: "BLOOD RITUAL TEE",
    subtitle: "Camiseta box-fit · 220gsm",
    category: "tee",
    dropId: "drop-002",
    drop: { id: "drop-002", code: "DROP 002", name: "BLOOD CIPHER" },
    description:
      "Camiseta archive do DROP 002. Estampa frontal cifrada e dorso preenchido.",
    composition: ["100% Algodão 220gsm"],
    measurements: baseMeasurements,
    priceCents: 29900,
    imageFront:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1400&auto=format&fit=crop",
    imageBack:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1400&auto=format&fit=crop",
    variants: makeVariants("MSY002-BLD", { PP: 0, P: 0, M: 0, G: 0, GG: 0, XGG: 0 }),
    badges: ["archive"],
    status: "sold-out",
    createdAt: "2026-02-14T21:00:00Z",
    position: 8,
  },
];

export const featuredProducts = mockProducts.filter((p) => p.status === "active").slice(0, 4);
export const allActive = mockProducts.filter((p) => p.status === "active" || p.status === "sold-out");

export function getProductBySlug(slug: string) {
  return mockProducts.find((p) => p.slug === slug);
}
export function getProductsByDrop(dropId: string) {
  return mockProducts.filter((p) => p.dropId === dropId);
}
export function getRelated(productId: string, limit = 4) {
  return mockProducts.filter((p) => p.id !== productId && p.status === "active").slice(0, limit);
}
