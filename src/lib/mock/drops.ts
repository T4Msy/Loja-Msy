import type { Drop } from "@/lib/types";

export const mockDrops: Drop[] = [
  {
    id: "drop-003",
    code: "DROP 003",
    name: "OBSIDIAN ORDER",
    tagline: "O silêncio antes da execução.",
    story:
      "DROP 003 é o capítulo da sombra. Tecido pesado, costuras reforçadas, um juramento estampado no avesso. Cada peça vem numerada, lacrada com selo da Ordem.",
    cover:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2400&auto=format&fit=crop",
    poster:
      "https://images.unsplash.com/photo-1561564621-99a8f000c2d8?q=80&w=1600&auto=format&fit=crop",
    status: "live",
    releaseAt: "2026-04-21T21:00:00Z",
    endsAt: "2026-05-21T21:00:00Z",
    productCount: 8,
    totalUnits: 320,
    ordemNumero: "047",
    createdAt: "2026-04-01T00:00:00Z",
  },
  {
    id: "drop-002",
    code: "DROP 002",
    name: "BLOOD CIPHER",
    tagline: "Quem entende, não fala.",
    story:
      "Inspirado nos códigos das antigas famílias. Vermelho profundo sobre preto. Tipografia gravada como cicatriz.",
    cover:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2400&auto=format&fit=crop",
    status: "sold-out",
    releaseAt: "2026-02-14T21:00:00Z",
    endsAt: "2026-03-01T21:00:00Z",
    productCount: 6,
    totalUnits: 240,
    ordemNumero: "046",
    createdAt: "2026-02-01T00:00:00Z",
  },
  {
    id: "drop-004",
    code: "DROP 004",
    name: "WHITE LOTUS",
    tagline: "A pureza nasce do barro.",
    story:
      "O contra-capítulo. Pela primeira vez, branco. Bordados em prata fosca. Edição reduzida.",
    cover:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=2400&auto=format&fit=crop",
    status: "scheduled",
    releaseAt: "2026-06-21T21:00:00Z",
    productCount: 5,
    totalUnits: 180,
    ordemNumero: "048",
    createdAt: "2026-04-20T00:00:00Z",
  },
  {
    id: "drop-001",
    code: "DROP 001",
    name: "FIRST OATH",
    tagline: "O primeiro juramento.",
    story:
      "O capítulo de origem. A peça que selou a fundação da Ordem. Hoje, peça de arquivo.",
    cover:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2400&auto=format&fit=crop",
    status: "archived",
    releaseAt: "2025-09-15T21:00:00Z",
    productCount: 4,
    totalUnits: 150,
    ordemNumero: "045",
    createdAt: "2025-09-01T00:00:00Z",
  },
];

export const currentDrop = mockDrops.find((d) => d.status === "live") ?? mockDrops[0];
export const upcomingDrop = mockDrops.find((d) => d.status === "scheduled");
